import type { ArenaId } from '../combat/types';
import type { MusicId } from '../combat/arenaInfo';
import type { Cond, UnlockRule } from '../modes/World';
import type { StoryScene } from '../modes/Story';

/** ===== Tipos de los datos del mundo abierto (los datos están en content/mundo*.ts) ===== */

export type DistrictStyle = 'plaza' | 'blocks' | 'savanna' | 'beach' | 'theater' | 'industrial' | 'tower' | 'stadium';

export interface DistrictDef {
  id: string;
  name: string;
  blurb: string;
  center: [number, number];
  size: [number, number];
  style: DistrictStyle;
  ground: number;          // color del suelo
  palette: number[];       // colores de los edificios
  buildings: number;       // cuántos edificios generar
  height: [number, number];
  /** Zona central libre de edificios (radio) */
  freeRadius: number;
  /**
   * Trazado de calles del distrito (desplazamientos desde el centro): calles verticales `xs`, horizontales `zs`,
   * ancho de calzada `w`; `alleys` = callejuelas que parten las manzanas; `boulevard` = gran bulevar (z);
   * `north` = las calles verticales solo llegan hasta ese z (la playa: al sur del paseo no hay edificios).
   */
  streets: { xs: number[]; zs: number[]; w: number; alleys?: boolean; boulevard?: number; north?: number };
  arena: ArenaId;
  music: MusicId;
  unlock?: UnlockRule;
  lockText?: string;
}

export type PoiKind =
  | 'arena' | 'shop' | 'gym' | 'home' | 'taxi' | 'board' | 'garito' | 'minigame' | 'story' | 'tower'
  | 'vendor' | 'fountain' | 'landmark' | 'photo' | 'heal';

export interface SolidDef { w: number; d: number; h: number; color: number; side?: 'n' | 's' | 'e' | 'w'; sign?: string }

export interface PoiDef {
  id: string;
  district: string;
  at: [number, number];
  kind: PoiKind;
  name: string;
  prompt: string;
  /** Edificio macizo detrás del punto de interacción */
  solid?: SolidDef;
  radius?: number;
  minigame?: 'pulso' | 'comilona' | 'pesca' | 'tambores';
  cond?: Cond;
  /** Vendedor: qué ofrece (ids de objetos) */
  sells?: string[];
  /** Curación o comida: cuánto cuesta y qué hace */
  heal?: { cost: number; minutes: number; text: string };
  /** Capítulo de historia asociado (marcador) */
  chapter?: string;
}

export interface NpcTalk {
  /** Condición para que salga esta conversación (se elige la primera que cumpla) */
  cond?: Cond;
  scenes: StoryScene[];
  /** Si es true, solo se muestra una vez (usa una bandera `talk:<id>`) */
  once?: string;
}

export interface NpcDef {
  /** id de luchador (retable) o de civil (CIVILS) */
  id: string;
  district: string;
  at: [number, number];
  yaw?: number;
  /** Cuándo está presente (por defecto, siempre) */
  presence?: Cond;
  /** Ubicación alternativa (p. ej. de noche): si se cumple su condición, aparece aquí */
  alt?: { cond: Cond; district: string; at: [number, number] };
  talks: NpcTalk[];
  /** Frases sueltas cuando no hay conversación especial */
  quips: string[];
  /** Se le puede retar a un combate callejero */
  fighter?: boolean;
}

export interface StickerDef { id: string; district: string; at: [number, number]; hint: string; cond?: Cond }
export interface GraffitiDef { id: string; district: string; at: [number, number]; name: string; blurb: string }

export interface CivilDef { id: string; name: string; blurb: string; appearance: import('../combat/types').Appearance }
