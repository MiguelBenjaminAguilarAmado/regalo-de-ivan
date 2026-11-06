import type { ArenaId, Difficulty, FighterData } from '../combat/types';
import { kbd } from '../input/glyphs';
import { voice } from '../content/voices';
import { openCompanion } from '../dual/DualLink';
import type { Game, ResultInfo, SurvivalRun, VersusSetup } from '../game/Game';
import { PERKS, perkById, type Perk } from '../modes/Survival';
import type { PadAction } from '../input/PadNav';
import { ACHIEVEMENTS } from '../progress/Achievements';
import { roundName, arenaForRound, opponentOf, playerPairing, teamOf, TOURS, TOUR_KINDS, type Bracket, type TourKind } from '../modes/Tournament';
import { getMove } from '../combat/moves';
import { Audio } from '../audio/Audio';
import { clear, el } from './dom';
import { ARENA_IDS, ARENA_INFO } from '../combat/arenaInfo';
import { withSkin } from '../content/roster';
import { DUOS, duoOf } from '../content/duos';
import { MUTATORS } from '../combat/mutators';
import { writeSave } from '../progress/Save';
import { CHAPTERS, ENDINGS, STORY_INTRO, STORY_TITLE } from '../../content/historia';
import { chapterState, chaptersFor, holds, lineVisible, newProgress, nextChapter, type Flags, type StoryChapter, type StoryChoice, type StoryLine, type StoryProgress, type StoryScene } from '../modes/Story';
import type { MutatorId } from '../combat/mutators';

const ARENAS: { id: ArenaId | 'random'; name: string; desc: string }[] = [
  ...ARENA_IDS.map((id) => ({ id, name: ARENA_INFO[id].name, desc: ARENA_INFO[id].desc })),
  { id: 'random', name: 'Aleatoria', desc: 'Que decida el destino' },
];
const DIFFS: { id: Difficulty; name: string; desc: string }[] = [
  { id: 'facil', name: 'Fácil', desc: 'La CPU falla a propósito y perdona errores.' },
  { id: 'intermedia', name: 'Intermedia', desc: 'Recomendada: espectáculo y reto.' },
  { id: 'dificil', name: 'Difícil', desc: 'La CPU no perdona. Se juega la vida.' },
];
const norm = (v: number, a: number, b: number) => Math.max(0.05, Math.min(1, (v - a) / (b - a)));

interface ResultButton { label: string; primary?: boolean; action: () => void }

export class Screens {
  private cur: HTMLElement | null = null;
  private pauseEl: HTMLElement | null = null;
  private onBack: (() => void) | null = null;
  private typing: number | null = null;
  private confirmHandler: (() => void) | null = null;
  private pauseResume: (() => void) | null = null;
  /** true cuando se navega con teclado/mando: entonces sí se muestra una opción seleccionada */
  private useFocus = false;

  constructor(private root: HTMLElement, private game: Game) {
    window.addEventListener('keydown', (e) => this.nav(e));
    // con el ratón no hay "selección" fija: solo el hover
    const mouse = () => { if (this.useFocus) { this.useFocus = false; document.body.classList.remove('nav-focus'); (document.activeElement as HTMLElement | null)?.blur?.(); } };
    window.addEventListener('pointerdown', mouse); window.addEventListener('mousemove', mouse);
  }

  isOpen() { return !!(this.cur || this.pauseEl); }

  /** Barrido de transición estilo cómic: dos franjas ladeadas que cruzan la pantalla */
  wipe() {
    const w = el('div', { class: 'wipe' }, [el('i', { class: 'w1' }), el('i', { class: 'w2' }), el('i', { class: 'w3' })]);
    document.body.appendChild(w);
    setTimeout(() => w.remove(), 650);
  }

  // ---------------------------------------------------------------- utilidades
  private set(node: HTMLElement, back: (() => void) | null = null) {
    // al repintar la misma pantalla (p. ej. al elegir un luchador) se conserva el elemento seleccionado
    let keep = -1;
    if (this.useFocus && this.cur && this.cur.className === node.className) keep = [...this.cur.querySelectorAll('[data-nav]')].indexOf(document.activeElement as Element);
    // transición en barrido diagonal (rojo y negro) al cambiar de tipo de pantalla
    const prevKind = this.cur?.className ?? '';
    if (prevKind && prevKind !== node.className && !node.classList.contains('dialogue') && !this.cur!.classList.contains('dialogue')) this.wipe();
    this.clear();
    this.cur = node;
    this.onBack = back;
    this.confirmHandler = null;
    this.root.appendChild(node);
    if (this.useFocus) { const items = node.querySelectorAll<HTMLElement>('[data-nav]'); if (keep >= 0 && items[keep]) items[keep].focus({ preventScroll: true }); else this.focusFirst(node); }
  }
  private focusFirst(scope: HTMLElement) {
    scope.querySelector<HTMLElement>('.go:not([disabled])')?.focus({ preventScroll: true }) ?? scope.querySelector<HTMLElement>('[data-nav]:not([disabled])')?.focus({ preventScroll: true });
  }
  private enterNavMode() {
    if (!this.useFocus) { this.useFocus = true; document.body.classList.add('nav-focus'); }
  }
  clear() {
    if (this.typing) { clearInterval(this.typing); this.typing = null; }
    this.cur?.remove(); this.cur = null; this.onBack = null;
  }
  private click(sfx = 'click') { Audio.init(); Audio.sfx(sfx); }

