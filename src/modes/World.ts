import type { FighterStats } from '../combat/types';
import type { Flags, FlagValue, StoryProgress, StoryScene } from './Story';
import { holds } from './Story';

/** ===== Mundo abierto "El Hoyo City": lógica PURA (progreso, economía, misiones, horarios, apuestas) ===== */

export const DAY_MIN = 1440;
export const START_TIME = 8 * 60; // la partida empieza a las 8:00 del día 1

export type AttrId = 'power' | 'speed' | 'health' | 'stamina' | 'escape';
export const ATTRS: AttrId[] = ['power', 'speed', 'health', 'stamina', 'escape'];
export const ATTR_MAX = 5;

export type Slot = 'belt' | 'shoes' | 'charm';

/** Bonos que recibe Chema (multiplicadores en torno a 1 y momentum inicial) */
export interface Bonus { power: number; speed: number; health: number; stamina: number; resist: number; escape: number; tempo: number; startMom: number }
export const NO_BONUS: Bonus = { power: 1, speed: 1, health: 1, stamina: 1, resist: 1, escape: 1, tempo: 1, startMom: 0 };

export interface Item {
  id: string;
  name: string;
  desc: string;
  price: number;
  kind: Slot | 'food' | 'boost';
  /** Equipo: bonos permanentes mientras lo llevas puesto */
  bonus?: Partial<Bonus>;
  /** Comida / mejora de un combate: efecto del próximo combate */
  fight?: { hp?: number; mom?: number; power?: number };
  /** Requisito de nivel para comprarlo */
  level?: number;
}

export interface WorldProgress {
  v: 1;
  money: number;
  xp: number;
  level: number;
  /** Puntos de entrenamiento sin gastar */
  points: number;
  attrs: Record<AttrId, number>;
  inventory: Record<string, number>;
  equip: Partial<Record<Slot, string>>;
  /** Minutos desde el inicio (día = 1440) */
  time: number;
  quests: Record<string, { step: number; n: number; done: boolean }>;
  collected: string[];
  graffiti: string[];
  cards: string[];
  /** Id de NPC → minuto del mundo en el que se puede volver a retar */
  cooldowns: Record<string, number>;
  wins: Record<string, number>;
  records: Record<string, number>;
  flags: Flags;
  pos?: { x: number; z: number; yaw: number };
  visited: string[];
  /** Mejora de un solo combate que se ha activado antes de pelear */
  pending: { hp: number; mom: number; power: number };
  stats: { fights: number; wins: number; bets: number; betsWon: number; money: number; trained: number; fish: number; days: number; photos: number };
  /** Torre de supervivencia (posjuego): mejor piso */
  tower: number;
}

export const newWorld = (): WorldProgress => ({
  v: 1, money: 120, xp: 0, level: 1, points: 1,
  attrs: { power: 0, speed: 0, health: 0, stamina: 0, escape: 0 },
  inventory: {}, equip: {}, time: START_TIME, quests: {}, collected: [], graffiti: [], cards: [],
  cooldowns: {}, wins: {}, records: {}, flags: {}, visited: ['plaza'],
  pending: { hp: 0, mom: 0, power: 0 },
  stats: { fights: 0, wins: 0, bets: 0, betsWon: 0, money: 0, trained: 0, fish: 0, days: 1, photos: 0 },
  tower: 0,
});

/** Rellena campos que falten en partidas guardadas antiguas */
export function migrateWorld(w: Partial<WorldProgress> | undefined | null): WorldProgress {
  const b = newWorld();
  if (!w) return b;
  return { ...b, ...w, attrs: { ...b.attrs, ...(w.attrs ?? {}) }, stats: { ...b.stats, ...(w.stats ?? {}) }, pending: { ...b.pending, ...(w.pending ?? {}) } } as WorldProgress;
}

// ------------------------------------------------------------------ tiempo
export const hourOf = (p: WorldProgress) => (p.time % DAY_MIN) / 60;
export const dayOf = (p: WorldProgress) => Math.floor(p.time / DAY_MIN) + 1;
export const isNight = (p: WorldProgress) => { const h = hourOf(p); return h >= 21 || h < 6; };
export const clockText = (p: WorldProgress) => { const m = Math.floor(p.time % DAY_MIN); return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };

export function addTime(p: WorldProgress, minutes: number) {
  const before = dayOf(p);
  p.time += minutes;
  p.stats.days = Math.max(p.stats.days, dayOf(p));
  return dayOf(p) - before; // días que han pasado
}

/** Duerme hasta las 8:00 del día siguiente (o de hoy si aún es de madrugada) */
export function sleepUntilMorning(p: WorldProgress) {
  const m = p.time % DAY_MIN;
  const target = 8 * 60;
  const add = m < target ? target - m : DAY_MIN - m + target;
  addTime(p, add);
  return add;
}

