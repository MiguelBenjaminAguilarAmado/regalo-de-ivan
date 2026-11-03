// Prueba las interacciones del mundo abierto (tienda, gimnasio, misiones, combate, minijuego, taxi, historia). Requiere `npm run dev` en :5173.
import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 120000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--window-size=1280,720'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 });
const errors = []; p.on('pageerror', (e) => errors.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await p.goto('http://localhost:5173/?q=baja', { waitUntil: 'load' }); await sleep(2000);
await p.evaluate(() => document.querySelector('.title').click()); await sleep(500);
const ev = (fn, ...a) => p.evaluate(fn, ...a);
const log = (...a) => console.log(...a);
await ev(() => { __hoyo.save.world = undefined; __hoyo.save.story = undefined; __hoyo.enterWorld(); __hoyo.world.progress.flags.world_intro = true; });
await sleep(1500);
const poi = (id) => `window.__P = (await import('/content/mundo.ts')).POIS.find(p => p.id === '${id}')`;
// --- tienda
log('tienda', await ev(async () => { const w = __hoyo.world; const { POIS } = await import('/content/mundo.ts'); w.usePoi(POIS.find(p => p.id === 'tienda')); await new Promise(r => setTimeout(r, 300)); const before = w.progress.money; const btn = [...document.querySelectorAll('.wrow .btn')].find(b => /80 Hoyos/.test(b.textContent)); btn?.click(); await new Promise(r => setTimeout(r, 200)); const r = [before, w.progress.money, w.progress.inventory]; w.ui.closeModal(); return JSON.stringify(r); }));
// --- gimnasio
log('gimnasio', await ev(async () => { const w = __hoyo.world; const { POIS } = await import('/content/mundo.ts'); w.usePoi(POIS.find(p => p.id === 'gimnasio')); await new Promise(r => setTimeout(r, 300)); document.querySelector('.wrow .btn')?.click(); await new Promise(r => setTimeout(r, 200)); const r = [w.progress.attrs, w.progress.points, w.progress.money]; w.ui.closeModal(); return JSON.stringify(r); }));
// --- historia desbloquea misiones: hablar con Petisui
log('mision', await ev(async () => { const w = __hoyo.world; __hoyo.save.story = { done: ['fichaje'], flags: {}, endings: [] }; const { NPCS } = await import('/content/mundo-npc.ts'); w.talkTo(NPCS.find(n => n.id === 'petisui')); for (let i = 0; i < 30 && !w.progress.quests.silla; i++) { document.querySelector('.dbox')?.click(); await new Promise(r => setTimeout(r, 120)); } await new Promise(r => setTimeout(r, 400)); return JSON.stringify(w.progress.quests); }));
log('mision-visit', await ev(async () => { const w = __hoyo.world; const { POIS } = await import('/content/mundo.ts'); w.usePoi(POIS.find(p => p.id === 'fuente')); for (let i = 0; i < 30 && !document.querySelector('.dbox'); i++) await new Promise(r => setTimeout(r, 100)); for (let i = 0; i < 20 && document.querySelector('.dbox'); i++) { document.querySelector('.dbox')?.click(); await new Promise(r => setTimeout(r, 100)); } return JSON.stringify(w.progress.quests.silla); }));
// --- minijuego (pulso): machacar espacio
log('pulso', await (async () => {
  await ev(async () => { const w = __hoyo.world; const { POIS } = await import('/content/mundo.ts'); w.usePoi(POIS.find(p => p.id === 'bar_pulso')); });
  await sleep(500); await p.keyboard.press('Space'); await sleep(300);
  for (let i = 0; i < 160; i++) { await p.keyboard.press('Space'); await sleep(35); }
  await sleep(500);
  const txt = await ev(() => document.querySelector('.mini-result')?.textContent ?? 'sin resultado');
  await ev(() => document.querySelector('.mini-result .btn')?.click()); await sleep(400);
  return txt;
})());
// --- taxi
log('taxi', await ev(async () => { const w = __hoyo.world; const { POIS } = await import('/content/mundo.ts'); const m0 = w.progress.money; w.usePoi(POIS.find(p => p.id === 'taxi_plaza')); await new Promise(r => setTimeout(r, 300)); [...document.querySelectorAll('.wrow')].find(r => /Playa/.test(r.textContent))?.querySelector('.btn')?.click(); await new Promise(r => setTimeout(r, 500)); return [m0, w.progress.money, w.view.district].join(' '); }));
// --- combate callejero: retar a Elso (playa) y simular la victoria
log('combate', await ev(async () => {
  const w = __hoyo.world; const { NPCS } = await import('/content/mundo-npc.ts');
  const m0 = w.progress.money; w.challenge(NPCS.find(n => n.id === 'elso'));
  for (let i = 0; i < 40 && !document.querySelector('.vsscreen') && !__hoyo.battle; i++) await new Promise(r => setTimeout(r, 100));
  for (let i = 0; i < 60 && !__hoyo.battle; i++) await new Promise(r => setTimeout(r, 100));
  const b = __hoyo.battle; const opts = b.opts;
  __hoyo.onBattleEnd({ summary: { winner: 0, reason: 'pin', time: 60, fired: false, finisherId: [], damageTaken: [10, 50], finishersLanded: [0, 0], taunts: [0, 0], hpPct: [0.7, 0], subs: [0, 0] }, opts });
  await new Promise(r => setTimeout(r, 400));
  const res = document.querySelector('.rpanel')?.textContent?.slice(0, 160);
  [...document.querySelectorAll('.btn')].find(x => /Volver al mundo/.test(x.textContent))?.click();
  await new Promise(r => setTimeout(r, 1500));
  return JSON.stringify({ res, money: [m0, w.progress.money], active: w.active, cards: w.progress.cards, level: w.progress.level, mode: __hoyo.mode });
}));
// --- historia desde el mundo
log('historia', await ev(async () => {
  const w = __hoyo.world; const { POIS } = await import('/content/mundo.ts');
  __hoyo.save.story = undefined; w.startChapter('fichaje');
  await new Promise(r => setTimeout(r, 300));
  [...document.querySelectorAll('.btn')].find(x => /Empezar cap/.test(x.textContent))?.click();
  await new Promise(r => setTimeout(r, 800));
  return [w.active, __hoyo.mode, __hoyo.storyReturn, document.querySelector('.screen')?.className].join(' ');
}));
log('errores', errors.slice(0, 6));
await b.close();
