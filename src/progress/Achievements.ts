import type { Difficulty, FighterData } from '../combat/types';
import type { MatchSummary } from '../combat/Match';
import type { SaveData } from './Save';

export interface AchievementDef { id: string; name: string; desc: string }

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'primera_sangre', name: 'Primera sangre', desc: 'Gana tu primer combate.' },
  { id: 'cinco', name: 'Racha del Hoyo', desc: 'Gana 5 combates en total.' },
  { id: 'diez', name: 'Veterano de la casa', desc: 'Gana 10 combates en total.' },
  { id: 'torneo', name: 'Campeón del Hoyo', desc: 'Gana un torneo.' },
  { id: 'torneo_dificil', name: 'Sin piedad', desc: 'Gana un torneo en dificultad Difícil.' },
  { id: 'rendicion', name: 'Sumisión total', desc: 'Gana un combate por rendición.' },
  { id: 'pin', name: 'Uno, dos, tres', desc: 'Gana un combate por pin.' },
  { id: 'ko', name: 'Noche de KO', desc: 'Gana un combate por KO.' },
  { id: 'fuera', name: 'Fuera de aquí', desc: 'Gana por cuenta fuera del ring.' },
  { id: 'finisher', name: 'Remate de cine', desc: 'Gana un combate habiendo conectado tu finisher.' },
  { id: 'remontada', name: 'Remontada épica', desc: 'Gana con menos del 10 % de vida.' },
  { id: 'impecable', name: 'Impecable', desc: 'Gana habiendo recibido menos del 20 % de tu vida en daño.' },
  { id: 'burlon', name: 'El burlón', desc: 'Haz 10 burlas en total.' },
  { id: 'despedido', name: 'Estás despedido', desc: 'Gana con "La hora de Pablo Motos".' },
  { id: 'historia', name: 'Leyenda del Hoyo', desc: 'Completa el modo Historia.' },
  { id: 'cap3', name: 'Hoyo Champion', desc: 'Historia: gana el torneo del Hoyo Champion.' },
  { id: 'cap4', name: 'Justicia a medias', desc: 'Historia: gana el combate por parejas contra Big Boom y Big Justice.' },
  { id: 'cap5', name: 'Rompe la jaula', desc: 'Historia: derrota a Yosuke en la jaula de acero.' },
  { id: 'cap7', name: 'Superviviente de Santiago', desc: 'Historia: sobrevive al Gauntlet de Santiago.' },
  { id: 'final_leal', name: 'Final: Campeón leal', desc: 'Historia: termina siendo el favorito de Pablo Motos.' },
  { id: 'final_rebelde', name: 'Final: El rebelde', desc: 'Historia: planta cara a Pablo Motos y se lo cuenta a todos.' },
  { id: 'final_dueno', name: 'Final: Dueño del Hoyo', desc: 'Historia: te quedas con la empresa.' },
  { id: 'w_pelea', name: 'Peleón callejero', desc: 'Mundo abierto: gana tu primer combate callejero.' },
  { id: 'w_pelea25', name: 'Rey de la calle', desc: 'Mundo abierto: gana 25 combates callejeros.' },
  { id: 'w_nivel10', name: 'Nivel 10', desc: 'Mundo abierto: llega al nivel 10.' },
  { id: 'w_nivel25', name: 'Nivel máximo', desc: 'Mundo abierto: llega al nivel 25.' },
  { id: 'w_quest10', name: 'Manitas del barrio', desc: 'Mundo abierto: completa 10 misiones.' },
  { id: 'w_quest24', name: 'Todas las misiones', desc: 'Mundo abierto: completa las 24 misiones.' },
  { id: 'w_stickers', name: 'Álbum completo', desc: 'Mundo abierto: encuentra las 30 pegatinas del Hoyo.' },
  { id: 'w_cartas', name: 'Coleccionista de cartas', desc: 'Mundo abierto: consigue las 14 cartas de luchador.' },
  { id: 'w_distritos', name: 'Turista del Hoyo', desc: 'Mundo abierto: visita los 8 distritos.' },
  { id: 'w_apuestas', name: 'Rey del garito', desc: 'Mundo abierto: gana 5 apuestas.' },
  { id: 'w_torre', name: 'La Torre, completa', desc: 'Mundo abierto: supera los 10 pisos de la Torre Motos.' },
  { id: 'w_leyenda', name: 'Leyenda de la ciudad', desc: 'Mundo abierto: consigue el título de Leyenda.' },
  { id: 'w_rico', name: 'Hoyo en la cuenta', desc: 'Mundo abierto: llega a tener 5.000 Hoyos.' },
  { id: 'w_gym', name: 'Atleta perfecto', desc: 'Mundo abierto: sube los 5 atributos del gimnasio al máximo.' },
  { id: 'racha5', name: 'Superviviente', desc: 'Encadena 5 victorias en Supervivencia.' },
  { id: 'racha10', name: 'Inmortal del Hoyo', desc: 'Encadena 10 victorias en Supervivencia.' },
];

export interface MatchCtx {
  summary: MatchSummary;
  player: number; // índice del jugador en el combate
  playerData: FighterData;
  mode: 'versus' | 'torneo' | 'espectador' | 'supervivencia' | 'historia' | 'mundo';
  difficulty: Difficulty;
  tournamentWon?: boolean;
}

/** Aplica el resultado a la partida guardada y devuelve los logros nuevos. */
export function applyResult(save: SaveData, c: MatchCtx): string[] {
  const s = c.summary;
  const won = s.winner === c.player;
  const got: string[] = [];
  const give = (id: string) => { if (!save.achievements[id]) { save.achievements[id] = Date.now(); got.push(id); } };
  save.taunts += s.taunts[c.player] ?? 0;
  if (won) {
    save.wins++;
    save.winsBy[c.playerData.id] = (save.winsBy[c.playerData.id] ?? 0) + 1;
    give('primera_sangre');
    if (save.wins >= 5) give('cinco');
    if (save.wins >= 10) give('diez');
    if (s.reason === 'rendicion') give('rendicion');
    if (s.reason === 'pin') give('pin');
    if (s.reason === 'ko') give('ko');
    if (s.reason === 'fuera') give('fuera');
    if (s.finishersLanded[c.player] > 0) give('finisher');
    if (s.hpPct[c.player] < 0.1) give('remontada');
    const maxHp = c.playerData.fullStats.health;
    if (s.damageTaken[c.player] < maxHp * 0.2) give('impecable');
    if (s.fired && c.playerData.id === 'pablo motos') give('despedido');
  } else save.losses++;
  if (save.taunts >= 10) give('burlon');
  if (c.tournamentWon) {
    save.tournaments[c.difficulty]++;
    give('torneo');
    if (c.difficulty === 'dificil') give('torneo_dificil');
  }
  return got;
}

/** Logros por racha de Supervivencia */
export function applyStreak(save: SaveData, wins: number): string[] {
  const got: string[] = [];
  for (const [n, id] of [[5, 'racha5'], [10, 'racha10']] as const) if (wins >= n && !save.achievements[id]) { save.achievements[id] = Date.now(); got.push(id); }
  return got;
}

export function isUnlocked(save: SaveData, f: FighterData): boolean {
  const u = f.unlock;
  if (!u) return true;
  if (u.wins != null && save.wins >= u.wins) return true;
  if (u.achievement && save.achievements[u.achievement]) return true;
  return false;
}
