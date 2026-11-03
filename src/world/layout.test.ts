import { describe, expect, it } from 'vitest';
import { AVENUES, DISTRICTS, GRAFFITI, POIS, SEA_Z, SPAWN, STICKERS, WORLD_SIZE } from '../../content/mundo';
import { NPCS } from '../../content/mundo-npc';
import { buildLayout, cellOf, reachableCells } from './layout';

const layout = buildLayout({ districts: DISTRICTS, pois: POIS, stickers: STICKERS, graffiti: GRAFFITI, npcs: NPCS.flatMap((n) => [{ key: 'npc:' + n.id, district: n.district, at: n.at }, ...(n.alt ? [{ key: 'npcalt:' + n.id, district: n.alt.district, at: n.alt.at }] : [])]), worldSize: WORLD_SIZE, seaZ: SEA_Z, avenues: AVENUES });

describe('mapa del mundo', () => {
  it('es determinista', () => {
    const b = buildLayout({ districts: DISTRICTS, pois: POIS, stickers: STICKERS, graffiti: GRAFFITI, npcs: NPCS.flatMap((n) => [{ key: 'npc:' + n.id, district: n.district, at: n.at }, ...(n.alt ? [{ key: 'npcalt:' + n.id, district: n.alt.district, at: n.alt.at }] : [])]), worldSize: WORLD_SIZE, seaZ: SEA_Z, avenues: AVENUES });
    expect(b.boxes.length).toBe(layout.boxes.length);
    expect(b.boxes[5].x).toBe(layout.boxes[5].x);
  });

  it('tiene edificios y props en todos los distritos', () => {
    for (const d of DISTRICTS) {
      if (d.style !== 'savanna') expect(layout.boxes.filter((b) => b.district === d.id).length, d.id).toBeGreaterThan(8);
      expect(layout.circles.filter((c) => c.district === d.id).length, d.id).toBeGreaterThan(5);
    }
  });

  it('los distritos no se solapan entre sí', () => {
    for (const a of DISTRICTS) for (const b of DISTRICTS) {
      if (a.id >= b.id) continue;
      const ox = Math.abs(a.center[0] - b.center[0]) < (a.size[0] + b.size[0]) / 2;
      const oz = Math.abs(a.center[1] - b.center[1]) < (a.size[1] + b.size[1]) / 2;
      expect(ox && oz, `${a.id}/${b.id}`).toBe(false);
    }
  });

  it('todos los puntos de interés, pegatinas y grafitis están en un hueco libre y son alcanzables', () => {
    const cells = reachableCells(layout, SPAWN);
    const missing: string[] = [];
    for (const [k, s] of Object.entries(layout.spots)) {
      if (layout.blocked(s.x, s.z, 0.45)) missing.push('bloqueado:' + k);
      else if (!cells.has(cellOf(s.x, s.z))) missing.push('inalcanzable:' + k);
    }
    expect(missing).toEqual([]);
  });

  it('es una ciudad de una pieza: calles conectadas y distritos pegados a las avenidas', () => {
    expect(layout.roads.filter((r) => r.kind === 'avenue').length).toBe(4);
    expect(layout.roads.some((r) => r.kind === 'alley')).toBe(true);
    expect(layout.roads.some((r) => r.kind === 'boulevard')).toBe(true);
    expect(layout.roads.some((r) => r.kind === 'promenade')).toBe(true);
    // la red de calles para coches es conexa
    const g = layout.graph, adj = new Map<number, number[]>();
    for (const e of g.edges) { adj.set(e.a, [...(adj.get(e.a) ?? []), e.b]); adj.set(e.b, [...(adj.get(e.b) ?? []), e.a]); }
    const seen = new Set([g.edges[0].a]); const q = [g.edges[0].a];
    while (q.length) for (const n of adj.get(q.pop()!) ?? []) if (!seen.has(n)) { seen.add(n); q.push(n); }
    expect(seen.size).toBe(adj.size);
  });

  it('la fuente de la plaza está donde se dibuja y choca en su sitio', () => {
    const f = layout.circles.find((c) => c.kind === 'fountain')!;
    expect(Math.hypot(f.x, f.z)).toBeLessThan(0.01);
    expect(layout.blocked(0, 0, 0.4)).toBe(true);
    expect(layout.blocked(0, 4.6, 0.4)).toBe(false);
  });

  it('los puntos de interés caen dentro de su distrito', () => {
    for (const p of POIS) {
      const s = layout.spots['poi:' + p.id];
      expect(layout.districtAt(s.x, s.z), p.id).toBe(p.district);
    }
  });
});
