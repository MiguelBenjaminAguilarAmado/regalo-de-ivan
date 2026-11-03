/**
 * ============================================================
 *  HOYO — la historia vivida en la ciudad
 * ============================================================
 * La Historia y la ciudad son el MISMO modo: los capítulos (content/historia.ts) empiezan y acaban en las calles de Hoyo.
 * Aquí están las escenas que los unen:
 *  - PROLOGUE: la llegada de Chema a Hoyo (la primera vez que entras).
 *  - CITY_BEATS[capítulo]:
 *      goal    → el objetivo que se ve arriba en pantalla mientras ese capítulo está pendiente.
 *      cast    → quién espera junto a la marca dorada del capítulo (se ven de pie en la calle).
 *      arrive  → escena en la calle al llegar a la marca (antes de la introducción del capítulo).
 *      after   → escena en la calle al volver a Hoyo con el capítulo ganado (lleva al siguiente).
 *  - CHATTER: lo que comenta la gente por la calle (bocadillos), según cómo vaya la historia.
 * Las escenas usan el mismo formato que las de la historia. Si una escena tiene `cast: ['chema']`, nadie aparece
 * (sirve para llamadas de teléfono); si no, los que hablan aparecen en la calle delante de Chema.
 */
import type { StoryLine, StoryScene } from '../src/modes/Story';
import type { Cond } from '../src/modes/World';

const N = (text: string): StoryLine => ({ who: 'narrador', text });
const P = 'pablo motos';
const C = 'chema';
const TEL = (lines: StoryLine[]): StoryScene => ({ cast: [C], lines });

export const CITY_NAME = 'Hoyo';

export const PROLOGUE: StoryScene[] = [
  {
    cast: [C],
    lines: [
      N('Hoyo. Una ciudad pequeña con un estadio enorme, un garito sin reglas, una playa, una tribu, un teatro con un monigote azul… y luchadores en cada esquina.'),
      N('Un autobús frena en la plaza. Baja un chaval con un chándal rojo, una mochila y ninguna idea de dónde se ha metido.'),
      { who: C, text: 'Así que esto es Hoyo. Huele a churros, a linimento y a problemas.' },
    ],
  },
  {
    cast: ['taxista', 'nino'],
    lines: [
      { who: 'taxista', text: '¡Eh, tú, el del chándal! ¿Taxi? ¿No? Pues bienvenido a Hoyo. Aquí todo el mundo pelea: el panadero, la abuela, el cartero…' },
      { who: 'nino', text: '¿Eres luchador? ¡Tienes cara de luchador! Bueno, de luchador que todavía no ha ganado nada.' },
      { who: C, text: 'Me llamo Chema. Vengo a buscar a un tal Pablo Motos.' },
      { who: 'taxista', text: '¿Pablo Motos? Huy. Lleva la empresa del Hoyo. Paga poco, promete mucho y tiene un contrato con la letra más pequeña del mundo.' },
      { who: 'nino', text: '¡Mira! Ahí entrenan Big Boom y Big Justice. Y en el ring de la plaza siempre hay combate de exhibición. ¡Los luchadores van por la calle como si nada!' },
      { who: 'taxista', text: 'Si te pierdes, mira el mapa: los barrios cerrados se abren cuando te ganas el respeto de la ciudad. Y si necesitas ir lejos, para eso estoy yo.' },
    ],
  },
  {
    cast: [C],
    lines: [
      N('Muévete con el joystick (o WASD; corre a tope o con Shift). Pulsa HABLAR / E junto a alguien o junto a un sitio para interactuar.'),
      N('El MAPA (botón o tecla M) te enseña los barrios, los luchadores y la estrella dorada del siguiente capítulo. Arriba verás siempre tu objetivo y una flecha que te guía.'),
      N('La historia avanza en las marcas doradas. Entre capítulo y capítulo, Hoyo es tuyo: misiones, pegatinas, combates callejeros, minijuegos, tiendas y apuestas.'),
    ],
  },
];

export interface CityBeat { goal: string; cast?: string[]; arrive?: StoryScene[]; after?: StoryScene[] }

