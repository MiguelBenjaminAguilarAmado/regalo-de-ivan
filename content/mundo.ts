/**
 * ============================================================
 *  EL HOYO CITY — datos del mundo abierto
 * ============================================================
 * Distritos, puntos de interés, tienda, civiles, pegatinas y grafitis.
 * Los NPC (luchadores) y sus conversaciones están en content/mundo-npc.ts y las misiones en content/misiones.ts.
 * Las posiciones (`at`) son relativas al centro de su distrito. Si una posición cae dentro de un edificio, el
 * generador la mueve al hueco libre más cercano (y los tests comprueban que todo es alcanzable).
 */
import type { CivilDef, DistrictDef, GraffitiDef, PoiDef, StickerDef } from '../src/world/types';
import type { Item } from '../src/modes/World';

export const WORLD_SIZE = 126;      // medio lado del mundo (m)
export const SEA_Z = 118;           // a partir de aquí (z) hay mar: no se puede pasar
export const SPAWN: [number, number] = [0, 10];

export const DISTRICTS: DistrictDef[] = [
  {
    id: 'plaza', name: 'Plaza del Hoyo', blurb: 'El corazón de la ciudad: la fuente, el estadio de Matamoros, la tienda y el gimnasio.',
    center: [0, 0], size: [64, 64], style: 'plaza', ground: 0x8a8478, palette: [0xcfc3a8, 0xb9a98a, 0xd9cdb4, 0xa89878], buildings: 14, height: [8, 18], freeRadius: 23,
    arena: 'matamoros', music: 'matamoros',
  },
  {
    id: 'viviendas', name: 'Las 3000 Viviendas', blurb: 'Bloques de hormigón, grafitis y un garito donde no hay reglas.',
    center: [-90, -5], size: [56, 64], style: 'blocks', ground: 0x4a4a50, palette: [0x6a6258, 0x58606a, 0x7a6a5a, 0x4e5660, 0x70625c], buildings: 18, height: [14, 40], freeRadius: 8,
    arena: 'garito', music: 'garito',
  },
  {
    id: 'aldea', name: 'Aldea de Kongui', blurb: 'El Reino Kongui: chozas, tambores y una tribu que lo ve todo.',
    center: [88, -72], size: [56, 52], style: 'savanna', ground: 0xa87a44, palette: [0xb98a58, 0xa87a48, 0xc79a62], buildings: 12, height: [3, 5], freeRadius: 8,
    arena: 'tribu', music: 'tribu', unlock: { chapter: 'garito' }, lockText: 'La tribu solo recibe a quien ya ha pisado el garito. (Historia: capítulo 2)',
  },
  {
    id: 'playa', name: 'Playa de Honduras', blurb: 'Arena, olas, un chiringuito tiki y una hoguera.',
    center: [0, 95], size: [100, 44], style: 'beach', ground: 0xd9c690, palette: [0x9a7a3a, 0x7a5a2a], buildings: 5, height: [3, 5], freeRadius: 8,
    arena: 'playa', music: 'playa',
  },
  {
    id: 'manchester', name: 'Barrio Manchester', blurb: 'Teatros, cafés y un monigote azul gigante agitando los brazos.',
    center: [95, 15], size: [56, 60], style: 'theater', ground: 0x5a5a66, palette: [0x8a4a4a, 0x4a5a8a, 0x8a7a4a, 0x6a4a7a, 0x4a7a6a], buildings: 14, height: [10, 26], freeRadius: 8,
    arena: 'manchester', music: 'manchester', unlock: { chapter: 'champion' }, lockText: 'Aún no te dejan entrar al teatro. (Historia: capítulo 3)',
  },
  {
    id: 'industrial', name: 'Polígono Industrial', blurb: 'Naves, chatarra y la fábrica donde se cierra la jaula.',
    center: [-88, 80], size: [56, 44], style: 'industrial', ground: 0x3e3e44, palette: [0x6a6a70, 0x5a4a44, 0x4a5a5a, 0x70706a], buildings: 10, height: [8, 16], freeRadius: 8,
    arena: 'jaula', music: 'jaula', unlock: { chapter: 'pareja' }, lockText: 'El polígono está vallado. (Historia: capítulo 4)',
  },
  {
    id: 'torre', name: 'Torre Motos', blurb: 'La sede de Pablo Motos: moqueta, trofeos y un ascensor de cristal.',
    center: [0, -92], size: [56, 48], style: 'tower', ground: 0x2a2e3a, palette: [0x30384a, 0x3a4458, 0x28303e], buildings: 8, height: [20, 44], freeRadius: 8,
    arena: 'oficina', music: 'oficina', unlock: { chapter: 'gauntlet' }, lockText: 'Seguridad no te deja pasar a la Torre. (Historia: capítulo 7)',
  },
  {
    id: 'santiago', name: 'Estadio de Santiago', blurb: 'Una esquina de Chile en mitad de la ciudad: estadio, empanadas y hinchada.',
    center: [-92, -85], size: [56, 48], style: 'stadium', ground: 0x4a6a44, palette: [0xc1272d, 0xf2f2f2, 0x1c3f8c, 0x8a8a92], buildings: 8, height: [8, 18], freeRadius: 8,
    arena: 'santiago', music: 'santiago', unlock: { chapter: 'azotea' }, lockText: 'El tren a Santiago aún no pasa por aquí. (Historia: capítulo 6)',
  },
];

