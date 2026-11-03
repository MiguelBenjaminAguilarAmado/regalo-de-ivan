import type { CameraRig } from '../render/CameraRig';
import type { Game } from '../game/Game';
import type { BattleOpts } from '../game/Battle';
import type { Appearance, FighterData } from '../combat/types';
import { CHAPTERS, ENDINGS } from '../../content/historia';
import { CHATTER, CITY_BEATS, PROLOGUE } from '../../content/historia-ciudad';
import { CIVILS, DISTRICTS, GRAFFITI, ITEMS, POIS, SPAWN, STICKERS } from '../../content/mundo';
import { NPCS } from '../../content/mundo-npc';
import { QUESTS, QUEST_BY_ID } from '../../content/misiones';
import { ARENA_INFO } from '../combat/arenaInfo';
import { fighterById, ROSTER } from '../content/roster';
import { Audio } from '../audio/Audio';
import { makeAvatar } from '../content/avatar';
import { el, clear } from '../ui/dom';
import { WorldUI, type MapData } from '../ui/WorldUI';
import { WorldView, type Target, type WorldBridge } from './WorldView';
import { MINI_INFO, runMinigame, type MiniId } from './minigames';
import { DAY_MIN } from '../modes/World';
import { applyChoice, chapterState, fightsFor, lineVisible, newProgress, nextChapter, scenesFor, type Flags, type StoryChapter, type StoryChoice, type StoryProgress, type StoryScene } from '../modes/Story';
import { scaleOpponent } from '../modes/Survival';
import { simulateMatch } from '../modes/simulate';
import {
  ATTRS, ATTR_MAX, GYM, GYM_HOURS, STICKER_MILESTONES, STREET_COOLDOWN, activeQuests, addMoney, addTime, addXp, applyBonus, betOdds, betPayout, bonusOf,
  buyItem, canChallenge, clockText, collectSticker, condHolds, dayOf, districtOpen, doneQuests, equipItem, giveReward, gymCost, hourOf, isNight,
  migrateWorld, milestoneFor, questState, questsAvailable, reportEvent, startQuest, streetDifficulty, streetReward, trainAttr, useItem, xpForLevel,
  type Ctx, type Item, type QuestDef, type Slot, type WorldEvent, type WorldProgress,
} from '../modes/World';
import type { NpcDef, PoiDef } from './types';

/** ===== Controlador del mundo abierto: une la escena 3D, la interfaz, el progreso y el resto del juego ===== */

const NPC_MAP = new Map(NPCS.map((n) => [n.id, n]));
const CIVIL_MAP = new Map(CIVILS.map((c) => [c.id, c]));
const DIST_MAP = new Map(DISTRICTS.map((d) => [d.id, d]));
const ITEM_MAP = new Map(ITEMS.map((i) => [i.id, i]));
const DIFF_INDEX = { facil: 0, intermedia: 1, dificil: 2 } as const;

export interface FightCtx { npc: string; first: boolean; tower?: number; towerHp?: number }

export class WorldController {
  view: WorldView | null = null;
  ui: WorldUI;
  progress: WorldProgress = migrateWorld(null);
  active = false;
  busy = false;
  fight: FightCtx | null = null;
  private saveT = 0;
  private drag: { id: number; x: number; y: number } | null = null;
  private keyHandler: ((e: KeyboardEvent) => void) | null = null;
  private pointerHandlers: (() => void)[] = [];
  private lastHint = 0;
  private towerRun: { floor: number; hp: number | null } | null = null;

  constructor(private g: Game, uiRoot: HTMLElement) {
    this.ui = new WorldUI(uiRoot);
    const can = () => this.active && (!this.busy || this.ui.modalOpen);
    this.ui.handlers = {
      map: () => { if (can()) this.toggle(() => this.mapPanel()); },
      quests: () => { if (can()) this.toggle(() => this.questsPanel()); },
      bag: () => { if (can()) this.toggle(() => this.inventoryPanel()); },
      pause: () => this.pauseMenu(),
      act: () => { if (this.active && !this.busy && this.view?.target) this.interact(this.view.target); },
    };
  }

  // ------------------------------------------------------------------ estado
  get story(): StoryProgress { return this.g.save.story ?? newProgress(); }
  ctx(): Ctx { return { story: this.story, world: this.progress }; }
  private flags(): Flags { return { ...this.progress.flags, ...this.story.flags }; }
  private level() { return this.progress.level; }
  private chemaName() { return 'Chema'; }

  // ------------------------------------------------------------------ puente con la vista
  private bridge: WorldBridge = {
    isOpen: (d) => districtOpen(DIST_MAP.get(d)?.unlock, this.ctx()),
    npcSpot: (n) => {
      if (n.alt && condHolds(n.alt.cond, this.ctx())) return { district: n.alt.district, at: n.alt.at };
      if (n.presence && !condHolds(n.presence, this.ctx())) return null;
      // los que tienen una ubicación alternativa por capítulo (Pepe) desaparecen de la original
      if (n.alt && n.id === 'pepe the gay dragon' && condHolds(n.alt.cond, this.ctx())) return null;
      return { district: n.district, at: n.at };
    },
    npcMarker: (id) => this.markerFor(id),
    poiVisible: (p) => this.poiVisible(p),
    stickerVisible: (id) => { const s = STICKERS.find((x) => x.id === id)!; return !this.progress.collected.includes(id) && condHolds(s.cond, this.ctx()); },
    graffitiDone: (id) => this.progress.graffiti.includes(id),
    playerLook: () => this.playerLook(),
    npcLook: (id) => this.npcLook(id),
    npcName: (id) => NPC_MAP.get(id)?.fighter ? fighterById(id).name : CIVIL_MAP.get(id)?.name ?? id,
    hour: () => hourOf(this.progress),
    storyActors: () => {
      const ch = this.pendingChapter();
      if (!ch) return null;
      const poi = POIS.find((p) => p.kind === 'story' && p.chapter === ch.id);
      if (!poi || !this.bridge.isOpen(poi.district)) return null;
      const ids = (CITY_BEATS[ch.id]?.cast ?? ch.intro[0]?.cast ?? []).filter((id) => id !== 'chema').slice(0, 2);
      return ids.length ? { poi: poi.id, ids } : null;
    },
    chatter: () => {
      const ok = CHATTER.filter((c) => condHolds(c.cond, this.ctx()));
      return ok[Math.floor(Math.random() * ok.length)]?.text ?? '¡Hoyo, Hoyo!';
    },
  };

  /** Capítulo de la historia que toca ahora (null = historia terminada) */
  pendingChapter(): StoryChapter | null { return nextChapter(CHAPTERS, this.story); }

  private poiVisible(p: PoiDef): boolean {
    if (!condHolds(p.cond, this.ctx())) return false;
    if (p.kind === 'story') return !!p.chapter && chapterState(CHAPTERS, this.story, p.chapter) === 'open';
    return true;
  }

  private playerLook(): Appearance {
    const f = fighterById('chema', this.g.save.skins?.['chema']);
    const a = { ...f.appearance };
    if (this.progress.equip.belt && !a.belt) a.belt = 0x16130f;
    return a;
  }
  private npcLook(id: string): Appearance | null {
    if (CIVIL_MAP.has(id)) return CIVIL_MAP.get(id)!.appearance;
    try { return fighterById(id).appearance; } catch { return null; }
  }

  /** Datos de un civil/luchador para los diálogos (retrato) */
  civilData(id: string): FighterData | null {
    const c = CIVIL_MAP.get(id);
    if (!c) return null;
    const base = ROSTER.find((r) => r.id === 'novato')!;
    const face = makeAvatar(c.appearance, 'civ-' + c.id);
    return { ...base, id: c.id, name: c.name, appearance: c.appearance, description: c.blurb, portrait: face, pfp: face };
  }

  private markerFor(id: string): '!' | '?' | null {
    const w = this.progress;
    for (const q of activeQuests(w, QUESTS)) {
      const st = w.quests[q.id], step = q.steps[st.step];
      if (step && step.on === 'talk' && step.target === id) return '?';
    }
    if (questsAvailable(QUESTS, this.ctx()).some((q) => q.giver === id)) return '!';
    return null;
  }

