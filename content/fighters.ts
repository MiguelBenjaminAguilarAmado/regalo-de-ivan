/**
 * ============================================================
 *  CONFIGURACIÓN DE LUCHADORES — El Hoyo Wrestling
 * ============================================================
 *
 * CÓMO AÑADIR UN LUCHADOR NUEVO
 *  1. Crea la carpeta  fighters/<nombre>/  con su foto  (<nombre>.png)  y, si quieres, una foto de perfil
 *     cuadrada para los iconos  (<nombre>-pfp.png). El `id` de abajo es el nombre de la carpeta en minúsculas
 *     (carpeta "Ansol" -> id "ansol"). Los .md/.txt de la carpeta ya NO se leen: la descripción se escribe aquí.
 *  2. Añade una entrada en CONFIGS con ese id (puedes copiar y pegar la de otro luchador).
 *     Si NO añades entrada, el juego lo detecta igualmente y le da un perfil equilibrado por defecto.
 *  3. Elige sus golpes de la biblioteca (src/combat/moves.ts). Pueden repetirse entre luchadores,
 *     PERO cada finisher es único: dos luchadores no pueden compartir finisher
 *     (el juego lo comprueba al arrancar y en los tests).
 *
 * STATS (1 = normal)
 *   speed    velocidad de movimiento
 *   power    daño que hace
 *   health   vida máxima (100 = normal)
 *   stamina  resistencia máxima (100 = normal)
 *   tempo    rapidez de los golpes (más alto = golpes más rápidos)
 *   resist   daño recibido (0.85 = recibe menos daño)
 *   recover  tiempo en el suelo (0.8 = se levanta antes)
 *   escape   fuerza para zafarse de pins y sumisiones
 *
 * GOLPE FUERTE ALEATORIO (`heavyRandom`): lista de [movimiento, peso]. Cuanto mayor el peso, más habitual.
 * RASGOS (`traits`): rootedGuard = su guardia aguanta más pero no puede moverse.
 *
 * Los luchadores con `unlock` empiezan bloqueados:
 *   { wins: 3, hint: '...' }  se desbloquea tras 3 victorias totales
 *   { achievement: 'torneo', hint: '...' }  se desbloquea al conseguir ese logro (ver achievements.ts)
 */
import type { FighterConfig } from '../src/combat/types';

