import type { Match } from '../combat/Match';
import type { GameEvent } from '../combat/types';
import { Audio } from '../audio/Audio';

interface Pending { who: number; text: string; prio: number }

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

/** Narrador y comentarista del modo espectador: subtítulos + voz (SpeechSynthesis). */
export class Narrator {
  private speaking = false;
  private curPrio = 0;
  private queue: Pending[] = [];
  private gap = 0;
  private quiet = 0;
  private lastHit: [number, number] = [-9, -9];
  private hitStreak = [0, 0];
  private lastSaid: Record<string, number> = {};
  private clock = 0;
  private subTimer = 0;
  private lowShown = [false, false];
  enabled = true;

  constructor(private match: Match, private show: (who: string, text: string) => void) {}

  private n(i: number) { return this.match.f[i].data.name; }

  private say(who: number, text: string, prio = 1, key = '', cooldown = 0) {
    if (!this.enabled) return;
    if (key) { if (this.clock - (this.lastSaid[key] ?? -99) < cooldown) return; this.lastSaid[key] = this.clock; }
    if (prio === 0 && (this.speaking || this.queue.length)) return;
    if (this.speaking && prio > this.curPrio) { this.queue = []; this.speak({ who, text, prio }, true); return; }
    if (this.speaking || this.gap > 0) { if (this.queue.length < 2) this.queue.push({ who, text, prio }); return; }
    this.speak({ who, text, prio }, false);
  }

  private speak(l: Pending, interrupt: boolean) {
    this.quiet = 0;
    const name = l.who === 0 ? 'NARRADOR' : 'COMENTARISTA';
    this.show(name, l.text);
    this.subTimer = 1.4 + l.text.length * 0.055;
    this.curPrio = l.prio;
    if (interrupt) Audio.cancelSpeech();
    this.speaking = true;
    const done = () => { this.speaking = false; this.gap = 0.35; this.curPrio = 0; };
    const ok = Audio.speak(l.text, l.who, done);
    if (!ok) { const dur = this.subTimer; window.setTimeout(done, dur * 1000); }
  }

  start(arena: string) {
    const [a, b] = [this.n(0), this.n(1)];
    this.say(0, `¡Señoras y señores, bienvenidos al Hoyo Wrestling! Esta noche, desde ${arena}, ${a} contra ${b}.`, 3);
    this.say(1, pick([`Va a ser un combate de los que se recuerdan.`, `Los dos llegan con muchas ganas de pelea.`, `Prepárense, porque aquí hay tela que cortar.`]), 2);
  }

  handle(events: GameEvent[]) {
    for (const e of events) this.event(e);
  }

