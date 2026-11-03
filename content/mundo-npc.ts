/**
 * NPC del mundo abierto: luchadores (retables) y civiles, con sus conversaciones por etapa de la historia.
 * Cada NPC elige la PRIMERA conversación (`talks`) cuya condición se cumpla; si ninguna, una frase suelta (`quips`).
 * Las misiones (content/misiones.ts) añaden sus propias conversaciones al hablar con quien las da.
 */
import type { NpcDef, NpcTalk } from '../src/world/types';
import type { StoryLine } from '../src/modes/Story';
import type { Cond } from '../src/modes/World';

const L = (who: string, text: string): StoryLine => ({ who, text });
const talk = (cond: Cond | undefined, who: string, ...lines: StoryLine[]): NpcTalk => ({ cond, scenes: [{ cast: [who, 'chema'], lines }] });
const C = 'chema';

/** Pistas de Pablo Motos para cada capítulo de la historia */
const PABLO_HINTS: [string | null, string, string][] = [
  [null, 'fichaje', 'Ve a la marca dorada de la plaza, delante de mí. Ahí empieza tu historia, novato. Y, por favor, no rompas nada.'],
  ['fichaje', 'garito', 'Mañana te presento a unos amigos de las 3000 viviendas. Ve al oeste, a los bloques altos. Cuando oscurezca, mejor.'],
  ['garito', 'champion', 'Empieza el Hoyo Champion. Cartel en la plaza, junto a Matamoros. Gana tres combates y el cinturón es tuyo… y mío.'],
  ['champion', 'pareja', 'Ahora toca el Hoyo Tag Champion. Barrio Manchester, al este. Dos contra dos. Elige bien al compañero.'],
  ['pareja', 'yosuke', 'Dicen que Yosuke ronda el Polígono Industrial. Sé amable con él. O no. Qué más me da.'],
  ['yosuke', 'azotea', 'Me han dicho que unos amigos te esperan en la azotea de las 3000. No les hagas esperar.'],
  ['azotea', 'gauntlet', 'Santiago de Chile te espera. Coge el tren desde cualquier parada de taxis. Aguanta tres combates seguidos.'],
  ['gauntlet', 'oficina', 'Pasa por la Torre cuando puedas: mi despacho, al norte. Tenemos que hablar de negocios. Y de la letra pequeña.'],
  ['oficina', 'final', 'Última planta, campeón. El ascensor de cristal. Sergio te espera. Y no, no es coña.'],
];

