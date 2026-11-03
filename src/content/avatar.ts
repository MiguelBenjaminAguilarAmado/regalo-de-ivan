import type { Appearance } from '../combat/types';

const hex = (n: number) => '#' + n.toString(16).padStart(6, '0');
const cache = new Map<string, string>();

/**
 * Foto de perfil generada para los luchadores sin imagen (los de la historia): retrato de estudio dibujado en un
 * canvas con los colores de su aspecto (piel, pelo, ropa, máscara, sombrero). Devuelve null si no hay DOM (tests).
 */
export function makeAvatar(ap: Appearance, key: string): string | null {
  if (typeof document === 'undefined') return null;
  const hit = cache.get(key);
  if (hit) return hit;
  const S = 256;
  const c = document.createElement('canvas'); c.width = S; c.height = S;
  const g = c.getContext('2d');
  if (!g) return null;
  // fondo: foco de ring
  const bg = g.createRadialGradient(S / 2, S * 0.35, 10, S / 2, S * 0.5, S * 0.8);
  bg.addColorStop(0, hex(ap.accent)); bg.addColorStop(0.35, '#3a1216'); bg.addColorStop(1, '#0b0908');
  g.fillStyle = bg; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 7; i++) { g.fillStyle = `rgba(255,255,255,${0.03 + i * 0.004})`; g.beginPath(); g.moveTo(S * 0.5, 0); g.lineTo(S * (0.05 + i * 0.15), S); g.lineTo(S * (0.12 + i * 0.15), S); g.closePath(); g.fill(); }
  const skin = hex(ap.skin);
  // torso / hombros
  g.fillStyle = hex(ap.outfit === 'desnudo' ? ap.skin : ap.outfitColor);
  g.beginPath(); g.moveTo(S * 0.08, S); g.quadraticCurveTo(S * 0.1, S * 0.68, S * 0.34, S * 0.64); g.lineTo(S * 0.66, S * 0.64); g.quadraticCurveTo(S * 0.9, S * 0.68, S * 0.92, S); g.closePath(); g.fill();
  if (ap.outfit === 'traje' || ap.outfit === 'blazer') { g.fillStyle = '#f2f2f6'; g.beginPath(); g.moveTo(S * 0.44, S * 0.64); g.lineTo(S * 0.56, S * 0.64); g.lineTo(S * 0.5, S * 0.9); g.closePath(); g.fill(); g.fillStyle = hex(ap.accent); g.fillRect(S * 0.485, S * 0.68, S * 0.03, S * 0.2); }
  if (ap.outfit === 'sudadera') { g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.arc(S / 2, S * 0.64, S * 0.2, Math.PI, 0); g.fill(); }
  // cuello y cabeza
  g.fillStyle = skin; g.fillRect(S * 0.43, S * 0.5, S * 0.14, S * 0.18);
  const head = () => { g.beginPath(); g.ellipse(S / 2, S * 0.38, S * 0.17, S * 0.2, 0, 0, Math.PI * 2); };
  head(); g.fill();
  if (!ap.mask) {
    // pelo
    if (ap.hair != null) { g.fillStyle = hex(ap.hair); g.beginPath(); g.ellipse(S / 2, S * 0.27, S * 0.185, S * 0.12, 0, Math.PI, 0); g.fill(); g.fillRect(S * 0.315, S * 0.27, S * 0.04, S * 0.1); g.fillRect(S * 0.645, S * 0.27, S * 0.04, S * 0.1); }
    // ojos, cejas y boca
    g.fillStyle = '#fff'; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(S / 2 + sx * S * 0.07, S * 0.38, S * 0.03, S * 0.02, 0, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = '#1b1410'; for (const sx of [-1, 1]) { g.beginPath(); g.arc(S / 2 + sx * S * 0.07, S * 0.38, S * 0.012, 0, Math.PI * 2); g.fill(); g.fillRect(S / 2 + sx * S * 0.07 - S * 0.03, S * 0.335, S * 0.06, S * 0.012); }
    g.strokeStyle = '#6a2d2d'; g.lineWidth = 3; g.beginPath(); g.moveTo(S * 0.44, S * 0.49); g.quadraticCurveTo(S / 2, S * 0.52, S * 0.56, S * 0.49); g.stroke();
    if (ap.beard != null) { g.fillStyle = hex(ap.beard); g.beginPath(); g.ellipse(S / 2, S * 0.5, S * 0.14, S * 0.09, 0, 0, Math.PI); g.fill(); }
    if (ap.glasses) { g.strokeStyle = ap.glasses === 'sol' ? '#000' : '#c9ccd2'; g.lineWidth = 3; for (const sx of [-1, 1]) g.strokeRect(S / 2 + sx * S * 0.07 - S * 0.045, S * 0.355, S * 0.09, S * 0.055); if (ap.glasses === 'sol') { g.fillStyle = '#000'; for (const sx of [-1, 1]) g.fillRect(S / 2 + sx * S * 0.07 - S * 0.045, S * 0.355, S * 0.09, S * 0.055); } }
  } else {
    // máscara genérica a color
    g.fillStyle = hex(ap.maskColor ?? ap.accent); head(); g.fill();
    g.fillStyle = '#000'; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(S / 2 + sx * S * 0.07, S * 0.37, S * 0.035, S * 0.028, 0, 0, Math.PI * 2); g.fill(); }
  }
  // sombrero / gorra
  if (ap.hat) {
    g.fillStyle = hex(ap.hat.color);
    if (ap.hat.kind === 'sombrero' || ap.hat.kind === 'tricornio') { g.fillRect(S * 0.2, S * 0.22, S * 0.6, S * 0.035); g.beginPath(); g.ellipse(S / 2, S * 0.2, S * 0.13, S * 0.08, 0, Math.PI, 0); g.fill(); }
    else { g.beginPath(); g.ellipse(S / 2, S * 0.26, S * 0.18, S * 0.11, 0, Math.PI, 0); g.fill(); g.fillRect(S * 0.5, S * 0.255, S * 0.25, S * 0.03); }
  }
  // cresta / pelo largo
  if (ap.hairStyle === 'cresta' && ap.hair != null) { g.fillStyle = hex(ap.hair); g.fillRect(S * 0.42, S * 0.02, S * 0.16, S * 0.22); }
  if (ap.belt != null) { g.fillStyle = '#d8b43a'; g.fillRect(S * 0.42, S * 0.9, S * 0.16, S * 0.1); }
  // viñeta
  const vg = g.createRadialGradient(S / 2, S / 2, S * 0.4, S / 2, S / 2, S * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.55)');
  g.fillStyle = vg; g.fillRect(0, 0, S, S);
  const url = c.toDataURL('image/png');
  cache.set(key, url);
  return url;
}
