import { describe, expect, it } from 'vitest';
import { fighterById } from '../content/roster';
import { ARENA_INFO } from './arenaInfo';
import { getMove } from './moves';
import { Match, RING_Y } from './Match';
import { emptyInput } from './types';

const idle = () => [emptyInput(), emptyInput()] as [ReturnType<typeof emptyInput>, ReturnType<typeof emptyInput>];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const priv = (m: Match) => m as any;
const run = (m: Match, secs: number, inp = idle) => { for (let t = 0; t < secs; t += 1 / 30) m.update(1 / 30, inp()); };
const evTypes = (m: Match) => { const t = m.events.map((e) => e.type); m.events.length = 0; return t; };

describe('burlas', () => {
  it('dan poco momentum (mucho menos que un golpe fuerte lleno de combo)', () => {
    for (const id of ['burla', 'vacile', 'rugido']) expect(getMove(id).momentum).toBeLessThanOrEqual(12);
  });
});

describe('finisher de Pablo Motos', () => {
  const setup = (hpPct: number) => {
    const m = new Match(fighterById('pablo motos'), fighterById('elso'), () => 0.5);
    const [f, o] = m.f;
    f.x = 0; f.z = 0; f.yaw = Math.PI / 2; o.x = 1.2; o.z = 0; o.hp = o.maxHp * hpPct;
    priv(m).applyHit(f, o, getMove('hora_pablo_motos'));
    return { m, o };
  };

  it('despide al rival si le queda el 15 % de vida o menos', () => {
    const { o } = setup(0.15);
    expect(o.banned).toBe(true);
  });

  it('con más vida solo lo lanza fuera del ring: algo de daño y se puede recuperar', () => {
    const { m, o } = setup(0.6);
    expect(o.banned).toBe(false);
    expect(o.hp).toBeLessThan(o.maxHp * 0.6);
    run(m, 3);
    expect(o.state === 'down' || o.state === 'getup' || o.state === 'idle').toBe(true);
    expect(Math.max(Math.abs(o.x), Math.abs(o.z))).toBeGreaterThan(4); // cayó fuera del ring
    run(m, 6);
    expect(o.state).not.toBe('ko');
    expect(m.over).toBe(false);
  });
});

