/**
 * De dónde sale el mando. Normalmente, del navegador; pero con la pantalla doble (AYN Thor) la ventana de abajo puede
 * tener el foco y entonces nos reenvía su mando por el canal compartido.
 */
export interface PadLike { connected: boolean; buttons: { pressed: boolean; value: number }[]; axes: readonly number[]; id: string }

let remote: { pad: PadLike; at: number } | null = null;
export function setRemotePad(buttons: boolean[], values: number[], axes: number[]) {
  remote = { pad: { connected: true, id: 'remoto', buttons: buttons.map((p, i) => ({ pressed: p, value: values[i] ?? (p ? 1 : 0) })), axes }, at: performance.now() };
}

/** Mando activo: el local si esta ventana tiene el foco (o no hay remoto reciente), si no el reenviado */
export function getPad(): PadLike | null {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  const local = (pads && Array.from(pads).find((p) => p && p.connected)) || null;
  const fresh = remote && performance.now() - remote.at < 400;
  if (fresh && (!local || !document.hasFocus())) return remote!.pad;
  return local as PadLike | null;
}