export const NPCS: NpcDef[] = [
  // =================================================================== PLAZA
  {
    id: 'pablo motos', district: 'plaza', at: [0, -8], fighter: true, yaw: 0,
    talks: [
      ...PABLO_HINTS.map(([prev, next, text]): NpcTalk => talk({ ...(prev ? { chapter: prev } : {}), notChapter: next }, 'pablo motos', L('pablo motos', text))),
      talk({ ending: true }, 'pablo motos',
        L('pablo motos', 'Campeón de todo, mi mejor inversión. Hay una Torre con diez pisos y diez combates. Sube cuando quieras. Es muy legal. Lo ha revisado mi primo.'),
        L(C, '¿Y cobraré algo?'), L('pablo motos', 'Cobrarás la gloria. Y la gloria no tiene letra pequeña. Bueno, un poquito.')),
    ],
    quips: ['Soy el jefe, el que pone la pasta. Hoy pongo poca.', 'Si quieres pegarte, hazlo en el estadio. En la plaza se ensucia el suelo.', '¿Has leído la letra pequeña? Yo tampoco.'],
  },
  {
    id: 'coach', district: 'plaza', at: [14, 10], yaw: Math.PI,
    talks: [
      talk({ notFlag: 'coach_hola' }, 'coach', L('coach', '¡Tú! ¡El del chándal rojo! Soy Míster Puñetazo. Aquí se suda, se paga y se sube de nivel.'), L(C, '¿Y si no pago?'), L('coach', 'Entonces sudas más. Pasa dentro y entrena: cada nivel que subes te da un punto para mejorarte.')),
    ],
    quips: ['¡Una más! ¡Una más! ¡Y otra!', 'Los músculos no se compran, se pagan en cuotas de Hoyos.', 'Sube de nivel peleando por la ciudad y vuelve aquí a gastar los puntos.'],
  },
  {
    id: 'merchero', district: 'plaza', at: [-14, 10], yaw: Math.PI,
    talks: [talk({ notFlag: 'merchero_hola' }, 'merchero', L('merchero', 'Bienvenido a Merch Hoyo: camisetas, cinturones, zapatillas y amuletos. Todo oficial. Casi todo.'), L(C, '¿Cómo que "casi"?'), L('merchero', 'La pata de conejo la he encontrado yo. Pero funciona. Funciona seguro.'))],
    quips: ['Cuanto más equipo, menos golpes. Eso dicen.', 'El Cinturón del Hoyo es el mejor. El precio también.', 'Compra la pegatina de la suerte: la suerte no se puede comprar, pero se puede pegar.'],
  },
  {
    id: 'taxista', district: 'plaza', at: [16, -8], yaw: -Math.PI / 2,
    talks: [talk({ notFlag: 'taxista_hola' }, 'taxista', L('taxista', 'Taxi del Hoyo City. Te llevo a donde quieras: a la playa, a las 3000, a donde Pablo me pague. Veinte Hoyos el viaje.'))],
    quips: ['Hoy he visto a Elso en la playa mirando el mar con cara de telenovela.', 'Para ir a Santiago hay que haber hecho antes cosas en la historia. Yo solo conduzco.', 'Si hay un apagón, mejor quédate dentro del taxi.'],
  },
  {
    id: 'arbitro_civ', district: 'plaza', at: [9, 1], yaw: -Math.PI / 2,
    talks: [talk({ notFlag: 'arbitro_hola' }, 'arbitro_civ', L('arbitro_civ', 'Pité el primer combate del Hoyo. Me prometieron un contrato. Aún lo espero.'), L(C, '¿Cuánto hace de eso?'), L('arbitro_civ', 'Cinco temporadas. Pero no me quejo. Pablo dice que está en el correo.'))],
    quips: ['Los árbitros ven todo. Menos en las 3000: ahí se nos va la vista.', 'Si ves un pin cerca de las cuerdas, es rope break. Lo digo yo.', 'Un buen árbitro no se nota. Por eso nadie me nota.'],
  },
  {
    id: 'nino', district: 'plaza', at: [5, 12], yaw: Math.PI,
    talks: [talk({ notFlag: 'nino_hola' }, 'nino', L('nino', '¡Hola! ¿Tú eres Chema, el campeón? ¡Colecciono pegatinas del Hoyo! Hay treinta escondidas por la ciudad. ¿Me ayudas?'))],
    quips: ['¡Yo ya tengo diecisiete! Bueno… tres. Pero voy a por más.', 'Hay pegatinas que solo se ven de noche. Mi madre no me deja salir.', 'Si me traes pegatinas, te cuento un secreto.'],
  },
  {
    id: 'big boom', district: 'plaza', at: [21, 11], fighter: true, yaw: Math.PI,
    talks: [
      talk({ notChapter: 'pareja' }, 'big boom', L('big boom', '¡BOOM! ¡Hola! Estoy entrenando con mi compañero Big Justice. ¿Quieres pegarte? Te aviso: me han despedido dos veces.')),
      talk({ chapter: 'pareja' }, 'big boom', L('big boom', 'Los Hoyo Tag Champions, ¡eh! Casi nos ganáis. Casi. Yo sigo diciendo que fue un empate técnico.')),
    ],
    quips: ['¡BOOM!', 'Big Justice dice que hoy toca pecho. Lo dice con la mirada.', 'Si me retas, que sea a las cuatro: a esa hora me sale la mejor embestida.'],
  },
  {
    id: 'big justice', district: 'plaza', at: [23, 13], fighter: true, yaw: Math.PI,
    talks: [talk(undefined, 'big justice', L('big justice', 'Justicia.'), L(C, '¿Algo más?'), L('big justice', 'Justicia… y proteínas.'))],
    quips: ['Justicia.', 'Justicia. Justicia. Justicia.', '…Justicia.'],
  },
  // =================================================================== VIVIENDAS
  {
    id: 'petisui', district: 'viviendas', at: [2, 10], fighter: true, yaw: Math.PI,
    alt: { cond: { night: true }, district: 'viviendas', at: [-2, 10] },
    talks: [
      talk({ notChapter: 'garito' }, 'petisui', L('petisui', '¿Eres el fichaje del jefe? Qué joven. Qué limpio. Aquí el que manda soy yo. Y mi silla.')),
      talk({ night: true, chapter: 'garito' }, 'petisui', L('petisui', 'De noche el garito abre. Dentro se apuesta, se bebe y se pelea. Ve con cuidado, socio.')),
      talk({ chapter: 'garito' }, 'petisui', L('petisui', 'Te sigo la pista, chaval. Ya me lo agradecerás. O no.')),
    ],
    quips: ['Una silla bien dada arregla cualquier discusión.', 'En las 3000 aprendes a esquivar. Y a cobrar por adelantado.', 'Si quieres saber algo del Hoyo, pregúntale a la abuela de la ventana. O a mí. A mí cuesta dinero.'],
  },
  {
    id: 'big mac', district: 'viviendas', at: [12, 10], fighter: true, yaw: Math.PI,
    talks: [talk({ notChapter: 'garito' }, 'big mac', L('big mac', 'Huele a carne fresca. Digo… a novato. ¿Quieres una hamburguesa? Es gratis. La primera.'))],
    quips: ['Tengo hambre. Siempre tengo hambre.', 'Mi finisher se llama Bocado Caníbal. Mi segundo finisher se llama Postre.', 'Si ganas el concurso de hamburguesas, te hago socio de la casa.'],
  },
  {
    id: 'darksinfacha', district: 'viviendas', at: [18, -10], fighter: true, yaw: Math.PI,
    talks: [
      talk({ notChapter: 'azotea' }, 'darksinfacha', L('darksinfacha', 'No me juzgues por la bolsa. Juzga mis victorias… que ya llegarán. Mi padre dice que mañana.')),
      talk({ chapter: 'azotea' }, 'darksinfacha', L('darksinfacha', 'Aún me duele lo de la azotea. Pero de eso aprendí: la próxima vez, dos bates.')),
    ],
    quips: ['Soy Alesinfacha. Bueno, Darksinfacha. Es largo de explicar.', 'No es un enchufe: es una recomendación familiar.', 'La bolsa me da personalidad. Y calor.'],
  },
  {
    id: 'abuela', district: 'viviendas', at: [-14, 0], yaw: Math.PI / 2,
    talks: [talk({ notFlag: 'abuela_hola' }, 'abuela', L('abuela', 'Hijo, desde mi balcón lo veo todo: quién entra al garito, quién sale con la cartera más ligera… Ven a verme cuando tengas dudas.'))],
    quips: ['Hay pegatinas del Hoyo por toda la ciudad. En mi época eran cromos.', 'Petisui debe tres meses de alquiler. Y una silla.', 'Si ves un grafiti bonito, hazle una foto. Con la cámara, hijo, no con los ojos.'],
  },
  // =================================================================== ALDEA
  {
    id: 'kongui', district: 'aldea', at: [4, 6], fighter: true, yaw: Math.PI,
    talks: [
      talk({ notChapter: 'champion' }, 'kongui', L('kongui', 'Bienvenido al Reino Kongui, forastero. Aquí se pelea con honor. Y se toca con ritmo.')),
      talk({ chapter: 'champion' }, 'kongui', L('kongui', 'El campeón del Hoyo en mi aldea. La tribu te recuerda. Mis cinco amigos de la puerta, también.')),
    ],
    quips: ['Entrenado por monjes y romanos. Cobro por clase.', 'Si le pegas a uno de la tribu, te atacan todos. Es la ley del Reino.', 'La corona me pesa. Pero me queda bien.'],
  },
  {
    id: 'tamborilero', district: 'aldea', at: [-6, 4], yaw: Math.PI / 2,
    talks: [talk({ notFlag: 'tambor_hola' }, 'tamborilero', L('tamborilero', 'Los tambores hablan. Escucha: pum, pum, pa. Si sigues el ritmo, la tribu te respeta.'))],
    quips: ['Pum, pum, pa.', 'El ritmo no se aprende: se siente.', 'Kongui toca peor que yo. No se lo digas.'],
  },
  // =================================================================== PLAYA
  {
    id: 'elso', district: 'playa', at: [-8, 4], fighter: true, yaw: Math.PI / 2,
    talks: [
      talk({ notChapter: 'yosuke' }, 'elso', L('elso', 'Aquí vengo a pensar. A veces a pegar. Hoy, a pensar. Dicen que soy el campeón Femboy… pero no se me nota.')),
      talk({ chapter: 'yosuke', notChapter: 'oficina' }, 'elso', L('elso', 'Gracias por lo de Yosuke. En serio. Aún me escuece la chilena, pero respiro mejor.')),
      talk({ chapter: 'oficina' }, 'elso', L('elso', 'Se acabó lo de Pablo y su letra pequeña. Para bien o para mal. ¿Una revancha de amigos?')),
    ],
    quips: ['El mar escucha mejor que Pablo.', 'Mi golpe femboy da KO. A veces a mí también.', 'Hay una playa en Honduras como esta. Se parecen. Cambia la gente.'],
  },
  {
    id: 'perro cheetos', district: 'playa', at: [22, 0], fighter: true, yaw: Math.PI,
    talks: [talk(undefined, 'perro cheetos', L('perro cheetos', '¡Guau! Soy Perro Cheetos, mejor debut del Hoyo. ¿Tienes cheetos? Los tengo todos contados.'))],
    quips: ['Entré al Hoyo en coche con Snoop Dogg. Tú, a pie. Se nota.', 'Me encanta la playa: hay arena para enterrar cosas.', 'Si me retas, ¡yo muerdo!'],
  },
  {
    id: 'pescador', district: 'playa', at: [10, 14], yaw: Math.PI,
    talks: [talk({ notFlag: 'pescador_hola' }, 'pescador', L('pescador', 'Llevo treinta años aquí y diez pescados. Pero no me quejo: el mar es paciente. Tú, no. Pasa por el muelle y pesca.'))],
    quips: ['El pescado fresco te da vida para el próximo combate. Pesca uno.', 'Hay que esperar a que pique. Y pulsar justo cuando se hunde el corcho.', 'Hoy no pican. Ayer sí. Mañana, ya veremos.'],
  },
  {
    id: 'barman', district: 'playa', at: [-20, 2], yaw: Math.PI / 2,
    talks: [talk({ notFlag: 'barman_hola' }, 'barman', L('barman', 'Bienvenido al Tiki. Cócteles con sombrilla y un café que despierta muertos. ¿Qué te pongo?'))],
    quips: ['Si bebes demasiado, te dejo dormir bajo la barra. Cobro extra.', 'Elso viene todos los días. Pide una limonada y llora.', 'De noche, la hoguera tiene magia.'],
  },
  {
    id: 'pepe the gay dragon', district: 'playa', at: [30, -8], fighter: true, yaw: Math.PI,
    alt: { cond: { chapter: 'oficina' }, district: 'torre', at: [8, 12] },
    talks: [talk(undefined, 'pepe the gay dragon', L('pepe the gay dragon', 'Soy un unicornio. Un unicornio muy majestuoso. Lo digo yo, que soy el unicornio.'))],
    quips: ['El cuerno es de verdad. Pregúntale a Petisui.', 'Me he vuelto a ir con un jefe nuevo. Esta vez no hay letra pequeña.', 'Un solo golpe. Un solo cuerno.'],
  },
  // =================================================================== MANCHESTER
  {
    id: 'ansol', district: 'manchester', at: [12, 9], fighter: true, yaw: Math.PI,
    talks: [
      talk({ notChapter: 'champion' }, 'ansol', L('ansol', 'Calma. Yo no hablo mucho: me observo. Si quieres pelear, pelea. Si no, siéntate.')),
      talk({ chapter: 'champion' }, 'ansol', L('ansol', 'El campeón del Hoyo. Me ganaste en una final que no pienso olvidar. Y eso que yo no olvido nada.')),
    ],
    quips: ['El sol sale para todos. Para ti, un poco menos.', 'El sombrero no me lo quito. Ni para dormir.', 'Uno de los tres grandes no se tropieza con cualquiera.'],
  },
  {
    id: 'kent', district: 'manchester', at: [2, 9], fighter: true, yaw: Math.PI,
    presence: { chapter: 'gauntlet' },
    talks: [talk(undefined, 'kent', L('kent', 'Eres el que sobrevivió a Santiago. Respeto. Aquí no hay jaula ni apagón: aquí se pelea limpio.'))],
    quips: ['Aún pienso en la correa de Manchester.', 'Petisui hace trampas. Yo gano sin ellas.', 'Cuando quieras una revancha, aquí estoy.'],
  },
  {
    id: 'camarero', district: 'manchester', at: [8, 10], yaw: Math.PI,
    talks: [talk({ notFlag: 'camarero_hola' }, 'camarero', L('camarero', 'Buenas tardes. En el teatro se ve el espectáculo. En el café se oye el chisme. Sirvo ambos.'))],
    quips: ['Cuidado con el monigote azul: se mueve cuando nadie mira.', 'El café doble es por la casa. Bueno, por mi propina.', 'Aquí no se grita. Salvo cuando pierde Petisui.'],
  },
  // =================================================================== INDUSTRIAL
  {
    id: 'yosuke', district: 'industrial', at: [3, 5], fighter: true, yaw: Math.PI,
    presence: { chapter: 'pareja' },
    talks: [
      talk({ notChapter: 'yosuke' }, 'yosuke', L('yosuke', 'Bonito cinturón. Sería una pena que se rayara. Estaré en la fábrica cuando quieras la jaula.')),
      talk({ chapter: 'yosuke' }, 'yosuke', L('yosuke', 'Vale, vale, ya aprendí. Pablo me pagaba. A ti te lo paga mejor. Cuando quieras otra revancha, avisa.')),
    ],
    quips: ['Sonrío porque no me cuesta nada.', 'La novia de Elso fue idea mía. Los problemas, de Pablo.', 'En el Polígono nadie te oye. Es perfecto.'],
  },
  {
    id: 'mecanico', district: 'industrial', at: [12, 6], yaw: Math.PI,
    talks: [talk({ notFlag: 'mecanico_hola' }, 'mecanico', L('mecanico', 'Arreglo cualquier cosa, menos corazones rotos. ¿Buscas piezas? En la chatarrería encontrarás de todo.'))],
    quips: ['Esa jaula la soldé yo. Aguantará. Casi siempre.', 'Hay pegatinas entre la chatarra. Las pegó el crío.', 'Cuidado con el aceite: es resbaladizo.'],
  },
  // =================================================================== TORRE
  {
    id: 'recepcionista', district: 'torre', at: [0, 10], yaw: Math.PI,
    talks: [talk({ notFlag: 'recep_hola' }, 'recepcionista', L('recepcionista', 'Torre Motos, ¿en qué puedo ayudarle? Sonrío por contrato. Es de lo poco que Pablo cumple.'))],
    quips: ['El ascensor de cristal es solo para invitados. O campeones.', 'La Torre tiene cuarenta pisos. El despacho está en el último. La salida de emergencia, también.', 'Pablo no está. Pablo está siempre que cobra.'],
  },
  {
    id: 'guardia', district: 'torre', at: [-6, 6], yaw: Math.PI,
    talks: [talk({ notFlag: 'guardia_hola' }, 'guardia', L('guardia', '…'), L(C, '¿Puedo pasar?'), L('guardia', 'Si eres campeón, sí. Si no, también. Pero con cara de pocos amigos.'))],
    quips: ['…', 'Las gafas de sol me las pagó Pablo. Descontadas del sueldo.', 'Cuidado con la moqueta: es de edición limitada.'],
  },
  {
    id: 'sergio', district: 'torre', at: [-8, 12], fighter: true, yaw: Math.PI,
    presence: { chapter: 'oficina' },
    talks: [
      talk({ notChapter: 'final' }, 'sergio', L('sergio', '¡Hola! ¡Soy Sergio! Tengo nueve años, nunca he perdido y me encantan las capas. ¿Jugamos?')),
      talk({ chapter: 'final' }, 'sergio', L('sergio', 'Perdí contigo. ¡Qué raro es perder! Me gustó. ¿Jugamos otra vez? Esta vez te dejo ganar. Es broma. No es broma.')),
    ],
    quips: ['¡Invencible, invencible!', 'Pepe dice que soy un unicornio. Yo digo que soy Sergio.', '¡Una capa nueva, mamá!'],
  },
  // =================================================================== SANTIAGO
  {
    id: 'hincha', district: 'santiago', at: [-6, 6], yaw: Math.PI,
    talks: [talk({ notFlag: 'hincha_hola' }, 'hincha', L('hincha', '¡Chi, chi, chi! ¡Le, le, le! ¡Viva Chile! ¿Tú eres el que aguantó el Gauntlet? ¡Bombo para el campeón!'))],
    quips: ['¡Chi, chi, chi!', 'Cuando se va la luz, el bombo se oye más.', 'Aquí se sufre y se canta. Todo a la vez.'],
  },
  {
    id: 'vendedor', district: 'santiago', at: [12, 6], yaw: Math.PI,
    talks: [talk({ notFlag: 'vendedor_hola' }, 'vendedor', L('vendedor', '¡Empanadas calientes! Curan casi todo. Casi. De pino, de queso y de las que no se mencionan.'))],
    quips: ['Una empanada y un combate: plan perfecto.', 'Llevo aquí desde el primer Gauntlet. Nunca he visto el final.', 'Las empanadas curan el hambre. El resto, no.'],
  },
];

export const NPC_BY_ID = new Map(NPCS.map((n) => [n.id, n]));
