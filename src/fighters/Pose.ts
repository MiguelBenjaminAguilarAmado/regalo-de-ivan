import type { Fighter } from '../combat/Match';

export type V3 = [number, number, number];
export const JOINTS = ['hips', 'torso', 'head', 'lU', 'lF', 'rU', 'rF', 'lT', 'lS', 'rT', 'rS'] as const;
export type Joint = (typeof JOINTS)[number];

/**
 * Convenciones (el modelo mira hacia +Z, su izquierda es +X):
 *  brazos  U/F = brazo/antebrazo:  x<0 = hacia delante,  z>0 (izq) / z<0 (der) = separar del cuerpo
 *  piernas T/S = muslo/espinilla:  T.x<0 = pierna hacia delante,  S.x>0 = flexionar rodilla
 *  torso:  x>0 = inclinarse hacia delante,  y = giro  (y<0 adelanta el hombro izquierdo)
 */
export interface Pose extends Record<Joint, V3> {
  pitch: number; // inclinación de todo el cuerpo (negativo = hacia atrás)
  air: number; // elevación sobre el suelo
  lie: number; // 0 = de pie, 1 = tumbado boca arriba
  spin: number; // giro adicional sobre el eje vertical
  roll: number;
}

export const GUARD: Pose = {
  hips: [0, 0, 0], torso: [0.12, 0, 0], head: [-0.08, 0, 0],
  lU: [-0.75, 0, 0.22], lF: [-1.9, 0, 0], rU: [-0.65, 0, -0.22], rF: [-2.0, 0, 0],
  lT: [-0.28, 0, 0.1], lS: [0.5, 0, 0], rT: [0.18, 0, -0.1], rS: [0.4, 0, 0],
  pitch: 0, air: 0, lie: 0, spin: 0, roll: 0,
};

export type PartialPose = Partial<Pose>;
export const mk = (o: PartialPose, base: Pose = GUARD): Pose => ({ ...base, ...o });

export const LYING: Pose = mk({
  hips: [0, 0, 0], torso: [0, 0, 0], head: [0.1, 0, 0],
  lU: [0.1, 0, 0.55], lF: [-0.25, 0, 0.1], rU: [0.1, 0, -0.55], rF: [-0.25, 0, -0.1],
  lT: [0, 0, 0.18], lS: [0.1, 0, 0], rT: [0, 0, -0.18], rS: [0.1, 0, 0],
  pitch: -Math.PI / 2, lie: 1,
});

interface AnimDef { wind: PartialPose; hit: PartialPose; hold?: PartialPose }

