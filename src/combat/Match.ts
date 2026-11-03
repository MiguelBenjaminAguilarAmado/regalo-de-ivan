import type { FighterData, GameEvent, Grapple, Input, Move, WinReason } from './types';
import { getGrapple, getMove, MOVES } from './moves';
import { ARENA_INFO, type ArenaRules } from './arenaInfo';
import { duoOf, type Duo } from '../content/duos';

export const RING = 4.0; // medio lado del ring
export const RING_Y = 1.0; // altura de la lona
export const FLOOR_LIM = 7.6; // límite exterior (barricada)
const ROPE_PAD = 0.28;
/** Escala global del daño: ajusta la duración típica de un combate (~1,5-2 min). */
export const DMG_SCALE = 0.38;
const FINISHER_SCALE = 0.85;

export type FState =
  | 'idle' | 'block' | 'attack' | 'hitstun' | 'down' | 'getup'
  | 'clinch' | 'clinched' | 'throwing' | 'thrown'
  | 'subA' | 'subD' | 'pinA' | 'pinD' | 'stunned' | 'ko' | 'win';

type Buffer = 'light' | 'heavy' | 'grab' | null;

export class Fighter {
  idx: number;
  data: FighterData;
  stats: FighterData['fullStats'];
  light: Move[];
  heavy: Move;
  taunt: Move;
  finisher: Move;
  grabMove: Move;
  throwG: Grapple;
  slamG: Grapple;
  subG: Grapple;

  x = 0; z = 0; y = RING_Y; yaw = 0;
  vx = 0; vz = 0; kbx = 0; kbz = 0;
  hp: number; maxHp: number; st: number; maxSt: number; mom = 0;
  state: FState = 'idle';
  t = 0; dur = 0;
  move: Move | null = null;
  hitDone = false; connected = false;
  s = 0; a = 0; r = 0;
  comboIdx = -1; comboTimer = 0;
  blocking = false; blockT = 0;
  grabPressT = 9;
  buffer: Buffer = null; bufferT = 0;
  hitChain = 0; hitChainT = 0; hitFlip = 1;
  escape = 0; subMeter = 0; pinT = 0; by = -1; pinCount = 0;
  outT = 0; outN = 0; exitHold = 0; exitAllow = 0; inRing = true;
  exhausted = false;
  speedNow = 0; running = false;
  thrown: { fx: number; fz: number; tx: number; tz: number; dur: number; arc: number; style: 'throw' | 'slam'; dmg: number; by: number; out: boolean } | null = null;
  pendingDown = 0;
  koed = false;
  banned = false; // expulsado: no puede volver a entrar al ring
  toreo = false; // embestida de Pepe esquivada por Petisui
  superArmor = false;
  /** Planchazo en curso: esquina de salida y punto de aterrizaje (se fija al saltar) */
  dive: { cx: number; cz: number; tx: number; tz: number; launched: boolean } | null = null;
  foulCount = 0;
  serial = 0; // número del movimiento en curso
  /** Adrenalina: segundos restantes de bonus (una vez por combate, al bajar del 20 % de vida) */
  boost = 0; adrenUsed = false;
  /** Cadena de golpes seguidos conectados */
  hits = 0; hitsT = 0;
  // estadísticas
  damageTaken = 0; damageDealt = 0; finishersLanded = 0; taunts = 0; subsApplied = 0;
  // pista visual
  lastGrapple = '';

  constructor(idx: number, data: FighterData) {
    this.idx = idx;
    this.data = data;
    this.stats = data.fullStats;
    const m = data.moves;
    this.light = m.light.map(getMove);
    this.heavy = getMove(m.heavy);
    this.taunt = getMove(m.taunt);
    this.finisher = getMove(m.finisher);
    this.grabMove = MOVES.agarre;
    this.throwG = getGrapple(m.grab.throw);
    this.slamG = getGrapple(m.grab.slam);
    this.subG = getGrapple(m.grab.sub);
    this.maxHp = this.hp = this.stats.health;
    this.maxSt = this.st = this.stats.stamina;
  }

  get hpPct() { return this.hp / this.maxHp; }
  get lying() { return this.state === 'down' || this.state === 'pinD' || this.state === 'ko' || this.state === 'subD'; }
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const smoothstep = (t: number) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const angDiff = (a: number, b: number) => {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
};
const anyPress = (i: Input) => i.light || i.heavy || i.grab || i.taunt || i.finisher;
export const groundY = (x: number, z: number) => (Math.abs(x) <= RING + 0.05 && Math.abs(z) <= RING + 0.05 ? RING_Y : 0);

/** Miembro de la tribu de Konguito (ritual satánico): pelea por su cuenta hasta que lo tumban. Poca vida, poco daño. */
export interface Minion {
  id: number; owner: number;
  x: number; z: number; yaw: number;
  hp: number;
  state: 'wait' | 'run' | 'dying';
  t: number;       // tiempo en el estado actual
  delay: number;   // espera hasta salir por la puerta
  cd: number;      // enfriamiento del siguiente golpe
  swing: number;   // temporizador visual del golpe
  lastHit: number; // último golpe (serie de movimiento) que lo alcanzó, para no recibir el mismo dos veces
}
export const MINION_HP = 5;
export const MOB_SIZE = 6;
export const MAX_MINIONS = 5;

export interface Referee { x: number; z: number; yaw: number; count: number; mode: 'idle' | 'count' }

export interface MatchSummary {
  winner: number; reason: WinReason; time: number; fired: boolean; finisherId: string[];
  damageTaken: number[]; finishersLanded: number[]; taunts: number[]; hpPct: number[]; subs: number[];
}

export class Match {
  f: [Fighter, Fighter];
  time = 0;
  over = false;
  winner = -1;
  reason: WinReason | null = null;
  events: GameEvent[] = [];
  ko: { idx: number; t: number; n: number } | null = null;
  minions: Minion[] = [];
  /** Combates por parejas: el compañero de cada lado que espera fuera (null si no hay) */
  bench: [Fighter | null, Fighter | null] = [null, null];
  private tagCd = [0, 0];
  /** Dúo dinámico de cada lado (si lo forman) */
  duos: [Duo | null, Duo | null] = [null, null];
  private minionSeq = 0;
  private moveSerial = 0;
  ref: Referee = { x: 0, z: -RING + 1, yaw: 0, count: 0, mode: 'idle' };
  endT = 0;
  /** Dirección (en el plano) desde la cámara hacia el ring: el árbitro se coloca detrás de los luchadores para no tapar */
  refAway = { x: 0, z: -1 };
  rng: () => number;
  rules: ArenaRules;
  /** Modificadores de combate (Versus): daño, vida y momentum */
  mod = { dmg: 1, mom: 1 };
  /** Entrenamiento: el combate nunca termina */
  training = false;
  /** Límite de tiempo (s). 'hp': gana quien tenga más vida %; 'player': si aguantas, ganas (supervivencia). */
  timeLimit: number | null = null;
  timeMode: 'hp' | 'player' = 'hp';
  /** Jefe con fases: al bajar de `at` de vida se enfurece (más daño y velocidad, se cura y llena el momentum). */
  boss: { side: number; at: number; power: number; speed: number; heal: number; text: string; done: boolean } | null = null;
  private mobCd = 0;

  constructor(a: FighterData, b: FighterData, rng: () => number = Math.random, rules: ArenaRules = ARENA_INFO.matamoros.rules, partners: [FighterData | null, FighterData | null] = [null, null]) {
    this.rng = rng;
    this.rules = rules;
    this.f = [new Fighter(0, a), new Fighter(1, b)];
    if (partners[0]) this.bench[0] = new Fighter(0, partners[0]);
    if (partners[1]) this.bench[1] = new Fighter(1, partners[1]);
    const sides: [FighterData, FighterData] = [a, b];
    for (let i = 0; i < 2; i++) {
      const d = duoOf(sides[i].id, partners[i]?.id);
      if (!d) continue;
      this.duos[i] = d;
      for (const fi of [this.f[i], this.bench[i]]) if (fi) fi.stats = { ...fi.stats, power: fi.stats.power * (d.bonus.power ?? 1), speed: fi.stats.speed * (d.bonus.speed ?? 1), resist: fi.stats.resist * (d.bonus.resist ?? 1) };
      this.events.push({ type: 'duo', side: i, name: d.name, desc: d.desc });
    }
    this.f[0].x = -1.5; this.f[0].yaw = Math.PI / 2;
    this.f[1].x = 1.5; this.f[1].yaw = -Math.PI / 2;
  }

  private emit(e: GameEvent) { this.events.push(e); }

