import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../../content/historia';
import { CIVILS, DISTRICTS, GRAFFITI, ITEMS, POIS, STICKERS } from '../../content/mundo';
import { NPCS } from '../../content/mundo-npc';
import { QUESTS } from '../../content/misiones';
import { ROSTER } from '../content/roster';
import { newProgress } from './Story';
import {
  ATTRS, ATTR_MAX, MAX_LEVEL, addMoney, addTime, addXp, applyBonus, betOdds, betPayout, bonusOf, buyItem, canChallenge, clockText, collectSticker, condHolds, dayOf,
  districtOpen, doneQuests, equipItem, giveReward, gymCost, hourOf, isNight, migrateWorld, milestoneFor, newWorld, questState, questsAvailable, reportEvent, sleepUntilMorning,
  startQuest, streetReward, trainAttr, useItem, xpForLevel, type Ctx,
} from './World';

const ctx = (w = newWorld(), story = newProgress()): Ctx => ({ story, world: w });

describe('mundo: tiempo, dinero y nivel', () => {
  it('el reloj avanza, hay día y noche y se puede dormir', () => {
    const w = newWorld();
    expect(clockText(w)).toBe('08:00');
    expect(isNight(w)).toBe(false);
    addTime(w, 14 * 60);
    expect(isNight(w)).toBe(true);
    expect(hourOf(w)).toBeCloseTo(22, 5);
    sleepUntilMorning(w);
    expect(clockText(w)).toBe('08:00');
    expect(dayOf(w)).toBe(2);
  });

  it('la experiencia sube de nivel, da puntos y tiene tope', () => {
    const w = newWorld();
    const levels = addXp(w, xpForLevel(1) + xpForLevel(2) + 5);
    expect(levels).toBe(2);
    expect(w.level).toBe(3);
    expect(w.points).toBe(3);
    addXp(w, 10_000_000);
    expect(w.level).toBe(MAX_LEVEL);
  });

  it('el dinero no baja de cero y se cuenta lo ganado', () => {
    const w = newWorld();
    addMoney(w, 100); addMoney(w, -9999);
    expect(w.money).toBe(0);
    expect(w.stats.money).toBe(100);
  });

  it('migra partidas antiguas sin perder datos', () => {
    const m = migrateWorld({ money: 500 } as never);
    expect(m.money).toBe(500);
    expect(m.attrs.power).toBe(0);
    expect(migrateWorld(undefined).money).toBe(newWorld().money);
  });
});

describe('mundo: gimnasio, tienda y bonos', () => {
  it('entrenar cuesta puntos, dinero y horas, y se detiene en el máximo', () => {
    const w = newWorld(); w.money = 99999; w.points = 99;
    const t0 = w.time;
    expect(trainAttr(w, 'power').ok).toBe(true);
    expect(w.attrs.power).toBe(1);
    expect(w.time - t0).toBe(120);
    for (let i = 0; i < 10; i++) trainAttr(w, 'power');
    expect(w.attrs.power).toBe(ATTR_MAX);
    expect(trainAttr(w, 'power').ok).toBe(false);
    const poor = newWorld(); poor.money = 0;
    expect(trainAttr(poor, 'speed').ok).toBe(false);
    const noPts = newWorld(); noPts.points = 0; noPts.money = 999;
    expect(trainAttr(noPts, 'speed').ok).toBe(false);
    expect(gymCost(4)).toBeGreaterThan(gymCost(0));
  });

  it('comprar, equipar y los bonos con tope', () => {
    const w = newWorld(); w.money = 99999; w.level = MAX_LEVEL;
    for (const it of ITEMS.filter((i) => i.kind === 'belt')) expect(buyItem(w, it).ok).toBe(true);
    expect(buyItem(w, ITEMS.find((i) => i.id === 'cinturon_lona')!).ok).toBe(false); // ya lo tiene
    expect(equipItem(w, 'belt', 'cinturon_hoyo', ITEMS)).toBe(true);
    expect(equipItem(w, 'shoes', 'cinturon_hoyo', ITEMS)).toBe(false); // slot equivocado
    const b = bonusOf(w, ITEMS);
    expect(b.power).toBeCloseTo(1.12, 5);
    // máximo de todo: nunca más de +30 %
    for (const a of ATTRS) w.attrs[a] = ATTR_MAX;
    for (const it of ITEMS) w.inventory[it.id] = 1;
    equipItem(w, 'belt', 'cinturon_hoyo', ITEMS); equipItem(w, 'shoes', 'botas_rayo', ITEMS); equipItem(w, 'charm', 'maletin_pablo', ITEMS);
    const m = bonusOf(w, ITEMS);
    for (const k of ['power', 'speed', 'health', 'stamina', 'escape', 'tempo'] as const) expect(m[k]).toBeLessThanOrEqual(1.3 + 1e-9);
    expect(m.resist).toBeGreaterThanOrEqual(0.75);
    const stats = applyBonus({ speed: 1, power: 1, health: 100, stamina: 100, tempo: 1, resist: 1, recover: 1, escape: 1 }, m);
    expect(stats.power).toBeGreaterThan(1);
  });

  it('el equipo exige nivel y los consumibles se usan una vez', () => {
    const w = newWorld(); w.money = 99999;
    const belt = ITEMS.find((i) => i.id === 'cinturon_oro')!;
    expect(buyItem(w, belt).ok).toBe(false);
    const drink = ITEMS.find((i) => i.id === 'bebida')!;
    expect(buyItem(w, drink).ok).toBe(true);
    expect(useItem(w, drink)).toBe(true);
    expect(w.pending.mom).toBe(25);
    expect(useItem(w, drink)).toBe(false);
  });
});

