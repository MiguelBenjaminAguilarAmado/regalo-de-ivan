import { describe, expect, it } from 'vitest';
import { fighterById } from '../content/roster';
import { AIController } from '../ai/AIController';
import { Match } from './Match';
import { emptyInput } from './types';
import { createBracket, advance, arenaForRound, opponentOf, teamOf, TOURS } from '../modes/Tournament';
import { ARENA_INFO } from './arenaInfo';

const idle = () => [emptyInput(), emptyInput()] as [ReturnType<typeof emptyInput>, ReturnType<typeof emptyInput>];
const run = (m: Match, secs: number, inp = idle) => { for (let t = 0; t < secs; t += 1 / 30) m.update(1 / 30, inp()); };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const priv = (m: Match) => m as any;
const mk = () => new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, undefined, [fighterById('ansol'), fighterById('kongui')]);

describe('combates por parejas', () => {
  it('el relevo cambia al luchador activo y conserva posición y momentum', () => {
    const m = mk();
    m.f[0].x = 1; m.f[0].z = 2; m.f[0].mom = 60;
    const before = m.f[0];
    const inp = idle(); inp[0].tag = true;
    m.update(1 / 30, inp);
    expect(m.f[0].data.id).toBe('ansol');
    expect(m.bench[0]!.data.id).toBe('elso');
    expect(m.f[0].x).toBeCloseTo(1, 1);
    expect(m.f[0].mom).toBeGreaterThanOrEqual(60);
    expect(m.bench[0]).toBe(before);
  });

  it('no se puede relevar dos veces seguidas ni mientras te golpean', () => {
    const m = mk();
    const inp = idle(); inp[0].tag = true;
    m.update(1 / 30, inp); m.update(1 / 30, inp);
    expect(m.f[0].data.id).toBe('ansol'); // el segundo intento cae dentro del enfriamiento
    run(m, 3);
    m.f[0].state = 'hitstun'; m.f[0].dur = 5;
    m.update(1 / 30, inp);
    expect(m.f[0].data.id).toBe('ansol');
  });

  it('el compañero descansando recupera vida y resistencia', () => {
    const m = mk();
    m.bench[0]!.hp = 10; m.bench[0]!.st = 0;
    run(m, 10);
    expect(m.bench[0]!.hp).toBeGreaterThan(20);
    expect(m.bench[0]!.st).toBeGreaterThan(100);
  });

  it('si el luchador activo cae a 0, entra el compañero y el combate sigue', () => {
    const m = mk();
    m.f[0].hp = 1;
    priv(m).applyHit(m.f[1], m.f[0], { id: 'x', name: 'x', kind: 'strike', startup: 0, active: 0, recovery: 0, damage: 99, range: 9, stamina: 0, hitstun: 0, knockback: 0, momentum: 0, anim: 'jab' });
    expect(m.f[0].data.id).toBe('ansol');
    expect(m.over).toBe(false);
    expect(m.ko).toBeNull();
    expect(m.bench[0]!.hp).toBe(0);
  });

  it('cuando caen los dos del equipo, hay cuenta de KO y pierden', () => {
    const m = mk();
    m.bench[0]!.hp = 0;
    m.f[0].hp = 1;
    priv(m).applyHit(m.f[1], m.f[0], { id: 'x', name: 'x', kind: 'strike', startup: 0, active: 0, recovery: 0, damage: 99, range: 9, stamina: 0, hitstun: 0, knockback: 0, momentum: 0, anim: 'jab' });
    run(m, 6);
    expect(m.over).toBe(true);
    expect(m.winner).toBe(1);
  });

  it('IA vs IA por parejas: terminan y se hacen relevos', () => {
    let tags = 0;
    for (let seed = 1; seed <= 6; seed++) {
      let s = seed;
      const rng = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
      const m = new Match(fighterById('elso'), fighterById('petisui'), rng, undefined, [fighterById('big boom'), fighterById('ansol')]);
      const a = new AIController(0, 'dificil', rng), b = new AIController(1, 'dificil', rng);
      while (!m.over && m.time < 900) { m.update(1 / 30, [a.update(1 / 30, m), b.update(1 / 30, m)]); tags += m.events.filter((e) => e.type === 'tag').length; m.events.length = 0; }
      expect(m.over).toBe(true);
    }
    expect(tags).toBeGreaterThan(0);
  });
});

