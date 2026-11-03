import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../../content/historia';
import { CHATTER, CITY_BEATS, PROLOGUE } from '../../content/historia-ciudad';
import { CIVILS, POIS } from '../../content/mundo';
import { ROSTER } from './roster';
import type { StoryScene } from '../modes/Story';

const known = new Set(['narrador', 'arbitro', ...ROSTER.map((f) => f.id), ...CIVILS.map((c) => c.id)]);
const whos = (scenes: StoryScene[]) => scenes.flatMap((s) => [...s.lines.map((l) => l.who), ...(s.cast ?? [])]);

describe('Historia en la ciudad de Hoyo', () => {
  it('cada capítulo tiene objetivo y una marca dorada en la ciudad', () => {
    for (const ch of CHAPTERS) {
      expect(CITY_BEATS[ch.id]?.goal, ch.id).toBeTruthy();
      expect(POIS.some((p) => p.kind === 'story' && p.chapter === ch.id), ch.id).toBe(true);
    }
  });
  it('todos los que hablan o aparecen existen (luchador o vecino)', () => {
    const all = [...whos(PROLOGUE), ...Object.values(CITY_BEATS).flatMap((b) => [...whos(b.arrive ?? []), ...whos(b.after ?? []), ...(b.cast ?? [])])];
    for (const w of all) expect(known.has(w), w).toBe(true);
  });
  it('la gente de la calle tiene frases', () => { expect(CHATTER.length).toBeGreaterThan(15); });
});