  // ------------------------------------------------------------------ entrar y salir
  enter(opts: { spawn?: { x: number; z: number; yaw: number }; chapter?: string; then?: () => void } = {}) {
    const g = this.g;
    this.progress = migrateWorld(g.save.world);
    g.save.world = this.progress;
    g.mode = 'mundo';
    g.screens.clear();
    g.showcase?.dispose(); g.showcase = null;
    g.battle?.dispose(); g.battle = null;
    g.hud.hide();
    this.view = new WorldView(g.stage, this.bridge);
    this.view.onDistrict = (id) => this.onDistrict(id);
    this.view.refresh();
    const sp = opts.spawn ?? this.progress.pos ?? { x: SPAWN[0], z: SPAWN[1], yaw: Math.PI };
    this.view.teleport(sp.x, sp.z, sp.yaw);
    // la moto: donde la dejaste o, la primera vez, aparcada junto a tu piso
    const mp = this.progress.moto ?? (() => { const c = this.view!.layout.spots['poi:casa']; return { x: c.x + 3, z: c.z + 1.5, yaw: Math.PI / 2 }; })();
    this.view.placeMoto(mp.x, mp.z, mp.yaw);
    this.active = true; this.busy = false;
    this.ui.show();
    g.input.enabled = true; g.input.reset();
    g.touch.show(g.useTouch); g.touch.setTag(false);
    document.body.classList.toggle('touch-mode', g.useTouch);
    this.attachInput();
    document.body.classList.add('in-world');
    if (opts.chapter) {
      const poi = POIS.find((p) => p.kind === 'story' && p.chapter === opts.chapter);
      const s = poi && this.view.layout.spots['poi:' + poi.id];
      if (s) this.view.teleport(s.x, s.z + 3.2, Math.PI);
    }
    this.view.onDistrict?.(this.view.district);
    const go = () => { if (opts.then) opts.then(); else if (opts.chapter) this.startChapter(opts.chapter); };
    if (!this.progress.flags.world_intro) {
      this.progress.flags.world_intro = true;
      if (!this.story.done.length && !opts.chapter && !opts.then) {
        this.playScenes(PROLOGUE, () => { this.showGoal(); go(); });
        return;
      }
    }
    go();
  }

  /** Recuerda el objetivo de la historia con un aviso */
  showGoal() {
    const ch = this.pendingChapter();
    if (!ch) return;
    const n = CHAPTERS.findIndex((c) => c.id === ch.id) + 1;
    this.ui.toast(`★ Capítulo ${n} · ${ch.title}: ${CITY_BEATS[ch.id]?.goal ?? 'sigue la estrella dorada'}`, 'gold');
  }

  /** Sale del mundo (para combatir, empezar un capítulo o volver al menú) */
  leave(save = true) {
    if (!this.active) return;
    if (this.view?.riding) this.view.dismount();
    if (save && this.view) { this.progress.pos = { x: this.view.px, z: this.view.pz, yaw: this.view.yaw }; this.progress.moto = this.view.motoPos ?? this.progress.moto; }
    this.detachInput();
    this.ui.hide();
    this.view?.dispose(); this.view = null;
    this.active = false;
    this.g.input.enabled = false;
    this.g.touch.show(false);
    document.body.classList.remove('touch-mode', 'in-world');
    this.persist();
  }

  persist() { this.g.save.world = this.progress; import('../progress/Save').then((m) => m.writeSave(this.g.save)); }

