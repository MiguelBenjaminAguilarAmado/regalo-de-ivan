import type { ArenaId, Difficulty, FighterData } from '../combat/types';
import type { Game, ResultInfo, VersusSetup } from '../game/Game';
import type { PadAction } from '../input/PadNav';
import { ACHIEVEMENTS } from '../progress/Achievements';
import { roundName, arenaForRound, opponentOf, playerPairing, type Bracket } from '../modes/Tournament';
import { getMove } from '../combat/moves';
import { Audio } from '../audio/Audio';
import { clear, el } from './dom';

const ARENAS: { id: ArenaId | 'random'; name: string; desc: string }[] = [
  { id: 'matamoros', name: 'Matamoros', desc: '30.000 personas · orquesta en la esquina superior derecha' },
  { id: 'manchester', name: 'Manchester', desc: '60.000 personas · teatro con dos columnas gigantes y un monigote azul' },
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

  // ---------------------------------------------------------------- utilidades
  private set(node: HTMLElement, back: (() => void) | null = null) {
    // al repintar la misma pantalla (p. ej. al elegir un luchador) se conserva el elemento seleccionado
    let keep = -1;
    if (this.useFocus && this.cur && this.cur.className === node.className) keep = [...this.cur.querySelectorAll('[data-nav]')].indexOf(document.activeElement as Element);
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
      if (this.confirmHandler) { this.confirmHandler(); return; }
      const f = document.activeElement as HTMLElement;
      if (this.cur.contains(f) && f.matches('[data-nav]')) { if (f instanceof HTMLInputElement) return; f.click(); }
      else this.focusFirst(this.cur);
    }
  }

  private btn(label: string, onClick: () => void, cls = '', sub = '') {
    return el('button', { class: 'btn ' + cls, 'data-nav': true, onClick: () => { this.click(cls.includes('primary') ? 'confirm' : 'click'); onClick(); } }, [el('span', {}, label), sub && el('small', {}, sub)]);
  }

  private portrait(f: FighterData | null, cls = '') {
    const box = el('div', { class: 'portrait ' + cls });
    // los iconos pequeños usan la foto de perfil; las tarjetas grandes, la foto completa
    const small = cls === '' || /mini|dp|rp/.test(cls);
    const src = f ? (small ? f.pfp ?? f.portrait : f.portrait ?? f.pfp) : null;
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

  private card(f: FighterData | null, side: 'left' | 'right', tag: string) {
    if (!f) return el('div', { class: `fcard ${side} empty` }, [el('div', { class: 'ftag' }, tag), el('div', { class: 'fname' }, 'Elige luchador')]);
    return el('div', { class: `fcard ${side}` }, [
      el('div', { class: 'ftag' }, tag),
      this.portrait(f, 'big'),
      el('div', { class: 'fname' }, f.name),
      this.statBars(f),
      el('div', { class: 'fbio' }, f.style),
    ]);
  }

  /** Fila de selección de luchadores */
  private strip(selected: Record<string, boolean>, onPick: (f: FighterData) => void, opts: { random?: () => void; all?: boolean } = {}) {
    const strip = el('div', { class: 'strip' });
    for (const f of this.game.roster) {
      const unlocked = opts.all || this.game.isUnlocked(f);
      const t = el('button', {
        class: 'tile' + (selected[f.id] ? ' sel' : '') + (unlocked ? '' : ' locked') + (f.placeholder ? ' ph' : ''), 'data-nav': true, title: unlocked ? f.name : f.unlock?.hint ?? 'Bloqueado',
        onClick: () => { if (unlocked) { this.click(); onPick(f); } else { Audio.sfx('foul'); } },
      }, [this.portrait(f), el('span', { class: 'tname' }, unlocked ? f.name : '???'), !unlocked && el('span', { class: 'lock' }, '🔒 ' + (f.unlock?.hint ?? ''))]);
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
          this.btn('VERSUS', () => this.showVersusSetup(), 'primary', 'Un combate contra la CPU'),
          this.btn('TORNEO', () => this.showTournamentSetup(), 'primary', 'Cuadro de eliminatorias'),
          this.btn('ESPECTADOR', () => this.showSpectateSetup(), '', 'CPU contra CPU, con narrador'),
          el('div', { class: 'menu-grid' }, [
            dis('HISTORIA'), dis('SUPERVIVENCIA'),
            this.btn('PLANTILLA', () => this.showRoster(), 'compact'),
            this.btn('LOGROS', () => this.showAchievements(), 'compact', `${Object.keys(g.save.achievements).length}/${ACHIEVEMENTS.length}`),
            this.btn('AJUSTES', () => this.showSettings(() => this.showMenu()), 'compact'),
            this.btn('CRÉDITOS', () => this.showCredits(), 'compact'),
          ]),
        ]),
        el('div', { class: 'menu-foot' }, `${g.save.wins} victorias · ${g.save.losses} derrotas`),
      ]),
    ]);
    this.set(n);
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
    if (g.showcase) g.showcase.mode = 'orbit';
  }

  showSpectateSetup() { this.showVersusSetup(undefined, true); }

  /** Selección de combate. Con `spectate`, las dos plazas son CPU (modo espectador). */
  showVersusSetup(prefill?: Partial<VersusSetup>, spectate = false) {
    const g = this.game;
    const pool = spectate ? g.roster : g.roster.filter((f) => g.isUnlocked(f));
    const last = g.lastSpectate;
    const state: VersusSetup & { slot: 0 | 1 } = {
      player: prefill?.player ?? (spectate ? last?.a : undefined) ?? pool[0].id,
      cpu: prefill?.cpu ?? (spectate ? last?.b ?? pool[1]?.id ?? '' : ''),
      arena: prefill?.arena ?? (spectate ? last?.arena : undefined) ?? 'matamoros',
      difficulty: prefill?.difficulty ?? g.save.settings.difficulty,
      slot: prefill?.cpu || spectate ? 0 : 1,
    };
    const tagA = spectate ? 'CPU 1' : 'TÚ', tagB = spectate ? 'CPU 2' : 'CPU';
    const sc = g.showcase!;
    sc.mode = 'close';
    const render = () => {
      const p = state.player ? g.roster.find((r) => r.id === state.player)! : null;
      const c = state.cpu ? g.roster.find((r) => r.id === state.cpu)! : null;
      sc.setFighter(0, p); sc.setFighter(1, c);
      const n = el('div', { class: 'screen setup' }, [
        el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, spectate ? 'ESPECTADOR' : 'VERSUS'), spectate && el('span', { class: 'subnote' }, 'Dos CPUs luchan · cámara de director y narrador')]),
        el('div', { class: 'cards' }, [this.card(p, 'left', tagA), el('div', { class: 'vs' }, 'VS'), this.card(c, 'right', tagB)]),
        el('div', { class: 'slots' }, [
          el('button', { class: 'slot' + (state.slot === 0 ? ' on' : ''), 'data-nav': true, onClick: () => { state.slot = 0; render(); } }, 'Eligiendo: ' + tagA),
          el('button', { class: 'slot' + (state.slot === 1 ? ' on' : ''), 'data-nav': true, onClick: () => { state.slot = 1; render(); } }, 'Eligiendo: ' + tagB),
        ]),
        this.strip({ [state.player]: state.slot === 0, [state.cpu]: state.slot === 1 }, (f) => {
          if (state.slot === 0) { state.player = f.id; if (!state.cpu) state.slot = 1; } else { state.cpu = f.id; }
          render();
        }, {
          all: spectate,
          random: () => { const other = state.slot === 0 ? state.cpu : state.player; const list = pool.filter((f) => f.id !== other); const f = list[Math.floor(Math.random() * list.length)]; if (state.slot === 0) state.player = f.id; else state.cpu = f.id; render(); },
        }),
        el('div', { class: 'options' }, [
          this.chips(ARENAS, state.arena, (v) => (state.arena = v), 'ESCENARIO'),
          this.chips(DIFFS, state.difficulty, (v) => { state.difficulty = v; g.save.settings.difficulty = v; }, spectate ? 'NIVEL DE LAS CPU' : 'DIFICULTAD'),
          this.btn(spectate ? '¡A VER EL COMBATE!' : '¡A LUCHAR!', () => {
            if (!state.player || !state.cpu) { Audio.sfx('foul'); if (!state.cpu) { state.slot = 1; render(); } return; }
            if (state.player === state.cpu) { Audio.sfx('foul'); return; }
            g.commitSettings();
            if (spectate) g.startSpectate({ a: state.player, b: state.cpu, arena: state.arena, difficulty: state.difficulty });
            else g.startVersus({ player: state.player, cpu: state.cpu, arena: state.arena, difficulty: state.difficulty });
          }, 'primary go'),
        ]),
      ]);
      this.set(n, () => this.showMenu());
    };
    render();
  }

  showTournamentSetup() {
    const g = this.game;
    const unlocked = g.roster.filter((f) => g.isUnlocked(f));
    let player = unlocked[0].id;
    let diff: Difficulty = g.save.settings.difficulty;
    const sc = g.showcase!; sc.mode = 'close';
    const size = g.roster.length >= 8 ? 8 : 4;
    const render = () => {
      const p = g.roster.find((r) => r.id === player)!;
      sc.setFighter(0, p); sc.setFighter(1, null);
      const n = el('div', { class: 'screen setup tsetup' }, [
        el('div', { class: 'topbar' }, [this.btn('‹ Atrás', () => this.showMenu(), 'small'), el('h2', {}, 'TORNEO')]),
        el('div', { class: 'cards' }, [this.card(p, 'left', 'TU LUCHADOR'), el('div', { class: 'tinfo' }, [
          el('h3', {}, `Cuadro de ${size} luchadores`),
          el('p', {}, `Gana ${Math.log2(size)} combates seguidos para proclamarte campeón. Las primeras rondas se juegan en Matamoros y la final, en Manchester. Si pierdes, quedas eliminado.`),
          el('p', { class: 'dim' }, `Torneos ganados: Fácil ${g.save.tournaments.facil} · Intermedia ${g.save.tournaments.intermedia} · Difícil ${g.save.tournaments.dificil}`),
        ])]),
        this.strip({ [player]: true }, (f) => { player = f.id; render(); }),
        el('div', { class: 'options' }, [
          this.chips(DIFFS, diff, (v) => { diff = v; g.save.settings.difficulty = v; }, 'DIFICULTAD'),
          this.btn('EMPEZAR TORNEO', () => { g.commitSettings(); g.startTournament(player, diff); }, 'primary go'),
        ]),
      ]);
      this.set(n, () => this.showMenu());
    };
    render();
  }

  showBracket(b: Bracket, diff: Difficulty, onPlay: () => void, onQuit: () => void, onRetry?: () => void) {
    const g = this.game;
    const fighter = (id: string) => g.roster.find((r) => r.id === id)!;
    const cols = el('div', { class: 'bracket' });
    const total = Math.log2(b.size);
    for (let r = 0; r < total; r++) {
      const pairs = b.rounds[r];
      const col = el('div', { class: 'bcol' }, [el('div', { class: 'btitle' }, roundName(b, r))]);
      const count = b.size / Math.pow(2, r + 1);
      for (let i = 0; i < count; i++) {
        const p = pairs?.[i];
        const slot = (id: string | undefined, won: boolean, lost: boolean) => {
          const f = id ? fighter(id) : null;
          return el('div', { class: 'bslot' + (id === b.playerId ? ' me' : '') + (won ? ' won' : '') + (lost ? ' lost' : '') + (!f ? ' tbd' : '') }, [f ? this.portrait(f, 'mini') : el('div', { class: 'portrait mini' }), el('span', {}, f ? f.name : 'Por decidir')]);
        };
        col.appendChild(el('div', { class: 'bmatch' + (p && r === b.round && (p.a === b.playerId || p.b === b.playerId) && !b.eliminated && !b.champion ? ' now' : '') }, [
          slot(p?.a, !!p?.winner && p.winner === p.a, !!p?.winner && p.winner !== p.a),
          slot(p?.b, !!p?.winner && p.winner === p.b, !!p?.winner && p.winner !== p.b),
        ]));
      }
      cols.appendChild(col);
    }
    // campeón
    const champ = b.champion ? fighter(b.champion) : null;
    cols.appendChild(el('div', { class: 'bcol champ' }, [el('div', { class: 'btitle' }, 'CAMPEÓN'), el('div', { class: 'bslot' + (champ ? ' won' : ' tbd') + (champ?.id === b.playerId ? ' me' : '') }, [champ ? this.portrait(champ, 'mini') : el('div', { class: 'portrait mini' }, el('div', { class: 'noimg' }, '🏆')), el('span', {}, champ ? champ.name : '???')])]));
    let footer: HTMLElement;
    if (b.champion) {
      Audio.sfx('win');
      footer = el('div', { class: 'bfoot' }, [
        el('div', { class: 'bresult gold' }, b.champion === b.playerId ? '¡ERES EL CAMPEÓN DEL HOYO!' : `${champ!.name} gana el torneo`),
        el('div', { class: 'btns' }, [this.btn('Nuevo torneo', () => this.showTournamentSetup(), 'primary'), this.btn('Menú principal', onQuit)]),
      ]);
    } else if (b.eliminated) {
      footer = el('div', { class: 'bfoot' }, [
        el('div', { class: 'bresult red' }, 'ELIMINADO'),
        el('div', { class: 'btns' }, [onRetry ? this.btn('Reintentar torneo', onRetry, 'primary') : null, this.btn('Menú principal', onQuit)]),
      ]);
    } else {
      const opp = fighter(opponentOf(b));
      const ar = arenaForRound(b, b.round, () => 0.5);
      footer = el('div', { class: 'bfoot' }, [
        el('div', { class: 'bnext' }, [el('b', {}, roundName(b)), ` · ${fighter(b.playerId).name} vs ${opp.name} · ${ar === 'manchester' ? 'Manchester' : 'Matamoros'}${b.round === total - 1 ? '' : ''}`]),
        el('div', { class: 'btns' }, [this.btn('¡AL RING!', onPlay, 'primary go'), this.btn('Abandonar torneo', onQuit)]),
      ]);
    }
    void playerPairing; void diff;
    const n = el('div', { class: 'screen bracketscreen' }, [el('div', { class: 'topbar' }, [el('h2', {}, 'TORNEO · ' + DIFFS.find((d) => d.id === diff)!.name.toUpperCase())]), cols, footer]);
    this.set(n);
    g.showcase?.setFighter(0, null); g.showcase?.setFighter(1, null);
  }

  /** Escena de diálogo previa al combate */
  showDialogue(lines: { who: string; text: string }[], a: FighterData, b: FighterData, done: () => void) {
    const g = this.game;
    const sc = g.showcase;
    sc?.setFighter(0, a); sc?.setFighter(1, b);
    if (sc) sc.mode = 'close';
    let i = 0;
    const speaker = (id: string): FighterData | null => (id === a.id ? a : id === b.id ? b : g.roster.find((r) => r.id === id) ?? null);
    const nameBox = el('div', { class: 'dname' });
    const textBox = el('div', { class: 'dtext' });
    const port = el('div', { class: 'dport' });
    const box = el('div', { class: 'dbox' }, [port, el('div', { class: 'dmain' }, [nameBox, textBox, el('div', { class: 'dnext' }, 'Clic / Espacio para continuar ▸')])]);
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
  showVS(a: FighterData, b: FighterData, arena: ArenaId, diff: Difficulty, done: () => void, spectate = false) {
    const sc = this.game.showcase;
    sc?.setFighter(0, null); sc?.setFighter(1, null);
    const arenaName = arena === 'manchester' ? 'MANCHESTER' : 'MATAMOROS';
    let fired = false;
    const go = () => { if (fired) return; fired = true; window.removeEventListener('keydown', key); clearTimeout(t); done(); };
    const key = (e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') go(); };
    const n = el('div', { class: 'screen vsscreen', onClick: go }, [
      el('div', { class: 'vs-side left' }, [this.portrait(a, 'vsp'), el('div', { class: 'vsname' }, a.name), el('div', { class: 'vstag' }, spectate ? 'CPU 1' : 'TÚ')]),
      el('div', { class: 'vs-mid' }, [el('div', { class: 'vsbig' }, 'VS'), el('div', { class: 'vsarena' }, arenaName), el('div', { class: 'vsdiff' }, DIFFS.find((d) => d.id === diff)!.name.toUpperCase())]),
      el('div', { class: 'vs-side right' }, [this.portrait(b, 'vsp'), el('div', { class: 'vsname' }, b.name), el('div', { class: 'vstag' }, spectate ? 'CPU 2' : 'CPU')]),
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
