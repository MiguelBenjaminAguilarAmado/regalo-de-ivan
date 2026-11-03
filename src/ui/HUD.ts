import type { Match, Fighter } from '../combat/Match';
import { el } from './dom';

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

interface Side { combo: HTMLElement; root: HTMLElement; hp: HTMLElement; hpGhost: HTMLElement; st: HTMLElement; mom: HTMLElement; name: HTMLElement; ready: HTMLElement; sub: HTMLElement }

export class HUD {
  root: HTMLElement;
  private sides: Side[] = [];
  private timer: HTMLElement;
  private msgs: HTMLElement;
  private bannerEl: HTMLElement;
  private countEl: HTMLElement;
  private countLabel: HTMLElement;
  private mashEl: HTMLElement;
  private mashBar: HTMLElement;
  private mashText: HTMLElement;
  private flashEl: HTMLElement;
  private outEl: HTMLElement;
  private hint: HTMLElement;
  private clinchEl: HTMLElement;
  private subsEl: HTMLElement;
  private fpsEl: HTMLElement;
  pauseBtn: HTMLButtonElement;
  private ghost = [100, 100];
  private hintT = 14;
  private fps = 60;

  constructor(parent: HTMLElement) {
    const mkSide = (i: number): Side => {
      const hp = el('i'), hpGhost = el('i', { class: 'ghost' }), st = el('i'), mom = el('i');
      const name = el('div', { class: 'pname' });
      const ready = el('div', { class: 'ready' }, 'FINISHER');
      const sub = el('div', { class: 'psub' });
      const combo = el('div', { class: 'combo' });
      const root = el('div', { class: `pside ${i === 0 ? 'left' : 'right'}` }, [
        el('div', { class: 'pplate' }, [name, sub]),
        combo,
        el('div', { class: 'bar hp' }, [hpGhost, hp]),
        el('div', { class: 'bar st' }, [st]),
        el('div', { class: 'bar mom' }, [mom, ready]),
      ]);
      return { combo, root, hp, hpGhost, st, mom, name, ready, sub };
    };
    this.sides = [mkSide(0), mkSide(1)];
    this.timer = el('div', { class: 'timer' }, '0:00');
    this.msgs = el('div', { class: 'msgs' });
    this.bannerEl = el('div', { class: 'banner' });
    this.countLabel = el('div', { class: 'count-label' });
    this.countEl = el('div', { class: 'count' }, [this.countLabel]);
    this.mashBar = el('i');
    this.mashText = el('div', { class: 'mash-text' });
    this.mashEl = el('div', { class: 'mash' }, [this.mashText, el('div', { class: 'mash-bar' }, [this.mashBar])]);
    this.flashEl = el('div', { class: 'flash' });
    this.outEl = el('div', { class: 'outcount' });
    this.clinchEl = el('div', { class: 'clinch' });
    this.hint = el('div', { class: 'hint' });
    this.subsEl = el('div', { class: 'subs' });
    this.fpsEl = el('div', { class: 'fps' });
    this.pauseBtn = el('button', { class: 'pause', title: 'Pausa (Esc)' }, 'II') as HTMLButtonElement;
    this.root = el('div', { class: 'hud hidden' }, [
      el('div', { class: 'hud-top' }, [this.sides[0].root, el('div', { class: 'hud-center' }, [el('div', { class: 'tline' }, [this.timer, this.pauseBtn]), this.outEl]), this.sides[1].root]),
      this.msgs, this.bannerEl, this.countEl, this.mashEl, this.clinchEl, this.flashEl, this.hint, this.subsEl, this.fpsEl,
    ]);
    parent.appendChild(this.root);
  }

