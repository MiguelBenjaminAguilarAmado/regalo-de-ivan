import { el, clear } from './dom';
import { kbd } from '../input/glyphs';

export interface HudInfo {
  level: number; xp: number; xpNeed: number; money: number; points: number;
  clock: string; day: number; night: boolean; district: string;
  quest: { title: string; step: string } | null;
}

export interface MapMarker { x: number; z: number; kind: 'story' | 'quest' | 'poi' | 'npc' | 'moto'; label?: string }
export interface MapData {
  worldSize: number;
  districts: { id: string; name: string; cx: number; cz: number; w: number; d: number; open: boolean; color: string }[];
  player: { x: number; z: number; yaw: number };
  markers: MapMarker[];
  roads?: { x1: number; z1: number; x2: number; z2: number; w: number; kind?: string }[];
}

export interface Objective { title: string; text: string; angle: number | null; dist: number }

/** HUD y ventanas del mundo abierto (DOM). La lógica vive en WorldController. */
export class WorldUI {
  root: HTMLElement;
  private promptEl = el('div', { class: 'wprompt hidden' });
  private toasts = el('div', { class: 'wtoasts' });
  private banner = el('div', { class: 'wbanner' });
  private modalHost = el('div', { class: 'wmodalhost' });
  private hudTop = el('div', { class: 'whud-top' });
  private quest = el('div', { class: 'wquest hidden' });
  private clock = el('div', { class: 'wclock' });
  private mini = document.createElement('canvas');
  private miniWrap = el('div', { class: 'wmini-map' });
  private lastMini = 0;
  private objective = el('div', { class: 'wobj hidden' });
  private card = el('div', { class: 'wcard' });
  private btnBar = el('div', { class: 'wbtns' });
  private actBtn = el('button', { class: 'wact' }, [el('b', {}, 'HABLAR'), el('small', {}, 'usar')]);
  /** Botones del HUD (mapa, misiones, bolsa, pausa y acción en móvil) */
  handlers: { map?: () => void; quests?: () => void; bag?: () => void; pause?: () => void; act?: () => void } = {};
  modalOpen = false;
  private onModalClose: (() => void) | null = null;

