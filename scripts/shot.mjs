// Uso: node scripts/shot.mjs "<query>" <salida.png> [segundos] [ancho] [alto] [js-a-evaluar]
// Hace varias capturas si js es una lista separada por ";;" — cada paso: "ms|js"
import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const [query = '', out = 'shot.png', secs = '4', w = '1280', h = '720', js = ''] = process.argv.slice(2);
const exe = browserPath();

async function once() {
  const b = await puppeteer.launch({ executablePath: exe, headless: 'new', protocolTimeout: 60000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--autoplay-policy=no-user-gesture-required', `--window-size=${w},${h}`] });
  try {
    const p = await b.newPage();
    await p.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
    const logs = [];
    p.on('console', (m) => { const t = m.text(); if ((m.type() === 'error' || m.type() === 'warning' || t.startsWith('[')) && !t.includes('AudioContext')) logs.push(m.type() + ': ' + t.slice(0, 300)); });
    p.on('error', (e) => logs.push('CRASH: ' + e.message));
    p.on('pageerror', (e) => logs.push('PAGEERROR: ' + e.message.slice(0, 400)));
    await p.goto('http://localhost:5173/' + query, { waitUntil: 'load', timeout: 40000 });
    await new Promise((r) => setTimeout(r, +secs * 1000));
    if (js) {
      for (const step of js.split(';;')) {
        const [ms, code] = step.includes('|') ? [step.split('|')[0], step.slice(step.indexOf('|') + 1)] : ['600', step];
        const r = await p.evaluate(code);
        if (r !== undefined) console.log('eval →', JSON.stringify(r));
        await new Promise((r) => setTimeout(r, +ms));
      }
    }
    await p.screenshot({ path: out });
    console.log(logs.filter((l) => !l.includes('[vite]')).slice(0, 14).join('\n') || 'sin errores de consola');
    return true;
  } finally { await b.close().catch(() => {}); }
}
for (let i = 0; i < 3; i++) { try { if (await once()) break; } catch (e) { console.log(`intento ${i + 1} falló: ${e.message.slice(0, 90)}`); } }