  show(match: Match, playerIdx: number, hintText: string, showFps: boolean) {
    this.root.classList.remove('hidden');
    this.sides.forEach((s, i) => {
      s.name.textContent = match.f[i].data.name;
      s.root.classList.toggle('player', i === playerIdx);
      s.sub.dataset.base = playerIdx < 0 ? 'CPU ' + (i + 1) : i === playerIdx ? 'TÚ' : 'CPU';
      s.sub.textContent = s.sub.dataset.base;
    });
    this.ghost = [100, 100];
    this.hint.innerHTML = hintText;
    this.hintT = 14;
    this.hint.classList.remove('gone');
    this.fpsEl.style.display = showFps ? 'block' : 'none';
    this.msgs.innerHTML = '';
    this.subtitle('', '');
    this.bannerEl.className = 'banner';
    this.countEl.className = 'count';
  }
  hide() { this.root.classList.add('hidden'); }

  message(text: string, big = false) {
    const m = el('div', { class: 'msg' + (big ? ' big' : '') }, text);
    this.msgs.appendChild(m);
    while (this.msgs.children.length > 3) this.msgs.firstChild?.remove();
    setTimeout(() => m.classList.add('out'), big ? 1900 : 1500);
    setTimeout(() => m.remove(), big ? 2300 : 1900);
  }

  banner(text: string, color: string) {
    this.bannerEl.textContent = text;
    this.bannerEl.style.setProperty('--len', String(Math.max(6, text.length)));
    this.bannerEl.style.setProperty('--c', color);
    this.bannerEl.className = 'banner';
    void this.bannerEl.offsetWidth;
    this.bannerEl.className = 'banner show';
  }

  flash(color: string, amount: number) {
    this.flashEl.style.background = color;
    this.flashEl.style.opacity = String(amount);
    requestAnimationFrame(() => { this.flashEl.style.transition = 'opacity .5s'; this.flashEl.style.opacity = '0'; setTimeout(() => (this.flashEl.style.transition = ''), 520); });
  }

  /** Contador de golpes seguidos ("5 HITS") junto a la barra del que los da */
  combo(i: number, n: number) {
    const c = this.sides[i].combo;
    c.textContent = n >= 5 ? `${n} GOLPES · ¡COMBO!` : `${n} GOLPES`;
    c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
    window.clearTimeout(this.comboT[i]);
    this.comboT[i] = window.setTimeout(() => c.classList.remove('pop'), 1500);
  }
  private comboT = [0, 0];

  bigCount(text: string, label = '') {
    this.countEl.firstChild && (this.countEl.firstChild as HTMLElement).remove?.();
    this.countEl.textContent = text;
    this.countLabel.textContent = label;
    this.countEl.appendChild(this.countLabel);
    this.countEl.className = 'count';
    void this.countEl.offsetWidth;
    this.countEl.className = 'count show';
  }

  /** Subtítulo del narrador (modo espectador). Texto vacío = ocultar. */
  subtitle(who: string, text: string) {
    if (!text) { this.subsEl.classList.remove('show'); return; }
    this.subsEl.innerHTML = '';
    this.subsEl.appendChild(el('b', { class: who === 'NARRADOR' ? 'n0' : 'n1' }, who));
    this.subsEl.appendChild(document.createTextNode(' ' + text));
    this.subsEl.classList.add('show');
  }

  clearCount() { this.countEl.className = 'count'; }

