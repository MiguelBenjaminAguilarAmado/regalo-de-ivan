import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dir = process.argv[2];
const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 90000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 720 });
p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await p.goto('http://localhost:5173/?q=baja', { waitUntil: 'load' });
await sleep(2500);
await p.evaluate(() => document.querySelector('.title').click()); await sleep(600);
const fake = (win) => ({ summary: { winner: win ? 0 : 1, reason: 'pin', time: 70, fired: false, finisherId: [], damageTaken: [30, 50], finishersLanded: [1, 0], taunts: [2, 0], hpPct: [0.6, 0], subs: [0, 0] }, opts: window.__hoyo.tour ? { p: window.__hoyo.roster[0], c: window.__hoyo.roster.find((r) => r.id === window.__hoyo.tour.bracket.rounds[window.__hoyo.tour.bracket.round].flatMap((x) => [x.a, x.b]).find((id) => id !== 'elso')), difficulty: 'facil' } : null });
await p.evaluate(() => window.__hoyo.startTournament('elso', 'facil')); await sleep(900);
const state = () => p.evaluate(() => { const t = window.__hoyo.tour.bracket; return { round: t.round, elim: t.eliminated, champ: t.champion, screen: document.querySelector('.screen')?.className }; });
console.log('inicio', await state());
for (let r = 0; r < 2; r++) {
  await p.evaluate(() => { const g = window.__hoyo; const t = g.tour.bracket; const o = g.roster.find((x) => x.id !== 'elso'); g.onBattleEnd({ summary: { winner: 0, reason: 'pin', time: 70, fired: false, finisherId: [], damageTaken: [30, 50], finishersLanded: [1, 0], taunts: [2, 0], hpPct: [0.6, 0], subs: [0, 0] }, opts: { p: g.roster[0], c: o, arena: 'matamoros', difficulty: 'facil' } }); });
  await sleep(700);
  console.log('tras ganar ronda', r, await state(), await p.evaluate(() => [...document.querySelectorAll('.btn')].map((x) => x.textContent).join(' | ')));
  await p.screenshot({ path: `${dir}/tour_res_${r}.png` });
  await p.evaluate(() => document.querySelector('.go')?.click()); await sleep(900);
  await p.screenshot({ path: `${dir}/tour_bracket_${r}.png` });
}
console.log('final', await state(), 'torneos ganados:', await p.evaluate(() => JSON.stringify(window.__hoyo.save.tournaments)), 'agil desbloqueado:', await p.evaluate(() => window.__hoyo.isUnlocked(window.__hoyo.roster.find((x) => x.id === 'agil'))));
await b.close();