  summary(): MatchSummary {
    return {
      winner: this.winner, reason: this.reason ?? 'ko', time: this.time,
      fired: this.winner >= 0 && this.f[1 - this.winner].banned, finisherId: this.f.map((f) => f.finisher.id),
      damageTaken: this.f.map((f) => f.damageTaken), finishersLanded: this.f.map((f) => f.finishersLanded),
      taunts: this.f.map((f) => f.taunts), hpPct: this.f.map((f) => f.hpPct), subs: this.f.map((f) => f.subsApplied),
    };
  }

  update(dt: number, inputs: [Input, Input]) {
    this.lastInputs = inputs;
    if (this.over) {
      this.endT += dt;
      for (const f of this.f) { f.t += dt; this.motion(f, dt); }
      this.stepMinions(dt);
      this.updateRef(dt);
      return;
    }
    this.time += dt;
    this.stepBoss();
    if (this.timeLimit != null && this.time >= this.timeLimit) { this.endByTime(); return; }
    if (this.rules.wind) this.stepWind(dt);
    if (this.rules.office) this.stepOffice(dt);
    if (this.rules.blackout) this.stepBlackout(dt);
    this.stepTeams(dt, inputs);
    for (let i = 0; i < 2; i++) this.preUpdate(this.f[i], inputs[i], dt);
    for (let i = 0; i < 2; i++) this.step(i, inputs[i], dt);
    for (let i = 0; i < 2; i++) this.motion(this.f[i], dt);
    this.separate();
    this.stepMinions(dt);
    this.ringRules(dt);
    this.updateKO(dt);
    this.updateRef(dt);
  }

  // ------------------------------------------------------------ utilidades
  /** Altura del suelo: con ring, la lona está elevada; en escenarios sin ring todo es una explanada a la misma altura. */
  gy(x: number, z: number) { return this.rules.ring ? groundY(x, z) : RING_Y; }
  /** Limita un punto al recinto circular del escenario (si lo tiene). */
  private bound(x: number, z: number): [number, number] {
    if (this.rules.cage) { const L = RING - 0.35; return [clamp(x, -L, L), clamp(z, -L, L)]; }
    const R = this.rules.radius;
    if (!R) return [x, z];
    const r = Math.hypot(x, z);
    return r > R ? [(x * R) / r, (z * R) / r] : [x, z];
  }
  private dist(a: Fighter, b: Fighter) { return Math.hypot(b.x - a.x, b.z - a.z); }
  private yawTo(a: Fighter, b: Fighter) { return Math.atan2(b.x - a.x, b.z - a.z); }
  private face(f: Fighter, o: Fighter, dt: number, rate: number) {
    const d = angDiff(this.yawTo(f, o), f.yaw);
    f.yaw += clamp(d, -rate * dt, rate * dt);
  }
  private canAct(f: Fighter) { return f.state === 'idle' || f.state === 'block'; }
  private hittable(f: Fighter) {
    return !['down', 'pinD', 'pinA', 'subA', 'subD', 'clinch', 'clinched', 'thrown', 'throwing', 'ko', 'win'].includes(f.state);
  }

  // ------------------------------------------------------------ pre-update
  private preUpdate(f: Fighter, inp: Input, dt: number) {
    f.comboTimer = Math.max(0, f.comboTimer - dt);
    f.hitsT = Math.max(0, f.hitsT - dt); if (f.hitsT <= 0) f.hits = 0;
    f.boost = Math.max(0, f.boost - dt);
    // adrenalina: la primera vez que bajas del 20 % de vida, unos segundos de más pegada y velocidad
    if (!f.adrenUsed && !f.koed && f.hpPct <= 0.2) {
      f.adrenUsed = true; f.boost = 10; f.st = Math.min(f.maxSt, f.st + 40);
      this.emit({ type: 'adrenaline', fighter: f.idx });
    }
    f.hitChainT = Math.max(0, f.hitChainT - dt);
    f.bufferT = Math.max(0, f.bufferT - dt);
    if (f.bufferT <= 0) f.buffer = null;
    f.grabPressT += dt;
    f.exitAllow = Math.max(0, f.exitAllow - dt);
    if (inp.grab) f.grabPressT = 0;
    if (inp.light) { f.buffer = 'light'; f.bufferT = 0.22; }
    if (inp.heavy) { f.buffer = 'heavy'; f.bufferT = 0.22; }
    if (inp.grab) { f.buffer = 'grab'; f.bufferT = 0.22; }

    // resistencia
    let reg = 0;
    if (f.state === 'idle') reg = f.running ? -9 : f.speedNow > 0.5 ? 11 : 17;
    else if (f.state === 'block') reg = 5;
    else if (['down', 'pinD', 'subD', 'getup', 'stunned', 'hitstun'].includes(f.state)) reg = 8;
    f.st = clamp(f.st + reg * dt * (f.stats.stamina / 100) ** 0.5, 0, f.maxSt);
    if (f.st <= 0 && !f.exhausted) { f.exhausted = true; this.emit({ type: 'exhausted', fighter: f.idx }); }
    if (f.exhausted && f.st >= f.maxSt * 0.25) f.exhausted = false;
  }

  // ------------------------------------------------------------ máquina de estados
  private step(i: number, inp: Input, dt: number) {
    const f = this.f[i], o = this.f[1 - i];
    f.t += dt;
    switch (f.state) {
      case 'idle':
      case 'block': this.stepFree(f, o, inp, dt); break;
      case 'attack': this.stepAttack(f, o, inp, dt); break;
      case 'hitstun': if (f.t >= f.dur) { f.state = 'idle'; f.superArmor = false; } break;
      case 'stunned': if (f.t >= f.dur) f.state = 'idle'; break;
      case 'down': this.stepDown(f, inp); break;
      case 'getup': if (f.t >= f.dur) f.state = 'idle'; break;
      case 'clinch': this.stepClinch(f, o, inp); break;
      case 'clinched': this.stickTo(f, o); break;
      case 'throwing': if (f.t >= f.dur) f.state = 'idle'; break;
      case 'thrown': this.stepThrown(f); break;
      case 'subD': this.stepSub(f, o, inp, dt); break;
      case 'subA': if (inp.block && f.t > 0.4) this.releaseHold(f, o); break;
      case 'pinD': this.stepPin(f, o, inp, dt); break;
      case 'pinA': this.approachPin(f, o, dt); if (inp.block && f.t > 0.5) this.releaseHold(f, o); break;
      default: break;
    }
  }

  private stepFree(f: Fighter, o: Fighter, inp: Input, dt: number) {
    this.face(f, o, dt, 14);

    // guardia
    const wantBlock = inp.block && f.st > 0 && !f.exhausted;
    if (wantBlock && !f.blocking) { f.blocking = true; f.blockT = 0; f.state = 'block'; }
    if (!wantBlock && f.blocking) { f.blocking = false; f.state = 'idle'; }
    if (f.blocking) f.blockT += dt;

    // acciones
    if (this.tryActions(f, o, inp)) return;

    // movimiento
    let mx = inp.mx, mz = inp.mz;
    const len = Math.hypot(mx, mz);
    if (len > 1) { mx /= len; mz /= len; }
    const moving = len > 0.15;
    f.running = moving && inp.run && !f.blocking && f.st > 6 && !f.exhausted;
    const terrain = (this.rules.slow ?? 1) * (this.blackout > 0 ? 0.85 : 1);
    let sp = 3.0 * f.stats.speed * (f.boost > 0 ? 1.12 : 1) * terrain;
    if (f.running) sp = 5.4 * f.stats.speed * (f.boost > 0 ? 1.12 : 1) * terrain;
    if (f.blocking) sp *= f.data.traits?.rootedGuard ? 0 : 0.42;
    if (f.exhausted) sp *= 0.7;
    const tvx = moving ? mx * sp : 0, tvz = moving ? mz * sp : 0;
    const k = 1 - Math.exp(-16 * dt);
    f.vx += (tvx - f.vx) * k;
    f.vz += (tvz - f.vz) * k;
    f.speedNow = Math.hypot(f.vx, f.vz);

    // salir del ring por las cuerdas: correr contra ellas
    if (f.inRing && moving && inp.run && !this.rules.cage) {
      const ox = Math.abs(f.x) > RING - 0.55 && Math.sign(mx) === Math.sign(f.x) && Math.abs(mx) > 0.4;
      const oz = Math.abs(f.z) > RING - 0.55 && Math.sign(mz) === Math.sign(f.z) && Math.abs(mz) > 0.4;
      if (ox || oz) f.exitHold += dt; else f.exitHold = Math.max(0, f.exitHold - dt * 2);
      if (f.exitHold > 0.4) { f.exitAllow = 0.9; f.exitHold = 0; this.emit({ type: 'msg', text: f.data.name + ' sale del ring' }); }
    } else f.exitHold = Math.max(0, f.exitHold - dt * 2);
  }

