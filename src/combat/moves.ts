import type { Grapple, Move } from './types';

const S = (m: Omit<Move, 'kind'> & { kind?: Move['kind'] }): Move => ({ kind: 'strike', ...m }) as Move;

/** Biblioteca compartida de movimientos. Varios luchadores pueden compartir cualquiera
 *  salvo los finishers, que son únicos (ver validateRoster en fighters.ts). */
export const MOVES: Record<string, Move> = {};
const add = (...ms: Move[]) => ms.forEach((m) => (MOVES[m.id] = m));

// ---------- Golpes ligeros ----------
add(
  S({ id: 'jab', name: 'Jab', startup: 0.1, active: 0.07, recovery: 0.17, damage: 4, range: 1.3, stamina: 4, hitstun: 0.24, knockback: 0.3, momentum: 5, anim: 'jab' }),
  S({ id: 'directo', name: 'Directo', startup: 0.13, active: 0.07, recovery: 0.2, damage: 5.5, range: 1.4, stamina: 5, hitstun: 0.27, knockback: 0.4, momentum: 6, anim: 'cross', lunge: 1.2 }),
  S({ id: 'gancho', name: 'Gancho', startup: 0.16, active: 0.07, recovery: 0.24, damage: 6.5, range: 1.4, stamina: 6, hitstun: 0.3, knockback: 0.5, momentum: 7, anim: 'hook' }),
  S({ id: 'patada_baja', name: 'Patada baja', startup: 0.15, active: 0.07, recovery: 0.23, damage: 5, range: 1.6, stamina: 5, hitstun: 0.25, knockback: 0.35, momentum: 5, anim: 'lowkick' }),
  S({ id: 'rodillazo', name: 'Rodillazo', startup: 0.13, active: 0.07, recovery: 0.22, damage: 6, range: 1.15, stamina: 6, hitstun: 0.3, knockback: 0.35, momentum: 6, anim: 'knee' }),
  S({ id: 'codazo', name: 'Codazo', startup: 0.12, active: 0.07, recovery: 0.2, damage: 5.5, range: 1.15, stamina: 5, hitstun: 0.28, knockback: 0.3, momentum: 6, anim: 'elbow' }),
  S({ id: 'patada_alta', name: 'Patada alta', startup: 0.2, active: 0.08, recovery: 0.3, damage: 8, range: 1.8, stamina: 8, hitstun: 0.38, knockback: 0.7, momentum: 8, anim: 'highkick' }),
);

