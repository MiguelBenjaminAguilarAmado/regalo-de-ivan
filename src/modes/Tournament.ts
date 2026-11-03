import type { ArenaId } from '../combat/types';
import { ARENA_IDS, ARENA_INFO } from '../combat/arenaInfo';
import { DUOS } from '../content/duos';

export type TourKind = 'champion' | 'tag' | 'femboy';

export interface TourInfo {
  id: TourKind;
  name: string;
  tagline: string;
  desc: string;
  /** Combates 2 contra 2 (el "luchador" del cuadro es una pareja `a+b`) */
  tag: boolean;
  /** Campeón actual que defiende el título (entra directo a la final) */
  titleHolder?: string;
  /** Mapas en los que se juega */
  arenas: ArenaId[];
  /** Texto del título que se gana */
  title: string;
}

const PRO_ARENAS = ARENA_IDS.filter((id) => ARENA_INFO[id].pro);
const AMATEUR_ARENAS = ARENA_IDS.filter((id) => !ARENA_INFO[id].pro);

export const TOURS: Record<TourKind, TourInfo> = {
  champion: {
    id: 'champion', name: 'Hoyo Champion', tagline: 'EL torneo del Hoyo',
    desc: 'El campeonato más importante de la empresa: 8 luchadores, 3 combates seguidos y la final en Manchester. Se juega en los mapas profesionales.',
    tag: false, arenas: PRO_ARENAS, title: 'HOYO CHAMPION',
  },
  tag: {
    id: 'tag', name: 'Hoyo Tag Champion', tagline: '2 contra 2',
    desc: 'Eliges a tu compañero y os enfrentáis a otras parejas. Puedes relevar a tu compañero con R (o el botón RELEVO): el que descansa recupera vida y resistencia. Los mapas son los profesionales.',
    tag: true, arenas: PRO_ARENAS, title: 'HOYO TAG CHAMPION',
  },
  femboy: {
    id: 'femboy', name: 'Hoyo Femboy Champion', tagline: 'Elso defiende su título',
    desc: 'El campeonato que se juega en los mapas no profesionales: la tribu y el garito. Elso es el campeón actual y espera en la final para defender su título.',
    tag: false, titleHolder: 'elso', arenas: AMATEUR_ARENAS, title: 'HOYO FEMBOY CHAMPION',
  },
};
export const TOUR_KINDS = Object.keys(TOURS) as TourKind[];

/** Los participantes del cuadro de parejas son ids `a+b` */
export const teamOf = (id: string) => id.split('+');

export interface Pairing { a: string; b: string; winner: string | null }
export interface Bracket {
  size: number;
  playerId: string;
  rounds: Pairing[][]; // rounds[r] = enfrentamientos de esa ronda
  round: number;
  eliminated: boolean;
  champion: string | null;
  kind: TourKind;
  /** Mapa de cada ronda, sorteado al crear el cuadro (para que el que se anuncia sea el que se juega) */
  arenas?: ArenaId[];
  /** Campeón actual que defiende su título (Hoyo Femboy Champion) */
  titleHolder?: string;
}

export const roundName = (b: Bracket, r = b.round) => {
  const left = b.size / Math.pow(2, r);
  return left === 2 ? 'FINAL' : left === 4 ? 'SEMIFINAL' : left === 8 ? 'CUARTOS DE FINAL' : 'RONDA ' + (r + 1);
};

function pickArena(kind: TourKind, size: number, r: number, rng: () => number): ArenaId {
  const total = Math.log2(size);
  const pool = TOURS[kind].arenas;
  if (kind === 'femboy') return r === total - 1 ? 'garito' : pool[Math.floor(rng() * pool.length)];
  if (r === total - 1) return 'manchester';
  if (r === 0) return 'matamoros';
  return pool[Math.floor(rng() * pool.length)];
}

export function arenaForRound(b: Bracket, r: number, rng: () => number = Math.random): ArenaId {
  return b.arenas?.[r] ?? pickArena(b.kind ?? 'champion', b.size, r, rng);
}

const shuffle = <T,>(a: T[], rng: () => number) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};

/** Tamaño de cuadro posible con el reparto disponible (4 u 8). */
export const bracketSize = (n: number, tag = false) => { const m = tag ? Math.floor(n / 2) : n; return m >= 8 ? 8 : m >= 4 ? 4 : 2; };

export interface BracketOpts { kind?: TourKind; partnerId?: string }

export function createBracket(playerId: string, allIds: string[], rng: () => number = Math.random, size?: number, opts: BracketOpts = {}): Bracket {
  const kind = opts.kind ?? 'champion';
  const info = TOURS[kind];
  size = size ?? bracketSize(allIds.length, info.tag);
  let entrants: string[];
  let player = playerId;
  if (info.tag) {
    // parejas: el jugador con su compañero y el resto del reparto emparejado al azar
    const partner = opts.partnerId ?? allIds.find((i) => i !== playerId)!;
    player = `${playerId}+${partner}`;
    let rest = shuffle(allIds.filter((i) => i !== playerId && i !== partner), rng);
    const teams: string[] = [];
    // primero los dúos dinámicos que se puedan formar con el resto del reparto
    for (const d of shuffle(DUOS, rng)) {
      if (teams.length >= size - 1) break;
      if (rest.includes(d.a) && rest.includes(d.b)) { teams.push(`${d.a}+${d.b}`); rest = rest.filter((x) => x !== d.a && x !== d.b); }
    }
    for (let i = 0; i + 1 < rest.length && teams.length < size - 1; i += 2) teams.push(`${rest[i]}+${rest[i + 1]}`);
    entrants = shuffle([player, ...teams], rng);
  } else if (info.titleHolder) {
    // el campeón entra por el lado contrario al del jugador: solo se ven las caras en la final
    const holder = info.titleHolder;
    if (playerId === holder) {
      entrants = [playerId, ...shuffle(allIds.filter((i) => i !== playerId), rng).slice(0, size - 1)];
    } else {
      const pool = shuffle(allIds.filter((i) => i !== playerId && i !== holder), rng).slice(0, size - 2);
      const half = size / 2;
      entrants = [playerId, ...pool.slice(0, half - 1), ...pool.slice(half - 1), holder];
    }
  } else {
    const others = shuffle(allIds.filter((i) => i !== playerId), rng).slice(0, size - 1);
    entrants = shuffle([playerId, ...others], rng);
  }
  const first: Pairing[] = [];
  for (let i = 0; i < size; i += 2) first.push({ a: entrants[i], b: entrants[i + 1], winner: null });
  const arenas = Array.from({ length: Math.log2(size) }, (_, r) => pickArena(kind, size, r, rng));
  return { size, playerId: player, rounds: [first], round: 0, eliminated: false, champion: null, kind, arenas, titleHolder: info.titleHolder };
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
