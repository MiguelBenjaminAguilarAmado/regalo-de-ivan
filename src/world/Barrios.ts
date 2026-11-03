import * as THREE from 'three';
import type { DistrictDef } from './types';
import type { Layout, Road } from './layout';
import { box, merge, paint } from './CityMeshes';

/**
 * ===== La cultura de cada barrio =====
 * Misma ciudad, pero cada barrio con lo suyo: tendederos y la peña bética en las 3000, cabinas rojas y autobús de dos
 * pisos en Manchester, banderas chilenas y la hinchada de Rosario Central en Santiago, palapas y cayucos en la playa
 * hondureña, chimeneas y contenedores en el polígono, la estatua dorada de Pablo en la Torre y el parque de combates
 * de la tribu en la Aldea de Kongui. Todo se funde en muy pocas mallas.
 */

function rngOf(seed: number) { let s = seed >>> 0; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }

function signTexture(lines: [string, string, number][], bg: string, w = 512, h = 160): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d')!;
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 6; g.strokeRect(6, 6, w - 12, h - 12);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  lines.forEach(([t, col, size], i) => { g.fillStyle = col; g.font = `900 ${size}px Impact, "Arial Black", sans-serif`; g.fillText(t, w / 2, h / 2 + (i - (lines.length - 1) / 2) * size * 1.05); });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/** Bandera a rayas (horizontales) con un dibujo opcional encima */
function flagTexture(stripes: string[], draw?: (g: CanvasRenderingContext2D, w: number, h: number) => void): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 192; c.height = 128;
  const g = c.getContext('2d')!;
  stripes.forEach((col, i) => { g.fillStyle = col; g.fillRect(0, (i * 128) / stripes.length, 192, 128 / stripes.length + 1); });
  draw?.(g, 192, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const star = (g: CanvasRenderingContext2D, x: number, y: number, r: number, col: string) => {
  g.fillStyle = col; g.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  g.closePath(); g.fill();
};

export interface Barrios { group: THREE.Group; update(t: number, px: number, pz: number): void; dispose(): void }

export function buildBarrios(layout: Layout, districts: DistrictDef[]): Barrios {
  const group = new THREE.Group();
  const solid: THREE.BufferGeometry[] = [];
  const glow: THREE.BufferGeometry[] = [];
  const disposables: { dispose(): void }[] = [];
  const flags: { mesh: THREE.Mesh; ph: number }[] = [];
  const smoke: { mesh: THREE.Mesh; x: number; z: number; y: number; ph: number }[] = [];
  const D = new Map(districts.map((d) => [d.id, d]));
  const R = rngOf(1717);

  const put = (g: THREE.BufferGeometry, color: number, x: number, y: number, z: number, ry = 0) => { if (ry) g.rotateY(ry); g.translate(x, y, z); solid.push(paint(g, color)); };
  /** ¿Cabe aquí algo de radio r, sin tapar calles, edificios ni sitios importantes? */
  const free = (x: number, z: number, r: number, roadOk = false) => !layout.blocked(x, z, r) && (roadOk || !layout.onRoad(x, z, r)) && !layout.nearSpot(x, z, r + 2.5) && layout.districtAt(x, z) !== null;
  /** Busca un sitio libre cerca de (x, z) */
  const near = (x: number, z: number, r: number) => {
    if (free(x, z, r)) return { x, z };
    for (let ring = 1; ring < 14; ring++) for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; const nx = x + Math.cos(a) * ring * 1.5, nz = z + Math.sin(a) * ring * 1.5; if (free(nx, nz, r)) return { x: nx, z: nz }; }
    return null;
  };
  const block = (x: number, z: number, w: number, d: number, district: string) => layout.addObstacle({ box: { x, z, w, d, h: 2, color: 0, district, poi: 'deco' } });
  const plane = (tex: THREE.Texture, w: number, h: number, x: number, y: number, z: number, ry: number, basic = true) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, side: THREE.DoubleSide }) : new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.8 }));
    m.position.set(x, y, z); m.rotation.y = ry; group.add(m); disposables.push(m.geometry, m.material as THREE.Material, tex);
    return m;
  };
  const flag = (tex: THREE.Texture, x: number, z: number, h = 6, ry = 0) => {
    put(new THREE.CylinderGeometry(0.06, 0.08, h, 6), 0xd8d8de, x, h / 2, z);
    const m = plane(tex, 1.8, 1.2, x + Math.cos(ry) * 0.9, h - 0.7, z - Math.sin(ry) * 0.9, ry, false);
    flags.push({ mesh: m, ph: R() * 6 });
  };
  const bunting = (x1: number, z1: number, x2: number, z2: number, y: number, cols: number[]) => {
    const L = Math.hypot(x2 - x1, z2 - z1), n = Math.floor(L / 0.9);
    const ry = Math.atan2(x2 - x1, z2 - z1) + Math.PI / 2;
    for (let i = 1; i < n; i++) {
      const t = i / n, sag = Math.sin(t * Math.PI) * 0.8;
      const g = new THREE.ConeGeometry(0.22, 0.45, 3); g.rotateX(Math.PI); g.rotateY(ry);
      put(g, cols[i % cols.length], x1 + (x2 - x1) * t, y - sag, z1 + (z2 - z1) * t);
    }
  };
  const cen = (id: string) => D.get(id)?.center ?? [0, 0];
  const roadsOf = (id: string, kind?: Road['kind']) => layout.roads.filter((r) => r.district === id && (!kind || r.kind === kind));

  // ======================================================================== LAS 3000 (Sevilla): tendederos, antenas y la peña bética
  {
    const cols = [0xc1272d, 0xf2f2f2, 0x2a8aff, 0xe8b42a, 0x2d9a5a, 0xff7ac8, 0x8a4a9a];
    for (const a of roadsOf('viviendas', 'alley')) {
      const L = Math.hypot(a.x2 - a.x1, a.z2 - a.z1), vert = Math.abs(a.x1 - a.x2) < 0.01;
      for (let s = 6; s < L - 4; s += 9) {
        const x = a.x1 + (a.x2 - a.x1) * (s / L), z = a.z1 + (a.z2 - a.z1) * (s / L), y = 6 + R() * 5;
        const span = a.w + 2;
        put(new THREE.BoxGeometry(vert ? span : 0.03, 0.03, vert ? 0.03 : span), 0xdddddd, x, y, z);
        for (let k = 0; k < 4; k++) { const o = -span / 2 + 0.6 + k * (span - 1.2) / 3; put(new THREE.BoxGeometry(vert ? 0.45 : 0.04, 0.6, vert ? 0.04 : 0.45), cols[Math.floor(R() * cols.length)], vert ? x + o : x, y - 0.33, vert ? z : z + o); }
      }
    }
    // antenas parabólicas en las fachadas
    for (const b of layout.boxes.filter((x) => x.district === 'viviendas' && !x.poi && x.h > 10)) {
      for (let k = 0; k < 3; k++) {
        const g = new THREE.CylinderGeometry(0.45, 0.1, 0.18, 10); g.rotateX(Math.PI / 2 - 0.4);
        put(g, 0xe8e8ee, b.x + (R() - 0.5) * (b.w - 1.5), 4 + R() * (b.h - 6), b.z + b.d / 2 + 0.2);
      }
    }
    // la peña bética: barra con toldo verdiblanco, bandera y letrero
    const [cx, cz] = cen('viviendas');
    const p = near(cx + 12, cz - 10, 3);
    if (p) {
      put(new THREE.BoxGeometry(4.4, 1.1, 1.4), 0x2a6a3a, p.x, 0.6, p.z);
      for (let i = 0; i < 8; i++) put(new THREE.BoxGeometry(0.62, 0.08, 2.2), i % 2 ? 0xf2f2f2 : 0x0b8a3a, p.x - 2.2 + 0.31 + i * 0.62, 2.5, p.z + 0.4);
      for (const sx of [-2.1, 2.1]) put(new THREE.CylinderGeometry(0.05, 0.05, 2.5, 5), 0x2a2a30, p.x + sx, 1.25, p.z + 1.3);
      for (let i = 0; i < 4; i++) { put(new THREE.CylinderGeometry(0.35, 0.35, 0.05, 10), 0xf2f2f2, p.x - 1.5 + i, 0.75, p.z + 2.6); put(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 5), 0xdddddd, p.x - 1.5 + i, 0.37, p.z + 2.6); }
      plane(signTexture([['PEÑA BÉTICA', '#ffffff', 52], ['¡VIVA ER BETIS MANQUE PIERDA!', '#ffe9a8', 26]], '#0b8a3a'), 4.2, 1.3, p.x, 3.4, p.z - 0.3, 0);
      flag(flagTexture(['#0b8a3a', '#ffffff', '#0b8a3a', '#ffffff', '#0b8a3a'], (g) => { g.fillStyle = '#0b8a3a'; g.beginPath(); g.arc(96, 64, 26, 0, Math.PI * 2); g.fill(); g.fillStyle = '#fff'; g.font = '900 30px Impact'; g.textAlign = 'center'; g.fillText('RB', 96, 74); }), p.x + 3, p.z - 0.6, 6.5);
      block(p.x, p.z, 4.6, 1.6, 'viviendas');
    }
    // canasta de baloncesto en la plaza
    const c = near(cx - 10, cz + 8, 1.5);
    if (c) { put(new THREE.CylinderGeometry(0.08, 0.1, 3.4, 6), 0x3a3a40, c.x, 1.7, c.z); put(new THREE.BoxGeometry(1.4, 0.9, 0.06), 0xf2f2f2, c.x, 3.4, c.z + 0.3); const r = new THREE.TorusGeometry(0.25, 0.03, 4, 12); r.rotateX(Math.PI / 2); put(r, 0xff6a2a, c.x, 3.1, c.z + 0.6); }
  }

  // ======================================================================== MANCHESTER: cabinas rojas, autobús de dos pisos, pub y banderines
  {
    const blv = roadsOf('manchester', 'boulevard')[0];
    const [cx, cz] = cen('manchester');
    if (blv) {
      const z = blv.z1;
      // autobús rojo aparcado junto a la acera del bulevar
      const bx = cx - 14, bz = z + blv.w / 2 - 1.6;
      const bus = merge([box(2.5, 1.6, 9, 0, 1.15, 0, 0xc1121f), box(2.5, 1.5, 9, 0, 2.75, 0, 0xc1121f), box(2.52, 0.5, 8.6, 0, 1.6, 0, 0x1a2230), box(2.52, 0.5, 8.6, 0, 3.0, 0, 0x1a2230), box(2.4, 0.1, 9, 0, 3.55, 0, 0xe8e8e8), box(2.4, 0.6, 0.06, 0, 3.0, 4.52, 0x101010)])!;
      bus.rotateY(Math.PI / 2); bus.translate(bx, 0, bz); solid.push(bus);
      for (const ox of [-3.2, 3.2]) for (const oz of [-1.2, 1.2]) { const w = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 12); w.rotateX(Math.PI / 2); put(w, 0x111114, bx + ox, 0.5, bz + oz); }
      layout.addObstacle({ box: { x: bx, z: bz, w: 9, d: 2.5, h: 3, color: 0, district: 'manchester', poi: 'deco' } });
      // cabinas de teléfono rojas en las aceras
      for (const ox of [-30, -2, 26]) {
        const p = near(cx + ox, z - blv.w / 2 - 2.2, 0.8);
        if (!p) continue;
        put(new THREE.BoxGeometry(1, 2.5, 1), 0xc1121f, p.x, 1.25, p.z); put(new THREE.BoxGeometry(1.06, 0.2, 1.06), 0xc1121f, p.x, 2.6, p.z);
        put(new THREE.BoxGeometry(0.8, 1.5, 1.02), 0x2a3a4e, p.x, 1.4, p.z); put(new THREE.BoxGeometry(1.02, 0.18, 0.8), 0xf2f2f2, p.x, 2.35, p.z);
        layout.addObstacle({ circle: { x: p.x, z: p.z, r: 0.7, kind: 'crate', district: 'manchester' } });
      }
      // banderines rojos, blancos y azules cruzando el bulevar
      for (const ox of [-36, -12, 12, 36]) bunting(cx + ox, z - blv.w / 2 - 1, cx + ox, z + blv.w / 2 + 1, 6.5, [0xc1121f, 0xf2f2f2, 0x1c3f8c]);
    }
    // pub
    const pub = layout.boxes.filter((b) => b.district === 'manchester' && !b.poi && b.h > 6).sort((a, b) => Math.hypot(a.x - cx, a.z - cz) - Math.hypot(b.x - cx, b.z - cz))[0];
    if (pub) plane(signTexture([['THE HOYO ARMS', '#f2c14e', 50], ['PUB · DESDE 1987', '#efe6d5', 24]], '#1a3a2a'), 4.6, 1.4, pub.x, 4, pub.z + pub.d / 2 + 0.08, 0);
  }

  // ======================================================================== SANTIAGO: Chile, la hinchada y Rosario Central
  {
    const [cx, cz] = cen('santiago');
    const chile = flagTexture(['#ffffff', '#d52b1e'], (g) => { g.fillStyle = '#0039a6'; g.fillRect(0, 0, 64, 64); star(g, 32, 32, 18, '#ffffff'); });
    for (let i = 0; i < 6; i++) { const p = near(cx - 25 + i * 10, cz + 20, 0.5); if (p) flag(chile, p.x, p.z, 6, Math.PI / 2); }
    for (const ox of [-20, 0, 20]) bunting(cx + ox - 9, cz + 26, cx + ox + 9, cz + 26, 5.5, [0xd52b1e, 0xffffff, 0x0039a6]);
    // rincón canalla: bandera azul y amarilla y mural de Rosario Central
    const rc = near(cx + 22, cz + 14, 2.5);
    if (rc) {
      flag(flagTexture(['#00346e', '#f7c600', '#00346e']), rc.x, rc.z, 6.5);
      plane(signTexture([['ROSARIO CENTRAL', '#f7c600', 46], ['¡VAMOS CANALLA!', '#ffffff', 34]], '#00346e'), 4.6, 1.6, rc.x - 2.8, 2.2, rc.z, Math.PI / 2, false);
      put(new THREE.BoxGeometry(0.2, 2.2, 4.8), 0x8a8478, rc.x - 2.95, 1.1, rc.z);
    }
    // carrito de empanadas
    const e = near(cx - 16, cz + 12, 1.5);
    if (e) { put(new THREE.BoxGeometry(2.2, 1, 1.2), 0xf2f2f2, e.x, 0.85, e.z); put(new THREE.BoxGeometry(2.4, 0.08, 1.5), 0xd52b1e, e.x, 2.2, e.z); for (const sx of [-1, 1]) put(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 5), 0x2a2a30, e.x + sx, 1.3, e.z - 0.6); }
  }

  // ======================================================================== TORRE: estatua dorada de Pablo, fuente y banderas con sus iniciales
  {
    const [cx, cz] = cen('torre');
    const pm = flagTexture(['#c1272d'], (g) => { g.fillStyle = '#f2c14e'; g.font = '900 64px Impact'; g.textAlign = 'center'; g.fillText('PM', 96, 86); });
    for (let i = 0; i < 4; i++) { const p = near(cx - 15 + i * 10, cz + 13, 0.5); if (p) flag(pm, p.x, p.z, 8); }
    const f = near(cx + 14, cz + 2, 3.5);
    if (f) {
      put(new THREE.CylinderGeometry(3, 3.2, 0.7, 24), 0xd8d8e0, f.x, 0.35, f.z);
      put(new THREE.CylinderGeometry(2.6, 2.6, 0.08, 24), 0x4ab0e8, f.x, 0.68, f.z);
      put(new THREE.CylinderGeometry(0.3, 0.5, 1.4, 10), 0xf2c14e, f.x, 1.3, f.z);
      layout.addObstacle({ circle: { x: f.x, z: f.z, r: 3.2, kind: 'fountain', district: 'torre' } });
    }
  }

  // ======================================================================== POLÍGONO: chimeneas con humo, contenedores y grúa
  {
    const [cx, cz] = cen('industrial');
    for (const [ox, oz] of [[-36, -10], [34, 8]]) {
      const p = near(cx + ox, cz + oz, 1.6);
      if (!p) continue;
      for (let k = 0; k < 6; k++) put(new THREE.CylinderGeometry(1.1 - k * 0.05, 1.2 - k * 0.05, 3.5, 12), k % 2 ? 0xf2f2f2 : 0xc1272d, p.x, 1.75 + k * 3.5, p.z);
      layout.addObstacle({ circle: { x: p.x, z: p.z, r: 1.3, kind: 'crate', district: 'industrial' } });
      for (let i = 0; i < 6; i++) {
        const m = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 6), new THREE.MeshBasicMaterial({ color: 0xbfc4cc, transparent: true, opacity: 0.4, depthWrite: false }));
        group.add(m); disposables.push(m.geometry, m.material as THREE.Material);
        smoke.push({ mesh: m, x: p.x, z: p.z, y: 21, ph: i / 6 });
      }
    }
    // contenedores apilados junto al muelle
    const cols = [0xc1272d, 0x2a5a8a, 0x2d7a4a, 0xe8b42a, 0x8a4a2a];
    for (let i = 0; i < 6; i++) {
      const p = near(cx - 30 + i * 9, cz + 34, 3.4);
      if (!p) continue;
      const n = 1 + Math.floor(R() * 3);
      for (let k = 0; k < n; k++) put(new THREE.BoxGeometry(6, 2.5, 2.4), cols[(i + k) % cols.length], p.x, 1.25 + k * 2.55, p.z);
      layout.addObstacle({ box: { x: p.x, z: p.z, w: 6, d: 2.4, h: 2.5 * n, color: 0, district: 'industrial', poi: 'deco' } });
    }
    // grúa torre
    const g = near(cx + 10, cz + 30, 1.5);
    if (g) {
      put(new THREE.BoxGeometry(1.2, 30, 1.2), 0xe8b42a, g.x, 15, g.z);
      put(new THREE.BoxGeometry(22, 0.9, 0.9), 0xe8b42a, g.x + 6, 30.4, g.z);
      put(new THREE.BoxGeometry(3, 2, 2), 0x5a5a62, g.x - 4, 29.8, g.z);
      put(new THREE.BoxGeometry(0.06, 12, 0.06), 0x2a2a30, g.x + 14, 24.4, g.z);
      layout.addObstacle({ circle: { x: g.x, z: g.z, r: 1, kind: 'crate', district: 'industrial' } });
    }
  }

  // ======================================================================== PLAYA (Honduras): palapas, cayucos, banderas y arco de bienvenida
  {
    const [cx, cz] = cen('playa');
    const hn = flagTexture(['#0073cf', '#ffffff', '#0073cf'], (g) => { for (const [x, y] of [[96, 64], [72, 52], [120, 52], [72, 76], [120, 76]]) star(g, x, y, 8, '#0073cf'); });
    for (let i = 0; i < 5; i++) { const p = near(cx - 70 + i * 32, cz - 5, 0.5); if (p) flag(hn, p.x, p.z, 6.5); }
    const thatch = 0xc8a050;
    for (let i = 0; i < 6; i++) {
      const p = near(cx - 60 + i * 24 + R() * 6, cz + 20 + R() * 8, 2);
      if (!p) continue;
      for (const [sx, sz] of [[-1.2, -1.2], [1.2, -1.2], [1.2, 1.2], [-1.2, 1.2]]) put(new THREE.CylinderGeometry(0.08, 0.1, 2.6, 5), 0x7a5a30, p.x + sx, 1.3, p.z + sz);
      put(new THREE.ConeGeometry(2.4, 1.3, 8), thatch, p.x, 3.1, p.z);
      for (const sx of [-0.7, 0.7]) put(new THREE.BoxGeometry(0.6, 0.15, 1.6), [0x5ac8c8, 0xff8a8a, 0xf2c14e][i % 3], p.x + sx, 0.25, p.z);
      layout.addObstacle({ circle: { x: p.x, z: p.z, r: 0.4, kind: 'crate', district: 'playa' } });
    }
    for (let i = 0; i < 5; i++) {
      const p = near(cx - 50 + i * 26, layout.seaZ - 4, 1.2);
      if (!p) continue;
      const boat = merge([box(1.2, 0.5, 4.2, 0, 0.3, 0, [0x2a8aff, 0xc1272d, 0x2d9a5a, 0xf2c14e, 0xff7ac8][i]), box(1.0, 0.1, 3.8, 0, 0.56, 0, 0xf2f2f2), box(0.08, 0.06, 2.4, 0.4, 0.62, 0, 0x7a5a30)])!;
      boat.rotateY(0.3 + R()); boat.translate(p.x, 0, p.z); solid.push(boat);
    }
    // arco de bienvenida en el paseo
    const prom = roadsOf('playa', 'promenade')[0];
    if (prom) {
      const ax = cx + 24, az = prom.z1;
      for (const s of [-1, 1]) put(new THREE.BoxGeometry(0.6, 6, 0.6), 0xf2f2f2, ax, 3, az + s * (prom.w / 2 + 0.6));
      plane(signTexture([['¡BIENVENIDOS A HONDURAS!', '#ffffff', 40], ['PLAYA DEL HOYO · CATRACHOS DE CORAZÓN', '#ffe9a8', 22]], '#0073cf', 640, 160), prom.w + 1.4, 2.2, ax, 6.4, az, Math.PI / 2);
    }
  }

  // ======================================================================== ALDEA DE KONGUI: parque de combates, tótems, antorchas y estandartes
  {
    const [cx, cz] = cen('aldea');
    const ring = layout.spots['poi:parque_tribu'] ?? { x: cx + 10, z: cz - 13 };
    const fx = ring.x, fz = ring.z - 6.5;
    // círculo de tierra y piedras
    const disc = new THREE.CircleGeometry(6, 32); disc.rotateX(-Math.PI / 2); disc.translate(fx, 0.08, fz); solid.push(paint(disc, 0x9a6a3a));
    for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2; put(new THREE.DodecahedronGeometry(0.3, 0), 0x6a5a4a, fx + Math.cos(a) * 6.2, 0.18, fz + Math.sin(a) * 6.2); }
    // bancos de troncos para mirar y antorchas
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.3;
      const log = new THREE.CylinderGeometry(0.28, 0.28, 2.6, 8); log.rotateZ(Math.PI / 2); log.rotateY(-a + Math.PI / 2); log.translate(fx + Math.cos(a) * 8, 0.3, fz + Math.sin(a) * 8); solid.push(paint(log, 0x5a3a20));
      const tx = fx + Math.cos(a + 0.5) * 9.2, tz = fz + Math.sin(a + 0.5) * 9.2;
      put(new THREE.CylinderGeometry(0.06, 0.08, 2, 6), 0x3a2410, tx, 1, tz);
      const fl = new THREE.ConeGeometry(0.18, 0.5, 6); fl.translate(tx, 2.2, tz); glow.push(paint(fl, 0xffa040));
    }
    // tótems pintados y estandartes del reino
    const totem = [0x7a2a1a, 0xe0b050, 0x3a2a1a, 0xefe3c8];
    for (const [ox, oz] of [[-9, -9], [9, -9], [-9, 9], [9, 9]]) {
      const tx = fx + ox * 1.05, tz = fz + oz * 1.05;
      for (let k = 0; k < 4; k++) put(new THREE.BoxGeometry(0.9, 0.9, 0.9), totem[k], tx, 0.45 + k * 0.95, tz);
      put(new THREE.BoxGeometry(2.2, 0.15, 0.3), 0xc1272d, tx, 3.6, tz);
    }
    const kong = flagTexture(['#c1272d', '#e0b050', '#c1272d'], (g) => { g.fillStyle = '#1a0e08'; g.font = '900 30px Impact'; g.textAlign = 'center'; g.fillText('REINO KONGUI', 96, 74); });
    for (const [ox, oz] of [[-12, 0], [12, 0]]) flag(kong, fx + ox, fz + oz, 7);
    // patrones pintados en las casas de adobe (franjas en zigzag)
    for (const b of layout.boxes.filter((x) => x.district === 'aldea' && !x.poi && x.poi !== 'deco')) {
      for (let k = 0; k < 6; k++) put(new THREE.BoxGeometry(Math.min(0.8, b.w / 6), 0.25, 0.04), k % 2 ? 0x7a2a1a : 0xefe3c8, b.x - b.w / 2 + (k + 0.5) * (b.w / 6), 1.4 + (k % 2) * 0.25, b.z + b.d / 2 + 0.03);
    }
  }

  const solidMesh = new THREE.Mesh(merge(solid)!, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75 }));
  solidMesh.castShadow = true; solidMesh.receiveShadow = true; solidMesh.matrixAutoUpdate = false; solidMesh.updateMatrix();
  group.add(solidMesh); disposables.push(solidMesh.geometry, solidMesh.material as THREE.Material);
  if (glow.length) { const gm = new THREE.Mesh(merge(glow)!, new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false })); group.add(gm); disposables.push(gm.geometry, gm.material as THREE.Material); }

  return {
    group,
    update(t, px, pz) {
      for (const f of flags) if (Math.abs(f.mesh.position.x - px) + Math.abs(f.mesh.position.z - pz) < 80) f.mesh.rotation.x = Math.sin(t * 2.2 + f.ph) * 0.12;
      for (const s of smoke) {
        if (Math.abs(s.x - px) + Math.abs(s.z - pz) > 160) continue;
        const k = (t * 0.12 + s.ph) % 1;
        s.mesh.position.set(s.x + k * 6, s.y + k * 14, s.z + k * 2);
        s.mesh.scale.setScalar(0.6 + k * 2.4);
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = 0.45 * (1 - k);
      }
    },
    dispose() { disposables.forEach((d) => d.dispose()); },
  };
}
