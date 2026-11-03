import type { ArenaId, Difficulty } from '../combat/types';

/** ===== Modo Historia: tipos y lógica pura (los textos y capítulos viven en content/historia.ts) ===== */

export type FlagValue = boolean | number | string;
export type Flags = Record<string, FlagValue>;

/** Una frase de una escena. `who` es el id de un luchador, o 'narrador' / 'arbitro'. */
export interface StoryLine {
  who: string;
  text: string;
  /** Solo se dice si la bandera tiene este valor (true = cualquier valor "verdadero"). */
  if?: string | [string, FlagValue];
  /** Solo se dice si la bandera NO se cumple. */
  ifNot?: string | [string, FlagValue];
}

export interface StoryChoice {
  text: string;
  /** Banderas que se activan al elegirla */
  set?: Flags;
  /** Lo que se responde después de elegir */
  reply?: StoryLine[];
  /** La opción solo aparece si se cumple la bandera */
  if?: string | [string, FlagValue];
}

export interface StoryScene {
  /** Mapa que se ve de fondo */
  bg?: ArenaId;
  /** Luchadores que se ven en el escenario (ids); por defecto los que hablan */
  cast?: string[];
  lines: StoryLine[];
  /** Si hay opciones, el jugador elige una al terminar las frases */
  choices?: StoryChoice[];
  /** La escena solo sale si se cumple esta bandera */
  if?: string | [string, FlagValue];
}

export interface StoryFight {
  /** Rival (id del luchador) */
  opponent: string;
  opponentSkin?: string;
  /** Compañero de Chema: id, o 'elegir' para que el jugador lo escoja entre `choosePartnerFrom` */
  partner?: string | 'elegir';
  /** Pareja del rival (combate por parejas) */
  opponentPartner?: string;
  arena: ArenaId;
  difficulty: Difficulty;
  /** Texto del objetivo que sale al empezar */
  objective: string;
  tips?: string[];
  /** Límite de tiempo (s) y cómo se decide */
  timeLimit?: number;
  timeMode?: 'hp' | 'player';
  /** Rival con ventaja: multiplicadores de vida y daño */
  handicap?: { hp: number; power: number };
  /** Jefe con fases */
  boss?: { at: number; power: number; speed: number; heal: number; text: string };
  /** Escenas antes de este combate */
  before?: StoryScene[];
  /** Solo si se cumple la bandera (si no, el combate se salta) */
  if?: string | [string, FlagValue];
}

export interface StoryReward {
  /** Logros (ids de Achievements) que se conceden: sirven para desbloquear luchadores y trajes */
  achievements?: string[];
  /** Texto de recompensa que se muestra al acabar el capítulo */
  text: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  summary: string;
  /** Mapa que ilustra el capítulo en el menú */
  arena: ArenaId;
  intro: StoryScene[];
  fights: StoryFight[];
  /** Entre combates del mismo capítulo, fracción de vida que recuperas (0 = nada) */
  healBetween?: number;
  outro: StoryScene[];
  /** Banderas que se fijan al completarlo */
  setOnWin?: Flags;
  rewards?: StoryReward;
  /** Para jugarlo hace falta esta bandera (además de haber completado el anterior) */
  requires?: string;
  /** Si hay bifurcación: el capítulo solo existe en ciertas rutas */
  onlyIf?: string | [string, FlagValue];
  /** Último capítulo: al completarlo se muestra el final según `flags.final` */
  endsStory?: boolean;
}

export interface StoryEnding { id: string; title: string; summary: string; scenes: StoryScene[] }

export interface StoryProgress {
  /** Capítulos completados (ids) */
  done: string[];
  flags: Flags;
  /** Finales vistos (se conservan al empezar de nuevo) */
  endings: string[];
}

export const newProgress = (keepEndings: string[] = []): StoryProgress => ({ done: [], flags: {}, endings: keepEndings });

/** ¿Se cumple una condición sobre banderas? */
export function holds(cond: string | [string, FlagValue] | undefined, flags: Flags): boolean {
  if (cond == null) return true;
  if (typeof cond === 'string') return !!flags[cond];
  return flags[cond[0]] === cond[1];
}

export const lineVisible = (l: StoryLine, flags: Flags) => holds(l.if, flags) && (l.ifNot == null || !holds(l.ifNot, flags));

/** Capítulos que existen en la ruta actual */
export const chaptersFor = (all: StoryChapter[], flags: Flags) => all.filter((c) => holds(c.onlyIf, flags));

/** Estado de un capítulo en el menú */
export type ChapterState = 'done' | 'open' | 'locked';

export function chapterState(all: StoryChapter[], p: StoryProgress, id: string): ChapterState {
  if (p.done.includes(id)) return 'done';
  const list = chaptersFor(all, p.flags);
  const i = list.findIndex((c) => c.id === id);
  if (i < 0) return 'locked';
  const prevDone = i === 0 || p.done.includes(list[i - 1].id);
  const req = list[i].requires;
  return prevDone && (!req || !!p.flags[req]) ? 'open' : 'locked';
}

/** Primer capítulo que se puede jugar y no está completado (null si ya se acabó todo) */
export function nextChapter(all: StoryChapter[], p: StoryProgress): StoryChapter | null {
  return chaptersFor(all, p.flags).find((c) => chapterState(all, p, c.id) === 'open') ?? null;
}

/** Aplica las banderas y marca el capítulo como completado */
export function completeChapter(p: StoryProgress, ch: StoryChapter): StoryProgress {
  const done = p.done.includes(ch.id) ? p.done : [...p.done, ch.id];
  return { ...p, done, flags: { ...p.flags, ...(ch.setOnWin ?? {}) } };
}

export const applyChoice = (p: StoryProgress, c: StoryChoice): StoryProgress => ({ ...p, flags: { ...p.flags, ...(c.set ?? {}) } });

/** Combates del capítulo que se juegan con las banderas actuales */
export const fightsFor = (ch: StoryChapter, flags: Flags) => ch.fights.filter((f) => holds(f.if, flags));

/** Escenas visibles con las banderas actuales (las condiciones de línea se resuelven al mostrarlas) */
export const scenesFor = (scenes: StoryScene[], flags: Flags) => scenes.filter((s) => holds(s.if, flags));
