import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { DistrictDef } from './types';
import type { Layout } from './layout';

/**
 * ===== Mallas de la ciudad de Hoyo, FUSIONADAS para que vaya fluido =====
 * Todo lo que no se mueve (suelo, aceras, marcas viales, edificios, tejados) se junta en muy pocas mallas con
 * colores por vértice: cientos de edificios = 3 llamadas de dibujo.
 */

const col = new THREE.Color();
/** Pinta una geometría de un color (atributo `color`) */
export function paint(g: THREE.BufferGeometry, color: number | THREE.Color): THREE.BufferGeometry {
  const c = typeof color === 'number' ? col.setHex(color) : color;
  const n = g.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return g;
}
/** Une geometrías (las que no tengan uv reciben una) */
export function merge(list: THREE.BufferGeometry[]): THREE.BufferGeometry | null {
  if (!list.length) return null;
  const norm = list.map((g) => {
    let x = g.index ? g.toNonIndexed() : g;
    if (!x.attributes.uv) { x = x.clone(); x.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(x.attributes.position.count * 2), 2)); }
    if (!x.attributes.color) paint(x, 0xffffff);
    for (const k of Object.keys(x.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(k)) x.deleteAttribute(k);
    return x;
  });
  const m = mergeGeometries(norm, false);
  norm.forEach((g) => g.dispose());
  return m;
}
export const box = (w: number, h: number, d: number, x: number, y: number, z: number, color: number, ry = 0) => {
  const g = new THREE.BoxGeometry(w, h, d);
  if (ry) g.rotateY(ry);
  g.translate(x, y, z);
  return paint(g, color);
};

