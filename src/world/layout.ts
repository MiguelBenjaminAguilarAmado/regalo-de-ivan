import type { DistrictDef, PoiDef, SolidDef, StickerDef, GraffitiDef } from './types';

/**
 * ===== Generación determinista de la ciudad de Hoyo =====
 * Una ciudad de una pieza: grandes avenidas entre distritos y, dentro de cada distrito, su propio trazado
 * (calles, bulevar, callejuelas, paseo marítimo). Las calles parten el distrito en manzanas; cada manzana se llena de
 * edificios alrededor de un patio (con al menos un pasaje para entrar) y las plazas quedan libres.
 */

export interface Box { x: number; z: number; w: number; d: number; h: number; color: number; district: string; sign?: string; poi?: string }
export interface Circle { x: number; z: number; r: number; kind: 'tree' | 'rock' | 'lamp' | 'palm' | 'crate' | 'fountain' | 'hut' | 'bush'; district: string }
export type RoadKind = 'avenue' | 'street' | 'alley' | 'boulevard' | 'promenade';
export interface Road { x1: number; z1: number; x2: number; z2: number; w: number; kind: RoadKind; district: string | null }
/** Suelo elevado (aceras y manzanas), plazas, parques y playa: solo para dibujar */
export interface Pad { x: number; z: number; w: number; d: number; kind: 'block' | 'square' | 'park' | 'beach'; district: string }
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
  /** Avenidas entre distritos [x1, z1, x2, z2, ancho] */
  avenues?: [number, number, number, number, number][];
}

/** Red de calles para los coches: cruces y tramos entre cruces */
export interface RoadGraph { nodes: { x: number; z: number }[]; edges: { a: number; b: number; road: number }[] }

export interface Layout {
  boxes: Box[];
  circles: Circle[];
  roads: Road[];
  pads: Pad[];
  graph: RoadGraph;
  /** key → posición final en coordenadas del mundo */
  spots: Record<string, { x: number; z: number }>;
  worldSize: number;
  seaZ: number;
  blocked(x: number, z: number, r: number): boolean;
  districtAt(x: number, z: number): string | null;
  /** ¿Está este punto sobre la calzada de una calle (no acera)? */
  onRoad(x: number, z: number, r?: number): boolean;
}

