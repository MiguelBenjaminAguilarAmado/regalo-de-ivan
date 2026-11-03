/**
 * ============================================================
 *  MODO HISTORIA — "Temporada 5: El fichaje"
 * ============================================================
 * Aquí está toda la historia como datos: capítulos, escenas, combates y finales.
 * Protagonista: Chema (id 'chema'). Los `who` son ids de luchador (nombre de carpeta en minúsculas),
 * o 'narrador' / 'arbitro'.
 *
 * Cada capítulo tiene:  intro (escenas) → fights (combates, con escenas `before`) → outro (escenas).
 * Las elecciones (`choices`) activan banderas que cambian frases, combates y el final.
 */
import type { StoryChapter, StoryEnding, StoryLine } from '../src/modes/Story';

const N = (text: string): StoryLine => ({ who: 'narrador', text });
const P = 'pablo motos';

export const STORY_TITLE = 'TEMPORADA 5: EL FICHAJE';
export const STORY_INTRO = 'Un desconocido con chándal rojo, una letra pequeña que nadie lee y un ring llamado El Hoyo. Esta es la historia de cómo Chema pasó de nadie a leyenda… o a lo que sea que acabe siendo.';

export const CHAPTERS: StoryChapter[] = [
  // ===================================================================== 1
  {
    id: 'fichaje', title: 'El fichaje', arena: 'matamoros',
    summary: 'Pablo Motos te ficha y te manda a tu primer combate.',
    intro: [
      {
        bg: 'matamoros', cast: ['chema', P],
        lines: [
          N('Matamoros. Treinta mil personas, una orquesta en una esquina y un hombre con barba y americana a punto de cambiar tu vida.'),
          { who: P, text: 'Tú. Sí, tú, el del chándal rojo. ¿Cómo te llamas?' },
          { who: 'chema', text: 'Chema, jefe. Chema a secas. Me han dicho que aquí se paga por pegarse.' },
          { who: P, text: 'Se paga por dar espectáculo. Pegarse es gratis. Firma aquí… aquí… y esta línea pequeñita no hace falta que la leas.' },
          { who: 'chema', text: '¿Y qué pone en la línea pequeñita?' },
          { who: P, text: 'Que si te rompes, no es culpa mía. ¡Tu primer combate es ya! Contra el Novato del Hoyo. Era facilísimo. Es… bueno, tú ya me entiendes.' },
        ],
        choices: [
          { text: '«Voy a ser el mejor luchador que ha pisado este ring.»', set: { actitud: 'orgullo' }, reply: [{ who: P, text: 'Me encanta el entusiasmo. Se te pasará en el primer pin.' }] },
          { text: '«Yo solo quiero cobrar a final de mes.»', set: { actitud: 'dinero' }, reply: [{ who: P, text: 'Un hombre práctico. Me caes bien: serás barato de mantener.' }] },
          { text: '«Quiero demostrar que valgo para esto.»', set: { actitud: 'valor' }, reply: [{ who: P, text: 'Ya veremos. El Hoyo se come a los que quieren demostrar cosas.' }] },
        ],
      },
    ],
    fights: [{
      opponent: 'novato', arena: 'matamoros', difficulty: 'facil',
      objective: 'Derrota al Novato del Hoyo',
      tips: [
        'Golpe ligero (J): encadena hasta tres. El golpe fuerte (K) es más lento pero derriba.',
        'Mantén Espacio para la guardia. Si la pulsas justo antes del golpe, ¡contraatacas!',
        'Cuando el rival esté en el suelo, acércate y pulsa L para el pin. Tres segundos y es tuyo.',
        'Cada golpe llena tu barra azul de momentum. Con ella llena, pulsa F: ¡finisher!',
      ],
    }],
    outro: [
      {
        bg: 'matamoros', cast: ['chema', P],
        lines: [
          { who: 'arbitro', text: '¡Uno… dos… tres! ¡Gana Chema!' },
          { who: P, text: 'No está mal. No está nada mal.' },
          { who: P, text: '¡Eso es orgullo del bueno! Pero no te acostumbres a ganar tan fácil.', if: ['actitud', 'orgullo'] },
          { who: P, text: 'Tranquilo, el sueldo llega igual si ganas o si pierdes. Bueno… si ganas, algo más.', if: ['actitud', 'dinero'] },
          { who: P, text: 'Has demostrado algo, sí. Veremos cuánto te dura.', if: ['actitud', 'valor'] },
          { who: P, text: 'Te quedas. Y como hoy estoy generoso, mañana te presento a unos amigos. De las 3000 viviendas. Ya verás qué simpáticos son.' },
        ],
      },
    ],
    setOnWin: { cap1: true },
  },

  // ===================================================================== 2
  {
    id: 'garito', title: 'El garito', arena: 'garito',
    summary: 'Las 3000 viviendas: aquí no hay árbitro ni reglas.',
    intro: [
      {
        bg: 'garito', cast: ['chema', 'petisui', 'big mac'],
        lines: [
          N('Las 3000 viviendas. Un sótano, una bombilla que parpadea y gente con muchas ganas de ver sangre. Pablo te ha enviado "a foguearte".'),
          { who: 'petisui', text: '¿Así que tú eres el fichaje del jefe? Qué joven. Qué limpio. Qué poco te queda.' },
          { who: 'big mac', text: 'Huele a carne fresca. Digo… a novato.' },
          { who: 'chema', text: 'Solo he venido a pelear.' },
          { who: 'petisui', text: 'Aquí no hay árbitro, chaval. Aquí hay las reglas de las 3000: que no hay reglas.' },
        ],
        choices: [
          { text: '«Me da igual: pego igual con o sin árbitro.»', set: { garito_actitud: 'duro' }, reply: [{ who: 'big mac', text: 'Qué hambre me da esta gente tan segura de sí misma…' }] },
          { text: '«¿Y las faltas? ¿Nadie las pita?»', set: { garito_actitud: 'listo' }, reply: [{ who: 'petisui', text: 'Cuando te lo expliquen será tarde. Anda, sube.' }] },
          { text: '«Primero tú, Petisui. Que se note quién manda.»', set: { garito_actitud: 'reto' }, reply: [{ who: 'petisui', text: 'Ja. Te hago el favor de que te haga de aperitivo mi amigo Mac. Luego, yo.' }] },
        ],
      },
    ],
    fights: [{
      opponent: 'big mac', arena: 'garito', difficulty: 'intermedia',
      objective: 'Aguanta y tumba a Big Mac: aquí nadie pita faltas',
      tips: [
        'Sin árbitro no hay castigo: los golpes sucios (golpe bajo, cabezazo) no te penalizan.',
        'Big Mac tiene muchísima resistencia. Alterna golpes con agarres para romper su ritmo.',
        'Si te agarra, machaca los botones para zafarte.',
      ],
    }],
    outro: [
      {
        bg: 'garito', cast: ['chema', 'petisui', 'big mac'],
        lines: [
          { who: 'big mac', text: 'Has aguantao. Eso me gusta. Casi me da pena comerte.' },
          { who: 'petisui', text: 'Oye, tienes algo. No sé qué, pero lo tienes. Te voy a dar un consejo gratis: en el Hoyo no te fíes de quien sonríe.' },
          { who: 'petisui', text: 'Y menos de quien te firma el contrato.' },
        ],
        choices: [
          { text: '«Gracias, Petisui. Me vendrá bien un amigo.»', set: { aliado_petisui: true }, reply: [{ who: 'petisui', text: 'No somos amigos. Somos… socios con derecho a silla.' }] },
          { text: '«No necesito consejos de nadie.»', set: { aliado_petisui: false }, reply: [{ who: 'petisui', text: 'Eso decía yo a tu edad. Ya me lo agradecerás. O no.' }] },
        ],
      },
    ],
    setOnWin: { cap2: true },
  },

  // ===================================================================== 3
  {
    id: 'champion', title: 'Camino al Hoyo Champion', arena: 'manchester',
    summary: 'Torneo de tres combates: Perro Cheetos, Kongui y Ansol.',
    intro: [
      {
        bg: 'matamoros', cast: [P, 'chema'],
        lines: [
          N('El Hoyo Champion: el torneo más importante de la empresa. Cuatro luchadores buenos, uno nuevo… y nadie apuesta por el nuevo.'),
          { who: P, text: '¡Damas y caballeros, el Hoyo Champion! El premio: un cinturón precioso y un contrato que, bueno, no hace falta que lo leáis.' },
          { who: 'chema', text: '¿Otra vez la letra pequeña?' },
          { who: P, text: 'Siempre la letra pequeña. Venga, a por el primero.' },
          { who: 'petisui', text: 'Cuidado con la tribu de Kongui. Yo la conozco bien. A ti no te va a gustar.', if: 'aliado_petisui' },
        ],
      },
    ],
    healBetween: 0.4,
    fights: [
      {
        opponent: 'perro cheetos', arena: 'matamoros', difficulty: 'intermedia',
        objective: 'Cuartos de final: derrota a Perro Cheetos',
        tips: ['Perro Cheetos es rápido y no se cansa. No le des la espalda ni corras detrás de él: déjale venir y contraataca.'],
        before: [{
          bg: 'matamoros', cast: ['chema', 'perro cheetos'],
          lines: [
            { who: 'perro cheetos', text: 'Guau. Perdona, es mi saludo. Soy Perro Cheetos, mejor debut del Hoyo.' },
            { who: 'chema', text: 'Encantado. Soy Chema, mejor… hum… debut de esta noche, supongo.' },
            { who: 'perro cheetos', text: '¡Ja! Me caes bien. Eso no significa que no te vaya a morder.' },
          ],
        }],
      },
      {
        opponent: 'kongui', arena: 'tribu', difficulty: 'intermedia',
        objective: 'Semifinal en la aldea: derrota a Konguito (¡no golpees a la tribu!)',
        tips: ['Si empujas o golpeas hacia el público, la tribu entera te atacará. Pelea en el centro del círculo.', 'En una esquina Kongui sube al poste: ¡aléjate de su sombra o esquiva el planchazo!'],
        before: [{
          bg: 'tribu', cast: ['chema', 'kongui'],
          lines: [
            N('La aldea de Kongui. No hay ring, no hay cuerdas… y todo el público es la tribu, con lanzas en las manos.'),
            { who: 'kongui', text: 'Bienvenido al Reino Kongui, forastero. Aquí se pelea con honor.' },
            { who: 'kongui', text: 'Petisui me habló de ti. Dice que tienes algo. Voy a averiguar qué.', if: 'aliado_petisui' },
            { who: 'chema', text: 'Solo quiero llegar a la final.' },
            { who: 'kongui', text: 'Entonces tendrás que pasar por encima de mí. Y de mis cinco amigos de la puerta.' },
          ],
        }],
      },
      {
        opponent: 'ansol', arena: 'manchester', difficulty: 'dificil',
        objective: 'FINAL en Manchester: derrota a Ansol, uno de los tres grandes',
        tips: ['Ansol es sólido: buena pegada y mucho fondo. Gana el momentum con combos de 5 golpes.', 'Un golpe al límite de tu vida activa la adrenalina: 10 segundos de más fuerza.'],
        before: [{
          bg: 'manchester', cast: ['chema', 'ansol'],
          lines: [
            N('Manchester. Sesenta mil personas y un monigote azul gigante agitándose en el fondo. La final.'),
            { who: 'ansol', text: 'Calma. El sol sale para todos, aunque a ti te va a quemar.' },
            { who: 'chema', text: 'Eres uno de los tres grandes. No tendría que estar aquí. Pero estoy.' },
            { who: 'ansol', text: 'Eso es lo único que importa. Estar. Empieza.' },
          ],
        }],
      },
    ],
    outro: [
      {
        bg: 'manchester', cast: ['chema', P, 'ansol'],
        lines: [
          { who: 'arbitro', text: '¡Y el nuevo Hoyo Champion es… Chema!' },
          { who: 'ansol', text: 'Se acabó. Eres el campeón. Hoy has hecho historia, chaval.' },
          { who: P, text: '¡Enhorabuena, campeón! Aquí tienes el cinturón. Y el contrato nuevo. Firma… aquí. Y aquí.' },
          { who: 'chema', text: '¿Y la letra pequeña?' },
          { who: P, text: 'Ya la conoces. Disfruta.' },
          N('Entre el público, alguien sonríe en las sombras. Un tipo con el pelo de punta. Mira el cinturón. Y a Elso, en un palco, apretando los puños.'),
        ],
      },
    ],
    setOnWin: { cap3: true, campeon: true },
  },

  // ===================================================================== 4
  {
    id: 'pareja', title: 'Pareja forzosa', arena: 'matamoros',
    summary: 'Hoyo Tag Champion: elige compañero y a por Big Boom y Big Justice.',
    intro: [
      {
        bg: 'matamoros', cast: [P, 'big boom'],
        lines: [
          N('Con el cinturón del Hoyo Champion todavía brillando, Pablo Motos tiene otra idea. Siempre tiene otra idea.'),
          { who: P, text: 'Campeón, ¿cómo llevas lo de ser famoso? Porque mañana toca el Hoyo Tag Champion. Dos contra dos.' },
          { who: 'chema', text: '¿Dos contra dos? Yo no tengo compañero.' },
          { who: P, text: 'Pues elige uno. Y date prisa: tus rivales ya están aquí.' },
          { who: 'big boom', text: '¡BOOM! ¡Los despedidos vuelven! ¡Y mi compañero Big Justice también!' },
          { who: 'big justice', text: 'Justicia.' },
          { who: 'big boom', text: 'Eso es: Justicia. A ver quién lleva más cinturones a casa.' },
        ],
      },
    ],
    fights: [{
      opponent: 'big boom', opponentPartner: 'big justice', partner: 'elegir', arena: 'matamoros', difficulty: 'intermedia',
      objective: 'Derrota a Big Boom y Big Justice (relevo con R)',
      tips: [
        'Pulsa R para relevar a tu compañero: el que descansa recupera vida y resistencia. No te quedes hasta el final con un luchador roto.',
        'Si tu luchador y tu compañero forman un dúo dinámico, tenéis bonificaciones: ¡elige bien!',
        'Si cae uno de los dos, el otro entra solo. Si caen los dos, perdéis.',
      ],
    }],
    outro: [
      {
        bg: 'matamoros', cast: ['chema', 'big boom'],
        lines: [
          { who: 'arbitro', text: '¡Los nuevos Hoyo Tag Champions son… Chema y compañero!' },
          { who: 'petisui', text: 'Se nota que me elegiste a mí. Siempre acierto con los socios.', if: ['partner', 'petisui'] },
          { who: 'pablo motos', text: '¡Dos de mis chicos favoritos juntos! Qué orgulloso estoy. Y qué contrato tan rentable.', if: ['partner', 'ansol'] },
          { who: 'big boom', text: 'Me han despedido otra vez, ¿verdad?' },
          { who: 'big justice', text: 'Justicia.' },
          { who: 'pablo motos', text: 'No, hoy no. Hoy el Hoyo es vuestro. Mañana, quién sabe.' },
          N('Al final del pasillo, un tipo de pelo de punta aplaude lentamente. Es Yosuke. Y no parece contento.'),
        ],
      },
    ],
    setOnWin: { cap4: true },
    rewards: { achievements: ['cap4'], text: 'Desbloqueado: Big Justice como luchador jugable' },
  },

  // ===================================================================== 5
  {
    id: 'yosuke', title: 'La traición de Yosuke', arena: 'jaula',
    summary: 'Yosuke quiere tu cinturón. Jaula de acero y una decisión.',
    intro: [
      {
        bg: 'jaula', cast: ['yosuke', 'chema'],
        lines: [
          N('Vestuario del Hoyo. Yosuke te espera apoyado en las taquillas, con esa sonrisa que ya ha hecho llorar a medio Hoyo.'),
          { who: 'yosuke', text: 'Bonito cinturón. Sería una pena que se rayara.' },
          { who: 'chema', text: '¿Qué quieres, Yosuke?' },
          { who: 'yosuke', text: 'Lo que siempre quiero: lo que tienen los demás. Te reto a una jaula de acero. Sin salida. Sin árbitro que mire hacia otro lado.' },
          { who: 'elso', text: 'No aceptes, Chema. Es una trampa. Siempre lo es.' },
          { who: 'yosuke', text: 'Mira quién habla. El campeón sin novia.' },
          { who: 'elso', text: '…' },
        ],
        choices: [
          { text: '«Acepto. Jaula, tú y yo.»', set: { yosuke_acepta: true }, reply: [{ who: 'yosuke', text: 'Me encanta la gente valiente. Se rompe mejor.' }] },
          { text: '«Estoy cansado de tus juegos, Yosuke. ¡Vamos!»', set: { yosuke_acepta: true }, reply: [{ who: 'elso', text: 'Dale una por mí, Chema.' }] },
        ],
      },
    ],
    fights: [{
      opponent: 'yosuke', arena: 'jaula', difficulty: 'intermedia',
      objective: 'Derrota a Yosuke en la jaula de acero',
      tips: [
        'En la jaula no hay salida: ni cuenta fuera ni cuerdas. Nadie se escapa.',
        'Un golpe fuerte que estampe al rival contra la reja hace daño extra. ¡Arrincónalo!',
        'Yosuke es rápido y pega desde lejos. Acércate y usa agarres.',
      ],
      before: [{
        bg: 'jaula', cast: ['chema', 'yosuke'],
        lines: [
          { who: 'yosuke', text: 'La puerta se cierra. Esta vez nadie viene a salvarte, campeón.' },
          { who: 'arbitro', text: '¡Que alguien me diga por qué me han puesto detrás de la reja!' },
        ],
      }],
    }],
    outro: [
      {
        bg: 'jaula', cast: ['chema', 'yosuke', 'elso'],
        lines: [
          { who: 'yosuke', text: 'Está bien, está bien, tú ganas. Pero escucha: yo solo hacía lo que Pablo me pidió.' },
          { who: 'chema', text: '¿Pablo?' },
          { who: 'yosuke', text: 'La novia de Elso. Los líos de la temporada 3. Todo. Pablo siempre sabe lo que hace… y siempre cobra.' },
          { who: 'elso', text: '¿Pablo lo sabía? ¿Desde el principio?' },
          { who: 'pablo motos', text: 'Hombre, Elso, no me mires así. Es el espectáculo. Chema, campeón: ¿te vienes conmigo o con él? Piénsalo bien. La letra pequeña de tu contrato… lo dice todo.' },
        ],
        choices: [
          { text: 'Ponerte del lado de Elso y plantar cara a Pablo.', set: { bando: 'elso' }, reply: [{ who: 'elso', text: 'Sabía que no eras de los que firman sin leer. Bueno… sí lo eras. Pero has aprendido.' }, { who: 'pablo motos', text: 'Qué decepción. Te iba a hacer rico.' }] },
          { text: 'Seguir con Pablo: el contrato es el contrato.', set: { bando: 'pablo' }, reply: [{ who: 'elso', text: 'Entonces nos veremos en el ring. Y ahí sí que no habrá letra pequeña.' }, { who: 'pablo motos', text: '¡Esa es mi actitud! Tu sueldo acaba de subir un 3 %.' }] },
        ],
      },
    ],
    setOnWin: { cap5: true },
    rewards: { achievements: ['cap5'], text: 'Desbloqueados: Yosuke y el traje "Campeón del Hoyo" de Elso' },
  },

  // ===================================================================== 6
  {
    id: 'azotea', title: 'La azotea', arena: 'azotea',
    summary: 'Una emboscada en lo alto del bloque: aguanta 90 segundos.',
    intro: [
      {
        bg: 'azotea', cast: ['chema'],
        lines: [
          N('Noche cerrada. Un mensaje anónimo te cita en la azotea de las 3000 viviendas. "Ven solo", decía. Qué ingenuo.'),
          { who: 'chema', text: '¿Hay alguien ahí?' },
          { who: 'darksinfacha', text: 'Pablo me ha dicho que te dé un susto. Yo prefiero la palabra "lección". Con bate, a ser posible.', if: ['bando', 'elso'] },
          { who: 'elso', text: 'Traidor. Pablo te ha comprado y tú ni te has dado cuenta. Vas a pagarlo en esta azotea.', if: ['bando', 'pablo'] },
          { who: 'arbitro', text: 'Reglas de la azotea: aguantad hasta que amanezca. Es decir, noventa segundos. Y no os asoméis.' },
        ],
      },
    ],
    fights: [
      {
        opponent: 'darksinfacha', arena: 'azotea', difficulty: 'intermedia', timeLimit: 90, timeMode: 'player',
        handicap: { hp: 1.15, power: 1.1 },
        objective: 'Aguanta 90 segundos de pie contra Dark Sin Facha y su bate',
        tips: ['No hace falta ganar: basta con seguir de pie cuando acabe el tiempo. Guarda la distancia y usa la guardia.', 'Cada cierto tiempo sopla una ráfaga de viento: te empuja a ti y a él.', 'Si te hace un batazo, aprovecha su recuperación para contraatacar.'],
        if: ['bando', 'elso'],
      },
      {
        opponent: 'elso', arena: 'azotea', difficulty: 'intermedia', timeLimit: 90, timeMode: 'player',
        handicap: { hp: 1.05, power: 1.05 },
        objective: 'Aguanta 90 segundos de pie contra Elso, que viene a por ti',
        tips: ['Elso es rápido y frenético. No intentes trabarte con él: guárdate y castiga sus errores.', 'Si bajas del 20 % de vida, la adrenalina te dará un empujón.'],
        if: ['bando', 'pablo'],
      },
    ],
    outro: [
      {
        bg: 'azotea', cast: ['chema', 'petisui'],
        lines: [
          { who: 'darksinfacha', text: 'Vale, vale, ya está bien. Me dijeron que eras novato. Que alguien le diga a mi padre que me recoja.', if: ['bando', 'elso'] },
          { who: 'elso', text: 'Aguantaste. No pensaba que lo harías. No me debes nada… pero me sigues debiendo una explicación.', if: ['bando', 'pablo'] },
          { who: 'petisui', text: 'Muy bien, muy bien. Te sigo la pista desde que llegaste. Aquí arriba se ve todo mejor.' },
          { who: 'petisui', text: 'Cuidado con lo que viene: Pablo prepara algo grande. Algo con Santiago de Chile. Algo con mucha gente.' },
          N('Abajo, entre las luces de las 3000 viviendas, un teléfono suena en una oficina muy lejana.'),
        ],
      },
    ],
    setOnWin: { cap6: true },
  },

  // ===================================================================== 7
  {
    id: 'gauntlet', title: 'El Gauntlet de Santiago', arena: 'santiago',
    summary: 'Tres rivales seguidos en Santiago de Chile y sin descanso. De vez en cuando se va la luz.',
    intro: [
      {
        bg: 'santiago', cast: [P, 'chema'],
        lines: [
          N('Santiago de Chile. Un estadio entero, cuarenta mil gargantas y un cartel que dice, en letras de neón: GAUNTLET.'),
          { who: P, text: 'Las reglas son sencillas: tres rivales, uno detrás de otro, sin descanso. El último que quede en pie se lleva el premio.' },
          { who: 'chema', text: '¿Sin descanso? ¿Ni un vaso de agua?' },
          { who: P, text: 'El agua la cobran aparte. Ah, y no te asustes si se va la luz: es el estadio. O es Kongui. No lo tengo claro.' },
          { who: 'elso', text: 'Estaré en tu rincón, Chema. No te voy a dejar solo con este contrato.', if: ['bando', 'elso'] },
          { who: 'elso', text: 'Dicen que Pablo te ha puesto un Gauntlet. Yo en tu lugar lo evitaría. Pero tú nunca me escuchas.', if: ['bando', 'pablo'] },
        ],
      },
    ],
    healBetween: 0,
    fights: [
      {
        opponent: 'kongui', arena: 'santiago', difficulty: 'intermedia',
        objective: 'Gauntlet 1/3: derrota a Konguito sin descanso',
        tips: ['En el Gauntlet tu vida NO se recupera entre combates. Gestiona cada golpe.', 'Si se va la luz, todo va más lento y el momentum sube más deprisa: ¡aprovéchalo!'],
        before: [{ bg: 'santiago', cast: ['chema', 'kongui'], lines: [{ who: 'kongui', text: 'Otra vez nos vemos, campeón. Esta vez la tribu no está… pero mis puños sí.' }] }],
      },
      {
        opponent: 'perro cheetos', arena: 'santiago', difficulty: 'intermedia',
        objective: 'Gauntlet 2/3: derrota a Perro Cheetos sin descanso',
        tips: ['Perro Cheetos nunca se cansa y pega muy rápido. Aprovecha la guardia perfecta para contraatacar.'],
        before: [{ bg: 'santiago', cast: ['chema', 'perro cheetos'], lines: [{ who: 'perro cheetos', text: '¡Guau! ¡Segundo plato! Dicen que en este Gauntlet yo me merendé a dos tipos famosos. Vamos a por el tercero.' }] }],
      },
      {
        opponent: 'kent', arena: 'santiago', difficulty: 'dificil',
        objective: 'Gauntlet 3/3: derrota a Kent, el último en pie',
        tips: ['Kent es un técnico: aguanta, agarra y remata con la corona de Manchester. No te dejes agarrar con poca vida.', 'Cuando tengas el finisher listo, espera a que baje la guardia: la prisa te cuesta la vida.'],
        before: [{ bg: 'santiago', cast: ['chema', 'kent'], lines: [{ who: 'kent', text: 'Soy el que derrotó a Cheetos en el Gauntlet original. Y soy el que te va a derrotar a ti.' }, { who: 'chema', text: 'Eso lo dirás cuando me veas el tercer apagón.' }] }],
      },
    ],
    outro: [
      {
        bg: 'santiago', cast: ['chema', 'kent'],
        lines: [
          { who: 'kent', text: 'Respeto. Has caído tres veces y te has levantado cuatro. Esto es Santiago: aquí eso se aplaude.' },
          { who: 'kent', text: 'Un consejo gratis de campeón a campeón: Pablo tiene un arma secreta. Se llama Sergio. Y dicen que es invencible.' },
          { who: 'chema', text: '¿Invencible? ¿Literalmente?' },
          { who: 'kent', text: 'No es coña. Cuídate.' },
          N('En un palco, un niño con una capa roja sonríe de oreja a oreja. A su lado, un dragón con máscara rosa le aplaude.'),
        ],
      },
    ],
    setOnWin: { cap7: true },
    rewards: { achievements: ['cap7'], text: 'Desbloqueado: Kent como luchador jugable' },
  },

  // ===================================================================== 8
  {
    id: 'oficina', title: 'La oficina de Pablo Motos', arena: 'oficina',
    summary: 'El jefe te cita en su despacho. Un combate de cuentas pendientes.',
    intro: [
      {
        bg: 'oficina', cast: [P, 'chema'],
        lines: [
          N('El despacho de Pablo Motos: moqueta, acuario, trofeos por todas partes y un retrato del propio Pablo mirándote desde cada pared.'),
          { who: P, text: 'Siéntate, campeón. Hoy toca hablar de negocios. Y de la letra pequeña.' },
          { who: 'chema', text: 'Por fin. ¿Qué pone?' },
          { who: P, text: 'Que todo lo que ganes es mío. El cinturón, las victorias, tu nombre. Absolutamente todo. Es muy legal. Lo ha revisado mi primo.' },
          { who: 'elso', text: 'Te lo dije, Chema. Te lo dije y no me escuchaste.', if: ['bando', 'elso'] },
          { who: P, text: 'Y como eres tan buen empleado, voy a hacerte un favor: un combate en mi despacho, con mis reglas. Si ganas, rompo el contrato. Si pierdes… lo renuevo.', if: ['bando', 'elso'] },
          { who: P, text: 'Tu fidelidad me emociona. Por eso Elso quiere un combate contigo en mi despacho. Si ganas, subes de categoría. Si pierdes, te quedas como estás: barato.', if: ['bando', 'pablo'] },
        ],
      },
    ],
    fights: [
      {
        opponent: 'pablo motos', arena: 'oficina', difficulty: 'dificil', handicap: { hp: 1.35, power: 1.05 },
        boss: { at: 0.5, power: 1.3, speed: 1.12, heal: 0.15, text: '¡Pablo Motos pide refuerzos: «¡Que alguien traiga un tanque a mi despacho!»!' },
        objective: 'Derrota a Pablo Motos en su despacho (¡se enfurece al 50 % de vida!)',
        tips: ['Pablo es frágil pero tiene mucha vida extra aquí. Su golpe fuerte es una lotería: maletines, micrófonos, momias… ¡hasta un tanque!', 'El jefe lanza maletines al que va perdiendo: ayuda a quien esté peor, ¡hay que ir con tiento!', 'Si bajas del 15 % de vida y su finisher te alcanza, te despide. ¡Cuidado!'],
        if: ['bando', 'elso'],
        before: [{ bg: 'oficina', cast: ['chema', 'pablo motos'], lines: [{ who: 'pablo motos', text: 'Última oportunidad de ser razonable. No me hagas despedirte antes de tiempo.' }, { who: 'chema', text: 'Léeme la letra pequeña, Pablo. En voz alta.' }] }],
      },
      {
        opponent: 'elso', arena: 'oficina', difficulty: 'dificil', handicap: { hp: 1.2, power: 1.08 },
        boss: { at: 0.5, power: 1.25, speed: 1.12, heal: 0.15, text: '¡Elso se desata: «Se acabó el jugar a ser tu amigo»!' },
        objective: 'Derrota a Elso, el campeón, en el despacho de Pablo',
        tips: ['Elso es rápido y su golpe femboy deja KO. No te quedes quieto delante de él con el finisher cargado.', 'Al 50 % de vida se desata: más daño y velocidad. Aguanta esa fase con la guardia.'],
        if: ['bando', 'pablo'],
        before: [{ bg: 'oficina', cast: ['chema', 'elso'], lines: [{ who: 'elso', text: 'Cuando acabe contigo, me llevaré el cinturón de Pablo y el tuyo. Y la dignidad de los dos.' }, { who: 'pablo motos', text: 'Yo solo vengo a cobrar la entrada. ¡Que empiece el combate!' }] }],
      },
    ],
    outro: [
      {
        bg: 'oficina', cast: ['chema', P, 'elso'],
        lines: [
          { who: P, text: '¿Cómo puede ser? Ganaste… y no he cobrado ni un euro.', if: ['bando', 'elso'] },
          { who: 'elso', text: 'Se acabó, Pablo. Tu letra pequeña se ha quedado muy pequeña.', if: ['bando', 'elso'] },
          { who: 'elso', text: 'Bien jugado, Chema. Has ganado en mi cara. Y no pienso olvidarlo.', if: ['bando', 'pablo'] },
          { who: P, text: 'Magnífico. Mi chico, mi campeón, mi inversión. Ahora solo falta un último detalle.', if: ['bando', 'pablo'] },
          { who: P, text: 'Mañana, un último combate por el Hoyo Femboy Champion. Contra mi arma secreta. Sergio.' },
          { who: 'chema', text: '¿Sergio? ¿El niño de la capa?' },
          { who: P, text: 'El niño invencible. Y no es coña.' },
        ],
      },
    ],
    setOnWin: { cap8: true },
  },

  // ===================================================================== 9
  {
    id: 'final', title: 'El niño invencible', arena: 'ascensor',
    summary: 'El campeonato 24/7 en un ascensor, contra Sergio. El final de la historia.',
    intro: [
      {
        bg: 'ascensor', cast: ['chema', 'sergio'],
        lines: [
          N('Un rascacielos. Planta 99. Una cabina de cristal suspendida sobre una ciudad entera. El Hoyo Femboy Champion se decide aquí, bajo las reglas del campeonato 24/7: se puede hacer un pin en cualquier momento.'),
          { who: 'sergio', text: '¡Hola! Soy Sergio. Tengo nueve años, nunca he perdido y me encantan las capas.' },
          { who: 'pepe the gay dragon', text: '¡Es un unicornio, Chema! Digo… Sergio es invencible. Lo digo yo, que soy un unicornio.' },
          { who: 'chema', text: '¿Pepe? ¿Tú también estás aquí?' },
          { who: 'pepe the gay dragon', text: 'Me fui con él hace años. Es el mejor jefe que he tenido. Y no me hace firmar nada.' },
          { who: 'arbitro', text: 'Reglas del ascensor: el cristal aguanta, la cabina no. ¡Que alguien me suba el sueldo!' },
        ],
      },
    ],
    fights: [{
      opponent: 'sergio', arena: 'ascensor', difficulty: 'dificil', handicap: { hp: 1.05, power: 1.05 },
      boss: { at: 0.5, power: 1.25, speed: 1.12, heal: 0.25, text: '¡Sergio saca la capa invencible! «¡Ahora sí que no me podéis tumbar!»' },
      objective: 'Derrota a Sergio en el ascensor 24/7 (pins rapidísimos)',
      tips: ['En el ascensor 24/7 la cuenta del pin va muchísimo más rápida: si lo tumbas, ¡remata ya!', 'Sergio recibe muy poco daño. Aprovecha los agarres y los pins.', 'Al 50 % de vida se enfurece y se cura. Guarda tu finisher para esa fase.'],
      before: [{ bg: 'ascensor', cast: ['chema', 'sergio'], lines: [{ who: 'sergio', text: '¡Que empiece el juego! ¿Preparado, Chema?' }, { who: 'chema', text: 'Preparado. Y con la letra pequeña bien leída.' }] }],
    }],
    outro: [
      {
        bg: 'ascensor', cast: ['chema', 'sergio'],
        lines: [
          { who: 'arbitro', text: '¡Uno… dos… tres! ¡Y el nuevo Hoyo Femboy Champion es… Chema!' },
          { who: 'sergio', text: 'Vaya. Nunca había perdido. ¡Qué raro es perder! Me ha gustado. ¿Puedo volver a jugar?' },
          { who: 'pepe the gay dragon', text: 'Un solo golpe, Chema. ¡Pero uno muy bueno!' },
          N('Las puertas del ascensor se abren. Afuera esperan Pablo Motos, Elso, Petisui, Kongui y todo el vestuario. El último capítulo de la temporada ha llegado.'),
        ],
        choices: [
          { text: 'Brindar con Pablo Motos: «Sigo siendo tu campeón.»', set: { final: 'leal' }, reply: [{ who: P, text: 'Sabía que eras de los míos. ¿Firmamos el siguiente contrato? Tiene letra pequeña, pero esta vez es muy pequeñita.' }], if: ['bando', 'pablo'] },
          { text: 'Despedir a Pablo y quedarte con el Hoyo.', set: { final: 'dueno' }, reply: [{ who: 'chema', text: 'Pablo… estás despedido. La empresa es mía. Y la letra pequeña… ya se imprimirá en grande.' }], if: ['bando', 'elso'] },
          { text: 'Devolver el Hoyo a los luchadores y dejar a Elso al mando.', set: { final: 'rebelde' }, reply: [{ who: 'elso', text: 'No me lo esperaba. Es lo primero bueno que me pasa desde la temporada 3.' }], if: ['bando', 'elso'] },
        ],
      },
    ],
    setOnWin: { cap9: true },
    endsStory: true,
    rewards: { achievements: ['historia'], text: 'Desbloqueados: Chema, Sergio y el traje "Jefe supremo" de Pablo Motos' },
  },
];