export const POIS: PoiDef[] = [
  // ------------------------------------------------------------------ plaza
  { id: 'matamoros', district: 'plaza', at: [0, -17], kind: 'arena', name: 'Estadio de Matamoros', prompt: 'Entrar al estadio (torneos y combates)', solid: { w: 28, d: 14, h: 13, color: 0x9a8a6a, sign: 'MATAMOROS' } },
  { id: 'tienda', district: 'plaza', at: [-18, 4], kind: 'shop', name: 'Merch Hoyo', prompt: 'Entrar en la tienda', solid: { w: 11, d: 7, h: 6, color: 0xc1272d, side: 'w', sign: 'MERCH' }, sells: ['cinturon_lona', 'cinturon_cuero', 'cinturon_oro', 'cinturon_hoyo', 'zapas_baratas', 'zapas_runner', 'botas_lucha', 'botas_rayo', 'amuleto_pata', 'silla_miniatura', 'colmillo', 'corona_carton', 'maletin_pablo', 'bebida', 'cafe', 'pegatina_suerte'] },
  { id: 'gimnasio', district: 'plaza', at: [18, 4], kind: 'gym', name: 'Gimnasio El Puñetazo', prompt: 'Entrenar', solid: { w: 11, d: 7, h: 6, color: 0x2a5a8a, side: 'e', sign: 'EL PUÑETAZO' } },
  { id: 'casa', district: 'plaza', at: [-13, 15], kind: 'home', name: 'Tu piso', prompt: 'Descansar en casa', solid: { w: 8, d: 6, h: 7, color: 0x8a6a4a, side: 's' } },
  { id: 'taxi_plaza', district: 'plaza', at: [18, -11], kind: 'taxi', name: 'Parada de taxis', prompt: 'Viajar a otro distrito', solid: { w: 3, d: 2, h: 3, color: 0xe8c42a, side: 'e' } },
  { id: 'tablon', district: 'plaza', at: [-9, -11], kind: 'board', name: 'Tablón de misiones', prompt: 'Leer el tablón', solid: { w: 4, d: 1, h: 3, color: 0x6a4a2a } },
  { id: 'fuente', district: 'plaza', at: [0, 0], kind: 'fountain', name: 'Fuente del Hoyo', prompt: 'Mirar la fuente', radius: 3.6 },
  { id: 'story_fichaje', district: 'plaza', at: [0, -11], kind: 'story', name: 'Pablo Motos te espera', prompt: 'Empezar capítulo', chapter: 'fichaje' },
  { id: 'story_champion', district: 'plaza', at: [8, -13], kind: 'story', name: 'Cartel del Hoyo Champion', prompt: 'Empezar capítulo', chapter: 'champion' },
  // ------------------------------------------------------------------ viviendas
  { id: 'garito', district: 'viviendas', at: [-6, 5], kind: 'garito', name: 'El Garito de las 3000', prompt: 'Bajar al garito (apuestas)', solid: { w: 9, d: 6, h: 5, color: 0x2a2020, sign: 'GARITO' }, cond: { night: true } },
  { id: 'garito_diurno', district: 'viviendas', at: [-6, 5], kind: 'landmark', name: 'Persiana del garito', prompt: 'La persiana está bajada: abre de noche', solid: { w: 9, d: 6, h: 5, color: 0x2a2020, sign: 'GARITO' }, cond: { night: false } },
  { id: 'bar_pulso', district: 'viviendas', at: [-20, 12], kind: 'minigame', minigame: 'pulso', name: 'Bar El Bajo', prompt: 'Echar un pulso', solid: { w: 9, d: 6, h: 5, color: 0x5a3a2a, side: 'w', sign: 'EL BAJO' } },
  { id: 'macs', district: 'viviendas', at: [14, 14], kind: 'minigame', minigame: 'comilona', name: "Hamburguesería Mac's", prompt: 'Concurso de hamburguesas', solid: { w: 10, d: 6, h: 5, color: 0xe8b42a, side: 'e', sign: "MAC'S" } },
  { id: 'story_garito', district: 'viviendas', at: [-4, -4], kind: 'story', name: 'Petisui te espera en el garito', prompt: 'Empezar capítulo', chapter: 'garito' },
  { id: 'story_azotea', district: 'viviendas', at: [20, -14], kind: 'story', name: 'Escaleras de la azotea', prompt: 'Empezar capítulo', chapter: 'azotea' },
  { id: 'taxi_viviendas', district: 'viviendas', at: [4, 18], kind: 'taxi', name: 'Parada de taxis', prompt: 'Viajar a otro distrito', solid: { w: 3, d: 2, h: 3, color: 0xe8c42a, side: 's' } },
  // ------------------------------------------------------------------ aldea
  { id: 'tambores', district: 'aldea', at: [0, 0], kind: 'minigame', minigame: 'tambores', name: 'Círculo de tambores', prompt: 'Tocar los tambores', radius: 2.6 },
  { id: 'choza_jefe', district: 'aldea', at: [-12, -8], kind: 'vendor', name: 'Choza del curandero', prompt: 'Comprar remedios', solid: { w: 7, d: 7, h: 4, color: 0xa87a48 }, sells: ['bocata', 'chuleton', 'bebida'] },
  { id: 'taxi_aldea', district: 'aldea', at: [-4, 18], kind: 'taxi', name: 'Camioneta del pueblo', prompt: 'Viajar a otro distrito', solid: { w: 3, d: 2, h: 3, color: 0x8a6a3a, side: 's' } },
  // ------------------------------------------------------------------ playa
  { id: 'pesca', district: 'playa', at: [12, 17], kind: 'minigame', minigame: 'pesca', name: 'Muelle de pesca', prompt: 'Pescar', radius: 2.4 },
  { id: 'tiki', district: 'playa', at: [-24, -2], kind: 'vendor', name: 'Chiringuito Tiki', prompt: 'Pedir algo al chiringuito', solid: { w: 10, d: 6, h: 5, color: 0x9a7a3a, side: 'w', sign: 'TIKI' }, sells: ['bebida', 'cafe', 'bocata', 'chuleton'] },
  { id: 'hoguera', district: 'playa', at: [-4, 2], kind: 'heal', name: 'Hoguera de la playa', prompt: 'Sentarte junto al fuego (recuperas 1 h)', radius: 2.4, heal: { cost: 0, minutes: 60, text: 'Descansas junto al fuego y escuchas el mar. Todo parece más fácil.' } },
  { id: 'taxi_playa', district: 'playa', at: [34, -4], kind: 'taxi', name: 'Parada de taxis', prompt: 'Viajar a otro distrito', solid: { w: 3, d: 2, h: 3, color: 0xe8c42a, side: 'e' } },
  // ------------------------------------------------------------------ manchester
  { id: 'teatro', district: 'manchester', at: [0, -14], kind: 'landmark', name: 'Teatro de Manchester', prompt: 'Admirar el teatro', solid: { w: 22, d: 12, h: 13, color: 0x7a3a3a, sign: 'MANCHESTER' } },
  { id: 'cafe', district: 'manchester', at: [14, 6], kind: 'vendor', name: 'Café Manchester', prompt: 'Tomar algo', solid: { w: 9, d: 6, h: 5, color: 0x5a3a2a, side: 'e', sign: 'CAFÉ' }, sells: ['cafe', 'bocata', 'chuleton'] },
  { id: 'monigote', district: 'manchester', at: [-14, 10], kind: 'photo', name: 'El monigote azul gigante', prompt: 'Hacerte una foto con el monigote', radius: 2.4 },
  { id: 'story_pareja', district: 'manchester', at: [-4, 2], kind: 'story', name: 'Pablo anuncia el Hoyo Tag Champion', prompt: 'Empezar capítulo', chapter: 'pareja' },
  { id: 'taxi_manchester', district: 'manchester', at: [-18, -6], kind: 'taxi', name: 'Parada de taxis', prompt: 'Viajar a otro distrito', solid: { w: 3, d: 2, h: 3, color: 0xe8c42a, side: 'w' } },
  // ------------------------------------------------------------------ industrial
  { id: 'fabrica', district: 'industrial', at: [0, -9], kind: 'landmark', name: 'Fábrica de la Jaula', prompt: 'Una puerta de acero enorme', solid: { w: 22, d: 12, h: 12, color: 0x5a5a62, sign: 'LA JAULA' } },
  { id: 'story_yosuke', district: 'industrial', at: [0, -2], kind: 'story', name: 'Yosuke te espera en la fábrica', prompt: 'Empezar capítulo', chapter: 'yosuke' },
  { id: 'chatarreria', district: 'industrial', at: [14, 8], kind: 'vendor', name: 'Chatarrería del Mecánico', prompt: 'Mirar las piezas', solid: { w: 9, d: 6, h: 5, color: 0x6a4a3a, side: 'e' }, sells: ['pegatina_suerte', 'amuleto_pata'] },
  { id: 'taxi_industrial', district: 'industrial', at: [-18, 14], kind: 'taxi', name: 'Parada de taxis', prompt: 'Viajar a otro distrito', solid: { w: 3, d: 2, h: 3, color: 0xe8c42a, side: 'w' } },
  // ------------------------------------------------------------------ torre
  { id: 'torre_lobby', district: 'torre', at: [0, -4], kind: 'tower', name: 'Ascensor de la Torre', prompt: 'Subir a la Torre (supervivencia de 10 pisos)', solid: { w: 24, d: 14, h: 38, color: 0x30384a, sign: 'TORRE MOTOS' }, cond: { ending: true } },
  { id: 'torre_cerrada', district: 'torre', at: [0, -4], kind: 'landmark', name: 'Torre Motos', prompt: 'El ascensor está en mantenimiento hasta que acabe la temporada', solid: { w: 24, d: 14, h: 38, color: 0x30384a, sign: 'TORRE MOTOS' }, cond: { ending: false } },
  { id: 'story_oficina', district: 'torre', at: [-10, 8], kind: 'story', name: 'El despacho de Pablo Motos', prompt: 'Empezar capítulo', chapter: 'oficina' },
  { id: 'story_final', district: 'torre', at: [10, 8], kind: 'story', name: 'El ascensor de cristal', prompt: 'Empezar capítulo', chapter: 'final' },
  { id: 'taxi_torre', district: 'torre', at: [0, 18], kind: 'taxi', name: 'Parada de taxis', prompt: 'Viajar a otro distrito', solid: { w: 3, d: 2, h: 3, color: 0xe8c42a, side: 's' } },
  // ------------------------------------------------------------------ santiago
  { id: 'estadio', district: 'santiago', at: [0, -9], kind: 'landmark', name: 'Estadio de Santiago', prompt: 'Las puertas del estadio', solid: { w: 28, d: 14, h: 14, color: 0x8a8a92, sign: 'SANTIAGO' } },
  { id: 'story_gauntlet', district: 'santiago', at: [0, 0], kind: 'story', name: 'El Gauntlet de Santiago', prompt: 'Empezar capítulo', chapter: 'gauntlet' },
  { id: 'empanadas', district: 'santiago', at: [14, 8], kind: 'vendor', name: 'Puesto de empanadas', prompt: 'Comprar empanadas', solid: { w: 6, d: 4, h: 4, color: 0xc1272d, side: 'e' }, sells: ['empanada', 'bebida'] },
  { id: 'taxi_santiago', district: 'santiago', at: [-18, 12], kind: 'taxi', name: 'Estación de Santiago', prompt: 'Viajar a otro distrito', solid: { w: 3, d: 2, h: 3, color: 0xe8c42a, side: 'w' } },
];

