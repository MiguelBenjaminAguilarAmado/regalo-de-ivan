// Recorre los 8 distritos del mundo abierto (de día y de noche) y hace capturas. Requiere `npm run dev` en :5173.
// Uso: node scripts/world-tour.mjs <carpeta-salida> [distrito...]
import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const out = process.argv[2] ?? '.';
const only = process.argv.slice(3);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 120000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--window-size=1280,720'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 });
const errors = []; p.on('pageerror', (e) => errors.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await p.goto('http://localhost:5173/?q=baja', { waitUntil: 'load' }); await sleep(2000);
await p.evaluate(() => { document.querySelector('.title').click(); });
await sleep(500);
await p.evaluate(() => { __hoyo.save.world = undefined; __hoyo.save.story = { done: ['fichaje','garito','champion','pareja','yosuke','azotea','gauntlet','oficina','final'], flags: {bando:'elso'}, endings: ['dueno'] }; __hoyo.enterWorld(); const w = __hoyo.world; w.progress.flags.world_intro = true; });
await sleep(1500);
for (const dis of ['plaza', 'viviendas', 'aldea', 'playa', 'manchester', 'industrial', 'torre', 'santiago']) {
  if (only.length && !only.includes(dis)) continue;
  for (const [tag, hour] of [['dia', 12 * 60], ['noche', 23 * 60]]) {
    await p.evaluate((dis, hour) => {
      const w = __hoyo.world; const v = w.view;
      const d = [['plaza',0,6],['viviendas',-90,-2],['aldea',88,-64],['playa',0,90],['manchester',92,16],['industrial',-86,78],['torre',0,-84],['santiago',-90,-78]].find((x) => x[0] === dis);
      w.progress.time = hour + 24 * 60; v.teleport(d[1], d[2], Math.PI); document.querySelector('.wbanner')?.classList.remove('show');
    }, dis, hour);
    await sleep(900);
    await p.screenshot({ path: `${out}/${dis}_${tag}.png` });
  }
  console.log('ok', dis);
}
console.log('errores', errors.slice(0, 6));
await b.close();