  /** Procesa buffer de acciones. Devuelve true si se inició una acción. */
  private tryActions(f: Fighter, o: Fighter, inp: Input): boolean {
    if (inp.finisher) {
      if (f.mom >= 100) { this.beginMove(f, f.finisher); f.buffer = null; return true; }
      this.emit({ type: 'msg', text: 'Aún no tienes el finisher. ¡Consigue momentum!' });
    }
    if (inp.taunt) { this.beginMove(f, f.taunt); f.buffer = null; return true; }
    if (f.buffer === 'grab') {
      f.buffer = null;
      if (o.state === 'down' && !this.ko && this.dist(f, o) < 1.9 && f.state !== 'attack') { this.startPin(f, o); return true; }
      this.beginMove(f, f.grabMove); return true;
    }
    if (f.buffer === 'heavy') { f.buffer = null; this.beginMove(f, this.pickHeavy(f)); return true; }
    if (f.buffer === 'light') { f.buffer = null; this.beginLight(f); return true; }
    return false;
  }

  private inCorner(f: Fighter) { return f.inRing && Math.abs(f.x) > RING - 1.0 && Math.abs(f.z) > RING - 1.0; }

  /** Golpe fuerte: si el luchador tiene lista aleatoria (Pablo Motos), elige uno según su rareza. */
  private pickHeavy(f: Fighter): Move {
    if (f.data.traits?.cornerDive && this.inCorner(f) && f.st >= 20) {
      const m = getMove('planchazo');
      this.emit({ type: 'msg', text: m.announce!, big: true });
      return m;
    }
    const pool = f.data.moves.heavyRandom;
    if (!pool?.length) return f.heavy;
    const total = pool.reduce((a, [, w]) => a + w, 0);
    let x = this.rng() * total;
    for (const [id, w] of pool) {
      x -= w;
      if (x < 0) {
        const m = getMove(id);
        if (m.announce) this.emit({ type: 'msg', text: m.announce, big: true });
        this.emit({ type: 'heavyPick', fighter: f.idx, move: m });
        return m;
      }
    }
    return f.heavy;
  }

  private beginLight(f: Fighter) {
    f.comboIdx = f.comboTimer > 0 ? (f.comboIdx + 1) % f.light.length : 0;
    f.comboTimer = 0.85;
    this.beginMove(f, f.light[f.comboIdx]);
  }

  private beginMove(f: Fighter, m: Move) {
    f.state = 'attack';
    f.blocking = false;
    f.move = m;
    f.t = 0;
    f.hitDone = false;
    f.connected = false;
    const k = m.kind === 'finisher' ? 1 : f.stats.tempo * (f.exhausted ? 0.8 : 1);
    f.s = m.startup / k; f.a = m.active / k; f.r = m.recovery / k;
    f.st = Math.max(0, f.st - m.stamina);
    f.superArmor = m.kind === 'finisher';
    f.toreo = false;
    f.dive = m.id === 'planchazo' ? { cx: (f.x < 0 ? -1 : 1) * (RING - 0.4), cz: (f.z < 0 ? -1 : 1) * (RING - 0.4), tx: 0, tz: 0, launched: false } : null;
    this.moveSerial++;
    f.serial = this.moveSerial;
    if (m.summon === 'tribu') this.spawnTribe(f, m);
    else if (m.summon) this.emit({ type: 'summon', kind: m.summon, fighter: f.idx, target: 1 - f.idx, dur: f.s });
    if (m.kind === 'finisher') { f.mom = 0; this.emit({ type: 'finisherStart', fighter: f.idx, move: m }); }
  }

  private stepAttack(f: Fighter, o: Fighter, inp: Input, dt: number) {
    const m = f.move!;
    f.vx *= 0.8; f.vz *= 0.8;
    f.speedNow = 0;
    if (f.t < f.s) this.face(f, o, dt, m.kind === 'finisher' ? 3 : 7);
    if (f.dive && this.stepDive(f, o, m, dt)) return;
    if (m.lunge && f.t < f.s + f.a) {
      const sp = m.lunge * (m.kind === 'finisher' ? 1 : 1);
      f.x += Math.sin(f.yaw) * sp * dt * (f.t > f.s * 0.35 ? 1 : 0.2);
      f.z += Math.cos(f.yaw) * sp * dt * (f.t > f.s * 0.35 ? 1 : 0.2);
      // no atravesar al rival
      if (this.dist(f, o) < 0.8 && this.hittable(o)) {
        const d = this.dist(f, o) || 1;
        f.x = o.x - ((o.x - f.x) / d) * 0.8; f.z = o.z - ((o.z - f.z) / d) * 0.8;
      }
    }
    // embestida: corre en línea recta durante la ventana activa hasta chocar
    if (m.rush && f.t >= f.s && f.t < f.s + f.a && !f.hitDone) {
      f.x += Math.sin(f.yaw) * m.rush * dt;
      f.z += Math.cos(f.yaw) * m.rush * dt;
      f.inRing = f.inRing && Math.abs(f.x) < RING - 0.3 && Math.abs(f.z) < RING - 0.3;
      // Petisui le torea: se aparta y la embestida pasa de largo
      if (m.id === 'embestida_unicornio' && !f.toreo && o.data.id === 'petisui' && this.hittable(o) && this.dist(f, o) < 3.4) {
        f.toreo = true;
        const sx = Math.cos(f.yaw), sz = -Math.sin(f.yaw);
        const side = (o.x - f.x) * sx + (o.z - f.z) * sz >= 0 ? 1 : -1;
        o.kbx += sx * side * 7; o.kbz += sz * side * 7;
        o.blocking = false; o.move = null;
        this.beginMove(o, getMove('vacile'));
        o.yaw = f.yaw + Math.PI;
        this.emit({ type: 'toreo', fighter: f.idx, target: o.idx });
        this.emit({ type: 'msg', text: '¡Petisui le torea! ¡OLÉ!', big: true });
        return;
      }
    }
    if (this.rules.mob) this.checkMob(f, m);
    // los golpes también alcanzan a la tribu rival
    if (f.t >= f.s && f.t <= f.s + f.a + 0.03 && (m.kind === 'strike' || m.kind === 'finisher') && !f.dive) this.hitMinions(f, m.range * 1.05, m.damage);
    // ventana activa
    if (!f.hitDone && f.t >= f.s && f.t <= f.s + f.a + 0.03 && !f.toreo && !f.dive) {
      if (f.t - dt < f.s && m.kind !== 'taunt') this.emit({ type: 'whoosh', fighter: f.idx });
      this.resolve(f, o, m);
    }
    // el recorte de finisher fallido
    if (m.kind === 'finisher' && !f.hitDone && f.t > f.s + f.a + 0.03) {
      f.hitDone = true;
      if (f.toreo && m.id === 'embestida_unicornio') {
        // tras pasar de largo, Pepe frena, se gira y le deja KO de un solo golpe
        const dx = f.x - o.x, dz = f.z - o.z, d = Math.hypot(dx, dz) || 1;
        f.x = o.x + (dx / d) * 1.5; f.z = o.z + (dz / d) * 1.5;
        f.x = clamp(f.x, -FLOOR_LIM, FLOOR_LIM); f.z = clamp(f.z, -FLOOR_LIM, FLOOR_LIM);
        f.yaw = this.yawTo(f, o);
        f.vx = f.vz = 0;
        this.emit({ type: 'msg', text: 'Pepe se gira… ¡UN SOLO GOLPE!', big: true });
        this.beginMove(f, getMove('golpe_unico'));
        return;
      }
      f.mom = 40;
      this.emit({ type: 'finisherMiss', fighter: f.idx });
    }
    const total = f.s + f.a + f.r;
    // cancelar en el siguiente golpe si conectó
    if (f.t >= f.s + f.a && f.connected && f.buffer && m.kind === 'strike') {
      const b = f.buffer;
      f.buffer = null;
      if (b === 'light') { this.beginLight(f); return; }
      if (b === 'heavy') { this.beginMove(f, this.pickHeavy(f)); return; }
      if (b === 'grab') { this.beginMove(f, f.grabMove); return; }
    }
    if (inp.block && f.t >= f.s + f.a + f.r * 0.6 && m.kind !== 'finisher') { f.state = 'idle'; f.move = null; return; }
    if (f.t >= total) { f.state = 'idle'; f.move = null; f.superArmor = false; }
  }

