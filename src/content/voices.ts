/**
 * ===== Voces de los personajes =====
 * Algunos luchadores hablan a su manera, en TODOS los textos del juego (historia, ciudad, combates):
 *  - Pepe the Gay Dragon cecea con zetas: «Ola chicoz, soy yo ¡Pepe! que paza chavalez».
 *  - Elso habla como un catracho: maje, vos, púchica, pisto, cipote, va pues…
 * Para que una frase NO se transforme, empiézala con «=» (se quita al mostrarla).
 */

const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; };
const keepCase = (from: string, to: string) => (from[0] === from[0].toUpperCase() ? to[0].toUpperCase() + to.slice(1) : to);

/** Pepe: la «s» se vuelve «z» (menos al principio de palabra) y «hola» pierde la hache */
export function pepe(text: string): string {
  return text
    .replace(/\b([Hh])ola\b/g, (_m, h: string) => (h === 'H' ? 'Ola' : 'ola'))
    .replace(/([a-záéíóúñü])s/g, '$1z')
    .replace(/([a-záéíóúñü])S/g, '$1Z')
    .replace(/\bchavales\b/gi, 'chavalez');
}

const ELSO_WORDS: [RegExp, string][] = [
  [/\btú eres\b/gi, 'vos sos'], [/\beres\b/gi, 'sos'], [/\btienes\b/gi, 'tenés'], [/\bpuedes\b/gi, 'podés'], [/\bquieres\b/gi, 'querés'],
  [/\bsabes\b/gi, 'sabés'], [/\bvienes\b/gi, 'venís'], [/\bmira\b/gi, 'mirá'], [/\boye\b/gi, 'oí'], [/\bven\b/gi, 'vení'],
  [/\btú\b/gi, 'vos'], [/\bchaval(es)?\b/gi, 'cipote$1'], [/\bchico\b/gi, 'cipote'], [/\btío\b/gi, 'maje'], [/\bamigos?\b/gi, 'alero'],
  [/\bdinero\b/gi, 'pisto'], [/\btrabajo\b/gi, 'chamba'], [/\bgenial\b/gi, 'macizo'], [/\bguay\b/gi, 'tuanis'], [/\bvale\b/gi, 'va pues'],
  [/\b¡?venga!?\b/gi, '¡dale pues!'], [/\bniño\b/gi, 'bicho'], [/\bmucho\b/gi, 'un vergo'],
];
const ELSO_PRE = ['Púchica, maje: ', 'Mirá vos, ', '¡A la gran puchica! ', 'Ideay, ', 'Cheque, '];
const ELSO_POST = [' ¿Va pues?', ' Así de macizo, maje.', ' Ni modo.', ' ¡Catracho hasta la muerte!', ' Ya rugiste.'];

/** Elso: jerga hondureña (voseo y muletillas catrachas) */
export function elso(text: string): string {
  let t = text;
  for (const [re, to] of ELSO_WORDS) t = t.replace(re, (m) => keepCase(m.replace(/^¡/, ''), to));
  const h = hash(text);
  if (h % 3 === 0 && !/^[¡¿A-ZÁÉÍÓÚ]*(Púchica|Mirá|Ideay|Cheque)/.test(t)) t = ELSO_PRE[h % ELSO_PRE.length] + t[0].toLowerCase() + t.slice(1);
  if (h % 4 === 1 && /[.!]$/.test(t)) t += ELSO_POST[(h >> 3) % ELSO_POST.length];
  return t;
}

/** Aplica la voz de quien habla */
export function voice(who: string, text: string): string {
  if (text.startsWith('=')) return text.slice(1);
  if (who === 'pepe the gay dragon') return pepe(text);
  if (who === 'elso') return elso(text);
  return text;
}
