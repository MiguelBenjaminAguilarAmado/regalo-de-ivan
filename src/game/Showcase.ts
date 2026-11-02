import * as THREE from 'three';
import type { FighterData, ArenaId } from '../combat/types';
import { FighterModel } from '../fighters/FighterModel';
import { GUARD, mk, blendPose, type Pose } from '../fighters/Pose';
import type { Stage } from '../render/Stage';
import { Arena, type Quality } from '../arenas/Arena';
import { Matamoros } from '../arenas/Matamoros';
import { Manchester } from '../arenas/Manchester';

export function makeArena(id: ArenaId, quality: Quality): Arena {
  return id === 'manchester' ? new Manchester({ quality }) : new Matamoros({ quality });
}

/** Escena de fondo de los menús: ring, arena y los luchadores seleccionados posando. */
export class Showcase {
  arena: Arena;
  private models: (FighterModel | null)[] = [null, null];
  private t = 0;
  private cur: Pose[] = [{ ...GUARD }, { ...GUARD }];
  private angle = 0.35;
  mode: 'orbit' | 'close' = 'orbit';
  private tgt = new THREE.Vector3(0, 1.4, 0);
  private look = new THREE.Vector3(0, 1.4, 0);

  constructor(private stage: Stage, arenaId: ArenaId, quality: Quality) {
    this.arena = makeArena(arenaId, quality === 'alta' ? 'media' : quality);
    stage.scene.add(this.arena.group);
    stage.scene.background = new THREE.Color(this.arena.fogColor);
    stage.scene.fog = new THREE.FogExp2(this.arena.fogColor, this.arena.fogDensity);
    stage.renderer.toneMappingExposure = this.arena.exposure;
  }

  setFighter(slot: 0 | 1, data: FighterData | null) {
    const old = this.models[slot];
    if (old) { this.stage.scene.remove(old.root); old.dispose(); this.models[slot] = null; }
    if (!data) return;
    const m = new FighterModel(data.appearance);
    m.root.position.set(slot === 0 ? -1.5 : 1.5, 1.0, 0);
    m.root.rotation.y = slot === 0 ? Math.PI / 2 : -Math.PI / 2;
    this.stage.scene.add(m.root);
    this.models[slot] = m;
  }

  update(dt: number) {
    this.t += dt;
    this.angle += dt * 0.08;
    const lone = !!this.models[0] !== !!this.models[1];
    const pr = this.stage.camera.aspect < 1;
    const close = this.mode === 'close';
    const r = (close ? (pr ? 9 : 6.4) : pr ? 15 : 11.5) + Math.sin(this.t * 0.2) * (close ? 0.4 : 1.2);
    const h = (close ? 1.4 : 3.6) + Math.sin(this.t * 0.15) * 0.4;
    const ang = close ? Math.sin(this.t * 0.12) * 0.5 : this.angle;
    const cx = Math.sin(ang) * r, cz = Math.cos(ang) * r;
    if (this.mode === 'close') this.tgt.set(0, 2.1, 0); else this.tgt.set(0, 1.4, 0);
    this.look.lerp(this.tgt, 1 - Math.exp(-3 * dt));
    this.stage.camera.position.lerp(new THREE.Vector3(cx, 1.0 + h, cz), 1 - Math.exp(-2 * dt));
    this.stage.camera.lookAt(this.look);
    this.models.forEach((m, i) => {
      if (!m) return;
      const s = Math.sin(this.t * 1.6 + i * 2);
      const target = mk({
        torso: [0.1 + s * 0.02, 0, 0], head: [-0.05, Math.sin(this.t * 0.6 + i) * 0.25, 0],
        lU: [-0.55, 0, 0.3], lF: [-1.5 + s * 0.05, 0, 0], rU: [-0.5, 0, -0.3], rF: [-1.6 + s * 0.05, 0, 0],
      });
      blendPose(this.cur[i], target, 1 - Math.exp(-8 * dt), this.cur[i]);
      m.applyPose(this.cur[i], this.t);
    });
    void lone;
    this.arena.update(dt, this.t, 0.5, this.stage.viewportH);
  }

  dispose() {
    this.models.forEach((m) => { if (m) { this.stage.scene.remove(m.root); m.dispose(); } });
    this.stage.scene.remove(this.arena.group);
    this.arena.dispose();
    this.stage.scene.fog = null;
  }
}
