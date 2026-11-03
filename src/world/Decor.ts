import * as THREE from 'three';
import type { Box, Layout } from './layout';

/** ===== Detalles que integran cosas en el mundo: insignias flotantes, murales y vallas publicitarias ===== */

/** Insignia flotante (pastilla con icono y texto), mucho más bonita que un texto suelto */
export function badgeTexture(icon: string, text: string, color: string): THREE.CanvasTexture {
  const W = 512, H = 160;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  g.font = '900 64px Impact, "Arial Black", sans-serif';
  const tw = g.measureText(text).width;
  const bw = Math.min(W - 20, tw + 150), x0 = (W - bw) / 2, y0 = 22, bh = 104;
  // sombra y pastilla ladeada
  g.save();
  g.translate(W / 2, H / 2); g.transform(1, 0, -0.18, 1, 0, 0); g.translate(-W / 2, -H / 2);
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.beginPath(); g.roundRect(x0 + 6, y0 + 8, bw, bh, 18); g.fill();
  const grd = g.createLinearGradient(0, y0, 0, y0 + bh); grd.addColorStop(0, '#1d1714'); grd.addColorStop(1, '#0b0908');
  g.fillStyle = grd; g.beginPath(); g.roundRect(x0, y0, bw, bh, 18); g.fill();
  g.lineWidth = 6; g.strokeStyle = color; g.stroke();
  // círculo del icono
  g.fillStyle = color; g.beginPath(); g.arc(x0 + 56, y0 + bh / 2, 38, 0, Math.PI * 2); g.fill();
  g.restore();
  g.textBaseline = 'middle'; g.textAlign = 'center';
  g.font = '48px "Segoe UI Emoji", "Apple Color Emoji", sans-serif'; g.fillStyle = '#111';
  g.fillText(icon, x0 + 50, y0 + bh / 2 + 3);
  g.font = '900 60px Impact, "Arial Black", sans-serif'; g.textAlign = 'left';
  g.fillStyle = '#fff'; g.fillText(text, x0 + 104, y0 + bh / 2 + 3);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

/** Mural de espray: fondo de manchas, letras con contorno y chorretones */
export function muralTexture(name: string, seed: number): THREE.CanvasTexture {
  let s = seed * 9301 + 49297; const R = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  const W = 1024, H = 512;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  const pal = [['#ff3ea5', '#3cc6e8', '#ffd23a'], ['#b8f03c', '#ff7a3a', '#6a4aff'], ['#e8453c', '#f2f2f2', '#2a8aff'], ['#ffd23a', '#c1272d', '#2d9a5a']][Math.floor(R() * 4)];
  g.clearRect(0, 0, W, H);
  // manchas de fondo (pintura sobre la pared)
  for (let i = 0; i < 14; i++) {
    const x = 60 + R() * (W - 120), y = 60 + R() * (H - 120), r = 70 + R() * 140;
    const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, pal[i % 3] + 'cc'); gr.addColorStop(1, pal[i % 3] + '00');
    g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // estrellas y garabatos
  g.strokeStyle = '#111'; g.lineWidth = 6;
  for (let i = 0; i < 6; i++) { g.beginPath(); const x = R() * W, y = R() * H; g.moveTo(x, y); for (let k = 0; k < 4; k++) g.lineTo(x + (R() - 0.5) * 160, y + (R() - 0.5) * 90); g.stroke(); }
  // texto principal
  const text = name.replace(/[«»]/g, '');
  let size = 150; g.font = `900 ${size}px Impact, "Arial Black", sans-serif`;
  while (g.measureText(text).width > W - 80 && size > 50) { size -= 8; g.font = `900 ${size}px Impact, "Arial Black", sans-serif`; }
  g.save(); g.translate(W / 2, H / 2); g.rotate((R() - 0.5) * 0.12);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineJoin = 'round'; g.lineWidth = 22; g.strokeStyle = '#111'; g.strokeText(text, 0, 0);
  g.lineWidth = 10; g.strokeStyle = '#fff'; g.strokeText(text, 0, 0);
  const tg = g.createLinearGradient(0, -size / 2, 0, size / 2); tg.addColorStop(0, pal[0]); tg.addColorStop(1, pal[1]);
  g.fillStyle = tg; g.fillText(text, 0, 0);
  g.restore();
  // chorretones
  for (let i = 0; i < 16; i++) { g.fillStyle = pal[i % 3]; const x = 80 + R() * (W - 160); g.fillRect(x, H / 2 + size * 0.35, 5, 20 + R() * 90); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

/** Cara de pared más cercana a un punto (para pintar un mural en ella) */
export function nearestWall(layout: Layout, x: number, z: number, maxD = 9): { x: number; z: number; yaw: number; box: Box } | null {
  let best: { x: number; z: number; yaw: number; box: Box; d: number } | null = null;
  for (const b of layout.boxes) {
    if (b.h < 3.5 || b.w < 4.5 && b.d < 4.5) continue;
    const faces: [number, number, number, number][] = [
      [b.x, b.z + b.d / 2, 0, b.w], [b.x, b.z - b.d / 2, Math.PI, b.w], [b.x + b.w / 2, b.z, Math.PI / 2, b.d], [b.x - b.w / 2, b.z, -Math.PI / 2, b.d],
    ];
    for (const [fx, fz, yaw, len] of faces) {
      if (len < 4.5) continue;
      // punto de la cara más cercano, sin salirse de la pared
      const along = yaw === 0 || yaw === Math.PI ? Math.max(b.x - b.w / 2 + 2.2, Math.min(b.x + b.w / 2 - 2.2, x)) : Math.max(b.z - b.d / 2 + 2.2, Math.min(b.z + b.d / 2 - 2.2, z));
      const px = yaw === 0 || yaw === Math.PI ? along : fx, pz = yaw === 0 || yaw === Math.PI ? fz : along;
      // la cara tiene que mirar hacia el punto
      const nx = Math.sin(yaw), nz = Math.cos(yaw);
      if ((x - px) * nx + (z - pz) * nz < 0.3) continue;
      const d = Math.hypot(x - px, z - pz);
      if (d < maxD && (!best || d < best.d)) best = { x: px + nx * 0.06, z: pz + nz * 0.06, yaw, box: b, d };
    }
  }
  return best;
}
