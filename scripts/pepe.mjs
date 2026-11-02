import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dir = process.argv[2];
async function run() {
  const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 90000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720'] });
  try {
    const p = await b.newPage();
    await p.setViewport({ width: 1280, height: 720 });
    p.on('pageerror', (e) => console.log('PAGEERROR', e.message.slice(0, 200)));
    await p.goto('http://localhost:5173/?auto=pepe%20the%20gay%20dragon,petisui,matamoros,intermedia&q=media', { waitUntil: 'load' });
    await sleep(1500);
    await p.evaluate(() => { const g = window.__hoyo; g.battle.aiC.update = () => ({ mx: 0, mz: 0, light: false, heavy: false, grab: false, taunt: false, finisher: false, block: false, run: false }); });
    await sleep(6000);
    await p.evaluate(() => { const m = window.__hoyo.battle.match; m.f[0].mom = 100; m.f[0].x = -3.0; m.f[1].x = 1.0; m.f[0].z = 0; m.f[1].z = 0; });
    await p.keyboard.down('KeyF'); await sleep(50); await p.keyboard.up('KeyF');
    const marks = [[900, 'a_cuerno'], [900, 'b_embiste'], [450, 'c_toreo'], [900, 'd_golpe'], [800, 'e_ko']];
    for (const [ms, n] of marks) { await sleep(ms); await p.screenshot({ path: `${dir}/pepe_${n}.png` }); console.log(n, await p.evaluate(() => { const m = window.__hoyo.battle.match; return `${m.f[0].state} ${m.f[0].move?.id ?? ''} | petisui ${m.f[1].state} hp ${m.f[1].hp.toFixed(0)}`; })); }
  } finally { await b.close().catch(() => {}); }
}
for (let i = 0; i < 5; i++) { try { await run(); break; } catch (e) { console.log('reintento', e.message.slice(0, 70)); } }