  private nav(e: KeyboardEvent) {
    if (!this.cur && !this.pauseEl) return;
    if (e.key === 'Escape' && this.onBack && !this.pauseEl) { this.click('back'); this.onBack(); e.preventDefault(); return; }
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    if ((e.target as HTMLElement)?.tagName === 'INPUT' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
    const dir = ({ ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' } as const)[e.key as 'ArrowUp'];
    this.moveFocus(dir);
    e.preventDefault();
  }

  /** Mueve la selección en una dirección (teclado y mando). */
  private moveFocus(dir: 'up' | 'down' | 'left' | 'right') {
    const scope = this.pauseEl ?? this.cur;
    if (!scope) return;
    this.enterNavMode();
    const items = [...scope.querySelectorAll<HTMLElement>('[data-nav]:not([disabled])')].filter((i) => i.offsetParent !== null);
    if (!items.length) return;
    const active = document.activeElement as HTMLElement;
    if (!items.includes(active)) { this.focusFirst(scope); Audio.sfx('click'); return; }
    // los deslizadores se ajustan con izquierda/derecha
    if (active instanceof HTMLInputElement && active.type === 'range' && (dir === 'left' || dir === 'right')) {
      const step = Number(active.step || 0.05) * (dir === 'left' ? -1 : 1);
      active.value = String(Math.max(Number(active.min), Math.min(Number(active.max), Number(active.value) + step)));
      active.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    const a = active.getBoundingClientRect();
    const v = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[dir];
    let best: HTMLElement | null = null, bd = Infinity;
    for (const it of items) {
      if (it === active) continue;
      const r = it.getBoundingClientRect();
      const dx = r.left + r.width / 2 - (a.left + a.width / 2), dy = r.top + r.height / 2 - (a.top + a.height / 2);
      const along = dx * v[0] + dy * v[1];
      if (along <= 4) continue;
      const across = Math.abs(dx * v[1]) + Math.abs(dy * v[0]);
      const d = along + across * 2.2;
      if (d < bd) { bd = d; best = it; }
    }
    if (best) { best.focus(); best.scrollIntoView({ block: 'nearest', inline: 'nearest' }); Audio.sfx('click'); }
  }

  /** Acciones del mando en los menús */
  pad(a: PadAction) {
    Audio.init();
    if (a === 'up' || a === 'down' || a === 'left' || a === 'right') { this.moveFocus(a); return; }
    this.enterNavMode();
    if (this.pauseEl) {
      if (a === 'back' || a === 'start') { this.click('back'); this.pauseResume?.(); return; }
      if (a === 'confirm') { const f = document.activeElement as HTMLElement; if (this.pauseEl.contains(f) && f.matches('[data-nav]')) f.click(); else { this.focusFirst(this.pauseEl); } }
      return;
    }
    if (!this.cur) return;
    if (a === 'back') { if (this.cur.classList.contains('dialogue')) { this.cur.querySelector<HTMLElement>('.skip')?.click(); return; } if (this.onBack) { this.click('back'); this.onBack(); } return; }
    if (a === 'confirm' || a === 'start') {
      const f = document.activeElement as HTMLElement;
      // en los diálogos, si hay una opción seleccionada se elige esa
      if (this.cur.contains(f) && f.matches('.dchoice, .mapcard, .btn.go')) { f.click(); return; }
      if (this.confirmHandler) { this.confirmHandler(); return; }
      if (this.cur.contains(f) && f.matches('[data-nav]')) { if (f instanceof HTMLInputElement) return; f.click(); }
      else this.focusFirst(this.cur);
    }
  }

  private btn(label: string, onClick: () => void, cls = '', sub = '') {
    return el('button', { class: 'btn ' + cls, 'data-nav': true, onClick: () => { this.click(cls.includes('primary') ? 'confirm' : 'click'); onClick(); } }, [el('span', {}, label), sub && el('small', {}, sub)]);
  }

  private portrait(f: FighterData | null, cls = '') {
    const box = el('div', { class: 'portrait ' + cls });
    // en todas partes se usa la foto de perfil (pfp); si un luchador no tiene, se usa su foto principal
    const src = f ? f.pfp ?? f.portrait : null;
    if (src) box.appendChild(el('img', { src, alt: f!.name, draggable: false }));
    else box.appendChild(el('div', { class: 'noimg' }, f ? f.name.charAt(0) : '?'));
    return box;
  }

  private statBars(f: FighterData) {
    const s = f.fullStats;
    const rows: [string, number][] = [
      ['Velocidad', norm(s.speed, 0.8, 1.35)], ['Potencia', norm(s.power, 0.8, 1.3)], ['Vida', norm(s.health, 65, 130)],
      ['Resistencia', norm(s.stamina, 80, 140)], ['Rapidez golpes', norm(s.tempo, 0.85, 1.3)],
    ];
    return el('div', { class: 'stats' }, rows.map(([n, v]) => el('div', { class: 'stat' }, [el('span', {}, n), el('div', { class: 'sbar' }, [el('i', { style: `width:${Math.round(v * 100)}%` })])])));
  }

  private movesList(f: FighterData) {
    const m = f.moves;
    const li = (k: string, v: string) => el('li', {}, [el('em', {}, k), v]);
    return el('ul', { class: 'moves' }, [
      li('Combo', m.light.map((id) => getMove(id).name).join(' · ')),
      li(m.heavyRandom ? 'Fuerte (azar)' : 'Fuerte', m.heavyRandom ? m.heavyRandom.map(([id]) => getMove(id).name).join(' · ') : getMove(m.heavy).name),
      li('Agarres', `${f.moves.grab.throw} / ${f.moves.grab.slam} / ${f.moves.grab.sub}`.replace(/_/g, ' ')),
      li('Burla', getMove(m.taunt).name),
      el('li', { class: 'fin' }, [el('em', {}, 'Finisher'), getMove(m.finisher).name]),
    ]);
  }

  private card(f: FighterData | null, side: 'left' | 'right', tag: string, extra?: HTMLElement | null) {
    if (!f) return el('div', { class: `fcard ${side} empty` }, [el('div', { class: 'ftag' }, tag), el('div', { class: 'fname' }, 'Elige luchador')]);
    return el('div', { class: `fcard ${side}${extra ? ' hasskin' : ''}` }, [
      el('div', { class: 'ftag' }, tag),
      this.portrait(f, 'big'),
      el('div', { class: 'fname' }, f.name),
      this.statBars(f),
      el('div', { class: 'fbio' }, f.style),
      extra,
    ]);
  }

  /** Selector de traje de un luchador (null si solo tiene el original) */
  private skinChips(f: FighterData | null, current: string | undefined, onPick: (skin: string) => void): HTMLElement | null {
    const open = (f?.skins ?? []).filter((s) => !s.unlock || this.game.save.achievements[s.unlock.achievement]);
    if (!f || !open.length) return null;
    const items = [{ id: 'original', name: 'Original', desc: 'Su aspecto de siempre.' }, ...open.map((s) => ({ id: s.id, name: s.name, desc: s.description }))];
    return this.chips(items, current && open.some((s) => s.id === current) ? current : 'original', (v) => onPick(v === 'original' ? '' : v), 'TRAJE');
  }

  /** Fila de selección de luchadores */
  private strip(selected: Record<string, boolean>, onPick: (f: FighterData) => void, opts: { random?: () => void; all?: boolean; mark?: Set<string> } = {}) {
    const strip = el('div', { class: 'strip' });
    for (const f of this.game.roster) {
      const unlocked = opts.all || this.game.isUnlocked(f);
      const t = el('button', {
        class: 'tile' + (selected[f.id] ? ' sel' : '') + (unlocked ? '' : ' locked') + (f.placeholder ? ' ph' : '') + (opts.mark?.has(f.id) ? ' duo' : ''), 'data-nav': true, title: unlocked ? f.name : f.unlock?.hint ?? 'Bloqueado',
        onClick: () => { if (unlocked) { this.click(); onPick(f); } else { Audio.sfx('foul'); } },
      }, [this.portrait(f), opts.mark?.has(f.id) ? el('span', { class: 'duostar' }, '★ DÚO') : null, el('span', { class: 'tname' }, unlocked ? f.name : '???'), !unlocked && el('span', { class: 'lock' }, '🔒 ' + (f.unlock?.hint ?? ''))]);
      strip.appendChild(t);
    }
    if (opts.random) strip.appendChild(el('button', { class: 'tile rnd', 'data-nav': true, onClick: () => { this.click(); opts.random!(); } }, [el('div', { class: 'portrait' }, [el('div', { class: 'noimg' }, '?')]), el('span', { class: 'tname' }, 'Aleatorio')]));
    return strip;
  }

  private chips<T extends string>(items: { id: T; name: string; desc: string }[], value: T, onPick: (v: T) => void, title: string) {
    const desc = el('div', { class: 'chipdesc' }, items.find((i) => i.id === value)?.desc ?? '');
    const row = el('div', { class: 'chips' });
    items.forEach((it) => {
      row.appendChild(el('button', { class: 'chip' + (it.id === value ? ' on' : ''), 'data-nav': true, onClick: () => { this.click(); onPick(it.id); row.querySelectorAll('.chip').forEach((c) => c.classList.remove('on')); (row.querySelector(`[data-id="${it.id}"]`) as HTMLElement).classList.add('on'); desc.textContent = it.desc; }, 'data-id': it.id }, it.name));
    });
    return el('div', { class: 'chipgroup' }, [el('div', { class: 'chiptitle' }, title), row, desc]);
  }

  private logo(small = false) {
    return el('div', { class: 'logo' + (small ? ' small' : '') }, [
      el('div', { class: 'l1' }, [el('span', { class: 'l-el' }, 'EL'), el('span', { class: 'l-hoyo' }, ['H', el('span', { class: 'hole' }), 'YO'])]),
      el('div', { class: 'l2' }, 'WRESTLING'),
    ]);
  }

  // ---------------------------------------------------------------- pantallas
  showTitle() {
    const n = el('div', { class: 'screen title', onClick: () => { Audio.init(); Audio.music('menu'); this.click('confirm'); this.game.goMenu(); } }, [
      this.logo(),
      el('div', { class: 'press' }, this.game.useTouch ? 'TOCA PARA EMPEZAR' : 'PULSA CUALQUIER TECLA O HAZ CLIC'),
      el('div', { class: 'credit' }, 'Inspirado en la obra original de Jefefbi'),
      el('div', { class: 'ver' }, 'Demo jugable · v0.1'),
    ]);
    this.set(n);
    this.confirmHandler = () => n.click();
    const key = (e: KeyboardEvent) => { if (this.cur === n) { window.removeEventListener('keydown', key); n.click(); e.preventDefault(); } };
    window.addEventListener('keydown', key);
  }

  showMenu() {
    const g = this.game;
    const dis = (label: string) => el('button', { class: 'btn compact disabled', disabled: true, title: 'Próximamente' }, [el('span', {}, label), el('small', {}, 'Próximamente')]);
    const n = el('div', { class: 'screen menu' }, [
      el('div', { class: 'menu-left' }, [
        this.logo(true),
        el('nav', { class: 'menu-list' }, [
          this.btn('HISTORIA · HOYO', () => this.game.enterWorld(), 'primary story-main', g.save.story?.done.length ? `La ciudad y la Temporada 5 · ${g.save.story.done.length}/${CHAPTERS.length} capítulos` : 'Vive la Temporada 5 en la ciudad de Hoyo'),
          this.btn('VERSUS', () => this.showVersusSetup(), 'primary', 'Un combate contra la CPU'),
          this.btn('TORNEO', () => this.showTournamentSetup(), 'primary', 'Cuadro de eliminatorias'),
          this.btn('ESPECTADOR', () => this.showSpectateSetup(), '', 'CPU contra CPU, con narrador'),
          el('div', { class: 'menu-grid' }, [
            this.btn('CAPÍTULOS', () => this.showStoryMenu(), 'compact', 'Repite capítulos y finales'),
            this.btn('SUPERVIVENCIA', () => this.showSurvivalSetup(), 'compact', g.save.survivalBest ? `Récord: ${g.save.survivalBest}` : 'Racha sin fin'),
            this.btn('ENTRENAMIENTO', () => this.showVersusSetup(undefined, false, true), 'compact', 'Practica sin presión'),
            this.btn('PLANTILLA', () => this.showRoster(), 'compact'),
            this.btn('LOGROS', () => this.showAchievements(), 'compact', `${Object.keys(g.save.achievements).length}/${ACHIEVEMENTS.length}`),
            this.btn('ESTADÍSTICAS', () => this.showHallOfFame(), 'compact', 'Salón de la fama'),
            this.btn('AYUDA', () => this.showHelp(), 'compact', 'Cómo se juega'),
            this.btn('AJUSTES', () => this.showSettings(() => this.showMenu()), 'compact'),
            this.btn('CRÉDITOS', () => this.showCredits(), 'compact'),
          ]),
        ]),
        el('div', { class: 'menu-foot' }, `${g.save.wins} victorias · ${g.save.losses} derrotas`),
      ]),
    ]);
    this.set(n);
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
    g.showcase?.setPaired(false);
    if (g.showcase) g.showcase.mode = 'orbit';
  }

  showSpectateSetup() { this.showVersusSetup(undefined, true); }

  /** Etiquetas de las reglas especiales de un escenario */
  private arenaTags(id: ArenaId | 'random'): string[] {
    if (id === 'random') return ['Sorpresa'];
    const r = ARENA_INFO[id].rules;
    const t: string[] = [];
    if (!r.ring) t.push('Sin ring'); else t.push('Ring con cuerdas');
    if (r.mob) t.push('La tribu ataca en masa');
    if (!r.countOut && r.ring) t.push('Sin cuenta fuera');
    if (!r.refSees) t.push('Árbitro ciego');
    if (r.ring && !r.ropeBreak) t.push('Las cuerdas no rompen el pin');
    return t;
  }

  /** Selección de combate en 3 pasos: Personajes → Mapas → Dificultad y otras cosas.
   *  Con `spectate`, las dos plazas son CPU; con `training`, el rival es un saco de entrenamiento.
   *  En el Versus normal se puede elegir 2 contra 2. */
  showVersusSetup(prefill?: Partial<VersusSetup>, spectate = false, training = false) {
    const g = this.game;
    const pool = spectate ? g.roster : g.roster.filter((f) => g.isUnlocked(f));
    const last = g.lastSpectate;
    const saved = (id: string) => g.save.skins?.[id] ?? '';
    const canTeam = !spectate && !training;
    // plazas: 0 = tú, 1 = tu compañero, 2 = rival, 3 = compañero del rival
    const ids: string[] = [
      prefill?.player ?? (spectate ? last?.a : undefined) ?? pool[0].id, prefill?.partner ?? '',
      prefill?.cpu ?? (spectate ? last?.b ?? pool[1]?.id ?? '' : ''), prefill?.cpuPartner ?? '',
    ];
    const skins: string[] = [prefill?.playerSkin ?? saved(ids[0]), prefill?.partnerSkin ?? '', prefill?.cpuSkin ?? (ids[2] ? saved(ids[2]) : ''), prefill?.cpuPartnerSkin ?? ''];
    const st = {
      team: canTeam && !!prefill?.partner, slot: (prefill?.cpu || spectate ? 0 : 2) as 0 | 1 | 2 | 3, step: 0 as 0 | 1 | 2,
      arena: (prefill?.arena ?? (spectate ? last?.arena : undefined) ?? 'matamoros') as ArenaId | 'random',
      difficulty: (prefill?.difficulty ?? g.save.settings.difficulty) as Difficulty,
      mutator: (prefill?.mutator ?? 'ninguno') as MutatorId,
      behaviour: 'guardia' as 'quieto' | 'guardia' | 'ataca',
    };
    const labels = spectate ? ['CPU 1', '', 'CPU 2', ''] : training ? ['TÚ', '', 'RIVAL', ''] : ['TÚ', 'COMPAÑERO', 'CPU', 'COMPAÑERO CPU'];
    const remember = (id: string, skin: string) => { g.save.skins = { ...(g.save.skins ?? {}), [id]: skin }; };
    const fighterAt = (i: number) => (ids[i] ? g.roster.find((r) => r.id === ids[i]) ?? null : null);
    const dispAt = (i: number) => { const f = fighterAt(i); return f ? withSkin(f, skins[i]) : null; };
    const used = () => (st.team ? [0, 1, 2, 3] : [0, 2]).map((i) => ids[i]);
    let previewed: ArenaId | 'random' | null = null;
    const YESNO = [{ id: 'si', name: 'Sí', desc: '' }, { id: 'no', name: 'No', desc: '' }];
    const steps = ['PERSONAJES', 'MAPAS', training ? 'RIVAL Y OTRAS COSAS' : 'DIFICULTAD Y OTRAS COSAS'];
    const title = spectate ? 'ESPECTADOR' : training ? 'ENTRENAMIENTO' : 'VERSUS';

    const topbar = () => el('div', { class: 'topbar' }, [
      this.btn('‹ Atrás', back, 'small'),
      el('h2', {}, title),
      el('div', { class: 'steps' }, steps.map((n, i) => el('span', { class: 'step' + (i === st.step ? ' on' : i < st.step ? ' done' : '') }, [el('b', {}, String(i + 1)), n]))),
    ]);
    const back = () => { if (st.step === 0) this.showMenu(); else { st.step = (st.step - 1) as 0 | 1; render(); } };
    const next = () => {
      if (st.step === 0) {
        const need = used();
        const missing = (st.team ? [0, 1, 2, 3] : [0, 2]).find((i) => !ids[i]);
        if (missing != null) { Audio.sfx('foul'); st.slot = missing as 0 | 1 | 2 | 3; render(); return; }
        if (new Set(need).size !== need.length) { Audio.sfx('foul'); g.toast(st.team ? 'Los cuatro luchadores tienen que ser distintos' : 'Elige dos luchadores distintos'); return; }
      }
      st.step = (st.step + 1) as 1 | 2; render();
    };
    const start = () => {
      g.commitSettings();
      if (training) g.startTraining({ player: ids[0], playerSkin: skins[0], cpu: ids[2], cpuSkin: skins[2], arena: st.arena, behaviour: st.behaviour });
      else if (spectate) g.startSpectate({ a: ids[0], b: ids[2], aSkin: skins[0], bSkin: skins[2], arena: st.arena, difficulty: st.difficulty });
      else g.startVersus({ player: ids[0], cpu: ids[2], playerSkin: skins[0], cpuSkin: skins[2], ...(st.team ? { partner: ids[1], partnerSkin: skins[1], cpuPartner: ids[3], cpuPartnerSkin: skins[3] } : {}), arena: st.arena, difficulty: st.difficulty, mutator: st.mutator });
    };
    const pick = (f: FighterData) => { ids[st.slot] = f.id; skins[st.slot] = saved(f.id); const empty = (st.team ? [0, 1, 2, 3] : [0, 2]).find((i) => !ids[i]); if (empty != null) st.slot = empty as 0 | 1 | 2 | 3; };

    const render = () => {
      // el fondo muestra el mapa elegido (al azar: se deja el que hubiera)
      if (st.step >= 1 && st.arena !== 'random' && previewed !== st.arena) { g.openShowcase(st.arena); previewed = st.arena; }
      const sc = g.showcase!;
      sc.mode = 'close'; sc.setPaired(false);
      // a la izquierda y a la derecha se ve al luchador de la plaza que estás eligiendo
      const li = st.team && st.slot === 1 ? 1 : 0, ri = st.team && st.slot === 3 ? 3 : 2;
      sc.setFighter(0, dispAt(li)); sc.setFighter(1, dispAt(ri));
      let body: (HTMLElement | null)[];

      if (st.step === 0) {
        const l = fighterAt(li), r = fighterAt(ri);
        const skinL = this.skinChips(l, skins[li], (v) => { skins[li] = v; remember(l!.id, v); render(); });
        const skinR = this.skinChips(r, skins[ri], (v) => { skins[ri] = v; remember(r!.id, v); render(); });
        const duoL = st.team ? duoOf(ids[0], ids[1]) : null, duoR = st.team ? duoOf(ids[2], ids[3]) : null;
        // sugerencias de dúo dinámico: al elegir compañero se marcan los que forman dúo con el líder
        const leadOf = st.slot === 1 ? ids[0] : st.slot === 3 ? ids[2] : '';
        const mark = leadOf ? new Set(DUOS.filter((d) => d.a === leadOf || d.b === leadOf).map((d) => (d.a === leadOf ? d.b : d.a))) : undefined;
        body = [
          el('div', { class: 'cards' }, [this.card(l, 'left', labels[li]), el('div', { class: 'vs' }, 'VS'), this.card(r, 'right', labels[ri])]),
          el('div', { class: 'skinbar' + (skinL || skinR ? ' on' : '') }, [skinL ?? el('div'), skinR ?? el('div')]),
          duoL || duoR ? el('div', { class: 'duobanner' }, [duoL ? el('b', {}, '★ TU DÚO: ' + duoL.name) : null, duoL ? el('span', {}, duoL.desc) : null, duoR ? el('b', {}, '★ DÚO RIVAL: ' + duoR.name) : null]) : null,
          el('div', { class: 'slots' }, [
            ...(canTeam ? [el('button', { class: 'slot mode' + (st.team ? ' on2' : ''), 'data-nav': true, onClick: () => { st.team = !st.team; if (!st.team && st.slot % 2) st.slot = (st.slot - 1) as 0 | 2; render(); } }, st.team ? '2 CONTRA 2 ✓' : '1 CONTRA 1 · pulsa para 2 contra 2')] : []),
            ...(st.team ? [0, 1, 2, 3] : [0, 2]).map((i) =>
              el('button', { class: 'slot' + (st.slot === i ? ' on' : ''), 'data-nav': true, onClick: () => { st.slot = i as 0 | 1 | 2 | 3; render(); } }, 'Eligiendo: ' + labels[i])),
          ]),
          this.strip(Object.fromEntries(used().filter(Boolean).map((id) => [id, ids[st.slot] === id])), (f) => { pick(f); render(); }, {
            all: spectate, mark,
            random: () => { const others = used().filter((x, i) => x && (st.team ? [0, 1, 2, 3] : [0, 2])[i] !== st.slot); const list = pool.filter((f) => !others.includes(f.id)); pick(list[Math.floor(Math.random() * list.length)]); render(); },
          }),
          el('div', { class: 'options end' }, [this.btn('SIGUIENTE: MAPAS ›', next, 'primary go')]),
        ];
      } else if (st.step === 1) {
        body = [
          el('div', { class: 'mapgrid' }, ARENAS.map((a) => el('button', {
            class: 'mapcard' + (a.id === st.arena ? ' sel' : ''), 'data-nav': true,
            onClick: () => { this.click(); st.arena = a.id; next(); }, // elegir un mapa = pasar a lo siguiente
          }, [
            el('div', { class: 'mapname' }, a.name),
            el('div', { class: 'mapdesc' }, a.desc),
            el('div', { class: 'maptags' }, this.arenaTags(a.id).map((t) => el('span', {}, t))),
          ]))),
          el('div', { class: 'options end' }, [this.btn('‹ Personajes', back, 'small'), this.btn(training ? 'SIGUIENTE: RIVAL ›' : 'SIGUIENTE: DIFICULTAD ›', next, 'primary go')]),
        ];
      } else {
        const set = g.save.settings;
        const arenaName = st.arena === 'random' ? 'Aleatorio' : ARENA_INFO[st.arena].name;
        const side = (a: number, b: number) => [dispAt(a), st.team ? dispAt(b) : null].filter(Boolean) as FighterData[];
        const sideName = (xs: FighterData[]) => xs.map((f) => f.name).join(' & ') || '?';
        const left = side(0, 1), right = side(2, 3);
        const BEHAVIOURS = [
          { id: 'quieto' as const, name: 'Quieto', desc: 'Un saco de boxeo: no se mueve ni se defiende.' },
          { id: 'guardia' as const, name: 'Se defiende', desc: 'Mantiene la guardia: practica cómo romperla y los contraataques.' },
          { id: 'ataca' as const, name: 'Ataca', desc: 'Pelea de verdad (nivel fácil) pero no puede ganar: nadie cae.' },
        ];
        body = [
          el('div', { class: 'summary' }, [
            el('div', { class: 'sumside' }, [left[0] ? this.portrait(left[0], 'mini') : null, el('div', {}, [el('small', {}, labels[0]), el('b', {}, sideName(left))])]),
            el('div', { class: 'sumvs' }, [el('i', {}, 'VS'), el('span', {}, '📍 ' + arenaName)]),
            el('div', { class: 'sumside right' }, [el('div', {}, [el('small', {}, labels[2]), el('b', {}, sideName(right))]), right[0] ? this.portrait(right[0], 'mini') : null]),
          ]),
          el('div', { class: 'options wide' }, [
            training
              ? this.chips(BEHAVIOURS, st.behaviour, (v) => { st.behaviour = v; }, 'COMPORTAMIENTO DEL RIVAL')
              : this.chips(DIFFS, st.difficulty, (v) => { st.difficulty = v; set.difficulty = v; }, spectate ? 'NIVEL DE LAS CPU' : 'DIFICULTAD'),
            canTeam ? this.chips(MUTATORS.map((m) => ({ id: m.id, name: m.name, desc: m.desc })), st.mutator, (v) => { st.mutator = v; }, 'MODIFICADOR DE COMBATE') : null,
            this.chips(YESNO, set.shake ? 'si' : 'no', (v) => { set.shake = v === 'si'; }, 'SACUDIDA DE CÁMARA'),
            this.chips(YESNO, set.voice ? 'si' : 'no', (v) => { set.voice = v === 'si'; }, spectate ? 'VOZ DEL NARRADOR' : 'VOZ (CUENTAS Y ANUNCIOS)'),
            this.chips(YESNO, set.fps ? 'si' : 'no', (v) => { set.fps = v === 'si'; }, 'CONTADOR DE FPS'),
          ]),
          el('div', { class: 'options end' }, [this.btn('‹ Mapas', back, 'small'), this.btn(training ? '¡A ENTRENAR!' : spectate ? '¡A VER EL COMBATE!' : '¡A LUCHAR!', start, 'primary go')]),
        ];
      }
      const withSkins = st.step === 0 && !!(fighterAt(li)?.skins?.length || fighterAt(ri)?.skins?.length);
      const n = el('div', { class: 'screen setup s' + st.step + (withSkins ? ' skins' : '') + (st.team && st.step === 0 ? ' compact' : '') }, [topbar(), ...body]);
      this.set(n, back);
    };
    render();
  }

  /** Torneo en 3 pasos: Torneo → Luchadores → Dificultad y otras cosas */
  showTournamentSetup() {
    const g = this.game;
    const pool = g.roster.filter((f) => g.isUnlocked(f));
    const saved = (id: string) => g.save.skins?.[id] ?? '';
    const st = {
      step: 0 as 0 | 1 | 2, kind: 'champion' as TourKind, slot: 0 as 0 | 1,
      player: pool[0].id, partner: '', skin: '', partnerSkin: '',
      diff: g.save.settings.difficulty as Difficulty,
    };
    st.skin = saved(st.player);
    const sc = g.showcase!;
    const YESNO = [{ id: 'si', name: 'Sí', desc: '' }, { id: 'no', name: 'No', desc: '' }];
    const steps = ['TORNEO', 'LUCHADORES', 'DIFICULTAD Y OTRAS COSAS'];
    const info = () => TOURS[st.kind];
    const remember = (id: string, skin: string) => { g.save.skins = { ...(g.save.skins ?? {}), [id]: skin }; };

    const back = () => { if (st.step === 0) this.showMenu(); else { st.step = (st.step - 1) as 0 | 1; render(); } };
    const next = () => {
      if (st.step === 1 && info().tag) {
        if (!st.partner) { Audio.sfx('foul'); g.toast('Elige también a tu compañero'); st.slot = 1; render(); return; }
        if (st.partner === st.player) { Audio.sfx('foul'); g.toast('Elige dos luchadores distintos'); return; }
      }
      st.step = (st.step + 1) as 1 | 2; render();
    };
    const start = () => {
      g.commitSettings();
      g.startTournament({ kind: st.kind, player: st.player, partner: info().tag ? st.partner : undefined, skin: st.skin, partnerSkin: st.partnerSkin, difficulty: st.diff });
    };
    const topbar = () => el('div', { class: 'topbar' }, [
      this.btn('‹ Atrás', back, 'small'), el('h2', {}, 'TORNEO'),
      el('div', { class: 'steps' }, steps.map((n, i) => el('span', { class: 'step' + (i === st.step ? ' on' : i < st.step ? ' done' : '') }, [el('b', {}, String(i + 1)), n]))),
    ]);
    const tourTags = (k: TourKind) => {
      const t = TOURS[k];
      const out = [t.tag ? '2 contra 2' : '1 contra 1', t.arenas.map((a) => ARENA_INFO[a].name).join(' · ')];
      if (t.titleHolder) out.push('Campeón: ' + (g.roster.find((r) => r.id === t.titleHolder)?.name ?? t.titleHolder));
      const w = g.save.tourWins?.[k] ?? 0;
      out.push(`Ganados: ${w}`);
      return out;
    };

    const render = () => {
      const p = g.roster.find((r) => r.id === st.player)!;
      const pa = st.partner ? g.roster.find((r) => r.id === st.partner)! : null;
      sc.mode = 'close';
      sc.setPaired(info().tag);
      sc.setFighter(0, st.step >= 1 ? withSkin(p, st.skin) : null);
      sc.setFighter(1, st.step >= 1 && info().tag && pa ? withSkin(pa, st.partnerSkin) : null);
      let body: (HTMLElement | null)[];
      if (st.step === 0) {
        body = [
          el('div', { class: 'mapgrid' }, TOUR_KINDS.map((k) => el('button', {
            class: 'mapcard' + (k === st.kind ? ' sel' : ''), 'data-nav': true, onClick: () => { this.click(); st.kind = k; next(); }, // elegir un torneo = ir a por él
          }, [
            el('div', { class: 'mapname' }, TOURS[k].name),
            el('div', { class: 'tagline' }, TOURS[k].tagline),
            el('div', { class: 'mapdesc' }, TOURS[k].desc),
            el('div', { class: 'maptags' }, tourTags(k).map((t) => el('span', {}, t))),
          ]))),
          el('div', { class: 'options end' }, [this.btn('SIGUIENTE: LUCHADORES ›', next, 'primary go')]),
        ];
      } else if (st.step === 1) {
        const tag = info().tag;
        const duo = tag ? duoOf(st.player, st.partner) : null;
        const right = tag
          ? this.card(pa, 'right', 'TU COMPAÑERO')
          : el('div', { class: 'tinfo' }, [
            el('h3', {}, info().name),
            el('p', {}, st.kind === 'femboy' && st.player === 'elso'
              ? '¡Eres el campeón! Defiendes tu título: llegarás a la final contra el mejor de los retadores.'
              : info().desc),
            el('p', { class: 'dim' }, `Torneos ganados: ${g.save.tourWins?.[st.kind] ?? 0}`),
          ]);
        const skinL = this.skinChips(p, st.skin, (v) => { st.skin = v; remember(p.id, v); render(); });
        const skinR = tag ? this.skinChips(pa, st.partnerSkin, (v) => { st.partnerSkin = v; remember(pa!.id, v); render(); }) : null;
        body = [
          el('div', { class: 'cards' }, [this.card(p, 'left', tag ? 'TU LUCHADOR' : 'TU LUCHADOR'), tag ? el('div', { class: 'vs' }, '&') : null, right]),
          el('div', { class: 'skinbar' + (skinL || skinR ? ' on' : '') }, [skinL ?? el('div'), skinR ?? el('div')]),
          tag ? el('div', { class: 'slots' }, [
            el('button', { class: 'slot' + (st.slot === 0 ? ' on' : ''), 'data-nav': true, onClick: () => { st.slot = 0; render(); } }, 'Eligiendo: TÚ'),
            el('button', { class: 'slot' + (st.slot === 1 ? ' on' : ''), 'data-nav': true, onClick: () => { st.slot = 1; render(); } }, 'Eligiendo: COMPAÑERO'),
          ]) : null,
          duo ? el('div', { class: 'duobanner' }, [el('b', {}, '★ DÚO DINÁMICO · ' + duo.name), el('span', {}, duo.desc)]) : null,
          this.strip({ [st.player]: !tag || st.slot === 0, ...(tag && st.partner ? { [st.partner]: st.slot === 1 } : {}) }, (f) => {
            if (tag && st.slot === 1) { st.partner = f.id; st.partnerSkin = saved(f.id); } else { st.player = f.id; st.skin = saved(f.id); if (tag && !st.partner) st.slot = 1; }
            render();
          }, { mark: tag ? new Set(DUOS.filter((d) => d.a === (st.slot === 1 ? st.player : st.partner || '') || d.b === (st.slot === 1 ? st.player : st.partner || '')).map((d) => (d.a === (st.slot === 1 ? st.player : st.partner || '') ? d.b : d.a))) : undefined }),
          el('div', { class: 'options end' }, [this.btn('‹ Torneo', back, 'small'), this.btn('SIGUIENTE: DIFICULTAD ›', next, 'primary go')]),
        ];
      } else {
        const set = g.save.settings;
        body = [
          el('div', { class: 'summary' }, [
            el('div', { class: 'sumside' }, [this.portrait(p, 'mini'), el('div', {}, [el('small', {}, 'TÚ'), el('b', {}, p.name)])]),
            el('div', { class: 'sumvs' }, [el('i', {}, info().tag ? '&' : '★'), el('span', {}, info().name)]),
            el('div', { class: 'sumside right' }, [el('div', {}, [el('small', {}, info().tag ? 'COMPAÑERO' : 'TÍTULO'), el('b', {}, pa ? pa.name : info().title)]), pa ? this.portrait(pa, 'mini') : null]),
          ]),
          el('div', { class: 'options wide' }, [
            this.chips(DIFFS, st.diff, (v) => { st.diff = v; set.difficulty = v; }, 'DIFICULTAD'),
            this.chips(YESNO, set.shake ? 'si' : 'no', (v) => { set.shake = v === 'si'; }, 'SACUDIDA DE CÁMARA'),
            this.chips(YESNO, set.voice ? 'si' : 'no', (v) => { set.voice = v === 'si'; }, 'VOZ (CUENTAS Y ANUNCIOS)'),
            this.chips(YESNO, set.fps ? 'si' : 'no', (v) => { set.fps = v === 'si'; }, 'CONTADOR DE FPS'),
          ]),
          el('div', { class: 'options end' }, [this.btn('‹ Luchadores', back, 'small'), this.btn('EMPEZAR TORNEO', start, 'primary go')]),
        ];
      }
      const withSkins = st.step === 1 && !!(p.skins?.length || (info().tag && pa?.skins?.length));
      const n = el('div', { class: 'screen setup t' + st.step + (withSkins ? ' skins' : '') }, [topbar(), ...body]);
      this.set(n, back);
    };
    render();
  }

  // ---------------------------------------------------------------- supervivencia
  showSurvivalSetup() {
    const g = this.game;
    const pool = g.roster.filter((f) => g.isUnlocked(f));
    let player = pool[0].id;
    let skin = g.save.skins?.[player] ?? '';
    const sc = g.showcase!; sc.mode = 'close'; sc.setPaired(false);
    const render = () => {
      const p = g.roster.find((r) => r.id === player)!;
      sc.setFighter(0, withSkin(p, skin)); sc.setFighter(1, null);
      const sk = this.skinChips(p, skin, (v) => { skin = v; g.save.skins = { ...(g.save.skins ?? {}), [p.id]: v }; render(); });
      const n = el('div', { class: 'screen setup survsetup' + (p.skins?.length ? ' skins' : '') }, [
        el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, 'SUPERVIVENCIA')]),
        el('div', { class: 'cards' }, [this.card(p, 'left', 'TU LUCHADOR'), el('div', { class: 'tinfo' }, [
          el('h3', {}, 'Una racha sin fin'),
          el('p', {}, 'Derrota a un rival tras otro sin perder. Entre combates solo recuperas un 30 % de vida, pero tras cada victoria eliges una mejora que te dura toda la racha.'),
          el('p', {}, 'Los rivales empiezan fáciles y se endurecen; cada 5 combates aparece un jefe. Los mapas cambian en cada ronda.'),
          el('p', { class: 'dim' }, `Tu récord: ${g.save.survivalBest ?? 0} victorias seguidas`),
        ])]),
        el('div', { class: 'skinbar' + (sk ? ' on' : '') }, [sk ?? el('div')]),
        this.strip({ [player]: true }, (f) => { player = f.id; skin = g.save.skins?.[f.id] ?? ''; render(); }),
        el('div', { class: 'options end' }, [this.btn('¡A SOBREVIVIR!', () => { g.commitSettings(); g.startSurvival(player, skin); }, 'primary go')]),
      ]);
      this.set(n, () => this.showMenu());
    };
    render();
  }

  showPerkPick(run: SurvivalRun, perks: Perk[], onPick: (id: string) => void) {
    const g = this.game;
    const me = g.survPlayer(run);
    const sc = g.showcase;
    sc?.setFighter(0, null); sc?.setFighter(1, null);
    const owned = run.perks.reduce<Record<string, number>>((a, id) => { a[id] = (a[id] ?? 0) + 1; return a; }, {});
    const n = el('div', { class: 'screen perkscreen' }, [
      el('div', { class: 'topbar' }, [el('h2', {}, 'ELIGE UNA MEJORA'), el('span', { class: 'subnote' }, `${me.name} · ${run.wins} victorias seguidas · vida ${Math.round(run.hp)}/${Math.round(me.fullStats.health)}`)]),
      el('div', { class: 'mapgrid' }, perks.map((p) => el('button', { class: 'mapcard perk', 'data-nav': true, onClick: () => { Audio.sfx('unlock'); onPick(p.id); } }, [
        el('div', { class: 'mapname' }, p.name),
        el('div', { class: 'mapdesc' }, p.desc),
        owned[p.id] ? el('div', { class: 'maptags' }, [el('span', {}, `Ya la tienes ×${owned[p.id]}: se acumula`)]) : null,
      ]))),
      el('div', { class: 'perklist' }, run.perks.length ? ['Mejoras activas: ', ...Object.entries(owned).map(([id, k]) => el('span', {}, perkById(id).name + (k > 1 ? ' ×' + k : '')))] : ['Aún no tienes mejoras']),
    ]);
    this.set(n);
    void PERKS;
  }

  showSurvivalSummary(run: SurvivalRun, best: number, newRecord: boolean, onRetry: () => void, onMenu: () => void, retired = false) {
    const g = this.game;
    const me = g.survPlayer(run);
    const owned = run.perks.reduce<Record<string, number>>((a, id) => { a[id] = (a[id] ?? 0) + 1; return a; }, {});
    const n = el('div', { class: 'screen results ' + (retired ? 'win' : 'lose') }, [
      el('div', { class: 'rpanel' }, [
        el('div', { class: 'rtitle' }, retired ? 'TE RETIRAS' : 'FIN DE LA RACHA'),
        el('div', { class: 'rwho' }, [this.portrait(me, 'rp'), el('div', {}, [el('div', { class: 'rname' }, me.name), el('div', { class: 'rreason' }, newRecord ? '¡NUEVO RÉCORD!' : `Récord: ${best}`)])]),
        el('div', { class: 'rstats' }, [el('div', {}, [el('b', {}, String(run.wins)), 'Victorias seguidas']), el('div', {}, [el('b', {}, String(best)), 'Mejor racha']), el('div', {}, [el('b', {}, String(run.perks.length)), 'Mejoras'])]),
        run.perks.length ? el('div', { class: 'quotes' }, [el('p', {}, [el('b', {}, 'Mejoras: '), Object.entries(owned).map(([id, k]) => perkById(id).name + (k > 1 ? ' ×' + k : '')).join(' · ')])]) : null,
        el('div', { class: 'btns' }, [this.btn('Nueva racha', onRetry, 'primary go'), this.btn('Menú principal', onMenu)]),
      ]),
    ]);
    this.set(n);
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
  }

  showBracket(b: Bracket, diff: Difficulty, onPlay: () => void, onQuit: () => void, onRetry?: () => void) {
    const g = this.game;
    const fighter = (id: string) => g.roster.find((r) => r.id === id)!;
    /** Un participante del cuadro: un luchador o una pareja `a+b` */
    const members = (id: string) => teamOf(id).map(fighter);
    const label = (id: string) => members(id).map((f) => f.name).join(' & ');
    const faces = (id: string) => { const ms = members(id); return ms.length === 1 ? this.portrait(ms[0], 'mini') : el('div', { class: 'duo' }, ms.map((f) => this.portrait(f, 'mini'))); };
    const tour = TOURS[b.kind ?? 'champion'];
    const cols = el('div', { class: 'bracket' });
    const total = Math.log2(b.size);
    for (let r = 0; r < total; r++) {
      const pairs = b.rounds[r];
      const col = el('div', { class: 'bcol' }, [el('div', { class: 'btitle' }, roundName(b, r))]);
      const count = b.size / Math.pow(2, r + 1);
      for (let i = 0; i < count; i++) {
        const p = pairs?.[i];
        const slot = (id: string | undefined, won: boolean, lost: boolean) => {
          return el('div', { class: 'bslot' + (id === b.playerId ? ' me' : '') + (b.titleHolder && id === b.titleHolder ? ' holder' : '') + (won ? ' won' : '') + (lost ? ' lost' : '') + (!id ? ' tbd' : '') }, [id ? faces(id) : el('div', { class: 'portrait mini' }), el('span', {}, id ? label(id) : 'Por decidir')]);
        };
        col.appendChild(el('div', { class: 'bmatch' + (p && r === b.round && (p.a === b.playerId || p.b === b.playerId) && !b.eliminated && !b.champion ? ' now' : '') }, [
          slot(p?.a, !!p?.winner && p.winner === p.a, !!p?.winner && p.winner !== p.a),
          slot(p?.b, !!p?.winner && p.winner === p.b, !!p?.winner && p.winner !== p.b),
        ]));
      }
      cols.appendChild(col);
    }
    // campeón
    const champ = b.champion;
    cols.appendChild(el('div', { class: 'bcol champ' }, [el('div', { class: 'btitle' }, 'CAMPEÓN'), el('div', { class: 'bslot' + (champ ? ' won' : ' tbd') + (champ === b.playerId ? ' me' : '') }, [champ ? faces(champ) : el('div', { class: 'portrait mini' }, el('div', { class: 'noimg' }, '🏆')), el('span', {}, champ ? label(champ) : '???')])]));
    let footer: HTMLElement;
    if (b.champion) {
      Audio.sfx('win');
      footer = el('div', { class: 'bfoot' }, [
        el('div', { class: 'bresult gold' }, b.champion === b.playerId
          ? (b.titleHolder && teamOf(b.playerId)[0] === b.titleHolder ? '¡ELSO DEFIENDE SU TÍTULO!' : b.kind === 'femboy' ? '¡NUEVO HOYO FEMBOY CHAMPION!' : `¡ERES ${tour.title}!`)
          : `${label(champ!)} gana el torneo`),
        el('div', { class: 'btns' }, [this.btn('Nuevo torneo', () => this.showTournamentSetup(), 'primary'), this.btn('Menú principal', onQuit)]),
      ]);
    } else if (b.eliminated) {
      footer = el('div', { class: 'bfoot' }, [
        el('div', { class: 'bresult red' }, 'ELIMINADO'),
        el('div', { class: 'btns' }, [onRetry ? this.btn('Reintentar torneo', onRetry, 'primary') : null, this.btn('Menú principal', onQuit)]),
      ]);
    } else {
      const oppLabel = label(opponentOf(b));
      const ar = arenaForRound(b, b.round, () => 0.5);
      footer = el('div', { class: 'bfoot' }, [
        el('div', { class: 'bnext' }, [el('b', {}, roundName(b)), ` · ${label(b.playerId)} vs ${oppLabel} · ${ARENA_INFO[ar].name}${b.titleHolder && opponentOf(b) === b.titleHolder ? ' · ¡Campeón defensor!' : ''}`]),
        el('div', { class: 'btns' }, [this.btn('¡AL RING!', onPlay, 'primary go'), this.btn('Abandonar torneo', onQuit)]),
      ]);
    }
    void playerPairing; void diff;
    const n = el('div', { class: 'screen bracketscreen' }, [el('div', { class: 'topbar' }, [el('h2', {}, tour.name.toUpperCase() + ' · ' + DIFFS.find((d) => d.id === diff)!.name.toUpperCase()), b.titleHolder ? el('span', { class: 'subnote' }, 'Campeón actual: ' + fighter(b.titleHolder).name) : null]), cols, footer]);
    this.set(n);
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
  }

  /** Escena de diálogo previa al combate */
  showDialogue(rawLines: { who: string; text: string }[], a: FighterData, b: FighterData, done: () => void) {
    const g = this.game;
    const lines = rawLines.map((l) => ({ who: l.who, text: voice(l.who, l.text) }));
    const sc = g.showcase;
    sc?.setFighter(0, a); sc?.setFighter(1, b);
    if (sc) sc.mode = 'close';
    let i = 0;
    const speaker = (id: string): FighterData | null => (id === a.id ? a : id === b.id ? b : g.roster.find((r) => r.id === id) ?? null);
    const nameBox = el('div', { class: 'dname' });
    const textBox = el('div', { class: 'dtext' });
    const port = el('div', { class: 'dport' });
    const box = el('div', { class: 'dbox' }, [port, el('div', { class: 'dmain' }, [nameBox, textBox, el('div', { class: 'dnext' }, [kbd('Clic / Espacio', 'A'), ' continuar ▸'])])]);
    const n = el('div', { class: 'screen dialogue' }, [el('button', { class: 'btn small skip', 'data-nav': true, onClick: () => finish() }, 'Saltar »'), box]);
    let typed = false;
    const full = () => lines[i].text;
    const say = () => {
      const l = lines[i];
      const f = speaker(l.who);
      nameBox.textContent = f?.name ?? (l.who === 'arbitro' ? 'Árbitro' : l.who.charAt(0).toUpperCase() + l.who.slice(1));
      nameBox.className = 'dname ' + (f === a ? 'p1' : f === b ? 'p2' : '');
      clear(port); port.appendChild(this.portrait(f, 'dp'));
      box.classList.toggle('right', f === b);
      textBox.textContent = '';
      typed = false;
      let k = 0;
      if (this.typing) clearInterval(this.typing);
      this.typing = window.setInterval(() => {
        k += 1;
        textBox.textContent = full().slice(0, k);
        if (k % 3 === 0) Audio.sfx('click');
        if (k >= full().length) { clearInterval(this.typing!); this.typing = null; typed = true; }
      }, 24);
    };
    const advance = () => {
      if (!typed) { if (this.typing) clearInterval(this.typing); this.typing = null; textBox.textContent = full(); typed = true; return; }
      i++;
      if (i >= lines.length) finish(); else say();
    };
    const finish = () => { window.removeEventListener('keydown', key); done(); };
    const key = (e: KeyboardEvent) => { if (this.cur !== n) { window.removeEventListener('keydown', key); return; } if (e.key === ' ' || e.key === 'Enter') { advance(); e.preventDefault(); } };
    window.addEventListener('keydown', key);
    box.addEventListener('click', advance);
    this.set(n);
    this.confirmHandler = advance;
    say();
  }

  /** Pantalla "A vs B" antes de empezar */
  showVS(a: FighterData, b: FighterData, arena: ArenaId, diff: Difficulty, done: () => void, spectate = false, aPartner?: FighterData, bPartner?: FighterData, label?: string) {
    const sc = this.game.showcase;
    sc?.setFighter(0, null); sc?.setFighter(1, null);
    const arenaName = ARENA_INFO[arena].upper;
    let fired = false;
    const go = () => { if (fired) return; fired = true; window.removeEventListener('keydown', key); clearTimeout(t); done(); };
    const key = (e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') go(); };
    const n = el('div', { class: 'screen vsscreen', onClick: go }, [
      el('div', { class: 'vs-side left' }, [this.portrait(a, 'vsp'), el('div', { class: 'vsname' }, a.name), aPartner ? el('div', { class: 'vspartner' }, '& ' + aPartner.name) : null, el('div', { class: 'vstag' }, spectate ? 'CPU 1' : 'TÚ')]),
      el('div', { class: 'vs-mid' }, [el('div', { class: 'vsbig' }, 'VS'), el('div', { class: 'vsarena' }, arenaName), el('div', { class: 'vsdiff' }, DIFFS.find((d) => d.id === diff)!.name.toUpperCase()), label ? el('div', { class: 'vslabel' }, label) : null]),
      el('div', { class: 'vs-side right' }, [this.portrait(b, 'vsp'), el('div', { class: 'vsname' }, b.name), bPartner ? el('div', { class: 'vspartner' }, '& ' + bPartner.name) : null, el('div', { class: 'vstag' }, spectate ? 'CPU 2' : 'CPU')]),
    ]);
    window.addEventListener('keydown', key);
    const t = window.setTimeout(go, 2600);
    this.set(n);
    this.confirmHandler = go;
    Audio.sfx('heavy');
  }

  showResults(info: ResultInfo, buttons: ResultButton[]) {
    const mm = Math.floor(info.time / 60), ss = Math.floor(info.time % 60);
    const quote = info.quotes.length ? el('div', { class: 'quotes' }, info.quotes.map((q) => el('p', {}, [el('b', {}, (q.who?.name ?? 'Árbitro') + ': '), q.text]))) : null;
    const extra: HTMLElement[] = [];
    if (info.unlocked.length) extra.push(el('div', { class: 'unlocks' }, [el('h4', {}, '¡LUCHADOR DESBLOQUEADO!'), el('div', { class: 'ulist' }, info.unlocked.map((f) => el('div', { class: 'ucard' }, [this.portrait(f, 'mini'), el('span', {}, f.name)])))]));
    if (info.newAchievements.length) extra.push(el('div', { class: 'unlocks' }, [el('h4', {}, 'LOGROS NUEVOS'), ...info.newAchievements.map((a) => el('div', { class: 'ach new' }, [el('b', {}, '★ ' + a.name), el('span', {}, a.desc)]))]));
    const n = el('div', { class: 'screen results ' + (info.won ? 'win' : 'lose') }, [
      el('div', { class: 'rpanel' }, [
        el('div', { class: 'rtitle' }, info.spectate ? 'FIN DEL COMBATE' : info.won ? 'VICTORIA' : 'DERROTA'),
        el('div', { class: 'rwho' }, [this.portrait(info.winner, 'rp'), el('div', {}, [el('div', { class: 'rname' }, info.winner.name), el('div', { class: 'rreason' }, `${info.reasonText} a ${info.loser.name}`)])]),
        el('div', { class: 'rstats' }, [el('div', {}, [el('b', {}, `${mm}:${String(ss).padStart(2, '0')}`), 'Duración']), el('div', {}, [el('b', {}, String(Math.round(info.damage.dealt))), 'Daño causado']), el('div', {}, [el('b', {}, String(Math.round(info.damage.taken))), 'Daño recibido'])]),
        quote, ...extra,
        el('div', { class: 'btns' }, buttons.map((b) => this.btn(b.label, b.action, b.primary ? 'primary go' : ''))),
      ]),
    ]);
    this.set(n);
  }

  showPause(resume: () => void, quit: () => void) {
    this.hidePause();
    this.pauseResume = resume;
    const g = this.game;
    const row = (label: string, key: 'master' | 'music' | 'sfx') => el('label', { class: 'slider' }, [el('span', {}, label), el('input', { type: 'range', min: '0', max: '1', step: '0.05', value: String(g.save.settings[key]), onInput: (e: Event) => { g.save.settings[key] = Number((e.target as HTMLInputElement).value); g.commitSettings(); } })]);
    this.pauseEl = el('div', { class: 'screen pause overlay' }, [
      el('div', { class: 'rpanel' }, [
        el('div', { class: 'rtitle' }, 'PAUSA'),
        row('Volumen general', 'master'), row('Música', 'music'), row('Efectos', 'sfx'),
        el('div', { class: 'help', html: g.controlsHint() }),
        el('div', { class: 'help dim' }, 'Contraataque: pulsa GUARDIA justo antes de que llegue el golpe. Revertir agarre: pulsa AGARRE justo antes de que te agarren. Pin: acércate a un rival en el suelo y pulsa AGARRE. Con el finisher listo (barra llena) pulsa F.'),
        el('div', { class: 'btns' }, [this.btn('Reanudar', resume, 'primary go'), this.btn('Abandonar combate', quit)]),
      ]),
    ]);
    this.root.appendChild(this.pauseEl);
    if (this.useFocus) this.focusFirst(this.pauseEl);
  }
  hidePause() { this.pauseEl?.remove(); this.pauseEl = null; this.pauseResume = null; }

  showRoster() {
    const g = this.game;
    const sc = g.showcase!; sc.mode = 'close';
    let sel = g.roster[0].id;
    const render = () => {
      const f = g.roster.find((r) => r.id === sel)!;
      const unlocked = g.isUnlocked(f);
      sc.setFighter(0, unlocked ? f : null); sc.setFighter(1, null);
      const n = el('div', { class: 'screen roster' }, [
        el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, 'PLANTILLA')]),
        el('div', { class: 'rost-main' }, [
          el('div', { class: 'rost-detail' }, [
            this.portrait(f, 'big'),
            el('div', { class: 'fname' }, unlocked ? f.name : '???'),
            unlocked ? this.statBars(f) : el('div', { class: 'lockbox' }, '🔒 ' + (f.unlock?.hint ?? 'Bloqueado')),
            unlocked ? this.movesList(f) : null,
          ]),
          el('div', { class: 'rost-bio' }, unlocked ? [el('p', {}, f.description), el('p', { class: 'stylep' }, [el('b', {}, 'Estilo de lucha. '), f.style])] : [el('p', {}, 'Desbloquea a este luchador para conocer su historia.')]),
        ]),
        this.strip({ [sel]: true }, (x) => { sel = x.id; render(); }),
      ]);
      this.set(n, () => this.showMenu());
    };
    render();
  }

  // ---------------------------------------------------------------- modo historia
  showStoryMenu() {
    const g = this.game;
    const p: StoryProgress = g.save.story ?? newProgress();
    const list = chaptersFor(CHAPTERS, p.flags);
    const next = nextChapter(CHAPTERS, p);
    const sc = g.showcase;
    sc?.setFighter(0, null); sc?.setFighter(1, null);
    sc?.setPaired(false);
    if (sc) sc.mode = 'orbit';
    if (next && sc && sc.arena.id !== next.arena) g.openShowcase(next.arena);
    const card = (ch: StoryChapter, i: number) => {
      const st = chapterState(CHAPTERS, p, ch.id);
      const label = st === 'done' ? '✔ Completado' : st === 'open' ? '▶ Disponible' : '🔒 Bloqueado';
      return el('button', {
        class: 'mapcard chapter ' + st + (next?.id === ch.id ? ' sel' : ''), 'data-nav': true, disabled: st === 'locked',
        onClick: () => {
          if (st === 'locked') { Audio.sfx('foul'); return; }
          this.click('confirm');
          // el capítulo pendiente se juega en la calle (vas a su marca); los ya jugados se pueden repetir
          if (st === 'open') g.enterWorld({ chapter: ch.id }); else g.startChapter(ch.id);
        },
      }, [
        el('div', { class: 'tagline' }, `CAPÍTULO ${i + 1} · ${st === 'done' ? '✔ Repetir' : label}`),
        el('div', { class: 'mapname' }, ch.title),
        el('div', { class: 'mapdesc' }, st === 'locked' ? '???' : ch.summary),
      ]);
    };
    let confirmReset = false;
    const resetBtn = this.btn('Empezar de nuevo', () => {
      if (!confirmReset) { confirmReset = true; (resetBtn.querySelector('span') as HTMLElement).textContent = '¿Seguro? Pulsa otra vez'; return; }
      g.save.story = newProgress(p.endings); writeSave(g.save); this.showStoryMenu();
    }, 'small');
    const n = el('div', { class: 'screen storymenu' }, [
      el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, 'CAPÍTULOS'), el('span', { class: 'subnote' }, STORY_TITLE + ' · se vive en Hoyo')]),
      el('div', { class: 'storyintro' }, STORY_INTRO),
      el('div', { class: 'mapgrid' }, list.map((c, i) => card(c, i))),
      el('div', { class: 'options end' }, [
        p.done.length ? resetBtn : null,
        p.endings.length ? this.btn(`Finales vistos (${p.endings.length}/${ENDINGS.length})`, () => this.showStoryEndings(), 'small') : null,
        this.btn(p.done.length || next?.id !== CHAPTERS[0].id ? 'VOLVER A HOYO' : 'EMPEZAR EN HOYO', () => g.enterWorld(), 'primary go'),
      ]),
    ]);
    this.set(n, () => this.showMenu());
  }

  /** Galería de finales vistos */
  showStoryEndings() {
    const g = this.game;
    const seen = g.save.story?.endings ?? [];
    const n = el('div', { class: 'screen storymenu' }, [
      el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showStoryMenu(), 'small'), el('h2', {}, 'FINALES')]),
      el('div', { class: 'mapgrid' }, ENDINGS.map((e) => {
        const ok = seen.includes(e.id);
        return el('div', { class: 'mapcard chapter ' + (ok ? 'done' : 'locked') }, [el('div', { class: 'tagline' }, ok ? '★ Final visto' : '🔒 Sin descubrir'), el('div', { class: 'mapname' }, ok ? e.title : '???'), el('div', { class: 'mapdesc' }, ok ? e.summary : 'Hay más de un final: tus decisiones cuentan.')]);
      })),
    ]);
    this.set(n, () => this.showStoryMenu());
  }

  /** Reproduce escenas de novela visual (con elecciones que activan banderas) y llama a `done` al terminar. */
  showStoryScenes(scenes: StoryScene[], flags: () => Flags, onChoice: (c: StoryChoice) => void, done: () => void, onLine?: (who: string) => void) {
    const g = this.game;
    let si = -1;
    const nextScene = () => {
      si++;
      while (si < scenes.length && !holds(scenes[si].if, flags())) si++;
      if (si >= scenes.length) { window.removeEventListener('keydown', key); done(); return; }
      playScene(scenes[si]);
    };
    let lines: StoryLine[] = [];
    let scene: StoryScene | null = null;
    let i = 0, typed = false, choosing = false;
    const nameBox = el('div', { class: 'dname' });
    const textBox = el('div', { class: 'dtext' });
    const port = el('div', { class: 'dport' });
    const hint = el('div', { class: 'dnext' }, [kbd('Clic / Espacio', 'A'), ' continuar ▸ ', kbd('Esc', 'B'), ' saltar']);
    const choiceBox = el('div', { class: 'dchoices' });
    const box = el('div', { class: 'dbox' }, [port, el('div', { class: 'dmain' }, [nameBox, textBox, hint, choiceBox])]);
    const n = el('div', { class: 'screen dialogue storyscene' }, [el('button', { class: 'btn small skip', 'data-nav': true, onClick: () => skipScene() }, 'Saltar escena »'), box]);
    let cast: string[] = [];
    const fighter = (id: string) => g.roster.find((r) => r.id === id) ?? g.world.civilData(id);
    const show = (l: StoryLine) => {
      onLine?.(l.who);
      // «cartel»: rótulo grande en mitad de la pantalla (saltos en el tiempo, títulos)
      const card = n.querySelector('.scard');
      card?.remove();
      box.classList.toggle('hidden', l.who === 'cartel');
      if (l.who === 'cartel') {
        n.appendChild(el('div', { class: 'scard' }, [el('i', {}), el('b', {}, l.text)]));
        Audio.sfx('heavy');
        typed = true; textBox.textContent = l.text;
        return;
      }
      const f = fighter(l.who);
      const narr = l.who === 'narrador';
      nameBox.textContent = narr ? '' : f?.name ?? (l.who === 'arbitro' ? 'Árbitro' : l.who);
      nameBox.className = 'dname' + (narr ? ' narr' : '');
      clear(port); port.appendChild(narr ? el('div', { class: 'narrmark' }, '❝') : this.portrait(f, 'dp'));
      box.classList.toggle('right', !narr && cast.length > 1 && cast.indexOf(l.who) === 1);
      box.classList.toggle('narration', narr);
      textBox.textContent = ''; typed = false;
      let k = 0;
      if (this.typing) clearInterval(this.typing);
      this.typing = window.setInterval(() => {
        k += 1; textBox.textContent = l.text.slice(0, k);
        if (k % 3 === 0 && !narr) Audio.sfx('click');
        if (k >= l.text.length) { clearInterval(this.typing!); this.typing = null; typed = true; }
      }, 22);
    };
    const showChoices = () => {
      choosing = true; hint.style.display = 'none'; clear(choiceBox);
      for (const c of scene!.choices!) {
        choiceBox.appendChild(el('button', { class: 'btn dchoice', 'data-nav': true, onClick: (e: Event) => {
          e.stopPropagation(); Audio.sfx('confirm'); onChoice(c); choosing = false; clear(choiceBox); hint.style.display = '';
          scene = { ...scene!, choices: undefined };
          lines = (c.reply ?? []).filter((l) => lineVisible(l, flags())).map((l) => ({ ...l, text: voice(l.who, l.text) })); i = -1;
          if (!lines.length) { nextScene(); return; }
          advance();
        } }, [el('span', {}, c.text)]));
      }
      if (this.useFocus) choiceBox.querySelector<HTMLElement>('[data-nav]')?.focus({ preventScroll: true });
    };
    const advance = () => {
      if (choosing) return;
      if (i >= 0 && !typed) { if (this.typing) clearInterval(this.typing); this.typing = null; textBox.textContent = lines[i].text; typed = true; return; }
      i++;
      if (i >= lines.length) { if (scene?.choices?.length) { showChoices(); return; } nextScene(); return; }
      show(lines[i]);
    };
    const skipScene = () => {
      if (this.typing) { clearInterval(this.typing); this.typing = null; }
      if (scene?.choices?.length && !choosing) { i = lines.length - 1; if (i >= 0) { show(lines[i]); if (this.typing) clearInterval(this.typing); this.typing = null; textBox.textContent = lines[i].text; typed = true; } showChoices(); return; }
      if (choosing) return;
      nextScene();
    };
    const playScene = (sc: StoryScene) => {
      scene = { ...sc, choices: sc.choices?.filter((c) => holds(c.if, flags())) };
      lines = sc.lines.filter((l) => lineVisible(l, flags())).map((l) => ({ ...l, text: voice(l.who, l.text) }));
      n.classList.toggle('recuerdo', sc.mood === 'recuerdo');
      cast = (sc.cast ?? [...new Set(lines.map((l) => l.who).filter((w) => fighter(w)))]).slice(0, 2);
      if (sc.bg && g.showcase && g.showcase.arena.id !== sc.bg) g.openShowcase(sc.bg);
      const sk = g.save.skins?.['chema'];
      const data = (id: string | undefined) => { const f = id ? fighter(id) : null; return f ? (f.id === 'chema' && sk ? withSkin(f, sk) : f) : null; };
      g.showcase?.setPaired(false);
      g.showcase?.setFighter(0, data(cast[0])); g.showcase?.setFighter(1, data(cast[1]));
      if (g.showcase) g.showcase.mode = 'close';
      i = -1;
      if (!lines.length && !sc.choices?.length) { nextScene(); return; }
      advance();
    };
    const key = (e: KeyboardEvent) => { if (this.cur !== n) { window.removeEventListener('keydown', key); return; } if ((e.key === ' ' || e.key === 'Enter') && !choosing) { advance(); e.preventDefault(); } };
    window.addEventListener('keydown', key);
    box.addEventListener('click', advance);
    n.addEventListener('click', (e) => { if (e.target === n || (e.target as HTMLElement).closest('.scard')) advance(); });
    this.set(n);
    this.confirmHandler = advance;
    nextScene();
  }

  /** Pantalla de FIN con el final conseguido */
  showStoryTheEnd(ending: { title: string; summary: string }, isNew: boolean, seen: number, total: number, onMenu: () => void) {
    const g = this.game;
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
    Audio.sfx('win'); Audio.music('victoria');
    const n = el('div', { class: 'screen results win' }, [
      el('div', { class: 'rpanel' }, [
        el('div', { class: 'rtitle' }, 'FIN'),
        el('div', { class: 'rwho' }, [el('div', {}, [el('div', { class: 'rname' }, ending.title), el('div', { class: 'rreason' }, ending.summary)])]),
        el('div', { class: 'unlocks' }, [el('h4', {}, isNew ? '¡FINAL NUEVO!' : 'FINAL REPETIDO'), el('div', { class: 'ach new' }, [el('b', {}, `★ Finales descubiertos: ${seen}/${total}`), el('span', {}, 'Vuelve a empezar la historia y toma otras decisiones (bando, aliados, final) para ver el resto.')])]),
        el('div', { class: 'btns' }, [this.btn('Menú de historia', onMenu, 'primary go')]),
      ]),
    ]);
    this.set(n);
  }

  /** Capítulo completado: recompensas y siguiente paso */
  showStoryChapterDone(ch: StoryChapter, reward: string | null, hasNext: boolean, onNext: () => void, onMenu: () => void) {
    const g = this.game;
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
    Audio.sfx('win');
    const n = el('div', { class: 'screen results win' }, [
      el('div', { class: 'rpanel' }, [
        el('div', { class: 'rtitle' }, 'CAPÍTULO COMPLETADO'),
        el('div', { class: 'rwho' }, [el('div', {}, [el('div', { class: 'rname' }, ch.title), el('div', { class: 'rreason' }, ch.summary)])]),
        reward ? el('div', { class: 'unlocks' }, [el('h4', {}, 'RECOMPENSA'), el('div', { class: 'ach new' }, [el('b', {}, '★ ' + reward)])]) : null,
        el('div', { class: 'btns' }, [hasNext ? this.btn('Siguiente capítulo', onNext, 'primary go') : null, this.btn('Menú de historia', onMenu, hasNext ? '' : 'primary go')]),
      ]),
    ]);
    this.set(n);
  }

  /** El jugador elige a su compañero de combate (por parejas) */
  showStoryPartnerPick(options: string[], onPick: (id: string) => void) {
    const g = this.game;
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
    const pool = g.roster.filter((f) => options.includes(f.id));
    const n = el('div', { class: 'screen storymenu' }, [
      el('div', { class: 'topbar' }, [el('h2', {}, 'ELIGE A TU COMPAÑERO')]),
      el('div', { class: 'storyintro' }, 'Pelearéis juntos: puedes relevar a tu compañero con R. Si formáis un dúo dinámico, tendréis bonificación.'),
      el('div', { class: 'mapgrid' }, pool.map((f) => {
        const duo = duoOf('chema', f.id);
        return el('button', { class: 'mapcard chapter open', 'data-nav': true, onClick: () => { this.click('confirm'); onPick(f.id); } }, [
          el('div', { class: 'tagline' }, duo ? '★ DÚO DINÁMICO' : 'Compañero'),
          el('div', { class: 'mapname' }, f.name),
          el('div', { class: 'mapdesc' }, f.style),
        ]);
      })),
    ]);
    this.set(n);
  }

  /** Cómo se juega: controles, reglas del ring, mapas y extras */
  showHelp() {
    const g = this.game;
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
    const sec = (title: string, rows: [string, string][]) => el('div', { class: 'hsec' }, [
      el('h3', {}, title),
      ...rows.map(([k, v]) => el('p', {}, [el('b', {}, k), ' ' + v])),
    ]);
    const n = el('div', { class: 'screen help' }, [
      el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, 'CÓMO SE JUEGA')]),
      el('div', { class: 'helpgrid' }, [
        sec('Controles (teclado)', [['WASD', 'moverte · Shift correr'], ['J / clic izq.', 'golpe ligero (encadena hasta 3)'], ['K / clic der.', 'golpe fuerte'], ['L', 'agarre; con el rival en el suelo, pin'], ['Espacio', 'guardia (mantén)'], ['E', 'burla (da un poco de momentum)'], ['F', 'finisher con la barra llena'], ['R', 'relevo en combates por parejas'], ['Esc / P', 'pausa']]),
        sec('Mando y táctil', [['Stick + A/X/B', 'mover, golpe, fuerte, agarre'], ['LB/LT · RT', 'guardia · correr'], ['Y · RB', 'burla · finisher'], ['Select', 'relevo'], ['Táctil', 'joystick a la izquierda y botones a la derecha (RELEVO aparece en parejas)']]),
        sec('Ganar un combate', [['KO', 'deja al rival a 0 de vida y aguanta la cuenta de 10'], ['Pin', 'rival en el suelo + AGARRE: tres segundos y es tuyo (si no se zafa)'], ['Rendición', 'tras un agarre, aprieta la llave hasta que se rinda'], ['Cuenta fuera', 'el que pasa 10 segundos fuera del ring pierde (no en todos los mapas)']]),
        sec('Trucos de combate', [['Contraataque', 'guardia justo antes de que llegue el golpe'], ['Revertir agarre', 'pulsa AGARRE justo antes de que te agarren'], ['Combos', '3 golpes seguidos activan el contador; a los 5 ganas momentum extra'], ['Adrenalina', 'la primera vez que bajas del 20 % de vida, 10 s de más pegada y velocidad'], ['Rope break', 'un pin pegado a las cuerdas se rompe solo (donde hay cuerdas que valgan)']]),
        sec('Por parejas', [['Relevo', 'cambia de compañero con R; el que descansa recupera vida y resistencia'], ['Dúos dinámicos', 'algunas parejas se llevan bien y combaten mejor juntas: Kongui y Darksinfacha, Petisui y Big Mac, Perro Cheetos y Petisui, y Pablo Motos con Ansol, Petisui o Elso'], ['Cae uno', 'entra el otro; si caen los dos, perdéis']]),
        sec('Mapas con reglas propias', [['Tribu de Kongui', 'sin ring; si empujas o golpeas hacia el público, te atacan todos'], ['Garito de las 3000', 'el árbitro no ve nada, sin cuenta fuera'], ['Jaula de Acero', 'no hay salida; los golpes fuertes contra la reja hacen daño extra'], ['Azotea de las 3000', 'ráfagas de viento que os empujan'], ['Playa de Honduras', 'la arena te frena un 10 %'], ['Oficina de Pablo Motos', 'Pablo lanza un maletín al que va perdiendo'], ['Ascensor 24/7', 'cabina de cristal sin ring; los pins se cuentan rapidísimo'], ['Estadio de Santiago', 'apagones: todo va más lento y el momentum sube más rápido']]),
        sec('Historia · Hoyo (la ciudad)', [['Explorar', 'WASD o joystick para moverte · Shift o joystick a tope para correr · arrastra (o , y .) para girar la cámara'], ['La historia', 'sigue la flecha y la columna de luz dorada: cada capítulo empieza con una escena en la calle, sales a combatir y vuelves a Hoyo para ver qué pasa después'], ['Con mando', 'stick izquierdo mover · stick derecho cámara · A hablar/usar · Y mapa · X bolsa · Select misiones · Start pausa · B cerrar ventanas'], ['La moto', 'está aparcada junto a tu piso (en el mapa, en morado): acércate y pulsa E / A para subir; Shift o RT para ir a tope'], ['En casa', 'cama (siesta o hasta la hora que quieras) y armario (traje y equipo, con espejo)'], ['Combates callejeros', 'se pelean en el Callejón de Hoyo: círculo de tiza, sin ring y sin árbitro que mire'], ['E / Enter / HABLAR', 'hablar, comprar, entrenar, retar a un combate callejero, jugar un minijuego o empezar un capítulo de historia'], ['M · Q · I · Esc', 'mapa · misiones · bolsa (equipo) · pausa (también con los botones de arriba a la derecha)'], ['Progreso', 'ganas Hoyos y experiencia; el gimnasio y el equipo mejoran a Chema en TODOS los modos (tope +30 %)'], ['Qué hacer', '24 misiones, 30 pegatinas, 10 grafitis, 14 cartas de luchador, 4 minijuegos (pulso, comilona, pesca, tambores), apuestas de noche en el garito y la Torre Motos tras el final']]),
        sec('Modos', [['Historia · Hoyo', 'la ciudad de Hoyo y la Temporada 5 en un solo modo: nueve capítulos con decisiones, combates especiales (parejas, jaula, supervivencia, Gauntlet, jefes) y tres finales, más misiones, minijuegos y combates callejeros'], ['Capítulos', 'repite capítulos ya jugados y mira los finales'], ['Versus', 'un combate (1 contra 1 o 2 contra 2) con dificultad y modificadores'], ['Torneo', 'Hoyo Champion, Hoyo Tag Champion (parejas) y Hoyo Femboy Champion'], ['Supervivencia', 'rivales sin fin, con mejoras tras cada victoria'], ['Entrenamiento', 'practica contra un rival que no puede ganarte'], ['Espectador', 'dos CPUs luchan, con narrador']]),
        sec('Trajes', [['Elige el traje', 'en la fila TRAJE al seleccionar a un luchador que tenga trajes alternativos (Pablo Motos, Petisui, Darksinfacha…)']]),
      ]),
    ]);
    this.set(n, () => this.showMenu());
  }

  /** Salón de la fama: números de toda tu carrera */
  showHallOfFame() {
    const g = this.game;
    const s = g.save;
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
    const total = s.wins + s.losses;
    const pct = total ? Math.round((s.wins / total) * 100) : 0;
    const tile = (big: string, small: string) => el('div', { class: 'hstat' }, [el('b', {}, big), el('span', {}, small)]);
    const wins = g.roster.filter((f) => !f.placeholder || (s.winsBy[f.id] ?? 0) > 0).map((f) => ({ f, w: s.winsBy[f.id] ?? 0 })).sort((a, b) => b.w - a.w);
    const maxW = Math.max(1, ...wins.map((x) => x.w));
    const best = wins[0]?.w ? wins[0].f : null;
    const tours = (['champion', 'tag', 'femboy'] as const).map((k) => [TOURS[k].name, s.tourWins?.[k] ?? 0] as [string, number]);
    const n = el('div', { class: 'screen halloffame' }, [
      el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, 'SALÓN DE LA FAMA')]),
      el('div', { class: 'hstats' }, [
        tile(String(s.wins), 'Victorias'), tile(String(s.losses), 'Derrotas'), tile(pct + ' %', 'Porcentaje de victorias'),
        tile(String(s.survivalBest ?? 0), 'Mejor racha de Supervivencia'), tile(String(s.taunts), 'Burlas'), tile(`${Object.keys(s.achievements).length}/${ACHIEVEMENTS.length}`, 'Logros'),
        tile(`${s.story?.done.length ?? 0}/${CHAPTERS.length}`, 'Capítulos de la Historia'), tile(`${s.story?.endings.length ?? 0}/${ENDINGS.length}`, 'Finales de la Historia'),
        s.world ? tile(`Nivel ${s.world.level}`, 'Hoyo') : null, s.world ? tile(`${Object.values(s.world.quests).filter((q) => q.done).length}`, 'Misiones de Hoyo') : null, s.world ? tile(`${s.world.collected.length}/30`, 'Pegatinas') : null,
      ]),
      el('div', { class: 'hcols' }, [
        el('div', { class: 'hpanel' }, [
          el('h3', {}, 'Torneos ganados'),
          ...tours.map(([name, w]) => el('div', { class: 'hrow' }, [el('span', {}, name), el('b', {}, String(w))])),
          best ? el('p', { class: 'dim' }, `Tu luchador más laureado: ${best.name} (${s.winsBy[best.id]} victorias).`) : el('p', { class: 'dim' }, 'Aún no has ganado ningún combate: ¡a por el primero!'),
        ]),
        el('div', { class: 'hpanel' }, [
          el('h3', {}, 'Victorias por luchador'),
          ...wins.map(({ f, w }) => el('div', { class: 'hbar' }, [el('span', {}, f.name), el('div', {}, [el('i', { style: `width:${Math.round((w / maxW) * 100)}%` })]), el('b', {}, String(w))])),
        ]),
      ]),
    ]);
    this.set(n, () => this.showMenu());
  }

  showAchievements() {
    const g = this.game;
    const list = ACHIEVEMENTS.map((a) => {
      const got = g.save.achievements[a.id];
      return el('div', { class: 'ach' + (got ? ' got' : '') }, [el('b', {}, (got ? '★ ' : '☆ ') + a.name), el('span', {}, a.desc)]);
    });
    const n = el('div', { class: 'screen achs' }, [
      el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, 'LOGROS')]),
      el('div', { class: 'astats' }, [`${g.save.wins} victorias`, `${g.save.losses} derrotas`, `Torneos: ${g.save.tournaments.facil + g.save.tournaments.intermedia + g.save.tournaments.dificil}`, `${Object.keys(g.save.achievements).length}/${ACHIEVEMENTS.length} logros`].map((t) => el('span', {}, t))),
      el('div', { class: 'agrid' }, list),
      el('h3', { class: 'sub' }, 'Luchadores'),
      el('div', { class: 'agrid' }, g.roster.map((f) => { const u = g.isUnlocked(f); return el('div', { class: 'ach' + (u ? ' got' : '') }, [el('b', {}, (u ? '✔ ' : '🔒 ') + (u ? f.name : '???')), el('span', {}, u ? (f.unlock ? 'Desbloqueado' : 'Disponible desde el principio') : f.unlock?.hint ?? '')]); })),
    ]);
    this.set(n, () => this.showMenu());
  }

  showSettings(back: () => void) {
    const g = this.game;
    const s = g.save.settings;
    const slider = (label: string, key: 'master' | 'music' | 'sfx') => el('label', { class: 'slider' }, [el('span', {}, label), el('input', { type: 'range', min: '0', max: '1', step: '0.05', value: String(s[key]), 'data-nav': true, onInput: (e: Event) => { s[key] = Number((e.target as HTMLInputElement).value); g.commitSettings(); Audio.init(); Audio.sfx('hit'); } })]);
    const toggle = (label: string, key: 'shake' | 'voice' | 'fps') => { const b = el('button', { class: 'chip' + (s[key] ? ' on' : ''), 'data-nav': true, onClick: () => { s[key] = !s[key]; b.classList.toggle('on', s[key]); g.commitSettings(); this.click(); } }, s[key] ? 'Sí' : 'No'); b.addEventListener('click', () => (b.textContent = s[key] ? 'Sí' : 'No')); return el('div', { class: 'srow' }, [el('span', {}, label), b]); };
    const select = <T extends string>(label: string, key: 'quality' | 'touch', options: [T, string][]) => {
      const row = el('div', { class: 'chips' });
      options.forEach(([v, n]) => row.appendChild(el('button', { class: 'chip' + ((s as any)[key] === v ? ' on' : ''), 'data-nav': true, 'data-v': v, onClick: () => { (s as any)[key] = v; row.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', (c as HTMLElement).dataset.v === v)); g.commitSettings(); this.click(); } }, n)));
      return el('div', { class: 'srow col' }, [el('span', {}, label), row]);
    };
    const n = el('div', { class: 'screen settings' }, [
      el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => { g.commitSettings(); back(); }, 'small'), el('h2', {}, 'AJUSTES')]),
      el('div', { class: 'spanel' }, [
        slider('Volumen general', 'master'), slider('Música', 'music'), slider('Efectos y público', 'sfx'),
        toggle('Voz del árbitro (cuenta del pin)', 'voice'), toggle('Sacudida de cámara', 'shake'), toggle('Mostrar FPS', 'fps'),
        select('Calidad gráfica', 'quality', [['auto', 'Auto'], ['baja', 'Baja'], ['media', 'Media'], ['alta', 'Alta']]),
        select('Controles táctiles', 'touch', [['auto', 'Auto'], ['on', 'Siempre'], ['off', 'Nunca']]),
        el('div', { class: 'srow' }, [el('span', {}, 'Pantalla doble (AYN Thor): ' + (g.dual.connected ? 'conectada ✔' : 'abre la ventana de abajo')), this.btn('Abrir pantalla de abajo', () => { void openCompanion().then((r) => g.toast(r === 'otra-pantalla' ? '📱 Abierta en la otra pantalla' : r === 'ventana' ? '📱 Ventana abierta: llévala a la pantalla de abajo con el botón de cambiar de pantalla' : 'El navegador ha bloqueado la ventana: abre a mano esta dirección + «?pantalla=abajo»')); }, 'small')]),
        el('div', { class: 'srow' }, [el('span', {}, 'Modo desarrollador (F2 o botón DEV)'), (() => { const on = () => !!g.save.dev?.on; const b = el('button', { class: 'chip' + (on() ? ' on' : ''), 'data-nav': true, onClick: () => { g.save.dev = { stats: {}, ...(g.save.dev ?? {}), on: !on() }; b.classList.toggle('on', on()); b.textContent = on() ? 'Sí' : 'No'; g.commitSettings(); g.dev.sync(); this.click(); } }, on() ? 'Sí' : 'No'); return b; })()]),
        el('div', { class: 'srow' }, [el('span', {}, 'Progreso guardado'), this.btn('Borrar', () => { if (confirm('¿Borrar victorias, logros y luchadores desbloqueados?')) { localStorage.removeItem('el-hoyo-wrestling-v1'); location.reload(); } }, 'small danger')]),
      ]),
    ]);
    this.set(n, () => { g.commitSettings(); back(); });
  }

  showCredits() {
    const n = el('div', { class: 'screen credits' }, [
      el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, 'CRÉDITOS')]),
      el('div', { class: 'rpanel' }, [
        el('p', { class: 'big' }, 'El Hoyo Wrestling — El videojuego'),
        el('p', {}, 'Inspirado en la obra original de Jefefbi.'),
        el('p', { class: 'dim' }, 'Hecho con cariño para el servidor del Hoyo. Motor 3D: three.js · Audio sintetizado con WebAudio · Todo el contenido gráfico y sonoro se genera por código.'),
      ]),
    ]);
    this.set(n, () => this.showMenu());
  }
}