export const STICKERS: StickerDef[] = [
  { id: 's_plaza1', district: 'plaza', at: [-6, -4], hint: 'Cerca de la fuente' },
  { id: 's_plaza2', district: 'plaza', at: [10, 15], hint: 'Detrás de un banco' },
  { id: 's_plaza3', district: 'plaza', at: [-22, -14], hint: 'Junto al tablón' },
  { id: 's_plaza4', district: 'plaza', at: [24, -2], hint: 'En el lateral del gimnasio' },
  { id: 's_viv1', district: 'viviendas', at: [-22, -20], hint: 'Entre dos bloques' },
  { id: 's_viv2', district: 'viviendas', at: [22, 4], hint: 'Cerca de las escaleras' },
  { id: 's_viv3', district: 'viviendas', at: [-10, 22], hint: 'Detrás del bar' },
  { id: 's_viv4', district: 'viviendas', at: [8, -22], hint: 'En la esquina del bloque más alto' },
  { id: 's_viv5', district: 'viviendas', at: [-2, 14], hint: 'Solo se ve de noche', cond: { night: true } },
  { id: 's_ald1', district: 'aldea', at: [14, 6], hint: 'Junto a una choza' },
  { id: 's_ald2', district: 'aldea', at: [-16, 12], hint: 'Entre las hogueras' },
  { id: 's_ald3', district: 'aldea', at: [8, -16], hint: 'Bajo el baobab' },
  { id: 's_pla1', district: 'playa', at: [-30, 10], hint: 'Entre las palmeras' },
  { id: 's_pla2', district: 'playa', at: [24, 4], hint: 'Medio enterrada en la arena' },
  { id: 's_pla3', district: 'playa', at: [-10, 16], hint: 'Cerca de la orilla' },
  { id: 's_pla4', district: 'playa', at: [38, 12], hint: 'En el extremo de la playa' },
  { id: 's_pla5', district: 'playa', at: [2, -8], hint: 'Solo se ve de noche, a la luz de la hoguera', cond: { night: true } },
  { id: 's_man1', district: 'manchester', at: [-10, -2], hint: 'Junto al teatro' },
  { id: 's_man2', district: 'manchester', at: [8, 18], hint: 'Detrás del café' },
  { id: 's_man3', district: 'manchester', at: [18, -14], hint: 'En una esquina del barrio' },
  { id: 's_man4', district: 'manchester', at: [-20, 18], hint: 'Cerca del monigote' },
  { id: 's_ind1', district: 'industrial', at: [-14, 0], hint: 'Entre las naves' },
  { id: 's_ind2', district: 'industrial', at: [18, -6], hint: 'Detrás de un contenedor' },
  { id: 's_ind3', district: 'industrial', at: [4, 14], hint: 'En la chatarrería' },
  { id: 's_ind4', district: 'industrial', at: [-20, -12], hint: 'Sobre un barril' },
  { id: 's_tor1', district: 'torre', at: [-14, 0], hint: 'En el jardín de la Torre' },
  { id: 's_tor2', district: 'torre', at: [14, 0], hint: 'En el jardín de la Torre' },
  { id: 's_san1', district: 'santiago', at: [-10, 0], hint: 'Cerca de la hinchada' },
  { id: 's_san2', district: 'santiago', at: [10, -2], hint: 'Junto a las banderas' },
  { id: 's_san3', district: 'santiago', at: [-20, 4], hint: 'Cerca de la estación' },
];

