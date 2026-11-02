import * as THREE from 'three';
import type { Match } from '../combat/Match';
import type { GameEvent } from '../combat/types';
import { FighterModel } from '../fighters/FighterModel';
import { Animator } from '../fighters/Pose';
import { Fx } from '../render/Fx';
import { CameraRig } from '../render/CameraRig';
import type { Arena } from '../arenas/Arena';
import type { Stage } from '../render/Stage';
import { Audio } from '../audio/Audio';
import { Manchester } from '../arenas/Manchester';
import { Matamoros } from '../arenas/Matamoros';
import { Summons } from './Summons';

export interface ViewHooks {
  message: (text: string, big?: boolean) => void;
  flash: (color: string, amount: number) => void;
  banner: (text: string, color: string) => void;
  rumble?: (strong: number, weak: number, ms: number) => void;
}

const REF_LOOK = { skin: 0xc9a07c, hair: 0x15110e, outfit: 'arbitro' as const, outfitColor: 0x0d0d10, trunksColor: 0x0d0d10, accent: 0xffffff, build: 1.0, height: 1.0 };

export class BattleView {
  models: FighterModel[];
  anims = [new Animator(), new Animator()];
  refModel: FighterModel;
  refAnim = new Animator();
  fx = new Fx();
  cam = new CameraRig();
  summons: Summons;
  timeScale = 1;
  hitstop = 0;
  excite = 0.35;
  time = 0;
  private slowT = 0;
  private slowV = 1;
  private markers: THREE.Mesh[] = [];
  private glowColor = [0xffffff, 0xffffff];
  playerIdx = 0;