/** Fachada: pared clara con ventanas (se tiñe con el color del edificio) y su mapa de luces nocturnas */
export function facadeTextures(): { map: THREE.CanvasTexture; glow: THREE.CanvasTexture } {
  const W = 128, H = 256;
  const a = document.createElement('canvas'); a.width = W; a.height = H;
  const b = document.createElement('canvas'); b.width = W; b.height = H;
  const g = a.getContext('2d')!, e = b.getContext('2d')!;
  g.fillStyle = '#e4ddd2'; g.fillRect(0, 0, W, H);
  e.fillStyle = '#000'; e.fillRect(0, 0, W, H);
  let s = 91; const R = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  // 16 plantas de 16 px (≈ 1 m por cada 16 px en v con repeat h/16) y 8 columnas
  for (let y = 0; y < H; y += 16) {
    // línea de forjado
    g.fillStyle = 'rgba(0,0,0,0.10)'; g.fillRect(0, y + 14, W, 2);
    for (let x = 0; x < W; x += 16) {
      g.fillStyle = '#5a6676'; g.fillRect(x + 4, y + 3, 9, 10);
      g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(x + 4, y + 3, 9, 2);
      g.fillStyle = '#c9c0b2'; g.fillRect(x + 3, y + 13, 11, 1.5);
      if (R() < 0.45) { e.fillStyle = R() < 0.75 ? '#ffd890' : R() < 0.5 ? '#9fd6ff' : '#ff9ac8'; e.fillRect(x + 4, y + 3, 9, 10); }
    }
  }
  const mk = (c: HTMLCanvasElement) => { const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
  return { map: mk(a), glow: mk(b) };
}

/** Caja de edificio con las uv escaladas al tamaño (las ventanas no se estiran) */
function buildingGeo(w: number, h: number, d: number): THREE.BufferGeometry {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  // caras: +x, -x, +y, -y, +z, -z (4 vértices cada una)
  for (let f = 0; f < 6; f++) for (let k = 0; k < 4; k++) {
    const i = f * 4 + k;
    if (f === 2 || f === 3) { uv.setXY(i, 0.02, 0.97); continue; }
    const span = f < 2 ? d : w;
    uv.setXY(i, uv.getX(i) * Math.max(1, Math.round(span / 2.6)) / 8, uv.getY(i) * Math.max(1, Math.round(h / 3.2)) / 16);
  }
  return g;
}

export interface CityStatic {
  group: THREE.Group;
  windowMat: THREE.MeshStandardMaterial;
  dispose(): void;
}

const ASPHALT = 0x2e2e33;
const SIDEWALK = 0xa59f94;

export function buildCityStatic(layout: Layout, districts: DistrictDef[], seaZ: number, skip: (poi: string) => boolean): CityStatic {
  const group = new THREE.Group();
  const disposables: { dispose(): void }[] = [];
  const add = (geo: THREE.BufferGeometry | null, mat: THREE.Material, cast = false, receive = true) => {
    if (!geo) return null;
    const m = new THREE.Mesh(geo, mat); m.castShadow = cast; m.receiveShadow = receive; m.matrixAutoUpdate = false; m.updateMatrix();
    group.add(m); disposables.push(geo, mat);
    return m;
  };
  const dmap = new Map(districts.map((d) => [d.id, d]));
  const W = layout.worldSize;

  // ---- suelo: asfalto en toda la ciudad, césped fuera
  const ground: THREE.BufferGeometry[] = [];
  { const g = new THREE.PlaneGeometry(900, 900); g.rotateX(-Math.PI / 2); g.translate(0, -0.05, 0); ground.push(paint(g, 0x56664a)); }
  { const g = new THREE.PlaneGeometry(W * 2 + 4, seaZ + W + 4); g.rotateX(-Math.PI / 2); g.translate(0, -0.02, (seaZ - W) / 2); ground.push(paint(g, ASPHALT)); }
  // aceras y manzanas (suelo elevado), plazas, parques y playa
  const tint = new THREE.Color();
  for (const p of layout.pads) {
    const d = dmap.get(p.district)!;
    let c: number;
    if (p.kind === 'beach') c = 0xdccb94;
    else if (p.kind === 'park') c = d.ground;
    else if (p.kind === 'square') c = d.style === 'plaza' ? 0xb9ab92 : tint.setHex(SIDEWALK).lerp(col.setHex(d.ground), 0.45).getHex();
    else c = tint.setHex(SIDEWALK).lerp(col.setHex(d.ground), 0.15).getHex();
    const h = p.kind === 'beach' ? 0.03 : 0.06;
    ground.push(box(p.w, h, p.d, p.x, h / 2, p.z, c));
  }
  // la playa llega hasta el agua; orilla
  const playa = districts.find((d) => d.style === 'beach');
  if (playa) { const x0 = playa.center[0] - playa.size[0] / 2, x1 = playa.center[0] + playa.size[0] / 2; ground.push(box(x1 - x0, 0.06, 6, (x0 + x1) / 2, 0.03, seaZ - 2, 0xeadcb0)); }
  // callejuelas: adoquín oscuro
  for (const r of layout.roads) if (r.kind === 'alley') {
    const L = Math.hypot(r.x2 - r.x1, r.z2 - r.z1);
    const g = new THREE.BoxGeometry(Math.abs(r.x2 - r.x1) > 0.1 ? L : r.w, 0.08, Math.abs(r.x2 - r.x1) > 0.1 ? r.w : L);
    g.translate((r.x1 + r.x2) / 2, 0.04, (r.z1 + r.z2) / 2);
    ground.push(paint(g, 0x5a5550));
  }
  add(merge(ground), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }));

  // ---- marcas viales: línea discontinua central, bordes de avenida y pasos de cebra en los cruces
  const marks: THREE.BufferGeometry[] = [];
  const quad = (x: number, z: number, w: number, d: number, color = 0xf2f2e8) => { const g = new THREE.PlaneGeometry(w, d); g.rotateX(-Math.PI / 2); g.translate(x, 0.012, z); marks.push(paint(g, color)); };
  const nodes = layout.graph.nodes;
  const nearNode = (x: number, z: number, r: number) => nodes.some((n) => Math.abs(n.x - x) < r && Math.abs(n.z - z) < r);
  for (const r of layout.roads) {
    if (r.kind === 'alley') continue;
    const vert = Math.abs(r.x1 - r.x2) < 0.01;
    const L = Math.hypot(r.x2 - r.x1, r.z2 - r.z1);
    const ux = (r.x2 - r.x1) / L, uz = (r.z2 - r.z1) / L;
    const yellow = r.kind === 'avenue' ? 0xe8c84a : 0xf2f2e8;
    for (let s = 2; s < L - 2; s += 6) {
      const x = r.x1 + ux * s, z = r.z1 + uz * s;
      if (nearNode(x, z, 8)) continue;
      if (r.kind === 'boulevard') continue;
      quad(x, z, vert ? 0.22 : 3, vert ? 3 : 0.22, yellow);
    }
    if (r.kind === 'boulevard') {
      // mediana con césped
      const g = new THREE.BoxGeometry(vert ? 2.2 : L, 0.14, vert ? L : 2.2); g.translate((r.x1 + r.x2) / 2, 0.07, (r.z1 + r.z2) / 2); marks.push(paint(g, 0x4f7a3a));
    }
  }
  // pasos de cebra en los cruces
  for (const n of nodes) {
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = n.x + dx * 9, z = n.z + dz * 9;
      if (!layout.onRoad(x, z, 0) || layout.blocked(x, z, 0.2)) continue;
      for (let k = -2; k <= 2; k++) quad(x + (dz ? k * 1.1 : 0), z + (dx ? k * 1.1 : 0), dz ? 0.6 : 2.4, dz ? 2.4 : 0.6, 0xf2f2e8);
    }
  }
  add(merge(marks), new THREE.MeshBasicMaterial({ vertexColors: true }), false, false);

  // ---- edificios: fachada con ventanas (una malla), tejados y macizos lisos (otra)
  const tex = facadeTextures();
  const windowMat = new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.map, emissiveMap: tex.glow, emissive: 0xffe0a0, emissiveIntensity: 0, roughness: 0.88 });
  disposables.push(tex.map, tex.glow);
  const walls: THREE.BufferGeometry[] = [], plain: THREE.BufferGeometry[] = [];
  for (const b of layout.boxes) {
    if (b.poi && skip(b.poi)) continue;
    const st = dmap.get(b.district)?.style;
    if (b.poi || st === 'savanna' || st === 'beach' && b.h < 6) {
      plain.push(box(b.w, b.h, b.d, b.x, b.h / 2, b.z, b.color));
      if (b.poi && b.h > 3) plain.push(box(b.w + 0.3, 0.3, b.d + 0.3, b.x, b.h + 0.15, b.z, 0x2a2a2e));
      continue;
    }
    const g = buildingGeo(b.w, b.h, b.d); g.translate(b.x, b.h / 2, b.z); walls.push(paint(g, b.color));
    // tejado, cornisa y bajos comerciales
    plain.push(box(b.w + 0.4, 0.4, b.d + 0.4, b.x, b.h + 0.2, b.z, 0x2a2a2e));
    if (st === 'industrial') {
      // nave: tejado a dos aguas (aproximado) y portón
      plain.push(box(b.w * 0.98, 1.2, b.d * 0.5, b.x, b.h + 0.8, b.z, 0x5a5a62));
    } else if (b.h > 9 && (b.w > 8 || b.d > 8)) {
      // casetón y depósitos en la azotea
      plain.push(box(Math.min(3, b.w * 0.3), 2.2, Math.min(3, b.d * 0.3), b.x + b.w * 0.2, b.h + 1.3, b.z - b.d * 0.15, 0x5a5652));
    }
  }
  const bm = add(merge(walls), windowMat, true, true);
  void bm;
  add(merge(plain), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85 }), true, true);

  // ---- mar
  const seaMat = new THREE.MeshStandardMaterial({ color: 0x1f6f9a, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.92 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(900, 300), seaMat);
  sea.rotation.x = -Math.PI / 2; sea.position.set(0, -0.15, seaZ + 150);
  group.add(sea); disposables.push(sea.geometry, seaMat);
  group.userData.sea = sea;

  return { group, windowMat, dispose: () => disposables.forEach((d) => d.dispose()) };
}

