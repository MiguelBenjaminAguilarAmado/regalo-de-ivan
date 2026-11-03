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
    skins: [
      {
        id: 'campeon', name: 'Campeón del Hoyo',
        description: 'Elso con el cinturón al hombro, como en sus mejores noches de la temporada 1. Se desbloquea en la Historia.',
        unlock: { achievement: 'cap5', hint: 'Historia: derrota a Yosuke' },
        appearance: { belt: 0x16130f, hat: { kind: 'corona', color: 0xd8b43a } },
      },
    ],
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
    skins: [
      {
        id: 'manchester', name: 'Hoyo Champion (Manchester)',
        description: 'El traje de la correa de Manchester: el main event contra Kent, donde conservó su título de Hoyo Champion. Sombrero pirata, camisa azul, corbata negra y el cinturón.',
        appearance: { hat: { kind: 'tricornio', color: 0x1c1f2a }, outfit: 'traje', outfitColor: 0x8a90d8, trunksColor: 0x1a1a22, accent: 0x111114, belt: 0x16130f },
      },
    ],
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
    style: 'Frágil pero impredecible. Su golpe fuerte es una lotería: maletín, micrófono, casco romano, momia o incluso un tanque. Y su finisher te lanza fuera del ring (te hace algo de daño, pero te recuperas)… salvo que te quede un 15 % de vida o menos: entonces te DESPIDE.',
    stats: { speed: 1.12, power: 0.9, health: 86, stamina: 100, tempo: 1.08, resist: 1.1, recover: 0.95, escape: 0.9 },
    skins: [
      {
        id: 'momia', name: 'Momia romana',
        description: 'Pablo Motos ha traído muchos trajes al EHW: este es el de momia con casco de soldado romano.',
        appearance: { skin: 0xd8cdb0, hair: null, beard: null, glasses: false, outfit: 'desnudo', outfitColor: 0xd8cdb0, trunksColor: 0xc9bd9a, accent: 0x8a7a55, wraps: 0xcfc3a0, bandages: 0xe8dfc4, hat: { kind: 'casco', color: 0xb08a3a } },
      },
      {
        id: 'astronauta', name: 'Astronauta alien',
        description: 'Otro de sus trajes míticos: astronauta con una máscara de alien.',
        appearance: { hair: null, beard: null, glasses: false, outfit: 'traje', outfitColor: 0xe8ecf2, trunksColor: 0xe8ecf2, accent: 0xff6a2a, wraps: 0xdadde4, backpack: 0xb8bcc6, mask: 'alien' },
      },
      {
        id: 'supremo', name: 'Jefe supremo',
        description: 'Traje blanco, corona y aires de emperador. Se desbloquea al completar la Historia.',
        unlock: { achievement: 'historia', hint: 'Completa el modo Historia' },
        appearance: { outfit: 'blazer', outfitColor: 0xf2f2f2, trunksColor: 0xf2f2f2, accent: 0xd8b43a, hat: { kind: 'corona', color: 0xd8b43a } },
      },
    ],
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
  // ---------------------------------------------------------------- ANSOL
  {
    id: 'ansol',
    description:
      'Uno de los tres grandes del Hoyo junto a Elso y Petisui. Melena y barba negras, sombrero de ala ancha con el logo del sol y una cadena de plata al cuello: sale al ring con la calma de quien ya lo ha visto todo.',
    style: 'El más completo del trío: buen ritmo, pegada sólida y mucho fondo. Su finisher, el solazo, cae como un martillazo.',
    stats: { speed: 1.04, power: 1.1, health: 108, stamina: 115, tempo: 1.06, resist: 0.96, recover: 0.95, escape: 1.1 },
    moves: {
      light: ['jab', 'directo', 'codazo'],
      heavy: 'lariat',
      grab: { throw: 'suplex', slam: 'powerslam', sub: 'cobra' },
      finisher: 'solazo',
      taunt: 'burla',
    },
    appearance: {
      skin: 0xb98062,
      hair: 0x15100d,
      hairStyle: 'larga',
      beard: 0x15100d,
      hat: { kind: 'sombrero', color: 0x1b1d1b },
      outfit: 'camiseta',
      outfitColor: 0x2a2f2a,
      trunksColor: 0x141414,
      accent: 0xc9ccd2,
      mask: null,
      build: 1.1,
      height: 1.02,
    },
  },
  // ------------------------------------------------------------- BIG BOOM
  {
    id: 'big boom',
    name: 'Big Boom',
    description:
      'Fichado por Pablo Motos y despedido junto a su inseparable Big Justice tras un combate de dos contra uno frente a Konguito. Volvió para pelear en grande contra el mismísimo campeón Elso. Gorra, gafas de sol, un cinturón que no deja de lucir y mallas de estrellas.',
    style: 'Fuerza bruta y presión constante. Aguanta muchísimo castigo y su impacto Boom es una embestida directa con todo su peso.',
    stats: { speed: 0.9, power: 1.2, health: 118, stamina: 120, tempo: 0.92, resist: 0.92, recover: 0.9, escape: 1.05 },
    moves: {
      light: ['jab', 'rodillazo', 'gancho'],
      heavy: 'machada',
      grab: { throw: 'hombro', slam: 'body_slam', sub: 'llave_brazo' },
      finisher: 'impacto_boom',
      taunt: 'rugido',
    },
    appearance: {
      skin: 0xe2a07c,
      hair: null,
      hat: { kind: 'gorra', color: 0x3a3b3e },
      glasses: 'sol',
      outfit: 'desnudo',
      outfitColor: 0xe2a07c,
      trunksColor: 0xf0eee8,
      accent: 0xb3202e,
      mask: null,
      build: 1.14,
      height: 1.03,
    },
  },
  // --------------------------------------------------------- DARK SIN FACHA
  {
    id: 'darksinfacha',
    name: 'Dark Sin Facha',
    description:
      'Entró al Hoyo gracias a los contactos de su padre con el jefe y desde entonces lo llaman "hijo mimado". Acumula derrotas, pero siempre vuelve con una bolsa negra de sonrisa permanente en la cabeza: la copia barata de Marshmello.',
    style: 'Ágil pero frágil. Compensa su poca resistencia con trampas: golpes bajos y un bate de béisbol (falta si el árbitro mira). Su fachazo directo arranca antes que cualquier otro finisher.',
    stats: { speed: 1.16, power: 0.9, health: 86, stamina: 92, tempo: 1.12, resist: 1.08, recover: 1.05, escape: 0.9 },
    skins: [
      {
        id: 'alesinfacha', name: 'Alesinfacha',
        description: 'Darksinfacha se llamaba originalmente Alesinfacha, y este traje lo trae de vuelta: bolsa y camisa blancas, con una sudadera blanca encima.',
        appearance: { mask: 'bolsa', maskColor: 0xf2f2f2, outfit: 'sudadera', outfitColor: 0xf4f4f4, trunksColor: 0xdedede, accent: 0x7dc3ff },
      },
    ],
    moves: {
      light: ['jab', 'patada_baja', 'gancho'],
      heavy: 'batazo',
      // El bate sale casi siempre; de vez en cuando prefiere el golpe bajo a traición.
      heavyRandom: [
        ['batazo', 70],
        ['golpe_bajo', 30],
      ],
      grab: { throw: 'cadera', slam: 'ddt', sub: 'cangrejo' },
      finisher: 'fachazo_directo',
      taunt: 'burla',
    },
    appearance: {
      skin: 0xd4a07c,
      hair: null,
      mask: 'bolsa',
      outfit: 'camiseta',
      outfitColor: 0x161616,
      trunksColor: 0x101010,
      accent: 0x7dc3ff,
      build: 0.98,
      height: 1.0,
    },
  },
  // ---------------------------------------------------------------- KONGUITO
  {
    id: 'kongui',
    name: 'Konguito',
    description:
      'Rescatado de una tribu en la miseria tras el impacto de un meteorito y entrenado por monjes y romanos, forjó el legendario Reino Kongui. Carismático, enorme y con una cresta azul inconfundible, es el eterno rival del malvado Peti-judío.',
    style: 'Fuerza descomunal y mucho aguante. Si pulsas golpe fuerte en una esquina se sube al poste y se lanza con un planchazo que hace temblar el ring. Su ritual satánico abre una puerta de la que sale la tribu entera.',
    stats: { speed: 0.94, power: 1.2, health: 120, stamina: 125, tempo: 0.95, resist: 0.94, recover: 0.9, escape: 1.1 },
    skins: [
      {
        id: 'rey', name: 'Rey Kongui',
        description: 'El soberano del Reino Kongui con su corona y mallas doradas. Se desbloquea en la Historia.',
        unlock: { achievement: 'cap3', hint: 'Historia: gana el Hoyo Champion' },
        appearance: { hat: { kind: 'corona', color: 0xd8b43a }, trunksColor: 0xd8b43a, belt: 0x6a1a1a },
      },
    ],
    moves: {
      light: ['jab', 'rodillazo', 'directo'],
      heavy: 'lariat',
      grab: { throw: 'hombro', slam: 'powerslam', sub: 'llave_brazo' },
      finisher: 'ritual_satanico',
      taunt: 'rugido',
    },
    traits: { cornerDive: true },
    appearance: {
      skin: 0x141317,
      hair: 0x2a55d6,
      hairStyle: 'cresta',
      outfit: 'desnudo',
      outfitColor: 0x141317,
      trunksColor: 0x8a4fd0,
      accent: 0xd8b25a,
      mask: null,
      build: 1.22,
      height: 1.06,
    },
  },
  // ------------------------------------------------------------ PERRO CHEETOS
  {
    id: 'perro cheetos',
    name: 'Perro Cheetos',
    description:
      'De origen misterioso: dicen que es una raza distinta creada en un laboratorio. Debutó llegando en coche con Snoop Dogg, perdió contra Elso y se llevó el premio al Mejor Debut. Máscara de perro, camiseta de Cheetos y entradas siempre estrafalarias.',
    style: 'Explosivo y acrobático, con fondo de sobra para encadenar combates. Su salto cheto cae desde lo alto sobre la cabeza del rival.',
    stats: { speed: 1.24, power: 0.98, health: 94, stamina: 132, tempo: 1.2, resist: 1.0, recover: 0.85, escape: 1.05 },
    moves: {
      light: ['jab', 'patada_alta', 'gancho'],
      heavy: 'patada_voladora',
      grab: { throw: 'cadera', slam: 'ddt', sub: 'cobra' },
      finisher: 'salto_cheto',
      taunt: 'vacile',
    },
    appearance: {
      skin: 0xc98a68,
      hair: null,
      mask: 'doge',
      outfit: 'camiseta',
      outfitColor: 0x131313,
      trunksColor: 0x2a1b36,
      accent: 0xf5b81c,
      build: 1.06,
      height: 1.02,
    },
  },
  // ------------------------------------------------------------- BIG MAC
  {
    id: 'big mac',
    name: 'Big Mac',
    description:
      'El Caníbal de Big Mac nació en los garitos clandestinos de las 3000 viviendas, donde coincidió con Petisui. Pablo Motos lo fichó por su fama de salvaje y lo usa para meter miedo en el vestuario. Cabeza de hamburguesa con antifaz de luchador, traje blanco y un cinturón que él mismo se ha dado.',
    style: 'Colosal y sin técnica: resistencia enorme, agarres sofocantes y juego sucio constante (a veces el árbitro lo ve). Su bocado caníbal es un golpe frontal que te deja grogui.',
    stats: { speed: 0.88, power: 1.15, health: 124, stamina: 138, tempo: 0.94, resist: 0.9, recover: 0.85, escape: 1.2 },
    moves: {
      light: ['jab', 'codazo', 'rodillazo'],
      heavy: 'cabezazo',
      grab: { throw: 'hombro', slam: 'body_slam', sub: 'cobra' },
      finisher: 'bocado_canibal',
      taunt: 'rugido',
    },
    appearance: {
      skin: 0xc98a68,
      hair: null,
      mask: 'hamburguesa',
      outfit: 'traje',
      outfitColor: 0xf0f0f0,
      trunksColor: 0xf0f0f0,
      accent: 0xd8b43a,
      belt: 0x14110d,
      build: 1.2,
      height: 1.05,
    },
  },
  // ------------------------------------------------------------------ CHEMA (protagonista de la historia)
  {
    id: 'chema',
    name: 'Chema',
    description:
      'El fichaje de Pablo Motos para la temporada 5: un desconocido con chándal rojo y más ganas que miedo. Nadie sabe de dónde viene ni qué hay en la letra pequeña de su contrato, pero ha subido al ring del Hoyo para quedarse. Protagonista del modo Historia.',
    style: 'Equilibrado y con corazón: ni el más fuerte ni el más rápido, pero aprende de cada golpe. Su golpe del novato sale desde abajo y no avisa.',
    stats: { speed: 1.08, power: 1.04, health: 104, stamina: 108, tempo: 1.08, resist: 0.98, recover: 0.92, escape: 1.1 },
    skins: [
      {
        id: 'campeon', name: 'Chema campeón',
        description: 'Con el cinturón del Hoyo Champion en la cintura. Se desbloquea al ganar el torneo en la Historia.',
        unlock: { achievement: 'cap3', hint: 'Historia: gana el Hoyo Champion' },
        appearance: { belt: 0x16130f, outfitColor: 0x1a1a22, accent: 0xd8b43a },
      },
    ],
    moves: {
      light: ['jab', 'directo', 'patada_baja'],
      heavy: 'machada',
      grab: { throw: 'cadera', slam: 'body_slam', sub: 'llave_brazo' },
      finisher: 'golpe_novato',
      taunt: 'burla',
    },
    appearance: {
      skin: 0xd2996f, hair: 0x2a1810, outfit: 'sudadera', outfitColor: 0xc1272d, trunksColor: 0x14141c, accent: 0xf2c14e, build: 1.02, height: 1.0,
    },
    unlock: { achievement: 'historia', hint: 'Completa el modo Historia' },
  },
  // ------------------------------------------------------------ YOSUKE (historia)
  {
    id: 'yosuke',
    name: 'Yosuke',
    description:
      'El rey de las malas jugadas del Hoyo. Dicen que le quitó la novia a Elso en la temporada 3, y que lo hizo con una sonrisa. Pelo de punta, chaqueta de cuero morada y la mala costumbre de aparecer justo cuando menos conviene. Antagonista del modo Historia.',
    style: 'Rápido y traicionero: patadas altas, fintas y una burla constante. Su finisher, La Traición, sale cuando menos te lo esperas.',
    stats: { speed: 1.18, power: 1.0, health: 100, stamina: 106, tempo: 1.18, resist: 1.0, recover: 0.95, escape: 1.05 },
    moves: {
      light: ['jab', 'patada_baja', 'patada_alta'],
      heavy: 'patada_voladora',
      grab: { throw: 'cadera', slam: 'ddt', sub: 'cobra' },
      finisher: 'la_traicion',
      taunt: 'vacile',
    },
    appearance: { skin: 0xe0b48f, hair: 0x14141a, outfit: 'cuero', outfitColor: 0x2a1a3a, trunksColor: 0x14101c, accent: 0xb34aff, build: 0.98, height: 1.02 },
    unlock: { achievement: 'cap5', hint: 'Historia: derrota a Yosuke' },
  },
  // -------------------------------------------------------------- KENT (historia)
  {
    id: 'kent',
    name: 'Kent',
    description:
      'El rival de Petisui en el main event de Manchester: técnico, serio y con una pegada de las que dejan huella. Fue el último en caer en el Gauntlet de Santiago de Chile. Respeta al que lucha limpio y no perdona al que no.',
    style: 'Luchador completo y sólido: buena resistencia, agarres potentes y la corona de Manchester como remate.',
    stats: { speed: 0.98, power: 1.12, health: 112, stamina: 114, tempo: 1.0, resist: 0.95, recover: 0.95, escape: 1.1 },
    moves: {
      light: ['jab', 'directo', 'codazo'],
      heavy: 'lariat',
      grab: { throw: 'suplex', slam: 'powerslam', sub: 'llave_brazo' },
      finisher: 'corona_manchester',
      taunt: 'burla',
    },
    appearance: { skin: 0xc99a78, hair: 0xd6c07a, beard: 0xd6c07a, outfit: 'camiseta', outfitColor: 0x1c3f8c, trunksColor: 0xf2f2f2, accent: 0xe7b53b, build: 1.1, height: 1.03 },
    unlock: { achievement: 'cap7', hint: 'Historia: sobrevive al Gauntlet de Santiago' },
  },
  // ---------------------------------------------------------- BIG JUSTICE (historia)
  {
    id: 'big justice',
    name: 'Big Justice',
    description:
      'El inseparable compañero de Big Boom: enorme, calvo y de pocas palabras (casi todas son "Justicia"). Los dos fueron despedidos tras un combate polémico contra Konguito. Entra al ring con las mallas de la bandera de su corazón.',
    style: 'Un muro que embiste: lento, pesadísimo y casi imposible de mover. La sentencia justa es una carga directa.',
    stats: { speed: 0.84, power: 1.2, health: 124, stamina: 116, tempo: 0.9, resist: 0.9, recover: 0.9, escape: 1.1 },
    moves: {
      light: ['jab', 'rodillazo', 'gancho'],
      heavy: 'machada',
      grab: { throw: 'hombro', slam: 'powerslam', sub: 'llave_brazo' },
      finisher: 'sentencia_justa',
      taunt: 'rugido',
    },
    appearance: { skin: 0xb98062, hair: null, beard: 0x8a8a8a, outfit: 'desnudo', outfitColor: 0xb98062, trunksColor: 0x1c3f8c, accent: 0xc1272d, build: 1.25, height: 1.07 },
    unlock: { achievement: 'cap4', hint: 'Historia: gana el combate por parejas' },
  },
  // ------------------------------------------------------ SERGIO, EL NIÑO INVENCIBLE
  {
    id: 'sergio',
    name: 'Sergio, el niño invencible',
    description:
      'Literalmente invencible, y no es coña: nadie ha conseguido tumbarle (todavía). Lleva una capa roja, una sonrisa de oreja a oreja y la confianza de quien nunca ha perdido. Pepe the Gay Dragon se fue con él, y por algo será. El jefe final del modo Historia.',
    style: 'Pequeño, rapidísimo y casi imposible de dañar: recibe muy poco daño. Su capa invencible es un vuelo de 5 metros.',
    stats: { speed: 1.14, power: 0.88, health: 112, stamina: 112, tempo: 1.14, resist: 0.88, recover: 0.85, escape: 1.25 },
    moves: {
      light: ['jab', 'patada_baja', 'patada_alta'],
      heavy: 'patada_voladora',
      grab: { throw: 'cadera', slam: 'ddt', sub: 'cangrejo' },
      finisher: 'capa_invencible',
      taunt: 'vacile',
    },
    appearance: { skin: 0xe0b48f, hair: 0x3a2a14, outfit: 'camiseta', outfitColor: 0xf2c14e, trunksColor: 0xc1272d, accent: 0xff3a3a, build: 0.86, height: 0.9 },
    unlock: { achievement: 'historia', hint: 'Completa el modo Historia' },
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