// ------------------------------------------------------------------ dinero y nivel
export const MAX_LEVEL = 25;
export const xpForLevel = (l: number) => Math.round(70 + 55 * Math.pow(l, 1.45));

export function addMoney(p: WorldProgress, n: number) { p.money = Math.max(0, p.money + n); if (n > 0) p.stats.money += n; }

/** Suma experiencia; devuelve los niveles ganados */
export function addXp(p: WorldProgress, amount: number): number {
  p.xp += Math.max(0, Math.round(amount));
  let gained = 0;
  while (p.level < MAX_LEVEL && p.xp >= xpForLevel(p.level)) { p.xp -= xpForLevel(p.level); p.level++; p.points++; gained++; }
  if (p.level >= MAX_LEVEL) p.xp = Math.min(p.xp, xpForLevel(MAX_LEVEL));
  return gained;
}

// ------------------------------------------------------------------ gimnasio
export const GYM: Record<AttrId, { name: string; desc: string; per: number }> = {
  power: { name: 'Fuerza', desc: '+4 % de daño por nivel', per: 0.04 },
  speed: { name: 'Velocidad', desc: '+3 % de velocidad y rapidez de golpes por nivel', per: 0.03 },
  health: { name: 'Vida', desc: '+5 % de vida máxima por nivel', per: 0.05 },
  stamina: { name: 'Resistencia', desc: '+6 % de resistencia máxima por nivel', per: 0.06 },
  escape: { name: 'Zafarse', desc: '+8 % de fuerza para zafarte de pins y llaves por nivel', per: 0.08 },
};
export const gymCost = (level: number) => Math.round(60 * Math.pow(level + 1, 1.6));
export const GYM_HOURS = 2;

export function trainAttr(p: WorldProgress, id: AttrId): { ok: boolean; reason?: string } {
  const lv = p.attrs[id];
  if (lv >= ATTR_MAX) return { ok: false, reason: 'Ya está al máximo.' };
  if (p.points < 1) return { ok: false, reason: 'No te quedan puntos de entrenamiento (se ganan al subir de nivel).' };
  const cost = gymCost(lv);
  if (p.money < cost) return { ok: false, reason: `Te faltan ${cost - p.money} Hoyos.` };
  p.money -= cost; p.points--; p.attrs[id]++; p.stats.trained++;
  addTime(p, GYM_HOURS * 60);
  return { ok: true };
}

// ------------------------------------------------------------------ tienda y equipo
export function buyItem(p: WorldProgress, item: Item): { ok: boolean; reason?: string } {
  if (item.level && p.level < item.level) return { ok: false, reason: `Requiere nivel ${item.level}.` };
  if (item.kind !== 'food' && item.kind !== 'boost' && (p.inventory[item.id] ?? 0) > 0) return { ok: false, reason: 'Ya lo tienes.' };
  if (p.money < item.price) return { ok: false, reason: `Te faltan ${item.price - p.money} Hoyos.` };
  p.money -= item.price;
  p.inventory[item.id] = (p.inventory[item.id] ?? 0) + 1;
  return { ok: true };
}

export function equipItem(p: WorldProgress, slot: Slot, itemId: string | null, items: Item[]): boolean {
  if (itemId === null) { delete p.equip[slot]; return true; }
  const it = items.find((i) => i.id === itemId);
  if (!it || it.kind !== slot || !(p.inventory[itemId] > 0)) return false;
  p.equip[slot] = itemId;
  return true;
}

/** Usa una comida o mejora: se aplica al próximo combate */
export function useItem(p: WorldProgress, item: Item): boolean {
  if ((item.kind !== 'food' && item.kind !== 'boost') || !(p.inventory[item.id] > 0) || !item.fight) return false;
  p.inventory[item.id]--;
  p.pending.hp += item.fight.hp ?? 0; p.pending.mom += item.fight.mom ?? 0; p.pending.power += item.fight.power ?? 0;
  return true;
}

export const BONUS_CAP = 1.3; // un luchador nunca recibe más de +30 % acumulado en un atributo

