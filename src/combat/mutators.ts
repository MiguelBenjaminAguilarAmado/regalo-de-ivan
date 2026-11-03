/** Modificadores de combate que se eligen en el Versus: cambian las reglas del combate. */
export type MutatorId = 'ninguno' | 'relampago' | 'maraton' | 'loco';

export interface Mutator { id: MutatorId; name: string; desc: string; dmg: number; hp: number; mom: number }

export const MUTATORS: Mutator[] = [
  { id: 'ninguno', name: 'Ninguno', desc: 'Combate normal.', dmg: 1, hp: 1, mom: 1 },
  { id: 'relampago', name: 'Relámpago', desc: 'Todo duele un 70 % más: los combates se deciden en un suspiro.', dmg: 1.7, hp: 1, mom: 1 },
  { id: 'maraton', name: 'Maratón', desc: 'Vida ×1,7: un combate larguísimo, para los que aguantan.', dmg: 1, hp: 1.7, mom: 1 },
  { id: 'loco', name: 'Momentum loco', desc: 'El momentum sube más del doble de rápido: ¡finishers por todas partes!', dmg: 1, hp: 1, mom: 2.2 },
];

export const mutatorById = (id: MutatorId | undefined) => MUTATORS.find((m) => m.id === id) ?? MUTATORS[0];
