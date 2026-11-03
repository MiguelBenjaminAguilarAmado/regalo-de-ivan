import type { Difficulty, Input } from '../combat/types';
import { emptyInput } from '../combat/types';
import type { Fighter, Match } from '../combat/Match';
import { RING } from '../combat/Match';

export interface AIProfile {
  react: number; // segundos entre decisiones
  aggr: number; // 0-1 ganas de atacar
  blockProb: number; // prob. de bloquear un ataque entrante
  parryProb: number; // prob. de intentar el bloqueo perfecto
  reverseProb: number; // prob. de revertir un agarre
  whiffProb: number; // prob. de fallar a posta (lanza golpes fuera de rango)
  mash: number; // pulsaciones por segundo al escapar de pins/sumisiones
  pinHp: number; // intenta el pin si la vida del rival es menor que esto
  pinProb: number;
  showy: number; // prob. de burlarse / buscar espectáculo
  finisherMode: 'dramatic' | 'late' | 'asap';
  grabW: number; // peso relativo del agarre
  heavyW: number;
  lightW: number;
  subProb: number; // prob. de elegir sumisión tras agarre
}

export const PROFILES: Record<Difficulty, AIProfile> = {
  facil: { react: 0.55, aggr: 0.42, blockProb: 0.14, parryProb: 0.0, reverseProb: 0.04, whiffProb: 0.32, mash: 2.6, pinHp: 0.2, pinProb: 0.5, showy: 0.2, finisherMode: 'late', grabW: 0.8, heavyW: 0.7, lightW: 1.6, subProb: 0.08 },
  intermedia: { react: 0.28, aggr: 0.68, blockProb: 0.42, parryProb: 0.22, reverseProb: 0.2, whiffProb: 0.1, mash: 4.4, pinHp: 0.36, pinProb: 0.85, showy: 0.3, finisherMode: 'dramatic', grabW: 1.0, heavyW: 0.9, lightW: 1.4, subProb: 0.16 },
  dificil: { react: 0.12, aggr: 0.9, blockProb: 0.68, parryProb: 0.5, reverseProb: 0.45, whiffProb: 0.0, mash: 6.4, pinHp: 0.5, pinProb: 1.0, showy: 0.08, finisherMode: 'asap', grabW: 1.1, heavyW: 1.0, lightW: 1.3, subProb: 0.26 },
};

type Intent = 'approach' | 'attack' | 'circle' | 'retreat' | 'block' | 'pin' | 'idle' | 'return';

export class AIController {
  p: AIProfile;
  private cool = 0;
  private intent: Intent = 'approach';
  private intentT = 0;
  private circleDir = 1;
  private plan: ('light' | 'heavy' | 'grab')[] = [];
  private mashAcc = 0;
  private blockUntil = 0;
  private parryWait = false;
  private seenAttack = -1;
  private clock = 0;
  private clinchWait = -1;
  private wantTaunt = false;
  private whiffing = false;
  private tagCool = 0;

  constructor(public me: number, difficulty: Difficulty, private rng: () => number = Math.random) {
    this.p = PROFILES[difficulty];
    this.circleDir = rng() < 0.5 ? 1 : -1;
  }

