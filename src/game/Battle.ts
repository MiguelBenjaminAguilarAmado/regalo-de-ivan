import { Match, type MatchSummary } from '../combat/Match';
import type { ArenaId, Difficulty, FighterData, GameEvent, Input } from '../combat/types';
import { emptyInput } from '../combat/types';
import { AIController } from '../ai/AIController';
import { BattleView } from './BattleView';
import { makeArena } from './Showcase';
import { Audio } from '../audio/Audio';
import type { Game } from './Game';
import { Narrator } from './Narrator';
import { ARENA_INFO } from '../combat/arenaInfo';
import { mutatorById, type MutatorId } from '../combat/mutators';

export interface BattleOpts {
  p: FighterData; // jugador (índice 0)
  c: FighterData; // CPU (índice 1)
  arena: ArenaId;
  difficulty: Difficulty;
  demo?: boolean; // CPU vs CPU sin interfaz (pruebas)
  spectate?: boolean; // modo espectador: CPU vs CPU con cámara de director y narrador
  difficultyP?: Difficulty; // dificultad de la CPU 1 (espectador)
  pPartner?: FighterData; // compañero del jugador (combate por parejas)
  cPartner?: FighterData; // compañero de la CPU
  /** Supervivencia: vida con la que empieza el jugador (puntos) y momentum inicial */
  startHp?: number;
  startMom?: number;
  /** Modo entrenamiento: cómo se comporta el rival (el combate no termina nunca) */
  training?: 'quieto' | 'guardia' | 'ataca';
  /** Modificador de combate (Versus) */
  mutator?: MutatorId;
  /** Historia: límite de tiempo y cómo se decide, jefe con fases, objetivo y consejos que salen durante el combate */
  timeLimit?: number;
  timeMode?: 'hp' | 'player';
  boss?: { at: number; power: number; speed: number; heal: number; text: string };
  objective?: string;
  tips?: string[];
  /** Texto extra en la pantalla VS (p. ej. "SUPERVIVENCIA · RONDA 3") */
  label?: string;
  seed?: number;
}

const STEP = 1 / 60;
const REASON_TEXT = { ko: '¡KO!', pin: '¡PIN!', rendicion: '¡RENDICIÓN!', fuera: '¡CUENTA FUERA!', tiempo: '¡TIEMPO!' } as const;

export class Battle {
  match: Match;
  view: BattleView;
  aiC: { update(dt: number, m: Match): Input };
  aiP: AIController | null;
  phase: 'intro' | 'fight' | 'over' = 'intro';
  paused = false;
  done = false;
  private introT = 0;
  private acc = 0;
  private bannerShown = false;
  summary: MatchSummary | null = null;
  readonly playerIdx = 0;
  narrator: Narrator | null = null;
  private narrStarted = false;
  private tipT = -1;
  private tipI = 0;
  private keyHandler: ((e: KeyboardEvent) => void) | null = null;
  /** Índice del jugador para el HUD (−1 si nadie juega) */
  get hudPlayer() { return this.opts.spectate ? -1 : this.playerIdx; }

  constructor(private game: Game, public opts: BattleOpts) {
    this.match = new Match(opts.p, opts.c, Math.random, ARENA_INFO[opts.arena].rules, [opts.pPartner ?? null, opts.cPartner ?? null]);
    if (opts.startHp != null) this.match.f[0].hp = Math.max(1, Math.min(this.match.f[0].maxHp, opts.startHp));
    if (opts.startMom) this.match.f[0].mom = opts.startMom;
    const arena = makeArena(opts.arena, game.effectiveQuality);
    this.view = new BattleView(game.stage, arena, this.match, {
      message: (t, b) => game.hud.message(t, b),
      flash: (c, a) => game.hud.flash(c, a),
      banner: (t, c) => game.hud.banner(t, c),
      rumble: (st, wk, ms) => game.input.rumble(st, wk, ms),
      combo: (i, n) => game.hud.combo(i, n),
    });
    this.view.cam.shakeScale = game.save.settings.shake ? 1 : 0;
    this.aiC = opts.training === 'quieto' || opts.training === 'guardia'
      ? { update: () => { const i = emptyInput(); i.block = opts.training === 'guardia'; return i; } }
      : new AIController(1, opts.difficulty);
    this.match.training = !!opts.training;
    if (opts.timeLimit) { this.match.timeLimit = opts.timeLimit; this.match.timeMode = opts.timeMode ?? 'hp'; }
    if (opts.boss) this.match.boss = { side: 1, done: false, ...opts.boss };
    const mut = mutatorById(opts.mutator);
    this.match.mod = { dmg: mut.dmg, mom: mut.mom };
    if (mut.hp !== 1) for (const f of [...this.match.f, ...this.match.bench]) if (f) { f.maxHp *= mut.hp; f.hp = f.maxHp; }
    this.aiP = opts.demo || opts.spectate ? new AIController(0, opts.spectate ? (opts.difficultyP ?? opts.difficulty) : 'intermedia') : null;
    this.view.cam.auto = !!opts.spectate;
    if (opts.spectate) {
      this.narrator = new Narrator(this.match, (w, t) => game.hud.subtitle(w, t));
      this.narrator.enabled = true;
      this.keyHandler = (e) => {
        if (this.paused || this.phase === 'over') return;
        if (e.code === 'KeyC') this.spectateAction('cut');
        else if (e.code === 'KeyN') this.spectateAction('narrator');
      };
      window.addEventListener('keydown', this.keyHandler);
    }
    game.input.enabled = false;
    game.input.reset();
    game.hud.show(this.match, this.hudPlayer, opts.spectate ? game.spectateHint() : game.controlsHint(!!opts.pPartner), game.save.settings.fps);
    const interactive = !opts.demo && !opts.spectate;
    game.touch.show(game.useTouch && interactive);
    game.touch.setTag(!!opts.pPartner);
    document.body.classList.toggle('touch-mode', game.useTouch && interactive);
    Audio.music(ARENA_INFO[opts.arena].music);
    Audio.setCrowd(0.3);
  }