// ---------- Golpes fuertes ----------
add(
  S({ id: 'machada', name: 'Machada', startup: 0.3, active: 0.1, recovery: 0.42, damage: 12, range: 1.55, stamina: 14, hitstun: 0.5, knockback: 1.3, knockdown: true, momentum: 11, anim: 'haymaker', lunge: 1.6 }),
  S({ id: 'lariat', name: 'Lariat', startup: 0.32, active: 0.12, recovery: 0.45, damage: 11, range: 1.85, stamina: 15, hitstun: 0.5, knockback: 1.6, knockdown: true, sendOut: true, momentum: 11, anim: 'lariat', lunge: 1.4 }),
  S({ id: 'patada_voladora', name: 'Patada voladora', startup: 0.34, active: 0.14, recovery: 0.55, damage: 13, range: 2.2, stamina: 18, hitstun: 0.5, knockback: 1.8, knockdown: true, sendOut: true, momentum: 12, anim: 'dropkick', lunge: 4.2 }),
  S({ id: 'cabezazo', name: 'Cabezazo', startup: 0.26, active: 0.1, recovery: 0.4, damage: 11, range: 1.15, stamina: 13, hitstun: 0.5, knockback: 0.8, knockdown: true, momentum: 10, anim: 'headbutt', foul: true }),
  S({ id: 'maletinazo', name: 'Maletinazo', startup: 0.28, active: 0.1, recovery: 0.4, damage: 11, range: 1.55, stamina: 13, hitstun: 0.5, knockback: 1.2, knockdown: true, momentum: 11, anim: 'haymaker', lunge: 1.4, prop: 'maletin' }),
  // --- Arsenal de Pablo Motos (aparecen al azar con el golpe fuerte) ---
  S({ id: 'microfonazo', name: 'Micrófono', startup: 0.26, active: 0.1, recovery: 0.4, damage: 9, range: 1.7, stamina: 11, hitstun: 0.95, knockback: 0.5, momentum: 10, anim: 'micswing', prop: 'microfono' }),
  S({ id: 'casco_romano', name: 'Cabezazo del centurión', startup: 0.32, active: 0.1, recovery: 0.45, damage: 13, range: 1.4, stamina: 14, hitstun: 0.5, knockback: 1.1, knockdown: true, momentum: 12, anim: 'headbutt', lunge: 2.2, prop: 'casco', announce: '¡Pablo Motos se pone el casco romano!' }),
  S({ id: 'momia', name: 'La momia', startup: 0.85, active: 0.14, recovery: 0.5, damage: 12, range: 2.8, stamina: 16, hitstun: 0.6, knockback: 1.6, knockdown: true, momentum: 14, anim: 'summon', summon: 'momia', announce: '¡Pablo Motos invoca una MOMIA!' }),
  S({ id: 'tanque', name: 'El tanque', startup: 1.15, active: 0.16, recovery: 0.7, damage: 17, range: 3.6, stamina: 20, hitstun: 0.6, knockback: 3.0, knockdown: true, sendOut: true, momentum: 18, anim: 'summon', summon: 'tanque', announce: '¡¡Pablo Motos saca un TANQUE!!' }),
  // Golpe sucio de Dark Sin Facha: saca un bate de béisbol (no reglamentario)
  S({ id: 'batazo', name: 'Batazo', startup: 0.3, active: 0.1, recovery: 0.42, damage: 12, range: 1.7, stamina: 13, hitstun: 0.5, knockback: 1.3, knockdown: true, momentum: 11, anim: 'micswing', foul: true, prop: 'bate', announce: '¡Dark Sin Facha saca un BATE!' }),
  S({ id: 'golpe_bajo', name: 'Golpe bajo', startup: 0.2, active: 0.08, recovery: 0.38, damage: 10, range: 1.2, stamina: 10, hitstun: 0.8, knockback: 0.2, momentum: 9, anim: 'lowblow', foul: true }),
);

// ---------- Burlas ----------
add(
  S({ id: 'burla', name: 'Burla', kind: 'taunt', startup: 0.2, active: 0, recovery: 0.8, damage: 0, range: 0, stamina: 0, hitstun: 0, knockback: 0, momentum: 7, anim: 'taunt' }),
  S({ id: 'vacile', name: 'Vacile', kind: 'taunt', startup: 0.25, active: 0, recovery: 1.0, damage: 0, range: 0, stamina: 0, hitstun: 0, knockback: 0, momentum: 11, anim: 'taunt2' }),
  S({ id: 'rugido', name: 'Rugido', kind: 'taunt', startup: 0.25, active: 0, recovery: 0.9, damage: 0, range: 0, stamina: 0, hitstun: 0, knockback: 0, momentum: 9, anim: 'taunt' }),
);

// ---------- Agarre (el intento) ----------
add(S({ id: 'agarre', name: 'Agarre', kind: 'grab', startup: 0.18, active: 0.1, recovery: 0.38, damage: 0, range: 1.4, stamina: 7, hitstun: 0, knockback: 0, momentum: 0, anim: 'grab' }));

// ---------- Llaves y lanzamientos tras el agarre ----------
export const GRAPPLES: Record<string, Grapple> = {};
const addG = (...gs: Grapple[]) => gs.forEach((g) => (GRAPPLES[g.id] = g));
addG(
  { id: 'suplex', name: 'Suplex', damage: 11, anim: 'throw', style: 'throw' },
  { id: 'cadera', name: 'Lanzamiento de cadera', damage: 10, anim: 'throw', style: 'throw' },
  { id: 'hombro', name: 'Lanzamiento de hombro', damage: 10, anim: 'throw', style: 'throw' },
  { id: 'powerslam', name: 'Powerslam', damage: 17, anim: 'slam', style: 'slam' },
  { id: 'ddt', name: 'DDT', damage: 16, anim: 'slam', style: 'slam' },
  { id: 'body_slam', name: 'Body slam', damage: 15, anim: 'slam', style: 'slam' },
  { id: 'llave_brazo', name: 'Llave de brazo', damage: 0, anim: 'sub', style: 'slam' },
  { id: 'cangrejo', name: 'El cangrejo', damage: 0, anim: 'sub', style: 'slam' },
  { id: 'cobra', name: 'Cobra clutch', damage: 0, anim: 'sub', style: 'slam' },
);

