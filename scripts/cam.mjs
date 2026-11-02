import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const [query, out, px, py, pz, lx, ly, lz, fov = '45'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 90000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--window-size=1280,720'] });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 720 });
p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await p.goto('http://localhost:5173/' + query, { waitUntil: 'load' });
await sleep(4000);
await p.evaluate((a) => {
  const g = window.__hoyo; g.battle.view.cam.update = () => {}; g.hud.hide();
  const c = g.stage.camera; c.fov = +a[6]; c.updateProjectionMatrix(); c.position.set(+a[0], +a[1], +a[2]); c.lookAt(+a[3], +a[4], +a[5]);
}, [px, py, pz, lx, ly, lz, fov]);
await sleep(1200);
await p.screenshot({ path: out });
await b.close();