  private attachInput() {
    const canvas = this.g.stage.canvas;
    const down = (e: PointerEvent) => { if (!this.active || this.busy || (e.target as HTMLElement | null)?.closest?.('.touch-ui, .world-ui button, .wmodal')) return; if (e.button === 0 || e.pointerType === 'touch') { if (e.pointerType === 'touch' && e.clientX < window.innerWidth * 0.45) return; this.drag = { id: e.pointerId, x: e.clientX, y: e.clientY }; } };
    const move = (e: PointerEvent) => { if (!this.drag || e.pointerId !== this.drag.id || !this.view) return; this.view.rotateCamera(-(e.clientX - this.drag.x) * 0.006, (e.clientY - this.drag.y) * 0.004); this.drag.x = e.clientX; this.drag.y = e.clientY; };
    const up = (e: PointerEvent) => { if (this.drag && e.pointerId === this.drag.id) this.drag = null; };
    window.addEventListener('pointerdown', down); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    this.pointerHandlers = [() => window.removeEventListener('pointerdown', down), () => window.removeEventListener('pointermove', move), () => window.removeEventListener('pointerup', up), () => window.removeEventListener('pointercancel', up)];
    this.keyHandler = (e) => {
      if (!this.active) return;
      if (e.code === 'Comma') this.view?.rotateCamera(0.18);
      else if (e.code === 'Period') this.view?.rotateCamera(-0.18);
      else if (this.busy && !this.ui.modalOpen) return;
      else if (e.code === 'KeyM') { e.preventDefault(); this.toggle(() => this.mapPanel()); }
      else if (e.code === 'KeyI') { e.preventDefault(); this.toggle(() => this.inventoryPanel()); }
      else if (e.code === 'KeyQ') { e.preventDefault(); this.toggle(() => this.questsPanel()); }
      else if (e.code === 'Enter' && !this.busy && this.view?.target) { e.preventDefault(); this.interact(this.view.target); }
    };
    window.addEventListener('keydown', this.keyHandler);
  }
  private detachInput() {
    this.pointerHandlers.forEach((f) => f()); this.pointerHandlers = [];
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler); this.keyHandler = null;
  }
  private toggle(open: () => void) { if (this.ui.modalOpen) this.ui.closeModal(); else if (!this.busy) open(); }

  // ------------------------------------------------------------------ bucle
  update(dt: number) {
    const view = this.view;
    if (!view || !this.active) return;
    const g = this.g;
    let mx = 0, mz = 0, run = false, act = false;
    if (!this.busy) {
      const inp = g.input.sample(view.rig as unknown as CameraRig);
      // E (teclado) interactúa; con mando se usa A (lo gestiona pad())
      mx = inp.mx; mz = inp.mz; run = inp.run; act = inp.taunt && g.input.lastDevice !== 'mando';
    } else g.input.reset();
    // stick derecho: cámara
    const pad = g.input.activePad();
    if (pad && !view.inScene) {
      const dz = (v: number) => (Math.abs(v) < 0.15 ? 0 : v);
      const rx = dz(pad.axes[2] ?? 0), ry = dz(pad.axes[3] ?? 0);
      if (rx || ry) view.rotateCamera(-rx * dt * 2.6, ry * dt * 1.4);
    }
    view.update(dt, mx, mz, run, !this.busy);
    if (!this.busy) {
      const dm = dt * 2; // 1 minuto de juego cada 0,5 s
      const days = addTime(this.progress, dm);
      if (days > 0) this.ui.toast(`Amanece el día ${dayOf(this.progress)}`, 'gold');
      const sid = view.stickerNear();
      if (sid) this.pickSticker(sid);
      this.ui.setPrompt(view.target ? this.promptFor(view.target) : null);
      if (act && view.target) this.interact(view.target);
    } else this.ui.setPrompt(null);
    this.saveT += dt;
    if (this.saveT > 25) { this.saveT = 0; this.progress.pos = { x: view.px, z: view.pz, yaw: view.yaw }; this.persist(); }
    const now = performance.now();
    if (now - this.lastHint > 250) { this.lastHint = now; this.refreshHud(); }
    this.ui.drawMini(this.mapData(true));
    g.input.enabled = !this.busy;
  }

  private refreshHud() {
    const p = this.progress, d = this.view?.district ? DIST_MAP.get(this.view.district) : null;
    const aq = activeQuests(p, QUESTS)[0];
    this.ui.updateHud({
      level: p.level, xp: p.xp, xpNeed: xpForLevel(p.level), money: p.money, points: p.points,
      clock: clockText(p), day: dayOf(p), night: isNight(p), district: d?.name ?? 'Calles del Hoyo',
      quest: aq ? { title: aq.title, step: aq.steps[p.quests[aq.id].step]?.text ?? '' } : null,
    });
    // objetivo de la historia con flecha
    const ch = this.pendingChapter();
    const view = this.view;
    const poi = ch ? POIS.find((x) => x.kind === 'story' && x.chapter === ch.id) : null;
    const spot = poi && view ? view.layout.spots['poi:' + poi.id] : null;
    if (ch && spot && view) {
      const dx = spot.x - view.px, dz = spot.z - view.pz, cy = view.camYaw;
      const r = dx * Math.cos(cy) - dz * Math.sin(cy), f = -dx * Math.sin(cy) - dz * Math.cos(cy);
      const n = CHAPTERS.findIndex((c) => c.id === ch.id) + 1;
      this.ui.setObjective({ title: `HISTORIA · CAPÍTULO ${n}: ${ch.title.toUpperCase()}`, text: CITY_BEATS[ch.id]?.goal ?? 'Sigue la estrella dorada', angle: Math.atan2(r, f), dist: Math.hypot(dx, dz) });
    } else this.ui.setObjective(ch ? null : { title: 'HISTORIA COMPLETADA', text: 'Hoyo es tuyo: misiones, Torre Motos, cartas y pegatinas', angle: null, dist: 0 });
  }

  private mapData(mini = false): MapData {
    const view = this.view!;
    const markers: MapData['markers'] = [];
    for (const p of POIS) {
      if (!this.poiVisible(p)) continue;
      const s = view.layout.spots['poi:' + p.id];
      if (!s) continue;
      if (p.kind === 'story') markers.push({ x: s.x, z: s.z, kind: 'story', label: CHAPTERS.find((c) => c.id === p.chapter)?.title });
      else if (!mini || (Math.hypot(s.x - view.px, s.z - view.pz) < 60 && p.kind !== 'landmark')) markers.push({ x: s.x, z: s.z, kind: 'poi', label: p.name });
    }
    for (const n of NPCS) {
      const spot = this.bridge.npcSpot(n);
      if (!spot) continue;
      const mk = this.markerFor(n.id);
      if (!mk && !n.fighter) continue;
      if (!this.bridge.isOpen(spot.district)) continue;
      const key = spot.district === n.district && spot.at[0] === n.at[0] ? 'npc:' + n.id : 'npcalt:' + n.id;
      const s = view.layout.spots[key];
      if (s) markers.push({ x: s.x, z: s.z, kind: mk ? 'quest' : 'npc', label: this.bridge.npcName(n.id) });
    }
    const mp = view.motoPos;
    if (mp && !view.riding) markers.push({ x: mp.x, z: mp.z, kind: 'moto', label: 'Tu moto' });
    return {
      worldSize: view.layout.worldSize,
      roads: view.layout.roads,
      districts: DISTRICTS.map((d) => ({ id: d.id, name: d.name, cx: d.center[0], cz: d.center[1], w: d.size[0], d: d.size[1], open: this.bridge.isOpen(d.id), color: '#' + d.ground.toString(16).padStart(6, '0') })),
      player: { x: view.px, z: view.pz, yaw: view.yaw },
      markers,
    };
  }

  private onDistrict(id: string | null) {
    if (!id) return;
    const d = DIST_MAP.get(id);
    if (!d) return;
    this.ui.districtBanner(d.name, d.blurb);
    if (!this.progress.visited.includes(id)) this.progress.visited.push(id);
    Audio.music(d.music === 'matamoros' && id === 'plaza' ? 'menu' : d.music);
    this.report({ t: 'travel', id });
  }

  private promptFor(t: Target): string {
    if (t.kind === 'npc') return `Hablar con ${t.label}`;
    if (t.kind === 'poi') return t.def.prompt;
    if (t.kind === 'graffiti') return `Hacer una foto: ${t.label}`;
    if (t.kind === 'moto') return this.view?.riding ? `Bajar de la moto · ${this.view.speedKmh} km/h` : 'Subir a la moto';
    return '';
  }

  // ------------------------------------------------------------------ escenas y misiones
  /**
   * Reproduce escenas EN LA CALLE: los que hablan aparecen delante de Chema y la cámara pasa a modo cine.
   * Con `story: true`, las elecciones cambian las banderas de la historia (y no las del mundo).
   */
  playScenes(scenes: StoryScene[], done: () => void, opts: { story?: boolean } = {}) {
    const list = [...scenes];
    if (!list.length) { done(); return; }
    if (this.view?.riding) { this.view.dismount(); this.progress.moto = this.view.motoPos ?? undefined; }
    this.busy = true;
    this.ui.closeModal();
    this.ui.setCinema(true);
    const flags = () => this.flags();
    const onChoice = (c: StoryChoice) => {
      if (opts.story) { this.g.save.story = applyChoice(this.story, c); this.persist(); }
      else if (c.set) this.progress.flags = { ...this.progress.flags, ...c.set };
    };
    const finish = () => {
      this.view?.endScene();
      this.ui.setCinema(false);
      this.g.screens.clear();
      this.busy = false;
      done();
    };
    const next = () => {
      const sc = list.shift();
      if (!sc) { finish(); return; }
      if (!scenesFor([sc], flags()).length) { next(); return; }
      this.view?.beginScene(this.sceneCast(sc));
      this.g.screens.showStoryScenes([sc], flags, onChoice, next, (who) => this.view?.speak(who));
    };
    next();
  }

  /** Quién sale físicamente en una escena (no Chema, ni el narrador, ni el árbitro) */
  private sceneCast(sc: StoryScene): string[] {
    const ids = sc.cast ?? [...new Set(sc.lines.filter((l) => lineVisible(l, this.flags())).map((l) => l.who))];
    return ids.filter((id) => id !== 'chema' && id !== 'narrador' && id !== 'arbitro' && !!this.npcLook(id)).slice(0, 3);
  }

  /** Informa de un evento a las misiones; muestra pasos y recompensas */
  report(e: WorldEvent, then?: () => void) {
    const res = reportEvent(this.progress, QUESTS, e);
    const scenes: StoryScene[] = res.stepDone.flatMap((s) => s.step.scenes ?? []);
    const finish = () => {
      for (const q of res.completed) this.completeQuest(q);
      if (doneQuests(this.progress) >= 15) this.progress.flags.quests15 = true;
      then?.();
    };
    for (const s of res.stepDone) if (!(s.step.scenes?.length)) this.ui.toast(`✔ ${s.step.text}`, 'good');
    if (scenes.length) this.playScenes(scenes, finish); else finish();
  }

  private completeQuest(q: QuestDef) {
    const r = q.reward;
    const { levels } = giveReward(this.progress, r);
    Audio.sfx('unlock');
    const parts = [r.money ? `+${r.money} Hoyos` : '', r.xp ? `+${r.xp} XP` : '', r.points ? `+${r.points} pt` : '', ...Object.entries(r.items ?? {}).map(([id, n]) => `${n}× ${ITEM_MAP.get(id)?.name ?? id}`)].filter(Boolean);
    this.ui.toast(`★ Misión completada: ${q.title} (${parts.join(' · ')})`, 'gold');
    if (r.text) this.ui.toast(r.text, 'info');
    if (levels) this.ui.toast(`¡Subes al nivel ${this.progress.level}!`, 'gold');
    this.checkAchievements();
  }

  private checkAchievements() {
    const ach = this.g.save.achievements;
    const give = (id: string, name: string) => { if (!ach[id]) { ach[id] = Date.now(); this.ui.toast(`🏆 Logro: ${name}`, 'gold'); Audio.sfx('unlock'); } };
    const p = this.progress;
    if (p.stats.wins >= 1) give('w_pelea', 'Peleón callejero');
    if (p.stats.wins >= 25) give('w_pelea25', 'Rey de la calle');
    if (p.level >= 10) give('w_nivel10', 'Nivel 10');
    if (p.level >= 25) give('w_nivel25', 'Nivel máximo');
    if (doneQuests(p) >= 10) give('w_quest10', 'Manitas del barrio');
    if (doneQuests(p) >= 24) give('w_quest24', 'Todas las misiones');
    if (p.collected.length >= 30) give('w_stickers', 'Álbum completo');
    if (p.cards.length >= 14) give('w_cartas', 'Coleccionista de cartas');
    if (p.visited.length >= 8) give('w_distritos', 'Turista del Hoyo');
    if (p.stats.betsWon >= 5) give('w_apuestas', 'Rey del garito');
    if (p.tower >= 10) give('w_torre', 'La Torre, completa');
    if (p.flags.leyenda) give('w_leyenda', 'Leyenda de la ciudad');
    if (p.money >= 5000) give('w_rico', 'Hoyo en la cuenta');
    if (Object.values(p.attrs).every((a) => a >= ATTR_MAX)) give('w_gym', 'Atleta perfecto');
  }

  // ------------------------------------------------------------------ interacción
  interact(t: Target | null) {
    if (this.busy || !t) return;
    if (t.kind === 'moto') {
      if (this.view?.riding) { this.view.dismount(); this.progress.moto = this.view.motoPos ?? undefined; Audio.sfx('click'); }
      else { this.view?.mount(); Audio.sfx('ready'); if (!this.progress.flags.moto_tip) { this.progress.flags.moto_tip = true; this.ui.toast('🏍 En moto: dirección con el stick / WASD, Shift o RT para acelerar a tope, E / A para bajarte.', 'gold'); } }
      return;
    }
    if (t.kind === 'npc') this.talkMenu(t.def);
    else if (t.kind === 'graffiti') this.photo(t.id);
    else if (t.kind === 'poi') this.usePoi(t.def);
  }

  private talkMenu(npc: NpcDef) {
    const name = this.bridge.npcName(npc.id);
    const rows: HTMLElement[] = [
      el('button', { class: 'btn primary go', 'data-nav': true, onClick: () => { this.ui.closeModal(); this.talkTo(npc); } }, [el('span', {}, 'Hablar')]),
    ];
    if (npc.fighter) {
      const ready = canChallenge(this.progress, npc.id);
      const wait = Math.max(0, Math.ceil(((this.progress.cooldowns[npc.id] ?? 0) - this.progress.time) / 60));
      rows.push(el('button', { class: 'btn' + (ready ? '' : ' disabled'), 'data-nav': true, onClick: () => { if (!ready) { this.ui.toast(`${name} no quiere pelear ahora: vuelve en ${wait} h.`, 'bad'); return; } this.ui.closeModal(); this.challenge(npc); } }, [el('span', {}, 'Retar a un combate'), el('small', {}, ready ? `Dificultad: ${streetDifficulty(this.level())}` : `Descansa (${wait} h)`)]));
    }
    this.open(name, [el('div', { class: 'wlist' }, rows)]);
  }

  private talkTo(npc: NpcDef) {
    this.busy = false;
    // 1) pasos de misión que piden hablar con este NPC
    const res = reportEvent(this.progress, QUESTS, { t: 'talk', npc: npc.id });
    if (res.stepDone.length) {
      const scenes = res.stepDone.flatMap((s) => s.step.scenes ?? []);
      const fin = () => { for (const q of res.completed) this.completeQuest(q); if (doneQuests(this.progress) >= 15) this.progress.flags.quests15 = true; };
      if (scenes.length) this.playScenes(scenes, fin); else fin();
      return;
    }
    // 2) misión nueva de este NPC
    const q = questsAvailable(QUESTS, this.ctx()).find((x) => x.giver === npc.id);
    if (q) {
      this.playScenes(q.intro, () => { startQuest(this.progress, q.id); Audio.sfx('ready'); this.ui.toast(`Misión aceptada: ${q.title}`, 'gold'); });
      return;
    }
    // 3) conversación de historia / ambiente
    const t = npc.talks.find((x) => condHolds(x.cond, this.ctx()));
    if (t) {
      const nf = t.cond?.notFlag;
      this.playScenes(t.scenes, () => { if (typeof nf === 'string') this.progress.flags[nf] = true; });
      return;
    }
    const line = npc.quips[Math.floor(Math.random() * npc.quips.length)];
    this.playScenes([{ cast: [npc.id, 'chema'], lines: [{ who: npc.id, text: line }] }], () => undefined);
  }

  // ------------------------------------------------------------------ lugares
  private usePoi(p: PoiDef) {
    switch (p.kind) {
      case 'shop': case 'vendor': this.shopPanel(p); break;
      case 'gym': this.gymPanel(); break;
      case 'home': this.homePanel(); break;
      case 'taxi': this.travelPanel(); break;
      case 'board': this.boardPanel(); break;
      case 'garito': this.report({ t: 'visit', id: 'garito' }); this.betsPanel(); break;
      case 'minigame': this.playMinigame(p.minigame!); break;
      case 'story': this.startChapter(p.chapter!); break;
      case 'tower': this.towerPanel(); break;
      case 'arena': this.arenaPanel(); break;
      case 'heal': this.restAt(p); break;
      case 'photo': this.photoSpot(p); break;
      case 'fountain': this.fountain(p); break;
      case 'landmark': if (p.id === 'ring_calle') { this.ringShow(); break; } this.report({ t: 'visit', id: p.id }); this.ui.toast(p.name + ': ' + p.prompt, 'info'); break;
      default: this.report({ t: 'visit', id: p.id }); this.ui.toast(p.name + ': ' + p.prompt, 'info');
    }
  }

  /** El ring callejero de la plaza: combate de exhibición con comentarios del árbitro jubilado */
  private ringShow() {
    this.report({ t: 'visit', id: 'ring_calle' });
    const lines = [
      '¡Gancho del Novato! El Veterano ni se inmuta: lleva cuarenta años encajando golpes y facturas.',
      'Esto es una exhibición, chaval. Aquí nadie gana, pero todo el mundo aplaude. Como en las bodas.',
      'El Veterano dice que de joven tumbó a Pablo Motos. Pablo dice que fue al revés. Los dos mienten.',
      'Si quieres pelear de verdad, reta a los luchadores que andan por la calle. Ya verás qué rápido se les quitan las ganas.',
    ];
    const first = !this.progress.flags.ring_visto;
    this.progress.flags.ring_visto = true;
    this.playScenes([{ cast: ['arbitro_civ'], lines: [{ who: 'arbitro_civ', text: lines[Math.floor(Math.random() * lines.length)] }] }], () => { if (first) { this.gainXp(10); this.ui.toast('Has visto tu primer combate de exhibición (+10 XP)', 'good'); } });
  }

  private fountain(p: PoiDef) {
    this.report({ t: 'visit', id: p.id });
    if (questState(this.progress, 'silla') === 'active') return;
    if (this.progress.money >= 1) { addMoney(this.progress, -1); this.ui.toast('Tiras una moneda a la fuente y pides un deseo. (-1 Hoyo)', 'info'); }
  }

  private photoSpot(p: PoiDef) {
    if (!this.progress.graffiti.includes('foto_' + p.id)) {
      this.progress.graffiti.push('foto_' + p.id);
      this.progress.stats.photos++;
      this.ui.toast('📷 ¡Selfie con el monigote azul! (+20 XP)', 'good');
      this.gainXp(20);
      this.report({ t: 'photo' });
    } else this.ui.toast('El monigote te saluda. Otra vez.', 'info');
  }

  private photo(id: string) {
    const g = GRAFFITI.find((x) => x.id === id)!;
    if (this.progress.graffiti.includes(id)) return;
    this.progress.graffiti.push(id);
    this.progress.stats.photos++;
    this.ui.toast(`📷 Foto: ${g.name} (+15 XP)`, 'good');
    Audio.sfx('click');
    this.gainXp(15);
    this.playScenes([{ lines: [{ who: 'narrador', text: g.blurb }] }], () => this.report({ t: 'photo' }));
  }

  private restAt(p: PoiDef) {
    const h = p.heal!;
    addTime(this.progress, h.minutes);
    this.ui.toast(h.text, 'info');
    this.report({ t: 'visit', id: p.id });
  }

  private pickSticker(id: string) {
    if (!collectSticker(this.progress, id)) return;
    const n = this.progress.collected.length;
    Audio.sfx('unlock');
    this.ui.toast(`⭐ Pegatina del Hoyo ${n}/${STICKERS.length}`, 'gold');
    this.gainXp(10);
    const ms = milestoneFor(n);
    if (ms) { addMoney(this.progress, ms.money); this.progress.points += ms.points; this.ui.toast(`${ms.text} (+${ms.money} Hoyos${ms.points ? `, +${ms.points} pt` : ''})`, 'gold'); }
    this.report({ t: 'collect', id: 'sticker' });
    this.checkAchievements();
  }

  gainXp(n: number) {
    const lv = addXp(this.progress, n);
    if (lv) { this.ui.toast(`¡Subes al nivel ${this.progress.level}! (+${lv} punto de entrenamiento)`, 'gold'); Audio.sfx('unlock'); }
    this.checkAchievements();
  }

  // ------------------------------------------------------------------ combates
  private arenaFor(): import('../combat/types').ArenaId {
    const d = this.view?.district ? DIST_MAP.get(this.view.district) : null;
    return d?.arena ?? 'matamoros';
  }

  /** Datos de Chema para un combate del mundo (consumibles pendientes incluidos) */
  private chemaForFight(): { p: FighterData; startMom: number } {
    const pend = this.progress.pending;
    let p = fighterById('chema', this.g.save.skins?.['chema']);
    if (pend.hp || pend.power) p = { ...p, fullStats: { ...p.fullStats, health: p.fullStats.health * (1 + pend.hp / 100), power: p.fullStats.power * (1 + pend.power / 100) } };
    return { p, startMom: pend.mom };
  }

  private challenge(npc: NpcDef) {
    const level = this.level();
    const diff = streetDifficulty(level);
    let c = fighterById(npc.id);
    c = scaleOpponent(c, Math.max(0, Math.floor((level - 8) / 1.5)));
    const { p, startMom } = this.chemaForFight();
    this.progress.pending = { hp: 0, mom: 0, power: 0 };
    const first = !this.progress.cards.includes(npc.id);
    this.fight = { npc: npc.id, first };
    // los combates callejeros se pelean en el callejón de Hoyo
    const arena: import('../combat/types').ArenaId = 'callejon';
    const d = this.view?.district ? DIST_MAP.get(this.view.district) : null;
    const opts: BattleOpts = { p, c, arena, difficulty: diff, startMom, objective: `Gana el combate callejero contra ${c.name}`, label: `COMBATE CALLEJERO · ${(d?.name ?? 'HOYO').toUpperCase()}` };
    this.launch(opts);
  }

  private launch(opts: BattleOpts) {
    this.leave(true);
    this.g.mode = 'mundo';
    this.g.screens.showVS(opts.p, opts.c, opts.arena, opts.difficulty, () => this.g.startBattle(opts), false, undefined, undefined, opts.label);
  }

  /** Tras un combate del mundo: recompensas. Devuelve líneas de texto para la pantalla de resultados. */
  afterFight(won: boolean, hpPct: number): string[] {
    const f = this.fight;
    this.fight = null;
    const lines: string[] = [];
    const p = this.progress;
    p.stats.fights++;
    addTime(p, 30);
    if (!f) return lines;
    if (f.tower != null) return this.afterTower(f, won, hpPct);
    const name = fighterById(f.npc).name;
    if (won) {
      p.stats.wins++;
      p.wins[f.npc] = (p.wins[f.npc] ?? 0) + 1;
      p.cooldowns[f.npc] = p.time + STREET_COOLDOWN;
      const r = streetReward(p.level, DIFF_INDEX[streetDifficulty(p.level)], f.first);
      addMoney(p, r.money);
      const lv = addXp(p, r.xp);
      lines.push(`+${r.money} Hoyos`, `+${r.xp} XP`);
      if (lv) lines.push(`¡Nivel ${p.level}! (+${lv} punto de entrenamiento)`);
      if (f.first) { p.cards.push(f.npc); lines.push(`Carta de ${name} conseguida (${p.cards.length}/14)`); }
      this.pendingEvents = [{ t: 'win', npc: f.npc }, ...(f.first ? [{ t: 'cards' as const }] : [])];
    } else {
      p.cooldowns[f.npc] = p.time + 60;
      lines.push(`${name} te ha ganado esta vez. Puedes volver a retarle en una hora.`);
      addXp(p, 10); lines.push('+10 XP por intentarlo');
    }
    this.checkAchievements();
    return lines;
  }
  private pendingEvents: WorldEvent[] = [];

  /** Al volver al mundo tras un combate: reporta los eventos pendientes */
  flushEvents() {
    const evs = this.pendingEvents; this.pendingEvents = [];
    const next = () => { const e = evs.shift(); if (e) this.report(e, next); };
    next();
  }

  // ------------------------------------------------------------------ Torre (posjuego)
  private towerPanel() {
    const best = this.progress.tower;
    const start = el('button', { class: 'btn primary go', 'data-nav': true, onClick: () => { this.ui.closeModal(); this.towerRun = { floor: Math.min(10, best + 1), hp: null }; this.towerFight(); } }, [el('span', {}, best >= 10 ? 'Subir otra vez desde el piso 1' : `Subir al piso ${best + 1}`), el('small', {}, 'Sin descanso entre pisos: la vida que pierdes no vuelve. Un piso = un jefe.')]);
    this.open('Torre Motos', [el('p', {}, 'Diez pisos, diez combates. Cada piso es un luchador más fuerte que el anterior y entre piso y piso solo recuperas un 20 % de vida. Pablo paga bien por cada piso.'), el('p', { class: 'dim' }, `Mejor piso: ${best}/10`), start]);
  }

  private towerFight() {
    const run = this.towerRun!;
    const pool = ROSTER.filter((f) => !f.placeholder && f.id !== 'chema' && this.g.isUnlocked(f)).map((f) => f.id);
    const id = pool[(run.floor * 5 + 3) % pool.length];
    let c = fighterById(id);
    c = scaleOpponent(c, run.floor + 3);
    const { p, startMom } = this.chemaForFight();
    this.progress.pending = { hp: 0, mom: 0, power: 0 };
    this.fight = { npc: id, first: false, tower: run.floor, towerHp: run.hp ?? undefined };
    const opts: BattleOpts = { p, c, arena: 'oficina', difficulty: run.floor < 4 ? 'intermedia' : 'dificil', startMom, startHp: run.hp ?? undefined, objective: `Piso ${run.floor}/10: derrota a ${c.name}`, label: `TORRE MOTOS · PISO ${run.floor}/10` };
    this.launch(opts);
  }

  private afterTower(f: FightCtx, won: boolean, hpPct: number): string[] {
    const p = this.progress, run = this.towerRun;
    const lines: string[] = [];
    if (!run) return lines;
    if (won) {
      const maxHp = fighterById('chema').fullStats.health;
      run.hp = Math.min(maxHp, hpPct * maxHp + 0.2 * maxHp);
      p.tower = Math.max(p.tower, run.floor);
      const money = 150 * run.floor, xp = 90 * run.floor;
      addMoney(p, money); addXp(p, xp);
      lines.push(`Piso ${run.floor} superado`, `+${money} Hoyos`, `+${xp} XP`);
      this.pendingEvents = [{ t: 'tower', score: run.floor }];
      this.checkAchievements();
      if (run.floor < 10) { run.floor++; this.fight = { npc: f.npc, first: false, tower: run.floor }; lines.push('Pulsa "Siguiente piso" para seguir subiendo.'); }
      else { this.towerRun = null; lines.push('¡Has llegado a la cima de la Torre!'); }
    } else { this.towerRun = null; lines.push('Te caes por el hueco del ascensor. Vuelves a la planta baja con un buen chichón.'); }
    return lines;
  }
  get towerActive() { return !!this.towerRun; }
  continueTower() { if (this.towerRun) this.towerFight(); }

  // ------------------------------------------------------------------ historia
  /**
   * Empieza un capítulo EN LA CALLE: escena de llegada, introducción y la previa del primer combate se ven en Hoyo,
   * con los personajes delante de ti. Después se sale al combate y, al ganar, se vuelve aquí (chapterOutro).
   */
  startChapter(id: string) {
    const st = chapterState(CHAPTERS, this.story, id);
    const ch = CHAPTERS.find((c) => c.id === id);
    if (!ch || st !== 'open') { this.ui.toast('Ese capítulo aún no está disponible.', 'bad'); return; }
    const n = CHAPTERS.findIndex((c) => c.id === id) + 1;
    this.ui.chapterCard(`CAPÍTULO ${n}`, ch.title, ch.summary);
    Audio.sfx('ready');
    const beat = CITY_BEATS[id];
    this.playScenes([...(beat?.arrive ?? []), ...ch.intro], () => {
      const first = fightsFor(ch, this.story.flags)[0];
      this.playScenes(first?.before ?? [], () => {
        this.leave(true);
        this.g.startChapterFights(id);
      }, { story: true });
    }, { story: true });
  }

  /** Vuelta a Hoyo tras ganar los combates de un capítulo: escena final en la calle, recompensa y lo que viene después */
  chapterOutro(ch: StoryChapter) {
    const replay = this.story.done.includes(ch.id);
    this.playScenes(ch.outro, () => {
      const reward = this.g.completeStoryChapter(ch);
      if (ch.endsStory && !replay) { this.playEnding(); return; }
      const n = CHAPTERS.findIndex((c) => c.id === ch.id) + 1;
      this.ui.chapterCard('CAPÍTULO COMPLETADO', `${n}. ${ch.title}`, reward ?? '¡La ciudad entera habla de ti!');
      Audio.sfx('win');
      this.view?.refresh();
      const after = replay ? [] : CITY_BEATS[ch.id]?.after ?? [];
      this.playScenes(after, () => { this.afterChapter(ch.id); this.showGoal(); }, { story: true });
    }, { story: true });
  }

  /** Final de la temporada: se ve en la calle y luego la pantalla de FIN */
  private playEnding() {
    const endId = String(this.story.flags.final ?? 'leal');
    const ending = ENDINGS.find((e) => e.id === endId) ?? ENDINGS[0];
    this.playScenes(ending.scenes, () => { this.leave(true); this.g.finishEnding(ending.id); }, { story: true });
  }

  /** Al volver de un capítulo: refresca los distritos y avisa de lo desbloqueado */
  afterChapter(chapterId: string) {
    this.view?.refresh();
    const unlocked = DISTRICTS.filter((d) => d.unlock?.chapter === chapterId);
    for (const d of unlocked) this.ui.toast(`🔓 Nuevo distrito: ${d.name}`, 'gold');
    this.report({ t: 'chapter', id: chapterId });
    this.checkAchievements();
  }

  // ------------------------------------------------------------------ paneles
  private open(title: string, body: (HTMLElement | null)[], wide = false) {
    this.ui.modal(title, body, { wide, onClose: () => { this.busy = false; } });
    this.busy = true; // después de abrir: al reemplazar una ventana, la anterior libera `busy` al cerrarse
  }

  private row(label: string, sub: string, btnText: string, onClick: () => void, disabled = false) {
    return el('div', { class: 'wrow' }, [
      el('div', {}, [el('b', {}, label), el('small', {}, sub)]),
      el('button', { class: 'btn small' + (disabled ? ' disabled' : ''), 'data-nav': true, onClick: () => { if (!disabled) onClick(); else Audio.sfx('foul'); } }, [el('span', {}, btnText)]),
    ]);
  }

  private shopPanel(p: PoiDef) {
    const render = () => {
      const w = this.progress;
      const items = (p.sells ?? []).map((id) => ITEM_MAP.get(id)!).filter(Boolean);
      const list = items.map((it) => {
        const owned = w.inventory[it.id] ?? 0;
        const gear = it.kind !== 'food' && it.kind !== 'boost';
        const lock = it.level && w.level < it.level ? `Nivel ${it.level}` : null;
        return this.row(`${it.name}${owned ? ` ×${owned}` : ''}`, `${it.desc}${lock ? ' · Requiere ' + lock : ''}`, gear && owned ? 'En tu bolsa' : `${it.price} Hoyos`, () => {
          const r = buyItem(w, it);
          if (!r.ok) { this.ui.toast(r.reason!, 'bad'); return; }
          Audio.sfx('unlock'); this.ui.toast(`Comprado: ${it.name}`, 'good');
          this.report({ t: 'buy', id: it.id }, () => undefined);
          render();
        }, (gear && owned > 0) || !!lock);
      });
      this.open(p.name, [el('p', { class: 'wmoney-line' }, `💰 ${w.money} Hoyos`), el('div', { class: 'wlist' }, list)], true);
    };
    render();
  }

  private gymPanel() {
    const render = () => {
      const w = this.progress;
      const rows = ATTRS.map((a) => {
        const lv = w.attrs[a];
        const cost = gymCost(lv);
        const bar = el('div', { class: 'wpips' }, Array.from({ length: ATTR_MAX }, (_, i) => el('i', { class: i < lv ? 'on' : '' })));
        return el('div', { class: 'wrow' }, [
          el('div', {}, [el('b', {}, `${GYM[a].name} ${lv}/${ATTR_MAX}`), el('small', {}, GYM[a].desc), bar]),
          el('button', { class: 'btn small' + (lv >= ATTR_MAX ? ' disabled' : ''), 'data-nav': true, onClick: () => {
            const r = trainAttr(w, a);
            if (!r.ok) { this.ui.toast(r.reason!, 'bad'); Audio.sfx('foul'); return; }
            Audio.sfx('heavy'); this.ui.toast(`Entrenas ${GYM[a].name.toLowerCase()} (${GYM_HOURS} h)`, 'good');
            this.report({ t: 'train' }, () => undefined);
            render();
          } }, [el('span', {}, lv >= ATTR_MAX ? 'Máximo' : `Entrenar · ${cost} Hoyos`)]),
        ]);
      });
      this.open('Gimnasio El Puñetazo', [el('p', {}, `💰 ${w.money} Hoyos · Puntos de entrenamiento: ${w.points} (se ganan al subir de nivel). Cada sesión dura ${GYM_HOURS} horas.`), el('div', { class: 'wlist' }, rows), el('p', { class: 'dim' }, 'Los bonos del gimnasio y del equipo se aplican a Chema en TODOS los modos (con un tope de +30 %).')], true);
    };
    render();
  }

  private homePanel() {
    const w = this.progress;
    this.open('Tu piso', [
      el('p', {}, `Son las ${clockText(w)} del día ${dayOf(w)}. En casa puedes descansar y guardar la partida.`),
      el('div', { class: 'wlist' }, [
        this.row('Cama', 'Echa una siesta o duerme hasta la hora que quieras. Dormir bien te da ventaja en el próximo combate.', 'Dormir…', () => this.sleepPanel()),
        this.row('Guardar partida', 'Se guarda sola cada pocos segundos, pero por si acaso.', 'Guardar', () => { if (this.view) w.pos = { x: this.view.px, z: this.view.pz, yaw: this.view.yaw }; this.persist(); this.ui.toast('Partida guardada.', 'good'); }),
        this.row('Armario', 'Cambia de traje y de equipo y mírate en el espejo.', 'Abrir', () => this.wardrobePanel()),
      ]),
    ]);
  }

  /** Menú de dormir: siesta o hasta una hora concreta, con animación del reloj */
  private sleepPanel() {
    const w = this.progress;
    const now = w.time % DAY_MIN;
    const until = (h: number) => { const t = Math.round(h * 60); return now < t ? t - now : DAY_MIN - now + t; };
    const opts: [string, string, number][] = [
      ['Siesta corta', '1 hora. Para despejarse.', 60],
      ['Hasta el mediodía', 'Despiertas a las 12:00.', until(12)],
      ['Hasta la tarde', 'Despiertas a las 18:00.', until(18)],
      ['Hasta la noche', 'Despiertas a las 22:00: abre el garito y salen otros vecinos.', until(22)],
      ['Hasta mañana', 'Despiertas a las 8:00 como nuevo.', until(8)],
    ];
    const rows = opts.map(([t, sub, mins]) => this.row(t, `${sub} (${Math.floor(mins / 60)} h ${mins % 60 ? (mins % 60) + ' min' : ''})`, 'Dormir', () => void this.sleep(mins)));
    this.open('A dormir', [el('p', {}, `Son las ${clockText(w)} del día ${dayOf(w)}. Si duermes 6 horas o más, empiezas el próximo combate descansado (+10 % de vida).`), el('div', { class: 'wlist' }, rows)]);
  }

  private async sleep(mins: number) {
    const w = this.progress;
    this.ui.closeModal();
    this.busy = true;
    const from = w.time % DAY_MIN;
    Audio.sfx('click');
    await this.ui.sleepAnim(from, mins);
    const days = addTime(w, mins);
    if (mins >= 360) { w.pending.hp = Math.max(w.pending.hp, 10); this.ui.toast('Duermes como un campeón: próximo combate con +10 % de vida.', 'good'); }
    else this.ui.toast('Una siestecita. Ya estás más despejado.', 'info');
    if (days > 0) this.ui.toast(`Amanece el día ${dayOf(w)}`, 'gold');
    this.busy = false;
    this.persist();
    this.report({ t: 'sleep' });
  }

  /** Armario: traje y equipo con Chema en primer plano girando; los cambios se ven al momento */
  wardrobePanel() {
    const w = this.progress;
    if (this.view?.riding) this.view.dismount();
    this.view?.wardrobeCam(true);
    this.ui.setCinema(true);
    const render = () => {
      const f = ROSTER.find((r) => r.id === 'chema')!;
      const skins = (f.skins ?? []).filter((s) => !s.unlock || this.g.save.achievements[s.unlock.achievement]);
      const cur = this.g.save.skins?.['chema'] ?? '';
      const setSkin = (id: string) => { this.g.save.skins = { ...(this.g.save.skins ?? {}), chema: id }; refresh(); };
      const chips = (items: { id: string; name: string }[], current: string, pick: (id: string) => void) => el('div', { class: 'wchips' }, items.map((it) => el('button', { class: 'chip' + (it.id === current ? ' on' : ''), 'data-nav': true, onClick: () => { Audio.sfx('click'); pick(it.id); } }, it.name)));
      const slots: [Slot, string][] = [['belt', 'Cinturón'], ['shoes', 'Calzado'], ['charm', 'Amuleto']];
      const lockedSkins = (f.skins ?? []).filter((s) => s.unlock && !this.g.save.achievements[s.unlock.achievement]).length;
      const b = bonusOf(w, ITEMS);
      this.ui.modal('Armario', [
        el('h3', {}, 'Traje'),
        chips([{ id: '', name: 'Original' }, ...skins.map((s) => ({ id: s.id, name: s.name }))], cur, setSkin),
        lockedSkins ? el('p', { class: 'dim' }, `${lockedSkins} traje(s) más por desbloquear con logros.`) : null,
        ...slots.flatMap(([slot, name]) => {
          const owned = ITEMS.filter((i) => i.kind === slot && (w.inventory[i.id] ?? 0) > 0);
          return [el('h3', {}, name), owned.length ? chips([{ id: '', name: 'Nada' }, ...owned.map((i) => ({ id: i.id, name: i.name }))], w.equip[slot] ?? '', (id) => { equipItem(w, slot, id || null, ITEMS); refresh(); }) : el('p', { class: 'dim' }, 'No tienes ninguno: mira en Merch Hoyo.')];
        }),
        el('p', { class: 'wbonus' }, `Daño ${pct(b.power)} · Velocidad ${pct(b.speed)} · Vida ${pct(b.health)} · Resistencia ${pct(b.stamina)} · Zafarse ${pct(b.escape)} · Daño recibido ${pct(b.resist)}`),
      ], { side: true, onClose: () => setTimeout(() => { if (!this.ui.modalOpen) { this.busy = false; this.view?.wardrobeCam(false); this.ui.setCinema(false); } }, 0) });
      this.busy = true;
    };
    const refresh = () => { this.view?.setPlayerLook(this.playerLook()); this.persist(); render(); };
    render();
  }

  private travelPanel() {
    const w = this.progress;
    const cost = 20;
    const rows = DISTRICTS.map((d) => {
      const open = this.bridge.isOpen(d.id);
      const here = this.view?.district === d.id;
      return this.row(d.name, open ? d.blurb : d.lockText ?? 'Cerrado', here ? 'Estás aquí' : open ? `Viajar · ${cost} Hoyos` : 'Cerrado', () => {
        if (w.money < cost) { this.ui.toast('No te llega para el taxi.', 'bad'); return; }
        const spot = this.view!.layout.spots['poi:taxi_' + d.id];
        if (!spot) return;
        addMoney(w, -cost); addTime(w, 30);
        this.ui.closeModal();
        if (this.view?.riding) this.view.dismount();
        // trayecto: barrido, cartel del taxi y llegada
        this.busy = true;
        this.g.screens.wipe();
        Audio.sfx('ready');
        setTimeout(() => {
          this.view!.teleport(spot.x + 2.8, spot.z + 2.8, 0);
          this.ui.chapterCard('🚕 TAXI DE HOYO', d.name, d.blurb);
          this.busy = false;
        }, 320);
      }, !open || here);
    });
    this.open('Taxi de Hoyo', [el('p', {}, 'Veinte Hoyos el viaje, treinta minutos de mundo.'), el('div', { class: 'wlist' }, rows)], true);
  }

  private boardPanel() {
    const avail = questsAvailable(QUESTS, this.ctx());
    const rows = avail.map((q) => el('div', { class: 'wrow' }, [el('div', {}, [el('b', {}, q.title), el('small', {}, `${q.summary} — Habla con ${this.bridge.npcName(q.giver)}.`)])]));
    this.open('Tablón de misiones', [el('p', {}, 'Misiones que te están esperando. Los NPC con un ! dorado encima tienen una para ti.'), el('div', { class: 'wlist' }, rows.length ? rows : [el('p', { class: 'dim' }, 'No hay misiones nuevas ahora mismo. Avanza en la historia y explora: aparecerán más.')])], true);
  }

  private questsPanel() {
    const w = this.progress;
    const act = activeQuests(w, QUESTS);
    const done = QUESTS.filter((q) => questState(w, q.id) === 'done');
    this.open('Diario de misiones', [
      el('p', { class: 'dim' }, `Completadas: ${done.length}/${QUESTS.length}`),
      el('h3', {}, 'En curso'),
      el('div', { class: 'wlist' }, act.length ? act.map((q) => { const st = w.quests[q.id], step = q.steps[st.step]; return el('div', { class: 'wrow' }, [el('div', {}, [el('b', {}, q.title), el('small', {}, `${step.text}${(step.count ?? 1) > 1 ? ` (${st.n}/${step.count})` : ''}`)])]); }) : [el('p', { class: 'dim' }, 'Ninguna. Habla con la gente (¡un ! dorado!) o mira el tablón.')]),
      done.length ? el('h3', {}, 'Completadas') : null,
      done.length ? el('p', { class: 'dim' }, done.map((q) => q.title).join(' · ')) : null,
    ], true);
  }

  private inventoryPanel() {
    const w = this.progress;
    const render = () => {
      const slots: Slot[] = ['belt', 'shoes', 'charm'];
      const names: Record<Slot, string> = { belt: 'Cinturón', shoes: 'Calzado', charm: 'Amuleto' };
      const b = bonusOf(w, ITEMS);
      const equip = slots.map((s) => {
        const owned = ITEMS.filter((i) => i.kind === s && (w.inventory[i.id] ?? 0) > 0);
        const cur = w.equip[s];
        return el('div', { class: 'wrow' }, [
          el('div', {}, [el('b', {}, `${names[s]}: ${cur ? ITEM_MAP.get(cur)!.name : '—'}`), el('small', {}, owned.length ? 'Pulsa para cambiar de objeto.' : 'No tienes ninguno. Mira en Merch Hoyo.')]),
          el('div', { class: 'wchips' }, [
            ...owned.map((i) => el('button', { class: 'chip' + (cur === i.id ? ' on' : ''), 'data-nav': true, onClick: () => { equipItem(w, s, cur === i.id ? null : i.id, ITEMS); render(); } }, i.name)),
          ]),
        ]);
      });
      const cons = ITEMS.filter((i) => (i.kind === 'food' || i.kind === 'boost') && (w.inventory[i.id] ?? 0) > 0).map((i) => this.row(`${i.name} ×${w.inventory[i.id]}`, i.desc, 'Usar', () => { useItem(w, i); this.ui.toast(`Usas ${i.name}: se aplica a tu próximo combate.`, 'good'); render(); }));
      const pend = w.pending;
      const skinRow = this.skinRow();
      this.open('Inventario', [
        el('p', {}, `Bonos actuales — Daño ${pct(b.power)} · Velocidad ${pct(b.speed)} · Vida ${pct(b.health)} · Resistencia ${pct(b.stamina)} · Zafarse ${pct(b.escape)} · Daño recibido ${pct(b.resist)}${b.startMom ? ` · Momentum inicial +${b.startMom}` : ''}`),
        el('h3', {}, 'Equipo'), el('div', { class: 'wlist' }, equip),
        el('h3', {}, 'Consumibles'),
        el('div', { class: 'wlist' }, cons.length ? cons : [el('p', { class: 'dim' }, 'No llevas ninguno.')]),
        pend.hp || pend.mom || pend.power ? el('p', {}, `Para el próximo combate: ${pend.hp ? `+${pend.hp}% vida ` : ''}${pend.mom ? `+${pend.mom} momentum ` : ''}${pend.power ? `+${pend.power}% daño` : ''}`) : null,
        skinRow,
        el('p', { class: 'dim' }, `Pegatinas ${w.collected.length}/${STICKERS.length} · Cartas ${w.cards.length}/14 · Grafitis fotografiados ${w.graffiti.filter((x) => x.startsWith('g_')).length}/${GRAFFITI.length}`),
      ], true);
    };
    render();
  }
  private skinRow(): HTMLElement | null {
    const f = ROSTER.find((r) => r.id === 'chema')!;
    const open = (f.skins ?? []).filter((s) => !s.unlock || this.g.save.achievements[s.unlock.achievement]);
    if (!open.length) return null;
    const cur = this.g.save.skins?.['chema'] ?? '';
    return el('div', { class: 'wrow' }, [el('div', {}, [el('b', {}, 'Traje'), el('small', {}, 'Cambia el aspecto de Chema (se nota al volver al mundo).')]), el('div', { class: 'wchips' }, [
      el('button', { class: 'chip' + (!cur ? ' on' : ''), onClick: () => { this.g.save.skins = { ...(this.g.save.skins ?? {}), chema: '' }; this.ui.toast('Traje: original', 'info'); } }, 'Original'),
      ...open.map((s) => el('button', { class: 'chip' + (cur === s.id ? ' on' : ''), onClick: () => { this.g.save.skins = { ...(this.g.save.skins ?? {}), chema: s.id }; this.ui.toast('Traje: ' + s.name, 'info'); } }, s.name)),
    ])]);
  }

  private mapPanel() {
    const cv = document.createElement('canvas'); cv.width = 520; cv.height = 520; cv.className = 'wmap-big';
    if (this.view) this.ui.paintMap(cv, this.mapData(false), 520, 0);
    const ch = this.pendingChapter();
    this.open('Mapa de Hoyo', [
      ch ? el('p', { class: 'wmap-goal' }, `★ Siguiente capítulo: ${ch.title} — ${CITY_BEATS[ch.id]?.goal ?? ''}`) : null,
      cv,
      el('p', { class: 'dim' }, '★ dorado = capítulo de la historia · naranja = luchadores (puedes retarlos) · azul = alguien tiene una misión · morado = tu moto · gris = lugares. Los barrios con candado se abren avanzando en la historia.'),
    ]);
  }

  statsPanel() {
    const w = this.progress, s = w.stats;
    this.open('Estadísticas de Hoyo', [el('div', { class: 'hstats' }, [
      ['Nivel', String(w.level)], ['Combates callejeros', `${s.wins}/${s.fights}`], ['Misiones', `${doneQuests(w)}/${QUESTS.length}`], ['Pegatinas', `${w.collected.length}/${STICKERS.length}`],
      ['Cartas', `${w.cards.length}/14`], ['Hoyos ganados', String(s.money)], ['Apuestas ganadas', `${s.betsWon}/${s.bets}`], ['Peces', String(s.fish)], ['Mejor piso de la Torre', `${w.tower}/10`], ['Días', String(dayOf(w))],
    ].map(([k, v]) => el('div', { class: 'hstat' }, [el('b', {}, v), el('span', {}, k)])))]);
  }

  /** Mando en la ciudad: A usar/hablar, Y mapa, X bolsa, Select misiones, B cerrar ventanas */
  private miniRunning = false;
  pad(a: string) {
    if (!this.active) return;
    if (this.miniRunning) {
      const code = ({ confirm: 'Space', x: 'KeyA', y: 'KeyS', back: 'KeyD' } as Record<string, string>)[a];
      const res = this.ui.host.querySelector<HTMLElement>('.mini-result .btn');
      if (a === 'confirm' && res) { res.click(); return; }
      if (code) window.dispatchEvent(new KeyboardEvent('keydown', { code, key: code === 'Space' ? ' ' : code.slice(3).toLowerCase() }));
      return;
    }
    if (this.ui.modalOpen) { if (a === 'start') { this.ui.closeModal(); return; } this.ui.pad(a); return; }
    if (this.busy) return;
    if (a === 'confirm') { if (this.view?.target) this.interact(this.view.target); }
    else if (a === 'y') this.mapPanel();
    else if (a === 'x') this.inventoryPanel();
    else if (a === 'select') this.questsPanel();
  }

  pauseMenu() {
    if (!this.active) return;
    if (this.ui.modalOpen) { this.ui.closeModal(); return; }
    if (this.busy) return;
    const items: [string, string, () => void][] = [
      ['Misiones (Q)', 'Diario de misiones', () => { this.ui.closeModal(); this.questsPanel(); }],
      ['Inventario (I)', 'Equipo, consumables y traje', () => { this.ui.closeModal(); this.inventoryPanel(); }],
      ['Armario', 'Cambia de traje y de equipo', () => { this.ui.closeModal(); this.wardrobePanel(); }],
      ['Mapa (M)', 'Distritos y marcadores', () => { this.ui.closeModal(); this.mapPanel(); }],
      ['Estadísticas', 'Tu progreso en Hoyo', () => { this.ui.closeModal(); this.statsPanel(); }],
      ['Capítulos y finales', 'Repite capítulos ya jugados o mira los finales', () => { this.ui.closeModal(); this.leave(true); this.g.goMenu(); this.g.screens.showStoryMenu(); }],
      ['Guardar y salir al menú', 'Vuelves al menú principal; tu progreso se guarda', () => { this.ui.closeModal(); this.exitToMenu(); }],
    ];
    this.open('Pausa', [el('div', { class: 'wlist' }, [
      el('button', { class: 'btn primary go', 'data-nav': true, onClick: () => this.ui.closeModal() }, [el('span', {}, 'Seguir explorando')]),
      ...items.map(([t, s, f]) => el('button', { class: 'btn', 'data-nav': true, onClick: f }, [el('span', {}, t), el('small', {}, s)])),
    ]), el('p', { class: 'dim' }, 'WASD / joystick mover · Shift correr · E / HABLAR interactuar · arrastra (o , y .) para girar la cámara')]);
  }

  exitToMenu() { this.leave(true); this.g.goMenu(); }

  // ------------------------------------------------------------------ minijuegos y apuestas
  private async playMinigame(id: MiniId) {
    this.busy = true;
    this.ui.closeModal();
    const best = this.progress.records[id] ?? 0;
    this.miniRunning = true;
    const r = await runMinigame(this.ui.host, id, best);
    this.miniRunning = false;
    const w = this.progress;
    addTime(w, 20);
    let money = 0;
    if (id === 'pulso') money = r.won ? 50 + r.score * 6 : 0;
    else if (id === 'comilona') money = r.score * 9;
    else if (id === 'tambores') money = r.score * 8;
    else if (id === 'pesca' && r.score) { money = 40; w.inventory.pescado = (w.inventory.pescado ?? 0) + 1; w.stats.fish++; this.ui.toast('Pescado fresco añadido a tu bolsa.', 'good'); }
    if (money) { addMoney(w, money); this.ui.toast(`${MINI_INFO[id].name}: +${money} Hoyos`, 'good'); }
    if (r.score > (w.records[id] ?? 0)) { w.records[id] = r.score; if (best) this.ui.toast('¡Nuevo récord!', 'gold'); }
    if (r.score || r.won) this.gainXp(Math.max(8, r.score * 2));
    this.busy = false;
    if (id !== 'pesca' || r.score) this.report({ t: 'minigame', id, score: r.score });
  }

  private betsPanel() {
    const w = this.progress;
    const pool = ROSTER.filter((f) => !f.placeholder && f.id !== 'chema' && this.g.isUnlocked(f));
    // tres combates del día (fijos para el día)
    let s = dayOf(w) * 7919;
    const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    const pairs: [FighterData, FighterData][] = [];
    const picked = [...pool];
    for (let i = 0; i < 3 && picked.length >= 2; i++) {
      const a = picked.splice(Math.floor(rnd() * picked.length), 1)[0], b = picked.splice(Math.floor(rnd() * picked.length), 1)[0];
      pairs.push([a, b]);
    }
    const render = (msg?: string) => {
      const rows = pairs.map(([a, b]) => {
        // cuota estimada con unas cuantas simulaciones (se cachea por combate/día)
        const key = `${a.id}|${b.id}|${dayOf(w)}`;
        const p = this.oddsCache.get(key) ?? (() => { let wins = 0; for (let i = 0; i < 7; i++) if (simulateMatch(a, b, 'intermedia').winner === 0) wins++; const v = (wins + 1) / 9; this.oddsCache.set(key, v); return v; })();
        const odds = betOdds(p);
        const bet = (pickA: boolean, stake: number) => {
          if (w.money < stake) { this.ui.toast('No tienes tanto dinero.', 'bad'); return; }
          addMoney(w, -stake); addTime(w, 20); w.stats.bets++;
          const res = simulateMatch(a, b, 'intermedia');
          const winnerA = res.winner === 0;
          const won = winnerA === pickA;
          if (won) { const pay = betPayout(stake, pickA ? odds.a : odds.b); addMoney(w, pay); w.stats.betsWon++; this.ui.toast(`¡Gana ${winnerA ? a.name : b.name}! Cobras ${pay} Hoyos.`, 'gold'); Audio.sfx('win'); }
          else { this.ui.toast(`Gana ${winnerA ? a.name : b.name}. Pierdes ${stake} Hoyos.`, 'bad'); Audio.sfx('foul'); }
          this.pairsDone.add(key);
          this.report({ t: 'bet', won });
          this.gainXp(12);
          render(won ? '¡Apuesta ganada!' : 'Apuesta perdida.');
        };
        const stakes = [20, 50, 100, 250];
        return el('div', { class: 'wbet' }, [
          el('div', { class: 'wbet-h' }, [el('b', {}, `${a.name}`), el('em', {}, 'vs'), el('b', {}, b.name)]),
          el('div', { class: 'wbet-c' }, [
            el('div', {}, [el('small', {}, `Cuota ${odds.a}`), ...stakes.map((st) => el('button', { class: 'btn small', onClick: () => bet(true, st) }, [el('span', {}, `${st} a ${a.name}`)]))]),
            el('div', {}, [el('small', {}, `Cuota ${odds.b}`), ...stakes.map((st) => el('button', { class: 'btn small', onClick: () => bet(false, st) }, [el('span', {}, `${st} a ${b.name}`)]))]),
          ]),
        ]);
      });
      this.open('El Garito de las 3000 · Apuestas', [el('p', {}, `💰 ${w.money} Hoyos. ${msg ?? 'Elige un combate y a quién apoyas. Cada apuesta lleva 20 minutos y la casa se queda un margen.'}`), ...rows], true);
    };
    render();
  }
  private oddsCache = new Map<string, number>();
  private pairsDone = new Set<string>();

  // ------------------------------------------------------------------ Matamoros: torneos
  private arenaPanel() {
    const rows = [
      this.row('Hoyo Champion', 'El torneo del Hoyo: 3 combates en los mapas profesionales con Chema.', 'Jugar', () => { this.ui.closeModal(); this.leave(true); this.g.startTournament({ kind: 'champion', player: 'chema', skin: this.g.save.skins?.['chema'], difficulty: streetDifficulty(this.level()) }); }),
      this.row('Hoyo Femboy Champion', 'Contra Elso, el campeón, en los mapas de la calle.', 'Jugar', () => { this.ui.closeModal(); this.leave(true); this.g.startTournament({ kind: 'femboy', player: 'chema', skin: this.g.save.skins?.['chema'], difficulty: streetDifficulty(this.level()) }); }),
      this.row('Hoyo Tag Champion', 'Por parejas: elige compañero entre los luchadores que conoces.', 'Elegir compañero', () => { this.ui.closeModal(); this.pickPartner(); }),
    ];
    this.open('Estadio de Matamoros', [el('p', {}, 'Los torneos se juegan con Chema y con todo lo que has mejorado. Ganar uno da dinero y experiencia.'), el('div', { class: 'wlist' }, rows)], true);
  }
  private pickPartner() {
    const pool = ROSTER.filter((f) => !f.placeholder && f.id !== 'chema' && this.g.isUnlocked(f));
    const rows = pool.map((f) => this.row(f.name, f.style, 'Elegir', () => { this.ui.closeModal(); this.leave(true); this.g.startTournament({ kind: 'tag', player: 'chema', partner: f.id, skin: this.g.save.skins?.['chema'], difficulty: streetDifficulty(this.level()) }); }));
    this.open('Elige a tu compañero', [el('div', { class: 'wlist' }, rows)], true);
  }

  /** Recompensa por ganar un torneo jugado desde el mundo */
  tournamentReward(kind: string) {
    const w = migrateWorld(this.g.save.world);
    this.g.save.world = w;
    const money = kind === 'tag' ? 700 : 600, xp = 450;
    addMoney(w, money); const lv = addXp(w, xp);
    return `+${money} Hoyos · +${xp} XP${lv ? ` · ¡Nivel ${w.level}!` : ''}`;
  }
}

const pct = (n: number) => (n >= 1 ? '+' : '') + Math.round((n - 1) * 100) + '%';
void clear; void ITEM_MAP; void ARENA_INFO;