/** Cada ataque: pose de preparación y pose de impacto (se interpola según los tiempos del movimiento). */
export const ANIMS: Record<string, AnimDef> = {
  jab: {
    wind: { lU: [-0.55, 0, 0.3], lF: [-2.5, 0, 0], torso: [0.15, 0.15, 0] },
    hit: { lU: [-1.55, 0, 0.08], lF: [-0.1, 0, 0], torso: [0.22, -0.35, 0], hips: [0, -0.15, 0], rU: [-0.9, 0, -0.1] },
  },
  cross: {
    wind: { rU: [-0.3, 0, -0.35], rF: [-2.5, 0, 0], torso: [0.12, -0.35, 0], hips: [0, -0.2, 0] },
    hit: { rU: [-1.5, 0, -0.1], rF: [-0.1, 0, 0], torso: [0.25, 0.55, 0], hips: [0, 0.35, 0], lU: [-0.9, 0, 0.3], lT: [-0.5, 0, 0.1], lS: [0.7, 0, 0], rT: [0.3, 0, -0.1] },
  },
  hook: {
    wind: { rU: [-1.1, 0, -0.9], rF: [-0.2, 0, 1.0], torso: [0.15, -0.7, 0], hips: [0, -0.35, 0] },
    hit: { rU: [-1.4, 0, -0.2], rF: [-0.1, 0, 1.5], torso: [0.25, 0.75, 0], hips: [0, 0.45, 0], lT: [-0.45, 0, 0.1] },
  },
  lowkick: {
    wind: { rT: [0.45, 0, -0.1], rS: [1.1, 0, 0] },
    hit: { rT: [-0.95, 0, -0.1], rS: [0.25, 0, 0], torso: [-0.05, 0.2, 0], lS: [0.7, 0, 0] },
  },
  knee: {
    wind: { rT: [-0.2, 0, -0.1], rS: [0.5, 0, 0], lU: [-1.2, 0, 0.15], rU: [-1.2, 0, -0.15], lF: [-1.0, 0, 0], rF: [-1.0, 0, 0] },
    hit: { rT: [-1.7, 0, -0.1], rS: [1.9, 0, 0], torso: [0.35, 0, 0], lU: [-1.3, 0, 0.2], rU: [-1.3, 0, -0.2], lF: [-1.0, 0, 0], rF: [-1.0, 0, 0] },
  },
  elbow: {
    wind: { rU: [-0.5, 0, -0.9], rF: [-2.6, 0, 0], torso: [0.1, -0.5, 0] },
    hit: { rU: [-1.2, 0, -0.15], rF: [-2.7, 0, 0], torso: [0.3, 0.7, 0], hips: [0, 0.4, 0] },
  },
  highkick: {
    wind: { rT: [0.3, 0, -0.1], rS: [0.9, 0, 0], lU: [-0.3, 0, 0.6], rU: [-0.3, 0, -0.6] },
    hit: { rT: [-2.1, 0, -0.2], rS: [0.15, 0, 0], torso: [-0.45, 0.2, 0], lU: [-0.3, 0, 0.9], rU: [-0.3, 0, -0.9], lT: [-0.1, 0, 0.1], lS: [0.2, 0, 0] },
  },
  haymaker: {
    wind: { rU: [0.9, 0, -0.7], rF: [-0.6, 0, 0], torso: [0.05, -0.9, 0], hips: [0, -0.5, 0], lU: [-0.9, 0, 0.3], lT: [-0.5, 0, 0.1], lS: [0.8, 0, 0], rT: [0.35, 0, -0.1], rS: [0.7, 0, 0] },
    hit: { rU: [-1.65, 0, -0.35], rF: [-0.1, 0, 0], torso: [0.55, 0.95, 0], hips: [0, 0.6, 0], lT: [-0.65, 0, 0.1], lS: [0.75, 0, 0], rT: [0.35, 0, -0.1], rS: [0.3, 0, 0] },
  },
  lariat: {
    wind: { rU: [0, 0, -1.45], rF: [0, 0, 0], lU: [-0.5, 0, 0.5], torso: [0.2, -1.0, 0], hips: [0, -0.6, 0], lS: [0.8, 0, 0], lT: [-0.4, 0, 0.1] },
    hit: { rU: [0, 0, -1.5], rF: [0, 0, 0], torso: [0.2, 1.1, 0], hips: [0, 0.7, 0], lU: [-0.5, 0, 0.5], lT: [-0.6, 0, 0.1], lS: [0.8, 0, 0] },
  },
  dropkick: {
    wind: { lT: [-0.4, 0, 0.1], rT: [-0.4, 0, -0.1], lS: [0.9, 0, 0], rS: [0.9, 0, 0], air: 0.2, torso: [0.2, 0, 0] },
    hit: { pitch: -1.15, air: 0.95, lT: [-0.3, 0, 0.05], rT: [-0.3, 0, -0.05], lS: [0.1, 0, 0], rS: [0.1, 0, 0], lU: [-0.1, 0, 1.0], rU: [-0.1, 0, -1.0], lF: [-0.2, 0, 0], rF: [-0.2, 0, 0], torso: [-0.15, 0, 0] },
  },
  headbutt: {
    wind: { torso: [-0.2, 0, 0], head: [-0.4, 0, 0], lU: [-0.6, 0, 0.5], rU: [-0.6, 0, -0.5] },
    hit: { torso: [0.9, 0, 0], head: [0.35, 0, 0], lU: [-0.6, 0, 0.5], rU: [-0.6, 0, -0.5], lT: [-0.5, 0, 0.1], lS: [0.7, 0, 0] },
  },
  lowblow: {
    wind: { rU: [-0.2, 0, -0.5], rF: [-1.0, 0, 0], torso: [0.4, -0.3, 0], lS: [0.8, 0, 0], lT: [-0.5, 0, 0.1] },
    hit: { rU: [-0.7, 0, -0.1], rF: [-0.4, 0, 0], torso: [0.7, 0.4, 0], lS: [0.9, 0, 0], lT: [-0.7, 0, 0.1] },
  },
  grab: {
    wind: { lU: [-1.0, 0, 0.35], rU: [-1.0, 0, -0.35], lF: [-0.8, 0, 0], rF: [-0.8, 0, 0], torso: [0.25, 0, 0] },
    hit: { lU: [-1.55, 0, 0.25], rU: [-1.55, 0, -0.25], lF: [-0.3, 0, 0.2], rF: [-0.3, 0, -0.2], torso: [0.4, 0, 0], lT: [-0.5, 0, 0.1], lS: [0.7, 0, 0] },
  },
  taunt: {
    wind: { lU: [-0.4, 0, 0.9], rU: [-0.4, 0, -0.9], lF: [-0.5, 0, 0], rF: [-0.5, 0, 0], torso: [-0.1, 0, 0], head: [-0.2, 0, 0] },
    hit: { lU: [-0.2, 0, 1.5], rU: [-0.2, 0, -1.5], lF: [-0.2, 0, 0], rF: [-0.2, 0, 0], torso: [-0.25, 0, 0], head: [-0.35, 0, 0], lT: [-0.1, 0, 0.25], rT: [-0.1, 0, -0.25], lS: [0.2, 0, 0], rS: [0.2, 0, 0] },
  },
  taunt2: {
    wind: { rU: [-0.9, 0, -0.2], rF: [-1.7, 0, 0], lU: [0.1, 0, 0.7], lF: [-1.7, 0, 0.2], torso: [-0.1, 0, 0.1] },
    hit: { rU: [-1.4, 0, -0.35], rF: [-1.2, 0, 0], lU: [0.05, 0, 0.75], lF: [-1.9, 0, 0.3], torso: [-0.22, 0.2, 0.12], head: [-0.2, 0, -0.18], lT: [-0.15, 0, 0.3], rT: [-0.1, 0, -0.1] },
  },
  // ---- finishers
  finPunch: {
    wind: { rU: [0.9, 0, -0.4], rF: [-0.5, 0, 0], torso: [0.3, -1.1, 0], hips: [0, -0.7, 0], lU: [-1.1, 0, 0.3], lF: [-1.6, 0, 0], lT: [-0.5, 0, 0.15], lS: [0.9, 0, 0], rT: [0.35, 0, -0.1], rS: [0.8, 0, 0] },
    hit: { rU: [-1.6, 0, -0.15], rF: [-0.05, 0, 0], torso: [0.6, 1.0, 0], hips: [0, 0.8, 0], lT: [-0.85, 0, 0.1], lS: [0.9, 0, 0], rT: [0.5, 0, -0.1], rS: [0.3, 0, 0], lU: [0.3, 0, 0.8], lF: [-0.3, 0, 0] },
  },
  finChair: {
    wind: { lU: [-2.9, 0, 0.15], rU: [-2.9, 0, -0.15], lF: [-0.1, 0, 0], rF: [-0.1, 0, 0], torso: [-0.25, 0, 0], lT: [-0.3, 0, 0.1], lS: [0.6, 0, 0] },
    hit: { lU: [-1.0, 0, 0.15], rU: [-1.0, 0, -0.15], lF: [-0.2, 0, 0], rF: [-0.2, 0, 0], torso: [0.75, 0, 0], lT: [-0.8, 0, 0.1], lS: [0.9, 0, 0] },
  },
  finLeap: {
    wind: { torso: [0.5, 0, 0], lT: [-0.9, 0, 0.1], lS: [1.4, 0, 0], rT: [-0.9, 0, -0.1], rS: [1.4, 0, 0], lU: [0.5, 0, 0.3], rU: [0.5, 0, -0.3] },
    hit: { pitch: 1.35, air: 1.15, lU: [-2.7, 0, 0.1], rU: [-2.7, 0, -0.1], lF: [-0.1, 0, 0], rF: [-0.1, 0, 0], lT: [0.25, 0, 0.1], rT: [0.2, 0, -0.1], lS: [0.2, 0, 0], rS: [0.2, 0, 0], torso: [0.1, 0, 0], head: [-0.5, 0, 0] },
  },
  finHammer: {
    wind: { lU: [-2.9, 0, 0.1], rU: [-2.9, 0, -0.1], lF: [-0.2, 0, 0], rF: [-0.2, 0, 0], torso: [-0.3, 0, 0], lT: [-0.3, 0, 0.1], lS: [0.5, 0, 0] },
    hit: { lU: [-0.5, 0, 0.1], rU: [-0.5, 0, -0.1], lF: [-1.2, 0, 0], rF: [-1.2, 0, 0], torso: [0.95, 0, 0], lT: [-0.9, 0, 0.1], lS: [0.9, 0, 0] },
  },
  finKick: {
    wind: { torso: [0.0, 0.8, 0], hips: [0, 0.6, 0], rT: [0.2, 0, -0.1], rS: [0.8, 0, 0], lU: [-0.3, 0, 0.9], rU: [-0.3, 0, -0.9] },
    hit: { rT: [-2.0, 0, -0.15], rS: [0.1, 0, 0], torso: [-0.4, -0.3, 0], lU: [-0.3, 0, 1.2], rU: [-0.3, 0, -1.2], lT: [-0.05, 0, 0.1], lS: [0.2, 0, 0] },
  },
  finSpin: {
    wind: { lU: [0, 0, 1.45], rU: [0, 0, -1.45], lF: [0, 0, 0], rF: [0, 0, 0], torso: [0.2, 0, 0], lT: [-0.3, 0, 0.1], lS: [0.7, 0, 0] },
    hit: { lU: [0, 0, 1.5], rU: [0, 0, -1.5], lF: [0, 0, 0], rF: [0, 0, 0], torso: [0.1, 0, 0], rT: [-1.3, 0, -0.1], rS: [0.2, 0, 0], lT: [-0.05, 0, 0.1], lS: [0.2, 0, 0] },
  },
  micswing: {
    wind: { rU: [-1.1, 0, -0.5], rF: [-2.3, 0, 0], lU: [-0.8, 0, 0.3], torso: [0.1, -0.5, 0], head: [-0.1, 0, 0] },
    hit: { rU: [-1.5, 0, -0.3], rF: [-0.2, 0, 0.3], torso: [0.35, 0.7, 0], hips: [0, 0.4, 0], lU: [-0.8, 0, 0.3] },
  },
  summon: {
    wind: { lU: [-2.7, 0, 0.5], rU: [-2.7, 0, -0.5], lF: [-0.2, 0, 0], rF: [-0.2, 0, 0], torso: [-0.2, 0, 0], head: [-0.3, 0, 0] },
    hit: { rU: [-1.55, 0, -0.35], rF: [-0.05, 0, 0], lU: [-1.0, 0, 0.5], lF: [-0.6, 0, 0], torso: [0.2, 0.4, 0], hips: [0, 0.25, 0], lT: [-0.5, 0, 0.1], lS: [0.7, 0, 0] },
  },
  finCharge: {
    wind: { torso: [0.55, 0, 0], head: [0.5, 0, 0], lT: [-0.7, 0, 0.1], lS: [1.2, 0, 0], rT: [0.5, 0, -0.1], rS: [1.1, 0, 0], lU: [0.5, 0, 0.3], rU: [0.5, 0, -0.3], lF: [-0.5, 0, 0], rF: [-0.5, 0, 0] },
    hit: { torso: [0.95, 0, 0], head: [0.55, 0, 0], lT: [-1.1, 0, 0.1], lS: [0.7, 0, 0], rT: [0.9, 0, -0.1], rS: [1.3, 0, 0], lU: [0.9, 0, 0.35], rU: [0.9, 0, -0.35], lF: [-0.3, 0, 0], rF: [-0.3, 0, 0], pitch: 0.12 },
  },
  finPoint: {
    wind: { rU: [-0.5, 0, -0.2], rF: [-2.0, 0, 0], lU: [0.1, 0, 0.6], lF: [-1.8, 0, 0.1], torso: [0.1, 0.1, 0] },
    hit: { rU: [-1.55, 0, -0.45], rF: [-0.05, 0, 0], lU: [0.1, 0, 0.6], lF: [-1.8, 0, 0.1], torso: [0.05, 0.5, 0], hips: [0, 0.3, 0], head: [-0.15, 0, 0] },
  },
};

