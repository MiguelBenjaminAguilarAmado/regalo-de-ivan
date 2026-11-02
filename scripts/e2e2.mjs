import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const exe = browserPath();
const dir = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: exe, headless: 'new', protocolTimeout: 90000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720'] });
const logs = [];
async function run(name, query, script) {
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 720 });
  p.on('pageerror', (e) => logs.push(name + ' PAGEERROR: ' + e.message.slice(0, 300)));
  p.on('console', (m) => { if (m.type() === 'error') logs.push(name + ' console.error: ' + m.text().slice(0, 200)); });
  await p.goto('http://localhost:5173/' + query, { waitUntil: 'load' });
  await sleep(1500);
  await p.evaluate(() => { window.__hoyo.battle.aiC.update = () => ({ mx: 0, mz: 0, light: false, heavy: false, grab: false, taunt: false, finisher: false, block: false, run: false }); });
  await sleep(6000);
  await script(p, (n) => p.screenshot({ path: `${dir}/fx_${name}_${n}.png` }));
  await p.close();
}
const ev = (p, f) => p.evaluate(f);

await run('femboy', '?auto=elso,petisui,matamoros,intermedia&q=baja', async (p, shot) => {
  await ev(p, () => { const m = window.__hoyo.battle.match; m.f[0].mom = 100; m.f[0].x = -0.8; m.f[0].z = 0; m.f[1].x = 0.5; m.f[1].z = 0; });
  const hp0 = await ev(p, () => window.__hoyo.battle.match.f[1].hp);
  await p.keyboard.down('KeyF'); await sleep(60); await p.keyboard.up('KeyF'); await sleep(700);
  await shot('1_windup');
  console.log('banner:', await ev(p, () => document.querySelector('.banner').textContent), '| timeScale', await ev(p, () => window.__hoyo.battle.view.timeScale.toFixed(2)));
  await sleep(900); await shot('2_impact');
  await sleep(1500);
  const r = await ev(p, () => { const m = window.__hoyo.battle.match; return { hp: m.f[1].hp, state: m.f[1].state, fin: m.f[0].finishersLanded, mom: m.f[0].mom }; });
  console.log('FEMBOY hp', hp0.toFixed(1), '→', r.hp.toFixed(1), JSON.stringify(r));
});

await run('pablo', '?auto=pablo%20motos,elso,matamoros,intermedia&q=baja', async (p, shot) => {
  await ev(p, () => { const m = window.__hoyo.battle.match; m.f[0].mom = 100; m.f[0].x = -0.8; m.f[0].z = 0; m.f[1].x = 0.5; m.f[1].z = 0; });
  await p.keyboard.down('KeyF'); await sleep(60); await p.keyboard.up('KeyF'); await sleep(2600); await shot('1_despedido');
  console.log('banned:', await ev(p, () => window.__hoyo.battle.match.f[1].banned), 'msg:', await ev(p, () => document.querySelector('.msgs')?.textContent));
  // el despedido intenta volver al ring: debe ser imposible
  await ev(p, () => { const m = window.__hoyo.battle.match; });
  await sleep(11000);
  console.log('over:', await ev(p, () => window.__hoyo.battle.match.over), 'reason:', await ev(p, () => window.__hoyo.battle.match.reason), 'fired:', await ev(p, () => window.__hoyo.battle.match.summary().fired));
  await shot('2_fin');
  await sleep(6000);
  console.log('resultados:', await ev(p, () => document.querySelector('.rreason')?.textContent), '|', await ev(p, () => [...document.querySelectorAll('.ach b')].map((x) => x.textContent).join(', ')));
  await shot('3_resultados');
});
console.log(logs.join('\n') || 'sin errores');
await b.close();
