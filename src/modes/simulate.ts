import type { Difficulty, FighterData } from '../combat/types';
import { Match } from '../combat/Match';
import { AIController } from '../ai/AIController';

/** Simula un combate CPU vs CPU sin gráficos. Devuelve el índice ganador (0 o 1). */
export function simulateMatch(a: FighterData, b: FighterData, difficulty: Difficulty, rng: () => number = Math.random): { winner: number; reason: string; time: number } {
  const m = new Match(a, b, rng);
  const ai = [new AIController(0, difficulty, rng), new AIController(1, difficulty, rng)];
  const dt = 1 / 30;
  while (!m.over && m.time < 420) {
    m.update(dt, [ai[0].update(dt, m), ai[1].update(dt, m)]);
    m.events.length = 0;
  }
  if (!m.over) {
    // sin resolución: gana quien tenga más vida relativa
    const w = m.f[0].hpPct >= m.f[1].hpPct ? 0 : 1;
    return { winner: w, reason: 'tiempo', time: m.time };
  }
  return { winner: m.winner, reason: m.reason ?? 'ko', time: m.time };
}
