import { describe, expect, it } from 'vitest';
import { getLines, parseDialogues } from './dialogues';

const SRC = `
## a vs b
- [pre] a: hola
- [pre] b: adiós
- [victoria:a] a: gané
---
- [pre] b: otra versión
## a vs *
- [pre] a: comodín
## * vs *
- [pre] arbitro: general
`;

describe('diálogos', () => {
  const blocks = parseDialogues(SRC);
  it('parsea bloques y variantes', () => {
    expect(blocks).toHaveLength(3);
    expect(blocks[0].variants).toHaveLength(2);
  });
  it('prefiere el emparejamiento más específico (sin importar el orden)', () => {
    expect(getLines('pre', 'b', 'a', undefined, blocks, () => 0).map((l) => l.text)).toEqual(['hola', 'adiós']);
    expect(getLines('pre', 'a', 'z', undefined, blocks).map((l) => l.text)).toEqual(['comodín']);
    expect(getLines('pre', 'x', 'y', undefined, blocks).map((l) => l.text)).toEqual(['general']);
  });
  it('filtra la victoria por ganador', () => {
    expect(getLines('victoria', 'a', 'b', 'a', blocks, () => 0).map((l) => l.text)).toEqual(['gané']);
    expect(getLines('victoria', 'a', 'b', 'b', blocks, () => 0)).toEqual([]);
  });
});
