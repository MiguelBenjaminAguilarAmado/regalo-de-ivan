import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dir = process.argv[2];
async function run() {
  const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 90000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720'] });
  try {
    const p = await b.newPage();
    await p.setViewport({ width: 1280, height: 720 });
    const logs = [];
    p.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message.slice(0, 300)));
    await p.goto('http://localhost:5173/?q=baja', { waitUntil: 'load' });
    await sleep(2500);
    const click = (sel, i = 0) => p.evaluate((s, k) => document.querySelectorAll(s)[k]?.click(), sel, i);
    await click('.title'); await sleep(700);
    await click('.menu-list > button', 2); await sleep(1500);       // ESPECTADOR
    console.log('pantalla:', await p.evaluate(() => document.querySelector('.topbar h2')?.textContent));
    await p.screenshot({ path: `${dir}/spec_1_setup.png` });
    await click('.tile', 3); await sleep(300);                      // CPU 1 = Pepe
    await click('.slot', 1); await sleep(300); await click('.tile', 1); await sleep(300); // CPU 2 = Petisui
    await click('.go'); await sleep(1200);
    for (let i = 0; i < 14 && (await p.evaluate(() => !!document.querySelector('.dialogue'))); i++) { await p.evaluate(() => document.querySelector('.dbox')?.click()); await sleep(150); await p.evaluate(() => document.querySelector('.dbox')?.click()); await sleep(150); }
    await sleep(3800);
    console.log('battle spectate:', await p.evaluate(() => [window.__hoyo.battle?.opts.spectate, window.__hoyo.battle?.view.cam.auto, window.__hoyo.input.enabled].join(',')));
    for (let i = 0; i < 4; i++) {
      await sleep(3500);
      await p.screenshot({ path: `${dir}/spec_2_fight${i}.png` });
      console.log(i, await p.evaluate(() => [window.__hoyo.battle?.view.cam['as'].kind, document.querySelector('.subs')?.textContent?.slice(0, 90), window.__hoyo.battle?.match.time.toFixed(1)].join(' | ')));
    }
    console.log(logs.join('\n') || 'sin errores');
  } finally { await b.close().catch(() => {}); }
}
for (let i = 0; i < 5; i++) { try { await run(); break; } catch (e) { console.log('reintento', e.message.slice(0, 70)); } }