  /** Planchazo desde el poste: trepa durante el arranque, fija el blanco al saltar (se puede esquivar) y aterroriza el ring.
   *  Devuelve true mientras controla el movimiento (el resto de stepAttack se salta). */
  private stepDive(f: Fighter, o: Fighter, m: Move, dt: number): boolean {
    const d = f.dive!;
    const end = f.s + f.a;
    if (f.t < f.s) {
      // sube al poste: se coloca en la esquina y trepa
      const k = 1 - Math.exp(-9 * dt);
      f.x += (d.cx - f.x) * k; f.z += (d.cz - f.z) * k;
      f.y = RING_Y + 1.25 * smoothstep((f.t - 0.15) / Math.max(0.2, f.s - 0.35));
      return true;
    }
    if (f.t < end) {
      if (!d.launched) { d.launched = true; d.tx = o.x; d.tz = o.z; this.emit({ type: 'whoosh', fighter: f.idx }); }
      const u = clamp((f.t - f.s) / f.a, 0, 1);
      f.x = d.cx + (d.tx - d.cx) * u; f.z = d.cz + (d.tz - d.cz) * u;
      f.y = RING_Y + 1.25 * (1 - u) + 0.7 * Math.sin(Math.PI * u) * (1 - u);
      f.yaw = Math.atan2(d.tx - d.cx, d.tz - d.cz);
      return true;
    }
    if (!f.hitDone) {
      // aterriza: tiembla el suelo
      f.hitDone = true;
      f.y = RING_Y;
      f.x = d.tx; f.z = d.tz;
      const dist = this.dist(f, o);
      const direct = dist < m.range && this.hittable(o);
      this.emit({ type: 'quake', fighter: f.idx, x: f.x, z: f.z, direct });
      this.hitMinions(f, 2.4, 99);
      if (direct) {
        f.connected = true;
        this.applyHit(f, o, m);
      } else if (dist < 2.6 && this.hittable(o) && !o.superArmor) {
        // el temblor lo desequilibra aunque no le dé de lleno
        o.state = 'stunned'; o.t = 0; o.dur = 0.7; o.move = null; o.blocking = false;
      }
    }
    return false;
  }

  // ------------------------------------------------------------ resolución de golpes
  private resolve(f: Fighter, o: Fighter, m: Move) {
    if (m.kind === 'taunt') {
      f.hitDone = true;
      f.mom = Math.min(100, f.mom + m.momentum);
      f.taunts++;
      this.emit({ type: 'taunt', fighter: f.idx });
      if (f.mom >= 100) this.emit({ type: 'ready', fighter: f.idx });
      return;
    }
    const d = this.dist(f, o);
    const ang = Math.abs(angDiff(this.yawTo(f, o), f.yaw));
    const inCone = d < 0.55 || ang < (m.kind === 'finisher' ? 1.2 : 1.0);
    if (d > m.range || !inCone) return; // fallo (se reintenta mientras dure la ventana)

    if (m.kind === 'grab') {
      if (!['idle', 'block', 'attack', 'hitstun', 'stunned', 'getup'].includes(o.state)) return;
      if (o.state === 'attack' && o.move?.kind === 'finisher') return;
      f.hitDone = true; f.connected = true;
      if (o.grabPressT < 0.3 && (o.state === 'idle' || o.state === 'block')) {
        this.emit({ type: 'reversal', fighter: o.idx });
        this.emit({ type: 'msg', text: '¡' + o.data.name + ' revierte el agarre!', big: true });
        this.beginClinch(o, f);
      } else this.beginClinch(f, o);
      return;
    }

    if (!this.hittable(o)) return;

    // bloqueo
    const facing = Math.abs(angDiff(this.yawTo(o, f), o.yaw)) < 1.3;
    if (o.blocking && o.state === 'block' && facing) {
      const perfect = o.blockT <= 0.22;
      const mx = (f.x + o.x) / 2, mz = (f.z + o.z) / 2;
      if (perfect) {
        f.hitDone = true; f.connected = false;
        this.emit({ type: 'block', target: o.idx, x: mx, y: o.y + 1.3, z: mz, perfect: true });
        this.emit({ type: 'msg', text: '¡Contraataque de ' + o.data.name + '!' });
        f.state = 'stunned'; f.t = 0; f.dur = m.kind === 'finisher' ? 1.4 : 0.85; f.move = null; f.superArmor = false;
        if (m.kind === 'finisher') f.mom = 0;
        o.mom = Math.min(100, o.mom + 14);
        o.st = Math.min(o.maxSt, o.st + 10);
        return;
      }
      if (m.kind !== 'finisher') {
        f.hitDone = true; f.connected = true;
        const rooted = !!o.data.traits?.rootedGuard; // la guardia inmóvil de Pepe aguanta mucho mejor
        const chip = m.damage * DMG_SCALE * 0.15 * f.stats.power * (rooted ? 0.4 : 1);
        o.hp = Math.max(1, o.hp - chip);
        o.st = Math.max(0, o.st - m.damage * 1.3 * (rooted ? 0.6 : 1));
        const dx = o.x - f.x, dz = o.z - f.z, dd = Math.hypot(dx, dz) || 1;
        o.kbx += (dx / dd) * 2.2; o.kbz += (dz / dd) * 2.2;
        this.emit({ type: 'block', target: o.idx, x: mx, y: o.y + 1.3, z: mz, perfect: false });
        if (o.st <= 0) {
          o.state = 'stunned'; o.t = 0; o.dur = 1.0; o.blocking = false;
          this.emit({ type: 'msg', text: '¡Guardia rota!' });
        }
        return;
      }
    }

    f.hitDone = true; f.connected = true;
    this.applyHit(f, o, m);
  }

  private applyHit(f: Fighter, o: Fighter, m: Move) {
    const dx = o.x - f.x, dz = o.z - f.z, dd = Math.hypot(dx, dz) || 1;
    const nx = dx / dd, nz = dz / dd;
    const lowHp = o.hp / o.maxHp <= 0.15; // para el finisher de Pablo Motos
    let dmg = m.damage * (m.kind === 'finisher' ? FINISHER_SCALE : DMG_SCALE) * f.stats.power * (f.exhausted ? 0.75 : 1) * (f.boost > 0 ? 1.2 : 1) * o.stats.resist * this.mod.dmg;
    if (o.state === 'attack' && o.t < o.s && o.move?.kind !== 'finisher') dmg *= 1.2; // golpe al contraataque
    if (m.foul) {
      dmg *= 1.2;
      f.foulCount++;
      const seen = this.rules.refSees && this.rng() < 0.45;
      this.emit({ type: 'foul', fighter: f.idx, seen });
      if (seen) f.mom = Math.max(0, f.mom - 12);
    }
    // el ritual satánico no mata: te deja al borde, pero la tribu no te remata
    o.hp = Math.max(m.id === 'ritual_satanico' ? 1 : 0, o.hp - dmg);
    o.damageTaken += dmg; f.damageDealt += dmg;
    const wasReady = f.mom >= 100;
    const momMul = this.mod.mom * (this.blackout > 0 ? 1.5 : 1);
    f.mom = Math.min(100, f.mom + m.momentum * momMul);
    o.mom = Math.min(100, o.mom + dmg * 0.35 * momMul);
    if (!wasReady && f.mom >= 100) this.emit({ type: 'ready', fighter: f.idx });
    if (o.mom >= 100 && o.mom - dmg * 0.35 < 100) this.emit({ type: 'ready', fighter: o.idx });

    // jaula de acero: un golpe fuerte que lo estampa contra la reja hace daño extra
    if (this.rules.cage && m.knockback >= 0.8 && m.kind !== 'taunt') {
      const edge = Math.max(Math.abs(o.x), Math.abs(o.z));
      const out = Math.abs(o.x) > Math.abs(o.z) ? nx * Math.sign(o.x) : nz * Math.sign(o.z);
      if (edge > RING - 0.75 && out > 0.25) {
        const extra = 3.2 * o.stats.resist;
        o.hp = Math.max(1, o.hp - extra); o.damageTaken += extra; f.damageDealt += extra;
        this.emit({ type: 'cage', x: o.x, z: o.z });
      }
    }
    // empujar al rival contra el público: la tribu se enfada con quien pega
    if (this.rules.mob && m.knockback > 0) {
      const R = this.rules.radius ?? 7, r = Math.hypot(o.x, o.z);
      if (r > R - 0.8 && (nx * o.x + nz * o.z) / (r || 1) > 0.4) this.spawnMob(f);
    }
    const mid = { x: (f.x + o.x) / 2, y: o.y + 1.35, z: (f.z + o.z) / 2 };
    const isFin = m.kind === 'finisher';

    if (o.hitChainT > 0 && o.state === 'hitstun') o.hitChain++; else o.hitChain = 1;
    o.hitChainT = 0.9;
    let knockdown = !!m.knockdown;
    if (o.hitChain >= 4) { knockdown = true; o.hitChain = 0; }

    if (isFin) {
      f.finishersLanded++;
      this.emit({ type: 'finisherHit', fighter: f.idx, target: o.idx, move: m });
    } else {
      this.emit({ type: 'hit', target: o.idx, attacker: f.idx, heavy: m.damage >= 10, x: mid.x, y: mid.y, z: mid.z, dmg });
    }

    // combo: golpes seguidos del mismo luchador
    f.hits = f.hitsT > 0 ? f.hits + 1 : 1; f.hitsT = 1.4;
    if (f.hits >= 3) this.emit({ type: 'combo', fighter: f.idx, n: f.hits });
    if (f.hits === 5) f.mom = Math.min(100, f.mom + 10); // premio por un combo de 5

    if (m.id === 'hora_pablo_motos') { if (lowHp && !this.benchAlive(o.idx)) this.fire(f, o); else this.throwOut(f, o); return; }

    // el rival tiene super armadura (está ejecutando su finisher)
    if (o.superArmor && !isFin) return;

    if (o.hp <= 0) { this.downed(o, f, m, nx, nz); return; }
    if (knockdown) { this.knockDown(o, f, m, nx, nz, false); return; }
    o.state = 'hitstun'; o.t = 0; o.dur = m.hitstun; o.move = null; o.blocking = false;
    o.hitFlip = -o.hitFlip;
    o.kbx += nx * m.knockback * 5.5; o.kbz += nz * m.knockback * 5.5;
  }

