import { el, clear } from '../ui/dom';
import { Audio } from '../audio/Audio';

/** ===== 4 minijuegos del mundo abierto: cada uno devuelve su puntuación (y si se ganó) ===== */

export type MiniId = 'pulso' | 'comilona' | 'pesca' | 'tambores';
export interface MiniResult { score: number; won: boolean; text: string }

export const MINI_INFO: Record<MiniId, { name: string; how: string; goal: string }> = {
  pulso: { name: 'Pulso en El Bajo', how: 'Machaca ESPACIO (o toca el botón) para empujar el brazo del rival.', goal: 'Gana el pulso antes de que se acabe el tiempo. Más puntos cuanto antes.' },
  comilona: { name: 'Concurso de hamburguesas', how: 'Pulsa ESPACIO cuando el marcador pase por la zona verde para dar un bocado.', goal: 'Come todas las que puedas en 25 segundos. Zona dorada = bocado doble.' },
  pesca: { name: 'Pesca en el muelle', how: 'Espera a que el corcho se hunda y pulsa ESPACIO rapidísimo.', goal: 'Pica un pez: si pulsas antes de tiempo, se asusta.' },
  tambores: { name: 'Tambores de la aldea', how: 'Pulsa A, S o D (o toca los tambores) cuando las notas lleguen a la línea.', goal: 'Acierta todas las notas que puedas. 20 notas en total.' },
};

type Done = (r: MiniResult) => void;

/** Lanza un minijuego sobre el contenedor; devuelve la promesa con el resultado. */
export function runMinigame(root: HTMLElement, id: MiniId, best = 0): Promise<MiniResult> {
  return new Promise((resolve) => {
    const info = MINI_INFO[id];
    const wrap = el('div', { class: 'wmini' });
    root.appendChild(wrap);
    let cleanup: (() => void) | null = null;
    let finished = false;
    const finish: Done = (r) => {
      if (finished) return; finished = true;
      cleanup?.();
      clear(wrap);
      wrap.appendChild(el('div', { class: 'wpanel mini-result' }, [
        el('h2', {}, r.won ? '¡BIEN!' : 'Casi…'),
        el('p', {}, r.text),
        el('div', { class: 'mini-score' }, [el('b', {}, String(r.score)), el('span', {}, id === 'pulso' ? 'puntos' : id === 'pesca' ? (r.score ? 'pez' : 'peces') : 'puntos')]),
        best ? el('p', { class: 'dim' }, `Tu récord: ${Math.max(best, r.score)}`) : null,
        el('button', { class: 'btn primary go', onClick: () => { wrap.remove(); resolve(r); } }, [el('span', {}, 'Continuar')]),
      ]));
      Audio.sfx(r.won ? 'win' : 'foul');
    };
    const intro = el('div', { class: 'wpanel' }, [
      el('h2', {}, info.name), el('p', {}, info.how), el('p', { class: 'dim' }, info.goal),
      el('div', { class: 'btns' }, [
        el('button', { class: 'btn primary go', onClick: () => start() }, [el('span', {}, '¡Empezar! (Espacio)')]),
        el('button', { class: 'btn', onClick: () => { finished = true; wrap.remove(); resolve({ score: 0, won: false, text: 'Lo dejas para otro día.' }); } }, [el('span', {}, 'Dejarlo')]),
      ]),
    ]);
    wrap.appendChild(intro);
    const startKey = (e: KeyboardEvent) => { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); start(); } };
    window.addEventListener('keydown', startKey);
    const start = () => {
      window.removeEventListener('keydown', startKey);
      clear(wrap);
      cleanup = ({ pulso, comilona, pesca, tambores } as Record<MiniId, (w: HTMLElement, done: Done) => () => void>)[id](wrap, finish);
    };
    const prevCleanup = () => window.removeEventListener('keydown', startKey);
    void prevCleanup;
  });
}

const spaceBtn = (label: string, onPress: () => void) => {
  const b = el('button', { class: 'btn primary go bigtap' }, [el('span', {}, label)]);
  b.addEventListener('pointerdown', (e) => { e.preventDefault(); onPress(); });
  return b;
};