/** Bonos totales de Chema: gimnasio + equipo (con tope) */
export function bonusOf(p: WorldProgress | null | undefined, items: Item[]): Bonus {
  if (!p) return { ...NO_BONUS };
  const b: Bonus = { ...NO_BONUS };
  for (const a of ATTRS) {
    const per = GYM[a].per * p.attrs[a];
    if (a === 'speed') { b.speed += per; b.tempo += per; } else b[a] += per;
  }
  for (const id of Object.values(p.equip)) {
    const it = items.find((i) => i.id === id);
    if (!it?.bonus) continue;
    for (const k of Object.keys(it.bonus) as (keyof Bonus)[]) {
      if (k === 'startMom') b.startMom += it.bonus[k] ?? 0;
      else if (k === 'resist') b.resist *= it.bonus[k] ?? 1; // menor = recibe menos daño
      else b[k] += (it.bonus[k] ?? 1) - 1;
    }
  }
  for (const k of ['power', 'speed', 'health', 'stamina', 'escape', 'tempo'] as const) b[k] = Math.min(BONUS_CAP, b[k]);
  b.resist = Math.max(0.75, b.resist);
  b.startMom = Math.min(60, b.startMom);
  return b;
}

export function applyBonus(s: FighterStats, b: Bonus): FighterStats {
  return {
    ...s, power: s.power * b.power, speed: s.speed * b.speed, health: s.health * b.health, stamina: s.stamina * b.stamina,
    resist: s.resist * b.resist, escape: s.escape * b.escape, tempo: s.tempo * b.tempo,
  };
}

// ------------------------------------------------------------------ condiciones, distritos y NPC
export interface Cond {
  chapter?: string;         // capítulo de historia completado
  notChapter?: string;      // capítulo NO completado
  flag?: string | [string, FlagValue];
  notFlag?: string | [string, FlagValue];
  quest?: [string, 'done' | 'active' | 'none'];
  night?: boolean;          // true = solo de noche, false = solo de día
  level?: number;
  day?: number;             // a partir del día N
  ending?: boolean;         // historia terminada (posjuego)
}

export interface Ctx { story: StoryProgress; world: WorldProgress }

export function questState(w: WorldProgress, id: string): 'none' | 'active' | 'done' {
  const q = w.quests[id];
  return !q ? 'none' : q.done ? 'done' : 'active';
}

export function condHolds(c: Cond | undefined, ctx: Ctx): boolean {
  if (!c) return true;
  const { story, world } = ctx;
  const flags = { ...world.flags, ...story.flags };
  if (c.chapter && !story.done.includes(c.chapter)) return false;
  if (c.notChapter && story.done.includes(c.notChapter)) return false;
  if (c.flag != null && !holds(c.flag, flags)) return false;
  if (c.notFlag != null && holds(c.notFlag, flags)) return false;
  if (c.quest && questState(world, c.quest[0]) !== c.quest[1]) return false;
  if (c.night != null && c.night !== isNight(world)) return false;
  if (c.level != null && world.level < c.level) return false;
  if (c.day != null && dayOf(world) < c.day) return false;
  if (c.ending != null && c.ending !== (story.endings.length > 0)) return false;
  return true;
}

// ------------------------------------------------------------------ misiones
export type EventType = 'talk' | 'win' | 'collect' | 'visit' | 'minigame' | 'give' | 'bet' | 'train' | 'buy' | 'travel' | 'photo' | 'tower' | 'chapter' | 'sleep' | 'cards';
export interface WorldEvent { t: EventType; id?: string; npc?: string; score?: number; won?: boolean }

export interface QuestStep {
  on: EventType;
  /** npc / poi / distrito / minijuego / objeto según el tipo */
  target?: string;
  /** Cuántas veces (por defecto 1) */
  count?: number;
  /** Puntuación mínima (minijuegos) */
  min?: number;
  text: string;
  /** Escenas que se ven al completar este paso */
  scenes?: StoryScene[];
}

export interface QuestReward { money?: number; xp?: number; items?: Record<string, number>; points?: number; flags?: Flags; text?: string }

export interface QuestDef {
  id: string;
  title: string;
  /** NPC que la da (se acepta al hablar con él si se cumple `requires`) */
  giver: string;
  summary: string;
  requires?: Cond;
  intro: StoryScene[];
  steps: QuestStep[];
  reward: QuestReward;
  /** Es del posjuego */
  post?: boolean;
}

export function questsAvailable(defs: QuestDef[], ctx: Ctx): QuestDef[] {
  return defs.filter((q) => questState(ctx.world, q.id) === 'none' && condHolds(q.requires, ctx));
}

export function startQuest(w: WorldProgress, id: string) { if (!w.quests[id]) w.quests[id] = { step: 0, n: 0, done: false }; }

export const activeQuests = (w: WorldProgress, defs: QuestDef[]) => defs.filter((q) => questState(w, q.id) === 'active');
export const doneQuests = (w: WorldProgress) => Object.values(w.quests).filter((q) => q.done).length;