  constructor(parent: HTMLElement) {
    this.mini.width = 168; this.mini.height = 168;
    this.miniWrap.appendChild(this.mini);
    const hb = (icon: string, label: string, fn: () => (() => void) | undefined, keys: [string, string]) => {
      const b = el('button', { class: 'wbtn', 'aria-label': label }, [el('span', {}, icon), el('small', {}, label), el('i', { class: 'wkey' }, [kbd(keys[0], keys[1])])]);
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); fn()?.(); });
      return b;
    };
    this.btnBar.append(hb('🗺', 'MAPA', () => this.handlers.map, ['M', 'Y']), hb('★', 'MISIONES', () => this.handlers.quests, ['Q', 'SEL']), hb('🎒', 'BOLSA', () => this.handlers.bag, ['I', 'X']), hb('❚❚', 'PAUSA', () => this.handlers.pause, ['Esc', 'START']));
    this.actBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); this.handlers.act?.(); });
    this.miniWrap.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); this.handlers.map?.(); });
    this.root = el('div', { class: 'world-ui hidden' }, [this.hudTop, this.clock, this.objective, this.quest, this.miniWrap, this.btnBar, this.actBtn, this.promptEl, this.toasts, this.banner, this.card, this.modalHost]);
    parent.appendChild(this.root);
  }

  show() { this.root.classList.remove('hidden'); }
  hide() { this.root.classList.add('hidden'); this.closeModal(); clear(this.toasts); }

  /** Modo cine (escenas en la calle): se esconde el HUD */
  setCinema(on: boolean) { this.root.classList.toggle('cine', on); }

  /** Objetivo de la historia con flecha hacia la estrella dorada */
  setObjective(o: Objective | null) {
    if (!o) { this.objective.classList.add('hidden'); return; }
    this.objective.classList.remove('hidden');
    const key = o.title + '|' + o.text;
    if (this.objective.dataset.k !== key) {
      this.objective.dataset.k = key; clear(this.objective);
      this.objective.append(el('i', { class: 'warrow' }, '➤'), el('div', {}, [el('b', {}, o.title), el('span', {}, o.text)]), el('em', { class: 'wdist' }, ''));
    }
    const arrow = this.objective.querySelector<HTMLElement>('.warrow')!, dist = this.objective.querySelector<HTMLElement>('.wdist')!;
    arrow.style.display = o.angle == null ? 'none' : '';
    if (o.angle != null) arrow.style.transform = `rotate(${(o.angle - Math.PI / 2).toFixed(3)}rad)`;
    dist.textContent = o.angle == null ? '' : o.dist < 4 ? '¡AQUÍ!' : `${Math.round(o.dist)} m`;
  }

  /** Cartel grande en el centro (capítulo nuevo, capítulo completado) */
  chapterCard(kicker: string, title: string, sub: string) {
    clear(this.card);
    this.card.className = 'wcard';
    this.card.append(el('small', {}, kicker), el('h2', {}, title), el('p', {}, sub));
    void this.card.offsetWidth;
    this.card.className = 'wcard show';
  }

  setPrompt(text: string | null) {
    this.actBtn.classList.toggle('can', !!text);
    if (!text) { this.promptEl.classList.add('hidden'); return; }
    if (this.promptEl.dataset.t !== text) { this.promptEl.dataset.t = text; clear(this.promptEl); this.promptEl.appendChild(kbd('E', 'A')); this.promptEl.appendChild(document.createTextNode(' ' + text)); }
    this.promptEl.classList.remove('hidden');
  }

  toast(text: string, kind: 'info' | 'good' | 'bad' | 'gold' = 'info') {
    const t = el('div', { class: 'wtoast ' + kind }, text);
    this.toasts.appendChild(t);
    while (this.toasts.children.length > 5) this.toasts.firstChild?.remove();
    setTimeout(() => t.classList.add('out'), 3600);
    setTimeout(() => t.remove(), 4200);
  }

  districtBanner(name: string, blurb: string) {
    this.banner.className = 'wbanner';
    clear(this.banner);
    this.banner.appendChild(el('h2', {}, name)); this.banner.appendChild(el('p', {}, blurb));
    void this.banner.offsetWidth;
    this.banner.className = 'wbanner show';
  }

  updateHud(h: HudInfo) {
    const pct = Math.min(100, Math.round((h.xp / h.xpNeed) * 100));
    clear(this.hudTop);
    this.hudTop.appendChild(el('div', { class: 'wlevel' }, [el('b', {}, 'NIV ' + h.level), el('div', { class: 'wxp' }, [el('i', { style: `width:${pct}%` })]), h.points ? el('span', { class: 'wpoints' }, `+${h.points} pt`) : null]));
    this.hudTop.appendChild(el('div', { class: 'wmoney' }, [el('span', {}, '💰'), el('b', {}, String(h.money)), el('small', {}, 'Hoyos')]));
    this.clock.textContent = `${h.night ? '🌙' : '☀'} ${h.clock} · Día ${h.day}`;
    if (h.quest) { clear(this.quest); this.quest.classList.remove('hidden'); this.quest.appendChild(el('b', {}, h.quest.title)); this.quest.appendChild(el('span', {}, h.quest.step)); } else this.quest.classList.add('hidden');
  }

  /** Dibuja el minimapa (como mucho cada 120 ms) */
  drawMini(m: MapData, force = false) {
    const now = performance.now();
    if (!force && now - this.lastMini < 120) return;
    this.lastMini = now;
    this.paintMap(this.mini, m, 168, 38);
  }

  /** Dibuja un mapa en un canvas; `range` > 0 = minimapa centrado en el jugador (metros visibles a cada lado) */
  paintMap(cv: HTMLCanvasElement, m: MapData, size: number, range: number) { paintMap(cv, m, size, range); }

  // ---------------------------------------------------------------- ventanas
  /** Abre una ventana modal; devuelve cerrar() */
  modal(title: string, body: (HTMLElement | null)[], opts: { onClose?: () => void; wide?: boolean; hideClose?: boolean; side?: boolean } = {}): () => void {
    this.closeModal();
    this.modalOpen = true; this.onModalClose = opts.onClose ?? null;
    const panel = el('div', { class: 'wpanel' + (opts.wide ? ' wide' : '') }, [
      el('div', { class: 'wtitle' }, [el('h2', {}, title), opts.hideClose ? null : el('button', { class: 'btn small', onClick: () => this.closeModal() }, [el('span', {}, 'Cerrar '), kbd('Esc', 'B')])]),
      ...body,
    ]);
    const host = el('div', { class: 'wmodal' + (opts.side ? ' side' : '') }, [panel]);
    host.addEventListener('pointerdown', (e) => e.stopPropagation());
    this.modalHost.appendChild(host);
    const focus = panel.querySelector<HTMLElement>('button[data-nav], .btn.go');
    focus?.focus({ preventScroll: true });
    return () => this.closeModal();
  }

  /** Mando dentro de las ventanas: cruceta/stick para moverse, A aceptar, B cerrar */
  pad(a: string): boolean {
    if (!this.modalOpen) return false;
    const panel = this.modalHost.querySelector<HTMLElement>('.wpanel');
    if (!panel) return false;
    const items = [...panel.querySelectorAll<HTMLElement>('button:not(.disabled):not([disabled])')].filter((b) => b.offsetParent !== null);
    const active = document.activeElement as HTMLElement;
    if (a === 'back') { this.closeModal(); return true; }
    if (a === 'confirm') { if (items.includes(active)) active.click(); else items[0]?.focus(); return true; }
    const v = ({ up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] } as Record<string, number[]>)[a];
    if (!v) return false;
    if (!items.includes(active)) { (items.find((b) => !b.closest('.wtitle')) ?? items[0])?.focus(); return true; }
    const r0 = active.getBoundingClientRect();
    let best: HTMLElement | null = null, bd = Infinity;
    for (const it of items) {
      if (it === active) continue;
      const r = it.getBoundingClientRect();
      const dx = r.left + r.width / 2 - (r0.left + r0.width / 2), dy = r.top + r.height / 2 - (r0.top + r0.height / 2);
      const along = dx * v[0] + dy * v[1];
      if (along <= 4) continue;
      const d = along + (Math.abs(dx * v[1]) + Math.abs(dy * v[0])) * 2.2;
      if (d < bd) { bd = d; best = it; }
    }
    if (best) { best.focus(); best.scrollIntoView({ block: 'nearest' }); }
    return true;
  }

  closeModal() {
    if (!this.modalOpen) return;
    this.modalOpen = false;
    clear(this.modalHost);
    const cb = this.onModalClose; this.onModalClose = null;
    cb?.();
  }

  /** Animación de dormir: el reloj corre de `from` a `to` (minutos del día) con la luna/sol girando */
  sleepAnim(from: number, minutes: number): Promise<void> {
    return new Promise((done) => {
      const clock = el('b', {}, ''), icon = el('i', { class: 'wsleep-icon' }, '🌙');
      const zz = el('div', { class: 'wsleep-z' }, [el('span', {}, 'Z'), el('span', {}, 'z'), el('span', {}, 'z')]);
      const ov = el('div', { class: 'wsleep' }, [icon, el('div', { class: 'wsleep-c' }, [el('small', {}, 'DURMIENDO'), clock]), zz]);
      this.root.appendChild(ov);
      const T = 2400, t0 = performance.now();
      const fmt = (m: number) => { const x = ((Math.floor(m) % 1440) + 1440) % 1440; return `${String(Math.floor(x / 60)).padStart(2, '0')}:${String(x % 60).padStart(2, '0')}`; };
      const tick = () => {
        const k = Math.min(1, (performance.now() - t0) / T), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const m = from + minutes * e;
        clock.textContent = fmt(m);
        const h = (m % 1440) / 60;
        icon.textContent = h >= 7 && h < 20 ? '☀' : '🌙';
        icon.style.transform = `rotate(${e * 360 * Math.max(1, minutes / 600)}deg)`;
        if (k < 1) requestAnimationFrame(tick); else { ov.classList.add('out'); setTimeout(() => { ov.remove(); done(); }, 420); }
      };
      tick();
    });
  }

  /** Contenedor para los minijuegos */
  get host() { return this.modalHost; }
}

