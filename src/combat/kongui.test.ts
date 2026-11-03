import { describe, expect, it } from 'vitest';
import { fighterById } from '../content/roster';
import { Match } from './Match';
import { emptyInput } from './types';

const idle = () => [emptyInput(), emptyInput()] as [ReturnType<typeof emptyInput>, ReturnType<typeof emptyInput>];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const priv = (m: Match) => m as any;
const run = (m: Match, secs: number) => { for (let t = 0; t < secs; t += 1 / 30) m.update(1 / 30, idle()); };
const alive = (m: Match) => m.minions.filter((x) => x.state !== 'dying');

describe('Konguito', () => {
  it('el ritual deja 5 miembros de la tribu y no mata al rival', () => {
    const m = new Match(fighterById('kongui'), fighterById('petisui'), () => 0.5);
    m.f[0].mom = 100;
    priv(m).beginMove(m.f[0], m.f[0].finisher);
    run(m, 4);
    expect(alive(m)).toHaveLength(5);
    expect(m.over).toBe(false);
    expect(m.f[1].hp).toBeGreaterThanOrEqual(1);
  });

  it('la tribu pega al rival pero nunca lo deja a 0 de vida', () => {
    const m = new Match(fighterById('kongui'), fighterById('petisui'), () => 0.5);
    m.f[0].mom = 100;
    priv(m).beginMove(m.f[0], m.f[0].finisher);
    m.f[1].hp = 3;
    run(m, 25);
    expect(m.f[1].hp).toBeGreaterThanOrEqual(1);
    expect(m.over).toBe(false);
  });

  it('se matan fácil: dos golpes ligeros del rival, pero no los de Konguito', () => {
    const m = new Match(fighterById('kongui'), fighterById('petisui'), () => 0.5);
    m.f[0].mom = 100;
    priv(m).beginMove(m.f[0], m.f[0].finisher);
    run(m, 4);
    const mi = m.minions[0];
    m.f[1].x = mi.x; m.f[1].z = mi.z;
    m.f[0].serial = 900; priv(m).hitMinions(m.f[0], 5, 99); // Konguito no daña a su propia tribu
    expect(mi.hp).toBe(5);
    m.f[1].serial = 901; priv(m).hitMinions(m.f[1], 1.3, 4);
    expect(mi.hp).toBe(1);
    m.f[1].serial = 902; priv(m).hitMinions(m.f[1], 1.3, 4);
    expect(mi.state).toBe('dying');
    run(m, 1.5);
    expect(m.minions.find((x) => x.id === mi.id)).toBeUndefined();
  });

  it('repetir el ritual repone la tribu (máx. 5)', () => {
    const m = new Match(fighterById('kongui'), fighterById('petisui'), () => 0.5);
    for (let i = 0; i < 2; i++) { m.f[0].mom = 100; m.f[0].state = 'idle'; priv(m).beginMove(m.f[0], m.f[0].finisher); run(m, 3); }
    expect(alive(m)).toHaveLength(5);
  });

  it('golpe fuerte en una esquina = planchazo; en el centro, no', () => {
    const m = new Match(fighterById('kongui'), fighterById('petisui'), () => 0.5);
    m.f[0].x = 0; m.f[0].z = 0;
    expect(priv(m).pickHeavy(m.f[0]).id).not.toBe('planchazo');
    m.f[0].x = 3.3; m.f[0].z = -3.3;
    expect(priv(m).pickHeavy(m.f[0]).id).toBe('planchazo');
  });

  it('el planchazo aterriza sobre el rival, hace temblar el ring y lo derriba', () => {
    const m = new Match(fighterById('kongui'), fighterById('petisui'), () => 0.5);
    m.f[0].x = 3.3; m.f[0].z = 3.3; m.f[1].x = 3.3; m.f[1].z = 1.3;
    priv(m).beginMove(m.f[0], priv(m).pickHeavy(m.f[0]));
    const evs: string[] = [];
    for (let t = 0; t < 2.5; t += 1 / 30) { m.update(1 / 30, idle()); for (const e of m.events) evs.push(e.type); m.events.length = 0; }
    expect(evs).toContain('quake');
    expect(m.f[1].hp).toBeLessThan(m.f[1].maxHp);
    expect(m.f[0].y).toBeCloseTo(1.0, 1);
  });
});

describe('Dark Sin Facha', () => {
  it('su golpe fuerte puede ser el batazo (y también el golpe bajo)', () => {
    let n = 0;
    const m = new Match(fighterById('darksinfacha'), fighterById('petisui'), () => (n++ % 10) / 10 + 0.01);
    const ids = new Set<string>();
    for (let i = 0; i < 30; i++) ids.add(priv(m).pickHeavy(m.f[0]).id);
    expect(ids.has('batazo')).toBe(true);
    expect(ids.has('golpe_bajo')).toBe(true);
  });
});
