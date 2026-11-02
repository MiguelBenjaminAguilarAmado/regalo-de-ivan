import './style.css';
import { Game } from './game/Game';

const canvas = document.getElementById('gl') as HTMLCanvasElement;
const ui = document.getElementById('ui') as HTMLElement;

window.addEventListener('error', (e) => {
  const b = document.getElementById('boot');
  if (b) b.innerHTML = `<div class="boot-err"><b>Algo ha fallado al arrancar.</b><pre>${String(e.message)}</pre><p>Comprueba que tu navegador soporta WebGL 2.</p></div>`;
});

const game = new Game(canvas, ui);
(window as any).__hoyo = game;
game.boot().then(() => document.getElementById('boot')?.classList.add('done'));
