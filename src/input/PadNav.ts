import { getPad } from './padSource';
/**
 * Navegación de menús con mando: cruceta / stick para moverse, A para aceptar, B para volver.
 * El combate lo gestiona InputManager; esto solo actúa cuando hay pantallas abiertas.
 */
export type PadAction = 'up' | 'down' | 'left' | 'right' | 'confirm' | 'back' | 'start' | 'x' | 'y' | 'select' | 'lb' | 'rb';

export class PadNav {
  private prev: boolean[] = [];
  private repeat: Record<string, number> = {};
  private warm = 0;

  onActivity: (() => void) | null = null;
  constructor(private handler: (a: PadAction) => void) {}

  /** Debe llamarse cada frame. `active` = hay una pantalla/menú que manejar. */
  update(dt: number, active: boolean) {
    const pad = getPad();
    if (!pad) { this.prev = []; return; }
    const b = (i: number) => !!pad.buttons[i]?.pressed;
    const now = pad.buttons.map((x) => x.pressed);
    // al activarse (p. ej. al cerrar la pausa) ignoramos lo que ya estuviera pulsado
    if (this.warm > 0) { this.warm -= dt; this.prev = now; return; }
    if (!active) { if (now.some((v, i) => v && !this.prev[i]) || Math.abs(pad.axes[0] ?? 0) > 0.5 || Math.abs(pad.axes[2] ?? 0) > 0.5) this.onActivity?.(); this.prev = now; return; }
    const edge = (i: number, a: PadAction) => { if (b(i) && !this.prev[i]) this.handler(a); };
    edge(0, 'confirm'); edge(1, 'back'); edge(9, 'start'); edge(2, 'x'); edge(3, 'y'); edge(8, 'select'); edge(4, 'lb'); edge(5, 'rb');
    if (now.some((v, i) => v && !this.prev[i]) || Math.abs(pad.axes[0] ?? 0) > 0.5 || Math.abs(pad.axes[1] ?? 0) > 0.5 || Math.abs(pad.axes[2] ?? 0) > 0.5 || Math.abs(pad.axes[3] ?? 0) > 0.5) this.onActivity?.();
    // direcciones con repetición
    const ax = pad.axes[0] ?? 0, ay = pad.axes[1] ?? 0;
    const dirs: [PadAction, boolean][] = [
      ['up', b(12) || ay < -0.6], ['down', b(13) || ay > 0.6], ['left', b(14) || ax < -0.6], ['right', b(15) || ax > 0.6],
    ];
    for (const [d, on] of dirs) {
      if (!on) { delete this.repeat[d]; continue; }
      const t = this.repeat[d];
      if (t === undefined) { this.handler(d); this.repeat[d] = 0.38; }
      else { this.repeat[d] = t - dt; if (this.repeat[d] <= 0) { this.handler(d); this.repeat[d] = 0.13; } }
    }
    this.prev = now;
  }

  /** Ignora los botones pulsados durante los próximos instantes */
  settle() { this.warm = 0.15; }
}
