import { describe, expect, it } from 'vitest';
import { CONFIGS } from '../../content/fighters';
import { validateRoster, ROSTER } from '../content/roster';
import { Match } from './Match';
import { AIController } from '../ai/AIController';
import type { Difficulty } from './types';

function mulberry(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sim(ia: number, ib: number, da: Difficulty, db: Difficulty, seed: number) {
  const rng = mulberry(seed);
  const m = new Match(ROSTER[ia], ROSTER[ib], rng);
  const a = new AIController(0, da, rng), b = new AIController(1, db, rng);
  const dt = 1 / 30;
  const evs: string[] = [];
  while (!m.over && m.time < 600) {
    m.update(dt, [a.update(dt, m), b.update(dt, m)]);
    for (const e of m.events) evs.push(e.type);
    m.events.length = 0;
  }
  return { m, evs };
}

describe('reparto', () => {
  it('no repite finishers y todos los movimientos existen', () => {
    expect(validateRoster(CONFIGS)).toEqual([]);
  });
});

describe('simulación IA vs IA', () => {
  it('las partidas terminan y usan todas las mecánicas', () => {
    const reasons: Record<string, number> = {};
    const all = new Set<string>();
    const times: number[] = [];
    let n = 0;
    for (let seed = 1; seed <= 60; seed++) {
      const ia = seed % ROSTER.length, ib = (seed * 3 + 1) % ROSTER.length;
      if (ia === ib) continue;
      const diffs: Difficulty[] = ['facil', 'intermedia', 'dificil'];
      const { m, evs } = sim(ia, ib, diffs[seed % 3], diffs[(seed + 1) % 3], seed);
      expect(m.over).toBe(true);
      reasons[m.reason!] = (reasons[m.reason!] ?? 0) + 1;
      times.push(m.time);
      evs.forEach((e) => all.add(e));
      n++;
    }
    console.log('razones', reasons, 'tiempo medio', (times.reduce((a, b) => a + b, 0) / n).toFixed(1), 'min/max', Math.min(...times).toFixed(0), Math.max(...times).toFixed(0));
    console.log('eventos vistos', [...all].join(','));
  });
});