const STATE_POSES: Record<string, PartialPose> = {
  block: {
    lU: [-1.25, 0, 0.35], lF: [-2.4, 0, 0.2], rU: [-1.25, 0, -0.35], rF: [-2.4, 0, -0.2],
    torso: [0.3, 0, 0], head: [0.1, 0, 0], lT: [-0.4, 0, 0.12], lS: [0.8, 0, 0], rT: [0.25, 0, -0.12], rS: [0.7, 0, 0],
  },
  hitstun: {
    torso: [-0.3, 0.2, 0.1], head: [-0.35, 0, 0], lU: [-0.3, 0, 0.7], rU: [-0.25, 0, -0.6], lF: [-0.6, 0, 0], rF: [-0.6, 0, 0],
    hips: [-0.08, 0, 0], lT: [-0.1, 0, 0.1], lS: [0.45, 0, 0], rT: [0.3, 0, -0.1], rS: [0.5, 0, 0],
  },
  stunned: {
    torso: [0.5, 0, 0.12], head: [0.3, 0, 0.1], lU: [-0.2, 0, 0.35], rU: [-0.2, 0, -0.35], lF: [-0.5, 0, 0], rF: [-0.5, 0, 0],
    lT: [-0.1, 0, 0.12], lS: [0.6, 0, 0], rT: [0.1, 0, -0.12], rS: [0.7, 0, 0],
  },
  clinch: {
    lU: [-1.15, 0, 0.45], rU: [-1.15, 0, -0.45], lF: [-0.9, 0, -0.35], rF: [-0.9, 0, 0.35], torso: [0.4, 0, 0], head: [0.0, 0, 0],
    lT: [-0.45, 0, 0.15], lS: [0.7, 0, 0], rT: [0.3, 0, -0.15], rS: [0.6, 0, 0],
  },
  clinched: {
    lU: [-0.5, 0, 0.55], rU: [-0.5, 0, -0.55], lF: [-1.0, 0, -0.2], rF: [-1.0, 0, 0.2], torso: [0.5, 0, 0], head: [0.4, 0, 0],
    lT: [-0.2, 0, 0.15], lS: [0.6, 0, 0], rT: [0.2, 0, -0.15], rS: [0.6, 0, 0],
  },
  subA: {
    lU: [-1.0, 0, 0.25], rU: [-1.0, 0, -0.25], lF: [-0.5, 0, 0], rF: [-0.5, 0, 0], torso: [0.85, 0, 0], head: [-0.3, 0, 0],
    lT: [-1.35, 0, 0.25], lS: [1.7, 0, 0], rT: [-0.15, 0, -0.2], rS: [1.5, 0, 0],
  },
  pinA: {
    lU: [-1.35, 0, 0.2], rU: [-1.35, 0, -0.2], lF: [-0.3, 0, 0], rF: [-0.3, 0, 0], torso: [0.95, 0, 0], head: [-0.4, 0, 0],
    lT: [-1.45, 0, 0.2], lS: [2.0, 0, 0], rT: [-0.9, 0, -0.2], rS: [1.9, 0, 0],
  },
  win: {
    lU: [-2.6, 0, 0.5], rU: [-2.6, 0, -0.5], lF: [-0.2, 0, 0], rF: [-0.2, 0, 0], torso: [-0.12, 0, 0], head: [-0.3, 0, 0],
    lT: [-0.15, 0, 0.2], lS: [0.3, 0, 0], rT: [-0.1, 0, -0.2], rS: [0.3, 0, 0],
  },
  entrance: {
    lU: [-0.2, 0, 0.45], rU: [-0.2, 0, -0.45], lF: [-0.4, 0, 0], rF: [-0.4, 0, 0], torso: [0.02, 0, 0], head: [0, 0, 0],
    lT: [-0.1, 0, 0.1], lS: [0.2, 0, 0], rT: [0.1, 0, -0.1], rS: [0.2, 0, 0],
  },
  ref: {
    lU: [-0.2, 0, 0.3], rU: [-0.2, 0, -0.3], lF: [-0.5, 0, 0], rF: [-0.5, 0, 0], torso: [0.1, 0, 0], head: [0, 0, 0],
    lT: [-0.05, 0, 0.08], lS: [0.1, 0, 0], rT: [0.05, 0, -0.08], rS: [0.1, 0, 0],
  },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };

