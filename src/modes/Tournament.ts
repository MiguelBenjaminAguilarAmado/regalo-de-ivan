import type { ArenaId } from '../combat/types';

export interface Pairing { a: string; b: string; winner: string | null }
export interface Bracket {
  size: number;
  playerId: string;
  rounds: Pairing[][]; // rounds[r] = enfrentamientos de esa ronda
  round: number;
  eliminated: boolean;
  champion: string | null;
}

export const roundName = (b: Bracket, r = b.round) => {
  const left = b.size / Math.pow(2, r);
  return left === 2 ? 'FINAL' : left === 4 ? 'SEMIFINAL' : left === 8 ? 'CUARTOS DE FINAL' : 'RONDA ' + (r + 1);
};

export function arenaForRound(b: Bracket, r: number, rng: () => number = Math.random): ArenaId {
  const total = Math.log2(b.size);
  if (r === total - 1) return 'manchester';
  if (r === 0) return 'matamoros';
  return rng() < 0.5 ? 'matamoros' : 'manchester';
}

const shuffle = <T,>(a: T[], rng: () => number) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};

/** Tamaño de cuadro posible con el reparto disponible (4 u 8). */
export const bracketSize = (n: number) => (n >= 8 ? 8 : n >= 4 ? 4 : 2);

export function createBracket(playerId: string, allIds: string[], rng: () => number = Math.random, size = bracketSize(allIds.length)): Bracket {
  const others = shuffle(allIds.filter((i) => i !== playerId), rng).slice(0, size - 1);
  const entrants = shuffle([playerId, ...others], rng);
  const first: Pairing[] = [];
  for (let i = 0; i < size; i += 2) first.push({ a: entrants[i], b: entrants[i + 1], winner: null });
  return { size, playerId, rounds: [first], round: 0, eliminated: false, champion: null };
}

export const playerPairing = (b: Bracket) => b.rounds[b.round].find((p) => p.a === b.playerId || p.b === b.playerId)!;
export const opponentOf = (b: Bracket) => { const p = playerPairing(b); return p.a === b.playerId ? p.b : p.a; };

/**
 * Registra el resultado del combate del jugador, simula el resto de la ronda con `sim`
 * y prepara la siguiente ronda (o el campeón).
 */
export function advance(b: Bracket, playerWon: boolean, sim: (a: string, b: string) => string): Bracket {
  const round = b.rounds[b.round];
  for (const p of round) {
    if (p.a === b.playerId || p.b === b.playerId) p.winner = playerWon ? b.playerId : p.a === b.playerId ? p.b : p.a;
    else if (!p.winner) p.winner = sim(p.a, p.b);
  }
  if (!playerWon) { b.eliminated = true; return b; }
  const winners = round.map((p) => p.winner!);
  if (winners.length === 1) { b.champion = winners[0]; return b; }
  const next: Pairing[] = [];
  for (let i = 0; i < winners.length; i += 2) next.push({ a: winners[i], b: winners[i + 1], winner: null });
  b.rounds.push(next);
  b.round++;
  return b;
}