// ---------- Finishers (cada uno es ÚNICO de un solo luchador) ----------
add(
  S({
    id: 'golpe_femboy', name: 'El golpe femboy', kind: 'finisher', startup: 1.05, active: 0.14, recovery: 0.9, damage: 38, range: 1.9, stamina: 0,
    hitstun: 0, knockback: 3.4, knockdown: true, momentum: 0, anim: 'finPunch', lunge: 2.2,
    vfx: { color: 0xff4fa3, callout: 'EL GOLPE FEMBOY' },
  }),
  S({
    id: 'sillazo', name: 'El sillazo', kind: 'finisher', startup: 0.95, active: 0.14, recovery: 1.0, damage: 35, range: 1.7, stamina: 0,
    hitstun: 0, knockback: 2.6, knockdown: true, momentum: 0, anim: 'finChair', lunge: 1.4,
    prop: 'chair', vfx: { color: 0xffc94a, callout: 'EL SILLAZO' },
  }),
  S({
    id: 'plancha_final', name: 'La plancha final', kind: 'finisher', startup: 0.9, active: 0.2, recovery: 1.1, damage: 36, range: 3.2, stamina: 0,
    hitstun: 0, knockback: 2.4, knockdown: true, momentum: 0, anim: 'finLeap', lunge: 5.6,
    vfx: { color: 0x7ad0ff, callout: 'LA PLANCHA FINAL' },
  }),
  S({
    id: 'martillo_hoyo', name: 'El martillo del Hoyo', kind: 'finisher', startup: 1.0, active: 0.14, recovery: 0.95, damage: 34, range: 1.7, stamina: 0,
    hitstun: 0, knockback: 1.6, knockdown: true, momentum: 0, anim: 'finHammer', lunge: 1.2,
    vfx: { color: 0xff7a3a, callout: 'EL MARTILLO DEL HOYO' },
  }),
  S({
    id: 'patada_fantasma', name: 'La patada fantasma', kind: 'finisher', startup: 0.85, active: 0.16, recovery: 0.95, damage: 35, range: 2.1, stamina: 0,
    hitstun: 0, knockback: 3.0, knockdown: true, momentum: 0, anim: 'finKick', lunge: 2.4,
    vfx: { color: 0xb39cff, callout: 'LA PATADA FANTASMA' },
  }),
  S({
    id: 'tornado', name: 'El tornado', kind: 'finisher', startup: 0.95, active: 0.2, recovery: 1.0, damage: 33, range: 2.0, stamina: 0,
    hitstun: 0, knockback: 3.2, knockdown: true, sendOut: true, momentum: 0, anim: 'finSpin', lunge: 1.8,
    vfx: { color: 0x9dff7a, callout: 'EL TORNADO' },
  }),
);