export const CITY_BEATS: Record<string, CityBeat> = {
  fichaje: {
    goal: 'Busca a Pablo Motos frente al Estadio de Matamoros',
    cast: [P],
    arrive: [{
      cast: [P],
      lines: [
        N('Delante del Estadio de Matamoros hay un hombre con americana, barba y una sonrisa de vendedor de coches de segunda mano.'),
        { who: P, text: '¡Por fin! ¿Tú eres el chaval del autobús? Te he visto bajar. Tienes pinta de vender entradas. Vamos dentro, que la gente espera.' },
      ],
    }],
    after: [
      {
        cast: ['nino', 'taxista'],
        lines: [
          N('Al salir del estadio, media plaza te está esperando.'),
          { who: 'nino', text: '¡Lo he visto todo desde la valla! ¡Le has ganado al Novato! Bueno, era el Novato… ¡pero le has ganado!' },
          { who: 'taxista', text: 'Primer combate y primera victoria. En Hoyo eso se celebra con churros. Y con un taxi, si lo pagas tú.' },
        ],
      },
      TEL([
        N('Te vibra el móvil. Número oculto. Solo puede ser una persona.'),
        { who: P, text: 'Chema, campeón, mi fichaje estrella. Mañana te presento a unos amigos en Las 3000 Viviendas, al oeste de la plaza. Ve de noche: de día no hay nadie despierto.' },
        { who: C, text: '¿Y cuánto me pagan?' },
        { who: P, text: 'Te pagan en experiencia. ¿Qué tal suena? Suena a que te cuelgo.' },
      ]),
    ],
  },
  garito: {
    goal: 'Ve a Las 3000 Viviendas (oeste): Petisui te espera junto al garito',
    cast: ['petisui', 'big mac'],
    arrive: [{
      cast: ['petisui'],
      lines: [
        N('Entre los bloques de las 3000, una silla plegable apoyada en la pared. Sentado en ella, alguien que te mira como si ya te conociera.'),
        { who: 'petisui', text: 'Tú debes de ser el juguete nuevo de Pablo. Baja conmigo al sótano. Aquí arriba te ven los vecinos, y abajo… abajo no te ve nadie.' },
      ],
    }],
    after: [
      {
        cast: ['abuela'],
        lines: [
          { who: 'abuela', text: '¡Niño! ¡Tú! Te he visto salir del garito con la cara entera. Eso no lo hace nadie. Toma, un bocadillo, que estás en los huesos.' },
          { who: C, text: 'Gracias, señora. ¿Usted ve mucho desde ese balcón?' },
          { who: 'abuela', text: 'Lo veo TODO. Y te digo una cosa: en la plaza han colgado un cartel del Hoyo Champion. Y tu cara no sale. Todavía.' },
        ],
      },
      TEL([
        { who: P, text: '¿Sigues vivo? ¡Estupendo! Eso me ahorra papeleo. Empieza el Hoyo Champion: el cartel está en la plaza, junto a Matamoros. Tres combates. Un cinturón.' },
        { who: C, text: '¿Y quién entra en el torneo?' },
        { who: P, text: 'Perro Cheetos, Kongui, Ansol… y tú, porque te he apuntado yo sin preguntarte. Es lo que hacen los buenos representantes.' },
      ]),
    ],
  },
  champion: {
    goal: 'Vuelve a la Plaza del Hoyo: el cartel del Hoyo Champion te espera',
    cast: [P, 'ansol'],
    arrive: [{
      cast: ['ansol'],
      lines: [
        N('Bajo el cartel del Hoyo Champion, Ansol se ajusta las vendas. Tiene la mirada de alguien que ha ganado muchas veces y no se aburre de hacerlo.'),
        { who: 'ansol', text: 'Así que tú eres el nuevo. Te he visto en el garito. No estuvo mal. Aquí, en el torneo de verdad, no basta con no estar mal.' },
        { who: C, text: 'Pues entonces tendré que estar bien.' },
        { who: 'ansol', text: 'Me gusta. Nos vemos en la final… si llegas.' },
      ],
    }],
    after: [
      {
        cast: ['nino', 'merchero'],
        lines: [
          N('La plaza entera canta tu nombre. Alguien ha pintado tu cara en una pancarta. Muy mal, pero con cariño.'),
          { who: 'merchero', text: '¡Camisetas de Chema, el nuevo Hoyo Champion! ¡Dos por una! ¡Una por dos! ¡Como sea, pero comprad!' },
          { who: 'nino', text: '¡Te he puesto en mi álbum de pegatinas! Entre Elso y Kongui. ¡Eres oficial!' },
        ],
      },
      TEL([
        { who: P, text: 'Campeón, campeón… Ahora viene lo bueno: el Hoyo Tag Champion. Dos contra dos. Te espero en el Barrio Manchester, al este. Ya lo he abierto para ti.' },
        { who: P, text: 'Ah, y el Barrio Manchester tiene un monigote azul gigante. No le mires mucho a los ojos. Se viene arriba.' },
      ]),
    ],
  },
  pareja: {
    goal: 'Ve al Barrio Manchester (este): Pablo anuncia el Hoyo Tag Champion',
    cast: [P, 'big boom'],
    arrive: [{
      cast: ['big boom', 'big justice'],
      lines: [
        N('Delante del teatro, dos montañas con piernas calientan haciendo sentadillas. Una de ellas lleva un mazo. La otra, cara de mazo.'),
        { who: 'big boom', text: '¡Tú eres el campeón! Nos han dicho que vienes a por nuestro cinturón de parejas. Que lo sepas: me han despedido de cuatro trabajos, pero de este no.' },
        { who: 'big justice', text: 'Justicia.' },
      ],
    }],
    after: [
      {
        cast: ['camarero'],
        lines: [
          { who: 'camarero', text: 'Señor campeón, una mesa con vistas para usted y su compañero. Invita la casa. Bueno, invita Pablo, aunque todavía no lo sabe.' },
          N('Mientras brindas, ves pasar a alguien por la acera de enfrente. Pelo de punta. Mirada fija. Yosuke. Se mete en una furgoneta que va hacia el Polígono Industrial.'),
        ],
      },
      TEL([
        N('Un mensaje de voz. Número desconocido.'),
        { who: 'yosuke', text: 'Campeón de esto, campeón de aquello… Ven al Polígono Industrial, al sur. Hay una jaula esperándote. Y yo dentro.' },
      ]),
    ],
  },
  yosuke: {
    goal: 'Ve al Polígono Industrial (suroeste): Yosuke te espera en la fábrica',
    cast: ['yosuke'],
    arrive: [{
      cast: ['yosuke', 'elso'],
      lines: [
        N('La puerta de la fábrica está abierta. Dentro, una jaula de acero. Fuera, Elso, con los brazos cruzados.'),
        { who: 'elso', text: 'No he venido a ayudarte. He venido a ver cómo le partes la cara a Yosuke. Que no es lo mismo.' },
        { who: 'yosuke', text: 'Qué bonito. El campeón de siempre y el campeón de ahora. Pasad, pasad. La jaula tiene sitio para todos.' },
      ],
    }],
    after: [
      {
        cast: ['mecanico'],
        lines: [
          { who: 'mecanico', text: 'Te he visto salir de la jaula andando. Respeto. Ni yo sé arreglar lo que Yosuke ha dejado ahí dentro.' },
          { who: 'mecanico', text: 'Un consejo: dicen que esta noche te buscan en la azotea de las 3000. Mucha gente. Pocas ganas de hablar.' },
        ],
      },
    ],
  },
  azotea: {
    goal: 'Sube a la azotea de Las 3000 Viviendas',
    cast: ['petisui'],
    arrive: [{
      cast: ['petisui'],
      lines: [
        { who: 'petisui', text: 'Chema. No subas. Lo digo en serio por una vez. Arriba hay más gente de la que cabe en una azotea.' },
        { who: C, text: '¿Y tú qué haces aquí abajo?' },
        { who: 'petisui', text: 'Yo vigilo la escalera. Alguien tiene que avisar a la ambulancia. Venga, sube. Noventa segundos, ni uno más.' },
      ],
    }],
    after: [
      TEL([
        { who: P, text: '¡Mi campeón ha sobrevivido a una azotea! Qué gran noticia para mis seguros. Ahora, un viaje: Santiago de Chile. Ya tienes la estación abierta, al noroeste de la ciudad.' },
        { who: C, text: '¿Santiago de Chile está en Hoyo?' },
        { who: P, text: 'Está donde yo diga que está. Tres combates seguidos, sin descanso. La hinchada ya está cantando.' },
      ]),
    ],
  },
  gauntlet: {
    goal: 'Ve al Estadio de Santiago (noroeste): empieza el Gauntlet',
    cast: [P, 'kent'],
    arrive: [{
      cast: ['hincha', 'kent'],
      lines: [
        { who: 'hincha', text: '¡CHI-CHI-CHI! ¡LE-LE-LE! ¡Llegó el español! ¡Que te vamos a pitar, compadre, pero con cariño!' },
        { who: 'kent', text: 'No les hagas caso. O sí. Aquí el público pega más fuerte que los luchadores.' },
      ],
    }],
    after: [
      TEL([
        N('El teléfono suena antes de que te dé tiempo a quitarte las vendas.'),
        { who: P, text: 'Chema. Ven a mi Torre. Al norte, la más alta. Ya he avisado a seguridad. Tenemos que hablar de negocios… y de cosas que no salen en el contrato.' },
      ]),
    ],
  },
  oficina: {
    goal: 'Entra en la Torre Motos (norte): el despacho de Pablo',
    cast: [P, 'elso'],
    arrive: [{
      cast: ['recepcionista'],
      lines: [
        { who: 'recepcionista', text: 'Bienvenido a la Torre Motos. El señor Motos le espera arriba. Por favor, no pelee en el vestíbulo: la moqueta es nueva.' },
      ],
    }],
    after: [
      {
        cast: ['pepe the gay dragon'],
        lines: [
          N('En el jardín de la Torre, un dragón con máscara rosa practica pasos de baile con un cuerno de unicornio puesto.'),
          { who: 'pepe the gay dragon', text: '¡Chema! Mañana subes al ascensor de cristal. Sergio es invencible… pero yo creo en ti. Y en los unicornios. Sobre todo en los unicornios.' },
        ],
      },
    ],
  },
  final: {
    goal: 'Sube al ascensor de cristal de la Torre: el último combate',
    cast: ['sergio', 'pepe the gay dragon'],
    arrive: [{
      cast: ['sergio'],
      lines: [
        { who: 'sergio', text: '¡Hola! ¿Tú eres Chema? ¡Mi papá dice que eres muy bueno! Yo también. Yo soy invencible. ¿Subimos juntos?' },
      ],
    }],
  },
};

