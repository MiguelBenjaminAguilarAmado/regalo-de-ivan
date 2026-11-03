import type { Game } from '../game/Game';
import { el, clear } from './dom';
import { ROSTER, fighterById, setStatsOverride } from '../content/roster';
import { CHAPTERS } from '../../content/historia';
import { DISTRICTS, POIS } from '../../content/mundo';
import { ACHIEVEMENTS } from '../progress/Achievements';
import { writeSave } from '../progress/Save';
import { completeChapter, newProgress } from '../modes/Story';
import { addMoney, addXp, migrateWorld, DAY_MIN } from '../modes/World';
import { ARENA_IDS, ARENA_INFO } from '../combat/arenaInfo';
import type { ArenaId, FighterStats } from '../combat/types';

/**
 * ===== MODO DEV =====
 * Panel para trastear con todo: moverte por la ciudad, cambiar la hora y el dinero, saltar capítulos, desbloquear
 * luchadores y trajes, retocar las estadísticas de cualquier luchador, lanzar combates de prueba y editar la partida
 * guardada a mano. Se activa en Ajustes → Modo desarrollador; luego, tecla F2 o el botón DEV.
 */

const STAT_KEYS: [keyof FighterStats, string, number, number, number][] = [
  ['speed', 'Velocidad', 0.5, 1.8, 0.01], ['power', 'Fuerza', 0.5, 2, 0.01], ['health', 'Vida', 40, 250, 1], ['stamina', 'Resistencia', 40, 250, 1],
  ['tempo', 'Rapidez de golpes', 0.6, 1.6, 0.01], ['resist', 'Daño recibido', 0.5, 1.6, 0.01], ['recover', 'Recuperación', 0.4, 2, 0.01], ['escape', 'Zafarse', 0.5, 2, 0.01],
];

export class DevPanel {
  private root = el('div', { class: 'devpanel hidden' });
  private btn = el('button', { class: 'devbtn hidden', title: 'Modo dev (F2)' }, 'DEV');
  private tab = 'mundo';
  private info = el('div', { class: 'devinfo' });
  private infoT = 0;
  /** Atajos de prueba que lee el mundo */
  noclip = false;
  speed = 1;

  constructor(private g: Game, parent: HTMLElement) {
    parent.append(this.root, this.btn);
    this.btn.addEventListener('click', () => this.toggle());
    window.addEventListener('keydown', (e) => { if (e.code === 'F2' && this.enabled) { e.preventDefault(); this.toggle(); } });
    setStatsOverride((f) => {
      const o = this.g.save.dev?.stats?.[f.id];
      return o ? { ...f, fullStats: { ...f.fullStats, ...o } } : f;
    });
    this.sync();
  }

  get enabled() { return !!this.g.save.dev?.on; }
  get open() { return !this.root.classList.contains('hidden'); }
  sync() { this.btn.classList.toggle('hidden', !this.enabled); if (!this.enabled) this.root.classList.add('hidden'); }
  toggle() { if (!this.enabled) return; this.root.classList.toggle('hidden'); if (this.open) this.render(); }

  private save() { writeSave(this.g.save); }
  private toast(t: string) { this.g.toast(t); }
  private dev() { this.g.save.dev = this.g.save.dev ?? { on: true, stats: {} }; this.g.save.dev.stats = this.g.save.dev.stats ?? {}; return this.g.save.dev; }

  /** Datos en vivo (FPS, llamadas de dibujo) */
  update(dt: number) {
    if (!this.open) return;
    this.infoT += dt;
    if (this.infoT < 0.5) return;
    this.infoT = 0;
    const r = this.g.stage.renderer.info;
    const w = this.g.world;
    const pos = w.active && w.view ? ` · x ${w.view.px.toFixed(1)}, z ${w.view.pz.toFixed(1)} · ${w.view.district ?? 'calle'}` : '';
    this.info.textContent = `${Math.round(1 / Math.max(0.001, dt))} fps · ${r.render.calls} llamadas · ${Math.round(r.render.triangles / 1000)}k triángulos${pos}`;
  }

  private render() {
    clear(this.root);
    const tabs: [string, string][] = [['mundo', 'Ciudad'], ['historia', 'Historia'], ['luchadores', 'Luchadores'], ['combate', 'Combate'], ['partida', 'Partida']];
    this.root.append(
      el('div', { class: 'devhead' }, [el('b', {}, 'MODO DEV'), el('button', { class: 'devx', onClick: () => this.toggle() }, '✕')]),
      this.info,
      el('div', { class: 'devtabs' }, tabs.map(([id, n]) => el('button', { class: 'chip' + (this.tab === id ? ' on' : ''), onClick: () => { this.tab = id; this.render(); } }, n))),
      el('div', { class: 'devbody' }, this.body()),
    );
  }