describe('escenarios', () => {
  it('Tribu: sin ring, suelo plano, sin cuenta fuera y recinto circular', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.tribu.rules);
    m.f[0].x = 6.5; m.f[0].z = 6.5; // fuera del círculo: la explanada lo recoloca
    run(m, 0.5);
    expect(Math.hypot(m.f[0].x, m.f[0].z)).toBeLessThanOrEqual(7.21);
    expect(m.f[0].y).toBeCloseTo(RING_Y, 1);
    expect(m.f[0].inRing).toBe(false);
    m.f[0].x = 6; m.f[0].z = 3;
    run(m, 15);
    expect(m.over).toBe(false); // nadie pierde por cuenta fuera
  });

  it('Tribu: empujar al rival contra el público hace que te ataquen todos', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.tribu.rules);
    const [f, o] = m.f;
    f.x = 5.6; f.z = 0; f.yaw = Math.PI / 2;
    o.x = 6.9; o.z = 0; o.state = 'idle';
    priv(m).applyHit(f, o, getMove('machada')); // el golpe lo empuja hacia el borde
    run(m, 0.5);
    const mobs = m.minions.filter((x) => x.owner === o.idx && x.state !== 'dying');
    expect(mobs.length).toBeGreaterThanOrEqual(6);
    const hp0 = f.hp;
    run(m, 8);
    expect(f.hp).toBeLessThan(hp0);
    expect(f.hp).toBeGreaterThanOrEqual(1);
    expect(o.hp).toBeGreaterThan(0); // la tribu va a por el agresor, no por el otro
  });

  it('Tribu: un golpe dirigido hacia fuera del recinto (al público) también lo provoca', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.tribu.rules);
    const [f, o] = m.f;
    f.x = 6.9; f.z = 0; f.yaw = Math.PI / 2; o.x = 0; o.z = 0; f.state = 'attack'; f.move = getMove('jab'); f.t = 0.12; f.s = 0.1; f.a = 0.07; f.r = 0.17;
    priv(m).checkMob(f, getMove('jab'));
    expect(m.minions.length).toBeGreaterThanOrEqual(6);
  });

  it('Tribu: lanzar al rival contra el público también lo provoca', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.tribu.rules);
    const [f, o] = m.f;
    f.x = 5.0; f.z = 0; o.x = 5.6; o.z = 0;
    priv(m).startThrow(o, f, 9, 0, 0.5, 1, 'throw', 0, true); // el destino se limita al borde del recinto
    run(m, 1);
    expect(m.minions.filter((x) => x.owner === o.idx).length).toBeGreaterThanOrEqual(6);
  });

  it('Tribu: Konguito es de la tribu y no provoca a la tribu', () => {
    const m = new Match(fighterById('kongui'), fighterById('petisui'), () => 0.5, ARENA_INFO.tribu.rules);
    const [f, o] = m.f;
    f.x = 5.6; f.z = 0; f.yaw = Math.PI / 2; o.x = 6.9; o.state = 'idle';
    priv(m).applyHit(f, o, getMove('machada'));
    priv(m).startThrow(o, f, 9, 0, 0.5, 1, 'throw', 0, true);
    run(m, 1);
    expect(m.minions).toHaveLength(0);
  });

  it('Tribu: golpear hacia el centro no provoca a nadie', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.tribu.rules);
    const [f, o] = m.f;
    f.x = 6.4; f.z = 0; f.yaw = -Math.PI / 2; o.x = 5.2; o.state = 'idle';
    priv(m).applyHit(f, o, getMove('machada')); // lo empuja hacia dentro
    run(m, 0.5);
    expect(m.minions).toHaveLength(0);
  });

  it('Garito: el árbitro nunca ve las faltas', () => {
    const m = new Match(fighterById('darksinfacha'), fighterById('petisui'), () => 0.0, ARENA_INFO.garito.rules);
    const [f, o] = m.f;
    f.x = 0; f.z = 0; f.yaw = Math.PI / 2; o.x = 1.2; o.z = 0;
    priv(m).applyHit(f, o, getMove('batazo'));
    const foul = m.events.find((e) => e.type === 'foul');
    expect(foul).toBeTruthy();
    expect((foul as { seen: boolean }).seen).toBe(false);
  });

  it('Garito: sin cuenta fuera', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.garito.rules);
    m.f[0].x = 6; m.f[0].z = 0; m.f[0].exitAllow = 99; m.f[1].x = -3;
    run(m, 14);
    expect(m.over).toBe(false);
  });

  it('en un ring normal, un pin pegado a las cuerdas se rompe solo (rope break)', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5);
    const [a, d] = m.f;
    a.x = 3.3; a.z = 0; d.x = 3.3; d.z = 0.8; d.state = 'down'; d.dur = 99;
    priv(m).startPin(a, d);
    run(m, 1.5);
    expect(d.state).not.toBe('pinD');
    expect(m.over).toBe(false);
  });

  it('en el centro el pin sigue contando', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5);
    const [a, d] = m.f;
    a.x = 0; a.z = 0; d.x = 0; d.z = 0.8; d.state = 'down'; d.dur = 99;
    priv(m).startPin(a, d);
    run(m, 1.5);
    expect(d.state).toBe('pinD');
  });

  it('en el Garito las cuerdas no rompen el pin', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.garito.rules);
    const [a, d] = m.f;
    a.x = 3.3; a.z = 0; d.x = 3.3; d.z = 0.8; d.state = 'down'; d.dur = 99;
    priv(m).startPin(a, d);
    run(m, 1.5);
    expect(d.state).toBe('pinD');
  });
});