function rngOf(seed: string) {
  let s = 2166136261;
  for (let i = 0; i < seed.length; i++) { s ^= seed.charCodeAt(i); s = Math.imul(s, 16777619) >>> 0; }
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

const CELL = 8;
const SIDEWALK = 2;

/** Distancia de un punto a un segmento */
export function segDist(px: number, pz: number, x1: number, z1: number, x2: number, z2: number) {
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

/** Fondo de las manzanas según el estilo del distrito (edificios alrededor del patio) */
const DEPTH: Record<string, number> = { plaza: 8, blocks: 10, theater: 11, tower: 15, stadium: 11, industrial: 16, beach: 9, savanna: 6 };

const boxCircle = (x0: number, z0: number, x1: number, z1: number, cx: number, cz: number, r: number) => {
  const dx = Math.max(x0 - cx, 0, cx - x1), dz = Math.max(z0 - cz, 0, cz - z1);
  return dx * dx + dz * dz < r * r;
};

export function buildLayout(inp: LayoutInput): Layout {
  const boxes: Box[] = [];
  const circles: Circle[] = [];
  const roads: Road[] = [];
  const pads: Pad[] = [];
  const dmap = new Map(inp.districts.map((d) => [d.id, d]));
  const center = (d: string): [number, number] => dmap.get(d)!.center;
  const world = (district: string, at: [number, number]): [number, number] => [center(district)[0] + at[0], center(district)[1] + at[1]];
  const W = inp.worldSize;

  // ------------------------------------------------------------------ 1) calles
  for (const [x1, z1, x2, z2, w] of inp.avenues ?? []) roads.push({ x1, z1, x2, z2, w, kind: 'avenue', district: null });
  const clampZ = (z: number) => Math.max(-W, Math.min(inp.seaZ - 2, z));
  const clampX = (x: number) => Math.max(-W, Math.min(W, x));
  for (const d of inp.districts) {
    const st = d.streets;
    const [cx, cz] = d.center, hw = d.size[0] / 2, hd = d.size[1] / 2;
    const x0 = cx - hw, x1 = cx + hw, z0 = cz - hd, z1 = cz + hd;
    // las calles salen hasta el eje de la avenida (8 m fuera del distrito) para conectar con ella
    for (const xo of st.xs) {
      const zEnd = st.north != null ? cz + st.north : clampZ(z1 + 8);
      roads.push({ x1: cx + xo, z1: clampZ(z0 - 8), x2: cx + xo, z2: zEnd, w: st.w, kind: 'street', district: d.id });
    }
    st.zs.forEach((zo, i) => {
      const promenade = d.style === 'beach' && i === 0;
      roads.push({ x1: clampX(x0 - 8), z1: cz + zo, x2: clampX(x1 + 8), z2: cz + zo, w: promenade ? 10 : st.w, kind: promenade ? 'promenade' : 'street', district: d.id });
    });
    if (st.boulevard != null) roads.push({ x1: clampX(x0 - 8), z1: cz + st.boulevard, x2: clampX(x1 + 8), z2: cz + st.boulevard, w: 14, kind: 'boulevard', district: d.id });
  }

  const onRoad = (x: number, z: number, r = 0) => roads.some((rd) => segDist(x, z, rd.x1, rd.z1, rd.x2, rd.z2) < rd.w / 2 + r);

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
    if (Math.abs(x) > W - r || z < -W + r || z > inp.seaZ - 1 - r) return true;
    const gx0 = Math.floor((x - r) / CELL), gx1 = Math.floor((x + r) / CELL), gz0 = Math.floor((z - r) / CELL), gz1 = Math.floor((z + r) / CELL);
    for (let cx = gx0; cx <= gx1; cx++) for (let cz = gz0; cz <= gz1; cz++) {
      const a = grid.get(keyOf(cx, cz));
      if (!a) continue;
      for (const e of a) {
        if (e.b && hitBox(e.b, x, z, r)) return true;
        if (e.c && Math.hypot(x - e.c.x, z - e.c.z) < e.c.r + r) return true;
      }
    }
    return false;
  };

  // ------------------------------------------------------------------ 2) macizos de los POI, fuente y zonas reservadas
  const reserved: { x: number; z: number; r: number }[] = [];
  const solids: { x0: number; z0: number; x1: number; z1: number }[] = [];
  for (const p of inp.pois) {
    const [wx, wz] = world(p.district, p.at);
    if (p.solid) {
      const [sx, sz] = solidCenter(p.at, p.solid);
      const [bx, bz] = world(p.district, [sx, sz]);
      if (!boxes.some((b) => b.poi && Math.abs(b.x - bx) < 0.01 && Math.abs(b.z - bz) < 0.01)) addBox({ x: bx, z: bz, w: p.solid.w, d: p.solid.d, h: p.solid.h, color: p.solid.color, district: p.district, sign: p.solid.sign, poi: p.id });
      solids.push({ x0: bx - p.solid.w / 2, z0: bz - p.solid.d / 2, x1: bx + p.solid.w / 2, z1: bz + p.solid.d / 2 });
    }
    if (p.kind === 'fountain') addCircle({ x: wx, z: wz, r: p.radius ?? 3.6, kind: 'fountain', district: p.district });
    reserved.push({ x: wx, z: wz, r: p.kind === 'fountain' ? (p.radius ?? 3.6) + 2.5 : 3 });
  }
  for (const s of [...inp.stickers, ...inp.graffiti]) { const [x, z] = world(s.district, s.at); reserved.push({ x, z, r: 2 }); }
  for (const n of inp.npcs) { const [x, z] = world(n.district, n.at); reserved.push({ x, z, r: 2.4 }); }

  // ------------------------------------------------------------------ 3) manzanas y edificios
  for (const d of inp.districts) {
    const R = rngOf('b:' + d.id);
    const st = d.streets;
    const [cx, cz] = d.center, hw = d.size[0] / 2, hd = d.size[1] / 2;
    const free = { x: cx, z: cz, r: d.freeRadius };
    const D = DEPTH[d.style] ?? 10;
    // límites de las manzanas: borde del distrito y calles internas
    type Cut = { at: number; w: number };
    const cutsX: Cut[] = [{ at: cx - hw, w: 0 }, ...st.xs.map((x) => ({ at: cx + x, w: st.w })), { at: cx + hw, w: 0 }].sort((a, b) => a.at - b.at);
    const zLines: Cut[] = st.zs.map((z, i) => ({ at: cz + z, w: d.style === 'beach' && i === 0 ? 10 : st.w }));
    if (st.boulevard != null) zLines.push({ at: cz + st.boulevard, w: 14 });
    const cutsZ: Cut[] = [{ at: cz - hd, w: 0 }, ...zLines, { at: cz + hd, w: 0 }].sort((a, b) => a.at - b.at);
    for (let i = 0; i < cutsX.length - 1; i++) for (let j = 0; j < cutsZ.length - 1; j++) {
      const px0 = cutsX[i].at + cutsX[i].w / 2, px1 = cutsX[i + 1].at - cutsX[i + 1].w / 2;
      const pz0 = cutsZ[j].at + cutsZ[j].w / 2, pz1 = cutsZ[j + 1].at - cutsZ[j + 1].w / 2;
      if (px1 - px0 < 4 || pz1 - pz0 < 4) continue;
      const mx = (px0 + px1) / 2, mz = (pz0 + pz1) / 2;
      // la playa: al sur del paseo, arena
      const beach = d.style === 'beach' && st.north != null && pz0 >= cz + st.north;
      const square = Math.hypot(mx - cx, mz - cz) < d.freeRadius || d.style === 'savanna';
      pads.push({ x: mx, z: mz, w: px1 - px0, d: pz1 - pz0, kind: beach ? 'beach' : d.style === 'savanna' ? 'park' : square ? 'square' : 'block', district: d.id });
      if (beach || d.style === 'savanna') continue;
      // zona edificable: la manzana menos la acera
      let regions: [number, number, number, number][] = [[px0 + SIDEWALK, pz0 + SIDEWALK, px1 - SIDEWALK, pz1 - SIDEWALK]];
      // callejuelas que parten las manzanas grandes (las 3000)
      if (st.alleys && !square) {
        const next: typeof regions = [];
        for (const [a0, b0, a1, b1] of regions) {
          if (a1 - a0 > 30) {
            const m = (a0 + a1) / 2 + (R() - 0.5) * 6;
            next.push([a0, b0, m - 1.6, b1], [m + 1.6, b0, a1, b1]);
            roads.push({ x1: m, z1: pz0, x2: m, z2: pz1, w: 3.2, kind: 'alley', district: d.id });
          } else next.push([a0, b0, a1, b1]);
        }
        regions = [];
        for (const [a0, b0, a1, b1] of next) {
          if (b1 - b0 > 30) {
            const m = (b0 + b1) / 2 + (R() - 0.5) * 6;
            regions.push([a0, b0, a1, m - 1.6], [a0, m + 1.6, a1, b1]);
            roads.push({ x1: a0 - SIDEWALK, z1: m, x2: a1 + SIDEWALK, z2: m, w: 3.2, kind: 'alley', district: d.id });
          } else regions.push([a0, b0, a1, b1]);
        }
      }
      for (const [a0, b0, a1, b1] of regions) fillRegion(d, R, D, a0, b0, a1, b1, free);
    }
  }

  function lotOk(x0: number, z0: number, x1: number, z1: number, free: { x: number; z: number; r: number }) {
    if (x1 - x0 < 3 || z1 - z0 < 3) return false;
    if (boxCircle(x0, z0, x1, z1, free.x, free.z, free.r)) return false;
    if (reserved.some((r) => boxCircle(x0, z0, x1, z1, r.x, r.z, r.r + 1.2))) return false;
    if (solids.some((s) => x0 < s.x1 + 2.5 && x1 > s.x0 - 2.5 && z0 < s.z1 + 2.5 && z1 > s.z0 - 2.5)) return false;
    if (Math.abs(x0) > W || Math.abs(x1) > W || z0 < -W || z1 > inp.seaZ - 3) return false;
    return true;
  }

  function fillRegion(d: DistrictDef, R: () => number, D: number, a0: number, b0: number, a1: number, b1: number, free: { x: number; z: number; r: number }) {
    const wR = a1 - a0, dR = b1 - b0;
    const height = () => {
      const [h0, h1] = d.height;
      let h = h0 + R() * (h1 - h0);
      if (d.style === 'tower' && R() < 0.25) h *= 1.5;
      return Math.round(h);
    };
    const color = () => d.palette[Math.floor(R() * d.palette.length)];
    const add = (x0: number, z0: number, x1: number, z1: number) => {
      if (!lotOk(x0, z0, x1, z1, free)) return false;
      addBox({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, w: x1 - x0, d: z1 - z0, h: height(), color: color(), district: d.id });
      return true;
    };
    // naves industriales: uno o dos edificios grandes con patio de carga
    if (d.style === 'industrial') {
      if (wR > 34) { const m = a0 + wR * (0.45 + R() * 0.1); add(a0 + 2, b0 + 3, m - 2, b1 - 3); add(m + 2, b0 + 3, a1 - 2, b1 - 3); }
      else add(a0 + 2, b0 + 3, a1 - 2, b1 - 3);
      return;
    }
    // manzana estrecha: se llena entera, troceada
    if (wR < D * 2 + 5 || dR < D * 2 + 5) {
      const alongX = wR >= dR;
      const L = alongX ? wR : dR;
      let p = 0;
      while (p < L - 3) {
        const len = Math.min(L - p, 8 + R() * 10);
        if (R() < 0.12 && p > 0) { p += 2.6; continue; } // pasaje
        if (alongX) add(a0 + p, b0, a0 + p + len - 0.3, b1); else add(a0, b0 + p, a1, b0 + p + len - 0.3);
        p += len;
      }
      return;
    }
    // manzana con patio: edificios en los cuatro lados y al menos un pasaje para entrar
    const sides: [number, number, number, number, boolean][] = [
      [a0, b0, a1, b0 + D, true], [a0, b1 - D, a1, b1, true], [a0, b0 + D, a0 + D, b1 - D, false], [a1 - D, b0 + D, a1, b1 - D, false],
    ];
    const forced = Math.floor(R() * 4);
    sides.forEach(([x0, z0, x1, z1, alongX], si) => {
      const L = alongX ? x1 - x0 : z1 - z0;
      const chunks: [number, number][] = [];
      let p = 0;
      while (p < L - 2) { const len = Math.min(L - p, 7 + R() * 9); chunks.push([p, p + len]); p += len; }
      const gap = si === forced ? Math.max(0, Math.floor(chunks.length / 2)) : -1;
      chunks.forEach(([s0, s1], k) => {
        if (k === gap || (R() < 0.13 && chunks.length > 2)) return;
        if (alongX) add(x0 + s0, z0, x0 + s1 - 0.3, z1); else add(x0, z0 + s0, x1, z0 + s1 - 0.3);
      });
    });
  }

  // ------------------------------------------------------------------ 4) props: farolas en las aceras, árboles, palmeras, chozas…
  const freeOfStuff = (x: number, z: number, r: number) => !reserved.some((rr) => Math.hypot(x - rr.x, z - rr.z) < rr.r + r + 1) && !onRoad(x, z, r + 0.3) && !blocked(x, z, r + 0.8) && z < inp.seaZ - 4;
  {
    const R = rngOf('lamps');
    for (const rd of roads) {
      if (rd.kind === 'alley') continue;
      const L = Math.hypot(rd.x2 - rd.x1, rd.z2 - rd.z1), ux = (rd.x2 - rd.x1) / L, uz = (rd.z2 - rd.z1) / L;
      const step = rd.kind === 'boulevard' || rd.kind === 'promenade' ? 11 : 17;
      for (let s = 6 + R() * 4; s < L - 4; s += step) for (const side of [-1, 1]) {
        const off = rd.w / 2 + 0.7;
        const x = rd.x1 + ux * s - uz * side * off, z = rd.z1 + uz * s + ux * side * off;
        const kind: Circle['kind'] = rd.kind === 'promenade' ? 'palm' : rd.kind === 'boulevard' || (rd.kind === 'avenue' && (Math.round(s / step) % 2 === 0)) ? 'tree' : 'lamp';
        const r = kind === 'lamp' ? 0.3 : 0.6;
        const d = inp.districts.find((dd) => Math.abs(x - dd.center[0]) <= dd.size[0] / 2 && Math.abs(z - dd.center[1]) <= dd.size[1] / 2);
        if (!freeOfStuff(x, z, r)) continue;
        addCircle({ x, z, r, kind, district: d?.id ?? 'plaza' });
      }
    }
  }
  for (const d of inp.districts) {
    const R = rngOf('p:' + d.id);
    const kinds: Circle['kind'][] = d.style === 'beach' ? ['palm', 'palm', 'rock', 'bush'] : d.style === 'savanna' ? ['tree', 'tree', 'bush', 'rock', 'hut', 'hut'] : d.style === 'industrial' ? ['crate', 'crate', 'crate', 'rock'] : d.style === 'plaza' ? ['tree', 'bush', 'tree'] : ['tree', 'bush', 'crate'];
    const count = d.style === 'savanna' ? 70 : d.style === 'beach' ? 40 : d.style === 'industrial' ? 36 : 22;
    let placed = 0, tries = 0;
    while (placed < count && tries++ < 900) {
      const x = d.center[0] + (R() - 0.5) * (d.size[0] - 4), z = d.center[1] + (R() - 0.5) * (d.size[1] - 4);
      // los props van en plazas, parques, playa y patios de las naves (no en la acera ni dentro de los edificios)
      const pad = pads.find((p) => p.district === d.id && Math.abs(x - p.x) < p.w / 2 && Math.abs(z - p.z) < p.d / 2);
      if (!pad) continue;
      if (pad.kind === 'block' && d.style !== 'industrial') continue;
      if (d.style === 'beach' && pad.kind !== 'beach') continue;
      const kind = kinds[Math.floor(R() * kinds.length)];
      const r = kind === 'hut' ? 2.6 : kind === 'tree' || kind === 'palm' ? 0.7 : kind === 'crate' ? 0.9 : kind === 'rock' ? 0.8 : 0.7;
      if (d.style === 'plaza' && Math.hypot(x - d.center[0], z - d.center[1]) < 15) continue;
      if (!freeOfStuff(x, z, r)) continue;
      addCircle({ x, z, r, kind, district: d.id });
      placed++;
    }
  }

  // ------------------------------------------------------------------ 5) posiciones finales (con búsqueda del hueco libre más cercano)
  const spots: Record<string, { x: number; z: number }> = {};
  const freeSpot = (x: number, z: number) => {
    if (!blocked(x, z, 0.65)) return { x, z };
    for (let ring = 1; ring <= 22; ring++) for (let a = 0; a < 16; a++) {
      const ang = (a / 16) * Math.PI * 2, rr = ring * 0.8;
      const nx = x + Math.cos(ang) * rr, nz = z + Math.sin(ang) * rr;
      if (!blocked(nx, nz, 0.65)) return { x: nx, z: nz };
    }
    return { x, z };
  };
  for (const p of inp.pois) {
    const [x, z] = world(p.district, p.at);
    // la fuente: el punto para mirarla está en su borde, mirando al centro
    spots['poi:' + p.id] = p.kind === 'fountain' ? { x, z: z + (p.radius ?? 3.6) + 0.9 } : freeSpot(x, z);
  }
  for (const s of inp.stickers) { const [x, z] = world(s.district, s.at); spots['sticker:' + s.id] = freeSpot(x, z); }
  for (const g of inp.graffiti) { const [x, z] = world(g.district, g.at); spots['graffiti:' + g.id] = freeSpot(x, z); }
  for (const n of inp.npcs) { const [x, z] = world(n.district, n.at); spots[n.key] = freeSpot(x, z); }

  const districtAt = (x: number, z: number) => {
    for (const d of inp.districts) if (Math.abs(x - d.center[0]) <= d.size[0] / 2 && Math.abs(z - d.center[1]) <= d.size[1] / 2) return d.id;
    return null;
  };
  return { boxes, circles, roads, pads, graph: buildGraph(roads), spots, worldSize: W, seaZ: inp.seaZ, blocked, districtAt, onRoad };
}

/** Cruces entre calles (todas son horizontales o verticales) y tramos entre cruces, para los coches */
function buildGraph(roads: Road[]): RoadGraph {
  const nodes: { x: number; z: number }[] = [];
  const nodeAt = (x: number, z: number) => {
    let i = nodes.findIndex((n) => Math.abs(n.x - x) < 0.5 && Math.abs(n.z - z) < 0.5);
    if (i < 0) { i = nodes.length; nodes.push({ x, z }); }
    return i;
  };
  const usable = roads.map((r, i) => ({ r, i })).filter(({ r }) => r.kind !== 'alley');
  const vert = (r: Road) => Math.abs(r.x1 - r.x2) < 0.01;
  const edges: RoadGraph['edges'] = [];
  for (const { r, i } of usable) {
    const pts: { t: number; n: number }[] = [];
    const v = vert(r);
    const lo = v ? Math.min(r.z1, r.z2) : Math.min(r.x1, r.x2), hi = v ? Math.max(r.z1, r.z2) : Math.max(r.x1, r.x2);
    pts.push({ t: lo, n: nodeAt(v ? r.x1 : lo, v ? lo : r.z1) }, { t: hi, n: nodeAt(v ? r.x1 : hi, v ? hi : r.z1) });
    for (const { r: o } of usable) {
      if (o === r || vert(o) === v) continue;
      // o es perpendicular: ¿se cruzan?
      const c = v ? o.z1 : o.x1; // coordenada de o a lo largo de r
      const p = v ? r.x1 : r.z1; // coordenada de r a lo largo de o
      const olo = v ? Math.min(o.x1, o.x2) : Math.min(o.z1, o.z2), ohi = v ? Math.max(o.x1, o.x2) : Math.max(o.z1, o.z2);
      if (c < lo - 0.5 || c > hi + 0.5 || p < olo - 0.5 || p > ohi + 0.5) continue;
      pts.push({ t: c, n: nodeAt(v ? r.x1 : c, v ? c : r.z1) });
    }
    pts.sort((a, b) => a.t - b.t);
    for (let k = 0; k < pts.length - 1; k++) if (pts[k].n !== pts[k + 1].n && pts[k + 1].t - pts[k].t > 2) edges.push({ a: pts[k].n, b: pts[k + 1].n, road: i });
  }
  return { nodes, edges };
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
