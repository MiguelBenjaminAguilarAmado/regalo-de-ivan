import * as THREE from 'three';
import type { Layout, Road } from './layout';
import { box, merge } from './CityMeshes';

/** ===== Vida de la ciudad de Hoyo: peatones, coches, público y bocadillos de diálogo (todo instanciado y barato) ===== */

const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function rngOf(seed: number) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

const SKINS = [0xf1c8a8, 0xd9a07a, 0xc08a68, 0xa8734f, 0x8a5a3a, 0x5a3622, 0xe8b894];
const SHIRTS = [0xc1272d, 0x2a5a8a, 0xe8b42a, 0x2d9a5a, 0xf2f2f2, 0x1a1a22, 0x8a4a9a, 0xff7a3a, 0x3ab0c8, 0xe85a8a, 0x6a6a72, 0x9a7a4a];
const PANTS = [0x1a1a22, 0x2a3a5a, 0x3a3a40, 0x5a4a3a, 0x2a4a7a, 0x6a6a6a];
const HAIRS = [0x14100c, 0x2a1810, 0x4a2a14, 0x8a6a3a, 0xd8c08a, 0xdcdcdc, 0x6a2a1a];
const CARS = [0xc1272d, 0x2a5a8a, 0xf2f2f2, 0x1a1a22, 0x6a6a72, 0x2d7a4a, 0xe8c42a, 0xe8c42a, 0x8a4a9a, 0x3a8ac8];

export type PersonMode = 'walk' | 'cheer' | 'chat';

interface Person {
  x: number; z: number; yaw: number; scale: number; speed: number; phase: number;
  mode: PersonMode;
  node: number; prev: number; wait: number;
  /** Para el público: hacia dónde mira */
  lookYaw: number;
}

interface Car { from: number; to: number; road: number; speed: number; v: number; x: number; z: number; yaw: number; tx: number; tz: number; path: { x: number; z: number }[]; taxi: boolean }


export interface CityLifeOpts {
  layout: Layout;
  /** ¿Se puede pasear por este punto? (p. ej. distritos aún cerrados) */
  allowed: (x: number, z: number) => boolean;
  /** Distrito al que lleva cada calle (para no meter coches en distritos cerrados) */
  roadOpen: (roadIndex: number) => boolean;
  /** Cuánta gente (según la calidad) */
  people: number;
  cars: number;
  /** Público fijo (mirando a un punto): p. ej. alrededor del ring callejero */
  crowds: { x: number; z: number; r: number; n: number }[];
}


export class CityLife {
  group = new THREE.Group();
  private people: Person[] = [];
  private cars: Car[] = [];
  private nodes: { x: number; z: number; nb: number[] }[] = [];
  private roads: Road[];
  private im: Record<string, THREE.InstancedMesh> = {};
  private carIm: Record<string, THREE.InstancedMesh> = {};
  private m4 = new THREE.Matrix4();
  private root = new THREE.Matrix4();
  private tmp = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private v = new THREE.Vector3();
  private s = new THREE.Vector3();
  private e = new THREE.Euler();
  private time = 0;
  private lightsMat: THREE.MeshBasicMaterial;
  private tailMat: THREE.MeshBasicMaterial;
  // bocadillo
  private bubble: THREE.Sprite;
  private bubbleCanvas = document.createElement('canvas');
  private bubbleTex: THREE.CanvasTexture;
  private bubbleWho = -1;
  private bubbleT = 0;
  private nextBubble = 3;
  /** Personas visibles (de noche sale menos gente) */
  private activeCount = 0;

