import './companion.css';
import { el, clear } from '../ui/dom';
import { paintMap, type MapData } from '../ui/WorldUI';
import { openChannel, type DualMsg, type DualState } from './DualLink';

/**
 * ===== Pantalla de abajo (AYN Thor) =====
 * Va en la pantalla inferior (táctil): en la ciudad, mapa grande en vivo, objetivo y botones; en combate, las barras,
 * los golpes del luchador y botones de burla, finisher y pausa; en las escenas, el diálogo con las opciones para tocar.
 */
export class Companion {
  private ch = openChannel();
  private root: HTMLElement;
  private stat: Pick<MapData, 'worldSize' | 'districts' | 'roads'> | null = null;
  private s: DualState | null = null;
  private lastState = 0;
  private mapRange = 55;
  private canvas = document.createElement('canvas');
  private mode = '';
  private body = el('div', { class: 'cbody' });
  private bar = el('div', { class: 'cbar' });

  constructor(parent: HTMLElement) {
    document.body.classList.add('companion');
    this.root = el('div', { class: 'croot' }, [this.bar, this.body]);
    parent.appendChild(this.root);
    if (!this.ch) { this.waiting('Este navegador no permite conectar las dos pantallas (falta BroadcastChannel).'); return; }
    this.ch.onmessage = (e: { data: DualMsg }) => this.onMsg(e.data);
    this.post({ t: 'hello' });
    setInterval(() => this.post({ t: 'ping', from: 'abajo' }), 1000);
    // si esta ventana tiene el foco, el mando se reenvía al juego para que no deje de responder
    const pad = () => {
      if (document.hasFocus()) {
        const p = navigator.getGamepads ? Array.from(navigator.getGamepads()).find((x) => x && x.connected) : null;
        if (p) this.post({ t: 'pad', b: p.buttons.map((x) => x.pressed), v: p.buttons.map((x) => x.value), a: [...p.axes] });
      }
      requestAnimationFrame(pad);
    };
    requestAnimationFrame(pad);
    setInterval(() => { if (performance.now() - this.lastState > 2500) this.waiting(); }, 1000);
    this.waiting();
    window.addEventListener('resize', () => { this.mode = ''; this.render(); });
  }

  private post(m: DualMsg) { try { this.ch?.postMessage(m); } catch { /* nada */ } }
  private cmd(c: string, i?: number) { this.post({ t: 'cmd', c, i }); navigator.vibrate?.(12); }

  private onMsg(m: DualMsg) {
    if (m.t === 'static') { this.stat = m.map; return; }
    if (m.t === 'state') { this.s = m.s; this.lastState = performance.now(); this.render(); }
  }

