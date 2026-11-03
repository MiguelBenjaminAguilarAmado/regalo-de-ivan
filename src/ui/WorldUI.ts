import { el, clear } from './dom';

export interface HudInfo {
  level: number; xp: number; xpNeed: number; money: number; points: number;
  clock: string; day: number; night: boolean; district: string;
  quest: { title: string; step: string } | null;
}

export interface MapMarker { x: number; z: number; kind: 'story' | 'quest' | 'poi' | 'npc'; label?: string }
export interface MapData {
  worldSize: number;
  districts: { id: string; name: string; cx: number; cz: number; w: number; d: number; open: boolean; color: string }[];
  player: { x: number; z: number; yaw: number };
  markers: MapMarker[];
}

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
  modalOpen = false;
  private onModalClose: (() => void) | null = null;

  constructor(parent: HTMLElement) {
    this.mini.width = 168; this.mini.height = 168;
    this.miniWrap.appendChild(this.mini);
    this.root = el('div', { class: 'world-ui hidden' }, [this.hudTop, this.clock, this.quest, this.miniWrap, this.promptEl, this.toasts, this.banner, this.modalHost]);
    parent.appendChild(this.root);
  }

  show() { this.root.classList.remove('hidden'); }
  hide() { this.root.classList.add('hidden'); this.closeModal(); clear(this.toasts); }

  setPrompt(text: string | null) {
    if (!text) { this.promptEl.classList.add('hidden'); return; }
    if (this.promptEl.dataset.t !== text) { this.promptEl.dataset.t = text; clear(this.promptEl); this.promptEl.appendChild(el('b', {}, 'E')); this.promptEl.appendChild(document.createTextNode(' ' + text)); }
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
  paintMap(cv: HTMLCanvasElement, m: MapData, size: number, range: number) {
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
    for (const k of m.markers) {
      const x = X(k.x), z = Z(k.z);
      g.fillStyle = k.kind === 'story' ? '#ffd45e' : k.kind === 'quest' ? '#6ad8ff' : k.kind === 'npc' ? '#ff8a6a' : '#cfcfcf';
      g.beginPath(); g.arc(x, z, k.kind === 'story' ? 4.5 : k.kind === 'poi' ? 2.2 : 3, 0, Math.PI * 2); g.fill();
      if (full && k.label && (k.kind === 'story' || k.kind === 'quest')) { g.fillStyle = '#fff'; g.font = '600 11px sans-serif'; g.textAlign = 'left'; g.fillText(k.label, x + 6, z + 3); }
    }
    // jugador
    g.translate(X(m.player.x), Z(m.player.z)); g.rotate(-m.player.yaw + Math.PI);
    g.fillStyle = '#4aa8ff'; g.beginPath(); g.moveTo(0, -7); g.lineTo(5, 6); g.lineTo(-5, 6); g.closePath(); g.fill();
    g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.stroke();
    g.restore();
  }

  // ---------------------------------------------------------------- ventanas
  /** Abre una ventana modal; devuelve cerrar() */
  modal(title: string, body: (HTMLElement | null)[], opts: { onClose?: () => void; wide?: boolean; hideClose?: boolean } = {}): () => void {
    this.closeModal();
    this.modalOpen = true; this.onModalClose = opts.onClose ?? null;
    const panel = el('div', { class: 'wpanel' + (opts.wide ? ' wide' : '') }, [
      el('div', { class: 'wtitle' }, [el('h2', {}, title), opts.hideClose ? null : el('button', { class: 'btn small', onClick: () => this.closeModal() }, [el('span', {}, 'Cerrar (Esc)')])]),
      ...body,
    ]);
    const host = el('div', { class: 'wmodal' }, [panel]);
    host.addEventListener('pointerdown', (e) => e.stopPropagation());
    this.modalHost.appendChild(host);
    const focus = panel.querySelector<HTMLElement>('button[data-nav], .btn.go');
    focus?.focus({ preventScroll: true });
    return () => this.closeModal();
  }

  closeModal() {
    if (!this.modalOpen) return;
    this.modalOpen = false;
    clear(this.modalHost);
    const cb = this.onModalClose; this.onModalClose = null;
    cb?.();
  }

  /** Contenedor para los minijuegos */
  get host() { return this.modalHost; }
}