function stepMatches(s: QuestStep, e: WorldEvent): boolean {
  if (s.on !== e.t) return false;
  if (s.target && s.target !== (e.id ?? e.npc)) {
    // 'minigame' y 'travel' usan id; 'talk'/'win' usan npc
    if (!(e.npc && s.target === e.npc)) return false;
  }
  if (s.min != null && (e.score ?? 0) < s.min) return false;
  if (e.t === 'bet' && !e.won) return false;
  return true;
}

export interface QuestResult { stepDone: { quest: QuestDef; step: QuestStep }[]; completed: QuestDef[] }

/** Informa de un evento a las misiones activas; devuelve los pasos y misiones completados */
export function reportEvent(w: WorldProgress, defs: QuestDef[], e: WorldEvent): QuestResult {
  const out: QuestResult = { stepDone: [], completed: [] };
  for (const q of activeQuests(w, defs)) {
    const st = w.quests[q.id];
    const step = q.steps[st.step];
    if (!step || !stepMatches(step, e)) continue;
    st.n++;
    if (st.n >= (step.count ?? 1)) {
      out.stepDone.push({ quest: q, step });
      st.step++; st.n = 0;
      if (st.step >= q.steps.length) { st.done = true; out.completed.push(q); }
    }
  }
  return out;
}

export function giveReward(w: WorldProgress, r: QuestReward): { levels: number } {
  if (r.money) addMoney(w, r.money);
  if (r.points) w.points += r.points;
  for (const [id, n] of Object.entries(r.items ?? {})) w.inventory[id] = (w.inventory[id] ?? 0) + n;
  if (r.flags) w.flags = { ...w.flags, ...r.flags };
  return { levels: r.xp ? addXp(w, r.xp) : 0 };
}

// ------------------------------------------------------------------ combates callejeros
export const STREET_COOLDOWN = 6 * 60; // minutos del mundo antes de poder repetir
export function streetReward(level: number, diffIndex: number, first: boolean) {
  const money = Math.round((45 + level * 9) * (1 + diffIndex * 0.35) * (first ? 2 : 1));
  const xp = Math.round((38 + level * 6) * (1 + diffIndex * 0.3) * (first ? 1.8 : 1));
  return { money, xp };
}
/** Dificultad del rival según tu nivel */
export function streetDifficulty(level: number): 'facil' | 'intermedia' | 'dificil' { return level < 6 ? 'facil' : level < 14 ? 'intermedia' : 'dificil'; }

export function canChallenge(w: WorldProgress, npc: string) { return (w.cooldowns[npc] ?? 0) <= w.time; }

// ------------------------------------------------------------------ coleccionables
export function collectSticker(w: WorldProgress, id: string): boolean {
  if (w.collected.includes(id)) return false;
  w.collected.push(id);
  return true;
}
/** Recompensas por pegatinas: umbral → dinero/puntos */
export const STICKER_MILESTONES: { at: number; money: number; points: number; text: string }[] = [
  { at: 5, money: 100, points: 0, text: '5 pegatinas: ¡Aficionado!' },
  { at: 10, money: 250, points: 1, text: '10 pegatinas: ¡Coleccionista!' },
  { at: 20, money: 600, points: 2, text: '20 pegatinas: ¡Fanático!' },
  { at: 30, money: 1500, points: 3, text: '30 pegatinas: ¡Álbum completo!' },
];
export const milestoneFor = (count: number) => STICKER_MILESTONES.find((m) => m.at === count) ?? null;

// ------------------------------------------------------------------ apuestas
/** Cuotas de una apuesta a partir de la probabilidad de que gane A (con margen de la casa) */
export function betOdds(pA: number): { a: number; b: number } {
  const clamp = (x: number) => Math.min(0.92, Math.max(0.08, x));
  const p = clamp(pA);
  const margin = 0.92;
  return { a: Math.round((margin / p) * 100) / 100, b: Math.round((margin / (1 - p)) * 100) / 100 };
}
export const betPayout = (stake: number, odds: number) => Math.round(stake * odds);

// ------------------------------------------------------------------ distritos
export interface UnlockRule { chapter?: string; level?: number; flag?: string }
export function districtOpen(rule: UnlockRule | undefined, ctx: Ctx): boolean {
  if (!rule) return true;
  if (rule.chapter && !ctx.story.done.includes(rule.chapter)) return false;
  if (rule.level && ctx.world.level < rule.level) return false;
  if (rule.flag && !holds(rule.flag, { ...ctx.world.flags, ...ctx.story.flags })) return false;
  return true;
}

/** Duración estimada de juego (en horas) a partir de lo hecho: útil para ajustar el contenido */
export function estimateHours(p: WorldProgress, chaptersDone: number): number {
  return Math.round((chaptersDone * 6 + doneQuests(p) * 4 + p.collected.length * 0.6 + p.stats.fights * 2.5 + p.stats.trained * 1) / 60 * 10) / 10;
}
