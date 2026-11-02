import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 30000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 720 });
p.on('pageerror', (e) => console.log('PAGEERROR', e.message.slice(0, 300)));
p.on('console', (m) => { if (m.type() === 'error') console.log('console.error', m.text().slice(0, 200)); });
p.on('error', (e) => console.log('CRASH', e.message));
await p.goto('http://localhost:5173/?auto=pablo%20motos,elso,matamoros,intermedia&q=baja', { waitUntil: 'load' });
await sleep(1500);
await p.evaluate(() => { const g = window.__hoyo; g.battle.aiC.update = () => ({ mx: 0, mz: 0, light: false, heavy: false, grab: false, taunt: false, finisher: false, block: false, run: false }); g.battle.match.f[0].data.moves.heavyRandom = [['tanque', 1]]; });
await sleep(6000);
await p.evaluate(() => { const m = window.__hoyo.battle.match; m.f[0].x = -0.6; m.f[1].x = 0.6; m.f[0].z = 0; m.f[1].z = 0; });
await p.keyboard.down('KeyK'); await sleep(50); await p.keyboard.up('KeyK');
for (let i = 0; i < 8; i++) { await sleep(250); try { console.log(i, await p.evaluate(() => { const m = window.__hoyo.battle.match; return [m.time.toFixed(2), m.f[0].state, m.f[1].state, m.f[1].x.toFixed(1)].join(' '); })); } catch (e) { console.log('dead', e.message.slice(0, 80)); break; } }
await b.close().catch(() => {});