export const GRAFFITI: GraffitiDef[] = [
  { id: 'g_viv1', district: 'viviendas', at: [-10, -10], name: '«3000 FOREVER»', blurb: 'Un grafiti enorme con las cifras en rojo y una corona dorada.' },
  { id: 'g_viv2', district: 'viviendas', at: [12, 2], name: '«PETI-JUDÍO NO»', blurb: 'Tachado con rabia. Debajo, otro: «PETI-JUDÍO SÍ».' },
  { id: 'g_viv3', district: 'viviendas', at: [-4, 24], name: '«RIP BIG MAC (mentira)»', blurb: 'Alguien ha dibujado una hamburguesa llorando.' },
  { id: 'g_viv4', district: 'viviendas', at: [18, -22], name: '«EL HOYO ES NUESTRO»', blurb: 'Pintado con letras de metro y medio.' },
  { id: 'g_plz1', district: 'plaza', at: [-4, 18], name: '«PABLO PAGA (A VECES)»', blurb: 'Un clásico de la plaza.' },
  { id: 'g_ind1', district: 'industrial', at: [-8, 6], name: '«SIN SALIDA»', blurb: 'La jaula dibujada con spray, con un luchador dentro.' },
  { id: 'g_ind2', district: 'industrial', at: [12, -14], name: '«LA JAULA TE ESPERA»', blurb: 'Y una flecha que apunta a la fábrica.' },
  { id: 'g_man1', district: 'manchester', at: [-6, 14], name: '«KENT 1 — PETISUI 0»', blurb: 'Alguien no ha aceptado el resultado.' },
  { id: 'g_pla1', district: 'playa', at: [20, -6], name: '«ELSO ES EL MEJOR»', blurb: 'Escrito en la arena. La marea lo está borrando.' },
  { id: 'g_san1', district: 'santiago', at: [-4, 14], name: '«CHI-CHI-CHI, LE-LE-LE»', blurb: 'Tres colores y una estrella.' },
];