export function blendPose(a: Pose, b: Pose, t: number, out: Pose = { ...a }): Pose {
  for (const j of JOINTS) {
    out[j] = [lerp(a[j][0], b[j][0], t), lerp(a[j][1], b[j][1], t), lerp(a[j][2], b[j][2], t)];
  }
  out.pitch = lerp(a.pitch, b.pitch, t); out.air = lerp(a.air, b.air, t); out.lie = lerp(a.lie, b.lie, t);
  out.spin = lerp(a.spin, b.spin, t); out.roll = lerp(a.roll, b.roll, t);
  return out;
}

/** Pose de un ataque a partir de su progreso temporal. */
export function attackPose(anim: string, t: number, s: number, a: number, total: number, spinMode: boolean): Pose {
  const def = ANIMS[anim] ?? ANIMS.jab;
  const wind = mk(def.wind), hit = mk(def.hit);
  let out: Pose;
  if (t < s) out = blendPose(GUARD, wind, smooth(t / Math.max(0.01, s)) ** 0.8);
  else if (t < s + a) out = blendPose(wind, hit, smooth((t - s) / Math.max(0.01, a * 0.55)));
  else out = blendPose(hit, GUARD, smooth((t - s - a) / Math.max(0.01, total - s - a)));
  if (spinMode) out.spin = Math.PI * 2 * smooth(Math.min(1, t / (s + a)));
  return out;
}