// ---------------------------------------------------------------- pulso
function pulso(wrap: HTMLElement, done: Done): () => void {
  let pos = 0, t = 0, last = performance.now(), raf = 0;
  const T = 14;
  const bar = el('i'); const timer = el('b', {}, T.toFixed(0));
  const status = el('p', {}, '¡Machaca ESPACIO!');
  wrap.appendChild(el('div', { class: 'wpanel' }, [el('h2', {}, 'PULSO'), el('div', { class: 'tug' }, [bar, el('em', {})]), status, timer, spaceBtn('¡EMPUJAR!', push)]));
  const rival = 0.17 + Math.random() * 0.05; // fuerza del rival
  function push() { pos = Math.min(1, pos + 0.055); Audio.sfx('click'); }
  const key = (e: KeyboardEvent) => { if (e.code === 'Space' && !e.repeat) { e.preventDefault(); push(); } };
  window.addEventListener('keydown', key);
  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    pos -= (rival + 0.05 * Math.sin(t * 3)) * dt * 1.9;
    bar.style.left = ((pos + 1) / 2) * 100 + '%';
    timer.textContent = Math.max(0, T - t).toFixed(1);
    if (pos >= 1) { done({ score: 8 + Math.floor(T - t), won: true, text: `¡Le has echado el brazo abajo en ${t.toFixed(1)} s!` }); return; }
    if (pos <= -1 || t >= T) { done({ score: Math.max(0, Math.round((pos + 1) * 3)), won: false, text: 'El rival tiene el brazo de piedra.' }); return; }
    raf = requestAnimationFrame(loop);
  };
  pos = 0; raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', key); };
}

// ---------------------------------------------------------------- comilona
function comilona(wrap: HTMLElement, done: Done): () => void {
  const T = 25;
  let t = 0, last = performance.now(), raf = 0, eaten = 0, stun = 0, x = 0, dir = 1;
  const cursor = el('i'); const cnt = el('b', {}, '0'); const timer = el('span', {}, String(T));
  const msg = el('p', {}, 'Pulsa ESPACIO en la zona verde');
  wrap.appendChild(el('div', { class: 'wpanel' }, [el('h2', {}, '🍔 COMILONA'), el('div', { class: 'eatbar' }, [el('em', { class: 'zone' }), el('em', { class: 'gold' }), cursor]), el('div', { class: 'mini-score' }, [cnt, timer]), msg, spaceBtn('¡BOCADO!', bite)]));
  const speed = 1.15;
  function bite() {
    if (stun > 0) return;
    const d = Math.abs(x - 0.5);
    if (d < 0.05) { eaten += 2; msg.textContent = '¡Bocado doble!'; Audio.sfx('heavy'); }
    else if (d < 0.17) { eaten += 1; msg.textContent = '¡Ñam!'; Audio.sfx('hit'); }
    else { stun = 0.8; msg.textContent = '¡Te atragantas!'; Audio.sfx('foul'); }
    cnt.textContent = String(eaten);
  }
  const key = (e: KeyboardEvent) => { if (e.code === 'Space' && !e.repeat) { e.preventDefault(); bite(); } };
  window.addEventListener('keydown', key);
  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt; stun = Math.max(0, stun - dt);
    x += dir * speed * dt * (1 + t / 40); if (x > 1) { x = 1; dir = -1; } if (x < 0) { x = 0; dir = 1; }
    cursor.style.left = x * 100 + '%'; timer.textContent = ' · ' + Math.max(0, T - t).toFixed(0) + ' s';
    if (t >= T) { done({ score: eaten, won: eaten >= 8, text: eaten >= 8 ? `¡${eaten} puntos! Big Mac está impresionado.` : `${eaten} puntos. Big Mac se ríe: «mi abuela come más».` }); return; }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', key); };
}

