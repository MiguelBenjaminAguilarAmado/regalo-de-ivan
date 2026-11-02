export type Difficulty = 'facil' | 'intermedia' | 'dificil';
export type ArenaId = 'matamoros' | 'manchester';
export type WinReason = 'ko' | 'pin' | 'rendicion' | 'fuera';

export type MoveKind = 'strike' | 'grab' | 'finisher' | 'taunt';

export interface Move {
  id: string;
  name: string;
  kind: MoveKind;
  /** Tiempos en segundos (a tempo 1.0) */
  startup: number;
  active: number;
  recovery: number;
  damage: number;
  range: number;
  stamina: number;
  hitstun: number;
  knockback: number;
  knockdown?: boolean;
  /** Si el rival está cerca de las cuerdas, sale volando fuera del ring */
  sendOut?: boolean;
  /** Momentum ganado al conectar (o al ejecutar, en burlas) */
  momentum: number;
  anim: string;
  foul?: boolean;
  lunge?: number;
  /** Finishers: efectos */
  /** Objeto que sostiene mientras ejecuta el movimiento */
  prop?: 'chair' | 'maletin' | 'microfono' | 'casco' | 'cuerno';
  /** Criatura/vehículo que se invoca para el golpe (solo visual; el daño lo calcula Match) */
  summon?: 'momia' | 'tanque';
  /** Embestida: velocidad (m/s) con la que corre durante la ventana activa */
  rush?: number;
  /** Texto de anuncio al usarlo (movimientos raros) */
  announce?: string;
  vfx?: { color: number; callout: string };
}

export interface Grapple {
  id: string;
  name: string;
  damage: number;
  anim: string;
  /** throw = lanzamiento por detrás; slam = estampar en el sitio */
  style: 'throw' | 'slam';
}

export interface FighterStats {
  speed: number; // multiplicador de velocidad
  power: number; // multiplicador de daño
  health: number; // vida máxima
  stamina: number; // resistencia máxima
  tempo: number; // multiplicador de velocidad de golpes
  resist: number; // multiplicador de daño recibido (menor = más aguante)
  recover: number; // multiplicador de tiempo en el suelo (menor = se levanta antes)
  escape: number; // multiplicador de la fuerza de escape en pins/sumisiones
}

export interface MoveSet {
  light: string[]; // cadena de golpes ligeros (combo)
  heavy: string;
  grab: { throw: string; slam: string; sub: string };
  finisher: string;
  taunt: string;
  /** Si existe, el golpe fuerte sale al azar de esta lista [id, peso]. Más peso = más habitual. */
  heavyRandom?: [string, number][];
}

export interface Appearance {
  skin: number;
  hair?: number | null;
  outfit: 'cuero' | 'traje' | 'blazer' | 'camiseta' | 'abrigo' | 'arbitro' | 'desnudo';
  outfitColor: number;
  trunksColor: number;
  accent: number;
  mask?: 'perro' | 'caballo' | null;
  wraps?: number | null;
  facePaint?: 'payaso' | null;
  beard?: number | null;
  glasses?: boolean;
  build: number; // 0.9 - 1.15
  height: number; // 0.95 - 1.08
}

export interface UnlockRule {
  /** victorias totales necesarias, o logro concreto, o ninguno = desbloqueado */
  wins?: number;
  achievement?: string;
  hint: string;
}

export interface FighterConfig {
  id: string;
  name?: string;
  stats: Partial<FighterStats>;
  moves: MoveSet;
  appearance: Appearance;
  unlock?: UnlockRule;
  /** Probabilidad de que sus golpes sucios sean vistos por el árbitro */
  placeholder?: boolean;
  /** Descripción propia del luchador (se muestra en menús; NO se usa el .md) */
  description: string;
  /** Cómo lucha, en una frase */
  style: string;
  /** Rasgos especiales */
  traits?: { rootedGuard?: boolean };
}

export interface FighterData extends FighterConfig {
  name: string;
  /** Foto grande (cuerpo/escena) */
  portrait: string | null;
  /** Foto de perfil cuadrada, para iconos (si no hay, se usa portrait) */
  pfp: string | null;
  fullStats: FighterStats;
}

export interface Input {
  mx: number;
  mz: number;
  light: boolean;
  heavy: boolean;
  grab: boolean;
  taunt: boolean;
  finisher: boolean;
  block: boolean;
  run: boolean;
}

export const emptyInput = (): Input => ({
  mx: 0,
  mz: 0,
  light: false,
  heavy: false,
  grab: false,
  taunt: false,
  finisher: false,
  block: false,
  run: false,
});

export type GameEvent =
  | { type: 'hit'; target: number; attacker: number; heavy: boolean; x: number; y: number; z: number; dmg: number }
  | { type: 'block'; target: number; x: number; y: number; z: number; perfect: boolean }
  | { type: 'whoosh'; fighter: number }
  | { type: 'knockdown'; target: number }
  | { type: 'finisherStart'; fighter: number; move: Move }
  | { type: 'finisherHit'; fighter: number; target: number; move: Move }
  | { type: 'finisherMiss'; fighter: number }
  | { type: 'grab'; attacker: number; target: number }
  | { type: 'reversal'; fighter: number }
  | { type: 'grappleMove'; attacker: number; target: number; name: string; style: 'throw' | 'slam' }
  | { type: 'land'; target: number; big: boolean }
  | { type: 'pinStart'; attacker: number; target: number }
  | { type: 'pinCount'; n: number }
  | { type: 'kickout'; fighter: number }
  | { type: 'subStart'; attacker: number; target: number }
  | { type: 'subBreak'; fighter: number }
  | { type: 'tap'; fighter: number }
  | { type: 'koCount'; n: number }
  | { type: 'outCount'; fighter: number; n: number }
  | { type: 'foul'; fighter: number; seen: boolean }
  | { type: 'taunt'; fighter: number }
  | { type: 'summon'; kind: 'momia' | 'tanque'; fighter: number; target: number; dur: number }
  | { type: 'toreo'; fighter: number; target: number }
  | { type: 'heavyPick'; fighter: number; move: Move }
  | { type: 'ready'; fighter: number }
  | { type: 'exhausted'; fighter: number }
  | { type: 'msg'; text: string; big?: boolean }
  | { type: 'end'; winner: number; reason: WinReason };
