import { describe, expect, it } from 'vitest';
import { elso, pepe, voice } from './voices';

describe('voces de los personajes', () => {
  it('Pepe cecea con zetas', () => {
    expect(pepe('Hola chicos, soy yo ¡Pepe! que pasa chavales')).toBe('Ola chicoz, soy yo ¡Pepe! que paza chavalez');
  });
  it('Elso habla catracho (voseo y jerga)', () => {
    const t = elso('Tú eres un chaval con mucho dinero, mira.');
    expect(t).toMatch(/vos sos/i); expect(t).toMatch(/cipote/); expect(t).toMatch(/pisto/); expect(t).toMatch(/mirá/);
  });
  it('las demás voces no cambian y «=» evita la transformación', () => {
    expect(voice('petisui', 'Hola chicos')).toBe('Hola chicos');
    expect(voice('pepe the gay dragon', '=Hola chicos')).toBe('Hola chicos');
  });
});
