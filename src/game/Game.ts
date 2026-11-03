import type { ArenaId, Difficulty, FighterData } from '../combat/types';
import { ARENA_IDS } from '../combat/arenaInfo';
import { ROSTER, fighterById } from '../content/roster';
import { getLines } from '../content/dialogues';
import { Stage, isTouchDevice } from '../render/Stage';
import { InputManager } from '../input/InputManager';
import { HUD } from '../ui/HUD';
import { TouchControls } from '../ui/TouchControls';
import { Screens } from '../ui/Screens';
import { Showcase } from './Showcase';
import { PadNav, type PadAction } from '../input/PadNav';
import { setPadMode } from '../input/glyphs';
import { el } from '../ui/dom';
import { Battle, type BattleOpts } from './Battle';
import { Audio } from '../audio/Audio';
import { loadSave, writeSave, type SaveData } from '../progress/Save';
import { ACHIEVEMENTS, applyResult, applyStreak, isUnlocked } from '../progress/Achievements';
import type { MutatorId } from '../combat/mutators';
import { duoOf } from '../content/duos';
import { CHAPTERS, ENDINGS } from '../../content/historia';
import { WorldController } from '../world/WorldController';
import { ITEMS } from '../../content/mundo';
import { applyBonus, bonusOf } from '../modes/World';
import { setChemaHook } from '../content/roster';
import { applyChoice, completeChapter, fightsFor, newProgress, nextChapter, scenesFor, type StoryChapter, type StoryFight } from '../modes/Story';
import { applyPerks, isBoss, pickOpponent, pickPerks, perkById, scaleOpponent, startMomentum, survivalDifficulty } from '../modes/Survival';
import { advance, arenaForRound, createBracket, opponentOf, teamOf, TOURS, type Bracket, type TourKind } from '../modes/Tournament';
import { simulateMatch } from '../modes/simulate';
import type { Quality } from '../arenas/Arena';

/** Capítulo de la historia en curso */
export interface StoryRun { chapter: StoryChapter; fights: StoryFight[]; fi: number; hp: number | null; hpBefore: number | null; partner?: string; skipFirstBefore?: boolean }

/** Una racha del modo Supervivencia */
export interface SurvivalRun { player: string; skin?: string; wins: number; hp: number; perks: string[]; used: string[]; opp: string }