  private event(e: GameEvent) {
    const m = this.match;
    switch (e.type) {
      case 'hit': {
        const a = e.attacker;
        this.hitStreak[a] = this.clock - this.lastHit[a] < 1.5 ? this.hitStreak[a] + 1 : 1;
        this.lastHit[a] = this.clock;
        if (this.hitStreak[a] === 3) this.say(0, pick([`¡${this.n(a)} está encadenando golpes!`, `¡Qué ráfaga de ${this.n(a)}!`, `${this.n(a)} no le deja respirar.`]), 1, 'combo', 4);
        else if (e.heavy) this.say(pick([0, 1]), pick([`¡Qué golpe de ${this.n(a)}!`, `Eso ha tenido que doler.`, `${this.n(a)} conecta un golpe tremendo.`, `¡Menudo impacto!`]), 1, 'heavy', 4);
        break;
      }
      case 'block': if (e.perfect) this.say(0, pick([`¡Contraataque de ${this.n(e.target)}! Lo vio venir.`, `¡Qué lectura de ${this.n(e.target)}!`]), 2, 'parry', 3); break;
      case 'knockdown': this.say(0, pick([`¡${this.n(e.target)} al suelo!`, `Cae ${this.n(e.target)}.`, `¡Derribado ${this.n(e.target)}!`]), 1, 'down', 3); break;
      case 'grappleMove': this.say(pick([0, 1]), `${this.n(e.attacker)} aplica un ${e.name}.`, 1, 'grapple', 4); break;
      case 'reversal': this.say(0, `¡Qué reversión de ${this.n(e.fighter)}!`, 2, 'rev', 3); break;
      case 'pinStart': this.say(0, `¡${this.n(e.attacker)} va a por el pin!`, 2, 'pin', 3); break;
      case 'kickout': this.say(1, pick([`¡${this.n(e.fighter)} se zafa en el último segundo!`, `¡Increíble! ¡Se levanta antes del tres!`]), 2, 'kick', 3); break;
      case 'subStart': this.say(0, `¡${this.n(e.attacker)} le ha atrapado en una llave! ${this.n(e.target)} está en apuros.`, 2, 'sub', 3); break;
      case 'subBreak': this.say(1, `¡${this.n(e.fighter)} consigue escapar de la llave!`, 2, 'subb', 3); break;
      case 'tap': this.say(0, `¡${this.n(e.fighter)} se rinde!`, 3); break;
      case 'ready': this.say(1, `${this.n(e.fighter)} tiene el finisher listo. ¡Cuidado!`, 2, 'ready' + e.fighter, 12); break;
      case 'finisherStart': this.say(0, `¡Atención! ¡${this.n(e.fighter)} va a por su finisher: ${e.move.name}!`, 3); break;
      case 'finisherHit': this.say(0, pick([`¡¡Impacto brutal!! ¡${this.n(e.target)} no se lo esperaba!`, `¡Increíble! ¡Menudo remate!`]), 3); break;
      case 'finisherMiss': this.say(1, `¡Le ha fallado el finisher! Esto le va a salir caro.`, 2, 'fmiss', 5); break;
      case 'foul': this.say(1, e.seen ? `¡Falta de ${this.n(e.fighter)}! Y el árbitro lo ha visto.` : `Falta de ${this.n(e.fighter)}… y el árbitro mirando a otro lado.`, 2, 'foul', 6); break;
      case 'taunt': this.say(1, pick([`${this.n(e.fighter)} se burla del rival. ¡Qué descaro!`, `Fíjense en ${this.n(e.fighter)}, está disfrutando.`]), 1, 'taunt', 6); break;
      case 'summon': this.say(0, e.kind === 'tanque' ? `¡Un tanque! ¡${this.n(e.fighter)} ha sacado un TANQUE! Esto es el Hoyo.` : `¡${this.n(e.fighter)} ha invocado una momia! No me lo puedo creer.`, 3, 'summon', 4); break;
      case 'toreo': this.say(0, `¡${this.n(e.target)} le torea! ¡Olé!`, 3); break;
      case 'heavyPick': if (e.move.id === 'casco_romano') this.say(1, `El casco romano… ¡ave, ${this.n(e.fighter)}!`, 1, 'casco', 8); break;
      case 'outCount': if (e.n >= 5 && e.n < 10) this.say(0, `¡${this.n(e.fighter)} lleva ${e.n} segundos fuera del ring!`, 2, 'out' + e.n, 1); break;
      case 'exhausted': this.say(1, `${this.n(e.fighter)} está agotado.`, 1, 'tired' + e.fighter, 12); break;
      case 'koCount': if (e.n === 3) this.say(1, `${this.n(m.ko ? m.ko.idx : 0)} no se levanta…`, 2, 'ko3', 6); break;
      case 'end': {
        const w = this.n(e.winner), l = this.n(1 - e.winner);
        const fired = m.f[1 - e.winner].banned;
        const text = fired ? `¡${l} ha sido despedido! Gana ${w}.` : e.reason === 'ko' ? `¡KO! ¡Gana ${w}!` : e.reason === 'pin' ? `¡Uno, dos, tres! ¡Gana ${w}!` : e.reason === 'rendicion' ? `¡Se rinde ${l}! ¡Gana ${w}!` : `¡Cuenta fuera! ¡Gana ${w}!`;
        this.say(0, text, 4);
        this.say(1, pick([`Un combate para la historia del Hoyo.`, `Qué nochecita nos han regalado.`, `${w} se lo ha ganado a pulso.`]), 3);
        break;
      }
      default: break;
    }
  }

  update(dt: number) {
    this.clock += dt;
    this.gap = Math.max(0, this.gap - dt);
    this.quiet += dt;
    if (this.subTimer > 0) { this.subTimer -= dt; if (this.subTimer <= 0) this.show('', ''); }
    if (!this.speaking && this.gap <= 0 && this.queue.length) { this.queue.sort((a, b) => b.prio - a.prio); this.speak(this.queue.shift()!, false); return; }
    const m = this.match;
    // vida baja
    for (let i = 0; i < 2; i++) {
      const f = m.f[i];
      if (!this.lowShown[i] && f.hpPct < 0.3 && !m.over) { this.lowShown[i] = true; this.say(1, `A ${f.data.name} le queda muy poca vida. Está contra las cuerdas.`, 2, 'low' + i, 20); }
    }
    // relleno si hay calma
    if (this.quiet > 9 && !m.over && !this.speaking) {
      const [a, b] = m.f;
      const lead = a.hpPct > b.hpPct ? a : b, trail = lead === a ? b : a;
      if (Math.abs(a.hpPct - b.hpPct) > 0.25) this.say(0, pick([`${lead.data.name} domina el combate; ${trail.data.name} necesita reaccionar.`, `Ventaja clara para ${lead.data.name}.`]), 0);
      else this.say(1, pick([`Combate muy igualado, no sabría decir quién ganará.`, `Los dos se estudian, esto es puro ajedrez.`, `Mucha tensión en el ring.`]), 0);
      this.quiet = 5;
    }
  }

  dispose() { this.queue = []; Audio.cancelSpeech(); this.show('', ''); }
}
