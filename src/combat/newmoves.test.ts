import { describe, expect, it } from 'vitest';
import { ROSTER, fighterById } from '../content/roster';
import { Match } from './Match';
import { emptyInput } from './types';
import type { GameEvent } from './types';

const idle = emptyInput();
const press = (k: 'light' | 'heavy' | 'grab' | 'taunt' | 'finisher') => ({ ...emptyInput(), [k]: true });

function run(m: Match, secs: number, a = idle, b = idle, evs: GameEvent[] = []) {
  const dt = 1 / 60;
  for (let t = 0; t < secs && !m.over; t += dt) { m.update(dt, [t === 0 ? a : { ...a, light: false, heavy: false, grab: false, taunt: false, finisher: false }, b]); evs.push(...m.events); m.events.length = 0; }
  return evs;
}

describe('arsenal de Pablo Motos', () => {
  it('el golpe fuerte sale al azar con las rarezas indicadas', () => {
    const counts: Record<string, number> = {};
    const N = 6000;
    let seed = 7;
    const rng = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const m = new Match(fighterById('pablo motos'), fighterById('elso'), rng);
    for (let i = 0; i < N; i++) { const mv = (m as any).pickHeavy(m.f[0]); counts[mv.id] = (counts[mv.id] ?? 0) + 1; }
    m.events.length = 0;
    const pct = (id: string) => (counts[id] ?? 0) / N;
    expect(Object.keys(counts).sort()).toEqual(['casco_romano', 'maletinazo', 'microfonazo', 'momia', 'tanque']);
    expect(pct('maletinazo')).toBeGreaterThan(pct('microfonazo'));
    expect(pct('microfonazo')).toBeGreaterThan(pct('casco_romano'));
    expect(pct('casco_romano')).toBeGreaterThan(pct('momia'));
    expect(pct('momia')).toBeGreaterThan(pct('tanque'));
    expect(pct('tanque')).toBeLessThan(0.08);
  });

  it('la momia y el tanque emiten invocación y hacen daño al rival cercano', () => {
    for (const id of ['momia', 'tanque']) {
      const m = new Match(fighterById('pablo motos'), fighterById('elso'));
      m.f[0].x = -1; m.f[1].x = 1; m.f[1].z = 0; m.f[0].z = 0;
      (m as any).pickHeavy = () => (m.f[0] as any).data && require_move(id);
      const mv = require_move(id);
      (m as any).pickHeavy = () => mv;
      const hp = m.f[1].hp;
      const evs = run(m, 2.5, press('heavy'));
      expect(evs.some((e) => e.type === 'summon' && e.kind === id)).toBe(true);
      expect(m.f[1].hp).toBeLessThan(hp);
    }
  });
});

import { getMove } from './moves';
function require_move(id: string) { return getMove(id); }

describe('Pepe the Gay Dragon', () => {
  it('su guardia no le deja moverse', () => {
    const m = new Match(fighterById('pepe the gay dragon'), fighterById('elso'));
    m.f[0].x = -3; m.f[1].x = 3;
    run(m, 0.4, { ...emptyInput(), block: true, mx: 1 });
    const x0 = m.f[0].x;
    run(m, 1, { ...emptyInput(), block: true, mx: 1 });
    expect(Math.abs(m.f[0].x - x0)).toBeLessThan(0.05);
    // el resto sí se mueve con la guardia
    const m2 = new Match(fighterById('elso'), fighterById('pepe the gay dragon'));
    m2.f[0].x = -3; m2.f[1].x = 3;
    run(m2, 0.3, { ...emptyInput(), block: true, mx: 1 });
    const y0 = m2.f[0].x;
    run(m2, 1, { ...emptyInput(), block: true, mx: 1 });
    expect(m2.f[0].x - y0).toBeGreaterThan(0.2);
  });

  it('su embestida golpea a un rival normal y de lejos', () => {
    const m = new Match(fighterById('pepe the gay dragon'), fighterById('elso'));
    m.f[0].x = -3.2; m.f[1].x = 0.8; m.f[0].z = 0; m.f[1].z = 0;
    m.f[0].mom = 100;
    const hp = m.f[1].hp;
    const evs = run(m, 3, press('finisher'));
    expect(evs.some((e) => e.type === 'finisherHit')).toBe(true);
    expect(hp - m.f[1].hp).toBeGreaterThan(20);
  });

  it('contra Petisui: le torea y luego Pepe le deja KO de un solo golpe', () => {
    const m = new Match(fighterById('pepe the gay dragon'), fighterById('petisui'));
    m.f[0].x = -3.2; m.f[1].x = 0.8; m.f[0].z = 0; m.f[1].z = 0;
    m.f[0].mom = 100;
    const evs = run(m, 8, press('finisher'));
    expect(evs.some((e) => e.type === 'toreo')).toBe(true);
    expect(m.f[1].hp).toBe(0);
    expect(m.f[1].koed).toBe(true);
    expect(evs.filter((e) => e.type === 'finisherHit').length).toBe(1);
  });
});

describe('plantilla', () => {
  it('incluye a Pepe, con descripción propia y sin usar el .md', () => {
    const pepe = ROSTER.find((r) => r.id === 'pepe the gay dragon')!;
    expect(pepe).toBeTruthy();
    expect(pepe.description.length).toBeGreaterThan(40);
    for (const f of ROSTER) { expect(f.description.length).toBeGreaterThan(20); expect(f.style.length).toBeGreaterThan(5); }
  });
});