/** Datos con los que se creó un torneo (para reintentarlo) */
export interface TourSetup { kind: TourKind; player: string; partner?: string; skin?: string; partnerSkin?: string; difficulty: Difficulty }
export interface TrainingSetup { player: string; playerSkin?: string; cpu: string; cpuSkin?: string; arena: ArenaId | 'random'; behaviour: 'quieto' | 'guardia' | 'ataca' }
export interface SpectateSetup { a: string; b: string; aSkin?: string; bSkin?: string; arena: ArenaId | 'random'; difficulty: Difficulty }
export interface VersusSetup { player: string; cpu: string; playerSkin?: string; cpuSkin?: string; partner?: string; partnerSkin?: string; cpuPartner?: string; cpuPartnerSkin?: string; arena: ArenaId | 'random'; difficulty: Difficulty; mutator?: MutatorId }

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
  tour: { bracket: Bracket; difficulty: Difficulty; arena: ArenaId; setup: TourSetup } | null = null;
  lastVersus: VersusSetup | null = null;
  mode: 'versus' | 'torneo' | 'espectador' | 'supervivencia' | 'historia' | 'mundo' = 'versus';
  story: StoryRun | null = null;
  /** Mundo abierto (la ciudad de Hoyo) */
  world: WorldController;
  /** Si el capítulo en curso se empezó desde el mundo abierto, al acabar se vuelve a él */
  storyReturn: 'mundo' | null = null;
  surv: SurvivalRun | null = null;
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
    this.world = new WorldController(this, ui);
    // el gimnasio y el equipo del mundo abierto mejoran a Chema en todos los modos
    setChemaHook((f) => (this.save.world ? { ...f, fullStats: applyBonus(f.fullStats, bonusOf(this.save.world, ITEMS)) } : f));
    this.padNav = new PadNav((a) => this.onPad(a));
    this.padNav.onActivity = () => { this.input.lastDevice = 'mando'; };
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
  controlsHint(tag = false) {
    const t = tag ? (this.input.padConnected && !this.useTouch ? ' · <b>Select</b> relevo' : ' · <b>R</b> relevo') : '';
    if (this.input.padConnected && !this.useTouch) return '<b>Stick / cruceta</b> mover · <b>A</b> golpe · <b>X</b> fuerte · <b>B</b> agarre (y pin) · <b>LB / LT</b> guardia · <b>RT</b> correr · <b>Y</b> burla · <b>RB</b> finisher · <b>Start</b> pausa' + t;
    if (this.useTouch) return '<b>Joystick</b> mover (a tope = correr) · <b>GOLPE / FUERTE</b> · <b>AGARRE</b> llaves y pin · <b>GUARDIA</b> mantén · toca justo antes del golpe para <b>contraatacar</b>' + (tag ? ' · <b>RELEVO</b> cambia de compañero' : '');
    return '<b>WASD</b> mover · <b>J</b> / clic izq. golpe · <b>K</b> / clic der. fuerte · <b>L</b> agarre (también pin) · <b>Espacio</b> guardia · <b>Shift</b> correr · <b>E</b> burla · <b>F</b> finisher' + t;
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
    if (this.world.active) this.world.leave(true);
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
    const arena: ArenaId = s.arena === 'random' ? ARENA_IDS[Math.floor(Math.random() * ARENA_IDS.length)] : s.arena;
    const pPartner = s.partner ? fighterById(s.partner, s.partnerSkin) : undefined;
    const cPartner = s.cpuPartner ? fighterById(s.cpuPartner, s.cpuPartnerSkin) : undefined;
    const duo = duoOf(s.player, s.partner);
    this.prepareFight({ p: fighterById(s.player, s.playerSkin), c: fighterById(s.cpu, s.cpuSkin), pPartner, cPartner, arena, difficulty: s.difficulty, mutator: s.mutator, label: duo ? '★ DÚO DINÁMICO: ' + duo.name.toUpperCase() : s.mutator && s.mutator !== 'ninguno' ? 'MODIFICADOR: ' + s.mutator.toUpperCase() : undefined });
  }

  /** Entrenamiento: practica contra un rival que no puede ganarte */
  startTraining(s: TrainingSetup) {
    this.mode = 'versus';
    this.tour = null;
    const arena: ArenaId = s.arena === 'random' ? ARENA_IDS[Math.floor(Math.random() * ARENA_IDS.length)] : s.arena;
    this.startBattle({ p: fighterById(s.player, s.playerSkin), c: fighterById(s.cpu, s.cpuSkin), arena, difficulty: 'facil', training: s.behaviour });
  }

  /** Modo espectador: dos CPUs luchan con cámara de director y narrador */
  startSpectate(s: SpectateSetup) {
    this.mode = 'espectador';
    this.tour = null;
    this.lastSpectate = s;
    const arena: ArenaId = s.arena === 'random' ? ARENA_IDS[Math.floor(Math.random() * ARENA_IDS.length)] : s.arena;
    this.prepareFight({ p: fighterById(s.a, s.aSkin), c: fighterById(s.b, s.bSkin), arena, difficulty: s.difficulty, spectate: true });
  }

  startTournament(setup: TourSetup) {
    this.mode = 'torneo';
    // solo los luchadores de verdad (si no hay suficientes, también los provisionales)
    const real = this.roster.filter((r) => ((!r.placeholder && this.isUnlocked(r)) || r.id === setup.player || r.id === setup.partner)).map((r) => r.id);
    const bracket = createBracket(setup.player, real.length >= (TOURS[setup.kind].tag ? 8 : 8) ? real : this.roster.map((r) => r.id), Math.random, undefined, { kind: setup.kind, partnerId: setup.partner });
    this.tour = { bracket, difficulty: setup.difficulty, arena: arenaForRound(bracket, 0), setup };
    this.screens.showBracket(bracket, setup.difficulty, () => this.playTourRound(), () => this.goMenu());
  }

  // ---------------------------------------------------------------- historia
  private storyProgress() { return this.save.story ?? newProgress(); }
  private saveStory(p: ReturnType<Game['storyProgress']>) { this.save.story = p; writeSave(this.save); }

  /** Empieza (o repite) un capítulo: escenas de introducción → combates → escenas finales */
  startChapter(id: string, _opts: { returnTo?: 'mundo' } = {}) {
    const ch = CHAPTERS.find((c) => c.id === id);
    if (!ch) return;
    // la historia vive en Hoyo: al acabar (o al salir) siempre se vuelve a la ciudad
    this.storyReturn = 'mundo';
    this.mode = 'historia';
    this.tour = null; this.surv = null;
    const flags = () => this.storyProgress().flags;
    this.story = { chapter: ch, fights: fightsFor(ch, flags()), fi: 0, hp: null, hpBefore: null };
    Audio.music('menu');
    this.screens.showStoryScenes(scenesFor(ch.intro, flags()), flags, (c) => this.saveStory(applyChoice(this.storyProgress(), c)), () => this.storyFight());
  }

  /** Combates de un capítulo cuya introducción ya se ha visto en la calle (WorldController.startChapter) */
  startChapterFights(id: string) {
    const ch = CHAPTERS.find((c) => c.id === id);
    if (!ch) return;
    this.storyReturn = 'mundo';
    this.mode = 'historia';
    this.tour = null; this.surv = null;
    this.story = { chapter: ch, fights: fightsFor(ch, this.storyProgress().flags), fi: 0, hp: null, hpBefore: null, skipFirstBefore: true };
    if (!this.showcase) this.openShowcase(ch.arena);
    this.storyFight();
  }

  /** Marca un capítulo como completado (banderas, logros); devuelve el texto de la recompensa si es la primera vez */
  completeStoryChapter(ch: StoryChapter): string | null {
    const first = !this.storyProgress().done.includes(ch.id);
    const p = completeChapter(this.storyProgress(), ch);
    this.save.story = p;
    let rewardText: string | null = null;
    if (first && ch.rewards) {
      for (const a of ch.rewards.achievements ?? []) if (!this.save.achievements[a]) this.save.achievements[a] = Date.now();
      rewardText = ch.rewards.text;
    }
    writeSave(this.save);
    return rewardText;
  }

  /** Tras ver el final en la calle: lo guarda y enseña la pantalla de FIN; luego, de vuelta a Hoyo */
  finishEnding(endId: string) {
    const ending = ENDINGS.find((e) => e.id === endId) ?? ENDINGS[0];
    const cur = this.storyProgress();
    const isNew = !cur.endings.includes(ending.id);
    const next = { ...cur, endings: isNew ? [...cur.endings, ending.id] : cur.endings };
    this.save.story = next;
    for (const a of ['historia', 'final_' + ending.id]) if (!this.save.achievements[a]) this.save.achievements[a] = Date.now();
    writeSave(this.save);
    this.mode = 'historia';
    if (!this.showcase) this.openShowcase('ascensor');
    Audio.music('menu');
    this.screens.showStoryTheEnd(ending, isNew, next.endings.length, ENDINGS.length, () => this.world.enter({ then: () => this.world.afterChapter('final') }));
  }

  /** Datos de Chema con su traje elegido */
  private chema() { return fighterById('chema', this.save.skins?.['chema']); }

  private storyFight() {
    const run = this.story!;
    const fight = run.fights[run.fi];
    if (!fight) { this.storyChapterWon(); return; }
    const go = () => {
      // compañero a elegir
      if (fight.partner === 'elegir' && !run.partner) {
        const options = this.roster.filter((f) => !f.placeholder && this.isUnlocked(f) && f.id !== 'chema' && f.id !== fight.opponent && f.id !== fight.opponentPartner).map((f) => f.id);
        this.screens.showStoryPartnerPick(options, (id) => { run.partner = id; this.saveStory(applyChoice(this.storyProgress(), { text: '', set: { partner: id } })); go(); });
        return;
      }
      run.hpBefore = run.hp;
      const opts = this.storyOpts(run, fight);
      this.screens.showVS(opts.p, opts.c, opts.arena, opts.difficulty, () => this.startBattle(opts), false, opts.pPartner, opts.cPartner, opts.label);
    };
    const flags = () => this.storyProgress().flags;
    const skip = run.fi === 0 && run.skipFirstBefore;
    const before = skip ? [] : scenesFor(fight.before ?? [], flags());
    if (before.length) this.screens.showStoryScenes(before, flags, (c) => this.saveStory(applyChoice(this.storyProgress(), c)), go); else go();
  }

  private storyOpts(run: StoryRun, f: StoryFight): BattleOpts {
    let c = fighterById(f.opponent, f.opponentSkin);
    if (f.handicap) c = { ...c, fullStats: { ...c.fullStats, health: c.fullStats.health * f.handicap.hp, power: c.fullStats.power * f.handicap.power } };
    const p = this.chema();
    const partnerId = f.partner === 'elegir' ? run.partner : f.partner;
    const pPartner = partnerId ? fighterById(partnerId) : undefined;
    const cPartner = f.opponentPartner ? fighterById(f.opponentPartner) : undefined;
    const n = run.fights.length;
    const duo = duoOf(p.id, pPartner?.id);
    return {
      p, c, pPartner, cPartner, arena: f.arena, difficulty: f.difficulty,
      objective: f.objective, tips: f.tips, timeLimit: f.timeLimit, timeMode: f.timeMode, boss: f.boss,
      startHp: run.hp ?? undefined,
      label: `HISTORIA · ${run.chapter.title.toUpperCase()}${n > 1 ? ` · COMBATE ${run.fi + 1}/${n}` : ''}${duo ? ' · ★ ' + duo.name.toUpperCase() : ''}`,
    };
  }

  private storyAfterBattle(won: boolean, hpPct: number, info: ResultInfo) {
    const run = this.story!;
    const maxHp = this.chema().fullStats.health;
    if (!won) {
      this.screens.showResults(info, [
        { label: 'Reintentar combate', primary: true, action: () => { run.hp = run.hpBefore; this.storyFight(); } },
        { label: 'Volver a Hoyo', action: () => { this.story = null; this.afterStory(); } },
      ]);
      return;
    }
    run.hp = Math.min(maxHp, hpPct * maxHp + (run.chapter.healBetween ?? 0) * maxHp);
    run.fi++;
    this.screens.showResults(info, [
      { label: run.fi < run.fights.length ? 'Siguiente combate' : 'Continuar la historia', primary: true, action: () => this.storyFight() },
    ]);
  }

  /** Fin de un capítulo (o salida): vuelve al mundo abierto si se empezó desde allí, o al menú de historia */
  afterStory(chapterId?: string) {
    if (this.storyReturn === 'mundo') {
      this.storyReturn = null;
      this.battle?.dispose(); this.battle = null;
      this.world.enter();
      if (chapterId) this.world.afterChapter(chapterId);
      return;
    }
    this.goMenu(); this.screens.showStoryMenu();
  }

  /** Entra en Hoyo (la ciudad donde vive la historia). Con `chapter`, te lleva a su marca y lo empieza. */
  enterWorld(opts: { chapter?: string } = {}) { this.world.enter(opts); }

  /** Final de la historia: escenas del final conseguido, logros y pantalla de FIN */
  private playEnding(_reward: string | null) {
    const p = this.storyProgress();
    const endId = String(p.flags.final ?? 'leal');
    const ending = ENDINGS.find((e) => e.id === endId) ?? ENDINGS[0];
    const flags = () => this.storyProgress().flags;
    this.screens.showStoryScenes(ending.scenes, flags, () => undefined, () => {
      const cur = this.storyProgress();
      const isNew = !cur.endings.includes(ending.id);
      const next = { ...cur, endings: isNew ? [...cur.endings, ending.id] : cur.endings };
      this.save.story = next;
      for (const a of ['historia', 'final_' + ending.id]) if (!this.save.achievements[a]) this.save.achievements[a] = Date.now();
      writeSave(this.save);
      this.screens.showStoryTheEnd(ending, isNew, next.endings.length, ENDINGS.length, () => this.afterStory('final'));
    });
  }

  private storyChapterWon() {
    const run = this.story!, ch = run.chapter;
    this.battle?.dispose(); this.battle = null;
    if (this.storyReturn === 'mundo') {
      // de vuelta a Hoyo: la escena final del capítulo se ve en la calle
      this.storyReturn = null;
      this.story = null;
      this.world.enter({ then: () => this.world.chapterOutro(ch) });
      return;
    }
    if (!this.showcase) this.openShowcase(ch.arena);
    const flags = () => this.storyProgress().flags;
    this.screens.showStoryScenes(scenesFor(ch.outro, flags()), flags, (c) => this.saveStory(applyChoice(this.storyProgress(), c)), () => {
      const first = !this.storyProgress().done.includes(ch.id);
      const p = completeChapter(this.storyProgress(), ch);
      this.save.story = p;
      let rewardText: string | null = null;
      if (first && ch.rewards) {
        for (const a of ch.rewards.achievements ?? []) if (!this.save.achievements[a]) this.save.achievements[a] = Date.now();
        rewardText = ch.rewards.text;
      }
      writeSave(this.save);
      const next = nextChapter(CHAPTERS, p);
      this.story = null;
      if (ch.endsStory) { this.playEnding(rewardText); return; }
      this.screens.showStoryChapterDone(ch, rewardText, !!next, () => next && this.startChapter(next.id, { returnTo: this.storyReturn ?? undefined }), () => this.afterStory(ch.id));
    });
  }

  // ---------------------------------------------------------------- supervivencia
  /** El luchador del jugador con las mejoras de la racha aplicadas */
  survPlayer(run: SurvivalRun): FighterData {
    const base = fighterById(run.player, run.skin);
    return { ...base, fullStats: applyPerks(base.fullStats, run.perks) };
  }

  startSurvival(player: string, skin?: string) {
    this.mode = 'supervivencia';
    this.tour = null;
    const run: SurvivalRun = { player, skin, wins: 0, hp: 0, perks: [], used: [], opp: '' };
    run.hp = this.survPlayer(run).fullStats.health;
    this.surv = run;
    this.nextSurvivalFight();
  }

  nextSurvivalFight() {
    const run = this.surv!;
    const me = this.survPlayer(run);
    const real = this.roster.filter((f) => !f.placeholder && this.isUnlocked(f) && f.id !== run.player).map((f) => f.id);
    const pick = pickOpponent(real.length ? real : this.roster.filter((f) => f.id !== run.player).map((f) => f.id), run.used);
    run.used = pick.used; run.opp = pick.id;
    const arena = ARENA_IDS[Math.floor(Math.random() * ARENA_IDS.length)];
    const c = scaleOpponent(fighterById(pick.id), run.wins);
    this.prepareFight({
      p: me, c, arena, difficulty: survivalDifficulty(run.wins), startHp: run.hp, startMom: startMomentum(run.perks),
      label: `SUPERVIVENCIA · RONDA ${run.wins + 1}${isBoss(run.wins) ? ' · ¡JEFE!' : ''}`,
    });
  }

  private survivalAfterBattle(won: boolean, hpPct: number, info: ResultInfo) {
    const run = this.surv!;
    const maxHp = this.survPlayer(run).fullStats.health;
    if (!won) {
      const best = Math.max(this.save.survivalBest ?? 0, run.wins);
      const newRecord = run.wins > (this.save.survivalBest ?? 0);
      this.save.survivalBest = best;
      writeSave(this.save);
      this.screens.showResults(info, [
        { label: 'Ver resumen de la racha', primary: true, action: () => this.screens.showSurvivalSummary(run, best, newRecord, () => this.startSurvival(run.player, run.skin), () => this.goMenu()) },
      ]);
      return;
    }
    run.wins++;
    run.hp = Math.min(maxHp, hpPct * maxHp + 0.3 * maxHp); // entre combates te recuperas un 30 %
    const streak = applyStreak(this.save, run.wins);
    this.save.survivalBest = Math.max(this.save.survivalBest ?? 0, run.wins);
    writeSave(this.save);
    info.newAchievements.push(...streak.map((id) => ACHIEVEMENTS.find((a) => a.id === id)!).filter(Boolean));
    if (streak.length) Audio.sfx('unlock');
    this.screens.showResults(info, [
      {
        label: 'Elegir una mejora', primary: true,
        action: () => this.screens.showPerkPick(run, pickPerks(), (id) => {
          const perk = perkById(id);
          run.perks.push(id);
          const newMax = this.survPlayer(run).fullStats.health;
          if (perk.maxHp) run.hp += perk.maxHp;
          if (perk.heal) run.hp += perk.heal * newMax;
          run.hp = Math.min(newMax, run.hp);
          this.nextSurvivalFight();
        }),
      },
      { label: 'Retirarme', action: () => this.screens.showSurvivalSummary(run, this.save.survivalBest ?? run.wins, false, () => this.startSurvival(run.player, run.skin), () => this.goMenu(), true) },
    ]);
  }

  /** Campeón defensor del Hoyo Femboy Champion: sale algo más fuerte que en un combate normal */
  private champBuff(f: FighterData): FighterData {
    return { ...f, fullStats: { ...f.fullStats, health: f.fullStats.health * 1.15, power: f.fullStats.power * 1.05 } };
  }

  private playTourRound() {
    const t = this.tour!;
    const b = t.bracket;
    const arena = arenaForRound(b, b.round);
    const mine = teamOf(b.playerId), theirs = teamOf(opponentOf(b));
    const p = fighterById(mine[0], t.setup.skin);
    const pPartner = mine[1] ? fighterById(mine[1], t.setup.partnerSkin) : undefined;
    let c = fighterById(theirs[0]);
    if (b.titleHolder && theirs[0] === b.titleHolder) c = this.champBuff(c);
    const cPartner = theirs[1] ? fighterById(theirs[1]) : undefined;
    const duo = duoOf(p.id, pPartner?.id);
    this.prepareFight({ p, c, pPartner, cPartner, arena, difficulty: t.difficulty, label: duo ? '★ DÚO DINÁMICO: ' + duo.name.toUpperCase() : undefined });
  }

  /** Diálogo previo (si existe) → pantalla VS → combate */
  prepareFight(opts: BattleOpts) {
    const lines = getLines('pre', opts.p.id, opts.c.id);
    const go = () => this.screens.showVS(opts.p, opts.c, opts.arena, opts.difficulty, () => this.startBattle(opts), !!opts.spectate, opts.pPartner, opts.cPartner, opts.label);
    if (lines.length) this.screens.showDialogue(lines, opts.p, opts.c, go); else go();
  }

  startBattle(opts: BattleOpts) {
    // el equipo del mundo abierto puede dar momentum inicial a Chema
    if (opts.p.id === 'chema' && this.save.world) { const m = bonusOf(this.save.world, ITEMS).startMom; if (m) opts = { ...opts, startMom: (opts.startMom ?? 0) + m }; }
    this.screens.clear();
    this.showcase?.dispose(); this.showcase = null;
    this.battle?.dispose();
    this.battle = new Battle(this, opts);
  }

  togglePause() {
    if (this.world.active) { this.world.pauseMenu(); return; }
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
    if (this.world.active) { this.world.pad(a); return; }
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
      advance(this.tour.bracket, won, (x, y) => (simulateMatch(fighterById(teamOf(x)[0]), fighterById(teamOf(y)[0]), diff).winner === 0 ? x : y));
      tournamentWon = this.tour.bracket.champion === this.tour.bracket.playerId;
      if (tournamentWon) { const k = this.tour.bracket.kind; this.save.tourWins = { ...(this.save.tourWins ?? {}), [k]: (this.save.tourWins?.[k] ?? 0) + 1 }; }
    }
    const got = applyResult(this.save, { summary: s, player: 0, playerData: o.p, mode: this.mode, difficulty: o.difficulty, tournamentWon });
    writeSave(this.save);
    const unlocked = this.roster.filter((f) => !before.has(f.id) && this.isUnlocked(f));
    const winner = won ? o.p : o.c, loser = won ? o.c : o.p;
    const quotes = getLines('victoria', o.p.id, o.c.id, winner.id).map((l) => ({ who: this.roster.find((r) => r.id === l.who) ?? null, text: l.text }));
    const worldPrize = tournamentWon && this.save.world && this.tour?.bracket.playerId.startsWith('chema') ? this.world.tournamentReward(this.tour.bracket.kind) : null;
    if (tournamentWon) {
      for (const l of getLines('campeon', o.p.id, o.c.id, o.p.id)) quotes.push({ who: this.roster.find((r) => r.id === l.who) ?? null, text: l.text });
    }
    const reasonText = (s.fired ? 'Despedido por Pablo Motos' : { ko: 'Por KO', pin: 'Por pin', rendicion: 'Por rendición', fuera: 'Por cuenta fuera del ring', tiempo: 'Por decisión: se acabó el tiempo' }[s.reason]);
    const info: ResultInfo = {
      won, winner, loser, reasonText, time: s.time,
      damage: { dealt: s.damageTaken[1], taken: s.damageTaken[0] },
      quotes,
      newAchievements: [...got.map((id) => ACHIEVEMENTS.find((a) => a.id === id)!).filter(Boolean), ...(worldPrize ? [{ name: 'Premio de Hoyo', desc: worldPrize }] : [])],
      unlocked,
    };
    if (got.length || unlocked.length) Audio.sfx('unlock');

    this.hud.hide();
    // botones según el modo
    if (this.mode === 'mundo' && this.world.fight) {
      const lines = this.world.afterFight(won, s.hpPct[0]);
      info.newAchievements.push(...lines.map((l) => ({ name: l, desc: '' })));
      this.world.persist();
      const back = () => { this.battle?.dispose(); this.battle = null; this.world.enter(); this.world.flushEvents(); };
      const buttons: { label: string; primary?: boolean; action: () => void }[] = [];
      if (this.world.towerActive && won && this.world.fight) buttons.push({ label: 'Siguiente piso', primary: true, action: () => this.world.continueTower() });
      buttons.push({ label: 'Volver a Hoyo', primary: buttons.length === 0, action: back });
      this.screens.showResults(info, buttons);
      return;
    }
    if (this.mode === 'historia' && this.story) { this.storyAfterBattle(won, s.hpPct[0], info); return; }
    if (this.mode === 'supervivencia' && this.surv) { this.survivalAfterBattle(won, s.hpPct[0], info); return; }
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
    const reasonText = s.fired ? `${winner.name} despide a ${loser.name}` : { ko: 'Por KO', pin: 'Por pin', rendicion: 'Por rendición', fuera: 'Por cuenta fuera del ring', tiempo: 'Por decisión: se acabó el tiempo' }[s.reason];
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
    this.screens.showBracket(t.bracket, t.difficulty, () => this.playTourRound(), () => this.goMenu(), () => this.startTournament(t.setup));
  }

  // ---------------------------------------------------------------- bucle
  private frame = (ts: number) => {
    const dt = Math.min(0.05, (ts - this.last) / 1000 || 0.016);
    this.last = ts;
    if (this.world.active) this.world.update(dt);
    else if (this.battle) this.battle.update(dt);
    else if (this.showcase) { this.showcase.update(dt); Audio.tickCrowd(dt); }
    const spectating = !!(this.battle?.opts.spectate && !this.battle.paused);
    this.padNav.update(dt, this.screens.isOpen() || spectating || this.world.active);
    setPadMode(this.input.lastDevice === 'mando');
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