  constructor(private o: CityLifeOpts) {
    this.roads = o.layout.roads;
    this.buildNav();
    this.buildPeople();
    this.buildCars();
    // materiales de luces de coche (se encienden de noche)
    this.lightsMat = this.carIm.lights.material as THREE.MeshBasicMaterial;
    this.tailMat = this.carIm.tails.material as THREE.MeshBasicMaterial;
    // bocadillo de diálogo (un único sprite reutilizado)
    this.bubbleCanvas.width = 512; this.bubbleCanvas.height = 160;
    this.bubbleTex = new THREE.CanvasTexture(this.bubbleCanvas); this.bubbleTex.colorSpace = THREE.SRGBColorSpace;
    this.bubble = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.bubbleTex, transparent: true, depthTest: false }));
    this.bubble.scale.set(4.2, 1.31, 1); this.bubble.visible = false; this.bubble.renderOrder = 10;
    this.group.add(this.bubble);
  }

  // ------------------------------------------------------------------ navegación (grafo de puntos con línea de visión)
  private clearLine(ax: number, az: number, bx: number, bz: number) {
    const L = Math.hypot(bx - ax, bz - az), n = Math.ceil(L / 0.8);
    for (let i = 1; i < n; i++) { const t = i / n; if (this.o.layout.blocked(ax + (bx - ax) * t, az + (bz - az) * t, 0.35)) return false; }
    return true;
  }

  private buildNav() {
    const l = this.o.layout, R = rngOf(4242);
    const pts: { x: number; z: number }[] = [];
    const bins = new Map<string, number[]>();
    const bk = (x: number, z: number) => Math.floor(x / 12) + ',' + Math.floor(z / 12);
    const add = (x: number, z: number, minD = 3) => {
      if (l.blocked(x, z, 0.6)) return;
      const [gx, gz] = [Math.floor(x / 12), Math.floor(z / 12)];
      for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const k of bins.get((gx + i) + ',' + (gz + j)) ?? []) if (Math.hypot(pts[k].x - x, pts[k].z - z) < minD) return;
      const id = pts.length; pts.push({ x, z });
      const key = bk(x, z); const arr = bins.get(key); if (arr) arr.push(id); else bins.set(key, [id]);
    };
    // aceras a los dos lados de cada calle; por las callejuelas, por el centro
    for (const r of this.roads) {
      const L = Math.hypot(r.x2 - r.x1, r.z2 - r.z1), dx = (r.x2 - r.x1) / L, dz = (r.z2 - r.z1) / L;
      if (r.kind === 'alley') { for (let s2 = 2; s2 < L; s2 += 6) add(r.x1 + dx * s2, r.z1 + dz * s2); continue; }
      for (let s2 = 3; s2 < L; s2 += 8) for (const side of [-1, 1]) add(r.x1 + dx * s2 - dz * side * (r.w / 2 + 1.1), r.z1 + dz * s2 + dx * side * (r.w / 2 + 1.1));
    }
    // plazas, parques y playa
    for (const p of l.pads) if (p.kind !== 'block') for (let i = 0; i < Math.min(30, (p.w * p.d) / 90); i++) add(p.x + (R() - 0.5) * (p.w - 3), p.z + (R() - 0.5) * (p.d - 3), 4);
    for (let a2 = 0; a2 < 16; a2++) { const ang = (a2 / 16) * TAU; add(Math.cos(ang) * 8, Math.sin(ang) * 8); add(Math.cos(ang + 0.2) * 16, Math.sin(ang + 0.2) * 16); }
    this.nodes = pts.map((p) => ({ ...p, nb: [] as number[] }));
    for (let i = 0; i < pts.length; i++) {
      const [gx, gz] = [Math.floor(pts[i].x / 12), Math.floor(pts[i].z / 12)];
      for (let a2 = -1; a2 <= 1; a2++) for (let b2 = -1; b2 <= 1; b2++) for (const j of bins.get((gx + a2) + ',' + (gz + b2)) ?? []) {
        if (j <= i) continue;
        const A = this.nodes[i], B = this.nodes[j];
        if (Math.hypot(A.x - B.x, A.z - B.z) > 13 || !this.clearLine(A.x, A.z, B.x, B.z)) continue;
        A.nb.push(j); B.nb.push(i);
      }
    }
  }

  private pickNode(R: () => number) {
    for (let t = 0; t < 40; t++) {
      const i = Math.floor(R() * this.nodes.length), n = this.nodes[i];
      if (n.nb.length && this.o.allowed(n.x, n.z)) return i;
    }
    return 0;
  }

  // ------------------------------------------------------------------ peatones
  private buildPeople() {
    const R = rngOf(777);
    const total = this.o.people + this.o.crowds.reduce((a, c) => a + c.n, 0);
    const mat = () => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 });
    const torso = new THREE.CylinderGeometry(0.2, 0.25, 0.66, 8);
    const head = new THREE.SphereGeometry(0.14, 10, 8);
    const hair = new THREE.SphereGeometry(0.15, 10, 6, 0, TAU, 0, Math.PI * 0.55);
    const leg = new THREE.BoxGeometry(0.15, 0.86, 0.17); leg.translate(0, -0.43, 0);
    const arm = new THREE.BoxGeometry(0.1, 0.64, 0.12); arm.translate(0, -0.32, 0);
    const mk = (name: string, g: THREE.BufferGeometry, n: number) => {
      const m = new THREE.InstancedMesh(g, mat(), n);
      m.castShadow = true; m.receiveShadow = false; m.frustumCulled = false;
      this.group.add(m); this.im[name] = m;
      return m;
    };
    const T = mk('torso', torso, total), H = mk('head', head, total), HR = mk('hair', hair, total), LG = mk('legs', leg, total * 2), AR = mk('arms', arm, total * 2);
    const c = new THREE.Color();
    for (let i = 0; i < total; i++) {
      const shirt = SHIRTS[Math.floor(R() * SHIRTS.length)], skin = SKINS[Math.floor(R() * SKINS.length)], pants = PANTS[Math.floor(R() * PANTS.length)], hairC = HAIRS[Math.floor(R() * HAIRS.length)];
      T.setColorAt(i, c.setHex(shirt)); H.setColorAt(i, c.setHex(skin)); HR.setColorAt(i, c.setHex(hairC));
      LG.setColorAt(i * 2, c.setHex(pants)); LG.setColorAt(i * 2 + 1, c.setHex(pants));
      const sleeves = R() < 0.5 ? shirt : skin;
      AR.setColorAt(i * 2, c.setHex(sleeves)); AR.setColorAt(i * 2 + 1, c.setHex(sleeves));
    }
    for (const m of Object.values(this.im)) if (m.instanceColor) m.instanceColor.needsUpdate = true;
    // caminantes
    for (let i = 0; i < this.o.people; i++) {
      const n = this.pickNode(R), nd = this.nodes[n];
      const nb = nd.nb.length ? nd.nb[Math.floor(R() * nd.nb.length)] : n;
      this.people.push({ x: nd.x + (R() - 0.5), z: nd.z + (R() - 0.5), yaw: R() * TAU, scale: 0.9 + R() * 0.16, speed: 1.1 + R() * 0.6, phase: R() * 10, mode: R() < 0.12 ? 'chat' : 'walk', node: nb, prev: n, wait: R() * 3, lookYaw: 0 });
    }
    // público alrededor de algo (mira al centro y anima)
    for (const cr of this.o.crowds) {
      for (let k = 0; k < cr.n; k++) {
        const a = (k / cr.n) * TAU + R() * 0.3;
        const x = cr.x + Math.cos(a) * cr.r, z = cr.z + Math.sin(a) * cr.r;
        this.people.push({ x, z, yaw: Math.atan2(cr.x - x, cr.z - z), scale: 0.88 + R() * 0.18, speed: 0, phase: R() * 10, mode: 'cheer', node: -1, prev: -1, wait: 0, lookYaw: Math.atan2(cr.x - x, cr.z - z) });
      }
    }
    this.activeCount = this.people.length;
  }

  // ------------------------------------------------------------------ coches
  private buildCars() {
    const R = rngOf(99);
    const n = this.o.cars;
    const std = (color: number, rough = 0.5, metal = 0.2) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
    const mk = (name: string, g: THREE.BufferGeometry, mat: THREE.Material, count: number, shadow = true) => {
      const m = new THREE.InstancedMesh(g, mat, count);
      m.castShadow = shadow; m.receiveShadow = false; m.frustumCulled = false;
      this.group.add(m); this.carIm[name] = m; return m;
    };
    // carrocería con perfil (bajos + capó + techo): una sola malla instanciada; ventanas oscuras aparte
    const bodyGeo = merge([box(1.8, 0.55, 4.1, 0, 0.6, 0, 0xffffff), box(1.78, 0.2, 1.1, 0, 0.95, 1.35, 0xffffff), box(1.78, 0.2, 0.9, 0, 0.95, -1.5, 0xffffff), box(1.58, 0.08, 1.9, 0, 1.55, -0.2, 0xffffff), box(1.86, 0.16, 0.14, 0, 0.42, 2.08, 0x9a9aa2), box(1.86, 0.16, 0.14, 0, 0.42, -2.08, 0x9a9aa2)])!;
    const body = mk('body', bodyGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.32, metalness: 0.35 }), n);
    mk('cabin', new THREE.BoxGeometry(1.55, 0.5, 1.85), std(0x1a2230, 0.1, 0.6), n);
    const wheel = new THREE.CylinderGeometry(0.34, 0.34, 0.28, 12); wheel.rotateZ(Math.PI / 2);
    mk('wheels', wheel, std(0x111114, 0.9, 0), n * 4, false);
    mk('lights', new THREE.BoxGeometry(0.36, 0.16, 0.06), new THREE.MeshBasicMaterial({ color: 0xfff4c8 }), n * 2, false);
    mk('tails', new THREE.BoxGeometry(0.36, 0.14, 0.06), new THREE.MeshBasicMaterial({ color: 0x8a1010 }), n * 2, false);
    mk('roof', new THREE.BoxGeometry(0.72, 0.26, 0.28), new THREE.MeshBasicMaterial({ color: 0xffe25a }), n, false);
    // franja de cuadros de los taxis
    mk('check', merge(Array.from({ length: 16 }, (_, i) => [box(0.02, 0.1, 0.24, -0.91, 0.66, -1.8 + i * 0.24, i % 2 ? 0x141418 : 0xf5f5f0), box(0.02, 0.1, 0.24, 0.91, 0.66, -1.8 + i * 0.24, i % 2 ? 0xf5f5f0 : 0x141418)]).flat())!, new THREE.MeshBasicMaterial({ vertexColors: true }), n, false);
    const c = new THREE.Color();
    const g = this.o.layout.graph;
    const usable = g.edges.filter((e) => this.o.roadOpen(e.road));
    for (let i = 0; i < n; i++) {
      body.setColorAt(i, c.setHex(CARS[i % CARS.length]));
      const e = usable[Math.floor(R() * usable.length)] ?? g.edges[0];
      const [from, to] = R() < 0.5 ? [e.a, e.b] : [e.b, e.a];
      const car: Car = { from, to, road: e.road, x: 0, z: 0, yaw: 0, tx: 0, tz: 1, v: 0, speed: 6.5 + R() * 3.5, path: [], taxi: CARS[i % CARS.length] === 0xe8c42a };
      this.routeCar(car, true, R());
      this.cars.push(car);
    }
    if (body.instanceColor) body.instanceColor.needsUpdate = true;
  }

  /** Carril derecho del tramo from→to: dos puntos (entrada y salida del tramo) */
  private lanePoints(from: number, to: number, road: number): { x: number; z: number }[] {
    const g = this.o.layout.graph, A = g.nodes[from], B = g.nodes[to], r = this.roads[road];
    const L = Math.hypot(B.x - A.x, B.z - A.z) || 1, ux = (B.x - A.x) / L, uz = (B.z - A.z) / L;
    const lane = Math.max(1.6, r.w * 0.27), rx = -uz, rz = ux;
    const m = Math.min(5, L * 0.3);
    return [{ x: A.x + ux * m + rx * lane, z: A.z + uz * m + rz * lane }, { x: B.x - ux * m + rx * lane, z: B.z - uz * m + rz * lane }];
  }

  /** Elige el siguiente tramo al llegar a un cruce (sin dar media vuelta si hay otra opción) */
  private routeCar(c: Car, init = false, t0 = 0) {
    const g = this.o.layout.graph;
    if (!init) {
      const opts = g.edges.filter((e) => (e.a === c.to || e.b === c.to) && this.o.roadOpen(e.road) && !(e.a === c.from && e.b === c.to) && !(e.b === c.from && e.a === c.to));
      const e = opts.length ? opts[Math.floor(Math.random() * opts.length)] : g.edges.find((x) => (x.a === c.to && x.b === c.from) || (x.b === c.to && x.a === c.from))!;
      const next = e.a === c.to ? e.b : e.a;
      c.from = c.to; c.to = next; c.road = e.road;
    }
    const pts = this.lanePoints(c.from, c.to, c.road);
    c.path = pts;
    if (init) {
      const p = pts[0], q = pts[1];
      c.x = p.x + (q.x - p.x) * t0; c.z = p.z + (q.z - p.z) * t0;
      c.yaw = Math.atan2(q.x - p.x, q.z - p.z); c.tx = Math.sin(c.yaw); c.tz = Math.cos(c.yaw);
      c.path = [q];
    }
  }

  /** ¿Choca el jugador con algún coche? */
  carBlocks(x: number, z: number, r = 0.42): boolean {
    for (const c of this.cars) {
      const dx = x - c.x, dz = z - c.z;
      if (dx * dx + dz * dz > 16) continue;
      const f = dx * c.tx + dz * c.tz, l = -dx * c.tz + dz * c.tx;
      if (Math.abs(f) < 2.0 + r && Math.abs(l) < 0.9 + r) return true;
    }
    return false;
  }

  // ------------------------------------------------------------------ bocadillos
  private drawBubble(text: string) {
    const g = this.bubbleCanvas.getContext('2d')!, W = 512, Hh = 160;
    g.clearRect(0, 0, W, Hh);
    g.font = '700 30px "Barlow Condensed", "Arial Narrow", sans-serif';
    // dos líneas como mucho
    const words = text.split(' '); const lines: string[] = []; let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (g.measureText(t).width > W - 60 && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur);
    const ls = lines.slice(0, 3);
    const bw = Math.min(W - 8, Math.max(...ls.map((l) => g.measureText(l).width)) + 44), bh = ls.length * 34 + 26;
    const x0 = (W - bw) / 2, y0 = (Hh - 22 - bh);
    g.fillStyle = 'rgba(255,255,255,0.96)'; g.strokeStyle = '#111'; g.lineWidth = 4;
    g.beginPath(); g.roundRect(x0, y0, bw, bh, 18); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(W / 2 - 14, y0 + bh - 2); g.lineTo(W / 2, Hh - 4); g.lineTo(W / 2 + 14, y0 + bh - 2); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(W / 2 - 14, y0 + bh); g.lineTo(W / 2, Hh - 4); g.lineTo(W / 2 + 14, y0 + bh); g.stroke();
    g.fillStyle = '#111'; g.textAlign = 'center'; g.textBaseline = 'middle';
    ls.forEach((l, i) => g.fillText(l, W / 2, y0 + 13 + 17 + i * 34));
    this.bubbleTex.needsUpdate = true;
  }

  /** Hace que el peatón más cercano diga algo */
  say(px: number, pz: number, text: string, maxDist = 14): boolean {
    let best = -1, bd = maxDist;
    for (let i = 0; i < this.activeCount; i++) { const p = this.people[i]; const d = Math.hypot(p.x - px, p.z - pz); if (d < bd && d > 1.5) { bd = d; best = i; } }
    if (best < 0) return false;
    this.bubbleWho = best; this.bubbleT = 3.8; this.drawBubble(text); this.bubble.visible = true;
    return true;
  }

  // ------------------------------------------------------------------ bucle
  update(dt: number, px: number, pz: number, night: number, chatter: () => string, paused: boolean) {
    this.time += dt;
    const t = this.time;
    // de noche hay menos gente por la calle (el público del ring se queda)
    const walkers = this.people.filter((p) => p.mode !== 'cheer').length;
    const keep = Math.round(walkers * (1 - 0.45 * night));
    this.activeCount = this.people.length;
    let shown = 0;
    // ---- personas
    const T = this.im.torso, H = this.im.head, HR = this.im.hair, LG = this.im.legs, AR = this.im.arms;
    let idx = 0;
    for (const p of this.people) {
      if (p.mode !== 'cheer') { shown++; if (shown > keep) { this.hide(idx++); continue; } }
      if (!paused) this.stepPerson(p, dt, px, pz);
      this.pose(idx++, p, t);
    }
    for (const m of [T, H, HR, LG, AR]) m.instanceMatrix.needsUpdate = true;
    // ---- coches
    if (!paused) for (const c of this.cars) this.stepCar(c, dt, px, pz);
    this.poseCars();
    const on = night > 0.35;
    this.lightsMat.color.setHex(on ? 0xfff4c8 : 0x9a9a8a);
    this.tailMat.color.setHex(on ? 0xff2a2a : 0x6a1010);
    // ---- bocadillos
    if (this.bubbleT > 0) {
      this.bubbleT -= dt;
      const p = this.people[this.bubbleWho];
      if (p) this.bubble.position.set(p.x, 2.55 * p.scale, p.z);
      if (this.bubbleT <= 0) this.bubble.visible = false;
    } else if (!paused) {
      this.nextBubble -= dt;
      if (this.nextBubble <= 0) { this.nextBubble = 5 + Math.random() * 6; this.say(px, pz, chatter()); }
    }
  }

  private hide(i: number) {
    this.m4.makeScale(0, 0, 0);
    this.im.torso.setMatrixAt(i, this.m4); this.im.head.setMatrixAt(i, this.m4); this.im.hair.setMatrixAt(i, this.m4);
    this.im.legs.setMatrixAt(i * 2, this.m4); this.im.legs.setMatrixAt(i * 2 + 1, this.m4);
    this.im.arms.setMatrixAt(i * 2, this.m4); this.im.arms.setMatrixAt(i * 2 + 1, this.m4);
  }

  private stepPerson(p: Person, dt: number, px: number, pz: number) {
    if (p.mode === 'cheer') return;
    const dp = Math.hypot(px - p.x, pz - p.z);
    if (p.wait > 0) {
      p.wait -= dt;
      if (dp < 4) this.turnTo(p, Math.atan2(px - p.x, pz - p.z), dt, 4);
      return;
    }
    const n = this.nodes[p.node];
    if (!n) return;
    const dx = n.x - p.x, dz = n.z - p.z, d = Math.hypot(dx, dz);
    if (d < 0.6) {
      // nuevo destino (sin volver atrás si se puede)
      const opts = n.nb.filter((j) => j !== p.prev && this.o.allowed(this.nodes[j].x, this.nodes[j].z));
      const list = opts.length ? opts : n.nb;
      p.prev = p.node; p.node = list.length ? list[Math.floor(Math.random() * list.length)] : p.node;
      if (Math.random() < 0.25) p.wait = 1 + Math.random() * 3;
      return;
    }
    let vx = (dx / d) * p.speed, vz = (dz / d) * p.speed;
    // apartarse del jugador
    if (dp < 1.4) { const k = (1.4 - dp) * 3; vx += ((p.x - px) / (dp || 1)) * k; vz += ((p.z - pz) / (dp || 1)) * k; }
    const nx = p.x + vx * dt, nz = p.z + vz * dt;
    if (!this.o.layout.blocked(nx, nz, 0.3) || this.o.layout.blocked(p.x, p.z, 0.3)) { p.x = nx; p.z = nz; }
    else { p.node = p.prev; }
    this.turnTo(p, Math.atan2(vx, vz), dt, 8);
  }

  private turnTo(p: Person, ty: number, dt: number, k: number) {
    let df = ty - p.yaw; while (df > Math.PI) df -= TAU; while (df < -Math.PI) df += TAU;
    p.yaw += df * (1 - Math.exp(-k * dt));
  }

  private part(target: THREE.InstancedMesh, i: number, root: THREE.Matrix4, x: number, y: number, z: number, rx = 0, rz = 0, sy = 1) {
    this.e.set(rx, 0, rz); this.q.setFromEuler(this.e);
    this.tmp.compose(this.v.set(x, y, z), this.q, this.s.set(1, sy, 1));
    this.m4.multiplyMatrices(root, this.tmp);
    target.setMatrixAt(i, this.m4);
  }

  private pose(i: number, p: Person, t: number) {
    const moving = p.mode === 'walk' && p.wait <= 0;
    const sw = moving ? Math.sin(t * p.speed * 4.2 + p.phase) * 0.55 : 0;
    const bob = moving ? Math.abs(Math.cos(t * p.speed * 4.2 + p.phase)) * 0.04 : 0;
    const root = this.root.compose(this.v.set(p.x, bob, p.z), this.q.setFromAxisAngle(UP, p.yaw), this.s.set(p.scale, p.scale, p.scale));
    this.part(this.im.torso, i, root, 0, 1.18, 0);
    const nod = p.mode === 'chat' || (!moving && p.mode === 'walk') ? Math.sin(t * 2 + p.phase) * 0.06 : 0;
    this.part(this.im.head, i, root, 0, 1.66 + nod * 0.2, 0.01, nod);
    this.part(this.im.hair, i, root, 0, 1.69 + nod * 0.2, -0.01, nod - 0.25);
    this.part(this.im.legs, i * 2, root, -0.1, 0.86, 0, sw);
    this.part(this.im.legs, i * 2 + 1, root, 0.1, 0.86, 0, -sw);
    if (p.mode === 'cheer') {
      const up = Math.PI - 0.25 + Math.sin(t * 6 + p.phase) * 0.35;
      const jump = Math.max(0, Math.sin(t * 6 + p.phase)) * 0.08;
      this.part(this.im.arms, i * 2, root, -0.3, 1.47 + jump, 0, up, -0.15);
      this.part(this.im.arms, i * 2 + 1, root, 0.3, 1.47 + jump, 0, up + Math.sin(t * 3 + p.phase) * 0.3, 0.15);
    } else if (p.mode === 'chat' && !moving) {
      const g = Math.sin(t * 3 + p.phase) * 0.5;
      this.part(this.im.arms, i * 2, root, -0.3, 1.47, 0, -0.4 - Math.max(0, g), -0.1);
      this.part(this.im.arms, i * 2 + 1, root, 0.3, 1.47, 0, -0.1, 0.1);
    } else {
      this.part(this.im.arms, i * 2, root, -0.3, 1.47, 0, -sw * 0.8, -0.08);
      this.part(this.im.arms, i * 2 + 1, root, 0.3, 1.47, 0, sw * 0.8, 0.08);
    }
  }

  private stepCar(c: Car, dt: number, px: number, pz: number) {
    let tgt = c.path[0];
    if (!tgt) { this.routeCar(c); tgt = c.path[0]; }
    const dx = tgt.x - c.x, dz = tgt.z - c.z, d = Math.hypot(dx, dz);
    if (d < 2.2) { c.path.shift(); if (!c.path.length) this.routeCar(c); return; }
    // dirección: gira hacia el punto siguiente (giros suaves en los cruces)
    const want = Math.atan2(dx, dz);
    let df = want - c.yaw; while (df > Math.PI) df -= TAU; while (df < -Math.PI) df += TAU;
    c.yaw += clamp(df, -2.4 * dt, 2.4 * dt);
    c.tx = Math.sin(c.yaw); c.tz = Math.cos(c.yaw);
    // frenar: jugador delante, otro coche delante en el mismo sentido o curva cerrada
    let want_v = c.speed * (Math.abs(df) > 0.6 ? 0.45 : 1);
    const ahead = (x: number, z: number, len: number, wid: number) => { const fx = x - c.x, fz = z - c.z; const f = fx * c.tx + fz * c.tz, s2 = -fx * c.tz + fz * c.tx; return f > 0 && f < len && Math.abs(s2) < wid; };
    if (ahead(px, pz, 7, 1.7)) want_v = 0;
    else for (const o of this.cars) if (o !== c && o.tx * c.tx + o.tz * c.tz > 0.6 && ahead(o.x, o.z, 7.5, 1.3)) { want_v = 0; break; }
    c.v += (want_v - c.v) * (1 - Math.exp(-(want_v < c.v ? 6 : 1.4) * dt));
    c.x += c.tx * c.v * dt; c.z += c.tz * c.v * dt;
  }

  private poseCars() {
    const B = this.carIm;
    this.cars.forEach((c, i) => {
      const root = this.root.compose(this.v.set(c.x, 0, c.z), this.q.setFromAxisAngle(UP, c.yaw), this.s.set(1, 1, 1));
      this.part(B.body, i, root, 0, 0, 0);
      this.part(B.cabin, i, root, 0, 1.26, -0.2);
      if (c.taxi) { this.part(B.roof, i, root, 0, 1.72, -0.2); this.part(B.check, i, root, 0, 0, 0); }
      else { this.m4.makeScale(0, 0, 0); B.roof.setMatrixAt(i, this.m4); B.check.setMatrixAt(i, this.m4); }
      const spin = this.time * c.v * 2.9;
      let k = 0;
      for (const sx of [-0.88, 0.88]) for (const sz of [-1.3, 1.3]) this.part(B.wheels, i * 4 + k++, root, sx, 0.34, sz, spin);
      this.part(B.lights, i * 2, root, -0.6, 0.66, 2.01); this.part(B.lights, i * 2 + 1, root, 0.6, 0.66, 2.01);
      this.part(B.tails, i * 2, root, -0.6, 0.7, -2.01); this.part(B.tails, i * 2 + 1, root, 0.6, 0.7, -2.01);
    });
    for (const m of Object.values(B)) m.instanceMatrix.needsUpdate = true;
  }

  dispose() {
    for (const m of [...Object.values(this.im), ...Object.values(this.carIm)]) { m.geometry.dispose(); (m.material as THREE.Material).dispose(); m.dispose(); }
    this.bubbleTex.dispose(); (this.bubble.material as THREE.Material).dispose();
  }
}
