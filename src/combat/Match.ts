import type { FighterData, GameEvent, Grapple, Input, Move, WinReason } from './types';
import { getGrapple, getMove, MOVES } from './moves';

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
  foulCount = 0;
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
const angDiff = (a: number, b: number) => {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
};
const anyPress = (i: Input) => i.light || i.heavy || i.grab || i.taunt || i.finisher;
export const groundY = (x: number, z: number) => (Math.abs(x) <= RING + 0.05 && Math.abs(z) <= RING + 0.05 ? RING_Y : 0);

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
  ref: Referee = { x: 0, z: -RING + 1, yaw: 0, count: 0, mode: 'idle' };
  endT = 0;
  /** Dirección (en el plano) desde la cámara hacia el ring: el árbitro se coloca detrás de los luchadores para no tapar */
  refAway = { x: 0, z: -1 };
  rng: () => number;

  constructor(a: FighterData, b: FighterData, rng: () => number = Math.random) {
    this.rng = rng;
    this.f = [new Fighter(0, a), new Fighter(1, b)];
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
      this.updateRef(dt);
      return;
    }
    this.time += dt;
    for (let i = 0; i < 2; i++) this.preUpdate(this.f[i], inputs[i], dt);
    for (let i = 0; i < 2; i++) this.step(i, inputs[i], dt);
    for (let i = 0; i < 2; i++) this.motion(this.f[i], dt);
    this.separate();
    this.ringRules(dt);
    this.updateKO(dt);
    this.updateRef(dt);
  }

  // ------------------------------------------------------------ utilidades
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
    let sp = 3.0 * f.stats.speed;
    if (f.running) sp = 5.4 * f.stats.speed;
    if (f.blocking) sp *= f.data.traits?.rootedGuard ? 0 : 0.42;
    if (f.exhausted) sp *= 0.7;
    const tvx = moving ? mx * sp : 0, tvz = moving ? mz * sp : 0;
    const k = 1 - Math.exp(-16 * dt);
    f.vx += (tvx - f.vx) * k;
    f.vz += (tvz - f.vz) * k;
    f.speedNow = Math.hypot(f.vx, f.vz);

    // salir del ring por las cuerdas: correr contra ellas
    if (f.inRing && moving && inp.run) {
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

  /** Golpe fuerte: si el luchador tiene lista aleatoria (Pablo Motos), elige uno según su rareza. */
  private pickHeavy(f: Fighter): Move {
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
    if (m.summon) this.emit({ type: 'summon', kind: m.summon, fighter: f.idx, target: 1 - f.idx, dur: f.s });
    if (m.kind === 'finisher') { f.mom = 0; this.emit({ type: 'finisherStart', fighter: f.idx, move: m }); }
  }

  private stepAttack(f: Fighter, o: Fighter, inp: Input, dt: number) {
    const m = f.move!;
    f.vx *= 0.8; f.vz *= 0.8;
    f.speedNow = 0;
    if (f.t < f.s) this.face(f, o, dt, m.kind === 'finisher' ? 3 : 7);
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
    // ventana activa
    if (!f.hitDone && f.t >= f.s && f.t <= f.s + f.a + 0.03 && !f.toreo) {
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
    let dmg = m.damage * (m.kind === 'finisher' ? FINISHER_SCALE : DMG_SCALE) * f.stats.power * (f.exhausted ? 0.75 : 1) * o.stats.resist;
    if (o.state === 'attack' && o.t < o.s && o.move?.kind !== 'finisher') dmg *= 1.2; // golpe al contraataque
    if (m.foul) {
      dmg *= 1.2;
      f.foulCount++;
      const seen = this.rng() < 0.45;
      this.emit({ type: 'foul', fighter: f.idx, seen });
      if (seen) f.mom = Math.max(0, f.mom - 12);
    }
    o.hp = Math.max(0, o.hp - dmg);
    o.damageTaken += dmg; f.damageDealt += dmg;
    const wasReady = f.mom >= 100;
    f.mom = Math.min(100, f.mom + m.momentum);
    o.mom = Math.min(100, o.mom + dmg * 0.35);
    if (!wasReady && f.mom >= 100) this.emit({ type: 'ready', fighter: f.idx });
    if (o.mom >= 100 && o.mom - dmg * 0.35 < 100) this.emit({ type: 'ready', fighter: o.idx });

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

    if (m.id === 'hora_pablo_motos') { this.fire(f, o); return; }

    // el rival tiene super armadura (está ejecutando su finisher)
    if (o.superArmor && !isFin) return;

    if (o.hp <= 0) { this.knockDown(o, f, m, nx, nz, true); this.startKO(o, f); return; }
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

  private knockDown(o: Fighter, f: Fighter, m: Move, nx: number, nz: number, ko: boolean) {
    o.move = null; o.blocking = false; o.hitChain = 0;
    const isFin = m.kind === 'finisher';
    // salir volando del ring
    if (m.sendOut && o.inRing && !ko) {
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
    this.startThrow(d, a, tx, tz, g.style === 'throw' ? 0.7 : 0.85, g.style === 'throw' ? 1.2 : 1.9, g.style, g.damage * DMG_SCALE * a.stats.power * d.stats.resist, false);
  }

  private startThrow(d: Fighter, by: Fighter, tx: number, tz: number, dur: number, arc: number, style: 'throw' | 'slam', dmg: number, out: boolean) {
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
    const y0 = groundY(th.fx, th.fz), y1 = groundY(th.tx, th.tz);
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
      this.emit({ type: 'land', target: d.idx, big: th.style === 'slam' || th.out });
      d.state = 'down'; d.t = 0;
      d.dur = (1.8 + 1.5 * (1 - d.hpPct)) * d.stats.recover;
      d.inRing = Math.abs(d.x) <= RING - 0.4 && Math.abs(d.z) <= RING - 0.4;
      if (d.hp <= 0) this.startKO(d, a);
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
    d.pinT += dt;
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
      if (f.inRing && (Math.abs(f.x) > RING + 0.05 || Math.abs(f.z) > RING + 0.05)) f.inRing = false;
      else if (!f.inRing && Math.abs(f.x) < RING - 0.4 && Math.abs(f.z) < RING - 0.4) f.inRing = true;
      const gy = groundY(f.x, f.z);
      f.y += (gy - f.y) * (1 - Math.exp(-10 * dt));
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
    this.over = true;
    this.winner = winner;
    this.reason = reason;
    const w = this.f[winner], l = this.f[1 - winner];
    w.state = 'win'; w.t = 0; w.move = null; w.blocking = false; w.vx = w.vz = 0;
    if (l.state !== 'down' && l.state !== 'pinD') { l.state = 'ko'; } else l.state = 'ko';
    l.t = 0; l.move = null; l.blocking = false; l.vx = l.vz = 0;
    this.emit({ type: 'end', winner, reason });
  }
}
