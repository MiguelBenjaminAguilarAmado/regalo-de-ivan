import { describe, expect, it } from 'vitest';
import { fighterById } from '../content/roster';
import { applyPerks, isBoss, pickOpponent, pickPerks, PERKS, scaleOpponent, startMomentum, survivalDifficulty } from './Survival';

describe('supervivencia', () => {
  it('la dificultad sube con la racha', () => {
    expect([0, 1, 2, 4, 5, 9].map(survivalDifficulty)).toEqual(['facil', 'facil', 'intermedia', 'intermedia', 'dificil', 'dificil']);
  });

  it('las mejoras se acumulan sobre las estadísticas', () => {
    const base = fighterById('elso').fullStats;
    const s = applyPerks(base, ['punos', 'punos', 'corazon', 'pulmones']);
    expect(s.power).toBeCloseTo(base.power * 1.12 * 1.12, 5);
    expect(s.health).toBe(base.health + 18);
    expect(s.stamina).toBe(base.stamina + 25);
    expect(base.power).toBe(fighterById('elso').fullStats.power); // no muta el original
    expect(startMomentum(['sed', 'sed'])).toBe(70);
  });

  it('ofrece 3 mejoras distintas', () => {
    for (let i = 0; i < 20; i++) { const p = pickPerks(); expect(p).toHaveLength(3); expect(new Set(p.map((x) => x.id)).size).toBe(3); }
    expect(PERKS.length).toBeGreaterThanOrEqual(8);
  });

  it('los rivales no se repiten hasta agotar el reparto', () => {
    const cands = ['a', 'b', 'c'];
    let used: string[] = [];
    const seen: string[] = [];
    for (let i = 0; i < 3; i++) { const p = pickOpponent(cands, used); used = p.used; seen.push(p.id); }
    expect(new Set(seen).size).toBe(3);
    const again = pickOpponent(cands, used);
    expect(cands).toContain(again.id);
    expect(again.used).toHaveLength(1); // reinicia la ronda de rivales
  });

  it('los rivales se refuerzan a partir de la racha 5 y cada 5 hay jefe', () => {
    const f = fighterById('petisui');
    expect(scaleOpponent(f, 0)).toBe(f);
    expect(scaleOpponent(f, 7).fullStats.health).toBeGreaterThan(f.fullStats.health);
    expect(isBoss(4)).toBe(true); expect(isBoss(9)).toBe(true); expect(isBoss(3)).toBe(false);
    expect(scaleOpponent(f, 4).fullStats.health).toBeGreaterThan(f.fullStats.health);
  });
});
