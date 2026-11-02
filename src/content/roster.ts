import { CONFIGS } from '../../content/fighters';
import type { Appearance, FighterConfig, FighterData, FighterStats } from '../combat/types';
import { getGrapple, getMove } from '../combat/moves';

// Solo se usan las imágenes. Los .md/.txt de cada carpeta se detectan (para reconocer al luchador) pero
// su texto NO se muestra: las descripciones están en content/fighters.ts.
const texts = import.meta.glob('/fighters/*/*.{md,txt}', { query: '?url', import: 'default', eager: true }) as Record<string, string>;
const imgs = import.meta.glob('/fighters/*/*.{png,jpg,jpeg,webp}', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

export const DEFAULT_STATS: FighterStats = { speed: 1, power: 1, health: 100, stamina: 100, tempo: 1, resist: 1, recover: 1, escape: 1 };

const folderOf = (path: string) => path.split('/')[2];
const pretty = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Perfil equilibrado para una carpeta de luchador sin entrada en content/fighters.ts */
function autoConfig(id: string): FighterConfig {
  const h = hash(id);
  const skins = [0xd9a27a, 0xb4764f, 0x8d5a3b, 0xe0b48f, 0xc79b78];
  const outfits = [0x7a1f1f, 0x1f4a7a, 0x2d6a4f, 0x5a2d6a, 0x6a5a2d];
  const outs: Appearance['outfit'][] = ['camiseta', 'cuero', 'abrigo'];
  const taunts = ['burla', 'rugido'];
  return {
    id,
    description: 'Luchador recién llegado al Hoyo que todavía no tiene ficha. Añade su descripción y sus golpes en content/fighters.ts.',
    style: 'Perfil equilibrado por defecto.',
    stats: {},
    moves: {
      light: ['jab', 'directo', 'gancho'],
      heavy: 'machada',
      grab: { throw: 'suplex', slam: 'body_slam', sub: 'llave_brazo' },
      finisher: 'plancha_final', // reasignado en buildRoster si ya está en uso
      taunt: taunts[h % 2],
    },
    appearance: {
      skin: skins[h % skins.length],
      hair: h % 3 === 0 ? null : 0x1c140e,
      outfit: outs[(h >> 3) % 3],
      outfitColor: outfits[(h >> 5) % outfits.length],
      trunksColor: 0x181818,
      accent: 0xe0b341,
      build: 0.95 + ((h >> 7) % 20) / 100,
      height: 0.97 + ((h >> 9) % 10) / 100,
    },
  };
}

/** Comprueba coherencia del reparto. Devuelve la lista de problemas (vacía = todo bien). */
export function validateRoster(configs: FighterConfig[]): string[] {
  const problems: string[] = [];
  const finishers = new Map<string, string>();
  const ids = new Set<string>();
  for (const c of configs) {
    if (ids.has(c.id)) problems.push(`Luchador duplicado: ${c.id}`);
    ids.add(c.id);
    try {
      c.moves.light.forEach(getMove);
      getMove(c.moves.heavy);
      getMove(c.moves.taunt);
      getGrapple(c.moves.grab.throw);
      getGrapple(c.moves.grab.slam);
      getGrapple(c.moves.grab.sub);
      const f = getMove(c.moves.finisher);
      if (f.kind !== 'finisher') problems.push(`${c.id}: "${f.id}" no es un finisher`);
      const owner = finishers.get(f.id);
      if (owner) problems.push(`Finisher repetido "${f.id}": ${owner} y ${c.id}`);
      finishers.set(f.id, c.id);
    } catch (e) {
      problems.push(`${c.id}: ${(e as Error).message}`);
    }
  }
  return problems;
}

export function buildRoster(): FighterData[] {
  const folders = new Map<string, { main?: string; pfp?: string }>();
  const touch = (path: string) => { const k = folderOf(path).toLowerCase(); if (!folders.has(k)) folders.set(k, {}); return folders.get(k)!; };
  for (const p of Object.keys(texts)) touch(p);
  for (const [p, url] of Object.entries(imgs).sort(([a], [b]) => a.localeCompare(b))) {
    const f = touch(p);
    const file = p.split('/').pop()!.toLowerCase();
    if (/-?pfp|perfil|avatar/.test(file)) f.pfp = url; else if (!f.main) f.main = url;
  }

  const configs: FighterConfig[] = [...CONFIGS];
  const usedFinishers = new Set(configs.map((c) => c.moves.finisher));
  const spare = ['cuchilla_dorada', 'meteoro', 'trueno_barrio', 'ciclon', 'plancha_final', 'martillo_hoyo', 'patada_fantasma', 'tornado'];
  for (const id of folders.keys()) {
    if (configs.some((c) => c.id === id)) continue;
    const cfg = autoConfig(id);
    const free = spare.find((f) => !usedFinishers.has(f));
    if (free) cfg.moves.finisher = free;
    usedFinishers.add(cfg.moves.finisher);
    configs.push(cfg);
  }

  const problems = validateRoster(configs);
  if (problems.length) console.warn('[El Hoyo] Problemas en el reparto:\n' + problems.join('\n'));

  // Los luchadores con carpeta propia van primero y los placeholders al final.
  const out = configs.map((c): FighterData => {
    const f = folders.get(c.id);
    return {
      ...c,
      name: c.name ?? pretty(c.id),
      portrait: f?.main ?? f?.pfp ?? null,
      pfp: f?.pfp ?? f?.main ?? null,
      fullStats: { ...DEFAULT_STATS, ...c.stats },
    };
  });
  out.sort((a, b) => Number(!!a.placeholder) - Number(!!b.placeholder));
  return out;
}

export const ROSTER: FighterData[] = buildRoster();
export const fighterById = (id: string): FighterData => {
  const f = ROSTER.find((r) => r.id === id);
  if (!f) throw new Error(`Luchador desconocido: ${id}`);
  return f;
};
