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
];

export interface MatchCtx {
  summary: MatchSummary;
  player: number; // índice del jugador en el combate
  playerData: FighterData;
  mode: 'versus' | 'torneo' | 'espectador';
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

export function isUnlocked(save: SaveData, f: FighterData): boolean {
  const u = f.unlock;
  if (!u) return true;
  if (u.wins != null && save.wins >= u.wins) return true;
  if (u.achievement && save.achievements[u.achievement]) return true;
  return false;
}
