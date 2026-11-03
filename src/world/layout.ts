import type { DistrictDef, PoiDef, SolidDef, StickerDef, GraffitiDef } from './types';

/** ===== Generación determinista del mapa del mundo abierto (cajas, círculos, calles) ===== */

export interface Box { x: number; z: number; w: number; d: number; h: number; color: number; district: string; sign?: string; poi?: string }
export interface Circle { x: number; z: number; r: number; kind: 'tree' | 'rock' | 'lamp' | 'palm' | 'crate' | 'fountain' | 'hut' | 'bush'; district: string }
export interface Road { x1: number; z1: number; x2: number; z2: number; w: number }
export interface SpotRequest { key: string; district: string; at: [number, number] }

export interface LayoutInput {
  districts: DistrictDef[];
  pois: PoiDef[];
  stickers: StickerDef[];
  graffiti: GraffitiDef[];
  /** Posiciones de NPC (primaria y alternativa) para reservar su sitio */
  npcs: SpotRequest[];
  worldSize: number;
  seaZ: number;
}

export interface Layout {
  boxes: Box[];
  circles: Circle[];
  roads: Road[];
  /** key → posición final en coordenadas del mundo */
  spots: Record<string, { x: number; z: number }>;
  worldSize: number;
  seaZ: number;
  blocked(x: number, z: number, r: number): boolean;
  districtAt(x: number, z: number): string | null;
}

function rngOf(seed: string) {
  let s = 2166136261;
  for (let i = 0; i < seed.length; i++) { s ^= seed.charCodeAt(i); s = Math.imul(s, 16777619) >>> 0; }
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

const CELL = 8;

/** Distancia de un punto a un segmento */
function segDist(px: number, pz: number, x1: number, z1: number, x2: number, z2: number) {
  const dx = x2 - x1, dz = z2 - z1, l2 = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (pz - z1) * dz) / l2));
  return Math.hypot(px - (x1 + t * dx), pz - (z1 + t * dz));
}

/** Posición del macizo de un POI según su lado */
export function solidCenter(at: [number, number], s: SolidDef): [number, number] {
  const side = s.side ?? 'n';
  if (side === 'n') return [at[0], at[1] - (s.d / 2 + 1.8)];
  if (side === 's') return [at[0], at[1] + (s.d / 2 + 1.8)];
  if (side === 'e') return [at[0] + (s.w / 2 + 1.8), at[1]];
  return [at[0] - (s.w / 2 + 1.8), at[1]];
}