export class Animator {
  cur: Pose = { ...GUARD };
  phase = Math.random() * 10;
  private flip = 1;
  private lastState = '';

  /** Calcula la pose objetivo y se acerca a ella. Devuelve la pose actual. */
  updateRef(dt: number, time: number, speed: number, count: number, mode: string): Pose {
    blendPose(this.cur, this.refPose(time, speed, count, mode), 1 - Math.exp(-10 * dt), this.cur);
    return this.cur;
  }

  update(f: Fighter, dt: number, time: number): Pose {
    const target = this.target(f, time);
    let k = 14;
    switch (f.state) {
      case 'attack': k = 34; break;
      case 'hitstun': k = 45; break;
      case 'down': case 'thrown': k = 20; break;
      case 'getup': k = 12; break;
      default: k = 16;
    }
    if (f.state !== this.lastState) {
      if (f.state === 'hitstun') this.flip = -this.flip;
      this.lastState = f.state;
    }
    blendPose(this.cur, target, 1 - Math.exp(-k * dt), this.cur);
    return this.cur;
  }

  private target(f: Fighter, time: number): Pose {
    const sp = f.speedNow;
    const breathe = Math.sin(time * 2.2 + f.idx) * 0.02;
    switch (f.state) {
      case 'idle': case 'block': {
        const base = f.state === 'block' ? mk(STATE_POSES.block) : mk({});
        if (f.state === 'idle') {
          this.phase += (sp * 1.9) * (1 / 60);
          const sw = Math.sin(this.phase * 2.4);
          const amp = Math.min(1, sp / 3.2);
          const run = f.running ? 1 : 0;
          base.lT = [-0.28 + sw * (0.5 + run * 0.4) * amp, 0, 0.1];
          base.rT = [0.18 - sw * (0.5 + run * 0.4) * amp, 0, -0.1];
          base.lS = [0.5 + Math.max(0, -Math.cos(this.phase * 2.4)) * 0.8 * amp, 0, 0];
          base.rS = [0.4 + Math.max(0, Math.cos(this.phase * 2.4)) * 0.8 * amp, 0, 0];
          if (run) { base.torso = [0.35, 0, 0]; base.lU = [-0.5 + sw * 0.7, 0, 0.15]; base.rU = [-0.5 - sw * 0.7, 0, -0.15]; base.lF = [-1.5, 0, 0]; base.rF = [-1.5, 0, 0]; }
          base.torso = [base.torso[0] + breathe, base.torso[1], base.torso[2]];
          base.hips = [0, Math.sin(time * 1.3) * 0.04, 0];
        }
        return base;
      }
      case 'attack': {
        const m = f.move!;
        const total = f.s + f.a + f.r;
        const spin = m.anim === 'finSpin' || m.anim === 'finKick';
        const p = attackPose(m.anim, f.t, f.s, f.a, total, spin);
        return p;
      }
      case 'hitstun': {
        const p = mk(STATE_POSES.hitstun);
        p.torso = [p.torso[0], p.torso[1] * this.flip, p.torso[2] * this.flip];
        p.head = [p.head[0], 0.3 * this.flip, 0];
        return p;
      }
      case 'stunned': {
        const p = mk(STATE_POSES.stunned);
        p.torso = [p.torso[0], Math.sin(time * 9) * 0.1, p.torso[2]];
        return p;
      }
      case 'down': case 'ko': case 'pinD': {
        const p = mk(LYING);
        if (f.state === 'ko') { p.head = [0.1, 0.4, 0]; }
        if (f.state === 'down' && f.koed) p.head = [0.1, 0.4, 0];
        p.torso = [0, 0, Math.sin(time * 2) * 0.01];
        return p;
      }
      case 'subD': {
        const p = mk(LYING);
        const taps = f.subMeter > 0.75 ? Math.sin(time * 20) * 0.4 : 0;
        p.lU = [-0.2 + taps, 0, 0.8]; p.rU = [-1.4, 0, -0.2]; p.rF = [-0.4, 0, 0];
        p.head = [0.1, Math.sin(time * 6) * 0.2, 0];
        p.lT = [0.3, 0, 0.2]; p.lS = [0.6, 0, 0];
        return p;
      }
      case 'getup': {
        const u = Math.min(1, f.t / Math.max(0.01, f.dur));
        const crouch = mk({ torso: [0.8, 0, 0], lT: [-1.2, 0, 0.2], lS: [1.9, 0, 0], rT: [-0.5, 0, -0.2], rS: [1.8, 0, 0], lU: [-0.8, 0, 0.3], rU: [-0.8, 0, -0.3], lF: [-0.6, 0, 0], rF: [-0.6, 0, 0] });
        if (u < 0.6) return blendPose(LYING, crouch, smooth(u / 0.6));
        return blendPose(crouch, GUARD, smooth((u - 0.6) / 0.4));
      }
      case 'thrown': {
        const th = f.thrown;
        const s = th ? Math.min(1, f.t / th.dur) : 1;
        const p = mk(LYING);
        const style = th?.style ?? 'throw';
        if (style === 'slam') {
          // arriba en vertical-horizontal y se estrella
          p.pitch = -Math.PI / 2 * smooth(Math.min(1, s * 1.4)) - (s < 0.5 ? Math.sin(s * Math.PI * 2) * 0.5 : 0);
        } else p.pitch = -Math.PI / 2 * smooth(Math.min(1, s * 1.8));
        p.lie = smooth(Math.min(1, s * 1.8));
        p.spin = 0;
        p.lU = [-0.9, 0, 0.9]; p.rU = [-0.9, 0, -0.9];
        p.lT = [-0.3, 0, 0.3]; p.rT = [-0.2, 0, -0.3]; p.lS = [0.4, 0, 0]; p.rS = [0.4, 0, 0];
        return p;
      }
      case 'throwing': {
        const style = f.lastGrapple.includes('Powerslam') || f.lastGrapple.includes('DDT') || f.lastGrapple.includes('slam') ? 'slam' : 'throw';
        const u = Math.min(1, f.t / Math.max(0.01, f.dur));
        const clinch = mk(STATE_POSES.clinch);
        const up = mk({ lU: [-2.4, 0, 0.25], rU: [-2.4, 0, -0.25], lF: [-0.4, 0, 0], rF: [-0.4, 0, 0], torso: [style === 'slam' ? -0.3 : -0.45, 0, 0], head: [-0.2, 0, 0], lT: [-0.3, 0, 0.15], lS: [0.8, 0, 0] });
        const down = mk({ lU: [-1.0, 0, 0.25], rU: [-1.0, 0, -0.25], lF: [-0.3, 0, 0], rF: [-0.3, 0, 0], torso: [style === 'slam' ? 0.9 : 0.3, 0, 0], lT: [-0.8, 0, 0.15], lS: [1.0, 0, 0] });
        if (u < 0.35) return blendPose(clinch, up, smooth(u / 0.35));
        if (u < 0.7) return blendPose(up, down, smooth((u - 0.35) / 0.35));
        return blendPose(down, GUARD, smooth((u - 0.7) / 0.3));
      }
      case 'clinch': case 'clinched': case 'subA': case 'pinA': case 'win': {
        const p = mk(STATE_POSES[f.state]);
        if (f.state === 'win') {
          p.air = Math.max(0, Math.sin(time * 5 + f.idx)) * 0.12;
          p.lU = [-2.6 + Math.sin(time * 6) * 0.15, 0, 0.5]; p.rU = [-2.6 - Math.sin(time * 6) * 0.15, 0, -0.5];
        }
        if (f.state === 'subA') p.torso = [0.85 + Math.sin(time * 8) * 0.05, 0, 0];
        return p;
      }
      default: return mk({});
    }
  }

  private refPose(time: number, sp: number, count: number, mode: string): Pose {
    if (mode === 'count') {
      const p = mk({
        torso: [0.85, 0, 0], head: [-0.4, 0, 0], lT: [-1.35, 0, 0.2], lS: [1.8, 0, 0], rT: [-0.2, 0, -0.2], rS: [1.6, 0, 0],
        lU: [-0.8, 0, 0.3], lF: [-0.6, 0, 0],
        rU: [-1.9 + Math.sin(time * 6.28) * 0.35 * (count > 0 ? 1 : 0.2), 0, -0.45], rF: [-0.2, 0, 0],
      });
      return p;
    }
    const p = mk(STATE_POSES.ref);
    this.phase += sp * 0.03;
    p.torso = [0.1 + Math.sin(time * 2) * 0.02, 0, 0];
    return p;
  }
}
