import * as THREE from 'three';
import type { Seat } from './Crowd';

export interface LoopPt { x: number; z: number; nx: number; nz: number }

/** Rectángulo redondeado muestreado cada `step` metros, con la normal hacia fuera. */
export function rrLoop(hw: number, hd: number, r: number, step = 0.5): LoopPt[] {
  const pts: LoopPt[] = [];
  const line = (x0: number, z0: number, x1: number, z1: number, nx: number, nz: number) => {
    const L = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.round(L / step));
    for (let i = 0; i < n; i++) pts.push({ x: x0 + ((x1 - x0) * i) / n, z: z0 + ((z1 - z0) * i) / n, nx, nz });
  };
  const arc = (cx: number, cz: number, a0: number, a1: number) => {
    const L = Math.abs(a1 - a0) * r, n = Math.max(2, Math.round(L / step));
    for (let i = 0; i < n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push({ x: cx + r * Math.cos(a), z: cz + r * Math.sin(a), nx: Math.cos(a), nz: Math.sin(a) });
    }
  };
  const P = Math.PI / 2;
  line(-(hw - r), hd, hw - r, hd, 0, 1);
  arc(hw - r, hd - r, P, 0);
  line(hw, hd - r, hw, -(hd - r), 1, 0);
  arc(hw - r, -(hd - r), 0, -P);
  line(hw - r, -hd, -(hw - r), -hd, 0, -1);
  arc(-(hw - r), -(hd - r), -P, -2 * P);
  line(-hw, -(hd - r), -hw, hd - r, -1, 0);
  arc(-(hw - r), hd - r, 2 * P, P);
  return pts;
}

/** Banda (suelo, pared, frontal...) siguiendo un bucle entre dos desplazamientos/alturas. */
export function ribbon(loop: LoopPt[], d0: number, y0: number, d1: number, y1: number, mat: THREE.Material): THREE.Mesh {
  const n = loop.length;
  const pos: number[] = [];
  const idx: number[] = [];
  const uv: number[] = [];
  let u = 0;
  for (let i = 0; i <= n; i++) {
    const p = loop[i % n];
    const q = loop[(i + n - 1) % n];
    if (i > 0) u += Math.hypot(p.x - q.x, p.z - q.z);
    pos.push(p.x + p.nx * d0, y0, p.z + p.nz * d0, p.x + p.nx * d1, y1, p.z + p.nz * d1);
    uv.push(u / 4, 0, u / 4, 1);
    if (i < n) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = false;
  return m;
}

/** Filas de asientos siguiendo un bucle. */
export function loopSeats(loop: LoopPt[], d0: number, rows: number, rowDepth: number, y0: number, rise: number, spacing: number, skip?: (x: number, z: number, row: number) => boolean, stepOf = 0.5): Seat[] {
  const out: Seat[] = [];
  const every = Math.max(1, Math.round(spacing / stepOf));
  for (let r = 0; r < rows; r++) {
    const d = d0 + r * rowDepth;
    for (let i = r % 2; i < loop.length; i += every) {
      const p = loop[i];
      const x = p.x + p.nx * d, z = p.z + p.nz * d;
      if (skip?.(x, z, r)) continue;
      out.push({ x, y: y0 + r * rise, z, yaw: Math.atan2(-p.nx, -p.nz) });
    }
  }
  return out;
}

/** Gradas elípticas (arena tipo pabellón) */
export function ellipseSeats(o: { a0: number; b0: number; a1: number; b1: number; rows: number; hMax: number; y0: number; spacing: number; aisles: number; skip?: (x: number, z: number) => boolean; seed?: number }): Seat[] {
  const out: Seat[] = [];
  for (let k = 0; k < o.rows; k++) {
    const t = k / (o.rows - 1);
    const a = o.a0 + (o.a1 - o.a0) * t, b = o.b0 + (o.b1 - o.b0) * t;
    const y = o.y0 + o.hMax * Math.pow(t, 1.1);
    const per = 2 * Math.PI * Math.sqrt((a * a + b * b) / 2);
    const n = Math.floor(per / o.spacing);
    for (let i = (k % 2) * 0.5; i < n; i++) {
      const ang = (i / n) * Math.PI * 2;
      // pasillos
      const aisle = (ang / (Math.PI * 2)) * o.aisles;
      if (Math.abs(aisle - Math.round(aisle)) < 0.05 && o.aisles > 0) continue;
      const x = a * Math.cos(ang), z = b * Math.sin(ang);
      if (o.skip?.(x, z)) continue;
      out.push({ x, y, z, yaw: Math.atan2(-x, -z) });
    }
  }
  return out;
}

/** Terrazas escalonadas elípticas (tramo de cemento de las gradas) */
export function bowlGeometry(a0: number, b0: number, a1: number, b1: number, rows: number, hMax: number, y0: number, seg = 160): THREE.BufferGeometry {
  const pos: number[] = [];
  const P = (k: number, ang: number, y: number): [number, number, number] => {
    const t = k / rows;
    const a = a0 + (a1 - a0) * t, b = b0 + (b1 - b0) * t;
    return [a * Math.cos(ang), y, b * Math.sin(ang)];
  };
  const H = (k: number) => y0 + hMax * Math.pow(Math.min(1, k / (rows - 1)), 1.1);
  for (let k = 0; k < rows; k++) {
    for (let i = 0; i < seg; i++) {
      const a0_ = (i / seg) * Math.PI * 2, a1_ = ((i + 1) / seg) * Math.PI * 2;
      const hy = H(k) - 0.35, hy1 = k > 0 ? H(k - 1) - 0.35 : y0 - 0.5;
      // pisada
      const A = P(k, a0_, hy), B = P(k, a1_, hy), C = P(k + 1, a1_, hy), D = P(k + 1, a0_, hy);
      pos.push(...A, ...C, ...B, ...A, ...D, ...C);
      // contrahuella (borde interior)
      const E = P(k, a0_, hy1), F = P(k, a1_, hy1);
      pos.push(...E, ...B, ...F, ...E, ...A, ...B);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}
