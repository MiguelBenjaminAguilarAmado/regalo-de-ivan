import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const exe = browserPath();
const dir = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: exe, headless: 'new', protocolTimeout: 90000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720'] });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 720 });
const logs = [];
p.on('console', (m) => { const t = m.text(); if ((m.type() === 'error' || m.type() === 'warning') && !t.includes('AudioContext')) logs.push(m.type() + ': ' + t.slice(0, 200)); });
p.on('pageerror', (e) => logs.push('PAGEERROR: ' + e.message.slice(0, 300)));
await p.goto('http://localhost:5173/?q=baja', { waitUntil: 'load' });
await sleep(2500);
const shot = (n) => p.screenshot({ path: `${dir}/e2e_${n}.png` });
const ev = (f) => p.evaluate(f);
const click = (sel, i = 0) => p.evaluate((s, k) => document.querySelectorAll(s)[k]?.click(), sel, i);

await click('.title'); await sleep(800);
await click('.menu-list button', 0); await sleep(1500);   // Versus
await click('.tile', 1); await sleep(500);               // CPU = Petisui
await click('.go'); await sleep(1200);                    // A luchar → diálogo
console.log('pantalla:', await ev(() => document.querySelector('.screen')?.className));
await shot('1_dialogo');
for (let i = 0; i < 12 && (await ev(() => !!document.querySelector('.dialogue'))); i++) { await p.keyboard.press('Space'); await sleep(250); await p.keyboard.press('Space'); await sleep(250); }
console.log('pantalla:', await ev(() => document.querySelector('.screen')?.className));
await shot('2_vs');
await sleep(3300);
console.log('en combate:', await ev(() => !!window.__hoyo.battle), 'fase:', await ev(() => window.__hoyo.battle?.phase));
await sleep(3500);
console.log('fase:', await ev(() => window.__hoyo.battle?.phase));
// CPU desactivada para probar de forma determinista
await ev(() => { window.__hoyo.battle.aiC.update = () => ({ mx: 0, mz: 0, light: false, heavy: false, grab: false, taunt: false, finisher: false, block: false, run: false }); });
// acercar a los luchadores y pelear con el teclado
await ev(() => { const m = window.__hoyo.battle.match; m.f[0].x = -0.5; m.f[0].z = 0; m.f[1].x = 0.5; m.f[1].z = 0; });
const hp0 = await ev(() => window.__hoyo.battle.match.f[1].hp);
for (let i = 0; i < 6; i++) { await p.keyboard.press('KeyJ'); await sleep(330); }
await p.keyboard.press('KeyK'); await sleep(900);
const st = await ev(() => { const m = window.__hoyo.battle.match; return { hp1: m.f[1].hp, st0: m.f[0].st, mom0: m.f[0].mom, state0: m.f[0].state, state1: m.f[1].state }; });
console.log('hp rival antes/después:', hp0.toFixed(1), '→', st.hp1.toFixed(1), JSON.stringify(st));
await shot('3_pelea');
// movimiento con teclado (relativo a cámara)
const x0 = await ev(() => window.__hoyo.battle.match.f[0].x + ',' + window.__hoyo.battle.match.f[0].z);
await p.keyboard.down('KeyW'); await sleep(900); await p.keyboard.up('KeyW');
const x1 = await ev(() => window.__hoyo.battle.match.f[0].x + ',' + window.__hoyo.battle.match.f[0].z);
console.log('posición tras pulsar W:', x0, '→', x1);
// pausa
await p.keyboard.press('Escape'); await sleep(500);
console.log('pausa visible:', await ev(() => !!document.querySelector('.pause')), 'paused:', await ev(() => window.__hoyo.battle.paused));
await shot('4_pausa');
await p.keyboard.press('Escape'); await sleep(400);
// terminar el combate: dejar casi sin vida al rival y pegarle
await ev(() => { const m = window.__hoyo.battle.match; m.f[1].hp = 3; m.f[0].x = -0.6; m.f[0].z = 0; m.f[1].x = 0.4; m.f[1].z = 0; m.f[1].state = 'down'; m.f[1].t = 0; m.f[1].dur = 30; });
await sleep(300);
await p.keyboard.press('KeyL'); // pin
await sleep(4500);
console.log('over:', await ev(() => window.__hoyo.battle.match.over), 'motivo:', await ev(() => window.__hoyo.battle.match.reason));
await shot('5_final');
await sleep(5500);
console.log('pantalla final:', await ev(() => document.querySelector('.screen')?.className));
await shot('6_resultados');
console.log(logs.slice(0, 10).join('\n') || 'sin errores');
await b.close();
