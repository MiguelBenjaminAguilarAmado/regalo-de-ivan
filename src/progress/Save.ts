import type { Difficulty } from '../combat/types';
import type { Quality } from '../arenas/Arena';
import type { StoryProgress } from '../modes/Story';
import type { WorldProgress } from '../modes/World';

export interface Settings {
  quality: 'auto' | Quality;
  master: number;
  music: number;
  sfx: number;
  shake: boolean;
  voice: boolean;
  fps: boolean;
  touch: 'auto' | 'on' | 'off';
  difficulty: Difficulty;
}

export interface SaveData {
  version: 1;
  wins: number;
  losses: number;
  tournaments: Record<Difficulty, number>;
  achievements: Record<string, number>;
  winsBy: Record<string, number>;
  taunts: number;
  settings: Settings;
  /** Último traje elegido por luchador (id del luchador → id del traje) */
  skins?: Record<string, string>;
  /** Torneos ganados por tipo (champion / tag / femboy) */
  tourWins?: Record<string, number>;
  /** Mejor racha del modo Supervivencia */
  survivalBest?: number;
  /** Progreso del modo Historia */
  story?: StoryProgress;
  /** Progreso del mundo abierto (la ciudad de Hoyo) */
  world?: WorldProgress;
}

const KEY = 'el-hoyo-wrestling-v1';

export const defaultSave = (): SaveData => ({
  version: 1, wins: 0, losses: 0,
  tournaments: { facil: 0, intermedia: 0, dificil: 0 },
  achievements: {}, winsBy: {}, taunts: 0,
  settings: { quality: 'auto', master: 0.8, music: 0.6, sfx: 0.9, shake: true, voice: true, fps: false, touch: 'auto', difficulty: 'intermedia' },
});

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    const d = JSON.parse(raw) as Partial<SaveData>;
    const base = defaultSave();
    return { ...base, ...d, settings: { ...base.settings, ...(d.settings ?? {}) }, tournaments: { ...base.tournaments, ...(d.tournaments ?? {}) } } as SaveData;
  } catch { return defaultSave(); }
}

export function writeSave(s: SaveData) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* modo privado */ }
}
