// Uso: PATH=<dir con ffmpeg>:$PATH node scripts/trailer.mjs <carpeta-salida>
// Requiere `npm run dev` (puerto 5173). Graba cada clip como secuencia de capturas (el screencast de puppeteer se cuelga) y los une en trailer.webm.
import puppeteer from 'puppeteer-core';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { browserPath } from './browser.mjs';
const out = process.argv[2] ?? '.';
fs.mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CSS = `
#tr{position:fixed;inset:0;z-index:99999;pointer-events:none;font-family:Anton,Impact,sans-serif;color:#efe6d5;text-transform:uppercase}
#tr .fade{position:absolute;inset:0;background:#000;animation:fadein .5s ease-out forwards}
#tr .fadeout{position:absolute;inset:0;background:#000;opacity:0;animation:fadeout .5s ease-in forwards;animation-delay:var(--out)}
@keyframes fadein{to{opacity:0}} @keyframes fadeout{to{opacity:1}}
#tr .card{position:absolute;inset:0;display:grid;place-content:center;text-align:center;background:radial-gradient(ellipse at center,#3a0d0f 0%,#0b0908 70%);gap:10px}
#tr .card b{font-size:7vw;letter-spacing:.04em;font-weight:400;animation:pop .6s ease-out both}
#tr .card b em{color:#c1272d;font-style:normal}
#tr .card small{font-size:2.2vw;letter-spacing:.3em;color:#d8b25a;font-family:'Barlow Condensed',sans-serif;font-weight:700}
@keyframes pop{from{transform:scale(1.35);opacity:0}to{transform:scale(1);opacity:1}}
#tr .cap{position:absolute;left:4vw;bottom:9vh;font-size:4.6vw;line-height:1;text-shadow:0 .4vw 1.2vw #000,0 0 2vw #000;animation:slide .5s ease-out both;animation-delay:.9s}
#tr .cap i{color:#c1272d;font-style:normal;margin:0 1vw}
#tr .cap small{display:block;font-size:1.8vw;letter-spacing:.25em;color:#d8b25a;font-family:'Barlow Condensed',sans-serif;margin-top:.8vw}
@keyframes slide{from{transform:translateX(-4vw);opacity:0}to{transform:none;opacity:1}}
.hint,.pad,#touch{display:none!important}
`;

const fight = (a, b, arena, cap, sub) => ({ url: `?auto=${a},${b},${arena},intermedia&demo=1`, secs: 7.5, cap, sub });
const CLIPS = [
  { url: '', secs: 3.2, card: ['<em>El</em> Hoyo', 'Wrestling'] },
  { url: '', secs: 2.8, card: ['Un ring.', 'Sin reglas. O casi.'] },
  fight('elso', 'petisui', 'matamoros', 'Elso <i>vs</i> Petisui', 'Matamoros · la orquesta no perdona'),
  fight('pablo%20motos', 'pepe%20the%20gay%20dragon', 'manchester', 'Pablo Motos <i>vs</i> Pepe', 'Manchester · cuidado con las columnas'),
  fight('petisui', 'pablo%20motos', 'matamoros', 'Petisui <i>vs</i> Pablo Motos', 'Cada luchador, un finisher único'),
  fight('elso', 'pepe%20the%20gay%20dragon', 'manchester', 'Elso <i>vs</i> Pepe', 'Agarres · pins · sumisiones'),
  { url: '', secs: 3.2, card: ['Versus <em>·</em> Torneo', 'Para PC y móvil'] },
  { url: '', secs: 4.2, card: ['<em>El</em> Hoyo', 'Wrestling · Inspirado en la obra original de Jefefbi'] },
];

const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 120000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720'] });
const all = [];
for (const [i, c] of CLIPS.entries()) {
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 720 });
  await p.goto('http://localhost:5173/' + c.url, { waitUntil: 'load', timeout: 60000 });
  await sleep(1500); // deja cargar texturas/fuentes antes de grabar
  await p.evaluate((css, c) => {
    const st = document.createElement('style'); st.textContent = css; document.head.append(st);
    const d = document.createElement('div'); d.id = 'tr';
    d.style.setProperty('--out', (c.secs - 0.5) + 's');
    d.innerHTML = (c.card ? `<div class="card"><b>${c.card[0]}</b><small>${c.card[1]}</small></div>` : c.cap ? `<div class="cap">${c.cap}<small>${c.sub}</small></div>` : '') + '<div class="fade"></div><div class="fadeout"></div>';
    document.body.append(d);
  }, CSS, c);
  const t0 = Date.now(); const bufs = [];
  while (Date.now() - t0 < c.secs * 1000) { bufs.push(Buffer.from(await p.screenshot({ type: 'jpeg', quality: 88 }))); }
  const n = bufs.length; const fps = n / ((Date.now() - t0) / 1000);
  await p.close();
  // remuestrea a 30 fps exactos (duplicando/saltando capturas) para poder unir los clips sin filtros de ffmpeg
  const target = Math.round(c.secs * 30);
  for (let k = 0; k < target; k++) all.push(bufs[Math.min(n - 1, Math.floor((k * n) / target))]);
  console.log('clip', i, 'ok', n, 'frames', fps.toFixed(1), 'fps');
  console.log('clip', i, 'ok');
}
await b.close();
const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', '30', '-i', 'file:/dev/stdin', '-c:v', 'libvpx-vp9', '-b:v', '5M', '-an', `${out}/trailer.webm`], { input: Buffer.concat(all), maxBuffer: 1 << 28 });
if (r.status !== 0) throw new Error('ffmpeg: ' + r.stderr);
console.log('listo:', `${out}/trailer.webm`, (all.length / 30).toFixed(1) + ' s');