// ---------------------------------------------------------------------- tienda
export const ITEMS: Item[] = [
  { id: 'cinturon_lona', name: 'Cinturón de lona', desc: '+3 % de daño.', price: 80, kind: 'belt', bonus: { power: 1.03 } },
  { id: 'cinturon_cuero', name: 'Cinturón de cuero', desc: '+6 % de daño y +4 % de resistencia.', price: 250, kind: 'belt', bonus: { power: 1.06, stamina: 1.04 }, level: 4 },
  { id: 'cinturon_oro', name: 'Cinturón dorado', desc: '+10 % de daño y +5 % de vida.', price: 700, kind: 'belt', bonus: { power: 1.1, health: 1.05 }, level: 10 },
  { id: 'cinturon_hoyo', name: 'Cinturón del Hoyo', desc: '+12 % de daño, +5 % de vida y +5 % de rapidez.', price: 1500, kind: 'belt', bonus: { power: 1.12, health: 1.05, tempo: 1.05 }, level: 16 },
  { id: 'zapas_baratas', name: 'Zapatillas del mercadillo', desc: '+3 % de velocidad.', price: 70, kind: 'shoes', bonus: { speed: 1.03 } },
  { id: 'zapas_runner', name: 'Zapatillas runner', desc: '+6 % de velocidad.', price: 240, kind: 'shoes', bonus: { speed: 1.06 }, level: 4 },
  { id: 'botas_lucha', name: 'Botas de lucha', desc: '+6 % de velocidad y +10 % para zafarte.', price: 650, kind: 'shoes', bonus: { speed: 1.06, escape: 1.1 }, level: 9 },
  { id: 'botas_rayo', name: 'Botas Rayo', desc: '+10 % de velocidad y +6 % de rapidez.', price: 1400, kind: 'shoes', bonus: { speed: 1.1, tempo: 1.06 }, level: 15 },
  { id: 'amuleto_pata', name: 'Pata de conejo', desc: 'Recibes un 3 % menos de daño.', price: 90, kind: 'charm', bonus: { resist: 0.97 } },
  { id: 'silla_miniatura', name: 'Silla del Hoyo en miniatura', desc: '+3 % de daño y empiezas con 8 de momentum.', price: 220, kind: 'charm', bonus: { power: 1.03, startMom: 8 } },
  { id: 'colmillo', name: 'Colmillo de Kongui', desc: '6 % menos de daño recibido y +4 % de vida.', price: 500, kind: 'charm', bonus: { resist: 0.94, health: 1.04 }, level: 8 },
  { id: 'corona_carton', name: 'Corona de cartón', desc: 'Empiezas con 20 de momentum y +4 % de daño.', price: 800, kind: 'charm', bonus: { startMom: 20, power: 1.04 }, level: 12 },
  { id: 'maletin_pablo', name: 'Maletín de Pablo', desc: '7 % menos de daño recibido, +12 de momentum y +6 % de resistencia.', price: 1800, kind: 'charm', bonus: { resist: 0.93, startMom: 12, stamina: 1.06 }, level: 18 },
  { id: 'bebida', name: 'Bebida energética', desc: 'Próximo combate: empiezas con +25 de momentum.', price: 40, kind: 'boost', fight: { mom: 25 } },
  { id: 'cafe', name: 'Café doble', desc: 'Próximo combate: empiezas con +40 de momentum.', price: 70, kind: 'boost', fight: { mom: 40 } },
  { id: 'pegatina_suerte', name: 'Pegatina de la suerte', desc: 'Próximo combate: +10 % de daño.', price: 90, kind: 'boost', fight: { power: 10 } },
  { id: 'bocata', name: 'Bocata de calamares', desc: 'Próximo combate: +15 % de vida máxima.', price: 55, kind: 'food', fight: { hp: 15 } },
  { id: 'chuleton', name: 'Chuletón', desc: 'Próximo combate: +30 % de vida máxima.', price: 130, kind: 'food', fight: { hp: 30 } },
  { id: 'empanada', name: 'Empanada chilena', desc: 'Próximo combate: +20 % de vida y +10 de momentum.', price: 60, kind: 'food', fight: { hp: 20, mom: 10 } },
  { id: 'pescado', name: 'Pescado fresco', desc: 'Próximo combate: +18 % de vida máxima. (Solo se pesca.)', price: 0, kind: 'food', fight: { hp: 18 } },
];

