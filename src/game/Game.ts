import type { ArenaId, Difficulty, FighterData } from '../combat/types';
import { ROSTER, fighterById } from '../content/roster';
import { getLines } from '../content/dialogues';
import { Stage, isTouchDevice } from '../render/Stage';
import { InputManager } from '../input/InputManager';
import { HUD } from '../ui/HUD';
import { TouchControls } from '../ui/TouchControls';
import { Screens } from '../ui/Screens';
import { Showcase } from './Showcase';
import { PadNav, type PadAction } from '../input/PadNav';
import { el } from '../ui/dom';
import { Battle, type BattleOpts } from './Battle';
import { Audio } from '../audio/Audio';
import { loadSave, writeSave, type SaveData } from '../progress/Save';
import { ACHIEVEMENTS, applyResult, isUnlocked } from '../progress/Achievements';
import { advance, arenaForRound, createBracket, opponentOf, type Bracket } from '../modes/Tournament';
import { simulateMatch } from '../modes/simulate';
import type { Quality } from '../arenas/Arena';

export interface SpectateSetup { a: string; b: string; arena: ArenaId | 'random'; difficulty: Difficulty }
export interface VersusSetup { player: string; cpu: string; arena: ArenaId | 'random'; difficulty: Difficulty }

export interface ResultInfo {
  won: boolean;
  spectate?: boolean;
  winner: FighterData; loser: FighterData;
  reasonText: string;
  time: number;
  damage: { dealt: number; taken: number };
  quotes: { who: FighterData | null; text: string }[];
  newAchievements: { name: string; desc: string }[];
  unlocked: FighterData[];
}

export class Game {
  stage: Stage;
  input: InputManager;
  hud: HUD;
  touch: TouchControls;
  screens: Screens;
  save: SaveData = loadSave();
  roster = ROSTER;
  showcase: Showcase | null = null;
  battle: Battle | null = null;
  tour: { bracket: Bracket; difficulty: Difficulty; arena: ArenaId } | null = null;
  lastVersus: VersusSetup | null = null;
  mode: 'versus' | 'torneo' | 'espectador' = 'versus';
  lastSpectate: SpectateSetup | null = null;
  padNav: PadNav;
  private last = 0;
  private perf = { t: 0, n: 0, low: 0, high: 0, dprScale: 1 };