describe('adrenalina y combos', () => {
  it('al bajar del 20 % de vida se activa la adrenalina una sola vez', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5);
    m.f[0].hp = m.f[0].maxHp * 0.19;
    run(m, 0.1);
    expect(evTypes(m)).toContain('adrenaline');
    expect(m.f[0].boost).toBeGreaterThan(5);
    m.f[0].boost = 0;
    run(m, 0.5);
    expect(evTypes(m)).not.toContain('adrenaline');
  });

  it('3 golpes seguidos disparan el contador de combo y 5 dan momentum extra', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5);
    const [f, o] = m.f;
    f.x = 0; f.z = 0; o.x = 1.0; o.z = 0;
    const mom0 = f.mom;
    for (let i = 0; i < 5; i++) { o.state = 'idle'; priv(m).applyHit(f, o, getMove('jab')); }
    const combos = m.events.filter((e) => e.type === 'combo') as { n: number }[];
    expect(combos.map((c) => c.n)).toEqual([3, 4, 5]);
    expect(f.mom - mom0).toBeGreaterThan(10);
  });
});

describe('mapas nuevos', () => {
  it('Jaula: no se puede salir del ring y los golpes fuertes contra la reja hacen daño extra', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.jaula.rules);
    const [f, o] = m.f;
    f.x = 1.5; f.z = 0; f.yaw = Math.PI / 2; o.x = 3.4; o.z = 0; o.state = 'idle';
    priv(m).applyHit(f, o, getMove('machada'));
    expect(m.events.some((e) => e.type === 'cage')).toBe(true);
    // ni siquiera Pablo Motos puede sacarlo de la jaula
    const pm = new Match(fighterById('pablo motos'), fighterById('elso'), () => 0.5, ARENA_INFO.jaula.rules);
    pm.f[0].yaw = Math.PI / 2; pm.f[1].x = 1.2; pm.f[1].hp = pm.f[1].maxHp * 0.6;
    priv(pm).applyHit(pm.f[0], pm.f[1], getMove('hora_pablo_motos'));
    run(pm, 4);
    expect(Math.max(Math.abs(pm.f[1].x), Math.abs(pm.f[1].z))).toBeLessThanOrEqual(3.7);
    expect(pm.f[1].banned).toBe(false);
  });

  it('Azotea: sopla el viento y empuja a los dos luchadores', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.azotea.rules);
    const types: string[] = [];
    const x0 = m.f[0].x, z0 = m.f[0].z;
    for (let t = 0; t < 14; t += 1 / 30) { m.update(1 / 30, idle()); for (const e of m.events) types.push(e.type); m.events.length = 0; }
    expect(types).toContain('gust');
    expect(Math.hypot(m.f[0].x - x0, m.f[0].z - z0)).toBeGreaterThan(0.3);
  });

  it('Playa: la arena frena un 10 %', () => {
    const speed = (rules: typeof ARENA_INFO.playa.rules) => {
      const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, rules);
      m.f[0].x = -3; m.f[1].x = 3; m.f[1].z = 3;
      const inp = idle(); inp[0].mx = 0; inp[0].mz = 1;
      for (let t = 0; t < 1; t += 1 / 30) m.update(1 / 30, inp);
      return Math.abs(m.f[0].z);
    };
    expect(speed(ARENA_INFO.playa.rules)).toBeLessThan(speed(ARENA_INFO.matamoros.rules) * 0.97);
  });

  it('los mapas nuevos entran en los torneos según sean profesionales o no', async () => {
    const { ARENA_IDS } = await import('./arenaInfo');
    expect(ARENA_IDS).toEqual(expect.arrayContaining(['jaula', 'azotea', 'playa']));
    expect(ARENA_INFO.jaula.pro).toBe(true);
    expect(ARENA_INFO.azotea.pro).toBe(false);
    expect(ARENA_INFO.playa.pro).toBe(false);
  });
});

describe('entrenamiento y modificadores', () => {
  it('en el entrenamiento nadie gana: el combate se reinicia en vez de terminar', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5);
    m.training = true;
    m.f[0].x = 0; m.f[1].x = 1;
    m.f[1].hp = 1;
    priv(m).applyHit(m.f[0], m.f[1], getMove('machada'));
    run(m, 15);
    expect(m.over).toBe(false);
    expect(m.f[1].hp).toBeGreaterThan(1);
  });

  it('el modificador Relámpago multiplica el daño y Momentum loco el momentum', () => {
    const hit = (mod: { dmg: number; mom: number }) => {
      const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5);
      m.mod = mod; m.f[0].x = 0; m.f[1].x = 1;
      priv(m).applyHit(m.f[0], m.f[1], getMove('jab'));
      return { dmg: m.f[1].maxHp - m.f[1].hp, mom: m.f[0].mom };
    };
    const base = hit({ dmg: 1, mom: 1 }), fast = hit({ dmg: 1.7, mom: 2.2 });
    expect(fast.dmg).toBeCloseTo(base.dmg * 1.7, 3);
    expect(fast.mom).toBeGreaterThan(base.mom * 2);
  });
});

