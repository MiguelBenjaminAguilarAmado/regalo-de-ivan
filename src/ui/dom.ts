type Child = Node | string | null | undefined | false;
type Props = Record<string, string | number | boolean | ((e: any) => void) | undefined> & { class?: string };

/** Mini helper para crear DOM sin framework. */
export function el<K extends keyof HTMLElementTagNameMap>(tag: K, props: Props = {}, children: Child | Child[] = []): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === false) continue;
    if (k === 'class') e.className = String(v);
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v as EventListener);
    else if (k === 'html') e.innerHTML = String(v);
    else e.setAttribute(k, v === true ? '' : String(v));
  }
  const list = Array.isArray(children) ? children : [children];
  for (const c of list) {
    if (c === null || c === undefined || c === false) continue;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return e;
}

export const clear = (n: Node) => { while (n.firstChild) n.removeChild(n.firstChild); };