  /** "La hora de Pablo Motos": expulsa al rival de la empresa; no puede volver al ring. */
  private fire(f: Fighter, o: Fighter) {
    o.banned = true; o.move = null; o.blocking = false; o.superArmor = false;
    let dx = o.x, dz = o.z;
    const l = Math.hypot(dx, dz);
    if (l < 0.8) { dx = Math.sin(f.yaw); dz = Math.cos(f.yaw); } else { dx /= l; dz /= l; }
    // salir por el lado más cercano a la dirección elegida
    const k = (RING + 2.6) / Math.max(Math.abs(dx), Math.abs(dz));
    const tx = clamp(dx * k, -FLOOR_LIM, FLOOR_LIM), tz = clamp(dz * k, -FLOOR_LIM, FLOOR_LIM);
    this.startThrow(o, f, tx, tz, 1.15, 2.6, 'throw', 0, true);
    this.emit({ type: 'msg', text: '¡' + o.data.name + ' ha sido DESPEDIDO!', big: true });
  }

  /** La hora de Pablo Motos con el rival aún entero: lo lanza fuera del ring, le hace algo de daño, pero se recupera. */
  private throwOut(f: Fighter, o: Fighter) {
    o.hp = Math.max(1, o.hp);
    o.move = null; o.blocking = false; o.superArmor = false;
    let dx = o.x, dz = o.z;
    const l = Math.hypot(dx, dz);
    if (l < 0.8) { dx = Math.sin(f.yaw); dz = Math.cos(f.yaw); } else { dx /= l; dz /= l; }
    const k = (RING + 2.6) / Math.max(Math.abs(dx), Math.abs(dz));
    const tx = clamp(dx * k, -FLOOR_LIM, FLOOR_LIM), tz = clamp(dz * k, -FLOOR_LIM, FLOOR_LIM);
    this.startThrow(o, f, tx, tz, 1.0, 2.2, 'throw', 3 * o.stats.resist, true);
    this.emit({ type: 'msg', text: '¡' + o.data.name + ' sale despedido por los aires!', big: true });
  }

  private knockDown(o: Fighter, f: Fighter, m: Move, nx: number, nz: number, ko: boolean) {
    o.move = null; o.blocking = false; o.hitChain = 0;
    const isFin = m.kind === 'finisher';
    // salir volando del ring
    if (m.sendOut && o.inRing && !ko && !this.rules.cage) {
      const edgeX = nx > 0.2 ? RING - o.x : nx < -0.2 ? RING + o.x : 99;
      const edgeZ = nz > 0.2 ? RING - o.z : nz < -0.2 ? RING + o.z : 99;
      const toEdge = Math.min(Math.abs(nx) > 0.2 ? edgeX / Math.abs(nx) : 99, Math.abs(nz) > 0.2 ? edgeZ / Math.abs(nz) : 99);
      if (toEdge < 2.3) {
        const run = toEdge + 1.5;
        this.startThrow(o, f, o.x + nx * run, o.z + nz * run, 0.75, 1.1, 'throw', 0, true);
        this.emit({ type: 'msg', text: '¡' + o.data.name + ' sale despedido del ring!', big: true });
        return;
      }
    }
    o.state = 'down'; o.t = 0;
    const base = 1.7 + 1.5 * (1 - o.hpPct);
    o.dur = (base + (isFin ? 1.1 : 0)) * o.stats.recover;
    o.kbx += nx * m.knockback * 4; o.kbz += nz * m.knockback * 4;
    this.emit({ type: 'knockdown', target: o.idx });
  }

  private startKO(o: Fighter, f: Fighter) {
    if (this.ko) return;
    o.koed = true;
    o.state = 'down'; o.t = 0; o.dur = 9999;
    this.ko = { idx: o.idx, t: 0, n: 0 };
    this.emit({ type: 'msg', text: '¡' + o.data.name + ' está KO!', big: true });
    // cancelar cualquier agarre/pin previo
    f.buffer = null;
  }

  private stepDown(f: Fighter, inp: Input) {
    if (f.koed) return;
    if (anyPress(inp)) f.t += 0.11;
    if (f.t >= f.dur) { f.state = 'getup'; f.t = 0; f.dur = 0.55; }
  }

  // ------------------------------------------------------------ agarres
  private beginClinch(a: Fighter, d: Fighter) {
    a.state = 'clinch'; a.t = 0; a.dur = 1.5; a.move = null; a.blocking = false; a.superArmor = false;
    d.state = 'clinched'; d.t = 0; d.move = null; d.blocking = false; d.superArmor = false;
    a.vx = a.vz = d.vx = d.vz = 0;
    a.yaw = this.yawTo(a, d);
    d.yaw = a.yaw + Math.PI;
    this.stickTo(d, a);
    this.emit({ type: 'grab', attacker: a.idx, target: d.idx });
  }

  private stickTo(d: Fighter, a: Fighter) {
    d.x = a.x + Math.sin(a.yaw) * 0.78;
    d.z = a.z + Math.cos(a.yaw) * 0.78;
    d.yaw = a.yaw + Math.PI;
  }

  private stepClinch(a: Fighter, d: Fighter, inp: Input) {
    if (d.state !== 'clinched') { a.state = 'idle'; return; }
    let choice: 'throw' | 'slam' | 'sub' | null = null;
    if (a.t > 0.18) {
      if (inp.light) choice = 'throw';
      else if (inp.heavy) choice = 'slam';
      else if (inp.grab && a.t > 0.3) choice = 'sub';
    }
    if (!choice && a.t >= a.dur) choice = 'throw';
    if (!choice) return;
    if (choice === 'sub') { this.startSub(a, d); return; }
    const g = choice === 'throw' ? a.throwG : a.slamG;
    a.lastGrapple = g.name;
    this.emit({ type: 'grappleMove', attacker: a.idx, target: d.idx, name: g.name, style: g.style });
    const bounds = a.inRing ? RING - 0.55 : FLOOR_LIM;
    let tx: number, tz: number;
    if (g.style === 'throw') { tx = a.x - Math.sin(a.yaw) * 1.5; tz = a.z - Math.cos(a.yaw) * 1.5; }
    else { tx = a.x + Math.sin(a.yaw) * 1.0; tz = a.z + Math.cos(a.yaw) * 1.0; }
    tx = clamp(tx, -bounds, bounds); tz = clamp(tz, -bounds, bounds);
    a.state = 'throwing'; a.t = 0; a.dur = g.style === 'throw' ? 0.85 : 0.95;
    this.startThrow(d, a, tx, tz, g.style === 'throw' ? 0.7 : 0.85, g.style === 'throw' ? 1.2 : 1.9, g.style, g.damage * DMG_SCALE * a.stats.power * d.stats.resist * this.mod.dmg, false);
  }

  private startThrow(d: Fighter, by: Fighter, tx: number, tz: number, dur: number, arc: number, style: 'throw' | 'slam', dmg: number, out: boolean) {
    [tx, tz] = this.bound(tx, tz);
    d.state = 'thrown'; d.t = 0; d.move = null; d.blocking = false;
    d.thrown = { fx: d.x, fz: d.z, tx, tz, dur, arc, style, dmg, by: by.idx, out };
    d.kbx = d.kbz = 0;
  }