describe('torneos', () => {
  const ids = ['elso', 'petisui', 'pablo motos', 'pepe the gay dragon', 'ansol', 'big boom', 'darksinfacha', 'kongui', 'perro cheetos', 'big mac'];

  it('Hoyo Champion usa solo mapas profesionales', () => {
    const b = createBracket('elso', ids, Math.random, undefined, { kind: 'champion' });
    expect(b.size).toBe(8);
    for (let r = 0; r < 3; r++) expect(ARENA_INFO[arenaForRound(b, r)].pro).toBe(true);
    expect(arenaForRound(b, 2)).toBe('manchester');
  });

  it('Hoyo Tag Champion: parejas, cuadro de 4 equipos y mapas profesionales', () => {
    const b = createBracket('elso', ids, Math.random, undefined, { kind: 'tag', partnerId: 'kongui' });
    expect(b.size).toBe(4);
    expect(b.playerId).toBe('elso+kongui');
    const all = b.rounds[0].flatMap((p) => [p.a, p.b]);
    expect(all).toContain('elso+kongui');
    const members = all.flatMap(teamOf);
    expect(new Set(members).size).toBe(members.length); // nadie repetido
    expect(teamOf(opponentOf(b))).toHaveLength(2);
    expect(ARENA_INFO[arenaForRound(b, 0)].pro).toBe(true);
    const done = advance(advance(b, true, (x) => x), true, (x) => x);
    expect(done.champion).toBe('elso+kongui');
  });

  it('Hoyo Femboy Champion: solo mapas no profesionales y Elso espera en la final', () => {
    for (let i = 0; i < 30; i++) {
      const b = createBracket('petisui', ids, Math.random, undefined, { kind: 'femboy' });
      expect(b.titleHolder).toBe('elso');
      for (let r = 0; r < 3; r++) expect(ARENA_INFO[arenaForRound(b, r)].pro).toBe(false);
      // Elso no es rival hasta la final
      expect(opponentOf(b)).not.toBe('elso');
      const sim = (x: string, y: string) => (y === 'elso' ? y : x);
      const adv = advance(advance(b, true, sim), true, sim);
      expect(opponentOf(adv)).toBe('elso');
    }
  });

  it('si el jugador es Elso, defiende el título', () => {
    const b = createBracket('elso', ids, Math.random, undefined, { kind: 'femboy' });
    expect(b.rounds[0].flatMap((p) => [p.a, p.b])).toContain('elso');
    expect(TOURS.femboy.titleHolder).toBe('elso');
  });
});

describe('dúos dinámicos', () => {
  it('el dúo se detecta en cualquier orden y se anuncia al empezar', () => {
    const m = new Match(fighterById('pablo motos'), fighterById('petisui'), () => 0.5, undefined, [fighterById('ansol'), fighterById('kongui')]);
    expect(m.duos[0]?.name).toBe('El Jefe y su Mano Derecha');
    expect(m.duos[1]).toBeNull();
    expect(m.events.some((e) => e.type === 'duo')).toBe(true);
    const m2 = new Match(fighterById('ansol'), fighterById('petisui'), () => 0.5, undefined, [fighterById('pablo motos'), null]);
    expect(m2.duos[0]?.name).toBe('El Jefe y su Mano Derecha');
  });

  it('los seis dúos pedidos existen', async () => {
    const { duoOf } = await import('../content/duos');
    for (const [a, b] of [['kongui', 'darksinfacha'], ['petisui', 'big mac'], ['perro cheetos', 'petisui'], ['pablo motos', 'ansol'], ['pablo motos', 'petisui'], ['pablo motos', 'elso']]) expect(duoOf(a, b)).not.toBeNull();
    expect(duoOf('elso', 'petisui')).toBeNull();
  });

  it('las bonificaciones se aplican: stats, momentum y adrenalina al relevar', () => {
    const base = new Match(fighterById('pablo motos'), fighterById('petisui'), () => 0.5, undefined, [fighterById('petisui'), null]);
    const plain = new Match(fighterById('pablo motos'), fighterById('petisui'), () => 0.5, undefined, [fighterById('kongui'), null]);
    expect(base.f[0].stats.power).toBeGreaterThan(plain.f[0].stats.power);
    const m = new Match(fighterById('pablo motos'), fighterById('elso'), () => 0.5, undefined, [fighterById('ansol'), null]);
    m.f[0].mom = 0;
    const inp = idle(); inp[0].tag = true;
    m.update(1 / 30, inp);
    expect(m.f[0].mom).toBeGreaterThanOrEqual(30); // entryMom del dúo
    const kd = new Match(fighterById('kongui'), fighterById('elso'), () => 0.5, undefined, [fighterById('darksinfacha'), null]);
    kd.update(1 / 30, inp);
    expect(kd.f[0].boost).toBeGreaterThan(6);
  });

  it('el cuadro de parejas forma dúos dinámicos con la CPU cuando puede', () => {
    const ids = ['elso', 'petisui', 'pablo motos', 'pepe the gay dragon', 'ansol', 'big boom', 'darksinfacha', 'kongui', 'perro cheetos', 'big mac'];
    let found = 0;
    for (let i = 0; i < 20; i++) {
      const b = createBracket('pepe the gay dragon', ids, Math.random, undefined, { kind: 'tag', partnerId: 'big boom' });
      found += b.rounds[0].flatMap((p) => [p.a, p.b]).filter((t) => ['kongui+darksinfacha', 'darksinfacha+kongui', 'petisui+big mac', 'big mac+petisui'].includes(t) || teamOf(t).length === 2 && [['pablo motos', 'ansol'], ['pablo motos', 'elso'], ['perro cheetos', 'petisui'], ['pablo motos', 'petisui']].some(([x, y]) => teamOf(t).includes(x) && teamOf(t).includes(y))).length;
    }
    expect(found).toBeGreaterThan(10);
  });
});
