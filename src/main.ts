import './style.css';
import { Game } from './game/Game';

// ---- zoom bloqueado: ni pellizco, ni doble toque, ni Ctrl + rueda, ni Ctrl +/- (el juego siempre se ve igual).
// El doble toque ya lo anula el CSS (touch-action: none / pan-y en todo el documento).
const stop = (e: Event) => { if (e.cancelable) e.preventDefault(); };
for (const ev of ['gesturestart', 'gesturechange', 'gestureend']) document.addEventListener(ev, stop, { passive: false });
document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) stop(e); }, { passive: false });
document.addEventListener('dblclick', stop, { passive: false });
window.addEventListener('wheel', (e) => { if (e.ctrlKey || e.metaKey) stop(e); }, { passive: false });
window.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '0', '_'].includes(e.key)) stop(e); });

const canvas = document.getElementById('gl') as HTMLCanvasElement;
const ui = document.getElementById('ui') as HTMLElement;

window.addEventListener('error', (e) => {
  const b = document.getElementById('boot');
  if (b) b.innerHTML = `<div class="boot-err"><b>Algo ha fallado al arrancar.</b><pre>${String(e.message)}</pre><p>Comprueba que tu navegador soporta WebGL 2.</p></div>`;
});

// Pantalla doble (AYN Thor): «?pantalla=abajo» abre la pantalla de abajo en vez del juego
if (new URLSearchParams(location.search).get('pantalla') === 'abajo') {
  import('./dual/Companion').then(({ Companion }) => { (window as any).__abajo = new Companion(ui); document.getElementById('boot')?.classList.add('done'); });
} else {
  const game = new Game(canvas, ui);
  (window as any).__hoyo = game;
  game.boot().then(() => document.getElementById('boot')?.classList.add('done'));
}