export const CONFIGS: FighterConfig[] = [
  // ----------------------------------------------------------------- ELSO
  {
    id: 'elso',
    description:
      'Salió de un barrio humilde de Honduras y arrasó en la primera temporada: lo ganó absolutamente todo. Desde entonces su estrella se ha ido apagando, pero sigue siendo uno de los tres grandes del Hoyo. Piel amarilla, chaqueta de cuero y muy poca paciencia.',
    style: 'Frenético y veloz, con resistencia media. Busca tumbarte cuanto antes con combos rápidos y, si te descuidas, con su golpe femboy.',
    stats: { speed: 1.22, power: 1.0, health: 92, stamina: 88, tempo: 1.22, resist: 1.0, recover: 1.0, escape: 1.0 },
    moves: {
      light: ['jab', 'directo', 'gancho'],
      heavy: 'patada_voladora',
      grab: { throw: 'cadera', slam: 'powerslam', sub: 'llave_brazo' },
      finisher: 'golpe_femboy',
      taunt: 'burla',
    },
    appearance: {
      skin: 0xe9c61a,
      hair: null,
      outfit: 'cuero',
      outfitColor: 0x1d1511,
      trunksColor: 0x131313,
      accent: 0x2f6fe0,
      mask: null,
      facePaint: 'payaso',
      build: 1.0,
      height: 1.02,
    },
  },
  // -------------------------------------------------------------- PETISUI
  {
    id: 'petisui',
    description:
      'Peleador curtido en los garitos de las 3000 viviendas, con una legión de fans y un ego a juego. Su segunda temporada fue pura gloria y desde entonces vive de aquello con la barbilla bien alta. Nunca se separa de su máscara.',
    style: 'El más difícil de tumbar: aguanta lo que le echen. Mezcla burlas con golpes directos y duros, y es muy propenso a las faltas. Su sillazo sale de la nada.',
    stats: { speed: 0.98, power: 1.1, health: 108, stamina: 135, tempo: 1.0, resist: 0.86, recover: 0.8, escape: 1.25 },
    moves: {
      light: ['jab', 'directo', 'gancho'],
      heavy: 'cabezazo',
      grab: { throw: 'suplex', slam: 'ddt', sub: 'cobra' },
      finisher: 'sillazo',
      taunt: 'vacile',
    },
    appearance: {
      skin: 0xc79b78,
      hair: null,
      outfit: 'traje',
      outfitColor: 0x17151b,
      trunksColor: 0x17151b,
      accent: 0xa3202a,
      mask: 'perro',
      facePaint: null,
      build: 1.05,
      height: 1.0,
    },
  },
  // ---------------------------------------------------------- PABLO MOTOS
  {
    id: 'pablo motos', // = nombre de su carpeta en minúsculas
    name: 'Pablo Motos',
    description:
      'El jefe del Hoyo: empresario, cantante, limpiador y, cuando toca, saco de boxeo de su propia compañía. Pesa lo que una bolsa de la compra, pero tiene todo el poder del despacho… y un arsenal de lo más surrealista.',
    style: 'Frágil pero impredecible. Su golpe fuerte es una lotería: maletín, micrófono, casco romano, momia o incluso un tanque. Y su finisher te despide.',
    stats: { speed: 1.12, power: 0.85, health: 72, stamina: 95, tempo: 1.05, resist: 1.2, recover: 1.0, escape: 0.8 },
    moves: {
      light: ['jab', 'directo', 'codazo'],
      heavy: 'maletinazo',
      // Más peso = más habitual. El tanque es rarísimo.
      heavyRandom: [
        ['maletinazo', 36],
        ['microfonazo', 30],
        ['casco_romano', 18],
        ['momia', 11],
        ['tanque', 5],
      ],
      grab: { throw: 'cadera', slam: 'body_slam', sub: 'cangrejo' },
      finisher: 'hora_pablo_motos',
      taunt: 'burla',
    },
    appearance: {
      skin: 0xc58f6c,
      hair: 0x0d0a09,
      beard: 0x0d0a09,
      glasses: true,
      outfit: 'blazer', // americana abierta sobre camisa blanca
      outfitColor: 0x121214,
      trunksColor: 0x121214,
      accent: 0xf2f2f2,
      mask: null,
      build: 0.88,
      height: 1.0,
    },
  },
  // ------------------------------------------------- PEPE THE GAY DRAGON
  {
    id: 'pepe the gay dragon',
    name: 'Pepe the Gay Dragon',
    description:
      'Un dragón con una máscara rosa de caballo que está convencido de ser un unicornio. Fue compañero inseparable de Cojón Marinado hasta que lo dejó tirado para irse con Sergio, el niño invencible. Va a pecho descubierto y sin ningún complejo.',
    style: 'Golpes lentos y demoledores. Su guardia es una roca: aguanta casi todo, pero no se puede mover. Su finisher le hace brotar un cuerno y embestir; contra Petisui puede acabar en toreo… y en un KO de un solo golpe.',
    stats: { speed: 0.86, power: 1.3, health: 116, stamina: 100, tempo: 0.74, resist: 0.95, recover: 1.0, escape: 1.0 },
    traits: { rootedGuard: true },
    moves: {
      light: ['jab', 'gancho', 'directo'],
      heavy: 'machada',
      grab: { throw: 'hombro', slam: 'powerslam', sub: 'cobra' },
      finisher: 'embestida_unicornio',
      taunt: 'rugido',
    },
    appearance: {
      skin: 0xc98560,
      hair: null,
      outfit: 'desnudo',
      outfitColor: 0x9a3a74,
      trunksColor: 0xb2487f,
      accent: 0xff7acb,
      wraps: 0x161216,
      mask: 'caballo',
      build: 1.18,
      height: 1.04,
    },
  },
  // ------------------------------------------- PLACEHOLDERS (sustitúyelos)
  {
    id: 'novato',
    name: 'Novato del Hoyo',
    placeholder: true,
    description: 'Luchador provisional recién llegado al Hoyo. Entusiasta, rápido y con más ganas que técnica. Sustitúyelo por uno de verdad añadiendo su carpeta en fighters/.',
    style: 'Equilibrado, con una plancha final espectacular.',
    stats: { speed: 1.05, power: 0.95, health: 100, stamina: 100 },
    moves: {
      light: ['jab', 'patada_baja', 'gancho'],
      heavy: 'machada',
      grab: { throw: 'hombro', slam: 'body_slam', sub: 'cangrejo' },
      finisher: 'plancha_final',
      taunt: 'burla',
    },
    appearance: { skin: 0xd9a27a, hair: 0x2b1d14, outfit: 'camiseta', outfitColor: 0x2d6a4f, trunksColor: 0x222a33, accent: 0xf2c14e, build: 0.98, height: 1.0 },
  },
  {
    id: 'veterano',
    name: 'Veterano del Hoyo',
    placeholder: true,
    description: 'Luchador provisional con mil combates a la espalda y las canas que lo demuestran. Sustitúyelo por uno de verdad añadiendo su carpeta en fighters/.',
    style: 'Sólido y paciente: golpea fuerte y aguanta bien.',
    stats: { speed: 0.95, power: 1.05, health: 106, stamina: 105, resist: 0.94 },
    moves: {
      light: ['jab', 'directo', 'codazo'],
      heavy: 'lariat',
      grab: { throw: 'suplex', slam: 'powerslam', sub: 'cobra' },
      finisher: 'martillo_hoyo',
      taunt: 'rugido',
    },
    appearance: { skin: 0x8d5a3b, hair: 0x9a9a9a, outfit: 'abrigo', outfitColor: 0x6b3e26, trunksColor: 0x2a1a12, accent: 0xd9d2c0, build: 1.08, height: 1.0 },
  },
  {
    id: 'brutote',
    name: 'Brutote del Hoyo',
    placeholder: true,
    description: 'Luchador provisional enorme y poco hablador. Sustitúyelo por uno de verdad añadiendo su carpeta en fighters/.',
    style: 'Lento pero devastador: mucha vida, mucha pegada.',
    stats: { speed: 0.85, power: 1.22, health: 124, stamina: 100, tempo: 0.9, resist: 0.92, recover: 0.9 },
    moves: {
      light: ['jab', 'rodillazo', 'gancho'],
      heavy: 'lariat',
      grab: { throw: 'hombro', slam: 'powerslam', sub: 'llave_brazo' },
      finisher: 'tornado',
      taunt: 'rugido',
    },
    appearance: { skin: 0xb4764f, hair: null, outfit: 'camiseta', outfitColor: 0x7a1f1f, trunksColor: 0x1a1a1a, accent: 0xe0b341, build: 1.16, height: 1.06 },
    unlock: { wins: 3, hint: 'Gana 3 combates en total' },
  },
  {
    id: 'agil',
    name: 'Ágil del Hoyo',
    placeholder: true,
    description: 'Luchador provisional que no se está quieto ni dormido. Sustitúyelo por uno de verdad añadiendo su carpeta en fighters/.',
    style: 'Rápido y escurridizo, con patadas por todas partes.',
    stats: { speed: 1.3, power: 0.9, health: 86, stamina: 96, tempo: 1.18, escape: 1.1 },
    moves: {
      light: ['jab', 'patada_baja', 'patada_alta'],
      heavy: 'patada_voladora',
      grab: { throw: 'cadera', slam: 'ddt', sub: 'cangrejo' },
      finisher: 'patada_fantasma',
      taunt: 'burla',
    },
    appearance: { skin: 0xe0b48f, hair: 0x101010, outfit: 'camiseta', outfitColor: 0x2c3e8f, trunksColor: 0x101010, accent: 0x6ee0ff, build: 0.93, height: 0.99 },
    unlock: { achievement: 'torneo', hint: 'Gana un torneo' },
  },
];
