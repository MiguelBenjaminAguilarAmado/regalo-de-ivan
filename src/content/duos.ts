/** Dúos dinámicos: parejas de luchadores que se llevan bien y combaten mejor juntos (modos por parejas). */
export interface DuoBonus {
  /** Multiplicadores de estadísticas para los dos */
  power?: number;
  speed?: number;
  resist?: number;
  /** Multiplicador de la recuperación del que descansa */
  regen?: number;
  /** Multiplicador del enfriamiento entre relevos (menor = más rápido) */
  tagCd?: number;
  /** Segundos de adrenalina (más daño y velocidad) para el que entra de relevo */
  entryBoost?: number;
  /** Momentum extra que gana el equipo con cada relevo */
  entryMom?: number;
}

export interface Duo { a: string; b: string; name: string; desc: string; bonus: DuoBonus }

export const DUOS: Duo[] = [
  { a: 'kongui', b: 'darksinfacha', name: 'El Reino y la Bolsa', desc: 'El que entra de relevo sale con 8 s de adrenalina.', bonus: { entryBoost: 8 } },
  { a: 'petisui', b: 'big mac', name: 'Los de las 3000', desc: 'Criados en el mismo garito: reciben un 8 % menos de daño y el que descansa se recupera casi el doble de rápido.', bonus: { resist: 0.92, regen: 1.8 } },
  { a: 'perro cheetos', b: 'petisui', name: 'Perro y Máscara', desc: '+6 % de velocidad y relevos mucho más rápidos.', bonus: { speed: 1.06, tagCd: 0.4 } },
  { a: 'pablo motos', b: 'ansol', name: 'El Jefe y su Mano Derecha', desc: 'Cada relevo da +30 de momentum al equipo.', bonus: { entryMom: 30 } },
  { a: 'pablo motos', b: 'petisui', name: 'Contrato con Silla', desc: '+8 % de daño y +15 de momentum en cada relevo.', bonus: { power: 1.08, entryMom: 15 } },
  { a: 'pablo motos', b: 'elso', name: 'El Jefe y el Campeón', desc: '+5 % de daño, 5 % menos de daño recibido y +15 de momentum en cada relevo.', bonus: { power: 1.05, resist: 0.95, entryMom: 15, entryBoost: 5 } },
  // dúos de la historia
  { a: 'chema', b: 'petisui', name: 'Socios con derecho a silla', desc: '+5 % de daño y +20 de momentum en cada relevo.', bonus: { power: 1.05, entryMom: 20 } },
  { a: 'chema', b: 'elso', name: 'El Campeón y el Novato', desc: '6 % menos de daño recibido y 6 s de adrenalina al entrar de relevo.', bonus: { resist: 0.94, entryBoost: 6 } },
  { a: 'chema', b: 'kongui', name: 'El Rey y el Novato', desc: '+5 % de velocidad y relevos mucho más rápidos.', bonus: { speed: 1.05, tagCd: 0.6 } },
];

export const duoOf = (a: string | undefined | null, b: string | undefined | null): Duo | null =>
  !a || !b ? null : DUOS.find((d) => (d.a === a && d.b === b) || (d.a === b && d.b === a)) ?? null;