add(
  S({
    id: 'embestida_unicornio', name: 'La embestida del unicornio', kind: 'finisher', startup: 1.1, active: 0.55, recovery: 1.0, damage: 40, range: 1.7, stamina: 0,
    hitstun: 0, knockback: 4.2, knockdown: true, momentum: 0, anim: 'finCharge', rush: 9, prop: 'cuerno',
    vfx: { color: 0xff6ad5, callout: 'LA EMBESTIDA DEL UNICORNIO' },
  }),
  // Remate de un solo golpe tras torearle (solo Pepe vs Petisui)
  S({ id: 'golpe_unico', name: 'Un solo golpe', kind: 'finisher', startup: 0.4, active: 0.12, recovery: 0.8, damage: 999, range: 2.4, stamina: 0, hitstun: 0, knockback: 3, knockdown: true, momentum: 0, anim: 'haymaker', lunge: 3, vfx: { color: 0xff6ad5, callout: '¡UN SOLO GOLPE!' } }),
  S({
    id: 'hora_pablo_motos', name: 'La hora de Pablo Motos', kind: 'finisher', startup: 1.1, active: 0.14, recovery: 0.9, damage: 12, range: 2.4, stamina: 0,
    hitstun: 0, knockback: 3.4, knockdown: true, sendOut: true, momentum: 0, anim: 'finPoint', lunge: 0.6,
    vfx: { color: 0xf5f5f5, callout: 'LA HORA DE PABLO MOTOS' },
  }),
  // Reserva para luchadores nuevos sin configuración propia
  S({ id: 'cuchilla_dorada', name: 'La cuchilla dorada', kind: 'finisher', startup: 0.9, active: 0.16, recovery: 0.95, damage: 35, range: 2.0, stamina: 0, hitstun: 0, knockback: 2.8, knockdown: true, momentum: 0, anim: 'finKick', lunge: 2.2, vfx: { color: 0xffd45e, callout: 'LA CUCHILLA DORADA' } }),
  S({ id: 'meteoro', name: 'El meteoro', kind: 'finisher', startup: 0.9, active: 0.2, recovery: 1.1, damage: 36, range: 3.2, stamina: 0, hitstun: 0, knockback: 2.4, knockdown: true, momentum: 0, anim: 'finLeap', lunge: 5.4, vfx: { color: 0xff6a4a, callout: 'EL METEORO' } }),
  S({ id: 'trueno_barrio', name: 'El trueno del barrio', kind: 'finisher', startup: 1.0, active: 0.14, recovery: 0.95, damage: 34, range: 1.7, stamina: 0, hitstun: 0, knockback: 1.6, knockdown: true, momentum: 0, anim: 'finHammer', lunge: 1.2, vfx: { color: 0x66b7ff, callout: 'EL TRUENO DEL BARRIO' } }),
  S({ id: 'ciclon', name: 'El ciclón', kind: 'finisher', startup: 0.95, active: 0.2, recovery: 1.0, damage: 33, range: 2.0, stamina: 0, hitstun: 0, knockback: 3.0, knockdown: true, sendOut: true, momentum: 0, anim: 'finSpin', lunge: 1.8, vfx: { color: 0x7dffb2, callout: 'EL CICLÓN' } }),
);

// Planchazo de Konguito desde el poste de la esquina (lo elige pickHeavy si está en una esquina; la trayectoria la lleva Match.stepDive)
add(
  S({ id: 'planchazo', name: 'Planchazo de esquina', startup: 1.2, active: 0.42, recovery: 0.95, damage: 17, range: 1.3, stamina: 20, hitstun: 0.6, knockback: 1.8, knockdown: true, momentum: 16, anim: 'finLeap', announce: '¡Konguito se sube a la esquina!' }),
);