export function buildLayout(inp: LayoutInput): Layout {
  const boxes: Box[] = [];
  const circles: Circle[] = [];
  const dmap = new Map(inp.districts.map((d) => [d.id, d]));
  const center = (d: string): [number, number] => dmap.get(d)!.center;
  const world = (district: string, at: [number, number]): [number, number] => [center(district)[0] + at[0], center(district)[1] + at[1]];

  // ---- calles: de la plaza a cada distrito
  const hub = center('plaza');
  const roads: Road[] = inp.districts.filter((d) => d.id !== 'plaza').map((d) => ({ x1: hub[0], z1: hub[1], x2: d.center[0], z2: d.center[1], w: 7 }));

  // ---- índice espacial
  const grid = new Map<string, { b?: Box; c?: Circle }[]>();
  const put = (k: string, v: { b?: Box; c?: Circle }) => { const a = grid.get(k); if (a) a.push(v); else grid.set(k, [v]); };
  const keyOf = (cx: number, cz: number) => cx + ',' + cz;
  const addBox = (b: Box) => {
    boxes.push(b);
    for (let cx = Math.floor((b.x - b.w / 2) / CELL); cx <= Math.floor((b.x + b.w / 2) / CELL); cx++) for (let cz = Math.floor((b.z - b.d / 2) / CELL); cz <= Math.floor((b.z + b.d / 2) / CELL); cz++) put(keyOf(cx, cz), { b });
  };
  const addCircle = (c: Circle) => {
    circles.push(c);
    for (let cx = Math.floor((c.x - c.r) / CELL); cx <= Math.floor((c.x + c.r) / CELL); cx++) for (let cz = Math.floor((c.z - c.r) / CELL); cz <= Math.floor((c.z + c.r) / CELL); cz++) put(keyOf(cx, cz), { c });
  };
  const hitBox = (b: Box, x: number, z: number, r: number) => {
    const dx = Math.max(Math.abs(x - b.x) - b.w / 2, 0), dz = Math.max(Math.abs(z - b.z) - b.d / 2, 0);
    return dx * dx + dz * dz < r * r;
  };
  const blocked = (x: number, z: number, r: number): boolean => {
    if (Math.abs(x) > inp.worldSize - r || z < -inp.worldSize + r || z > inp.seaZ - 1 - r) return true;
    const x0 = Math.floor((x - r) / CELL), x1 = Math.floor((x + r) / CELL), z0 = Math.floor((z - r) / CELL), z1 = Math.floor((z + r) / CELL);
    for (let cx = x0; cx <= x1; cx++) for (let cz = z0; cz <= z1; cz++) {
      const a = grid.get(keyOf(cx, cz));
      if (!a) continue;
      for (const e of a) {
        if (e.b && hitBox(e.b, x, z, r)) return true;
        if (e.c && Math.hypot(x - e.c.x, z - e.c.z) < e.c.r + r) return true;
      }
    }
    return false;
  };

  // ---- 1) macizos de los POI y círculos fijos (fuente)
  const reserved: { x: number; z: number; r: number }[] = [];
  for (const p of inp.pois) {
    const [wx, wz] = world(p.district, p.at);
    if (p.solid) {
      const [sx, sz] = solidCenter(p.at, p.solid);
      const [bx, bz] = world(p.district, [sx, sz]);
      // los POI con la misma posición (garito de día/de noche) comparten el macizo
      if (!boxes.some((b) => b.poi && Math.abs(b.x - bx) < 0.01 && Math.abs(b.z - bz) < 0.01)) addBox({ x: bx, z: bz, w: p.solid.w, d: p.solid.d, h: p.solid.h, color: p.solid.color, district: p.district, sign: p.solid.sign, poi: p.id });
    }
    if (p.kind === 'fountain') addCircle({ x: wx, z: wz, r: p.radius ?? 3.6, kind: 'fountain', district: p.district });
    reserved.push({ x: wx, z: wz, r: 3 });
  }
  for (const s of [...inp.stickers, ...inp.graffiti]) { const [x, z] = world(s.district, s.at); reserved.push({ x, z, r: 2 }); }
  for (const n of inp.npcs) { const [x, z] = world(n.district, n.at); reserved.push({ x, z, r: 2.4 }); }

  // ---- 2) edificios aleatorios por distrito
  for (const d of inp.districts) {
    const R = rngOf('b:' + d.id);
    const [cx, cz] = d.center;
    let placed = 0, tries = 0;
    while (placed < d.buildings && tries++ < 400) {
      const w = 6 + R() * 8, dd = 6 + R() * 8, h = d.height[0] + R() * (d.height[1] - d.height[0]);
      const x = cx + (R() - 0.5) * (d.size[0] - w - 4), z = cz + (R() - 0.5) * (d.size[1] - dd - 4);
      if (Math.hypot(x - cx, z - cz) < d.freeRadius + Math.hypot(w, dd) / 2) continue;
      const rad = Math.hypot(w, dd) / 2;
      if (reserved.some((r) => hitBox({ x, z, w, d: dd, h, color: 0, district: d.id }, r.x, r.z, r.r + 1.5))) continue;
      if (roads.some((rd) => segDist(x, z, rd.x1, rd.z1, rd.x2, rd.z2) < rd.w / 2 + rad + 1.5)) continue;
      // separación con otros edificios y macizos
      if (boxes.some((o) => Math.abs(o.x - x) < (o.w + w) / 2 + 3.5 && Math.abs(o.z - z) < (o.d + dd) / 2 + 3.5)) continue;
      // no invadir otros distritos
      if (inp.districts.some((o) => o.id !== d.id && Math.abs(x - o.center[0]) < o.size[0] / 2 + w / 2 + 1 && Math.abs(z - o.center[1]) < o.size[1] / 2 + dd / 2 + 1)) continue;
      addBox({ x, z, w, d: dd, h, color: d.palette[Math.floor(R() * d.palette.length)], district: d.id });
      placed++;
    }
  }

  // ---- 3) props: árboles, rocas, farolas, palmeras
  for (const d of inp.districts) {
    const R = rngOf('p:' + d.id);
    const kinds: Circle['kind'][] = d.style === 'beach' ? ['palm', 'palm', 'rock', 'bush'] : d.style === 'savanna' ? ['tree', 'bush', 'rock', 'hut'] : d.style === 'industrial' ? ['crate', 'crate', 'rock', 'lamp'] : d.style === 'plaza' ? ['tree', 'lamp', 'bush', 'tree'] : ['lamp', 'tree', 'bush', 'crate'];
    const count = d.style === 'plaza' ? 16 : 26;
    let placed = 0, tries = 0;
    while (placed < count && tries++ < 500) {
      const x = d.center[0] + (R() - 0.5) * (d.size[0] - 4), z = d.center[1] + (R() - 0.5) * (d.size[1] - 4);
      const kind = kinds[Math.floor(R() * kinds.length)];
      const r = kind === 'hut' ? 2.6 : kind === 'tree' || kind === 'palm' ? 0.7 : kind === 'crate' ? 0.9 : kind === 'rock' ? 0.8 : kind === 'bush' ? 0.7 : 0.35;
      if (reserved.some((rr) => Math.hypot(x - rr.x, z - rr.z) < rr.r + r + 1.2)) continue;
      if (roads.some((rd) => segDist(x, z, rd.x1, rd.z1, rd.x2, rd.z2) < rd.w / 2 + r + 0.5)) continue;
      if (blocked(x, z, r + 1.2)) continue;
      if (z > inp.seaZ - 4) continue;
      addCircle({ x, z, r, kind, district: d.id });
      placed++;
    }
  }

  // ---- 4) posiciones finales de todos los puntos (con búsqueda del hueco libre más cercano)
  const spots: Record<string, { x: number; z: number }> = {};
  const free = (x: number, z: number) => {
    if (!blocked(x, z, 0.65)) return { x, z };
    for (let ring = 1; ring <= 22; ring++) for (let a = 0; a < 16; a++) {
      const ang = (a / 16) * Math.PI * 2, rr = ring * 0.8;
      const nx = x + Math.cos(ang) * rr, nz = z + Math.sin(ang) * rr;
      if (!blocked(nx, nz, 0.65)) return { x: nx, z: nz };
    }
    return { x, z };
  };
  for (const p of inp.pois) { const [x, z] = world(p.district, p.at); spots['poi:' + p.id] = free(x, z); }
  for (const s of inp.stickers) { const [x, z] = world(s.district, s.at); spots['sticker:' + s.id] = free(x, z); }
  for (const g of inp.graffiti) { const [x, z] = world(g.district, g.at); spots['graffiti:' + g.id] = free(x, z); }
  for (const n of inp.npcs) { const [x, z] = world(n.district, n.at); spots[n.key] = free(x, z); }

  const districtAt = (x: number, z: number) => {
    for (const d of inp.districts) if (Math.abs(x - d.center[0]) <= d.size[0] / 2 && Math.abs(z - d.center[1]) <= d.size[1] / 2) return d.id;
    return null;
  };
  return { boxes, circles, roads, spots, worldSize: inp.worldSize, seaZ: inp.seaZ, blocked, districtAt };
}

/** Celdas alcanzables (1 m) desde un punto, para comprobar que todo se puede visitar */
export function reachableCells(l: Layout, from: [number, number], r = 0.45, step = 1): Set<string> {
  const key = (ix: number, iz: number) => ix + ',' + iz;
  const seen = new Set<string>();
  const q: [number, number][] = [[Math.round(from[0] / step), Math.round(from[1] / step)]];
  seen.add(key(q[0][0], q[0][1]));
  const min = Math.floor(-l.worldSize / step) - 1, max = Math.ceil(l.worldSize / step) + 1;
  while (q.length) {
    const [ix, iz] = q.pop()!;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
      const nx = ix + dx, nz = iz + dz;
      if (nx < min || nx > max || nz < min || nz > max) continue;
      const k = key(nx, nz);
      if (seen.has(k) || l.blocked(nx * step, nz * step, r)) continue;
      seen.add(k); q.push([nx, nz]);
    }
  }
  return seen;
}

export const cellOf = (x: number, z: number, step = 1) => Math.round(x / step) + ',' + Math.round(z / step);
