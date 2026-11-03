import type { Input } from '../combat/types';
import { emptyInput } from '../combat/types';
import type { CameraRig } from '../render/CameraRig';

type Edge = 'light' | 'heavy' | 'grab' | 'taunt' | 'finisher' | 'tag';

/** Teclado + ratón + mando + controles táctiles → acciones abstractas. */
export class InputManager {
  private keys = new Set<string>();
  private edges: Record<Edge, boolean> = { light: false, heavy: false, grab: false, taunt: false, finisher: false, tag: false };
  private mouseDown = new Set<number>();
  /** Controles táctiles escriben aquí */
  touch = { mx: 0, mz: 0, block: false, run: false };
  private padPrev: boolean[] = [];
  enabled = false;
  onPause: (() => void) | null = null;
  lastDevice: 'teclado' | 'mando' | 'tactil' = 'teclado';
  private cleanup: (() => void)[] = [];

  constructor(private el: HTMLElement) {
    const kd = (e: KeyboardEvent) => {
      if (e.repeat) { if (this.enabled && ['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) e.preventDefault(); return; }
      this.keys.add(e.code);
      this.lastDevice = 'teclado';
      if (e.code === 'Escape' || e.code === 'KeyP') { this.onPause?.(); return; }
      if (!this.enabled) return;
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) e.preventDefault();
      switch (e.code) {
        case 'KeyJ': case 'KeyZ': this.edges.light = true; break;
        case 'KeyK': case 'KeyX': this.edges.heavy = true; break;
        case 'KeyL': case 'KeyC': this.edges.grab = true; break;
        case 'KeyE': case 'KeyT': this.edges.taunt = true; break;
        case 'KeyF': case 'KeyQ': this.edges.finisher = true; break;
        case 'KeyR': this.edges.tag = true; break;
        default: break;
      }
    };
    const ku = (e: KeyboardEvent) => this.keys.delete(e.code);
    const md = (e: MouseEvent) => {
      if (!this.enabled || (e.target as HTMLElement).closest('.touch-ui, .hud button, .overlay')) return;
      this.mouseDown.add(e.button);
      this.lastDevice = 'teclado';
      if (e.button === 0) this.edges.light = true;
      else if (e.button === 2) this.edges.heavy = true;
      else if (e.button === 1) { this.edges.grab = true; e.preventDefault(); }
    };
    const mu = (e: MouseEvent) => this.mouseDown.delete(e.button);
    const cm = (e: Event) => { if (this.enabled) e.preventDefault(); };
    const blur = () => { this.keys.clear(); this.mouseDown.clear(); };
    window.addEventListener('keydown', kd); window.addEventListener('keyup', ku);
    window.addEventListener('mousedown', md); window.addEventListener('mouseup', mu);
    window.addEventListener('contextmenu', cm); window.addEventListener('blur', blur);
    this.cleanup.push(() => {
      window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku);
      window.removeEventListener('mousedown', md); window.removeEventListener('mouseup', mu);
      window.removeEventListener('contextmenu', cm); window.removeEventListener('blur', blur);
    });
  }

  press(a: Edge) { if (this.enabled) { this.edges[a] = true; this.lastDevice = 'tactil'; } }

  reset() {
    for (const k of Object.keys(this.edges) as Edge[]) this.edges[k] = false;
    // los botones que ya estén pulsados no cuentan como pulsación nueva
    const pad = this.activePad();
    if (pad) this.padPrev = pad.buttons.map((x) => x.pressed);
  }

  /** Primer mando conectado */
  activePad(): Gamepad | null {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    return (pads && Array.from(pads).find((p) => p && p.connected)) || null;
  }
  get padConnected() { return !!this.activePad(); }

  /** Vibración del mando (si lo soporta) */
  rumble(strong: number, weak: number, ms: number) {
    try {
      const pad = this.activePad() as (Gamepad & { vibrationActuator?: { playEffect: (t: string, o: object) => Promise<unknown> } }) | null;
      void pad?.vibrationActuator?.playEffect('dual-rumble', { startDelay: 0, duration: ms, weakMagnitude: weak, strongMagnitude: strong });
    } catch { /* sin vibración */ }
  }

  /** Lee el estado y devuelve un Input en coordenadas del mundo (relativo a la cámara). */
  sample(cam: CameraRig): Input {
    const out = emptyInput();
    if (!this.enabled) { this.reset(); return out; }
    let ix = 0, iz = 0;
    const k = this.keys;
    if (k.has('KeyA') || k.has('ArrowLeft')) ix -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) ix += 1;
    if (k.has('KeyW') || k.has('ArrowUp')) iz += 1;
    if (k.has('KeyS') || k.has('ArrowDown')) iz -= 1;
    let block = k.has('Space');
    let run = k.has('ShiftLeft') || k.has('ShiftRight');

    // mando
    const pad = this.activePad();
    if (pad) {
      const dz = (v: number) => (Math.abs(v) < 0.18 ? 0 : v);
      const ax = dz(pad.axes[0] ?? 0), ay = dz(pad.axes[1] ?? 0);
      if (ax || ay) { ix += ax; iz -= ay; this.lastDevice = 'mando'; }
      // cruceta
      if (pad.buttons[14]?.pressed) ix -= 1;
      if (pad.buttons[15]?.pressed) ix += 1;
      if (pad.buttons[12]?.pressed) iz += 1;
      if (pad.buttons[13]?.pressed) iz -= 1;
      const b = (i: number) => !!pad.buttons[i]?.pressed;
      const edge = (i: number, a: Edge) => { if (b(i) && !this.padPrev[i]) { this.edges[a] = true; this.lastDevice = 'mando'; } };
      edge(0, 'light'); edge(2, 'heavy'); edge(1, 'grab'); edge(3, 'taunt'); edge(5, 'finisher'); edge(8, 'tag');
      if (b(9) && !this.padPrev[9]) this.onPause?.();
      block = block || b(4) || b(6);
      run = run || b(7) || (pad.buttons[10]?.pressed ?? false);
      this.padPrev = pad.buttons.map((x) => x.pressed);
    }
    if (this.touch.mx || this.touch.mz) { ix += this.touch.mx; iz += this.touch.mz; }
    block = block || this.touch.block;
    run = run || this.touch.run;

    const l = Math.hypot(ix, iz);
    if (l > 1) { ix /= l; iz /= l; }
    const f = cam.forward, r = cam.right;
    out.mx = r.x * ix + f.x * iz;
    out.mz = r.z * ix + f.z * iz;
    out.block = block; out.run = run;
    for (const key of Object.keys(this.edges) as Edge[]) { out[key] = this.edges[key]; this.edges[key] = false; }
    return out;
  }

  dispose() { this.cleanup.forEach((c) => c()); }
}