describe('mundo: misiones', () => {
  it('una misión sigue sus pasos con los eventos adecuados y da su recompensa', () => {
    const w = newWorld();
    startQuest(w, 'silla');
    expect(reportEvent(w, QUESTS, { t: 'talk', npc: 'petisui' }).stepDone).toHaveLength(0); // aún no toca
    expect(reportEvent(w, QUESTS, { t: 'visit', id: 'fuente' }).stepDone).toHaveLength(1);
    const r = reportEvent(w, QUESTS, { t: 'talk', npc: 'petisui' });
    expect(r.completed.map((q) => q.id)).toEqual(['silla']);
    expect(questState(w, 'silla')).toBe('done');
    const before = w.money;
    giveReward(w, r.completed[0].reward);
    expect(w.money).toBe(before + r.completed[0].reward.money!);
    expect(w.inventory.silla_miniatura).toBe(1);
  });

  it('los pasos con cantidad y puntuación mínima', () => {
    const w = newWorld();
    startQuest(w, 'pesca_q'); startQuest(w, 'hamburguesa');
    for (let i = 0; i < 2; i++) reportEvent(w, QUESTS, { t: 'minigame', id: 'pesca', score: 1 });
    expect(w.quests.pesca_q.step).toBe(0);
    reportEvent(w, QUESTS, { t: 'minigame', id: 'pesca', score: 1 });
    expect(w.quests.pesca_q.step).toBe(1);
    reportEvent(w, QUESTS, { t: 'minigame', id: 'comilona', score: 3 }); // no llega al mínimo
    expect(w.quests.hamburguesa.step).toBe(0);
    reportEvent(w, QUESTS, { t: 'minigame', id: 'comilona', score: 9 });
    expect(w.quests.hamburguesa.step).toBe(1);
  });

  it('las misiones aparecen según la historia, la hora y las misiones previas', () => {
    const w = newWorld();
    expect(questsAvailable(QUESTS, ctx(w)).map((q) => q.id)).not.toContain('silla');
    const story = { done: ['fichaje'], flags: {}, endings: [] };
    expect(questsAvailable(QUESTS, ctx(w, story)).map((q) => q.id)).toContain('silla');
    startQuest(w, 'silla');
    expect(questsAvailable(QUESTS, ctx(w, story)).map((q) => q.id)).not.toContain('silla');
    expect(questsAvailable(QUESTS, ctx(w, story)).map((q) => q.id)).not.toContain('coleccionista2'); // requiere terminar la 1
    w.quests.coleccionista = { step: 2, n: 0, done: true };
    expect(questsAvailable(QUESTS, ctx(w, story)).map((q) => q.id)).toContain('coleccionista2');
  });

  it('condiciones: capítulo, banderas, noche, nivel, día y final', () => {
    const w = newWorld();
    const st = { done: ['garito'], flags: { x: 1 }, endings: [] as string[] };
    expect(condHolds({ chapter: 'garito' }, ctx(w, st))).toBe(true);
    expect(condHolds({ chapter: 'champion' }, ctx(w, st))).toBe(false);
    expect(condHolds({ flag: ['x', 1] }, ctx(w, st))).toBe(true);
    expect(condHolds({ night: true }, ctx(w, st))).toBe(false);
    addTime(w, 14 * 60);
    expect(condHolds({ night: true }, ctx(w, st))).toBe(true);
    expect(condHolds({ level: 5 }, ctx(w, st))).toBe(false);
    expect(condHolds({ ending: true }, ctx(w, st))).toBe(false);
    expect(condHolds({ ending: true }, ctx(w, { ...st, endings: ['leal'] }))).toBe(true);
  });
});