/** Frases sueltas de la gente de Hoyo (bocadillos). Se elige al azar entre las que cumplen su condición. */
export const CHATTER: { text: string; cond?: Cond }[] = [
  { text: '¡Mira, mira! ¡Es el del chándal rojo!' },
  { text: 'Dicen que Pablo Motos no paga ni el café.' },
  { text: 'Mi primo se pegó con Big Mac. Ahora es vegetariano.' },
  { text: '¿Has visto a Pepe? Va por ahí con un cuerno de unicornio.' },
  { text: 'Esta noche hay combate en Matamoros. ¿Te vienes?' },
  { text: 'Yo de joven era luchador. Luego me casé. Ahora lucho más.' },
  { text: 'Petisui me debe una silla. Y una disculpa.' },
  { text: 'Cuidado con el garito: allí abajo no hay reglas.', cond: { night: true } },
  { text: 'A estas horas solo salen los luchadores y los gatos.', cond: { night: true } },
  { text: '¡Qué calor hace en Hoyo hoy!', cond: { night: false } },
  { text: 'El monigote azul de Manchester me ha saludado. Lo juro.' },
  { text: 'Kongui me ha mirado. Creo que le caigo bien. O que tiene hambre.' },
  { text: 'Elso entrena en la playa todas las mañanas. Sin camiseta. Por si te interesa.' },
  { text: '¡Hoyo, Hoyo, HOYO!' },
  { text: 'He apostado la paga entera a Perro Cheetos.' },
  { text: '¿Una foto, campeón? Es para mi abuela.' },
  { text: '¿Has probado las empanadas de Santiago? Curan hasta los pins.' },
  { text: 'Ese es nuevo. A ver cuánto dura.', cond: { notChapter: 'fichaje' } },
  { text: '¿Tú eres el fichaje de Pablo? Pobrecito…', cond: { notChapter: 'fichaje' } },
  { text: '¡Le ganaste al Novato! Bueno… era el Novato.', cond: { chapter: 'fichaje', notChapter: 'champion' } },
  { text: 'Dicen que saliste del garito con la cara entera. Eso no lo hace nadie.', cond: { chapter: 'garito', notChapter: 'champion' } },
  { text: '¡Es el Hoyo Champion! ¡Fírmame la camiseta!', cond: { chapter: 'champion' } },
  { text: 'Con ese cinturón pareces otro. Más brillante.', cond: { chapter: 'champion' } },
  { text: 'Yosuke va diciendo que te va a quitar el cinturón.', cond: { chapter: 'pareja', notChapter: 'yosuke' } },
  { text: 'He oído que Pablo tiene un arma secreta: un niño con capa.', cond: { chapter: 'gauntlet', notChapter: 'final' } },
  { text: '¡Leyenda de Hoyo! ¡Mi hijo quiere ser como tú!', cond: { ending: true } },
];
