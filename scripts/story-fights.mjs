// Juega de verdad (CPU vs CPU) combates de la historia con tiempo límite y jefe con fases. Requiere `npm run dev` en :5173.
import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 120000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 });
const errors = []; p.on('pageerror', (e) => errors.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await p.goto('http://localhost:5173/?q=baja', { waitUntil: 'load' }); await sleep(2000);
await p.evaluate(() => document.querySelector('.title').click()); await sleep(500);
for (const [chId, idx, tl, bossAt] of [['azotea', 0, 10, null], ['final', 0, 14, 0.98], ['oficina', 0, 14, 0.98]]) {
  const r = await p.evaluate(async (chId, idx, tl, bossAt) => {
    const g = __hoyo;
    const { CHAPTERS } = await import('/content/historia.ts');
    const ch = CHAPTERS.find((c) => c.id === chId);
    const fights = ch.fights.filter((f) => !f.if || (Array.isArray(f.if) ? f.if[1] === 'elso' : true));
    g.mode = 'historia'; g.story = { chapter: ch, fights, fi: idx, hp: null, hpBefore: null };
    const opts = g.storyOpts(g.story, fights[idx]);
    opts.demo = true; if (tl) opts.timeLimit = tl; if (bossAt && opts.boss) opts.boss = { ...opts.boss, at: bossAt };
    g.startBattle(opts);
    await new Promise((r) => setTimeout(r, 1000));
    const m = g.battle.match;
    const types = [];
    const t0 = performance.now();
    while (!m.over && performance.now() - t0 < 40000) { await new Promise((r) => setTimeout(r, 400)); }
    return { chId, over: m.over, reason: m.reason, winner: m.winner, time: Math.round(m.time), boss: m.boss?.done, obj: opts.objective };
  }, chId, idx, tl, bossAt);
  console.log(JSON.stringify(r));
}
console.log('errores', errors.slice(0, 5));
await b.close();
