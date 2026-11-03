import type { ArenaId } from './types';

/** Reglas que cambian según el escenario (las lee Match). */
export interface ArenaRules {
  /** Hay ring con cuerdas y lona elevada. Sin ring no hay salidas ni cuenta fuera. */
  ring: boolean;
  /** Si el que está en el suelo toca las cuerdas, el pin se rompe solo. */
  ropeBreak: boolean;
  /** El árbitro ve las faltas (si no, nadie te castiga por jugar sucio). */
  refSees: boolean;
  /** Cuenta fuera de 10 segundos si sales del ring. */
  countOut: boolean;
  /** El público es la tribu: si golpeas hacia ellos, se te echan encima. */
  mob: boolean;
  /** Radio del recinto circular (null = el cuadrado de la barricada). */
  radius: number | null;
  /** Jaula de acero: no se puede salir del ring y los golpes fuertes contra la reja hacen daño extra. */
  cage?: boolean;
  /** Ráfagas de viento que empujan a los dos luchadores cada cierto tiempo. */
  wind?: boolean;
  /** Multiplicador de velocidad de movimiento (arena = más lento). */
  slow?: number;
  /** Oficina de Pablo Motos: de vez en cuando lanza un maletín al que va perdiendo. */
  office?: boolean;
  /** Campeonato 24/7: la cuenta del pin va mucho más rápido. */
  fastPin?: number;
  /** Apagones: la luz se va unos segundos; todo es más torpe y el momentum sube más rápido. */
  blackout?: boolean;
}

export type MusicId = 'matamoros' | 'manchester' | 'tribu' | 'garito' | 'jaula' | 'azotea' | 'playa' | 'oficina' | 'ascensor' | 'santiago';

export interface ArenaInfo {
  name: string;
  /** Nombre en mayúsculas para la pantalla de presentación */
  upper: string;
  desc: string;
  music: MusicId;
  rules: ArenaRules;
  /** Escenario profesional (pabellones de la empresa) frente a los de la calle */
  pro: boolean;
}

const ARENA_RULES: ArenaRules = { ring: true, ropeBreak: true, refSees: true, countOut: true, mob: false, radius: null };

export const ARENA_INFO = {
  matamoros: { name: 'Matamoros', upper: 'MATAMOROS', desc: '30.000 personas · orquesta en la esquina superior derecha', music: 'matamoros', rules: ARENA_RULES, pro: true },
  manchester: { name: 'Manchester', upper: 'MANCHESTER', desc: '60.000 personas · teatro con dos columnas gigantes y un monigote azul', music: 'manchester', rules: ARENA_RULES, pro: true },
  tribu: {
    name: 'Tribu de Kongui', upper: 'LA TRIBU DE KONGUI',
    desc: 'Aldea africana al atardecer · sin ring ni cuerdas · el público es la tribu: si le pegas a uno, te atacan todos',
    music: 'tribu',
    rules: { ring: false, ropeBreak: false, refSees: true, countOut: false, mob: true, radius: 7.2 },
    pro: false,
  },
  garito: {
    name: 'Garito de las 3000', upper: 'EL GARITO DE LAS 3000',
    desc: 'Sótano clandestino de las 3000 viviendas · sin cuenta fuera, el árbitro no ve nada y las cuerdas no te salvan',
    music: 'garito',
    rules: { ring: true, ropeBreak: false, refSees: false, countOut: false, mob: false, radius: null },
    pro: false,
  },
} as Record<ArenaId, ArenaInfo>;

ARENA_INFO.jaula = {
  name: 'Jaula de Acero', upper: 'LA JAULA DE ACERO',
  desc: 'Pabellón profesional con una jaula alrededor del ring · no hay salida: ni cuenta fuera ni cuerdas · los golpes fuertes contra la reja hacen daño extra',
  music: 'jaula', pro: true,
  rules: { ring: true, ropeBreak: false, refSees: true, countOut: false, mob: false, radius: null, cage: true },
};
ARENA_INFO.azotea = {
  name: 'Azotea de las 3000', upper: 'LA AZOTEA DE LAS 3000',
  desc: 'Ring improvisado en lo alto de un bloque de las 3000 viviendas, de noche · cada cierto tiempo sopla una ráfaga de viento que os empuja a los dos',
  music: 'azotea', pro: false,
  rules: { ring: true, ropeBreak: true, refSees: false, countOut: true, mob: false, radius: null, wind: true },
};
ARENA_INFO.playa = {
  name: 'Playa de Honduras', upper: 'LA PLAYA DE HONDURAS',
  desc: 'Ring sobre la arena, con hoguera y antorchas tiki bajo la luna · la arena te frena un 10 % al moverte',
  music: 'playa', pro: false,
  rules: { ring: true, ropeBreak: true, refSees: true, countOut: true, mob: false, radius: null, slow: 0.9 },
};

ARENA_INFO.oficina = {
  name: 'Oficina de Pablo Motos', upper: 'LA OFICINA DE PABLO MOTOS',
  desc: 'La sala de juntas del jefe, con acuario y ejecutivos mirando · de vez en cuando Pablo lanza un maletín al que va perdiendo',
  music: 'oficina', pro: false,
  rules: { ring: true, ropeBreak: true, refSees: true, countOut: true, mob: false, radius: null, office: true },
};
ARENA_INFO.ascensor = {
  name: 'Ascensor 24/7', upper: 'EL ASCENSOR 24/7',
  desc: 'Una cabina de cristal colgada sobre la ciudad · sin ring ni cuerdas · en el campeonato 24/7 los pins se cuentan rapidísimo',
  music: 'ascensor', pro: false,
  rules: { ring: false, ropeBreak: false, refSees: false, countOut: false, mob: false, radius: 3.5, fastPin: 2.3 },
};
ARENA_INFO.santiago = {
  name: 'Estadio de Santiago', upper: 'EL ESTADIO DE SANTIAGO DE CHILE',
  desc: 'Estadio al aire libre donde se jugó el Gauntlet · de vez en cuando se va la luz: todo es más torpe y el momentum sube más rápido',
  music: 'santiago', pro: true,
  rules: { ring: true, ropeBreak: true, refSees: true, countOut: true, mob: false, radius: null, blackout: true },
};

ARENA_INFO.callejon = {
  name: 'Callejón de Hoyo', upper: 'EL CALLEJÓN DE HOYO',
  desc: 'El escenario de los combates callejeros de la ciudad: un círculo de tiza entre paredes de ladrillo, de noche · sin ring ni árbitro que mire',
  music: 'garito', pro: false,
  rules: { ring: false, ropeBreak: false, refSees: false, countOut: false, mob: false, radius: 7.2 },
};

export const ARENA_IDS = Object.keys(ARENA_INFO) as ArenaId[];