  constructor(public stage: Stage, public arena: Arena, public match: Match, private hooks: ViewHooks) {
    const scene = stage.scene;
    scene.background = new THREE.Color(arena.fogColor);
    scene.fog = new THREE.FogExp2(arena.fogColor, arena.fogDensity);
    scene.add(arena.group, this.fx.group);
    this.summons = new Summons(this.fx, () => [match.f[0], match.f[1]], () => stage.camera.position);
    scene.add(this.summons.group);
    this.models = match.f.map((f) => new FighterModel(f.data.appearance));
    this.refModel = new FighterModel(REF_LOOK);
    for (const m of [...this.models, this.refModel]) scene.add(m.root);
    // marcadores sobre la cabeza
    [0x4aa8ff, 0xff5a4a].forEach((c, i) => {
      const mk = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.26, 4), new THREE.MeshBasicMaterial({ color: c, toneMapped: false }));
      mk.rotation.x = Math.PI;
      scene.add(mk);
      this.markers.push(mk);
    });
    this.cam.shakeScale = 1;
    this.cam.snap(stage.camera);
    this.cam.setShot({ kind: 'intro', t: 0, dur: 2.6 });
    stage.renderer.toneMappingExposure = arena.exposure;
  }

  dispose() {
    const scene = this.stage.scene;
    scene.remove(this.arena.group, this.fx.group, this.summons.group);
    this.summons.dispose();
    for (const m of [...this.models, this.refModel]) { scene.remove(m.root); m.dispose(); }
    for (const mk of this.markers) { scene.remove(mk); mk.geometry.dispose(); }
    this.arena.dispose();
    scene.fog = null;
  }

  private slow(scale: number, dur: number) { this.slowV = scale; this.slowT = dur; }

  /** Avanza la vista. `dt` = tiempo real. Devuelve el dt de simulación a usar. */
  step(dt: number): number {
    this.time += dt;
    if (this.slowT > 0) { this.slowT -= dt; this.timeScale = this.slowV; } else this.timeScale += (1 - this.timeScale) * Math.min(1, dt * 6);
    if (this.hitstop > 0) { this.hitstop -= dt; return 0; }
    return dt * this.timeScale;
  }

  /** Sincroniza modelos y cámara con el estado del combate (cada frame real). */
  sync(dt: number) {
    const m = this.match;
    const t = this.time;
    this.excite += (0.3 - this.excite) * Math.min(1, dt * 0.4);
    Audio.setCrowd(0.2 + this.excite * 0.6);
    Audio.tickCrowd(dt);
    for (let i = 0; i < 2; i++) {
      const f = m.f[i], mod = this.models[i];
      mod.root.position.set(f.x, f.y, f.z);
      mod.root.rotation.y = f.yaw;
      const pose = this.anims[i].update(f, dt, t);
      mod.applyPose(pose, t);
      // objetos
      const mv = f.move;
      if (f.state === 'attack' && mv?.prop) {
        mod.setProp(mv.prop);
        const grow = Math.min(1, f.t / Math.max(0.08, f.s * 0.35));
        // la silla, el casco y el cuerno "aparecen de la nada"
        mod.propObject(mv.prop)?.scale.setScalar(mv.prop === 'maletin' || mv.prop === 'microfono' ? 1 : 0.15 + 0.85 * grow);
      } else mod.setProp(null);
      // aura del finisher
      let glow = 0;
      if (f.state === 'attack' && mv?.kind === 'finisher' && f.t < f.s + f.a + 0.3) glow = Math.min(1, f.t / f.s) * (0.7 + 0.3 * Math.sin(t * 30));
      else if (f.mom >= 100 && f.state !== 'win') glow = 0.18 + 0.1 * Math.sin(t * 6);
      mod.setGlow(this.glowColor[i], glow);
      // marcador
      const mk = this.markers[i];
      mk.visible = f.state !== 'win' && !(f.lying);
      mk.position.set(f.x, f.y + 2.35 * mod.ap.height + Math.sin(t * 4) * 0.05, f.z);
      mk.rotation.y = t * 2;
    }
    // árbitro: siempre detrás de los luchadores respecto a la cámara
    {
      const cam = this.stage.camera.position;
      const mx = (m.f[0].x + m.f[1].x) / 2, mz = (m.f[0].z + m.f[1].z) / 2;
      const l = Math.hypot(mx - cam.x, mz - cam.z) || 1;
      m.refAway.x = (mx - cam.x) / l; m.refAway.z = (mz - cam.z) / l;
    }
    const r = m.ref;
    this.refModel.root.position.set(r.x, 1.0, r.z);
    this.refModel.root.rotation.y = r.yaw;
    this.refModel.applyPose(this.refAnim.updateRef(dt, t, 0, r.count, r.mode), t);
    // cámara
    const portrait = window.innerWidth / window.innerHeight < 1;
    this.cam.update(dt, this.stage.camera, m.f[0], m.f[1], portrait);
    // arena y fx
    this.summons.update(dt);
    this.arena.update(dt, t, this.excite, this.stage.viewportH);
    this.fx.setScale(this.stage.viewportH);
    this.fx.update(dt);
    if (this.arena instanceof Manchester || this.arena instanceof Matamoros) { /* animaciones propias via arena.anim */ }
  }

  handle(events: GameEvent[]) {
    const m = this.match;
    for (const e of events) {
      switch (e.type) {
        case 'hit': {
          this.fx.sparks(e.x, e.y, e.z, e.heavy ? 22 : 12, e.heavy ? 0xffb347 : 0xfff0c0, e.heavy ? 6 : 4);
          Audio.sfx(e.heavy ? 'heavy' : 'hit');
          if (e.heavy) this.cam.onEvent('heavy');
          this.hooks.rumble?.(e.heavy ? 0.9 : 0.4, e.heavy ? 0.6 : 0.3, e.heavy ? 180 : 90);
          const mid = m.f[e.attacker].move?.id;
          if (mid === 'microfonazo') Audio.sfx('feedback');
          if (mid === 'maletinazo') this.fx.sparks(e.x, e.y, e.z, 26, 0x5cd67a, 5, 0.09); // billetes verdes
          this.cam.shake = Math.max(this.cam.shake, e.heavy ? 0.75 : 0.35);
          this.hitstop = Math.max(this.hitstop, e.heavy ? 0.085 : 0.045);
          this.excite = Math.min(1, this.excite + (e.heavy ? 0.14 : 0.06));
          if (e.heavy) Audio.cheer(0.5);
          break;
        }
        case 'block':
          this.fx.sparks(e.x, e.y, e.z, e.perfect ? 30 : 8, e.perfect ? 0x7ad0ff : 0xbcd2ff, 5);
          Audio.sfx(e.perfect ? 'parry' : 'block');
          this.cam.shake = Math.max(this.cam.shake, e.perfect ? 0.5 : 0.2);
          if (e.perfect) { this.hitstop = Math.max(this.hitstop, 0.12); this.hooks.flash('#7ad0ff', 0.35); this.excite = Math.min(1, this.excite + 0.12); Audio.cheer(0.6); }
          break;
        case 'whoosh': Audio.sfx('whoosh', 0.7); break;
        case 'knockdown': {
          this.cam.onEvent('knockdown');
          const f = m.f[e.target];
          this.fx.dust(f.x, f.y, f.z, 14);
          Audio.sfx('knock');
          this.cam.shake = Math.max(this.cam.shake, 0.5);
          this.excite = Math.min(1, this.excite + 0.1);
          Audio.cheer(0.8);
          break;
        }
        case 'land': {
          const f = m.f[e.target];
          this.fx.dust(f.x, f.y, f.z, e.big ? 26 : 14, e.big ? 2.2 : 1.4);
          Audio.sfx(e.big ? 'slam' : 'knock');
          this.cam.shake = Math.max(this.cam.shake, e.big ? 0.9 : 0.55);
          this.hitstop = Math.max(this.hitstop, 0.07);
          Audio.cheer(1);
          this.excite = Math.min(1, this.excite + 0.18);
          break;
        }
        case 'finisherStart': {
          const dur = e.move.startup + e.move.active + 0.35;
          this.glowColor[e.fighter] = e.move.vfx?.color ?? 0xffffff;
          this.cam.setShot({ kind: 'finisher', who: e.fighter, t: 0, dur });
          this.slow(0.55, e.move.startup * 0.9);
          Audio.sfx('finisher');
          this.hooks.banner(e.move.vfx?.callout ?? e.move.name.toUpperCase(), '#' + (e.move.vfx?.color ?? 0xffffff).toString(16).padStart(6, '0'));
          this.excite = 1;
          Audio.cheer(1);
          break;
        }
        case 'finisherHit': {
          const f = m.f[e.target];
          const col = e.move.vfx?.color ?? 0xffffff;
          this.fx.burst(f.x, f.y + 1.3, f.z, col, 110, 11);
          this.fx.dust(f.x, f.y, f.z, 24, 2.4);
          Audio.sfx('finisherHit');
          this.cam.shake = 1;
          this.hooks.rumble?.(1, 1, 450);
          this.hitstop = 0.22;
          this.slow(0.22, 0.55);
          this.hooks.flash('#' + col.toString(16).padStart(6, '0'), 0.8);
          this.excite = 1;
          Audio.cheer(1.5);
          break;
        }
        case 'finisherMiss': this.hooks.message('¡Falló el finisher!'); break;
        case 'grab': Audio.sfx('grab'); break;
        case 'reversal': Audio.sfx('parry'); this.hitstop = 0.1; this.hooks.flash('#ffffff', 0.3); break;
        case 'grappleMove': this.hooks.message(e.name, true); Audio.cheer(0.6); break;
        case 'pinStart': this.cam.setShot({ kind: 'close', who: e.target, t: 0, dur: 3.4 }); this.hooks.message('¡PIN!', true); Audio.cheer(0.6); break;
        case 'pinCount': Audio.sfx('count'); Audio.say(['', 'uno', 'dos', 'tres'][e.n]); this.cam.shake = Math.max(this.cam.shake, 0.3); break;
        case 'kickout': this.hooks.message('¡Se zafa!', true); Audio.cheer(1.2); this.cam.setShot(null); this.excite = Math.min(1, this.excite + 0.2); break;
        case 'subStart': this.cam.setShot({ kind: 'close', who: e.target, t: 0, dur: 4 }); Audio.sfx('grab'); break;
        case 'subBreak': this.hooks.message('¡Rompe la llave!', true); Audio.cheer(1); this.cam.setShot(null); break;
        case 'tap': Audio.sfx('tap'); this.hooks.message('¡SE RINDE!', true); break;
        case 'koCount': if (e.n > 0) Audio.sfx('count'); break;
        case 'outCount': if (e.n >= 4) { Audio.sfx('count'); } break;
        case 'foul': Audio.sfx('foul'); this.hooks.message(e.seen ? '¡FALTA! El árbitro lo ha visto' : '¡Falta! … el árbitro no miraba', e.seen); break;
        case 'summon': this.summons.spawn(e.kind, e.fighter, e.target, e.dur); break;
        case 'toreo': Audio.sfx('olé'); Audio.cheer(1.5); this.hooks.flash('#ffd45e', 0.25); this.excite = 1; break;
        case 'taunt': this.cam.onEvent('taunt'); Audio.cheer(0.8); Audio.sfx('click'); this.excite = Math.min(1, this.excite + 0.1); break;
        case 'ready': Audio.sfx('ready'); this.hooks.message('¡' + m.f[e.fighter].data.name + ' tiene el FINISHER listo!', true); break;
        case 'exhausted': this.hooks.message(m.f[e.fighter].data.name + ' está agotado'); break;
        case 'msg': this.hooks.message(e.text, e.big); break;
        case 'end': {
          Audio.sfx('bell');
          this.cam.setShot({ kind: 'orbit', who: e.winner, });
          this.slow(0.5, 0.8);
          this.excite = 1;
          Audio.cheer(2);
          break;
        }
        default: break;
      }
    }
  }
}
