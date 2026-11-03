import type { Difficulty, FighterData, FighterStats } from '../combat/types';

/** Mejora que se elige tras cada victoria. Se acumulan durante toda la racha. */
export interface Perk {
  id: string;
  name: string;
  desc: string;
  /** Modifica las estadísticas del luchador */
  stats?: (s: FighterStats) => FighterStats;
  /** Vida máxima extra (y se cura esa misma cantidad al elegirla) */
  maxHp?: number;
  /** Curación inmediata (fracción de la vida máxima) */
  heal?: number;
  /** Momentum con el que empiezas cada combate */
  startMom?: number;
}

export const PERKS: Perk[] = [
  { id: 'punos', name: 'Puños de hierro', desc: '+12 % de daño en todos tus golpes.', stats: (s) => ({ ...s, power: s.power * 1.12 }) },
  { id: 'ligero', name: 'Pies ligeros', desc: '+8 % de velocidad y de rapidez al golpear.', stats: (s) => ({ ...s, speed: s.speed * 1.08, tempo: s.tempo * 1.08 }) },
  { id: 'piel', name: 'Piel de cocodrilo', desc: 'Recibes un 10 % menos de daño.', stats: (s) => ({ ...s, resist: s.resist * 0.9 }) },
  { id: 'corazon', name: 'Corazón de campeón', desc: '+18 de vida máxima y te curas esa cantidad.', maxHp: 18 },
  { id: 'pulmones', name: 'Pulmones de acero', desc: '+25 de resistencia máxima.', stats: (s) => ({ ...s, stamina: s.stamina + 25 }) },
  { id: 'escapista', name: 'Escapista', desc: '+30 % de fuerza para zafarte de pins y llaves.', stats: (s) => ({ ...s, escape: s.escape * 1.3 }) },
  { id: 'levanta', name: 'Hueso duro', desc: 'Te levantas un 15 % antes tras una caída.', stats: (s) => ({ ...s, recover: s.recover * 0.85 }) },
  { id: 'sed', name: 'Sed de gloria', desc: 'Empiezas cada combate con un 35 % de momentum.', startMom: 35 },
  { id: 'curandero', name: 'Curandero del barrio', desc: 'Te curas un 40 % de tu vida máxima ahora mismo.', heal: 0.4 },
];

export const perkById = (id: string) => PERKS.find((p) => p.id === id)!;

/** Estadísticas finales con todas las mejoras aplicadas */
export function applyPerks(base: FighterStats, ids: string[]): FighterStats {
  let s = { ...base };
  for (const id of ids) {
    const p = perkById(id);
    if (p.stats) s = p.stats(s);
    if (p.maxHp) s = { ...s, health: s.health + p.maxHp };
  }
  return s;
}

export const startMomentum = (ids: string[]) => Math.min(100, ids.reduce((a, id) => a + (perkById(id).startMom ?? 0), 0));

export function pickPerks(rng: () => number = Math.random, n = 3): Perk[] {
  const pool = [...PERKS];
  const out: Perk[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]);
  return out;
}

/** Dificultad de la CPU según las victorias de la racha */
export const survivalDifficulty = (wins: number): Difficulty => (wins < 2 ? 'facil' : wins < 5 ? 'intermedia' : 'dificil');

/** A partir de la racha 5, los rivales van saliendo más fuertes. Cada 5 victorias hay un "jefe" con un plus extra. */
export function isBoss(wins: number) { return wins > 0 && (wins + 1) % 5 === 0; }
export function scaleOpponent(f: FighterData, wins: number): FighterData {
  const over = Math.max(0, wins - 4);
  const boss = isBoss(wins) ? 1.12 : 1;
  const hp = (1 + 0.05 * over) * boss, pw = (1 + 0.025 * over) * (boss > 1 ? 1.05 : 1);
  if (hp === 1 && pw === 1) return f;
  return { ...f, fullStats: { ...f.fullStats, health: f.fullStats.health * hp, power: f.fullStats.power * pw } };
}

/** Rival de la racha: aleatorio, sin repetir hasta que se hayan enfrentado todos */
export function pickOpponent(candidates: string[], used: string[], rng: () => number = Math.random): { id: string; used: string[] } {
  let fresh = candidates.filter((c) => !used.includes(c));
  let nextUsed = used;
  if (!fresh.length) { fresh = candidates; nextUsed = []; }
  const id = fresh[Math.floor(rng() * fresh.length)];
  return { id, used: [...nextUsed, id] };
}