/** Dibuja un mapa en un canvas; `range` > 0 = minimapa centrado en el jugador (metros visibles a cada lado) */
export function paintMap(cv: HTMLCanvasElement, m: MapData, size: number, range: number) {
  const g = cv.getContext('2d')!;
  g.clearRect(0, 0, size, size);
  g.fillStyle = 'rgba(10,8,8,0.78)'; g.fillRect(0, 0, size, size);
  const full = range <= 0;
  const sc = full ? size / (m.worldSize * 2) : size / (range * 2);
  const ox = full ? size / 2 : size / 2 - m.player.x * sc, oz = full ? size / 2 : size / 2 - m.player.z * sc;
  const X = (x: number) => ox + x * sc, Z = (z: number) => oz + z * sc;
  g.save(); g.beginPath(); g.rect(0, 0, size, size); g.clip();
  for (const d of m.districts) {
    g.fillStyle = d.open ? d.color : '#3a3a3a'; g.globalAlpha = d.open ? 0.75 : 0.5;
    g.fillRect(X(d.cx - d.w / 2), Z(d.cz - d.d / 2), d.w * sc, d.d * sc);
    g.globalAlpha = 1; g.strokeStyle = d.open ? '#fff3' : '#c1272d88'; g.lineWidth = 1; g.strokeRect(X(d.cx - d.w / 2), Z(d.cz - d.d / 2), d.w * sc, d.d * sc);
    if (full) { g.fillStyle = '#fff'; g.font = '700 12px sans-serif'; g.textAlign = 'center'; g.fillText(d.open ? d.name : '🔒 ' + d.name, X(d.cx), Z(d.cz - d.d / 2) + 14); }
  }
  if (m.roads) {
    g.lineCap = 'butt';
    for (const r of m.roads) {
      g.strokeStyle = r.kind === 'avenue' ? '#e8d27a' : r.kind === 'alley' ? 'rgba(30,28,26,0.9)' : 'rgba(34,34,40,0.95)';
      g.lineWidth = Math.max(r.kind === 'alley' ? 1 : 1.5, r.w * sc);
      g.beginPath(); g.moveTo(X(r.x1), Z(r.z1)); g.lineTo(X(r.x2), Z(r.z2)); g.stroke();
    }
    g.fillStyle = '#b9ab92'; g.beginPath(); g.arc(X(0), Z(0), 22 * sc, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#4f8a3a'; g.beginPath(); g.arc(X(0), Z(0), 13 * sc, 0, Math.PI * 2); g.fill();
  }
  for (const k of m.markers) {
    const x = X(k.x), z = Z(k.z);
    g.fillStyle = k.kind === 'story' ? '#ffd45e' : k.kind === 'quest' ? '#6ad8ff' : k.kind === 'npc' ? '#ff8a6a' : k.kind === 'moto' ? '#d36aff' : '#cfcfcf';
    g.beginPath(); g.arc(x, z, k.kind === 'story' ? 4.5 : k.kind === 'poi' ? 2.2 : 3, 0, Math.PI * 2); g.fill();
    if (k.kind === 'story') { g.strokeStyle = '#000'; g.lineWidth = 1.5; g.stroke(); }
    if (full && k.label && (k.kind === 'story' || k.kind === 'quest' || k.kind === 'npc' || k.kind === 'moto')) { g.fillStyle = '#fff'; g.font = '600 11px sans-serif'; g.textAlign = 'left'; g.fillText(k.label, x + 6, z + 3); }
  }
  // jugador
  g.translate(X(m.player.x), Z(m.player.z)); g.rotate(-m.player.yaw + Math.PI);
  g.fillStyle = '#4aa8ff'; g.beginPath(); g.moveTo(0, -7); g.lineTo(5, 6); g.lineTo(-5, 6); g.closePath(); g.fill();
  g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.stroke();
  g.restore();
}