// ---------------------------------------------------------------------- taxi de Hoyo
let taxiCache: { body: THREE.BufferGeometry; glass: THREE.BufferGeometry; sign: THREE.CanvasTexture } | null = null;
/** El taxi de Hoyo: amarillo, franja de cuadros, piloto «TAXI · HOYO», tapacubos y matrícula. Morro hacia +z. */
export function taxiParts() {
  if (taxiCache) return taxiCache;
  const Y = 0xf2c21a, K = 0x141418, Wh = 0xf5f5f0, CH = 0x8a8a92;
  const p: THREE.BufferGeometry[] = [];
  // carrocería: bajos, capó, maletero y techo
  p.push(box(1.86, 0.5, 4.3, 0, 0.55, 0, Y));
  p.push(box(1.84, 0.28, 1.2, 0, 0.92, 1.45, Y));
  p.push(box(1.84, 0.28, 0.9, 0, 0.92, -1.6, Y));
  p.push(box(1.62, 0.08, 1.9, 0, 1.56, -0.15, Y));
  // pilares
  for (const sx of [-0.78, 0.78]) for (const sz of [0.78, -1.08]) p.push(box(0.07, 0.56, 0.07, sx, 1.28, sz, Y));
  // franja de cuadros a cada lado
  for (const sx of [-0.935, 0.935]) for (let i = 0; i < 18; i++) for (let j = 0; j < 2; j++) p.push(box(0.02, 0.09, 0.21, sx, 0.62 + j * 0.09, -1.8 + i * 0.212, (i + j) % 2 ? K : Wh));
  // parachoques, rejilla, faros y pilotos, matrícula
  p.push(box(1.9, 0.18, 0.16, 0, 0.38, 2.16, CH), box(1.9, 0.18, 0.16, 0, 0.38, -2.16, CH));
  p.push(box(1.0, 0.16, 0.04, 0, 0.66, 2.16, K));
  for (const sx of [-0.66, 0.66]) { p.push(box(0.36, 0.16, 0.05, sx, 0.68, 2.16, 0xfff6cc), box(0.32, 0.12, 0.05, sx, 0.72, -2.16, 0xd01818)); }
  p.push(box(0.6, 0.14, 0.03, 0, 0.42, 2.25, 0xf2f2f2), box(0.6, 0.14, 0.03, 0, 0.42, -2.25, 0xf2f2f2));
  // espejos
  for (const sx of [-1.0, 1.0]) p.push(box(0.16, 0.1, 0.12, sx, 1.08, 0.65, K));
  // ruedas con tapacubos
  for (const sx of [-0.88, 0.88]) for (const sz of [-1.35, 1.35]) {
    const w = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 14); w.rotateZ(Math.PI / 2); w.translate(sx, 0.36, sz); p.push(paint(w, 0x101012));
    const c = new THREE.CylinderGeometry(0.2, 0.2, 0.28, 10); c.rotateZ(Math.PI / 2); c.translate(sx, 0.36, sz); p.push(paint(c, 0xc8c8d0));
  }
  // piloto del techo (soporte)
  p.push(box(0.75, 0.06, 0.3, 0, 1.63, -0.15, K));
  const glass = [box(1.56, 0.5, 1.82, 0, 1.28, -0.15, 0x2a3a4e)];
  // cartel del techo
  const c = document.createElement('canvas'); c.width = 256; c.height = 96;
  const g = c.getContext('2d')!;
  g.fillStyle = '#fff4c0'; g.fillRect(0, 0, 256, 96);
  g.fillStyle = '#141418'; g.font = '900 54px Impact, "Arial Black", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('TAXI', 128, 38); g.font = '700 26px "Arial Narrow", sans-serif'; g.fillStyle = '#c1272d'; g.fillText('· HOYO ·', 128, 76);
  const sign = new THREE.CanvasTexture(c); sign.colorSpace = THREE.SRGBColorSpace;
  taxiCache = { body: merge(p)!, glass: merge(glass)!, sign };
  return taxiCache;
}

