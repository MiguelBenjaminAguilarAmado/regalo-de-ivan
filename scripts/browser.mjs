import fs from 'node:fs';
/** Busca un navegador Chromium para las pruebas visuales (o usa la variable CHROMIUM). */
export const browserPath = () => {
  const c = [process.env.CHROMIUM, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Dia.app/Contents/MacOS/Dia', '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', '/usr/bin/google-chrome', '/usr/bin/chromium'];
  const f = c.find((x) => x && fs.existsSync(x));
  if (!f) throw new Error('No encuentro un navegador Chromium. Define CHROMIUM=/ruta/al/ejecutable');
  return f;
};
