/**
 * ===== Pantalla doble (AYN Thor y similares) =====
 * El juego va en la pantalla de arriba y una segunda ventana del MISMO navegador (…/?pantalla=abajo) va en la de abajo.
 * Se hablan por un BroadcastChannel: arriba manda el estado ~6 veces por segundo; abajo manda órdenes (botones
 * táctiles) y, si tiene el foco, el estado del mando para que el juego no deje de responder.
 */
import type { MapData } from '../ui/WorldUI';

export const CHANNEL = 'el-hoyo-dual';

export type DualMode = 'menu' | 'mundo' | 'combate' | 'escena';

export interface DualFighter { name: string; pfp: string | null; hp: number; st: number; mom: number; you: boolean }
export interface DualState {
  mode: DualMode;
  hud?: { level: number; money: number; clock: string; day: number; night: boolean; district: string; points: number; xp: number; xpNeed: number };
  objective?: { title: string; text: string } | null;
  quest?: { title: string; step: string } | null;
  prompt?: string | null;
  map?: Pick<MapData, 'player' | 'markers'>;
  riding?: number | null;
  battle?: { a: DualFighter; b: DualFighter; time: number; label: string; moves: [string, string][]; finisherReady: boolean; tag: boolean; spectate: boolean };
  dialog?: { name: string; text: string; pfp: string | null; choices: string[]; card: string | null };
  screenTitle?: string;
}

export type DualMsg =
  | { t: 'hello' }
  | { t: 'ping'; from: 'abajo' | 'arriba' }
  | { t: 'static'; map: Pick<MapData, 'worldSize' | 'districts' | 'roads'> }
  | { t: 'state'; s: DualState }
  | { t: 'cmd'; c: string; i?: number }
  | { t: 'pad'; b: boolean[]; v: number[]; a: number[] };

export function openChannel(): BroadcastChannel | null {
  try { return new BroadcastChannel(CHANNEL); } catch { return null; }
}

/** Abre la ventana de abajo: en la otra pantalla si el navegador sabe colocarla, si no en una ventana/pestaña nueva */
export async function openCompanion(): Promise<'otra-pantalla' | 'ventana' | 'bloqueada'> {
  const url = location.pathname + '?pantalla=abajo';
  try {
    const w = window as unknown as { getScreenDetails?: () => Promise<{ screens: { availLeft: number; availTop: number; availWidth: number; availHeight: number }[]; currentScreen: unknown }> };
    if (w.getScreenDetails) {
      const d = await w.getScreenDetails();
      const other = d.screens.find((s) => s !== d.currentScreen);
      if (other) {
        const win = window.open(url, 'hoyo-abajo', `popup,left=${other.availLeft},top=${other.availTop},width=${other.availWidth},height=${other.availHeight}`);
        if (win) return 'otra-pantalla';
      }
    }
  } catch { /* sin permiso de pantallas: ventana normal */ }
  const win = window.open(url, 'hoyo-abajo');
  return win ? 'ventana' : 'bloqueada';
}