/** Un taxi completo (3 mallas que comparten geometría con los demás taxis) */
export function makeTaxi(): THREE.Group {
  const t = taxiParts();
  const g = new THREE.Group();
  const body = new THREE.Mesh(t.body, TAXI_MAT.body); body.castShadow = true;
  const glass = new THREE.Mesh(t.glass, TAXI_MAT.glass);
  const sign = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.26, 0.26), TAXI_MAT.sign()); sign.position.set(0, 1.79, -0.15);
  g.add(body, glass, sign);
  return g;
}
const TAXI_MAT = {
  body: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.35, metalness: 0.25 }),
  glass: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.08, metalness: 0.6, transparent: true, opacity: 0.85 }),
  _sign: null as THREE.MeshBasicMaterial | null,
  sign() { return this._sign ?? (this._sign = new THREE.MeshBasicMaterial({ map: taxiParts().sign, toneMapped: false })); },
};

// ---------------------------------------------------------------------- moto
/** La moto de Chema (roja, con el logo del Hoyo en el depósito). Morro hacia +z. */
export function makeMoto(): THREE.Group {
  const R = 0xc1272d, K = 0x18181c, M = 0xb8b8c2;
  const p: THREE.BufferGeometry[] = [];
  for (const z of [-0.72, 0.78]) {
    const w = new THREE.TorusGeometry(0.33, 0.1, 8, 18); w.rotateY(Math.PI / 2); w.translate(0, 0.43, z); p.push(paint(w, K));
    const h = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 10); h.rotateZ(Math.PI / 2); h.translate(0, 0.43, z); p.push(paint(h, M));
  }
  p.push(box(0.26, 0.26, 0.9, 0, 0.72, 0.05, K)); // motor
  p.push(box(0.34, 0.3, 0.62, 0, 1.0, 0.3, R)); // depósito
  p.push(box(0.3, 0.12, 0.7, 0, 0.98, -0.35, 0x2a1a14)); // asiento
  p.push(box(0.22, 0.18, 0.42, 0, 0.9, -0.85, R)); // colín
  const fork = new THREE.CylinderGeometry(0.035, 0.035, 0.85, 6); fork.rotateX(-0.35); fork.translate(0, 0.82, 0.68); p.push(paint(fork, M));
  p.push(box(0.75, 0.05, 0.05, 0, 1.24, 0.58, K)); // manillar
  p.push(box(0.24, 0.2, 0.12, 0, 1.06, 0.92, R)); // carenado
  p.push(box(0.16, 0.12, 0.04, 0, 1.02, 0.99, 0xfff4c8)); // faro
  p.push(box(0.12, 0.06, 0.04, 0, 0.92, -1.07, 0xd01818)); // piloto
  const ex = new THREE.CylinderGeometry(0.06, 0.07, 0.8, 8); ex.rotateX(Math.PI / 2 - 0.15); ex.translate(0.2, 0.52, -0.5); p.push(paint(ex, M));
  const g = new THREE.Group();
  const m = new THREE.Mesh(merge(p)!, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.3 }));
  m.castShadow = true;
  g.add(m);
  return g;
}
