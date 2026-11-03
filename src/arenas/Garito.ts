import * as THREE from 'three';
import { FLOOR_LIM } from '../combat/Match';
import { Arena, Beam, type ArenaOpts } from './Arena';
import { Crowd, type Seat } from './Crowd';
import { loopSeats, rrLoop } from './Seating';

const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const std = (color: number, roughness = 0.9, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

/** Pared de ladrillo sucio con pintadas */
function wallTexture(): THREE.CanvasTexture {
  const W = 1024, H = 512;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  g.fillStyle = '#3b332c'; g.fillRect(0, 0, W, H);
  for (let y = 0; y < H; y += 32) for (let x = (y / 32) % 2 ? -32 : 0; x < W; x += 64) {
    const v = 40 + Math.random() * 28;
    g.fillStyle = `rgb(${v + 22},${v + 6},${v - 4})`; g.fillRect(x + 2, y + 2, 60, 28);
  }
  for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(0,0,0,${Math.random() * 0.16})`; g.fillRect(Math.random() * W, Math.random() * H, 2, 2 + Math.random() * 14); }
  // pintadas
  const tags: [string, string, number, number, number][] = [
    ['3000', '#e8453c', 90, 140, 110], ['PETI', '#3cc6e8', 52, 600, 210], ['ELSO ✗', '#e8d23c', 64, 300, 400], ['VIVA EL HOYO', '#d8d8d8', 56, 700, 420], ['RIP', '#b8f03c', 80, 880, 120], ['BIG MAC', '#ff7ac8', 58, 130, 330],
  ];
  g.textBaseline = 'middle';
  for (const [t, col, size, x, y] of tags) {
    g.save(); g.translate(x, y); g.rotate((Math.random() - 0.5) * 0.25);
    g.font = `900 ${size}px Impact, "Arial Black", sans-serif`; g.lineWidth = 7; g.strokeStyle = 'rgba(0,0,0,0.7)'; g.strokeText(t, 0, 0);
    g.fillStyle = col; g.globalAlpha = 0.85; g.fillText(t, 0, 0); g.restore();
    // chorretones
    g.fillStyle = col; g.globalAlpha = 0.5;
    for (let i = 0; i < 5; i++) g.fillRect(x - 20 + Math.random() * 120, y + size * 0.4, 3, 10 + Math.random() * 40);
    g.globalAlpha = 1;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping; t.anisotropy = 4;
  return t;
}

function neonTexture(text: string, color: string, sub = ''): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = 'rgba(0,0,0,0)'; g.clearRect(0, 0, 1024, 256);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '900 150px Impact, "Arial Black", sans-serif';
  g.shadowColor = color; g.shadowBlur = 40; g.fillStyle = color;
  g.fillText(text, 512, sub ? 100 : 128); g.fillText(text, 512, sub ? 100 : 128);
  g.shadowBlur = 0; g.fillStyle = '#fff'; g.globalAlpha = 0.85; g.fillText(text, 512, sub ? 100 : 128);
  if (sub) { g.globalAlpha = 1; g.font = '700 54px "Arial Narrow", sans-serif'; g.shadowColor = color; g.shadowBlur = 20; g.fillStyle = color; g.fillText(sub, 512, 210); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function smokeTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 256; c.height = 256;
  const g = c.getContext('2d')!;
  for (let i = 0; i < 70; i++) {
    const x = 40 + Math.random() * 176, y = 40 + Math.random() * 176, r = 22 + Math.random() * 50;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(210,200,190,0.16)'); gr.addColorStop(1, 'rgba(210,200,190,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  }
  const t = new THREE.CanvasTexture(c); return t;
}

/** Sótano clandestino de las 3000 viviendas: ring oxidado, bombillas colgando, humo y un público muy pegado. */
export class Garito extends Arena {
  readonly id = 'garito';
  readonly displayName = 'Garito de las 3000';
  fogColor = 0x120d09;
  fogDensity = 0.018;
  exposure = 1.0;
  private bulbs: { pivot: THREE.Group; light: THREE.PointLight; glow: THREE.Mesh; ph: number }[] = [];
  private neons: { mat: THREE.MeshBasicMaterial; ph: number; broken: boolean }[] = [];
  private smoke: THREE.Mesh[] = [];

  constructor(opts: ArenaOpts) {
    super(opts, {
      canvas: 0x6e6659, border: 0x5a1212, accent: 0xc69a32, rope: [0x7a3a1a, 0x6a6a6a, 0x7a1a1a],
      skirt: 0x17120e, apronText: 'EL GARITO · 3000 VIVIENDAS', ringText: 'LAS 3000',
    });
    const R = rng(21);
    const fm = this.floor.material as THREE.MeshStandardMaterial;
    fm.color.set(0x2b2723); fm.roughness = 0.88; fm.metalness = 0.05;
    const H = 10, HALF = 17;

    // --- paredes con pintadas, techo con tuberías y vigas
    const wallTex = wallTexture();
    for (const [x, z, ry] of [[0, -HALF, 0], [0, HALF, Math.PI], [HALF, 0, -Math.PI / 2], [-HALF, 0, Math.PI / 2]] as const) {
      const m = std(0xffffff, 0.95); m.map = wallTex.clone(); m.map.repeat.set(2, 1); m.map.needsUpdate = true;
      const w = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, H), m);
      w.position.set(x, H / 2, z); w.rotation.y = ry; w.receiveShadow = true;
      this.group.add(w);
    }
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, HALF * 2), std(0x0f0c0a, 1));
    ceil.rotation.x = Math.PI / 2; ceil.position.y = H;
    this.group.add(ceil);
    const pipeMat = std(0x5a4a3a, 0.5, 0.7);
    for (let i = 0; i < 6; i++) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.16 + (i % 2) * 0.1, 0.16 + (i % 2) * 0.1, HALF * 2, 8), pipeMat);
      p.rotation.z = Math.PI / 2; p.position.set(0, H - 0.5 - (i % 3) * 0.35, -13 + i * 5.2); this.group.add(p);
    }
    for (let i = 0; i < 5; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, HALF * 2), std(0x1c1814, 0.9)); b.position.set(-14 + i * 7, H - 0.3, 0); this.group.add(b); }

    // --- bombillas colgando (la del centro, sobre el ring)
    const bulbAt: [number, number][] = [[0, 0], [-8, 7], [8, -7], [9, 8], [-9, -8]];
    bulbAt.forEach(([x, z], i) => {
      const pivot = new THREE.Group(); pivot.position.set(x, H - 0.2, z);
      const len = i === 0 ? 3.0 : 2.0;
      const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, len, 4), std(0x0a0a0a)); cable.position.y = -len / 2; pivot.add(cable);
      const shade = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.34, 14, 1, true), std(0x2a2a2e, 0.6, 0.6, { side: THREE.DoubleSide })); shade.position.y = -len + 0.05; pivot.add(shade);
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffe6a8, toneMapped: false })); glow.position.y = -len - 0.08; pivot.add(glow);
      const light = new THREE.PointLight(0xffc468, i === 0 ? 0 : 22, 18, 1.5); light.position.y = -len - 0.15; pivot.add(light);
      this.group.add(pivot);
      this.bulbs.push({ pivot, light, glow, ph: i * 1.9 });
    });
    // la luz principal es una lámpara cenital sobre el ring
    this.key.color.set(0xffd9a0); this.key.intensity = 4.0; this.key.position.set(0, 7.2, 0.3);
    this.key.angle = 0.62; this.key.penumbra = 0.75; this.key.shadow.camera.near = 2; this.key.shadow.camera.far = 20;
    this.addBeam(new Beam(0xffd9a0, 7, 3.4, 0, 0, 0), 0, 7.2, 0);
    (this.beams[0].pivot.children[0] as THREE.Mesh).material = new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.022, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
    this.group.add(new THREE.HemisphereLight(0x80706a, 0x120c08, 0.35));

    // --- neones rotos y pegados a la pared del fondo
    const sign = (text: string, color: string, sub: string, x: number, y: number, z: number, w: number, ry: number, broken = false) => {
      const mat = new THREE.MeshBasicMaterial({ map: neonTexture(text, color, sub), transparent: true, toneMapped: false, depthWrite: false, side: THREE.DoubleSide });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 4), mat);
      m.position.set(x, y, z); m.rotation.y = ry; this.group.add(m);
      this.neons.push({ mat, ph: R() * 10, broken });
      const l = new THREE.PointLight(new THREE.Color(color), 6, 12, 1.5); l.position.set(x, y, z + (ry === 0 ? 0.8 : -0.8)); this.group.add(l);
    };
    sign('BAR LAS 3000', '#ff3ea5', 'CERVEZA · CHUPITOS · PELEAS', -3, 6.2, -HALF + 0.1, 9, 0, true);
    sign('ABIERTO', '#3effa5', '', 10, 4.2, -HALF + 0.1, 3.2, 0);
    sign('SIN ÁRBITRO', '#ffd23e', 'AQUÍ NO HAY REGLAS', 0, 5.8, HALF - 0.1, 7, Math.PI);

    // --- barra del bar, taburetes, mesa de billar, cajas y barriles
    const wood = std(0x4a2f1a, 0.6), dark = std(0x1a1410, 0.8);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(11, 1.2, 1.3), wood); bar.position.set(-8, 0.6, -HALF + 2.2); bar.castShadow = true; this.group.add(bar);
    const top = new THREE.Mesh(new THREE.BoxGeometry(11.3, 0.1, 1.6), std(0x9a6a3a, 0.4, 0.1)); top.position.set(-8, 1.25, -HALF + 2.2); this.group.add(top);
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(11, 0.12, 0.5), wood); shelf.position.set(-8, 3.0, -HALF + 0.5); this.group.add(shelf);
    const shelf2 = shelf.clone(); shelf2.position.y = 2.2; this.group.add(shelf2);
    const botCols = [0x2d7a46, 0x8a5a1a, 0xb3262b, 0x1c3f8c, 0xe7e7d0, 0x3a2a1a];
    for (let i = 0; i < 40; i++) {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.4 + R() * 0.15, 8), std(botCols[i % 6], 0.15, 0.2, { transparent: true, opacity: 0.9 }));
      b.position.set(-13.2 + (i % 20) * 0.55, (i < 20 ? 3.25 : 2.45), -HALF + 0.5); this.group.add(b);
    }
    for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.2, 0.9, 10), dark); s.position.set(-12 + i * 2.1, 0.45, -HALF + 3.6); s.castShadow = true; const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.1, 10), std(0x7a1a1a)); seat.position.set(-12 + i * 2.1, 0.95, -HALF + 3.6); this.group.add(s, seat); }
    const pool = new THREE.Group();
    const felt = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.2, 2.2), std(0x1f6a3a, 1)); felt.position.y = 1.05;
    const rim = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.3, 2.6), wood); rim.position.y = 0.95;
    for (const [lx, lz] of [[-1.9, -1], [1.9, -1], [-1.9, 1], [1.9, 1]]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.9, 0.25), wood); l.position.set(lx, 0.45, lz); pool.add(l); }
    pool.add(rim, felt); pool.position.set(13, 0, 9.5); pool.rotation.y = 0.3; pool.traverse((o) => { (o as THREE.Mesh).castShadow = true; }); this.group.add(pool);
    const crateMat = std(0x7a5a2a, 0.85), barrelMat = std(0x3a4a5a, 0.5, 0.5);
    for (let i = 0; i < 14; i++) {
      const a = R() * Math.PI * 2, r = 13.5 + R() * 2.4;
      if (i % 2) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.1, 12), barrelMat); b.position.set(Math.cos(a) * r, 0.55, Math.sin(a) * r); b.castShadow = true; this.group.add(b); }
      else { const cr = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), crateMat); cr.position.set(Math.cos(a) * r, 0.45, Math.sin(a) * r); cr.rotation.y = R() * 3; cr.castShadow = true; this.group.add(cr); }
    }
    // altavoces
    for (const sx of [-1, 1]) { const sp = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.0, 0.9), dark); sp.position.set(sx * 13.5, 1.0, HALF - 1); sp.castShadow = true; this.group.add(sp); for (const [dy, r] of [[0.55, 0.32], [1.4, 0.2]]) { const c = new THREE.Mesh(new THREE.CircleGeometry(r, 16), std(0x333333, 0.9)); c.position.set(sx * 13.5, dy, HALF - 1.46); c.rotation.y = Math.PI; this.group.add(c); } }

    // --- público: muy pegado a la valla, de pie y gritando
    const seats: Seat[] = loopSeats(rrLoop(FLOOR_LIM + 0.9, FLOOR_LIM + 0.9, 1.5, 0.5), 0.45, 4, 0.95, 0, 0, 0.85, (x, z, row) => R() < 0.12 + row * 0.04, 0.5);
    this.crowd = new Crowd(seats, [0x111114, 0x1a1a22, 0x2b1a1a, 0x1b2438, 0x3a3a40, 0x5a1a1a, 0x2a2a14, 0xb3262b, 0xe7e7e7, 0x2d7a46], { near: () => true, seed: 9, flashes: 0 });
    this.group.add(this.crowd.group);

    // --- humo de tabaco
    const smokeTex = smokeTexture();
    for (let i = 0; i < 4; i++) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), new THREE.MeshBasicMaterial({ map: smokeTex, transparent: true, opacity: 0.55, depthWrite: false, fog: false, toneMapped: false }));
      s.rotation.x = -Math.PI / 2; s.position.y = 4.5 + i * 1.1; this.group.add(s); this.smoke.push(s);
    }

    // --- animación: bombillas que se balancean, neones que parpadean, humo a la deriva
    this.anim.push((dt, t) => {
      for (const b of this.bulbs) {
        b.pivot.rotation.z = Math.sin(t * 0.9 + b.ph) * 0.07; b.pivot.rotation.x = Math.cos(t * 0.7 + b.ph) * 0.05;
        const flick = 0.85 + 0.15 * Math.sin(t * 31 + b.ph * 5) * Math.sin(t * 7 + b.ph);
        if (b.light.intensity > 0) b.light.intensity = 22 * flick;
        (b.glow.material as THREE.MeshBasicMaterial).color.setScalar(0.85 + 0.15 * flick).multiply(new THREE.Color(1, 0.92, 0.66));
      }
      this.key.intensity = 4.0 * (0.94 + 0.06 * Math.sin(t * 9) * Math.sin(t * 2.3));
      for (const n of this.neons) {
        const off = n.broken && (Math.sin(t * 3.1 + n.ph) > 0.93 || Math.sin(t * 17 + n.ph) > 0.97);
        n.mat.opacity = off ? 0.25 : 0.9 + 0.1 * Math.sin(t * 40 + n.ph);
      }
      this.smoke.forEach((s, i) => { s.rotation.z += dt * 0.012 * (i % 2 ? 1 : -1); s.position.x = Math.sin(t * 0.07 + i) * 1.5; });
    });
  }
}