  /** Avanza un frame. `dt` en segundos reales. */
  update(dt: number) {
    if (this.paused) { this.view.sync(0); return; }
    const m = this.match;
    const simDt = this.view.step(dt);

    if (this.phase === 'intro') {
      this.introT += dt;
      if (!this.narrStarted && this.narrator && this.introT > 0.5) { this.narrStarted = true; this.narrator.start(ARENA_INFO[this.opts.arena].name); }
      if (this.introT > 2.7) {
        this.phase = 'fight';
        this.game.input.enabled = !this.opts.demo && !this.opts.spectate;
        Audio.sfx('bell');
        this.game.hud.banner('¡LUCHA!', '#e7b53b');
        if (this.opts.objective) this.game.hud.message('OBJETIVO: ' + this.opts.objective, true);
        this.tipT = 6;
        this.view.excite = 0.7; Audio.cheer(1.5);
      }
    } else {
      if (this.opts.tips && this.tipT >= 0 && this.tipI < this.opts.tips.length && !this.paused) {
        this.tipT -= dt;
        if (this.tipT <= 0) { this.game.hud.message('💡 ' + this.opts.tips[this.tipI++]); this.tipT = 9; }
      }
      this.acc += simDt;
      const events: GameEvent[] = [];
      let steps = 0;
      let pInput: Input = emptyInput();
      let sampled = false;
      while (this.acc >= STEP && steps < 6) {
        // La entrada se lee SOLO cuando va a avanzar la simulación (si no, se perderían pulsaciones)
        if (!sampled && this.phase === 'fight' && !this.opts.demo && !this.opts.spectate) {
          pInput = this.game.input.sample(this.view.cam);
          sampled = true;
        } else if (sampled) {
          pInput = { ...pInput, light: false, heavy: false, grab: false, taunt: false, finisher: false };
        }
        const a = this.aiP ? this.aiP.update(STEP, m) : pInput;
        const b = this.aiC.update(STEP, m);
        m.update(STEP, [a, b]);
        if (this.opts.training) for (const f of m.f) if (f.hp < f.maxHp * 0.25) f.hp = f.maxHp; // en el entrenamiento nadie cae
        this.acc -= STEP; steps++;
        for (const e of m.events) events.push(e);
        m.events.length = 0;
      }
      if (steps === 6) this.acc = 0;
      if (events.length) {
        this.view.handle(events);
        this.narrator?.handle(events);
        for (const e of events) if (e.type === 'end') this.onEnd(e.winner, e.reason);
      }
      this.game.touch.setReady(m.f[this.playerIdx].mom >= 100 && !m.over);
      if (m.over) {
        this.phase = 'over';
        this.game.input.enabled = false;
        this.game.touch.show(false);
        if (m.endT > 5.2 && !this.done) {
          this.done = true;
          this.summary = m.summary();
          this.game.onBattleEnd(this);
        }
      }
    }
    this.narrator?.update(dt);
    this.view.sync(dt);
    this.game.hud.update(dt, m, this.hudPlayer, dt);
  }

  private onEnd(winner: number, reason: keyof typeof REASON_TEXT) {
    if (this.bannerShown) return;
    this.bannerShown = true;
    const w = this.match.f[winner].data.name;
    const fired = this.match.f[1 - winner].banned;
    const text = fired ? '¡DESPEDIDO!' : REASON_TEXT[reason];
    this.game.hud.banner(text, '#e7b53b');
    this.game.hud.message(`Gana ${w}`, true);
    this.game.hud.clearCount();
    if (winner === this.playerIdx || this.opts.spectate) { Audio.sfx('win'); } else Audio.sfx('foul');
  }

  setPaused(v: boolean) {
    this.paused = v;
    this.game.input.enabled = !v && this.phase === 'fight' && !this.opts.demo && !this.opts.spectate;
    this.game.input.reset();
  }

  /** Acciones del modo espectador (teclado C/N o mando) */
  spectateAction(a: 'cut' | 'narrator') {
    if (!this.opts.spectate) return;
    if (a === 'cut') this.view.cam.cut();
    else if (this.narrator) { this.narrator.enabled = !this.narrator.enabled; this.game.hud.message(this.narrator.enabled ? 'Narrador activado' : 'Narrador desactivado'); if (!this.narrator.enabled) { Audio.cancelSpeech(); this.game.hud.subtitle('', ''); } }
  }

  dispose() {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.narrator?.dispose();
    this.view.dispose();
    this.game.input.enabled = false;
    this.game.hud.hide();
    this.game.touch.show(false);
    document.body.classList.remove('touch-mode');
  }
}
