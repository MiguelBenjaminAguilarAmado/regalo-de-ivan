/**
 * Misiones secundarias del mundo abierto (24). Se aceptan hablando con quien las da (`giver`) cuando se cumple `requires`.
 * Pasos: talk (hablar con alguien), win (ganar un combate callejero), visit (usar un lugar), minigame, collect (pegatinas),
 * bet (ganar apuestas), train, buy, travel (entrar en distritos), photo (fotos de grafitis), cards, tower (piso de la Torre).
 */
import type { QuestDef } from '../src/modes/World';
import type { StoryScene } from '../src/modes/Story';

const S = (cast: string[], ...lines: [string, string][]): StoryScene => ({ cast, lines: lines.map(([who, text]) => ({ who, text })) });
const P = 'pablo motos';

export const QUESTS: QuestDef[] = [
  {
    id: 'silla', title: 'La silla perdida', giver: 'petisui', requires: { chapter: 'fichaje' },
    summary: 'Petisui ha perdido su silla. Dice que la tiró a la fuente. O se la tiraron.',
    intro: [S(['petisui', 'chema'], ['petisui', 'Chaval, necesito un favor. Ayer, tras un malentendido, mi silla acabó en la fuente de la plaza. Y sin silla no soy yo.'], ['chema', '¿Un malentendido?'], ['petisui', 'Le di un sillazo a un árbitro. Sin querer. Ve a la fuente.'])],
    steps: [
      { on: 'visit', target: 'fuente', text: 'Busca la silla de Petisui en la fuente de la plaza.', scenes: [S(['chema'], ['narrador', 'Entre las monedas del fondo brilla un metal conocido. Es una silla plegable. Está mojada y avergonzada.'])] },
      { on: 'talk', target: 'petisui', text: 'Devuélvele la silla a Petisui.', scenes: [S(['petisui', 'chema'], ['petisui', 'Mi silla… Mi preciosa silla. Gracias, chaval. Y como soy un caballero, te regalo una en miniatura.'])] },
    ],
    reward: { money: 150, xp: 90, items: { silla_miniatura: 1 }, text: 'Recibes la Silla del Hoyo en miniatura.' },
  },
  {
    id: 'hamburguesa', title: 'Hambre de campeón', giver: 'big mac', requires: { chapter: 'garito' },
    summary: 'Big Mac te reta a un concurso de hamburguesas en su local.',
    intro: [S(['big mac', 'chema'], ['big mac', 'Tengo una propuesta. El que más hamburguesas se coma, gana. Si ganas tú, te doy comida. Si gano yo… me como la tuya.'], ['chema', 'Suena a que pierdo de todas formas.'], ['big mac', 'Es que pierdes de todas formas.'])],
    steps: [
      { on: 'minigame', target: 'comilona', min: 8, text: 'Gana el concurso de hamburguesas de Mac\'s (8 puntos o más).' },
      { on: 'talk', target: 'big mac', text: 'Cuéntaselo a Big Mac.', scenes: [S(['big mac', 'chema'], ['big mac', '¿Has ganado? Eso es… increíble. Casi me da pena haberte retado. Casi.'])] },
    ],
    reward: { money: 200, xp: 100, items: { bocata: 2 }, text: 'Big Mac te regala 2 bocatas de calamares.' },
  },
  {
    id: 'tambores_q', title: 'El ritmo de la tribu', giver: 'kongui', requires: { chapter: 'garito' },
    summary: 'Kongui quiere que demuestres que sabes tocar los tambores.',
    intro: [S(['kongui', 'chema'], ['kongui', 'En el Reino Kongui, un guerrero se mide por su ritmo. Toca los tambores del círculo y la tribu te respetará.'], ['chema', 'Nunca he tocado un tambor.'], ['kongui', 'Entonces tienes poco que perder. Y mucho ruido que hacer.'])],
    steps: [
      { on: 'minigame', target: 'tambores', min: 10, text: 'Toca los tambores del círculo de la aldea (10 puntos o más).' },
      { on: 'talk', target: 'kongui', text: 'Vuelve con Kongui.', scenes: [S(['kongui', 'chema'], ['kongui', 'La tribu ha escuchado. Pum, pum, pa. Eres uno de los nuestros, forastero.'])] },
    ],
    reward: { money: 220, xp: 110, text: 'La tribu te considera uno de los suyos.' },
  },
  {
    id: 'pesca_q', title: 'Un pescado para el campeón', giver: 'pescador', summary: 'El Pescador quiere que pesques tres peces para enseñarte paciencia.',
    intro: [S(['pescador', 'chema'], ['pescador', 'Trae tres peces del muelle. Es fácil: se pica cuando el corcho se hunde. Lo difícil es esperar.'])],
    steps: [
      { on: 'minigame', target: 'pesca', count: 3, text: 'Pesca 3 peces en el muelle de la playa.' },
      { on: 'talk', target: 'pescador', text: 'Enseña los peces al Pescador.', scenes: [S(['pescador', 'chema'], ['pescador', '¡Tres peces! Hay tipos que llevan toda la vida y no los consiguen. Tienes paciencia, muchacho.'])] },
    ],
    reward: { money: 120, xp: 70, items: { pescado: 2 }, text: 'Te quedas con 2 pescados frescos.' },
  },
  {
    id: 'bate', title: 'El bate de Alesinfacha', giver: 'darksinfacha', requires: { chapter: 'azotea' },
    summary: 'Dark Sin Facha quiere una revancha con su bate.',
    intro: [S(['darksinfacha', 'chema'], ['darksinfacha', 'Aún me duele lo de la azotea. Quiero la revancha. Con el bate nuevo. Es muy bonito. Es de aluminio.'])],
    steps: [
      { on: 'win', target: 'darksinfacha', text: 'Derrota a Dark Sin Facha en un combate callejero.' },
      { on: 'talk', target: 'darksinfacha', text: 'Habla con él después.', scenes: [S(['darksinfacha', 'chema'], ['darksinfacha', 'Bien… bien. Mi padre tenía razón: eres bueno. Se lo voy a decir… y me va a descontar la paga.'])] },
    ],
    reward: { money: 250, xp: 120, items: { pegatina_suerte: 2 }, text: 'Recibes 2 pegatinas de la suerte.' },
  },
  {
    id: 'contrato', title: 'El contrato legal', giver: P, requires: { chapter: 'fichaje' },
    summary: 'Pablo quiere que recojas pegatinas del Hoyo para su "campaña de marketing".',
    intro: [S([P, 'chema'], [P, 'Necesito material para la campaña: cinco pegatinas del Hoyo. Están por toda la ciudad. Es muy legal. Lo ha revisado mi primo.'], ['chema', '¿Y por qué las necesitas tú?'], [P, 'Porque las pegatinas son del Hoyo. Y el Hoyo es mío.'])],
    steps: [
      { on: 'collect', target: 'sticker', count: 5, text: 'Recoge 5 pegatinas del Hoyo repartidas por la ciudad.' },
      { on: 'talk', target: P, text: 'Entrégaselas a Pablo.', scenes: [S([P, 'chema'], [P, 'Cinco pegatinas. Perfecto. Con esto cierro el trimestre. Toma tu parte: casi todo lo que me deben.'])] },
    ],
    reward: { money: 300, xp: 150, text: 'Pablo te paga… la mitad de lo prometido.' },
  },
  {
    id: 'chilena', title: 'La chilena', giver: 'elso', requires: { chapter: 'azotea' },
    summary: 'Elso quiere que viajes a Santiago a buscar noticias de su ex.',
    intro: [S(['elso', 'chema'], ['elso', 'Chema… necesito un favor. Llevo años sin saber de ella. Dicen que en Santiago hay gente que sabe. ¿Puedes ir y preguntar?'], ['chema', 'Claro, Elso.'])],
    steps: [
      { on: 'travel', target: 'santiago', text: 'Viaja al Estadio de Santiago.' },
      { on: 'talk', target: 'hincha', text: 'Pregunta al Hincha chileno.', scenes: [S(['hincha', 'chema'], ['hincha', '¿La chilena de Elso? ¡Está feliz! Tiene un puesto de empanadas… y no echa de menos a nadie. ¡Dile que la quiere, pero que se olvide!'])] },
      { on: 'talk', target: 'elso', text: 'Cuéntaselo a Elso.', scenes: [S(['elso', 'chema'], ['elso', 'Feliz… Con un puesto de empanadas. Es perfecto. Es… Gracias, Chema. Me quitas un peso de encima.'])] },
    ],
    reward: { money: 350, xp: 180, text: 'Elso te agradece el viaje. Y la verdad.' },
  },
  {
    id: 'sombrero', title: 'El sombrero de Ansol', giver: 'ansol', requires: { chapter: 'champion' },
    summary: 'Perro Cheetos ha escondido el sombrero de Ansol. Hay que recuperarlo a golpes.',
    intro: [S(['ansol', 'chema'], ['ansol', 'Perro Cheetos me ha quitado el sombrero. Un perro con mi sombrero. Es un insulto. Recupéralo. Con educación. Con golpes también.'])],
    steps: [
      { on: 'win', target: 'perro cheetos', text: 'Derrota a Perro Cheetos para recuperar el sombrero.' },
      { on: 'talk', target: 'ansol', text: 'Devuélvele el sombrero a Ansol.', scenes: [S(['ansol', 'chema'], ['ansol', 'Mi sombrero. Intacto. Tiene un mordisquito, pero lo perdono. Te debo una.'])] },
    ],
    reward: { money: 280, xp: 140, text: 'Ansol te debe una.' },
  },
  {
    id: 'cheetos_snack', title: 'Aperitivo de campeón', giver: 'perro cheetos', requires: { chapter: 'garito' },
    summary: 'Perro Cheetos tiene hambre: quiere una bebida energética.',
    intro: [S(['perro cheetos', 'chema'], ['perro cheetos', 'Guau. Tengo sed y sin cheetos. ¿Me compras una bebida energética? En Merch Hoyo hay. Te lo devuelvo en ladridos.'])],
    steps: [
      { on: 'buy', target: 'bebida', text: 'Compra una bebida energética (Merch Hoyo o chiringuito).' },
      { on: 'talk', target: 'perro cheetos', text: 'Dásela a Perro Cheetos.', scenes: [S(['perro cheetos', 'chema'], ['perro cheetos', '¡Glup, glup! ¡Guau! ¡Eres el mejor humano del Hoyo! Toma: una cosa brillante que encontré.'])] },
    ],
    reward: { money: 100, xp: 80, items: { amuleto_pata: 1 }, text: 'Perro Cheetos te regala una pata de conejo.' },
  },
  {
    id: 'justicia', title: 'Justicia para Big Justice', giver: 'big boom', requires: { chapter: 'pareja' },
    summary: 'Big Boom quiere un combate amistoso con su compañero.',
    intro: [S(['big boom', 'chema'], ['big boom', 'Los Hoyo Tag Champions merecen una revancha. Pelea con Big Justice. Dice que quiere "Justicia". Pero entiéndelo: es su manera de decir "amigos".'])],
    steps: [
      { on: 'win', target: 'big justice', text: 'Derrota a Big Justice en un combate callejero.' },
      { on: 'talk', target: 'big boom', text: 'Vuelve con Big Boom.', scenes: [S(['big boom', 'chema'], ['big boom', '¡BOOM! ¡Un luchador excelente! Big Justice dice que… ya sabes lo que dice.'])] },
    ],
    reward: { money: 260, xp: 130, items: { chuleton: 1 }, text: 'Big Boom te regala un chuletón.' },
  },
  {
    id: 'correa', title: 'La correa de Manchester', giver: 'kent', requires: { chapter: 'gauntlet' },
    summary: 'Kent quiere una buena pelea para olvidar la correa que perdió.',
    intro: [S(['kent', 'chema'], ['kent', 'Quiero pelear limpio contra alguien que merezca la pena. Vence a dos de mis rivales por mí: Petisui y Ansol. Hazlo y hablamos.'])],
    steps: [
      { on: 'win', target: 'petisui', text: 'Derrota a Petisui.' },
      { on: 'win', target: 'ansol', text: 'Derrota a Ansol.' },
      { on: 'talk', target: 'kent', text: 'Vuelve con Kent.', scenes: [S(['kent', 'chema'], ['kent', 'Los has vencido a los dos. Impecable. Toma esto: la envidia de media ciudad.'])] },
    ],
    reward: { money: 450, xp: 220, items: { cinturon_cuero: 1 }, text: 'Kent te regala un cinturón de cuero.' },
  },
  {
    id: 'apuestas_q', title: 'Suerte de novato', giver: 'yosuke', requires: { chapter: 'pareja' },
    summary: 'Yosuke te desafía a ganar dos apuestas en el garito.',
    intro: [S(['yosuke', 'chema'], ['yosuke', 'A ver si tienes ojo. Gana dos apuestas en el garito de las 3000 y te lo pago yo. Si no… te enseño cómo se pierde con estilo.'])],
    steps: [
      { on: 'bet', count: 2, text: 'Gana 2 apuestas en el garito (solo abre de noche).' },
      { on: 'talk', target: 'yosuke', text: 'Cuéntaselo a Yosuke.', scenes: [S(['yosuke', 'chema'], ['yosuke', 'Dos apuestas ganadas… Tienes más suerte que yo con las novias ajenas. Toma tu premio.'])] },
    ],
    reward: { money: 400, xp: 190, text: 'Yosuke paga la apuesta con mala cara.' },
  },
  {
    id: 'entrenar', title: 'Sudar la camiseta', giver: 'coach', summary: 'Míster Puñetazo quiere que entrenes tres veces en su gimnasio.',
    intro: [S(['coach', 'chema'], ['coach', 'Un luchador sin entrenar es un saco de boxeo con chándal. Entra, suda y vuelve cuando hayas hecho tres sesiones.'])],
    steps: [
      { on: 'train', count: 3, text: 'Entrena 3 veces en el gimnasio (necesitas puntos de entrenamiento y Hoyos).' },
      { on: 'talk', target: 'coach', text: 'Habla con Míster Puñetazo.', scenes: [S(['coach', 'chema'], ['coach', '¡Tres sesiones! ¡Ese es el espíritu! Toma, un punto de mi propio bolsillo.'])] },
    ],
    reward: { money: 150, xp: 100, points: 1, text: 'Ganas 1 punto de entrenamiento.' },
  },
  {
    id: 'compras', title: 'Cliente VIP', giver: 'merchero', summary: 'El Merchero te propone que compres un par de cosas.',
    intro: [S(['merchero', 'chema'], ['merchero', 'Cliente nuevo, cliente feliz. Compra dos cosas en la tienda y te hago socio del club del Merchero. Es gratis. Casi.'])],
    steps: [
      { on: 'buy', count: 2, text: 'Compra 2 objetos en cualquier tienda o puesto.' },
      { on: 'talk', target: 'merchero', text: 'Vuelve con el Merchero.', scenes: [S(['merchero', 'chema'], ['merchero', '¡Socio oficial! Aquí tienes tu carné. Es de cartón. Pero muy bonito.'])] },
    ],
    reward: { money: 100, xp: 70, items: { pegatina_suerte: 1 }, text: 'Recibes una pegatina de la suerte.' },
  },
  {
    id: 'noctambulo', title: 'Noctámbulo', giver: 'barman', requires: { chapter: 'garito' },
    summary: 'La Barman del Tiki dice que el garito es otro mundo. Compruébalo de noche.',
    intro: [S(['barman', 'chema'], ['barman', 'Si quieres conocer el Hoyo de verdad, baja al garito de noche. Mira cómo se apuesta. Y, si te atreves, gana una.'])],
    steps: [
      { on: 'visit', target: 'garito', text: 'Baja al garito de las 3000 de noche.' },
      { on: 'bet', text: 'Gana una apuesta.' },
      { on: 'talk', target: 'barman', text: 'Cuéntaselo a la Barman.', scenes: [S(['barman', 'chema'], ['barman', 'Así se hace. El garito te cambia. O te vacía los bolsillos. Brindamos con limonada.'])] },
    ],
    reward: { money: 300, xp: 150, text: 'La Barman te invita a un café doble.', items: { cafe: 1 } },
  },
  {
    id: 'fotografo', title: 'Ojo de artista', giver: 'abuela', summary: 'La Abuela de la ventana quiere fotos de los grafitis de la ciudad.',
    intro: [S(['abuela', 'chema'], ['abuela', 'Hijo, mi vista ya no es la de antes. Hazme fotos de cinco grafitis de la ciudad. Los míos favoritos están en las 3000, en el polígono y en Manchester.'])],
    steps: [
      { on: 'photo', count: 5, text: 'Fotografía 5 grafitis de la ciudad (los marca un icono de cámara).' },
      { on: 'talk', target: 'abuela', text: 'Enséñale las fotos a la Abuela.', scenes: [S(['abuela', 'chema'], ['abuela', 'Qué preciosidad… Este tiene un dibujo de Petisui tachado. Qué arte. Toma, para tus gastos.'])] },
    ],
    reward: { money: 250, xp: 120, text: 'La Abuela te da propina.' },
  },
  {
    id: 'coleccionista', title: 'Coleccionista', giver: 'nino', summary: 'El Niño de la pelota necesita diez pegatinas para completar su álbum.',
    intro: [S(['nino', 'chema'], ['nino', '¿Me ayudas con mi álbum? Faltan muchas pegatinas del Hoyo. Si me ayudas a encontrar diez, ¡te lo agradeceré para siempre!'])],
    steps: [
      { on: 'collect', target: 'sticker', count: 10, text: 'Recoge 10 pegatinas del Hoyo.' },
      { on: 'talk', target: 'nino', text: 'Llévaselas al Niño.', scenes: [S(['nino', 'chema'], ['nino', '¡Diez! ¡Mi álbum casi está lleno! Te doy lo único que tengo: ¡un punto de mi paga!'])] },
    ],
    reward: { money: 300, xp: 160, points: 1, text: 'Ganas 1 punto de entrenamiento.' },
  },
  {
    id: 'coleccionista2', title: 'Álbum completo', giver: 'nino', requires: { quest: ['coleccionista', 'done'] },
    summary: 'El Niño quiere que consigas otras diez pegatinas.',
    intro: [S(['nino', 'chema'], ['nino', '¡Faltan otras diez! ¡Y tengo un secreto para ti si las encuentras!'])],
    steps: [
      { on: 'collect', target: 'sticker', count: 10, text: 'Recoge otras 10 pegatinas del Hoyo.' },
      { on: 'talk', target: 'nino', text: 'Llévaselas al Niño.', scenes: [S(['nino', 'chema'], ['nino', '¡Veinte! Mi mamá dice que eres un héroe. El secreto: la hoguera de la playa de noche tiene magia.'])] },
    ],
    reward: { money: 700, xp: 320, points: 2, text: 'Ganas 2 puntos de entrenamiento.' },
  },
  {
    id: 'cartas', title: 'Cartas de luchador', giver: 'nino', requires: { chapter: 'champion' },
    summary: 'Cada luchador al que derrotes en la calle te da una carta. El Niño quiere verlas todas.',
    intro: [S(['nino', 'chema'], ['nino', '¡Quiero cartas de luchador! Cuando venzas a alguien en la calle, ¡te dan su carta! ¿Puedes conseguir cinco distintas?'])],
    steps: [
      { on: 'cards', count: 5, text: 'Consigue 5 cartas de luchador (gana combates callejeros contra distintos luchadores).' },
      { on: 'talk', target: 'nino', text: 'Enséñale las cartas al Niño.', scenes: [S(['nino', 'chema'], ['nino', '¡Cinco cartas! ¡Eres mi ídolo! ¡Toma esto, es lo mejor que tengo!'])] },
    ],
    reward: { money: 350, xp: 180, items: { bebida: 2 }, text: 'Recibes 2 bebidas energéticas.' },
  },
  {
    id: 'taxi_vip', title: 'Viajero frecuente', giver: 'taxista', summary: 'El Taxista quiere que conozcas la ciudad: visita cuatro distritos.',
    intro: [S(['taxista', 'chema'], ['taxista', 'Un campeón debe conocer su ciudad. Pisa cuatro distritos distintos y te hago un descuento vitalicio. Que no es nada, pero suena bien.'])],
    steps: [
      { on: 'travel', count: 4, text: 'Entra en 4 distritos (da igual cómo llegues).' },
      { on: 'talk', target: 'taxista', text: 'Vuelve con el Taxista.', scenes: [S(['taxista', 'chema'], ['taxista', 'Cuatro distritos. ¡Qué viajero! Descuento vitalicio: te cobro veinte en vez de veinte. Es lo mismo, pero es descuento.'])] },
    ],
    reward: { money: 200, xp: 110, text: 'Descuento vitalicio (simbólico).' },
  },
  {
    id: 'fight_club', title: 'Club de la lucha', giver: 'mecanico', requires: { chapter: 'pareja' },
    summary: 'El Mecánico organiza peleas por la noche: gana tres combates callejeros.',
    intro: [S(['mecanico', 'chema'], ['mecanico', 'El primer paso es no hablar del club de la lucha. El segundo: gana tres peleas por la ciudad. Es más fácil que arreglar una furgoneta.'])],
    steps: [
      { on: 'win', count: 3, text: 'Gana 3 combates callejeros (contra quien sea).' },
      { on: 'talk', target: 'mecanico', text: 'Habla con el Mecánico.', scenes: [S(['mecanico', 'chema'], ['mecanico', 'Tres victorias. Esto va por mi cuenta: una pieza que no ha ido a nadie.'])] },
    ],
    reward: { money: 350, xp: 170, items: { zapas_runner: 1 }, text: 'Recibes unas zapatillas runner.' },
  },
  {
    id: 'ritual', title: 'El ritual del tambor', giver: 'tamborilero', requires: { quest: ['tambores_q', 'done'] },
    summary: 'El Tamborilero quiere ver si los guerreros siguen el ritmo del campeón.',
    intro: [S(['tamborilero', 'chema'], ['tamborilero', 'El ritmo no basta. Hay que probarlo con los puños. Derrota a Kongui con un tambor sonando en tu cabeza.'])],
    steps: [
      { on: 'win', target: 'kongui', text: 'Derrota a Kongui en un combate callejero.' },
      { on: 'talk', target: 'tamborilero', text: 'Vuelve con el Tamborilero.', scenes: [S(['tamborilero', 'chema'], ['tamborilero', 'Pum, pum, pa. Has vencido al rey con el ritmo. La aldea te canta.'])] },
    ],
    reward: { money: 300, xp: 160, items: { colmillo: 1 }, text: 'Recibes el Colmillo de Kongui.' },
  },
  // ---------------------------------------------------------------- posjuego
  {
    id: 'torre_diez', title: 'Diez pisos', giver: P, requires: { ending: true }, post: true,
    summary: 'Pablo te reta a subir a la Torre: supera cinco pisos de supervivencia.',
    intro: [S([P, 'chema'], [P, 'La Torre Motos tiene diez pisos y diez combates. Nadie ha pasado del quinto. Si llegas al quinto, te pago. Y si llegas al décimo… también.'])],
    steps: [{ on: 'tower', min: 5, text: 'Supera el quinto piso de la Torre (ascensor de la Torre Motos).' }, { on: 'talk', target: P, text: 'Habla con Pablo.', scenes: [S([P, 'chema'], [P, 'Cinco pisos… No me lo creo. Toma: lo que prometí. Casi todo.'])] }],
    reward: { money: 1000, xp: 500, points: 2, text: 'Pablo paga lo prometido (casi).' },
  },
  {
    id: 'sergio_revancha', title: 'Otra vez, Sergio', giver: 'sergio', requires: { chapter: 'final' }, post: true,
    summary: 'Sergio quiere jugar otra vez: derrótale dos veces.',
    intro: [S(['sergio', 'chema'], ['sergio', '¡Quiero jugar otra vez! ¡Contigo! ¡Dos veces! Es muy divertido perder. ¡Quiero ver si gano yo!'])],
    steps: [{ on: 'win', target: 'sergio', count: 2, text: 'Derrota a Sergio dos veces en la calle.' }, { on: 'talk', target: 'sergio', text: 'Habla con Sergio.', scenes: [S(['sergio', 'chema'], ['sergio', '¡Dos veces! ¡Nadie me había perdido dos veces! ¡Eres el mejor! ¡Toma mi capa!'])] }],
    reward: { money: 1200, xp: 600, items: { maletin_pablo: 1 }, text: 'Recibes el Maletín de Pablo (Sergio lo había "tomado prestado").' },
  },
  {
    id: 'leyenda', title: 'Leyenda de la ciudad', giver: P, requires: { flag: 'quests15' }, post: true,
    summary: 'Has hecho tantas misiones que Pablo te quiere dar un título.',
    intro: [S([P, 'chema'], [P, 'Quince misiones. Quince. Ni yo las haría. Te nombro Leyenda de la ciudad: un título con un mural y todo.'])],
    steps: [{ on: 'talk', target: P, text: 'Reclama tu título de Leyenda.', scenes: [S([P, 'chema'], [P, 'Leyenda de El Hoyo City. Te pondré en un mural. Con tu cara. Y mi nombre debajo, más grande.'])] }],
    reward: { money: 2000, xp: 900, points: 3, flags: { leyenda: true }, text: '¡Eres una Leyenda de la ciudad!' },
  },
];

export const QUEST_BY_ID = new Map(QUESTS.map((q) => [q.id, q]));
