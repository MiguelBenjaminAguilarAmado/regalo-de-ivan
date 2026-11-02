import { Match, type MatchSummary } from '../combat/Match';
import type { ArenaId, Difficulty, FighterData, GameEvent, Input } from '../combat/types';
import { emptyInput } from '../combat/types';
import { AIController } from '../ai/AIController';
import { BattleView } from './BattleView';
import { makeArena } from './Showcase';
import { Audio } from '../audio/Audio';
import type { Game } from './Game';
import { Narrator } from './Narrator';

export interface BattleOpts {
  p: FighterData; // jugador (índice 0)
  c: FighterData; // CPU (índice 1)
  arena: ArenaId;
  difficulty: Difficulty;
  demo?: boolean; // CPU vs CPU sin interfaz (pruebas)
  spectate?: boolean; // modo espectador: CPU vs CPU con cámara de director y narrador
  difficultyP?: Difficulty; // dificultad de la CPU 1 (espectador)
  seed?: number;
}

const STEP = 1 / 60;
const REASON_TEXT = { ko: '¡KO!', pin: '¡PIN!', rendicion: '¡RENDICIÓN!', fuera: '¡CUENTA FUERA!' } as const;

export class Battle {
  match: Match;
  view: BattleView;
  aiC: AIController;
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
  private keyHandler: ((e: KeyboardEvent) => void) | null = null;
  /** Índice del jugador para el HUD (−1 si nadie juega) */
  get hudPlayer() { return this.opts.spectate ? -1 : this.playerIdx; }

  constructor(private game: Game, public opts: BattleOpts) {
    this.match = new Match(opts.p, opts.c);
    const arena = makeArena(opts.arena, game.effectiveQuality);
    this.view = new BattleView(game.stage, arena, this.match, {
      message: (t, b) => game.hud.message(t, b),
      flash: (c, a) => game.hud.flash(c, a),
      banner: (t, c) => game.hud.banner(t, c),
      rumble: (st, wk, ms) => game.input.rumble(st, wk, ms),
    });
    this.view.cam.shakeScale = game.save.settings.shake ? 1 : 0;
    this.aiC = new AIController(1, opts.difficulty);
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
    game.hud.show(this.match, this.hudPlayer, opts.spectate ? game.spectateHint() : game.controlsHint(), game.save.settings.fps);
    const interactive = !opts.demo && !opts.spectate;
    game.touch.show(game.useTouch && interactive);
    document.body.classList.toggle('touch-mode', game.useTouch && interactive);
    Audio.music(opts.arena === 'manchester' ? 'manchester' : 'matamoros');
    Audio.setCrowd(0.3);
  }

  /** Avanza un frame. `dt` en segundos reales. */
  update(dt: number) {
    if (this.paused) { this.view.sync(0); return; }
    const m = this.match;
    const simDt = this.view.step(dt);

    if (this.phase === 'intro') {
      this.introT += dt;
      if (!this.narrStarted && this.narrator && this.introT > 0.5) { this.narrStarted = true; this.narrator.start(this.opts.arena === 'manchester' ? 'Manchester' : 'Matamoros'); }
      if (this.introT > 2.7) {
        this.phase = 'fight';
        this.game.input.enabled = !this.opts.demo && !this.opts.spectate;
        Audio.sfx('bell');
        this.game.hud.banner('¡LUCHA!', '#e7b53b');
        this.view.excite = 0.7; Audio.cheer(1.5);
      }
    } else {
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