// ---------------------------------------------------------------------- civiles
const civ = (id: string, name: string, blurb: string, a: Partial<CivilDef['appearance']> = {}): CivilDef => ({
  id, name, blurb,
  appearance: { skin: 0xd2996f, hair: 0x2a1810, outfit: 'camiseta', outfitColor: 0x4a6a8a, trunksColor: 0x1a1a22, accent: 0xf2c14e, build: 1.0, height: 1.0, ...a },
});

export const CIVILS: CivilDef[] = [
  civ('coach', 'Míster Puñetazo', 'El entrenador del gimnasio. Calvo, ancho y siempre con un silbato.', { skin: 0xb97d56, hair: null, outfitColor: 0xc1272d, build: 1.15 }),
  civ('merchero', 'El Merchero', 'Vende todo lo que lleva la marca del Hoyo. Todo.', { hat: { kind: 'gorra', color: 0xc1272d }, outfitColor: 0xe8b42a, skin: 0xc79a78 }),
  civ('taxista', 'El Taxista', 'Conoce cada calle del Hoyo City y todos los chismes.', { hat: { kind: 'gorra', color: 0xe8c42a }, outfitColor: 0xf2f2f2, skin: 0xb98062, beard: 0x2a2a2a }),
  civ('pescador', 'El Pescador', 'Lleva treinta años en el muelle y diez pescados.', { hat: { kind: 'sombrero', color: 0xd8b45a }, outfitColor: 0x2a8a8a, skin: 0xa8734f, beard: 0xdddddd }),
  civ('barman', 'La Barman del Tiki', 'Prepara cócteles con sombrillitas y paga la cuenta de los que se duermen.', { hair: 0x14100c, hairStyle: 'larga', outfitColor: 0x1a1a22, accent: 0xff6a8a, skin: 0xc08a68 }),
  civ('tamborilero', 'El Tamborilero', 'Toca los tambores desde antes de que existiera el Hoyo.', { skin: 0x5a3622, hair: null, outfit: 'desnudo', trunksColor: 0x8a5a24, accent: 0xd8b25a, wraps: 0x8a5a24, build: 1.05 }),
  civ('abuela', 'La Abuela de la ventana', 'Lo ve todo desde su balcón y lo cuenta todo desde su balcón.', { hair: 0xdcdcdc, outfit: 'abrigo', outfitColor: 0x6a3a7a, build: 0.92, height: 0.93, skin: 0xd8a888 }),
  civ('nino', 'El Niño de la pelota', 'Tiene nueve años y colecciona todo lo coleccionable.', { height: 0.78, build: 0.85, outfitColor: 0x2d9a5a, hair: 0x4a2a14 }),
  civ('arbitro_civ', 'El Árbitro Jubilado', 'Pitó el primer combate del Hoyo y aún no ha cobrado.', { outfit: 'arbitro', outfitColor: 0x0d0d10, trunksColor: 0x0d0d10, accent: 0xffffff }),
  civ('mecanico', 'El Mecánico', 'Arregla cualquier cosa, menos tus problemas.', { hat: { kind: 'gorra', color: 0x2a3a6a }, outfitColor: 0x2a4a8a, glasses: true, skin: 0xc79a78 }),
  civ('camarero', 'El Camarero del Teatro', 'Elegante, discreto y con una bandeja que nunca se cae.', { outfit: 'traje', outfitColor: 0x14141a, trunksColor: 0x14141a, accent: 0xc1272d, hair: 0x14100c }),
  civ('recepcionista', 'La Recepcionista de la Torre', 'Sonríe por contrato. Es de lo poco que Pablo cumple.', { outfit: 'blazer', outfitColor: 0xf2f2f2, trunksColor: 0xf2f2f2, hairStyle: 'larga', hair: 0x2a1810, accent: 0xd8b43a }),
  civ('hincha', 'El Hincha chileno', 'Lleva la camiseta de la Roja y un bombo que no se calla.', { hat: { kind: 'gorra', color: 0x1c3f8c }, outfitColor: 0xc1272d, skin: 0xd2a07a }),
  civ('vendedor', 'El Vendedor de empanadas', 'Sus empanadas curan casi todo. Casi.', { hat: { kind: 'gorra', color: 0xf2f2f2 }, outfitColor: 0xf2f2f2, skin: 0xc79a78, beard: 0x3a2a1a }),
  civ('guardia', 'El Guardia de seguridad', 'Gafas de sol de noche y cara de pocos amigos.', { outfit: 'traje', outfitColor: 0x101014, trunksColor: 0x101014, glasses: 'sol', hair: null, skin: 0xb98062, build: 1.12 }),
];
