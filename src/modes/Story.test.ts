import { describe, expect, it } from 'vitest';
import { CHAPTERS, ENDINGS } from '../../content/historia';
import { ARENA_INFO } from '../combat/arenaInfo';
import { ROSTER } from '../content/roster';
import { AIController } from '../ai/AIController';
import { Match } from '../combat/Match';
import { fighterById } from '../content/roster';
import { applyChoice, chapterState, chaptersFor, completeChapter, fightsFor, holds, lineVisible, newProgress, nextChapter, scenesFor, type StoryLine } from './Story';

const ids = new Set(ROSTER.map((f) => f.id));
const speakers = new Set([...ids, 'narrador', 'arbitro']);

describe('historia: lógica de progreso', () => {
  it('las banderas y condiciones funcionan', () => {
    expect(holds(undefined, {})).toBe(true);
    expect(holds('x', { x: true })).toBe(true);
    expect(holds('x', { x: false })).toBe(false);
    expect(holds(['a', 'b'], { a: 'b' })).toBe(true);
    expect(holds(['a', 'b'], { a: 'c' })).toBe(false);
    const l: StoryLine = { who: 'chema', text: 'hola', if: 'm', ifNot: ['z', 1] };
    expect(lineVisible(l, { m: true })).toBe(true);
    expect(lineVisible(l, { m: true, z: 1 })).toBe(false);
    expect(lineVisible(l, {})).toBe(false);
  });

  it('los capítulos se desbloquean en orden y se completan', () => {
    let p = newProgress();
    expect(nextChapter(CHAPTERS, p)?.id).toBe(CHAPTERS[0].id);
    expect(chapterState(CHAPTERS, p, CHAPTERS[1].id)).toBe('locked');
    p = completeChapter(p, CHAPTERS[0]);
    expect(chapterState(CHAPTERS, p, CHAPTERS[0].id)).toBe('done');
    expect(chapterState(CHAPTERS, p, CHAPTERS[1].id)).toBe('open');
    expect(p.flags.cap1).toBe(true);
  });

  it('elegir una opción activa sus banderas sin tocar el resto', () => {
    const p = applyChoice(newProgress(), { text: 'x', set: { aliado_petisui: true } });
    expect(p.flags.aliado_petisui).toBe(true);
    expect(newProgress().flags.aliado_petisui).toBeUndefined();
  });
});

describe('historia: integridad del contenido', () => {
  it('los capítulos tienen ids únicos y todo lo que citan existe', () => {
    expect(new Set(CHAPTERS.map((c) => c.id)).size).toBe(CHAPTERS.length);
    for (const ch of CHAPTERS) {
      expect(ARENA_INFO[ch.arena], ch.id).toBeTruthy();
      const scenes = [...ch.intro, ...ch.outro, ...ch.fights.flatMap((f) => f.before ?? [])];
      for (const sc of scenes) {
        if (sc.bg) expect(ARENA_INFO[sc.bg], `${ch.id} bg ${sc.bg}`).toBeTruthy();
        for (const c of sc.cast ?? []) expect(ids.has(c), `${ch.id} cast ${c}`).toBe(true);
        for (const l of [...sc.lines, ...(sc.choices ?? []).flatMap((c) => c.reply ?? [])]) {
          expect(speakers.has(l.who), `${ch.id}: hablante desconocido "${l.who}"`).toBe(true);
          expect(l.text.length).toBeGreaterThan(0);
        }
      }
      expect(ch.fights.length).toBeGreaterThan(0);
      for (const f of ch.fights) {
        expect(ids.has(f.opponent), `${ch.id} rival ${f.opponent}`).toBe(true);
        if (f.opponentPartner) expect(ids.has(f.opponentPartner)).toBe(true);
        if (f.partner && f.partner !== 'elegir') expect(ids.has(f.partner)).toBe(true);
        expect(ARENA_INFO[f.arena]).toBeTruthy();
        expect(f.objective.length).toBeGreaterThan(5);
      }
    }
    for (const e of ENDINGS) for (const sc of e.scenes) for (const l of sc.lines) expect(speakers.has(l.who)).toBe(true);
  });

  it('se puede completar toda la historia siguiendo cualquier ruta', () => {
    // prueba todas las combinaciones de las primeras elecciones: siempre llega al final de la lista
    const choiceSets = CHAPTERS.flatMap((c) => [...c.intro, ...c.outro, ...c.fights.flatMap((f) => f.before ?? [])]).flatMap((s) => s.choices ?? []);
    expect(choiceSets.length).toBeGreaterThan(0);
    let p = newProgress();
    for (let guard = 0; guard < 40; guard++) {
      const next = nextChapter(CHAPTERS, p);
      if (!next) break;
      for (const sc of [...next.intro, ...next.outro]) if (sc.choices?.[0]) p = applyChoice(p, sc.choices[0]);
      p = completeChapter(p, next);
    }
    expect(nextChapter(CHAPTERS, p)).toBeNull();
    expect(chaptersFor(CHAPTERS, p.flags).every((c) => p.done.includes(c.id))).toBe(true);
  });

  it('todos los combates de la historia terminan (IA contra IA)', () => {
    for (const flags of [{ bando: 'elso' }, { bando: 'pablo' }]) for (const ch of CHAPTERS) for (const f of fightsFor(ch, flags)) {
      let s = 7;
      const rng = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
      const m = new Match(fighterById('chema'), fighterById(f.opponent), rng, ARENA_INFO[f.arena].rules, [f.partner && f.partner !== 'elegir' ? fighterById(f.partner) : null, f.opponentPartner ? fighterById(f.opponentPartner) : null]);
      if (f.timeLimit) { m.timeLimit = f.timeLimit; m.timeMode = f.timeMode ?? 'hp'; }
      const a = new AIController(0, 'intermedia', rng), b = new AIController(1, f.difficulty, rng);
      while (!m.over && m.time < 900) m.update(1 / 30, [a.update(1 / 30, m), b.update(1 / 30, m)]);
      expect(m.over, `${ch.id} vs ${f.opponent} (${flags.bando})`).toBe(true);
    }
    expect(scenesFor([], {})).toEqual([]);
  });

  it('todos los finales existen y cada ruta llega a alguno', () => {
    const finals = new Set(ENDINGS.map((e) => e.id));
    expect(finals.size).toBe(3);
    const choices = CHAPTERS.flatMap((c) => c.outro).flatMap((sc) => sc.choices ?? []);
    const setFinals = choices.map((c) => c.set?.final).filter(Boolean) as string[];
    for (const f of setFinals) expect(finals.has(f)).toBe(true);
    expect(new Set(setFinals)).toEqual(finals); // los tres finales se pueden conseguir
    // por cada ruta (bando) hay al menos una opción de final disponible
    for (const bando of ['elso', 'pablo']) {
      const avail = choices.filter((c) => c.set?.final && holds(c.if, { bando }));
      expect(avail.length, bando).toBeGreaterThan(0);
    }
  });

  it('cada capítulo tiene combates en las dos rutas y el último cierra la historia', () => {
    for (const bando of ['elso', 'pablo']) for (const ch of CHAPTERS) expect(fightsFor(ch, { bando }).length, `${ch.id}/${bando}`).toBeGreaterThan(0);
    expect(CHAPTERS.filter((c) => c.endsStory)).toHaveLength(1);
    expect(CHAPTERS[CHAPTERS.length - 1].endsStory).toBe(true);
    expect(CHAPTERS.length).toBe(9);
  });
});
