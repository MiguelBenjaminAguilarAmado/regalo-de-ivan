import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dir = process.argv[2];
const moves = (process.argv[3] || 'momia,tanque,casco_romano,microfonazo').split(',');
async function one(mv) {
  const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 90000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720'] });
  try { await one2(b, mv); } finally { await b.close().catch(() => {}); }
}
async function one2(b, mv) {
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 720 });
  p.on('pageerror', (e) => console.log(mv, 'PAGEERROR', e.message.slice(0, 200)));
  await p.goto('http://localhost:5173/?auto=pablo%20motos,elso,matamoros,intermedia&q=alta', { waitUntil: 'load' });
  await sleep(1500);
  await p.evaluate((mv) => { const g = window.__hoyo; g.battle.aiC.update = () => ({ mx: 0, mz: 0, light: false, heavy: false, grab: false, taunt: false, finisher: false, block: false, run: false }); g.battle.match.f[0].data.moves.heavyRandom = [[mv, 1]]; }, mv);
  await sleep(6000);
  await p.evaluate(() => { const m = window.__hoyo.battle.match; m.f[0].x = -0.6; m.f[1].x = 0.6; m.f[0].z = 0; m.f[1].z = 0; });
  await p.keyboard.down('KeyK'); await sleep(50); await p.keyboard.up('KeyK');
  await sleep(mv === 'tanque' ? 1000 : 600);
  await p.screenshot({ path: `${dir}/pm_${mv}_1.png` });
  await sleep(mv === 'tanque' ? 500 : 500);
  await p.screenshot({ path: `${dir}/pm_${mv}_2.png` });
  const r = await p.evaluate(() => { const m = window.__hoyo.battle.match; return { hp: Math.round(m.f[1].hp), st: m.f[1].state, y: m.f[1].inRing, x: m.f[1].x.toFixed(1) }; });
  console.log(mv, JSON.stringify(r));
  await p.close();
}
for (const mv of moves) { for (let i = 0; i < 3; i++) { try { await one(mv); break; } catch (e) { console.log(mv, 'reintento', e.message.slice(0, 60)); } } }
