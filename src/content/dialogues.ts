import raw from '../../content/dialogos.md?raw';

export interface Line { who: string; text: string }
interface Block { a: string; b: string; variants: { moment: string; winner: string | null; who: string; text: string }[][] }

export function parseDialogues(src: string): Block[] {
  const blocks: Block[] = [];
  let cur: Block | null = null;
  let variant: Block['variants'][number] = [];
  const closeVariant = () => { if (cur && variant.length) cur.variants.push(variant); variant = []; };
  for (const rawLine of src.replace(/\r/g, '').split('\n')) {
    const line = rawLine.trim();
    const h = /^##\s+(.+?)\s+vs\s+(.+?)\s*$/i.exec(line);
    if (h) { closeVariant(); cur = { a: h[1].toLowerCase(), b: h[2].toLowerCase(), variants: [] }; blocks.push(cur); continue; }
    if (!cur) continue;
    if (/^---+$/.test(line)) { closeVariant(); continue; }
    const m = /^-\s*\[([a-zñáéíóú_]+)(?::\s*([^\]]+))?\]\s*([^:]+?)\s*:\s*(.+)$/i.exec(line);
    if (m) variant.push({ moment: m[1].toLowerCase(), winner: m[2] ? m[2].trim().toLowerCase() : null, who: m[3].trim().toLowerCase(), text: m[4].trim() });
  }
  closeVariant();
  return blocks;
}

const BLOCKS = parseDialogues(raw);

function specificity(b: Block, x: string, y: string): number {
  const match = (p: string, q: string) => (p === '*' ? 0 : p === q ? 1 : -1);
  const o1 = [match(b.a, x), match(b.b, y)], o2 = [match(b.a, y), match(b.b, x)];
  const score = (o: number[]) => (o.includes(-1) ? -1 : o[0] + o[1]);
  return Math.max(score(o1), score(o2));
}

/** Devuelve las frases de un momento para el combate entre a y b (ids en minúscula). */
export function getLines(moment: 'pre' | 'victoria' | 'campeon', a: string, b: string, winner?: string, blocks: Block[] = BLOCKS, rng: () => number = Math.random): Line[] {
  const ranked = blocks.map((bl) => ({ bl, s: specificity(bl, a, b) })).filter((x) => x.s >= 0).sort((p, q) => q.s - p.s);
  const out: Line[] = [];
  for (const { bl } of ranked) {
    const options = bl.variants
      .map((v) => v.filter((l) => l.moment === moment && (!l.winner || l.winner === winner)))
      .filter((v) => v.length);
    if (!options.length) continue;
    const pick = options[Math.floor(rng() * options.length)];
    if (moment === 'victoria') {
      // solo la frase del ganador si existe
      const w = pick.filter((l) => l.winner === winner);
      return (w.length ? w : pick).map((l) => ({ who: l.who, text: l.text }));
    }
    return pick.map((l) => ({ who: l.who, text: l.text }));
  }
  return out;
}