  update(dt: number, m: Match): Input {
    const inp = emptyInput();
    const me = m.f[this.me], op = m.f[1 - this.me];
    this.clock += dt;
    this.tagCool -= dt;
    this.cool -= dt;
    this.intentT -= dt;
    const dx = op.x - me.x, dz = op.z - me.z;
    const d = Math.hypot(dx, dz) || 0.001;
    const ux = dx / d, uz = dz / d;

    // ---- parejas: relevar al compañero si estoy hecho polvo y él está mejor
    const bench = m.bench[this.me];
    if (bench && bench.hp > 0 && me.state === 'idle' && this.tagCool <= 0) {
      const weak = me.hpPct < 0.3 || (me.exhausted && me.st < 8);
      if (weak && bench.hp / bench.maxHp > me.hpPct + 0.25) { inp.tag = true; this.tagCool = 6; return inp; }
    }

    // ---- estados especiales
    switch (me.state) {
      case 'down': case 'pinD': case 'subD': case 'getup': this.mashTick(dt, inp, me.state); return inp;
      case 'clinch': this.doClinch(me, inp, dt); return inp;
      case 'clinched': return inp;
      case 'attack': case 'hitstun': case 'throwing': case 'thrown': case 'stunned': case 'ko': case 'win': case 'pinA':
        this.clinchWait = -1;
        return inp;
      case 'subA':
        if (this.rng() < 6 * dt) inp.light = true;
        return inp;
      default: break;
    }

    // ---- reacción defensiva
    const atkInStartup = op.state === 'attack' && op.move && op.t < op.s + 0.04 && op.move.kind !== 'taunt';
    if (atkInStartup && op.move) {
      const range = op.move.range + 0.5;
      if (d < range && this.seenAttack < 0) {
        this.seenAttack = 1;
        const isGrab = op.move.kind === 'grab';
        if (isGrab && this.rng() < this.p.reverseProb) { this.parryWait = false; this.plan = ['grab']; this.reverseAt = this.clock + Math.max(0, op.s - op.t - 0.18); }
        else if (!isGrab && this.rng() < this.p.blockProb) {
          this.parryWait = this.rng() < this.p.parryProb;
          this.blockStart = this.clock + (this.parryWait ? Math.max(0, op.s - op.t - 0.13) : 0);
          this.blockUntil = this.clock + (op.s - op.t) + 0.5;
        } else if (!isGrab && me.st > 10 && this.rng() < 0.35 * this.p.aggr) {
          // esquivar de lado
          this.dodgeUntil = this.clock + 0.35;
          this.dodgeDir = this.rng() < 0.5 ? 1 : -1;
        }
      }
    } else this.seenAttack = -1;

    if (this.reverseAt > 0 && this.clock >= this.reverseAt) { inp.grab = true; this.reverseAt = -1; }
    if (this.blockUntil > this.clock && this.clock >= this.blockStart) inp.block = true;
    if (this.dodgeUntil > this.clock) {
      inp.mx = -uz * this.dodgeDir; inp.mz = ux * this.dodgeDir; inp.run = me.st > 8;
      return inp;
    }
    if (inp.block) { inp.mx = 0; inp.mz = 0; return inp; }

    // fuera del ring demasiado tiempo: volver ya
    if (!me.banned && me.state === 'idle' && me.outT > 2.5 + this.p.react * 2 && this.intent !== 'return') { this.intent = 'return'; this.intentT = 0.8; this.plan = []; }
    // ---- elegir objetivo
    if (this.cool <= 0 || this.intentT <= 0) this.decide(me, op, d);
    if (this.finisherNow) { this.finisherNow = false; if (me.mom >= 100 && me.state === 'idle') { inp.finisher = true; return inp; } }

    // ---- ejecutar
    const mvToward = (s: number) => { inp.mx = ux * s; inp.mz = uz * s; };
    const margin = 0.25;
    switch (this.intent) {
      case 'approach': {
        mvToward(1);
        inp.run = d > 3.0 && me.st > 35;
        const reach = this.reachDist(me);
        if (d < reach) { this.intent = 'attack'; this.intentT = 0.2; }
        break;
      }
      case 'attack': {
        const reach = this.reachDist(me);
        if (d > reach + margin) { mvToward(0.8); }
        if (d <= reach + margin || (this.whiffing && d < reach + 1.1)) {
          if (me.state === 'idle' || me.state === 'block') {
            const a = this.plan.shift();
            if (a) inp[a] = true;
            else { this.intent = this.rng() < 0.55 ? 'circle' : 'retreat'; this.intentT = 0.35 + this.rng() * 0.4; this.cool = 0; }
          }
        }
        break;
      }
      case 'circle': inp.mx = -uz * this.circleDir + ux * (d > 2.0 ? 0.6 : -0.15); inp.mz = ux * this.circleDir + uz * (d > 2.0 ? 0.6 : -0.15); break;
      case 'return': {
        const l = Math.hypot(me.x, me.z) || 1;
        inp.mx = -me.x / l; inp.mz = -me.z / l; inp.run = false;
        if (me.inRing) { this.intent = 'approach'; this.intentT = 0.3; }
        break;
      }
      case 'retreat': inp.mx = -ux; inp.mz = -uz; inp.run = me.st > 20 && d < 2; break;
      case 'pin': {
        if (op.state !== 'down') { this.intent = 'approach'; break; }
        if (d > 1.5) mvToward(1);
        else { inp.grab = true; this.intent = 'idle'; this.intentT = 0.5; }
        break;
      }
      default: break;
    }
    // no quedarse atrapado en las cuerdas
    if (me.inRing && (Math.abs(me.x) > RING - 0.6 || Math.abs(me.z) > RING - 0.6) && this.intent !== 'attack') {
      inp.mx += -me.x * 0.15; inp.mz += -me.z * 0.15;
    }
    if (this.wantTaunt && (me.state === 'idle') && d > 2.2) { inp.taunt = true; this.wantTaunt = false; }
    return inp;
  }
  private reverseAt = -1;
  private blockStart = 0;
  private dodgeUntil = 0;
  private dodgeDir = 1;