  constructor(private canvas: HTMLCanvasElement, private ui: HTMLElement) {
    this.stage = new Stage(canvas, this.effectiveQuality);
    this.input = new InputManager(ui);
    this.hud = new HUD(ui);
    this.touch = new TouchControls(ui, this.input);
    this.screens = new Screens(ui, this);
    this.padNav = new PadNav((a) => this.onPad(a));
    window.addEventListener('gamepadconnected', (e) => { this.toast('🎮 Mando conectado: ' + (e as GamepadEvent).gamepad.id.split('(')[0].trim().slice(0, 40)); });
    window.addEventListener('gamepaddisconnected', () => { this.toast('Mando desconectado'); this.autoPause(); });
    this.input.onPause = () => this.togglePause();
    this.hud.pauseBtn.addEventListener('click', () => this.togglePause());
    Audio.setVolumes(this.save.settings.master, this.save.settings.music, this.save.settings.sfx);
    Audio.vol.voice = this.save.settings.voice;
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.autoPause(); });
  }

  // ---------------------------------------------------------------- ajustes
  get useTouch() { const t = this.save.settings.touch; return t === 'on' || (t === 'auto' && isTouchDevice()); }
  get effectiveQuality(): Quality {
    const q = this.save.settings.quality;
    if (q !== 'auto') return q;
    return isTouchDevice() ? 'media' : 'alta';
  }
  isUnlocked(f: FighterData) { return isUnlocked(this.save, f); }
  commitSettings() {
    writeSave(this.save);
    const s = this.save.settings;
    Audio.setVolumes(s.master, s.music, s.sfx);
    Audio.vol.voice = s.voice;
    if (this.stage.quality !== this.effectiveQuality) this.stage.setQuality(this.effectiveQuality);
    if (this.battle) this.battle.view.cam.shakeScale = s.shake ? 1 : 0;
  }
  /** Aviso flotante breve */
  toast(text: string) {
    const t = el('div', { class: 'toast' }, text);
    this.ui.appendChild(t);
    setTimeout(() => t.classList.add('out'), 2300);
    setTimeout(() => t.remove(), 2800);
  }
  spectateHint() {
    return this.input.padConnected
      ? '<b>A</b> cambiar cámara · <b>Y</b> narrador sí/no · <b>Start</b> pausa'
      : '<b>C</b> cambia de cámara · <b>N</b> narrador sí/no · <b>Esc</b> pausa';
  }
  controlsHint() {
    if (this.input.padConnected && !this.useTouch) return '<b>Stick / cruceta</b> mover · <b>A</b> golpe · <b>X</b> fuerte · <b>B</b> agarre (y pin) · <b>LB / LT</b> guardia · <b>RT</b> correr · <b>Y</b> burla · <b>RB</b> finisher · <b>Start</b> pausa';
    if (this.useTouch) return '<b>Joystick</b> mover (a tope = correr) · <b>GOLPE / FUERTE</b> · <b>AGARRE</b> llaves y pin · <b>GUARDIA</b> mantén · toca justo antes del golpe para <b>contraatacar</b>';
    return '<b>WASD</b> mover · <b>J</b> / clic izq. golpe · <b>K</b> / clic der. fuerte · <b>L</b> agarre (también pin) · <b>Espacio</b> guardia · <b>Shift</b> correr · <b>E</b> burla · <b>F</b> finisher';
  }

  // ---------------------------------------------------------------- arranque
  async boot() {
    const q = new URLSearchParams(location.search);
    const qq = q.get('q');
    if (qq === 'baja' || qq === 'media' || qq === 'alta') { this.save.settings.quality = qq; this.stage.setQuality(qq); }
    if (q.get('pose')) { const { startPoseViewer } = await import('./PoseViewer'); startPoseViewer(this.stage, q); return; }
    this.openShowcase('matamoros');
    requestAnimationFrame((t) => this.frame(t));
    const auto = q.get('auto');
    if (auto) {
      Audio.init();
      const [a, b, arena, diff] = auto.split(',');
      this.startBattle({ p: fighterById(a ?? 'elso'), c: fighterById(b ?? 'petisui'), arena: (arena as ArenaId) ?? 'matamoros', difficulty: (diff as Difficulty) ?? 'intermedia', demo: q.get('demo') === '1' });
      return;
    }
    this.screens.showTitle();
  }

  openShowcase(arena: ArenaId = 'matamoros') {
    this.showcase?.dispose();
    this.showcase = new Showcase(this.stage, arena, this.effectiveQuality === 'alta' ? 'media' : this.effectiveQuality);
  }

  goMenu() {
    if (this.battle) { this.battle.dispose(); this.battle = null; }
    if (!this.showcase) this.openShowcase('matamoros');
    this.showcase!.setFighter(0, null); this.showcase!.setFighter(1, null);
    this.tour = null;
    Audio.music('menu');
    this.screens.showMenu();
  }

  // ---------------------------------------------------------------- flujo de combates
  startVersus(s: VersusSetup) {
    this.mode = 'versus';
    this.tour = null;
    this.lastVersus = s;
    const arena: ArenaId = s.arena === 'random' ? (Math.random() < 0.5 ? 'matamoros' : 'manchester') : s.arena;
    this.prepareFight({ p: fighterById(s.player), c: fighterById(s.cpu), arena, difficulty: s.difficulty });
  }

  /** Modo espectador: dos CPUs luchan con cámara de director y narrador */
  startSpectate(s: SpectateSetup) {
    this.mode = 'espectador';
    this.tour = null;
    this.lastSpectate = s;
    const arena: ArenaId = s.arena === 'random' ? (Math.random() < 0.5 ? 'matamoros' : 'manchester') : s.arena;
    this.prepareFight({ p: fighterById(s.a), c: fighterById(s.b), arena, difficulty: s.difficulty, spectate: true });
  }

  startTournament(playerId: string, difficulty: Difficulty) {
    this.mode = 'torneo';
    const bracket = createBracket(playerId, this.roster.map((r) => r.id));
    this.tour = { bracket, difficulty, arena: arenaForRound(bracket, 0) };
    this.screens.showBracket(bracket, difficulty, () => this.playTourRound(), () => this.goMenu());
  }

  private playTourRound() {
    const t = this.tour!;
    const b = t.bracket;
    const arena = arenaForRound(b, b.round);
    this.prepareFight({ p: fighterById(b.playerId), c: fighterById(opponentOf(b)), arena, difficulty: t.difficulty });
  }

  /** Diálogo previo (si existe) → pantalla VS → combate */
  prepareFight(opts: BattleOpts) {
    const lines = getLines('pre', opts.p.id, opts.c.id);
    const go = () => this.screens.showVS(opts.p, opts.c, opts.arena, opts.difficulty, () => this.startBattle(opts), !!opts.spectate);
    if (lines.length) this.screens.showDialogue(lines, opts.p, opts.c, go); else go();
  }

  startBattle(opts: BattleOpts) {
    this.screens.clear();
    this.showcase?.dispose(); this.showcase = null;
    this.battle?.dispose();
    this.battle = new Battle(this, opts);
  }

  togglePause() {
    const b = this.battle;
    if (!b || b.phase === 'intro' || b.phase === 'over' || b.opts.demo) return;
    if (b.paused) { this.screens.hidePause(); b.setPaused(false); this.padNav.settle(); return; }
    b.setPaused(true);
    this.padNav.settle(); // la pulsación que abre la pausa no debe cerrarla
    this.screens.showPause(
      () => { this.screens.hidePause(); b.setPaused(false); this.padNav.settle(); },
      () => { this.screens.hidePause(); this.goMenu(); },
    );
  }
  private autoPause() { const b = this.battle; if (b && b.phase === 'fight' && !b.paused && !b.opts.demo) this.togglePause(); }

  /** Mando: acciones de menú y de espectador */
  private onPad(a: PadAction) {
    if (this.screens.isOpen()) { this.screens.pad(a); return; }
    const b = this.battle;
    if (b && b.opts.spectate && b.phase !== 'intro') {
      if (a === 'start') this.togglePause();
      else if (a === 'confirm') b.spectateAction('cut');
      else if (a === 'y') b.spectateAction('narrator');
    }
  }

  // ---------------------------------------------------------------- resultados
  onBattleEnd(b: Battle) {
    const s = b.summary!;
    const o = b.opts;
    if (o.spectate) { this.onSpectateEnd(b); return; }
    const won = s.winner === 0;
    const before = new Set(this.roster.filter((f) => this.isUnlocked(f)).map((f) => f.id));
    let tournamentWon = false;
    if (this.mode === 'torneo' && this.tour) {
      const diff = this.tour.difficulty;
      advance(this.tour.bracket, won, (x, y) => (simulateMatch(fighterById(x), fighterById(y), diff).winner === 0 ? x : y));
      tournamentWon = this.tour.bracket.champion === this.tour.bracket.playerId;
    }
    const got = applyResult(this.save, { summary: s, player: 0, playerData: o.p, mode: this.mode, difficulty: o.difficulty, tournamentWon });
    writeSave(this.save);
    const unlocked = this.roster.filter((f) => !before.has(f.id) && this.isUnlocked(f));
    const winner = won ? o.p : o.c, loser = won ? o.c : o.p;
    const quotes = getLines('victoria', o.p.id, o.c.id, winner.id).map((l) => ({ who: this.roster.find((r) => r.id === l.who) ?? null, text: l.text }));
    if (tournamentWon) {
      for (const l of getLines('campeon', o.p.id, o.c.id, o.p.id)) quotes.push({ who: this.roster.find((r) => r.id === l.who) ?? null, text: l.text });
    }
    const reasonText = (s.fired ? 'Despedido por Pablo Motos' : { ko: 'Por KO', pin: 'Por pin', rendicion: 'Por rendición', fuera: 'Por cuenta fuera del ring' }[s.reason]);
    const info: ResultInfo = {
      won, winner, loser, reasonText, time: s.time,
      damage: { dealt: s.damageTaken[1], taken: s.damageTaken[0] },
      quotes,
      newAchievements: got.map((id) => ACHIEVEMENTS.find((a) => a.id === id)!).filter(Boolean),
      unlocked,
    };
    if (got.length || unlocked.length) Audio.sfx('unlock');

    this.hud.hide();
    // botones según el modo
    const rematch = () => { if (this.mode === 'versus' && this.lastVersus) this.startVersus(this.lastVersus); };
    if (this.mode === 'torneo' && this.tour) {
      const t = this.tour;
      this.screens.showResults(info, [
        { label: t.bracket.champion || t.bracket.eliminated ? 'Ver cuadro' : 'Continuar', primary: true, action: () => this.afterTourResult() },
      ]);
    } else {
      this.screens.showResults(info, [
        { label: 'Revancha', primary: true, action: rematch },
        { label: 'Cambiar luchadores', action: () => { this.goMenu(); this.screens.showVersusSetup(); } },
        { label: 'Menú principal', action: () => this.goMenu() },
      ]);
    }
  }

  private onSpectateEnd(b: Battle) {
    const s = b.summary!, o = b.opts;
    this.hud.hide();
    const winner = s.winner === 0 ? o.p : o.c, loser = s.winner === 0 ? o.c : o.p;
    const quotes = getLines('victoria', o.p.id, o.c.id, winner.id).map((l) => ({ who: this.roster.find((r) => r.id === l.who) ?? null, text: l.text }));
    const reasonText = s.fired ? `${winner.name} despide a ${loser.name}` : { ko: 'Por KO', pin: 'Por pin', rendicion: 'Por rendición', fuera: 'Por cuenta fuera del ring' }[s.reason];
    const info: ResultInfo = {
      won: true, spectate: true, winner, loser, reasonText, time: s.time,
      damage: { dealt: s.damageTaken[1], taken: s.damageTaken[0] }, quotes, newAchievements: [], unlocked: [],
    };
    this.screens.showResults(info, [
      { label: 'Otro combate igual', primary: true, action: () => { if (this.lastSpectate) this.startSpectate(this.lastSpectate); } },
      { label: 'Cambiar luchadores', action: () => { this.goMenu(); this.screens.showSpectateSetup(); } },
      { label: 'Menú principal', action: () => this.goMenu() },
    ]);
  }

  private afterTourResult() {
    const t = this.tour!;
    this.battle?.dispose(); this.battle = null;
    if (!this.showcase) this.openShowcase('matamoros');
    Audio.music('menu');
    this.screens.showBracket(t.bracket, t.difficulty, () => this.playTourRound(), () => this.goMenu(), () => this.startTournament(t.bracket.playerId, t.difficulty));
  }

  // ---------------------------------------------------------------- bucle
  private frame = (ts: number) => {
    const dt = Math.min(0.05, (ts - this.last) / 1000 || 0.016);
    this.last = ts;
    if (this.battle) this.battle.update(dt);
    else if (this.showcase) { this.showcase.update(dt); Audio.tickCrowd(dt); }
    const spectating = !!(this.battle?.opts.spectate && !this.battle.paused);
    this.padNav.update(dt, this.screens.isOpen() || spectating);
    this.stage.render();
    this.watchPerf(dt);
    requestAnimationFrame(this.frame);
  };

  /** Resolución dinámica: baja la escala si no llegamos a los fps objetivo. */
  private watchPerf(dt: number) {
    const p = this.perf;
    p.t += dt; p.n++;
    if (p.t < 1.5) return;
    const fps = p.n / p.t;
    p.t = 0; p.n = 0;
    const target = this.useTouch ? 28 : 52;
    if (fps < target) { p.low++; p.high = 0; } else if (fps > target + 14) { p.high++; p.low = 0; } else { p.low = 0; p.high = 0; }
    if (p.low >= 2 && p.dprScale > 0.55) { p.dprScale = Math.max(0.55, p.dprScale - 0.15); this.applyDpr(); p.low = 0; }
    else if (p.high >= 4 && p.dprScale < 1) { p.dprScale = Math.min(1, p.dprScale + 0.1); this.applyDpr(); p.high = 0; }
  }
  private applyDpr() {
    const q = this.effectiveQuality;
    const base = Math.min(window.devicePixelRatio || 1, q === 'baja' ? 1 : q === 'media' ? 1.5 : 2);
    this.stage.renderer.setPixelRatio(base * this.perf.dprScale);
    this.stage.resize();
  }
}
