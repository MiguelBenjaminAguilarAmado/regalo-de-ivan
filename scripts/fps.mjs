import puppeteer from 'puppeteer-core';
import { browserPath } from './browser.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: browserPath(), headless: 'new', protocolTimeout: 120000, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--no-sandbox', '--disable-frame-rate-limit', '--disable-gpu-vsync'] });
for (const [arena, q] of [['matamoros', 'alta'], ['manchester', 'alta'], ['matamoros', 'media'], ['manchester', 'baja']]) {
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 720 });
  await p.goto(`http://localhost:5173/?auto=elso,petisui,${arena},intermedia&demo=1&q=${q}`, { waitUntil: 'load' });
  await sleep(7000);
  const r = await p.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 4000) requestAnimationFrame(f); else res({ fps: n / 4, scale: window.__hoyo.perf.dprScale, calls: window.__hoyo.stage.renderer.info.render.calls, tris: window.__hoyo.stage.renderer.info.render.triangles }); }; requestAnimationFrame(f); }));
  console.log(arena, q, JSON.stringify(r));
  await p.close();
}
await b.close();