describe('mundo: combates, coleccionables, apuestas y distritos', () => {
  it('los combates callejeros tienen enfriamiento y la primera victoria da el doble', () => {
    const w = newWorld();
    expect(canChallenge(w, 'elso')).toBe(true);
    w.cooldowns.elso = w.time + 360;
    expect(canChallenge(w, 'elso')).toBe(false);
    addTime(w, 361);
    expect(canChallenge(w, 'elso')).toBe(true);
    expect(streetReward(5, 0, true).money).toBe(streetReward(5, 0, false).money * 2);
    expect(streetReward(5, 2, false).money).toBeGreaterThan(streetReward(5, 0, false).money);
  });

  it('las pegatinas se recogen una vez y dan hitos', () => {
    const w = newWorld();
    expect(collectSticker(w, 's_plaza1')).toBe(true);
    expect(collectSticker(w, 's_plaza1')).toBe(false);
    expect(milestoneFor(5)).not.toBeNull();
    expect(milestoneFor(7)).toBeNull();
  });

  it('las cuotas llevan margen de la casa y el pago es coherente', () => {
    const o = betOdds(0.5);
    expect(1 / o.a + 1 / o.b).toBeGreaterThan(1); // la casa gana
    expect(betOdds(0.9).a).toBeLessThan(betOdds(0.2).a);
    expect(betPayout(100, 2.5)).toBe(250);
  });

  it('los distritos se abren con los capítulos', () => {
    const w = newWorld();
    const aldea = DISTRICTS.find((d) => d.id === 'aldea')!;
    expect(districtOpen(aldea.unlock, ctx(w))).toBe(false);
    expect(districtOpen(aldea.unlock, ctx(w, { done: ['garito'], flags: {}, endings: [] }))).toBe(true);
    expect(districtOpen(undefined, ctx(w))).toBe(true);
  });
});

