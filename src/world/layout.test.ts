import { describe, expect, it } from 'vitest';
import { DISTRICTS, GRAFFITI, POIS, SEA_Z, SPAWN, STICKERS, WORLD_SIZE } from '../../content/mundo';
import { NPCS } from '../../content/mundo-npc';
import { buildLayout, cellOf, reachableCells } from './layout';

const layout = buildLayout({ districts: DISTRICTS, pois: POIS, stickers: STICKERS, graffiti: GRAFFITI, npcs: NPCS.flatMap((n) => [{ key: 'npc:' + n.id, district: n.district, at: n.at }, ...(n.alt ? [{ key: 'npcalt:' + n.id, district: n.alt.district, at: n.alt.at }] : [])]), worldSize: WORLD_SIZE, seaZ: SEA_Z });

describe('mapa del mundo', () => {
  it('es determinista', () => {
    const b = buildLayout({ districts: DISTRICTS, pois: POIS, stickers: STICKERS, graffiti: GRAFFITI, npcs: NPCS.flatMap((n) => [{ key: 'npc:' + n.id, district: n.district, at: n.at }, ...(n.alt ? [{ key: 'npcalt:' + n.id, district: n.alt.district, at: n.alt.at }] : [])]), worldSize: WORLD_SIZE, seaZ: SEA_Z });
    expect(b.boxes.length).toBe(layout.boxes.length);
    expect(b.boxes[5].x).toBe(layout.boxes[5].x);
  });

  it('tiene edificios y props en todos los distritos', () => {
    for (const d of DISTRICTS) {
      expect(layout.boxes.filter((b) => b.district === d.id).length, d.id).toBeGreaterThan(2);
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

  it('los puntos de interés caen dentro de su distrito', () => {
    for (const p of POIS) {
      const s = layout.spots['poi:' + p.id];
      expect(layout.districtAt(s.x, s.z), p.id).toBe(p.district);
    }
  });
});
