import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function run() {
  const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 90000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  try {
    const p = await b.newPage();
    await p.setViewport({ width: 1280, height: 720 });
    await p.evaluateOnNewDocument(() => {
      const mk = () => ({ id: 'Mock Pad (Standard Gamepad)', index: 0, connected: true, mapping: 'standard', axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })) });
      window.__pad = mk();
      navigator.getGamepads = () => [window.__pad, null, null, null];
      window.__press = async (i, ms = 90) => { window.__pad.buttons[i] = { pressed: true, value: 1 }; await new Promise((r) => setTimeout(r, ms)); window.__pad.buttons[i] = { pressed: false, value: 0 }; await new Promise((r) => setTimeout(r, 90)); };
    });
    const logs = [];
    p.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message.slice(0, 300)));
    await p.goto('http://localhost:5173/?q=baja', { waitUntil: 'load' });
    await sleep(2500);
    const press = (i, ms) => p.evaluate((a, b) => window.__press(a, b), i, ms);
    const info = () => p.evaluate(() => ({ screen: document.querySelector('.screen')?.className, focus: document.activeElement?.textContent?.slice(0, 22) ?? null, tag: document.activeElement?.tagName }));
    console.log('1 título', (await info()).screen);
    await press(0); await sleep(700);
    console.log('2 tras A en el título →', (await info()).screen, '| foco:', (await info()).tag);
    await press(13); await sleep(200);
    console.log('3 cruceta abajo →', (await info()).focus);
    await press(13); await sleep(200); await press(13); await sleep(200);
    console.log('4 abajo x2 →', (await info()).focus);
    await press(0); await sleep(1400);
    console.log('5 A →', await p.evaluate(() => document.querySelector('.topbar h2')?.textContent));
    await press(1); await sleep(900);
    console.log('6 B (volver) →', (await info()).screen);
    // combate
    await p.evaluate(() => window.__hoyo.startBattle({ p: window.__hoyo.roster[0], c: window.__hoyo.roster[1], arena: 'matamoros', difficulty: 'facil' }));
    await sleep(1000);
    await p.evaluate(() => { window.__hoyo.battle.aiC.update = () => ({ mx: 0, mz: 0, light: false, heavy: false, grab: false, taunt: false, finisher: false, block: false, run: false }); });
    await sleep(2800);
    const st = () => p.evaluate(() => { const f = window.__hoyo.battle.match.f[0]; return f.state + ' x=' + f.x.toFixed(2) + ' z=' + f.z.toFixed(2); });
    console.log('7 fase', await p.evaluate(() => window.__hoyo.battle.phase), '|', await st());
    await p.evaluate(() => { const m = window.__hoyo.battle.match; m.f[0].x = -0.5; m.f[1].x = 0.5; m.f[0].z = 0; m.f[1].z = 0; });
    const hp0 = await p.evaluate(() => window.__hoyo.battle.match.f[1].hp);
    await press(0, 60); await sleep(120); await press(0, 60); await sleep(300);
    await press(2, 60); await sleep(1000);
    console.log('8 A, A, X → vida rival', hp0.toFixed(1), '→', (await p.evaluate(() => window.__hoyo.battle.match.f[1].hp)).toFixed(1));
    await p.evaluate(() => { window.__pad.axes[0] = 1; }); await sleep(900); await p.evaluate(() => { window.__pad.axes[0] = 0; });
    console.log('9 stick →', await st());
    await p.evaluate(() => { window.__pad.buttons[4] = { pressed: true, value: 1 }; }); await sleep(250);
    console.log('10 LB guardia →', await st(), '| blocking', await p.evaluate(() => window.__hoyo.battle.match.f[0].blocking));
    await p.evaluate(() => { window.__pad.buttons[4] = { pressed: false, value: 0 }; }); await sleep(200);
    await press(9); await sleep(500);
    console.log('11 Start → pausa:', await p.evaluate(() => !!document.querySelector('.pause.overlay')), 'paused', await p.evaluate(() => window.__hoyo.battle.paused));
    await sleep(300); await press(9); await sleep(600);
    console.log('12 Start otra vez → pausa:', await p.evaluate(() => !!document.querySelector('.pause.overlay')), 'paused', await p.evaluate(() => window.__hoyo.battle.paused));
    await sleep(500);
    console.log('13 sigue sin pausarse sola:', await p.evaluate(() => window.__hoyo.battle.paused));
    console.log('mando conectado:', await p.evaluate(() => window.__hoyo.input.padConnected), '| pista:', await p.evaluate(() => document.querySelector('.hint')?.textContent?.slice(0, 60)));
    console.log(logs.join('\n') || 'sin errores');
  } finally { await b.close().catch(() => {}); }
}
for (let i = 0; i < 5; i++) { try { await run(); break; } catch (e) { console.log('reintento', e.message.slice(0, 70)); } }
