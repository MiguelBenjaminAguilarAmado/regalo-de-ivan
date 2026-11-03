import { el } from '../ui/dom';

/**
 * ===== Iconos de botones según el dispositivo =====
 * Cada indicación lleva las dos versiones (teclado y mando) y el CSS enseña la que toca:
 * con el mando, `body.pad-mode` y todo aparece como A / B / X / Y / LB / RB / Start.
 */

let padMode = false;
export function setPadMode(on: boolean) {
  if (on === padMode) return;
  padMode = on;
  document.body.classList.toggle('pad-mode', on);
}
export const isPadMode = () => padMode;

const PAD_CLASS: Record<string, string> = { A: 'pa', B: 'pb', X: 'px', Y: 'py' };

/** Tecla / botón para una acción: «E» con teclado, «Ⓐ» con mando */
export function kbd(kb: string, pad: string): HTMLElement {
  return el('span', { class: 'kk' }, [el('b', { class: 'k-kb' }, kb), el('b', { class: 'k-pad ' + (PAD_CLASS[pad] ?? 'pw') }, pad)]);
}

/** Lo mismo, como HTML (para textos que se pintan con innerHTML) */
export function kbdHtml(kb: string, pad: string): string {
  return `<span class="kk"><b class="k-kb">${kb}</b><b class="k-pad ${PAD_CLASS[pad] ?? 'pw'}">${pad}</b></span>`;
}

/** Traduce los consejos escritos para teclado a botones del mando */
export function padText(t: string): string {
  if (!padMode) return t;
  return t
    .replace(/\(J\)/g, '(A)').replace(/\(K\)/g, '(X)').replace(/\(L\)/g, '(B)').replace(/\(F\)/g, '(RB)').replace(/\(E\)/g, '(Y)')
    .replace(/\bpulsa L\b/gi, 'pulsa B').replace(/\bpulsa F\b/gi, 'pulsa RB').replace(/\bpulsa J\b/gi, 'pulsa A').replace(/\bpulsa K\b/gi, 'pulsa X')
    .replace(/Mantén Espacio/g, 'Mantén LB').replace(/\bEspacio\b/g, 'LB').replace(/\bShift\b/g, 'RT');
}