  private stepThrown(d: Fighter) {
    const th = d.thrown;
    if (!th) { d.state = 'down'; d.t = 0; d.dur = 1.5; return; }
    const s = clamp(d.t / th.dur, 0, 1);
    const e = th.style === 'slam' ? s : 1 - (1 - s) * (1 - s);
    d.x = th.fx + (th.tx - th.fx) * e;
    d.z = th.fz + (th.tz - th.fz) * e;
    const y0 = this.gy(th.fx, th.fz), y1 = this.gy(th.tx, th.tz);
    d.y = y0 + (y1 - y0) * s + th.arc * 4 * s * (1 - s);
    if (s >= 1) {
      d.thrown = null;
      d.y = y1;
      const a = this.f[th.by];
      if (th.dmg > 0) {
        d.hp = Math.max(0, d.hp - th.dmg);
        d.damageTaken += th.dmg; a.damageDealt += th.dmg;
        a.mom = Math.min(100, a.mom + 14);
        d.mom = Math.min(100, d.mom + th.dmg * 0.4);
        if (a.mom >= 100) this.emit({ type: 'ready', fighter: a.idx });
      }
      if (this.rules.mob && Math.hypot(d.x, d.z) > (this.rules.radius ?? 7) - 0.5) this.spawnMob(a); // lo lanzaste contra la tribu
      this.emit({ type: 'land', target: d.idx, big: th.style === 'slam' || th.out });
      d.state = 'down'; d.t = 0;
      d.dur = (1.8 + 1.5 * (1 - d.hpPct)) * d.stats.recover;
      d.inRing = this.rules.ring && Math.abs(d.x) <= RING - 0.4 && Math.abs(d.z) <= RING - 0.4;
      if (d.hp <= 0) this.downed(d, a);
    }
  }

  /** Se acabó el tiempo: decide la vida restante (o, en supervivencia, aguantar ya es ganar). */
  private endByTime() {
    const [a, b] = this.f;
    let winner: number;
    if (this.timeMode === 'player') winner = a.hp > 0 ? 0 : 1;
    else winner = a.hpPct >= b.hpPct ? 0 : 1;
    this.end(winner, 'tiempo');
  }

  private stepBoss() {
    const bs = this.boss;
    if (!bs || bs.done) return;
    const f = this.f[bs.side];
    if (f.hpPct > bs.at || f.hp <= 0) return;
    bs.done = true;
    f.stats = { ...f.stats, power: f.stats.power * bs.power, speed: f.stats.speed * bs.speed, tempo: f.stats.tempo * 1.08 };
    f.hp = Math.min(f.maxHp, f.hp + bs.heal * f.maxHp);
    f.mom = 100; f.boost = Math.max(f.boost, 8); f.adrenUsed = true;
    this.emit({ type: 'phase', side: bs.side, text: bs.text });
  }

  // ------------------------------------------------------------ oficina de Pablo Motos
  private officeCd = 22;
  /** Pablo Motos lanza un maletín de billetes al que va perdiendo: algo de vida y momentum. */
  private stepOffice(dt: number) {
    this.officeCd -= dt;
    if (this.officeCd > 0) return;
    this.officeCd = 24 + this.rng() * 10;
    const [a, b] = this.f;
    const w = a.hpPct <= b.hpPct ? a : b;
    if (w.hp <= 0 || w.state === 'ko') return;
    w.hp = Math.min(w.maxHp, w.hp + 0.1 * w.maxHp);
    w.mom = Math.min(100, w.mom + 15);
    this.emit({ type: 'bonus', side: w.idx, text: '¡Pablo Motos lanza un maletín a ' + w.data.name + '!' });
  }

  // ------------------------------------------------------------ apagones (Estadio de Santiago)
  private blackoutCd = 16;
  blackout = 0;
  private stepBlackout(dt: number) {
    if (this.blackout > 0) {
      this.blackout -= dt;
      if (this.blackout <= 0) { this.blackout = 0; this.emit({ type: 'blackout', on: false }); this.emit({ type: 'msg', text: 'Vuelve la luz' }); }
      return;
    }
    this.blackoutCd -= dt;
    if (this.blackoutCd <= 0) { this.blackoutCd = 20 + this.rng() * 10; this.blackout = 2.8; this.emit({ type: 'blackout', on: true }); this.emit({ type: 'msg', text: '¡Apagón!', big: true }); }
  }

  // ------------------------------------------------------------ viento (Azotea)
  private windCd = 9;
  private gust: { t: number; dx: number; dz: number } | null = null;

  private stepWind(dt: number) {
    if (!this.gust) {
      this.windCd -= dt;
      if (this.windCd <= 0) {
        const a = this.rng() * Math.PI * 2;
        this.gust = { t: 1.8, dx: Math.cos(a), dz: Math.sin(a) };
        this.windCd = 13 + this.rng() * 9;
        this.emit({ type: 'gust', dx: this.gust.dx, dz: this.gust.dz });
        this.emit({ type: 'msg', text: '¡Ráfaga de viento!' });
      }
      return;
    }
    const g = this.gust;
    for (const f of this.f) {
      if (!['idle', 'block', 'attack', 'hitstun', 'stunned', 'down', 'getup'].includes(f.state)) continue;
      f.kbx += g.dx * 20 * dt; f.kbz += g.dz * 20 * dt;
    }
    g.t -= dt;
    if (g.t <= 0) this.gust = null;
  }

  // ------------------------------------------------------------ parejas (relevos)
  private benchAlive(side: number) { const b = this.bench[side]; return !!b && b.hp > 0; }

  private stepTeams(dt: number, inputs: [Input, Input]) {
    for (let i = 0; i < 2; i++) {
      this.tagCd[i] = Math.max(0, this.tagCd[i] - dt);
      const b = this.bench[i];
      const rg = this.duos[i]?.bonus.regen ?? 1;
      if (b && b.hp > 0) { b.hp = Math.min(b.maxHp, b.hp + 1.6 * rg * dt); b.st = Math.min(b.maxSt, b.st + 22 * rg * dt); }
      if (inputs[i].tag) this.tryTag(i, false);
    }
  }

  /** Relevo: el compañero entra en el sitio del que estaba luchando. */
  tryTag(side: number, forced: boolean): boolean {
    const out = this.f[side], inn = this.bench[side];
    if (!inn || inn.hp <= 0) return false;
    if (!forced) {
      if (this.tagCd[side] > 0 || (out.state !== 'idle' && out.state !== 'block')) return false;
    }
    inn.x = out.x; inn.z = out.z; inn.y = out.y; inn.yaw = out.yaw; inn.vx = inn.vz = inn.kbx = inn.kbz = 0;
    inn.inRing = out.inRing; inn.outT = 0; inn.outN = 0;
    inn.state = 'idle'; inn.t = 0; inn.move = null; inn.blocking = false; inn.superArmor = false; inn.exhausted = false;
    inn.mom = Math.max(inn.mom, out.mom); // el momentum es del equipo
    for (const k of ['damageTaken', 'damageDealt', 'finishersLanded', 'taunts', 'subsApplied'] as const) { inn[k] += out[k]; out[k] = 0; }
    this.f[side] = inn;
    this.bench[side] = out;
    out.vx = out.vz = 0; out.blocking = false; out.move = null; out.superArmor = false;
    if (forced) { out.state = 'down'; out.koed = true; out.dur = 9999; } else out.state = 'idle';
    this.tagCd[side] = 2.5 * (this.duos[side]?.bonus.tagCd ?? 1);
    const duo = this.duos[side];
    if (duo?.bonus.entryBoost) inn.boost = Math.max(inn.boost, duo.bonus.entryBoost);
    if (duo?.bonus.entryMom) inn.mom = Math.min(100, inn.mom + duo.bonus.entryMom);
    this.emit({ type: 'tag', side, out: out.data.name, inn: inn.data.name, forced });
    return true;
  }

  /** Un luchador sin vida: si su compañero puede seguir, entra en su lugar; si no, cuenta de KO. */
  private downed(o: Fighter, by: Fighter, m?: Move, nx = 0, nz = 0) {
    if (this.benchAlive(o.idx)) { o.hp = 0; this.tryTag(o.idx, true); return; }
    if (m) this.knockDown(o, by, m, nx, nz, true);
    this.startKO(o, by);
  }

  // ------------------------------------------------------------ tribu de Konguito
  /** Ritual satánico: aparece la puerta (la dibuja Summons) y salen 5 de la tribu. Si ya había tribu, se repone (máx. 5). */
  private spawnTribe(f: Fighter, m: Move) {
    const o = this.f[1 - f.idx];
    for (const mi of this.minions) if (mi.owner === f.idx && mi.state !== 'dying') { mi.state = 'dying'; mi.t = 0; }
    // la puerta se coloca detrás del rival respecto a la cámara, para no taparle la vista
    const lim = FLOOR_LIM - 0.6;
    const dx = clamp(o.x + this.refAway.x * 3.2, -lim, lim), dz = clamp(o.z + this.refAway.z * 3.2, -lim, lim);
    this.emit({ type: 'summon', kind: 'tribu', fighter: f.idx, target: o.idx, dur: f.s, x: dx, z: dz });
    void m;
    for (let i = 0; i < MAX_MINIONS; i++) {
      const jitter = (this.rng() - 0.5) * 0.5;
      this.minions.push({
        id: ++this.minionSeq, owner: f.idx, x: dx + jitter, z: dz + (i - 2) * 0.12, yaw: 0, hp: MINION_HP, state: 'wait',
        t: 0, delay: 0.7 + i * 0.16, cd: 0.9 + i * 0.3 + this.rng() * 0.4, swing: 0, lastHit: 0,
      });
    }
  }