describe('mundo: integridad del contenido', () => {
  const rosterIds = new Set(ROSTER.map((r) => r.id));
  const civilIds = new Set(CIVILS.map((c) => c.id));
  const districtIds = new Set(DISTRICTS.map((d) => d.id));
  const npcIds = new Set(NPCS.map((n) => n.id));
  const poiIds = new Set(POIS.map((p) => p.id));
  const itemIds = new Set(ITEMS.map((i) => i.id));
  const speakers = new Set([...rosterIds, ...civilIds, 'narrador', 'arbitro']);

  it('ids únicos y cantidades prometidas', () => {
    for (const list of [NPCS.map((n) => n.id), POIS.map((p) => p.id), STICKERS.map((s) => s.id), GRAFFITI.map((g) => g.id), QUESTS.map((q) => q.id), ITEMS.map((i) => i.id)]) expect(new Set(list).size).toBe(list.length);
    expect(STICKERS).toHaveLength(30);
    expect(GRAFFITI.length).toBeGreaterThanOrEqual(10);
    expect(QUESTS.length).toBeGreaterThanOrEqual(24);
    expect(DISTRICTS).toHaveLength(8);
    expect(ITEMS.length).toBeGreaterThanOrEqual(20);
  });

  it('los NPC existen, están en distritos válidos y tienen cosas que decir', () => {
    for (const n of NPCS) {
      if (n.fighter) expect(rosterIds.has(n.id), n.id).toBe(true); else expect(civilIds.has(n.id), n.id).toBe(true);
      expect(districtIds.has(n.district), n.id).toBe(true);
      if (n.alt) expect(districtIds.has(n.alt.district)).toBe(true);
      expect(n.quips.length, n.id).toBeGreaterThanOrEqual(2);
      expect(n.talks.length, n.id).toBeGreaterThan(0);
      for (const t of n.talks) for (const sc of t.scenes) for (const l of sc.lines) expect(speakers.has(l.who), `${n.id}: ${l.who}`).toBe(true);
    }
    // todos los luchadores (menos Chema) tienen su NPC retable
    for (const r of ROSTER.filter((x) => !x.placeholder && x.id !== 'chema')) expect(NPCS.some((n) => n.id === r.id && n.fighter), r.id).toBe(true);
  });

  it('los lugares apuntan a cosas que existen', () => {
    for (const p of POIS) {
      expect(districtIds.has(p.district), p.id).toBe(true);
      if (p.kind === 'story') expect(CHAPTERS.some((c) => c.id === p.chapter), p.id).toBe(true);
      if (p.kind === 'minigame') expect(p.minigame, p.id).toBeTruthy();
      for (const s of p.sells ?? []) expect(itemIds.has(s), `${p.id}: ${s}`).toBe(true);
    }
    for (const d of DISTRICTS) expect(poiIds.has('taxi_' + d.id), 'taxi ' + d.id).toBe(true);
    // cada capítulo de la historia tiene su marcador
    for (const c of CHAPTERS) expect(POIS.some((p) => p.kind === 'story' && p.chapter === c.id), c.id).toBe(true);
    for (const s of [...STICKERS, ...GRAFFITI]) expect(districtIds.has(s.district)).toBe(true);
  });

  it('las misiones son coherentes y se pueden completar', () => {
    const questIds = new Set(QUESTS.map((q) => q.id));
    for (const q of QUESTS) {
      expect(npcIds.has(q.giver), q.id + ' giver').toBe(true);
      expect(q.steps.length).toBeGreaterThan(0);
      for (const sc of q.intro) for (const l of sc.lines) expect(speakers.has(l.who), `${q.id}: ${l.who}`).toBe(true);
      for (const [id] of Object.entries(q.reward.items ?? {})) expect(itemIds.has(id), `${q.id}: ${id}`).toBe(true);
      if (q.requires?.chapter) expect(CHAPTERS.some((c) => c.id === q.requires!.chapter), q.id).toBe(true);
      if (q.requires?.quest) expect(questIds.has(q.requires.quest[0]), q.id).toBe(true);
      for (const st of q.steps) {
        if (st.on === 'talk') expect(npcIds.has(st.target!), `${q.id} talk ${st.target}`).toBe(true);
        if (st.on === 'win' && st.target) expect(NPCS.find((n) => n.id === st.target)?.fighter, `${q.id} win ${st.target}`).toBe(true);
        if (st.on === 'visit') expect(poiIds.has(st.target!), `${q.id} visit ${st.target}`).toBe(true);
        if (st.on === 'travel' && st.target) expect(districtIds.has(st.target), `${q.id} travel`).toBe(true);
        if (st.on === 'minigame') expect(['pulso', 'comilona', 'pesca', 'tambores']).toContain(st.target);
        for (const sc of st.scenes ?? []) for (const l of sc.lines) expect(speakers.has(l.who), `${q.id}: ${l.who}`).toBe(true);
      }
    }
  });

  it('todas las misiones se pueden terminar en orden simulando los eventos de sus pasos', () => {
    const w = newWorld();
    w.flags.quests15 = true;
    const st = { done: CHAPTERS.map((c) => c.id), flags: { bando: 'elso' }, endings: ['dueno'] };
    for (let round = 0; round < 6; round++) {
      for (const q of questsAvailable(QUESTS, { story: st, world: w })) startQuest(w, q.id);
      for (const q of QUESTS) {
        if (questState(w, q.id) !== 'active') continue;
        for (let guard = 0; guard < 60 && w.quests[q.id] && !w.quests[q.id].done; guard++) {
          const step = q.steps[w.quests[q.id].step];
          reportEvent(w, QUESTS, { t: step.on, id: step.target, npc: step.target, score: step.min ?? 99, won: true });
        }
      }
    }
    expect(doneQuests(w)).toBe(QUESTS.length);
  });

  it('hay contenido para unas 3 horas de juego', () => {
    const lines = (scenes: { lines: unknown[] }[]) => scenes.reduce((a, s) => a + s.lines.length, 0);
    const storyMin = CHAPTERS.reduce((a, c) => a + c.fights.length * 4 + (lines(c.intro) + lines(c.outro) + c.fights.reduce((x, f) => x + lines(f.before ?? []), 0)) * 0.1, 0);
    const per: Record<string, number> = { talk: 1.5, win: 3.2, collect: 1.2, minigame: 2.2, visit: 1, bet: 2.5, train: 2.2, buy: 1.2, travel: 1.5, photo: 1, cards: 3.2, tower: 14, chapter: 2, sleep: 1, give: 1 };
    const questMin = QUESTS.reduce((a, q) => a + 1.5 + q.steps.reduce((x, s) => x + (per[s.on] ?? 1.5) * (s.count ?? 1), 0), 0);
    const stickerMin = STICKERS.length * 0.9 + GRAFFITI.length * 0.8;
    // para llegar al nivel máximo hacen falta unos cuantos combates callejeros
    let xp = 0; for (let l = 1; l < MAX_LEVEL; l++) xp += xpForLevel(l);
    const grindMin = (xp / 90) * 3.2 * 0.6;
    const total = (storyMin + questMin + stickerMin + grindMin) / 60;
    expect(total).toBeGreaterThanOrEqual(3);
  });
});
