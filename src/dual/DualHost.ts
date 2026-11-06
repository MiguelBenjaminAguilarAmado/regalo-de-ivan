import type { Game } from '../game/Game';
import { openChannel, type DualMsg, type DualState, type DualFighter } from './DualLink';
import { setRemotePad } from '../input/padSource';
import type { Fighter } from '../combat/Match';

/** Lado del juego (pantalla de arriba): publica el estado y obedece a los botones de la pantalla de abajo */
export class DualHost {
  private ch = openChannel();
  private lastPing = -1e9;
  private acc = 0;
  private sentStatic = false;

  constructor(private g: Game) {
    if (!this.ch) return;
    this.ch.onmessage = (e: { data: DualMsg }) => this.onMsg(e.data);
  }

  /** ¿Hay una pantalla de abajo conectada ahora mismo? */
  get connected() { return performance.now() - this.lastPing < 3000; }

  private onMsg(m: DualMsg) {
    if (m.t === 'hello' || m.t === 'ping') {
      const was = this.connected;
      this.lastPing = performance.now();
      if (m.t === 'hello' || !this.sentStatic) this.sendStatic();
      if (!was) this.g.toast('📱 Pantalla de abajo conectada');
      return;
    }
    if (m.t === 'pad') { setRemotePad(m.b, m.v, m.a); return; }
    if (m.t === 'cmd') this.command(m.c, m.i);
  }

  private post(m: DualMsg) { try { this.ch?.postMessage(m); } catch { /* ventana cerrada */ } }

  private sendStatic() {
    const v = this.g.world.view;
    if (!v) { this.sentStatic = false; return; }
    const md = this.g.world.dualMap(false);
    if (!md) return;
    this.post({ t: 'static', map: { worldSize: md.worldSize, districts: md.districts, roads: md.roads } });
    this.sentStatic = true;
  }

  update(dt: number) {
    if (!this.ch) return;
    document.body.classList.toggle('dual-on', this.connected);
    if (!this.connected) return;
    this.acc += dt;
    if (this.acc < 0.15) return;
    this.acc = 0;
    if (!this.sentStatic && this.g.world.active) this.sendStatic();
    this.post({ t: 'state', s: this.state() });
  }

  private fighter(f: Fighter, you: boolean): DualFighter {
    return { name: f.data.name, pfp: f.data.pfp ?? f.data.portrait ?? null, hp: f.hp / f.maxHp, st: f.st / f.maxSt, mom: Math.min(1, f.mom / 100), you };
  }

  private state(): DualState {
    const g = this.g;
    // diálogo en pantalla (historia, ciudad o antes de un combate): se lee del propio DOM
    const dlg = document.querySelector<HTMLElement>('.screen.dialogue');
    if (dlg) {
      const card = dlg.querySelector('.scard b')?.textContent ?? null;
      return {
        mode: 'escena',
        hud: g.world.active ? g.world.dualHud() : undefined,
        dialog: {
          name: dlg.querySelector('.dname')?.textContent ?? '',
          text: dlg.querySelector('.dtext')?.textContent ?? '',
          pfp: dlg.querySelector<HTMLImageElement>('.dport img')?.src ?? null,
          choices: [...dlg.querySelectorAll('.dchoice')].map((c) => c.textContent ?? ''),
          card,
        },
      };
    }
    if (g.world.active) {
      const md = g.world.dualMap(true);
      return { mode: 'mundo', hud: g.world.dualHud(), objective: g.world.dualObjective(), quest: g.world.dualQuest(), prompt: g.world.dualPrompt(), map: md ? { player: md.player, markers: md.markers } : undefined, riding: g.world.view?.riding ? g.world.view.speedKmh : null };
    }
    const b = g.battle;
    if (b && !b.paused) {
      const m = b.match, me = b.opts.spectate ? 0 : 0;
      const you = m.f[me];
      const moves: [string, string][] = [
        ['A', you.light.map((x) => x.name).join(' → ')], ['X', you.heavy.name], ['B', `Agarre: ${you.grabMove.name}`],
        ['LB', 'Guardia (justo antes del golpe = contraataque)'], ['Y', 'Burla (llena el momentum)'], ['RB', `Finisher: ${you.finisher.name}`],
      ];
      return {
        mode: 'combate',
        battle: { a: this.fighter(m.f[0], !b.opts.spectate), b: this.fighter(m.f[1], false), time: m.time, label: b.opts.label ?? '', moves, finisherReady: you.mom >= 100, tag: !!b.opts.pPartner, spectate: !!b.opts.spectate },
      };
    }
    const title = document.querySelector('.screen h2, .screen .rtitle')?.textContent ?? 'Menú';
    return { mode: 'menu', screenTitle: title };
  }

  private command(c: string, i?: number) {
    const g = this.g, w = g.world;
    const click = (sel: string) => document.querySelector<HTMLElement>(sel)?.click();
    switch (c) {
      case 'advance': if (document.querySelector('.scard')) click('.scard'); else click('.screen.dialogue .dbox'); break;
      case 'skip': click('.screen.dialogue .skip'); break;
      case 'choice': { const ch = document.querySelectorAll<HTMLElement>('.dchoice')[i ?? 0]; ch?.click(); break; }
      case 'act': w.ui.handlers.act?.(); break;
      case 'map': w.ui.handlers.map?.(); break;
      case 'quests': w.ui.handlers.quests?.(); break;
      case 'bag': w.ui.handlers.bag?.(); break;
      case 'wardrobe': if (w.active && !w.busy) w.wardrobePanel(); break;
      case 'close': w.ui.closeModal(); break;
      case 'pause': g.togglePause(); break;
      case 'taunt': case 'finisher': case 'tag': g.input.pressRemote(c); break;
      case 'menu': if (!w.active && !g.battle) g.goMenu(); break;
      default: break;
    }
  }
}