  /** Tribu de Kongui: si golpeas hacia el público (que es la tribu), se te echan encima. */
  private checkMob(f: Fighter, m: Move) {
    if ((m.kind !== 'strike' && m.kind !== 'finisher') || f.t < f.s || f.t > f.s + f.a + 0.03) return;
    if (this.mobCd > 0) return;
    // el golpe acaba en el público si el punto de impacto queda más allá del recinto
    const R = this.rules.radius ?? 7;
    const reach = m.range * 0.8;
    const px = f.x + Math.sin(f.yaw) * reach, pz = f.z + Math.cos(f.yaw) * reach;
    if (Math.hypot(px, pz) > R + 0.2) this.spawnMob(f);
  }

  private spawnMob(offender: Fighter) {
    if (offender.data.id === 'kongui') return; // Konguito es de la tribu: a él no lo atacan
    if (this.mobCd > 0) return;
    const owner = 1 - offender.idx;
    if (this.minions.some((mi) => mi.owner === owner && mi.state !== 'dying')) return;
    this.mobCd = 12;
    const R = (this.rules.radius ?? 7) + 1.1;
    const base = Math.atan2(offender.z, offender.x);
    for (let i = 0; i < MOB_SIZE; i++) {
      const a = base + (i - (MOB_SIZE - 1) / 2) * 0.28;
      this.minions.push({
        id: ++this.minionSeq, owner, x: Math.cos(a) * R, z: Math.sin(a) * R, yaw: 0, hp: MINION_HP, state: 'wait',
        t: 0, delay: 0.2 + i * 0.12, cd: 0.8 + i * 0.25 + this.rng() * 0.4, swing: 0, lastHit: 0,
      });
    }
    this.emit({ type: 'mob', target: offender.idx });
    this.emit({ type: 'msg', text: '¡' + offender.data.name + ' ha golpeado a uno de la tribu! ¡TE ATACAN TODOS!', big: true });
  }

  private stepMinions(dt: number) {
    this.mobCd = Math.max(0, this.mobCd - dt);
    if (!this.minions.length) return;
    for (const mi of this.minions) {
      mi.t += dt;
      if (mi.state === 'dying') continue;
      if (mi.state === 'wait') { mi.delay -= dt; if (mi.delay <= 0) { mi.state = 'run'; mi.t = 0; } continue; }
      mi.swing = Math.max(0, mi.swing - dt);
      const o = this.f[1 - mi.owner];
      const dx = o.x - mi.x, dz = o.z - mi.z, d = Math.hypot(dx, dz) || 1;
      mi.yaw = Math.atan2(dx, dz);
      if (d > 1.0) {
        const sp = 3.6 * dt;
        mi.x += (dx / d) * sp; mi.z += (dz / d) * sp;
      } else {
        mi.cd -= dt;
        if (mi.cd <= 0 && this.hittable(o)) { this.minionHit(mi, o); mi.cd = 1.5 + this.rng() * 0.7; }
      }
      // no se amontonan
      for (const other of this.minions) {
        if (other === mi || other.state !== 'run') continue;
        const ex = mi.x - other.x, ez = mi.z - other.z, ed = Math.hypot(ex, ez);
        if (ed < 0.6 && ed > 0.001) { const push = (0.6 - ed) * 0.5; mi.x += (ex / ed) * push; mi.z += (ez / ed) * push; }
      }
      mi.x = clamp(mi.x, -FLOOR_LIM, FLOOR_LIM); mi.z = clamp(mi.z, -FLOOR_LIM, FLOOR_LIM);
    }
    this.minions = this.minions.filter((mi) => !(mi.state === 'dying' && mi.t > 1.0));
  }

  /** Golpe de un miembro de la tribu: poco daño, sin hitstun ni cadena de golpes, y nunca remata (deja 1 de vida). */
  private minionHit(mi: Minion, o: Fighter) {
    mi.swing = 0.3;
    const owner = this.f[mi.owner];
    let dmg = 1.7 * o.stats.resist;
    const mid = { x: (mi.x + o.x) / 2, y: o.y + 1.2, z: (mi.z + o.z) / 2 };
    const facing = Math.abs(angDiff(Math.atan2(mi.x - o.x, mi.z - o.z), o.yaw)) < 1.3;
    if (o.blocking && o.state === 'block' && facing) {
      dmg *= 0.15;
      o.st = Math.max(0, o.st - 3);
      this.emit({ type: 'block', target: o.idx, x: mid.x, y: mid.y, z: mid.z, perfect: false });
    } else {
      this.emit({ type: 'hit', target: o.idx, attacker: owner.idx, heavy: false, x: mid.x, y: mid.y, z: mid.z, dmg });
      const dx = o.x - mi.x, dz = o.z - mi.z, dd = Math.hypot(dx, dz) || 1;
      o.kbx += (dx / dd) * 1.2; o.kbz += (dz / dd) * 1.2; // un empujoncito, no un aturdimiento
    }
    o.hp = Math.max(1, o.hp - dmg);
    o.damageTaken += dmg; owner.damageDealt += dmg;
    o.mom = Math.min(100, o.mom + dmg * 0.35);
  }

  /** Daño de un luchador a la tribu rival dentro de `range` (sin cono: pegas a quien tengas cerca). */
  private hitMinions(f: Fighter, range: number, dmg: number) {
    for (const mi of this.minions) {
      if (mi.owner === f.idx || mi.state !== 'run' || mi.lastHit === f.serial) continue;
      if (Math.hypot(mi.x - f.x, mi.z - f.z) > range) continue;
      mi.lastHit = f.serial;
      mi.hp -= dmg;
      const dead = mi.hp <= 0;
      if (dead) { mi.state = 'dying'; mi.t = 0; }
      this.emit({ type: 'minionHit', id: mi.id, x: mi.x, z: mi.z, dead });
    }
  }

  // ------------------------------------------------------------ pin
  private startPin(a: Fighter, d: Fighter) {
    a.state = 'pinA'; a.t = 0; a.move = null; a.blocking = false; a.vx = a.vz = 0;
    d.state = 'pinD'; d.t = 0; d.pinT = 0; d.escape = 0; d.pinCount = 0; d.by = a.idx;
    this.emit({ type: 'pinStart', attacker: a.idx, target: d.idx });
  }

  private approachPin(a: Fighter, d: Fighter, dt: number) {
    // el que remata se coloca al costado del caído
    const sx = Math.cos(d.yaw), sz = -Math.sin(d.yaw);
    const side = (a.x - d.x) * sx + (a.z - d.z) * sz >= 0 ? 1 : -1;
    const tx = d.x + sx * 0.75 * side, tz = d.z + sz * 0.75 * side;
    const k = 1 - Math.exp(-8 * dt);
    a.x += (tx - a.x) * k; a.z += (tz - a.z) * k;
    a.yaw = this.yawTo(a, d);
  }

  private stepPin(d: Fighter, a: Fighter, inp: Input, dt: number) {
    if (a.state !== 'pinA') { d.state = 'down'; d.t = 0; d.dur = 0.8; return; }
    d.pinT += dt * (this.rules.fastPin ?? 1);
    // las cuerdas: si el pin está pegado a ellas, el árbitro lo rompe
    if (this.rules.ropeBreak && d.pinT > 0.5 && d.inRing && Math.max(Math.abs(d.x), Math.abs(d.z)) > RING - 0.75) {
      this.emit({ type: 'msg', text: '¡Rope break! ' + d.data.name + ' agarra las cuerdas', big: true });
      d.state = 'down'; d.t = 0; d.dur = 0.8;
      a.state = 'stunned'; a.t = 0; a.dur = 0.6;
      return;
    }
    d.escape = Math.max(0, d.escape - 0.12 * dt);
    if (anyPress(inp)) d.escape += 0.2 * (0.25 + d.hpPct) * d.stats.escape;
    const n = Math.min(3, Math.floor(d.pinT));
    if (n > d.pinCount) { d.pinCount = n; this.emit({ type: 'pinCount', n }); }
    if (d.escape >= 1) {
      this.emit({ type: 'kickout', fighter: d.idx });
      d.state = 'getup'; d.t = 0; d.dur = 0.5;
      a.state = 'stunned'; a.t = 0; a.dur = 0.7;
      return;
    }
    if (d.pinT >= 3) this.end(a.idx, 'pin');
  }

  private releaseHold(a: Fighter, d: Fighter) {
    a.state = 'idle';
    if (d.state === 'pinD') { d.state = 'down'; d.t = 0; d.dur = 0.8; }
    if (d.state === 'subD') { d.state = 'stunned'; d.t = 0; d.dur = 0.8; }
  }