// ---------------------------------------------------------------- pesca
function pesca(wrap: HTMLElement, done: Done): () => void {
  let state: 'wait' | 'bite' | 'over' = 'wait', raf = 0, timer = 0;
  const cork = el('div', { class: 'cork' }); const msg = el('p', {}, 'Espera a que pique…');
  wrap.appendChild(el('div', { class: 'wpanel' }, [el('h2', {}, '🎣 PESCA'), el('div', { class: 'sea' }, [cork]), msg, spaceBtn('¡TIRAR!', pull)]));
  const wait = 1500 + Math.random() * 3500;
  const t0 = performance.now();
  function pull() {
    if (state === 'wait') { state = 'over'; msg.textContent = 'Demasiado pronto: el pez se asusta.'; setTimeout(() => done({ score: 0, won: false, text: 'Tiraste demasiado pronto: el pez se asustó.' }), 700); }
    else if (state === 'bite') { state = 'over'; cleanup(); done({ score: 1, won: true, text: '¡Un pez de buen tamaño! Va directo a tu nevera.' }); }
  }
  const key = (e: KeyboardEvent) => { if (e.code === 'Space' && !e.repeat) { e.preventDefault(); pull(); } };
  window.addEventListener('keydown', key);
  const loop = (now: number) => {
    if (state === 'wait') {
      cork.style.top = 40 + Math.sin(now / 300) * 6 + 'px';
      if (now - t0 > wait) { state = 'bite'; msg.textContent = '¡PICA! ¡TIRA YA!'; cork.classList.add('sink'); Audio.sfx('foul'); timer = now; }
    } else if (state === 'bite') {
      if (now - timer > 750) { state = 'over'; done({ score: 0, won: false, text: 'Se escapó. Siempre se escapan los grandes.' }); return; }
    }
    if (state !== 'over') raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  function cleanup() { cancelAnimationFrame(raf); window.removeEventListener('keydown', key); }
  return cleanup;
}

// ---------------------------------------------------------------- tambores
function tambores(wrap: HTMLElement, done: Done): () => void {
  const N = 20, TRAVEL = 1.5, GAP = 0.62;
  const notes = Array.from({ length: N }, (_, i) => ({ lane: Math.floor(Math.random() * 3), at: 1.8 + i * GAP + (i % 4 === 3 ? 0.15 : 0), hit: false, el: el('i', { class: 'note' }) }));
  const lanes = [0, 1, 2].map((l) => el('div', { class: 'lane' }, [el('span', {}, ['A', 'S', 'D'][l])]));
  notes.forEach((n) => lanes[n.lane].appendChild(n.el));
  const score = el('b', {}, '0'); const msg = el('p', {}, 'A · S · D');
  const pads = [0, 1, 2].map((l) => { const b = el('button', { class: 'btn drum' }, [el('span', {}, ['A', 'S', 'D'][l])]); b.addEventListener('pointerdown', (e) => { e.preventDefault(); press(l); }); return b; });
  wrap.appendChild(el('div', { class: 'wpanel' }, [el('h2', {}, '🥁 TAMBORES'), el('div', { class: 'lanes' }, lanes), el('div', { class: 'line' }), score, msg, el('div', { class: 'btns' }, pads)]));
  let t = 0, last = performance.now(), raf = 0, hits = 0;
  function press(l: number) {
    let best: (typeof notes)[number] | null = null, bd = 0.22;
    for (const n of notes) if (!n.hit && n.lane === l && Math.abs(n.at - t) < bd) { best = n; bd = Math.abs(n.at - t); }
    if (best) { best.hit = true; hits++; best.el.classList.add('hit'); score.textContent = String(hits); msg.textContent = bd < 0.08 ? '¡Perfecto!' : '¡Bien!'; Audio.sfx('knock'); }
    else { msg.textContent = '¡Fuera de ritmo!'; Audio.sfx('click'); }
  }
  const keyMap: Record<string, number> = { KeyA: 0, KeyS: 1, KeyD: 2 };
  const key = (e: KeyboardEvent) => { if (e.code in keyMap && !e.repeat) { e.preventDefault(); press(keyMap[e.code]); } };
  window.addEventListener('keydown', key);
  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    for (const n of notes) { const p = (t - (n.at - TRAVEL)) / TRAVEL; n.el.style.top = p * 100 + '%'; n.el.style.opacity = p < 0 || p > 1.25 ? '0' : '1'; }
    if (t > notes[N - 1].at + 0.8) { done({ score: hits, won: hits >= 10, text: hits >= 10 ? `¡${hits} de ${N} notas! La tribu baila contigo.` : `${hits} de ${N} notas. Los tambores te esperan.` }); return; }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', key); };
}
