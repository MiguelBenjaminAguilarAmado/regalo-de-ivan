import type { InputManager } from '../input/InputManager';
import { el } from './dom';

/** Joystick dinámico a la izquierda + botones de acción a la derecha. */
export class TouchControls {
  root: HTMLElement;
  private stickBase: HTMLElement;
  private stickKnob: HTMLElement;
  private finBtn: HTMLElement;
  private stickId = -1;
  private origin = { x: 0, y: 0 };

  constructor(parent: HTMLElement, private input: InputManager) {
    this.stickKnob = el('i');
    this.stickBase = el('div', { class: 'stick' }, [this.stickKnob]);
    const btn = (cls: string, label: string, sub: string, down: () => void, up?: () => void) => {
      const b = el('button', { class: `tbtn ${cls}`, 'aria-label': label }, [el('b', {}, label), el('small', {}, sub)]);
      const ids = new Set<number>();
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); ids.add(e.pointerId); b.setPointerCapture(e.pointerId); b.classList.add('on'); down(); });
      const rel = (e: PointerEvent) => { if (ids.delete(e.pointerId)) { b.classList.remove('on'); up?.(); } };
      b.addEventListener('pointerup', rel); b.addEventListener('pointercancel', rel); b.addEventListener('lostpointercapture', rel);
      return b;
    };
    this.finBtn = btn('fin', 'FINISHER', '', () => input.press('finisher'));
    const zone = el('div', { class: 'stick-zone' }, [this.stickBase]);
    const buttons = el('div', { class: 'tbtns' }, [
      btn('light', 'GOLPE', 'ligero', () => input.press('light')),
      btn('heavy', 'FUERTE', 'pesado', () => input.press('heavy')),
      btn('grab', 'AGARRE', 'llaves', () => input.press('grab')),
      btn('block', 'GUARDIA', 'mantén', () => (input.touch.block = true), () => (input.touch.block = false)),
      btn('taunt', 'BURLA', '', () => input.press('taunt')),
      this.finBtn,
    ]);
    this.root = el('div', { class: 'touch-ui hidden' }, [zone, buttons]);
    parent.appendChild(this.root);

    zone.addEventListener('pointerdown', (e) => {
      if (this.stickId !== -1) return;
      e.preventDefault();
      this.stickId = e.pointerId; zone.setPointerCapture(e.pointerId);
      const r = zone.getBoundingClientRect();
      this.origin = { x: e.clientX, y: e.clientY };
      this.stickBase.style.left = e.clientX - r.left + 'px'; this.stickBase.style.top = e.clientY - r.top + 'px';
      this.stickBase.classList.add('on');
      this.move(e);
    });
    zone.addEventListener('pointermove', (e) => { if (e.pointerId === this.stickId) this.move(e); });
    const end = (e: PointerEvent) => {
      if (e.pointerId !== this.stickId) return;
      this.stickId = -1; this.stickBase.classList.remove('on');
      this.stickKnob.style.transform = 'translate(0,0)';
      input.touch.mx = 0; input.touch.mz = 0; input.touch.run = false;
    };
    zone.addEventListener('pointerup', end); zone.addEventListener('pointercancel', end);
  }

  private move(e: PointerEvent) {
    const R = 56;
    let dx = e.clientX - this.origin.x, dy = e.clientY - this.origin.y;
    const l = Math.hypot(dx, dy);
    if (l > R) { dx = (dx / l) * R; dy = (dy / l) * R; }
    this.stickKnob.style.transform = `translate(${dx}px,${dy}px)`;
    const m = Math.hypot(dx, dy) / R;
    const dead = m < 0.18;
    this.input.touch.mx = dead ? 0 : dx / R;
    this.input.touch.mz = dead ? 0 : -dy / R;
    this.input.touch.run = m > 0.92;
    this.stickBase.classList.toggle('run', m > 0.92);
  }

  setReady(v: boolean) { this.finBtn.classList.toggle('ready', v); }
  show(v: boolean) { this.root.classList.toggle('hidden', !v); }
}
