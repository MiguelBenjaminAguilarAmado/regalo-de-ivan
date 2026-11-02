import { describe, expect, it } from 'vitest';
import { advance, bracketSize, createBracket, opponentOf, roundName } from './Tournament';

const ids = ['a', 'b', 'c', 'd', 'e', 'f'];

describe('torneo', () => {
  it('elige tamaño 4 con 6 luchadores y 8 con 8+', () => {
    expect(bracketSize(6)).toBe(4);
    expect(bracketSize(8)).toBe(8);
  });
  it('el jugador siempre está en el cuadro y su rival existe', () => {
    for (let i = 0; i < 20; i++) {
      const b = createBracket('a', ids);
      expect(b.rounds[0].flatMap((p) => [p.a, p.b])).toContain('a');
      expect(opponentOf(b)).not.toBe('a');
    }
  });
  it('un campeón tras ganar todas las rondas; eliminado si pierde', () => {
    let b = createBracket('a', ids);
    expect(roundName(b)).toBe('SEMIFINAL');
    b = advance(b, true, (x) => x);
    expect(b.eliminated).toBe(false);
    expect(roundName(b)).toBe('FINAL');
    b = advance(b, true, (x) => x);
    expect(b.champion).toBe('a');
    let c = createBracket('a', ids);
    c = advance(c, false, (x) => x);
    expect(c.eliminated).toBe(true);
  });
});