export const ENDINGS: StoryEnding[] = [
  {
    id: 'leal', title: 'Campeón leal',
    summary: 'Te quedas con Pablo Motos: cinturón, contrato… y letra pequeña. Todo el Hoyo te aplaude.',
    scenes: [{
      bg: 'matamoros', cast: ['chema', 'pablo motos'],
      lines: [
        N('Matamoros, un año después. Treinta mil personas coreando un nombre: «¡Chema! ¡Chema! ¡Chema!»'),
        { who: 'pablo motos', text: 'Campeón del Hoyo, campeón de parejas, campeón Femboy y mi mejor inversión. ¿Quién me iba a decir que el chándal rojo daría tanto dinero?' },
        { who: 'chema', text: 'El contrato nuevo dice que me das el 3 %. ¿Es normal?' },
        { who: 'pablo motos', text: 'Es muy legal. Lo ha revisado mi primo.' },
        { who: 'elso', text: 'Ya me lo dirás cuando te rompan el cinturón, campeón. Yo estaré en primera fila.' },
        N('Y así, entre luces, aplausos y letras demasiado pequeñas, Chema se convirtió en la cara del Hoyo. FIN.'),
      ],
    }],
  },
  {
    id: 'dueno', title: 'Dueño del Hoyo',
    summary: 'Despides a Pablo Motos y te quedas con la empresa. El jefe ahora eres tú.',
    scenes: [{
      bg: 'oficina', cast: ['chema', 'pablo motos'],
      lines: [
        N('El despacho de Pablo Motos tiene un nuevo dueño. El retrato de las paredes ahora enseña a un tipo con chándal rojo.'),
        { who: 'pablo motos', text: '¿Me vas a despedir a mí? ¡Soy el que pone la pasta!' },
        { who: 'chema', text: 'Eras. Ahora la pasta la pongo yo. Y mañana tienes entrenamiento a las ocho: te vas a pegar con Big Mac.' },
        { who: 'petisui', text: 'Tengo que reconocerlo: el chaval tiene más cara que yo. Y eso ya es decir.' },
        { who: 'pablo motos', text: 'Mi empresa… mis reglas… mi… ¿alguien puede darme un contrato nuevo?' },
        N('Esa noche, el nuevo Hoyo Wrestling ofreció su primer espectáculo con la letra pequeña… en letra grande. FIN.'),
      ],
    }],
  },
  {
    id: 'rebelde', title: 'El rebelde',
    summary: 'Le devuelves el Hoyo a los luchadores y Elso queda al mando. Nadie vuelve a leer letra pequeña.',
    scenes: [{
      bg: 'garito', cast: ['chema', 'elso'],
      lines: [
        N('Las 3000 viviendas. El garito, lleno hasta la bandera. Una bombilla, una pancarta nueva: «EL HOYO ES DE TODOS».'),
        { who: 'elso', text: 'No me lo esperaba, Chema. Después de todo lo que he hecho… me dejas el mando.' },
        { who: 'chema', text: 'Tú tienes más motivos que nadie. Y aquí no hay letra pequeña.' },
        { who: 'petisui', text: 'Yo propongo que los contratos se firmen con silla: el que gane la silla, tiene razón.' },
        { who: 'big mac', text: 'Yo propongo que el catering lo ponga yo.' },
        N('Esa noche, por primera vez, todos los luchadores del Hoyo cobraron lo mismo. Y ninguno se quejó… demasiado. FIN.'),
      ],
    }],
  },
];
