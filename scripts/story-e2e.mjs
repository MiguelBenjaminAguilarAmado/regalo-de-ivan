// Recorre TODO el modo Historia automáticamente (escenas, elecciones, combates simulados) por una ruta.
// Uso: node scripts/story-e2e.mjs <elso|pablo> [indice-final=0]   (requiere `npm run dev` en :5173)
import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const route = process.argv[2] === 'pablo' ? 1 : 0;
const finalIdx = Number(process.argv[3] ?? 0);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 120000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--window-size=1280,720'] });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 720 });
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
await p.goto('http://localhost:5173/?q=baja', { waitUntil: 'load' });
await sleep(2000);
await p.evaluate(() => { document.querySelector('.title').click(); });
await sleep(500);
await p.evaluate(() => { __hoyo.save.story = undefined; __hoyo.screens.showStoryMenu(); });
await sleep(400);
const log = [];
let steps = 0;
for (; steps < 3000; steps++) {
  const st = await p.evaluate((route, finalIdx) => {
    const g = __hoyo;
    const scr = document.querySelector('.screen');
    const cls = scr ? scr.className : '';
    const chId = g.story?.chapter?.id;
    if (g.battle && g.battle.phase !== 'over' && g.mode === 'historia') {
      const b = g.battle;
      g.onBattleEnd({ summary: { winner: 0, reason: 'pin', time: 60, fired: false, finisherId: [], damageTaken: [10, 50], finishersLanded: [0, 0], taunts: [0, 0], hpPct: [0.6, 0], subs: [0, 0] }, opts: b.opts });
      b.dispose(); g.battle = null;
      return 'battle:' + b.opts.c.id + '@' + b.opts.arena;
    }
    if (cls.includes('storyscene')) {
      const ch = document.querySelectorAll('.dchoice');
      if (ch.length) { let i = 0; if (chId === 'yosuke') i = Math.min(route, ch.length - 1); else if (chId === 'final') i = Math.min(finalIdx, ch.length - 1); ch[i].click(); return 'choice:' + chId + ':' + i; }
      document.querySelector('.dbox')?.click();
      return 'scene';
    }
    if (cls.includes('vsscreen')) { scr.click(); return 'vs'; }
    if (cls.includes('storymenu')) {
      const partner = [...document.querySelectorAll('.mapcard')].find((c) => /Compañero|DÚO/.test(c.textContent) && !document.querySelector('.options'));
      if (partner) { partner.click(); return 'partner'; }
      const go = document.querySelector('.go');
      if (go && /HISTORIA|CONTINUAR|EMPEZAR/i.test(go.textContent) && !/completada/i.test(go.textContent)) { go.click(); return 'menu-go'; }
      return 'DONE:' + JSON.stringify(g.save.story);
    }
    if (cls.includes('results')) { const go = document.querySelector('.go'); go?.click(); return 'results:' + document.querySelector('.rtitle')?.textContent; }
    return 'wait:' + cls;
  }, route, finalIdx);
  if (st.startsWith('DONE')) { log.push(st); break; }
  if (!log.length || log[log.length - 1] !== st) log.push(st);
  await sleep(st === 'scene' ? 60 : 250);
}
console.log(log.filter((l) => !l.startsWith('wait') && l !== 'scene').join('\n'));
console.log('pasos', steps, 'errores', errors.slice(0, 5));
const save = await p.evaluate(() => JSON.stringify({ story: __hoyo.save.story, ach: Object.keys(__hoyo.save.achievements) }));
console.log(save);
await b.close();