// ---------- Finishers de los luchadores añadidos después ----------
add(
  S({
    id: 'la_traicion', name: 'La traición', kind: 'finisher', startup: 0.8, active: 0.16, recovery: 0.95, damage: 34, range: 2.2, stamina: 0,
    hitstun: 0, knockback: 2.8, knockdown: true, momentum: 0, anim: 'finKick', lunge: 2.8,
    vfx: { color: 0xb34aff, callout: 'LA TRAICIÓN' },
  }),
  S({
    id: 'corona_manchester', name: 'La corona de Manchester', kind: 'finisher', startup: 1.0, active: 0.14, recovery: 0.95, damage: 36, range: 1.8, stamina: 0,
    hitstun: 0, knockback: 2.4, knockdown: true, momentum: 0, anim: 'finHammer', lunge: 1.4,
    vfx: { color: 0x66a8ff, callout: 'LA CORONA DE MANCHESTER' },
  }),
  S({
    id: 'sentencia_justa', name: 'La sentencia justa', kind: 'finisher', startup: 1.05, active: 0.55, recovery: 1.0, damage: 39, range: 1.8, stamina: 0,
    hitstun: 0, knockback: 4.0, knockdown: true, momentum: 0, anim: 'finCharge', rush: 8,
    vfx: { color: 0xe0e6ff, callout: 'LA SENTENCIA JUSTA' },
  }),
  S({
    id: 'capa_invencible', name: 'La capa invencible', kind: 'finisher', startup: 0.85, active: 0.2, recovery: 1.0, damage: 35, range: 3.2, stamina: 0,
    hitstun: 0, knockback: 2.6, knockdown: true, momentum: 0, anim: 'finLeap', lunge: 5.4,
    vfx: { color: 0xff3a3a, callout: 'LA CAPA INVENCIBLE' },
  }),
  S({
    id: 'golpe_novato', name: 'El golpe del novato', kind: 'finisher', startup: 0.85, active: 0.16, recovery: 0.95, damage: 36, range: 2.0, stamina: 0,
    hitstun: 0, knockback: 3.0, knockdown: true, momentum: 0, anim: 'finPunch', lunge: 2.6,
    vfx: { color: 0xff5a3a, callout: 'EL GOLPE DEL NOVATO' },
  }),
  S({
    id: 'bocado_canibal', name: 'El bocado caníbal', kind: 'finisher', startup: 1.0, active: 0.16, recovery: 1.0, damage: 37, range: 1.6, stamina: 0,
    hitstun: 0, knockback: 2.2, knockdown: true, momentum: 0, anim: 'headbutt', lunge: 1.8, foul: true,
    vfx: { color: 0xffc21a, callout: 'EL BOCADO CANÍBAL' },
  }),
  S({
    id: 'solazo', name: 'El solazo', kind: 'finisher', startup: 1.0, active: 0.14, recovery: 0.95, damage: 35, range: 1.8, stamina: 0,
    hitstun: 0, knockback: 2.8, knockdown: true, momentum: 0, anim: 'finHammer', lunge: 1.4,
    vfx: { color: 0xffc23a, callout: 'EL SOLAZO' },
  }),
  S({
    id: 'impacto_boom', name: 'El impacto Boom', kind: 'finisher', startup: 1.0, active: 0.55, recovery: 1.0, damage: 38, range: 1.8, stamina: 0,
    hitstun: 0, knockback: 4.0, knockdown: true, momentum: 0, anim: 'finCharge', rush: 8.5,
    vfx: { color: 0xff5a2a, callout: 'EL IMPACTO BOOM' },
  }),
  // Oportunista: arranca más rápido que los demás finishers, pero pega algo menos
  S({
    id: 'fachazo_directo', name: 'El fachazo directo', kind: 'finisher', startup: 0.6, active: 0.14, recovery: 0.9, damage: 31, range: 1.9, stamina: 0,
    hitstun: 0, knockback: 2.4, knockdown: true, momentum: 0, anim: 'finPunch', lunge: 2.6,
    vfx: { color: 0x9aa0ff, callout: 'EL FACHAZO DIRECTO' },
  }),
  S({
    id: 'salto_cheto', name: 'El salto cheto', kind: 'finisher', startup: 0.95, active: 0.2, recovery: 1.1, damage: 36, range: 3.2, stamina: 0,
    hitstun: 0, knockback: 2.4, knockdown: true, momentum: 0, anim: 'finLeap', lunge: 5.6,
    vfx: { color: 0xff9d1a, callout: 'EL SALTO CHETO' },
  }),
  // La puerta se abre, salen 5 de la tribu y apalean al rival (animación en Summons.tribe)
  S({
    id: 'ritual_satanico', name: 'Ritual satánico', kind: 'finisher', startup: 1.8, active: 0.2, recovery: 1.0, damage: 37, range: 3.6, stamina: 0,
    hitstun: 0, knockback: 1.4, knockdown: true, momentum: 0, anim: 'summon', summon: 'tribu',
    vfx: { color: 0xff2a2a, callout: 'RITUAL SATÁNICO' },
    announce: '¡Kongui abre la puerta… y sale la tribu!',
  }),
);

export const getMove = (id: string): Move => {
  const m = MOVES[id];
  if (!m) throw new Error(`Movimiento desconocido: ${id}`);
  return m;
};
export const getGrapple = (id: string): Grapple => {
  const g = GRAPPLES[id];
  if (!g) throw new Error(`Llave desconocida: ${id}`);
  return g;
};