  update(dt: number, match: Match, playerIdx: number, realDt: number) {
    this.fps += (Math.min(120, 1 / Math.max(0.001, realDt)) - this.fps) * 0.05;
    if (this.fpsEl.style.display !== 'none') this.fpsEl.textContent = Math.round(this.fps) + ' fps';
    // con límite de tiempo, cuenta atrás (en rojo el último tramo)
    if (match.timeLimit != null) {
      const left = Math.max(0, match.timeLimit - match.time);
      this.timer.textContent = fmt(Math.ceil(left));
      this.timer.classList.toggle('low', left < 10);
    } else this.timer.textContent = fmt(match.time);
    this.sides.forEach((s, i) => {
      const f = match.f[i];
      if (s.name.textContent !== f.data.name) s.name.textContent = f.data.name;
      const bn = match.bench[i];
      const subText = (s.sub.dataset.base ?? '') + (bn ? ` · RELEVO: ${bn.data.name} ${Math.round((bn.hp / bn.maxHp) * 100)}%` : '');
      if (s.sub.textContent !== subText) s.sub.textContent = subText;
      const pct = Math.max(0, (f.hp / f.maxHp) * 100);
      this.ghost[i] += (pct - this.ghost[i]) * Math.min(1, dt * 2.2);
      if (this.ghost[i] < pct) this.ghost[i] = pct;
      s.hp.style.width = pct + '%';
      s.hpGhost.style.width = this.ghost[i] + '%';
      s.root.classList.toggle('low', pct < 25);
      s.st.style.width = Math.max(0, (f.st / f.maxSt) * 100) + '%';
      s.root.classList.toggle('exhausted', f.exhausted);
      s.mom.style.width = Math.min(100, f.mom) + '%';
      s.root.classList.toggle('full', f.mom >= 100);
    });
    // fuera del ring
    const outs = match.f.filter((f) => f.outT >= 3 && !match.over);
    if (outs.length) {
      const f = outs[0];
      this.outEl.textContent = `${f.data.name} fuera del ring · ${Math.max(0, 10 - Math.floor(f.outT))}`;
      this.outEl.classList.add('show');
    } else this.outEl.classList.remove('show');

    // cuenta de pin / KO
    const pinned = match.f.find((f) => f.state === 'pinD');
    if (pinned) {
      if (pinned.pinCount > 0 && this.countEl.dataset.k !== 'p' + pinned.pinCount) { this.countEl.dataset.k = 'p' + pinned.pinCount; this.bigCount(String(pinned.pinCount), 'PIN'); }
    } else if (match.ko && !match.over) {
      if (match.ko.n > 0 && this.countEl.dataset.k !== 'k' + match.ko.n) { this.countEl.dataset.k = 'k' + match.ko.n; this.bigCount(String(match.ko.n), 'CUENTA KO'); }
    } else if (this.countEl.dataset.k) { this.countEl.dataset.k = ''; this.clearCount(); }

    // machacar
    const me = match.f[playerIdx], op = match.f[1 - playerIdx];
    if (!me) { this.mashEl.classList.remove('show'); this.clinchEl.classList.remove('show'); if (this.hintT > 0) { this.hintT -= realDt; if (this.hintT <= 0) this.hint.classList.add('gone'); } return; }
    let mash = '', prog = -1, danger = false;
    if (me.state === 'pinD') { mash = '¡MACHACA para zafarte del pin!'; prog = me.escape; }
    else if (me.state === 'subD') { mash = '¡MACHACA para escapar de la llave!'; prog = 1 - me.subMeter; danger = me.subMeter > 0.7; }
    else if (me.state === 'down' && !me.koed) { mash = '¡MACHACA para levantarte!'; prog = me.t / Math.max(0.01, me.dur); }
    else if (me.state === 'subA') { mash = 'Machaca golpe para apretar la llave · GUARDIA para soltar'; prog = op.subMeter; }
    else if (me.state === 'pinA') { mash = 'Pin en marcha · GUARDIA para soltar'; prog = op.pinT / 3; }
    if (mash) { this.mashEl.classList.add('show'); this.mashText.textContent = mash; this.mashBar.style.width = Math.max(0, Math.min(1, prog)) * 100 + '%'; this.mashEl.classList.toggle('danger', danger); }
    else this.mashEl.classList.remove('show');

    // opciones tras agarre
    if (me.state === 'clinch') {
      this.clinchEl.classList.add('show');
      this.clinchEl.innerHTML = `<b>¿Qué haces?</b><span><em>Golpe</em> ${me.throwG.name}</span><span><em>Fuerte</em> ${me.slamG.name}</span><span><em>Agarre</em> ${me.subG.name}</span>`;
    } else this.clinchEl.classList.remove('show');

    // pista de controles
    if (this.hintT > 0) { this.hintT -= realDt; if (this.hintT <= 0) this.hint.classList.add('gone'); }
  }

  playerTip(f: Fighter) { return f; }
}