  private row(label: string, ...ctrl: (HTMLElement | string)[]) { return el('div', { class: 'devrow' }, [el('span', {}, label), el('div', { class: 'devctl' }, ctrl)]); }
  private b(label: string, fn: () => void) { return el('button', { class: 'chip', onClick: () => { fn(); } }, label); }

  private body(): HTMLElement[] {
    const g = this.g;
    if (this.tab === 'mundo') {
      const w = g.world;
      if (!w.active || !w.view) return [el('p', {}, 'Entra en Hoyo (HISTORIA · HOYO) para usar estas herramientas.'), this.b('Entrar en Hoyo', () => { g.enterWorld(); this.render(); })];
      const p = w.progress, v = w.view;
      const hour = el('input', { type: 'range', min: '0', max: '23.9', step: '0.1', value: String((p.time % DAY_MIN) / 60), onInput: (e: Event) => { const h = Number((e.target as HTMLInputElement).value); p.time = Math.floor(p.time / DAY_MIN) * DAY_MIN + Math.round(h * 60); } });
      const poiSel = el('select', {}, POIS.map((x) => el('option', { value: x.id }, `${DISTRICTS.find((d) => d.id === x.district)?.name ?? ''} · ${x.name}`)));
      return [
        this.row('Ir a un barrio', ...DISTRICTS.map((d) => this.b(d.name, () => { v.teleport(d.center[0], d.center[1] + 4, Math.PI); }))),
        this.row('Ir a un sitio', poiSel, this.b('Ir', () => { const s = v.layout.spots['poi:' + (poiSel as HTMLSelectElement).value]; if (s) v.teleport(s.x, s.z + 2.5, Math.PI); })),
        this.row('Hora del día', hour),
        this.row('Dinero y nivel', this.b('+1000 Hoyos', () => { addMoney(p, 1000); this.toast('+1000 Hoyos'); }), this.b('+1 nivel', () => { addXp(p, 999999 * 0 + 5000); this.toast('Nivel ' + p.level); }), this.b('+5 puntos', () => { p.points += 5; })),
        this.row('Moverse', this.b(this.noclip ? 'Atravesar paredes: SÍ' : 'Atravesar paredes: NO', () => { this.noclip = !this.noclip; this.render(); }), this.b(`Velocidad ×${this.speed}`, () => { this.speed = this.speed >= 4 ? 1 : this.speed * 2; this.render(); })),
        this.row('Moto', this.b('Traer la moto aquí', () => { v.placeMoto(v.px + 2, v.pz, v.yaw); })),
        this.row('Misiones', this.b('Completar todas las misiones', () => { for (const k of Object.keys(p.quests)) p.quests[k].done = true; this.toast('Misiones marcadas como completadas'); }), this.b('Recoger todas las pegatinas', () => { import('../../content/mundo').then((m) => { p.collected = m.STICKERS.map((s) => s.id); this.toast('Pegatinas recogidas'); }); })),
        this.row('Partida de la ciudad', this.b('Guardar ahora', () => { w.persist(); this.toast('Guardado'); }), this.b('Reiniciar la ciudad', () => { if (confirm('¿Reiniciar el progreso de la ciudad?')) { g.save.world = migrateWorld(null); w.leave(false); g.enterWorld(); } })),
      ];
    }
    if (this.tab === 'historia') {
      const st = g.save.story ?? newProgress();
      const flag = el('input', { type: 'text', placeholder: 'bandera=valor (ej. bando=elso)' }) as HTMLInputElement;
      return [
        el('p', { class: 'dim' }, `Capítulos completados: ${st.done.length}/${CHAPTERS.length} · Banderas: ${JSON.stringify(st.flags)}`),
        ...CHAPTERS.map((c, i) => this.row(`${i + 1}. ${c.title}${st.done.includes(c.id) ? ' ✔' : ''}`,
          this.b('Completar hasta aquí', () => { let p = newProgress(st.endings); for (const ch of CHAPTERS.slice(0, i + 1)) p = completeChapter(p, ch); g.save.story = p; this.save(); this.toast('Historia hasta: ' + c.title); this.render(); }),
          this.b('Jugar en la ciudad', () => { const p = newProgress(st.endings); let q = p; for (const ch of CHAPTERS.slice(0, i)) q = completeChapter(q, ch); g.save.story = q; this.save(); if (g.world.active) g.world.leave(true); g.enterWorld({ chapter: c.id }); }))),
        this.row('Bandera', flag, this.b('Poner', () => { const [k, val] = flag.value.split('='); if (!k) return; const s2 = g.save.story ?? newProgress(); s2.flags[k.trim()] = val === undefined ? true : val === 'true' ? true : val === 'false' ? false : isNaN(Number(val)) ? val.trim() : Number(val); g.save.story = s2; this.save(); this.render(); })),
        this.row('Reiniciar', this.b('Historia desde cero', () => { g.save.story = newProgress(st.endings); if (g.save.world) g.save.world.flags.world_intro = false; this.save(); this.toast('Historia reiniciada (verás el prólogo otra vez)'); this.render(); })),
      ];
    }
    if (this.tab === 'luchadores') {
      const sel = el('select', {}, ROSTER.map((f) => el('option', { value: f.id }, f.name))) as HTMLSelectElement;
      sel.value = this.selFighter;
      sel.addEventListener('change', () => { this.selFighter = sel.value; this.render(); });
      const base = ROSTER.find((f) => f.id === this.selFighter) ?? ROSTER[0];
      const ov = this.dev().stats![base.id] ?? {};
      const sliders = STAT_KEYS.map(([k, n, min, max, step]) => {
        const val = el('em', {}, String((ov as any)[k] ?? (base.fullStats as any)[k]));
        const inp = el('input', { type: 'range', min: String(min), max: String(max), step: String(step), value: String((ov as any)[k] ?? (base.fullStats as any)[k]), onInput: (e: Event) => { const x = Number((e.target as HTMLInputElement).value); this.dev().stats![base.id] = { ...(this.dev().stats![base.id] ?? {}), [k]: x }; val.textContent = String(x); this.save(); } });
        return this.row(n, inp, val);
      });
      return [
        this.row('Luchador', sel),
        el('p', { class: 'dim' }, 'Los cambios se aplican en el siguiente combate (en todos los modos) y se guardan.'),
        ...sliders,
        this.row('', this.b('Volver a los valores originales', () => { delete this.dev().stats![base.id]; this.save(); this.render(); })),
        this.row('Desbloqueos', this.b('Todos los logros (luchadores y trajes)', () => { for (const a of ACHIEVEMENTS) if (!g.save.achievements[a.id]) g.save.achievements[a.id] = Date.now(); g.save.wins = Math.max(g.save.wins, 10); this.save(); this.toast('¡Todo desbloqueado!'); })),
      ];
    }
    if (this.tab === 'combate') {
      const opts = ROSTER.map((f) => el('option', { value: f.id }, f.name));
      const a = el('select', {}, opts.map((o) => o.cloneNode(true) as HTMLElement)) as HTMLSelectElement;
      const c = el('select', {}, opts.map((o) => o.cloneNode(true) as HTMLElement)) as HTMLSelectElement;
      const ar = el('select', {}, ARENA_IDS.map((id) => el('option', { value: id }, ARENA_INFO[id].name))) as HTMLSelectElement;
      const df = el('select', {}, [['facil', 'Fácil'], ['intermedia', 'Intermedia'], ['dificil', 'Difícil']].map(([v, n]) => el('option', { value: v }, n))) as HTMLSelectElement;
      a.value = 'chema'; c.value = 'elso'; ar.value = 'callejon'; df.value = 'intermedia';
      const go = (spectate: boolean) => {
        if (g.world.active) g.world.leave(true);
        this.toggle();
        const s = { a: a.value, b: c.value, arena: ar.value as ArenaId, difficulty: df.value as 'intermedia' };
        if (spectate) g.startSpectate({ a: s.a, b: s.b, arena: s.arena, difficulty: s.difficulty } as any);
        else g.startVersus({ player: s.a, cpu: s.b, arena: s.arena, difficulty: s.difficulty } as any);
      };
      return [this.row('Tú', a), this.row('Rival', c), this.row('Escenario', ar), this.row('Dificultad', df), this.row('', this.b('¡Pelear!', () => go(false)), this.b('Mirar (CPU vs CPU)', () => go(true)))];
    }
    // partida: editor JSON
    const ta = el('textarea', { class: 'devjson', spellcheck: 'false' }) as HTMLTextAreaElement;
    ta.value = JSON.stringify(g.save, null, 1);
    return [
      el('p', { class: 'dim' }, 'Partida guardada completa. Puedes editarla a mano y aplicarla (se recarga el juego).'),
      ta,
      this.row('', this.b('Aplicar cambios', () => { try { const d = JSON.parse(ta.value); localStorage.setItem('el-hoyo-wrestling-v1', JSON.stringify(d)); location.reload(); } catch (e) { alert('JSON no válido: ' + (e as Error).message); } }),
        this.b('Copiar', () => { void navigator.clipboard?.writeText(ta.value); this.toast('Copiado'); }),
        this.b('Descargar', () => { const blob = new Blob([ta.value], { type: 'application/json' }); const u = URL.createObjectURL(blob); const x = document.createElement('a'); x.href = u; x.download = 'el-hoyo-partida.json'; x.click(); URL.revokeObjectURL(u); })),
      this.row('', this.b('Salir del modo dev', () => { this.dev().on = false; this.save(); this.sync(); })),
    ];
  }
  private selFighter = 'chema';
}

void fighterById;