  private reachDist(me: Fighter) {
    const m = this.plan[0] === 'heavy' ? me.heavy : this.plan[0] === 'grab' ? me.grabMove : me.light[0];
    return Math.max(0.9, m.range * 0.82);
  }

  private decide(me: Fighter, op: Fighter, d: number) {
    const p = this.p;
    const r = this.rng;
    this.cool = p.react * (0.7 + r() * 0.6);
    this.plan = [];
    this.whiffing = false;
    this.wantTaunt = false;

    // rival en el suelo: rematar con pin o seguir
    if (op.state === 'down' && !op.koed) {
      if (op.hpPct < p.pinHp && r() < p.pinProb) { this.intent = 'pin'; this.intentT = 2; return; }
      if (r() < p.showy) { this.wantTaunt = true; }
      this.intent = 'approach'; this.intentT = 0.8; return;
    }
    if (op.state === 'down' || op.koed) { this.intent = 'idle'; this.intentT = 1; return; }

    // finisher
    if (me.mom >= 100 && me.state === 'idle') {
      const mode = p.finisherMode;
      const dramatic = op.hpPct < 0.5 || me.hpPct < 0.3 || op.state === 'stunned';
      const go = mode === 'asap' ? true : mode === 'dramatic' ? dramatic : op.hpPct < 0.35 || op.state === 'stunned';
      const fr = me.finisher.rush ? 4.6 : me.finisher.range * 0.9;
      if (go && d < fr && (!me.finisher.rush || d > 2.2)) { this.plan = []; this.finisherNow = true; }
      // los finishers de embestida necesitan carrerilla: si está demasiado cerca, se aleja en vez de acercarse más
      else if (go) { this.intent = me.finisher.rush && d <= 2.2 ? 'retreat' : 'approach'; this.intentT = 0.5; return; }
    }

    // pocas fuerzas: retirarse y recuperar
    if (me.st < 18 && d < 3) { this.intent = 'retreat'; this.intentT = 0.9; return; }

    // volver al ring si estamos fuera (salvo que nos hayan expulsado)
    if (!me.banned && (Math.abs(me.x) > RING + 0.1 || Math.abs(me.z) > RING + 0.1) && me.outT > 1.2) {
      this.intent = 'return'; this.intentT = 1.2; return;
    }

    if (r() < p.aggr) {
      this.intent = d > 1.6 ? 'approach' : 'attack';
      this.intentT = 1.4;
      // elegir ataques
      const w = [p.lightW, p.heavyW, p.grabW];
      const pickOne = (): 'light' | 'heavy' | 'grab' => {
        const tot = w[0] + w[1] + w[2];
        let x = r() * tot;
        if ((x -= w[0]) < 0) return 'light';
        if ((x -= w[1]) < 0) return 'heavy';
        return 'grab';
      };
      const first = pickOne();
      if (first === 'light') { const n = 1 + Math.floor(r() * 3); for (let i = 0; i < n; i++) this.plan.push('light'); }
      else this.plan.push(first);
      if (r() < p.whiffProb) this.whiffing = true;
      if (me.mom < 90 && r() < p.showy * 0.5) this.wantTaunt = true;
    } else {
      this.intent = r() < 0.5 ? 'circle' : 'retreat';
      this.circleDir = r() < 0.5 ? 1 : -1;
      this.intentT = 0.4 + r() * 0.5;
    }
  }
  private finisherNow = false;

  private doClinch(me: Fighter, inp: Input, dt: number) {
    if (this.clinchWait < 0) this.clinchWait = this.p.react * (0.6 + this.rng() * 0.8);
    this.clinchWait -= dt;
    if (this.clinchWait > 0 && me.t < 0.5) return;
    const r = this.rng();
    const sub = r < this.p.subProb;
    this.clinchWait = -1;
    if (sub) inp.grab = true;
    else if (this.rng() < 0.55) inp.heavy = true;
    else inp.light = true;
  }

  private mashTick(dt: number, inp: Input, state: string) {
    this.mashAcc += dt * this.p.mash * (0.75 + this.rng() * 0.5);
    while (this.mashAcc >= 1) {
      this.mashAcc -= 1;
      const x = this.rng();
      if (x < 0.4) inp.light = true; else if (x < 0.8) inp.heavy = true; else inp.grab = true;
    }
  }
}