describe('historia: tiempo límite y jefe con fases', () => {
  it('con tiempo límite gana quien tenga más vida (o aguantar, en supervivencia)', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5);
    m.timeLimit = 5; m.f[0].x = -3; m.f[1].x = 3; m.f[1].z = 3; m.f[1].hp = 10;
    run(m, 6);
    expect(m.over).toBe(true); expect(m.reason).toBe('tiempo'); expect(m.winner).toBe(0);
    const s = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5);
    s.timeLimit = 5; s.timeMode = 'player'; s.f[0].hp = 1; s.f[0].x = -3; s.f[1].x = 3; s.f[1].z = 3;
    run(s, 6);
    expect(s.winner).toBe(0);
  });

  it('el jefe se enfurece una sola vez al bajar de su umbral', () => {
    const m = new Match(fighterById('elso'), fighterById('pablo motos'), () => 0.5);
    m.boss = { side: 1, at: 0.5, power: 1.3, speed: 1.1, heal: 0.2, text: '¡Basta!', done: false };
    const p0 = m.f[1].stats.power;
    m.f[1].hp = m.f[1].maxHp * 0.4;
    run(m, 0.2);
    expect(m.f[1].stats.power).toBeCloseTo(p0 * 1.3, 5);
    expect(m.f[1].hp).toBeGreaterThan(m.f[1].maxHp * 0.55);
    const p1 = m.f[1].stats.power;
    m.f[1].hp = m.f[1].maxHp * 0.2;
    run(m, 0.2);
    expect(m.f[1].stats.power).toBe(p1);
  });
});

describe('mapas de la historia', () => {
  it('Oficina: Pablo lanza un maletín al que va perdiendo', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.oficina.rules);
    m.f[0].hp = m.f[0].maxHp * 0.3; m.f[0].x = -3; m.f[1].x = 3; m.f[1].z = 3;
    const hp0 = m.f[0].hp;
    const types: string[] = [];
    for (let t = 0; t < 30; t += 1 / 30) { m.update(1 / 30, idle()); for (const e of m.events) types.push(e.type); m.events.length = 0; }
    expect(types).toContain('bonus');
    expect(m.f[0].hp).toBeGreaterThan(hp0);
  });

  it('Ascensor: el pin se cuenta mucho más rápido (24/7)', () => {
    const countTime = (rules: typeof ARENA_INFO.ascensor.rules) => {
      const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, rules);
      const [a, d] = m.f; a.x = 0; a.z = 0; d.x = 0; d.z = 0.8; d.state = 'down'; d.dur = 99; d.escape = 0;
      priv(m).startPin(a, d);
      let t = 0; while (!m.over && t < 6) { m.update(1 / 30, idle()); t += 1 / 30; }
      return m.over ? t : 99;
    };
    expect(countTime(ARENA_INFO.ascensor.rules)).toBeLessThan(countTime(ARENA_INFO.matamoros.rules) * 0.6);
  });

  it('Santiago: hay apagones que dan más momentum y reducen la velocidad', () => {
    const m = new Match(fighterById('elso'), fighterById('petisui'), () => 0.5, ARENA_INFO.santiago.rules);
    m.f[0].x = -3; m.f[1].x = 3; m.f[1].z = 3;
    const types: string[] = [];
    let wasDark = false;
    for (let t = 0; t < 40; t += 1 / 30) { m.update(1 / 30, idle()); if (m.blackout > 0) wasDark = true; for (const e of m.events) types.push(e.type); m.events.length = 0; }
    expect(wasDark).toBe(true);
    expect(types).toContain('blackout');
  });
});