  private btn(label: string, c: string, cls = '', sub = '', i?: number) {
    const b = el('button', { class: 'cbtn ' + cls }, [el('b', {}, label), sub ? el('small', {}, sub) : null]);
    b.addEventListener('pointerdown', (e) => { e.preventDefault(); b.classList.add('on'); this.cmd(c, i); });
    const up = () => b.classList.remove('on');
    b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up);
    return b;
  }

  private waiting(msg?: string) {
    if (this.mode === 'espera' && !msg) return;
    this.mode = 'espera';
    clear(this.bar); clear(this.body);
    this.bar.append(el('b', { class: 'clogo' }, [el('span', {}, 'EL '), 'HOYO']), el('span', { class: 'cdim' }, 'Pantalla de abajo'));
    this.body.append(el('div', { class: 'cwait' }, [
      el('div', { class: 'cpulse' }, '📱'),
      el('h2', {}, msg ?? 'Esperando al juego…'),
      el('p', {}, 'Abre El Hoyo Wrestling en la pantalla de ARRIBA, en el mismo navegador. Esta pantalla se conecta sola.'),
      el('ol', {}, [
        el('li', {}, 'Arriba: abre el juego (la dirección normal).'),
        el('li', {}, 'Abajo: abre esta misma dirección terminada en «?pantalla=abajo» en una ventana nueva del navegador.'),
        el('li', {}, 'En la AYN Thor, usa el botón de cambiar de pantalla para dejar cada ventana en su sitio.'),
      ]),
    ]));
  }

  private bars(f: { name: string; pfp: string | null; hp: number; st: number; mom: number; you: boolean }, right = false) {
    return el('div', { class: 'cfighter' + (right ? ' right' : '') }, [
      el('div', { class: 'cpfp' }, f.pfp ? [el('img', { src: f.pfp, alt: '' })] : [el('b', {}, f.name[0])]),
      el('div', { class: 'cfbars' }, [
        el('b', {}, f.name + (f.you ? ' · TÚ' : '')),
        el('div', { class: 'cbarr hp' }, [el('i', { style: `width:${Math.round(f.hp * 100)}%` })]),
        el('div', { class: 'cbarr st' }, [el('i', { style: `width:${Math.round(f.st * 100)}%` })]),
        el('div', { class: 'cbarr mom' + (f.mom >= 1 ? ' full' : '') }, [el('i', { style: `width:${Math.round(f.mom * 100)}%` })]),
      ]),
    ]);
  }

  private render() {
    const s = this.s;
    if (!s) return;
    // barra superior: reloj, dinero, nivel
    clear(this.bar);
    this.bar.append(el('b', { class: 'clogo' }, [el('span', {}, 'EL '), 'HOYO']));
    if (s.hud) this.bar.append(
      el('span', { class: 'cpill' }, `${s.hud.night ? '🌙' : '☀'} ${s.hud.clock} · Día ${s.hud.day}`),
      el('span', { class: 'cpill gold' }, `💰 ${s.hud.money}`),
      el('span', { class: 'cpill' }, `NIV ${s.hud.level}${s.hud.points ? ` · +${s.hud.points} pt` : ''}`),
    );
    else this.bar.append(el('span', { class: 'cdim' }, s.mode === 'combate' ? 'Combate' : s.screenTitle ?? 'Menú'));
    this.bar.append(el('i', { class: 'cconn' }, '● conectado'));

    // la parte de abajo solo se reconstruye al cambiar de modo; si no, se actualiza en el sitio
    const key = s.mode + (s.mode === 'escena' ? '|' + (s.dialog?.choices.join('|') ?? '') + (s.dialog?.card ?? '') : '');
    const rebuild = key !== this.mode;
    this.mode = key;
    if (s.mode === 'mundo') this.renderWorld(s, rebuild);
    else if (s.mode === 'combate') this.renderBattle(s, rebuild);
    else if (s.mode === 'escena') this.renderScene(s, rebuild);
    else if (rebuild) {
      clear(this.body);
      this.body.append(el('div', { class: 'cwait' }, [el('div', { class: 'cpulse' }, '🎮'), el('h2', {}, s.screenTitle ?? 'Menú'), el('p', {}, 'Juega en la pantalla de arriba. Cuando entres en Hoyo, aquí verás el mapa en vivo, el objetivo y botones rápidos; en los combates, las barras y tus golpes; y en las escenas, las opciones para tocar.')]));
    }
  }

  private renderWorld(s: DualState, rebuild: boolean) {
    if (rebuild) {
      clear(this.body);
      const mapBox = el('div', { class: 'cmap' }, [this.canvas, el('div', { class: 'czoom' }, [
        (() => { const b = el('button', { class: 'cchip' }, 'Cerca'); b.addEventListener('pointerdown', () => { this.mapRange = 55; this.render(); }); return b; })(),
        (() => { const b = el('button', { class: 'cchip' }, 'Barrio'); b.addEventListener('pointerdown', () => { this.mapRange = 110; this.render(); }); return b; })(),
        (() => { const b = el('button', { class: 'cchip' }, 'Ciudad'); b.addEventListener('pointerdown', () => { this.mapRange = 0; this.render(); }); return b; })(),
      ])]);
      const side = el('div', { class: 'cside' }, [
        el('div', { class: 'cobj' }), el('div', { class: 'cquest' }), el('div', { class: 'cprompt' }),
        el('div', { class: 'cgrid' }, [
          this.btn('USAR', 'act', 'big gold', 'hablar / entrar'),
          this.btn('MISIONES', 'quests'), this.btn('BOLSA', 'bag'),
          this.btn('ARMARIO', 'wardrobe'), this.btn('MAPA', 'map', '', 'arriba'),
          this.btn('CERRAR', 'close'), this.btn('PAUSA', 'pause', 'red'),
        ]),
      ]);
      this.body.append(el('div', { class: 'cworld' }, [mapBox, side]));
    }
    const obj = this.body.querySelector('.cobj')!, quest = this.body.querySelector('.cquest')!, prompt = this.body.querySelector('.cprompt')!;
    clear(obj); if (s.objective) obj.append(el('small', {}, '★ ' + s.objective.title), el('b', {}, s.objective.text));
    clear(quest); quest.classList.toggle('hidden', !s.quest); if (s.quest) quest.append(el('small', {}, s.quest.title), el('b', {}, s.quest.step));
    prompt.textContent = s.riding != null ? `🏍 ${s.riding} km/h${s.prompt ? ' · ' + s.prompt : ''}` : s.prompt ? '▶ ' + s.prompt : (s.hud?.district ?? '');
    // mapa
    if (this.stat && s.map) {
      const box = this.canvas.parentElement!.getBoundingClientRect();
      const size = Math.max(160, Math.floor(Math.min(box.width, box.height)));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (this.canvas.width !== size * dpr) { this.canvas.width = size * dpr; this.canvas.height = size * dpr; this.canvas.style.width = size + 'px'; this.canvas.style.height = size + 'px'; }
      const g = this.canvas.getContext('2d')!;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintMap(this.canvas, { ...this.stat, ...s.map } as MapData, size, this.mapRange);
    }
  }

  private renderBattle(s: DualState, rebuild: boolean) {
    const b = s.battle!;
    if (rebuild) {
      clear(this.body);
      this.body.append(el('div', { class: 'cbattle' }, [
        el('div', { class: 'cvs' }),
        el('div', { class: 'cmoves' }),
        el('div', { class: 'cgrid four' }, b.spectate ? [this.btn('PAUSA', 'pause', 'red')] : [
          this.btn('BURLA', 'taunt', '', 'llena el momentum'), this.btn('FINISHER', 'finisher', 'fin', 'con la barra llena'),
          ...(b.tag ? [this.btn('RELEVO', 'tag', '', 'cambia de compañero')] : []), this.btn('PAUSA', 'pause', 'red'),
        ]),
      ]));
      const moves = this.body.querySelector('.cmoves')!;
      moves.append(el('h3', {}, b.spectate ? 'Modo espectador' : 'Tus golpes'), ...b.moves.map(([k, n]) => el('div', { class: 'cmove' }, [el('b', { class: 'ck ' + k.toLowerCase() }, k), el('span', {}, n)])));
    }
    const vs = this.body.querySelector('.cvs')!;
    clear(vs);
    const m = Math.floor(b.time / 60), sec = Math.floor(b.time % 60);
    vs.append(this.bars(b.a), el('div', { class: 'ctime' }, [el('b', {}, `${m}:${String(sec).padStart(2, '0')}`), el('small', {}, b.label)]), this.bars(b.b, true));
    this.body.querySelector('.cbtn.fin')?.classList.toggle('ready', b.finisherReady);
  }

  private renderScene(s: DualState, rebuild: boolean) {
    const d = s.dialog!;
    if (rebuild) {
      clear(this.body);
      const choices = d.choices.length
        ? el('div', { class: 'cchoices' }, d.choices.map((c, i) => this.btn(c, 'choice', 'choice', '', i)))
        : el('div', { class: 'cgrid' }, [this.btn('SIGUIENTE ▸', 'advance', 'big gold'), this.btn('SALTAR ESCENA', 'skip')]);
      this.body.append(el('div', { class: 'cscene' }, [el('div', { class: 'cline' }), choices]));
    }
    const line = this.body.querySelector<HTMLElement>('.cline')!;
    clear(line);
    if (d.card) { line.append(el('div', { class: 'ccard' }, d.card)); return; }
    line.append(
      el('div', { class: 'cpfp big' }, d.pfp ? [el('img', { src: d.pfp, alt: '' })] : [el('b', {}, '❝')]),
      el('div', {}, [d.name ? el('b', { class: 'cname' }, d.name) : null, el('p', {}, d.text)]),
    );
    line.onclick = () => this.cmd('advance');
  }
}