  // ------------------------------------------------------------ sumisión
  private startSub(a: Fighter, d: Fighter) {
    a.state = 'subA'; a.t = 0; a.lastGrapple = a.subG.name;
    d.state = 'subD'; d.t = 0; d.subMeter = 0.35; d.by = a.idx;
    a.subsApplied++;
    this.emit({ type: 'subStart', attacker: a.idx, target: d.idx });
    this.emit({ type: 'msg', text: '¡' + a.subG.name + ' de ' + a.data.name + '!', big: true });
  }

  private stepSub(d: Fighter, a: Fighter, inp: Input, dt: number) {
    if (a.state !== 'subA') { d.state = 'stunned'; d.t = 0; d.dur = 0.8; return; }
    const hp = d.hpPct;
    d.subMeter += (0.06 + 0.3 * Math.pow(1 - hp, 1.3)) * a.stats.power * dt;
    d.hp = Math.max(1, d.hp - 1.4 * dt);
    d.damageTaken += 1.4 * dt; a.damageDealt += 1.4 * dt;
    if (anyPress(inp)) d.subMeter -= 0.08 * (0.45 + hp) * d.stats.escape;
    // el atacante puede apretar para acelerar
    const ai = this.lastInputs?.[a.idx];
    if (ai && (ai.light || ai.heavy || ai.grab)) d.subMeter += 0.012;
    if (d.subMeter >= 1) { this.emit({ type: 'tap', fighter: d.idx }); this.end(a.idx, 'rendicion'); return; }
    if (d.subMeter <= 0) {
      this.emit({ type: 'subBreak', fighter: d.idx });
      d.state = 'stunned'; d.t = 0; d.dur = 0.9;
      a.state = 'stunned'; a.t = 0; a.dur = 0.9;
    }
  }
  private lastInputs: [Input, Input] | null = null;

  // ------------------------------------------------------------ movimiento y reglas del ring
  private motion(f: Fighter, dt: number) {
    const free = ['idle', 'block', 'attack', 'hitstun', 'down', 'getup', 'stunned', 'ko', 'win', 'subD'];
    if (['idle', 'block'].includes(f.state)) { f.x += f.vx * dt; f.z += f.vz * dt; }
    else if (f.state !== 'attack') { f.vx *= 0.8; f.vz *= 0.8; }
    if (free.includes(f.state)) {
      f.x += f.kbx * dt; f.z += f.kbz * dt;
      const dec = Math.exp(-9 * dt);
      f.kbx *= dec; f.kbz *= dec;
    }
    if (f.banned && f.state !== 'thrown') {
      const lim = RING + 0.55;
      if (Math.abs(f.x) < lim && Math.abs(f.z) < lim) {
        if (Math.abs(f.x) >= Math.abs(f.z)) f.x = (f.x < 0 ? -1 : 1) * lim; else f.z = (f.z < 0 ? -1 : 1) * lim;
      }
    }
    if (f.state !== 'thrown') {
      // límites
      if (f.inRing && f.exitAllow <= 0 && f.state !== 'subA' && !f.banned) {
        const lim = RING - ROPE_PAD;
        f.x = clamp(f.x, -lim, lim); f.z = clamp(f.z, -lim, lim);
      }
      f.x = clamp(f.x, -FLOOR_LIM, FLOOR_LIM); f.z = clamp(f.z, -FLOOR_LIM, FLOOR_LIM);
      [f.x, f.z] = this.bound(f.x, f.z);
      if (f.inRing && (Math.abs(f.x) > RING + 0.05 || Math.abs(f.z) > RING + 0.05)) f.inRing = false;
      else if (!f.inRing && Math.abs(f.x) < RING - 0.4 && Math.abs(f.z) < RING - 0.4) f.inRing = true;
      if (!this.rules.ring) f.inRing = false;
      const diving = f.state === 'attack' && !!f.dive && f.t < f.s + f.a;
      if (!diving) { const gy = this.gy(f.x, f.z); f.y += (gy - f.y) * (1 - Math.exp(-10 * dt)); }
    } else {
      if (Math.abs(f.x) > RING + 0.05 || Math.abs(f.z) > RING + 0.05) f.inRing = false;
    }
  }

  private separate() {
    const [a, b] = this.f;
    const locked = ['clinch', 'clinched', 'throwing', 'thrown', 'subA', 'subD', 'pinA', 'pinD'];
    if (locked.includes(a.state) || locked.includes(b.state)) return;
    const lying = (f: Fighter) => f.state === 'down' || f.state === 'ko';
    const min = lying(a) || lying(b) ? 0.7 : 0.85;
    const dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz);
    if (d >= min) return;
    const nx = d > 0.001 ? dx / d : 1, nz = d > 0.001 ? dz / d : 0;
    const push = min - d;
    if (lying(a) && !lying(b)) { b.x += nx * push; b.z += nz * push; }
    else if (lying(b) && !lying(a)) { a.x -= nx * push; a.z -= nz * push; }
    else { a.x -= nx * push / 2; a.z -= nz * push / 2; b.x += nx * push / 2; b.z += nz * push / 2; }
  }

  private ringRules(dt: number) {
    if (!this.rules.countOut || !this.rules.ring) { for (const f of this.f) { f.outT = 0; f.outN = 0; } return; }
    for (const f of this.f) {
      const outside = Math.abs(f.x) > RING + 0.05 || Math.abs(f.z) > RING + 0.05;
      if (outside && f.state !== 'thrown') {
        f.outT += dt;
        const n = Math.floor(f.outT);
        if (n > f.outN) {
          f.outN = n;
          this.emit({ type: 'outCount', fighter: f.idx, n });
          if (n >= 10) { this.end(1 - f.idx, 'fuera'); return; }
        }
      } else if (!outside) { f.outT = 0; f.outN = 0; }
    }
  }

  private updateKO(dt: number) {
    if (!this.ko) return;
    this.ko.t += dt;
    const n = Math.min(10, Math.floor(this.ko.t / 0.42));
    if (n > this.ko.n) { this.ko.n = n; this.emit({ type: 'koCount', n }); }
    if (n >= 10) this.end(1 - this.ko.idx, 'ko');
  }

  private updateRef(dt: number) {
    const [a, b] = this.f;
    let tx = (a.x + b.x) / 2 + this.refAway.x * 2.0, tz = (a.z + b.z) / 2 + this.refAway.z * 2.0, yaw = 0;
    let mode: Referee['mode'] = 'idle';
    let count = 0;
    const pinned = a.state === 'pinD' ? a : b.state === 'pinD' ? b : null;
    const koed = this.ko ? this.f[this.ko.idx] : null;
    if (pinned) { tx = pinned.x + this.refAway.x * 1.2; tz = pinned.z + this.refAway.z * 1.2; mode = 'count'; count = pinned.pinCount; }
    else if (koed) { tx = koed.x + this.refAway.x * 1.2; tz = koed.z + this.refAway.z * 1.2; mode = 'count'; count = this.ko!.n; }
    // dentro del ring
    const lim = RING - 0.6;
    tx = clamp(tx, -lim, lim); tz = clamp(tz, -lim, lim);
    // no pisar a los luchadores
    for (const f of this.f) {
      const dx = tx - f.x, dz = tz - f.z, d = Math.hypot(dx, dz);
      if (d < 1.1 && !(mode === 'count')) { tx = f.x + (dx / (d || 1)) * 1.1; tz = f.z + (dz / (d || 1)) * 1.1; }
    }
    const k = 1 - Math.exp(-4 * dt);
    this.ref.x += (tx - this.ref.x) * k;
    this.ref.z += (tz - this.ref.z) * k;
    const target = pinned ?? koed ?? { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 };
    yaw = Math.atan2(target.x - this.ref.x, target.z - this.ref.z);
    this.ref.yaw += angDiff(yaw, this.ref.yaw) * (1 - Math.exp(-8 * dt));
    this.ref.mode = mode; this.ref.count = count;
  }

  private end(winner: number, reason: WinReason) {
    if (this.over) return;
    if (this.training) {
      // en el entrenamiento nadie gana: se levantan y se sigue practicando
      for (const f of this.f) { f.state = 'idle'; f.t = 0; f.move = null; f.blocking = false; f.koed = false; f.hp = f.maxHp; f.banned = false; f.outT = 0; f.outN = 0; f.vx = f.vz = 0; }
      this.ko = null;
      this.emit({ type: 'msg', text: 'Entrenamiento: ¡otra vez!' });
      return;
    }
    this.over = true;
    this.winner = winner;
    this.reason = reason;
    const w = this.f[winner], l = this.f[1 - winner];
    w.state = 'win'; w.t = 0; w.move = null; w.blocking = false; w.vx = w.vz = 0;
    if (l.state !== 'down' && l.state !== 'pinD') { l.state = 'ko'; } else l.state = 'ko';
    l.t = 0; l.move = null; l.blocking = false; l.vx = l.vz = 0;
    for (const mi of this.minions) if (mi.state !== 'dying') { mi.state = 'dying'; mi.t = 0; }
    this.emit({ type: 'end', winner, reason });
  }
}
