import * as THREE from 'three';
import type { Fighter, Match } from '../combat/Match';
import { RING, RING_Y } from '../combat/Match';
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
import { MinionView } from './Minions';

export interface ViewHooks {
  message: (text: string, big?: boolean) => void;
  flash: (color: string, amount: number) => void;
  banner: (text: string, color: string) => void;
  rumble?: (strong: number, weak: number, ms: number) => void;
  combo?: (fighter: number, n: number) => void;
}

const REF_LOOK = { skin: 0xc9a07c, hair: 0x15110e, outfit: 'arbitro' as const, outfitColor: 0x0d0d10, trunksColor: 0x0d0d10, accent: 0xffffff, build: 1.0, height: 1.0 };

export class BattleView {
  /** Un modelo y un animador por cada luchador (activos y compañeros en el apron) */
  private rigs = new Map<Fighter, { model: FighterModel; anim: Animator }>();
  refModel: FighterModel;
  refAnim = new Animator();
  fx = new Fx();
  cam = new CameraRig();
  summons: Summons;
  minions = new MinionView();
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
    scene.add(this.summons.group, this.minions.group);
    for (const f of [...match.f, ...match.bench]) if (f) this.rigFor(f);
    this.refModel = new FighterModel(REF_LOOK);
    scene.add(this.refModel.root);
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
    scene.remove(this.arena.group, this.fx.group, this.summons.group, this.minions.group);
    this.summons.dispose();
    this.minions.dispose();
    for (const r of this.rigs.values()) { scene.remove(r.model.root); r.model.dispose(); }
    scene.remove(this.refModel.root); this.refModel.dispose();
    for (const mk of this.markers) { scene.remove(mk); mk.geometry.dispose(); }
    this.arena.dispose();
    scene.fog = null;
  }

  private rigFor(f: Fighter) {
    let r = this.rigs.get(f);
    if (!r) {
      r = { model: new FighterModel(f.data.appearance), anim: new Animator() };
      this.rigs.set(f, r);
      this.stage.scene.add(r.model.root);
    }
    return r;
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
      const f = m.f[i], rig = this.rigFor(f), mod = rig.model;
      mod.root.position.set(f.x, f.y, f.z);
      mod.root.rotation.y = f.yaw;
      const pose = rig.anim.update(f, dt, t);
      mod.applyPose(pose, t);
      // objetos
      const mv = f.move;
      if (f.state === 'attack' && mv?.prop) {
        mod.setProp(mv.prop);
        const grow = Math.min(1, f.t / Math.max(0.08, f.s * 0.35));
        // la silla, el casco y el cuerno "aparecen de la nada"
        mod.propObject(mv.prop)?.scale.setScalar(mv.prop === 'maletin' || mv.prop === 'microfono' || mv.prop === 'bate' ? 1 : 0.15 + 0.85 * grow);
      } else mod.setProp(null);
      // aura del finisher
      let glow = 0;
      if (f.state === 'attack' && mv?.kind === 'finisher' && f.t < f.s + f.a + 0.3) glow = Math.min(1, f.t / f.s) * (0.7 + 0.3 * Math.sin(t * 30));
      else if (f.boost > 0 && f.state !== 'win') glow = 0.22 + 0.12 * Math.sin(t * 9);
      else if (f.mom >= 100 && f.state !== 'win') glow = 0.18 + 0.1 * Math.sin(t * 6);
      mod.setGlow(this.glowColor[i], glow);
      // marcador
      const mk = this.markers[i];
      mk.visible = f.state !== 'win' && !(f.lying);
      mk.position.set(f.x, f.y + 2.35 * mod.ap.height + Math.sin(t * 4) * 0.05, f.z);
      mk.rotation.y = t * 2;
    }
    // compañeros esperando su turno, apoyados en las cuerdas del rincón
    for (let i = 0; i < 2; i++) {
      const b = m.bench[i];
      if (!b) continue;
      const rig = this.rigFor(b);
      const sx = i === 0 ? -1 : 1;
      rig.model.root.position.set(sx * (RING + 0.45), RING_Y, -RING + 0.9);
      rig.model.root.rotation.y = Math.atan2(-sx, 0.6);
      rig.model.setProp(null);
      rig.model.setGlow(0xffffff, 0);
      if (b.hp > 0) b.state = 'idle';
      rig.model.applyPose(rig.anim.update(b, dt, t), t);
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
    this.minions.sync(m, dt, t);
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
        case 'summon': this.summons.spawn(e.kind, e.fighter, e.target, e.dur, e.x, e.z); break;
        case 'minionHit':
          this.fx.sparks(e.x, 1.2, e.z, e.dead ? 18 : 8, 0xd8b25a, 4);
          Audio.sfx(e.dead ? 'knock' : 'hit', 0.8);
          if (e.dead) this.fx.dust(e.x, 1.0, e.z, 10, 1.2);
          break;
        case 'adrenaline':
          this.glowColor[e.fighter] = 0xff7a1a;
          this.hooks.message('¡ADRENALINA de ' + m.f[e.fighter].data.name + '!', true);
          this.hooks.flash('#ff7a1a', 0.3);
          Audio.sfx('ready'); Audio.cheer(1.2);
          this.cam.shake = Math.max(this.cam.shake, 0.4);
          this.excite = Math.min(1, this.excite + 0.2);
          break;
        case 'combo': this.hooks.combo?.(e.fighter, e.n); break;
        case 'bonus': {
          const f = m.f[e.side];
          this.hooks.message(e.text, true);
          this.fx.sparks(f.x, f.y + 1.5, f.z, 36, 0x5cd67a, 6, 0.09);
          Audio.sfx('unlock'); Audio.cheer(1);
          break;
        }
        case 'blackout': this.arena.setBlackout(e.on); if (e.on) { Audio.sfx('slam'); this.cam.shake = Math.max(this.cam.shake, 0.4); } break;
        case 'phase':
          this.glowColor[e.side] = 0xff3030;
          this.hooks.banner('¡SE ENFURECE!', '#ff3030');
          this.hooks.message(e.text, true);
          this.hooks.flash('#ff3030', 0.4);
          Audio.sfx('finisher'); Audio.cheer(1.6);
          this.cam.shake = Math.max(this.cam.shake, 0.9); this.excite = 1;
          break;
        case 'gust':
          Audio.sfx('whoosh', 1); this.cam.shake = Math.max(this.cam.shake, 0.25);
          this.fx.dust(0, 1.2, 0, 24, 4);
          break;
        case 'cage':
          this.fx.sparks(e.x, 1.6, e.z, 26, 0xcfd6e0, 6);
          Audio.sfx('slam'); this.cam.shake = Math.max(this.cam.shake, 0.8); this.hitstop = Math.max(this.hitstop, 0.09);
          this.hooks.message('¡Contra la jaula!', true);
          break;
        case 'duo':
          this.hooks.message(`★ DÚO DINÁMICO: ${e.name}`, true);
          this.glowColor[e.side] = 0xffd45e;
          break;
        case 'tag':
          this.hooks.message(e.forced ? `¡${e.out} cae! Entra ${e.inn}` : `¡Relevo! Entra ${e.inn}`, true);
          Audio.sfx('ready'); Audio.cheer(1.2);
          this.fx.dust(m.f[e.side].x, m.f[e.side].y, m.f[e.side].z, 14, 1.6);
          this.cam.shake = Math.max(this.cam.shake, 0.3);
          break;
        case 'mob':
          Audio.sfx('summon'); Audio.cheer(2);
          this.cam.shake = Math.max(this.cam.shake, 0.7);
          this.hooks.flash('#c1272d', 0.3);
          this.excite = 1;
          break;
        case 'quake': {
          // planchazo de Konguito: tiembla todo el ring
          const f = m.f[e.fighter];
          this.fx.dust(e.x, 1.0, e.z, 40, 3.4);
          this.fx.burst(e.x, 1.2, e.z, 0xd8b25a, 40, 7);
          Audio.sfx('slam'); Audio.sfx('knock');
          this.cam.shake = 1.4;
          this.hitstop = Math.max(this.hitstop, 0.14);
          this.hooks.rumble?.(1, 1, 380);
          this.hooks.flash('#d8b25a', 0.25);
          this.excite = 1; Audio.cheer(1.4);
          void f;
          break;
        }
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
