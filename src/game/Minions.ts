import * as THREE from 'three';
import type { Match } from '../combat/Match';
import { FighterModel } from '../fighters/FighterModel';
import { GUARD, LYING, blendPose, mk, type Pose } from '../fighters/Pose';

const TRIBESMAN = { skin: 0x6b4226, hair: 0x120c08, outfit: 'desnudo' as const, outfitColor: 0x7a4a1e, trunksColor: 0x8a5a24, accent: 0xd8b25a, wraps: 0x8a5a24, build: 0.95, height: 0.9 };

interface View { model: FighterModel; pose: Pose; seed: number }

/** Dibuja la tribu de Konguito a partir de `match.minions` (la lógica y la vida viven en Match). */
export class MinionView {
  group = new THREE.Group();
  private views = new Map<number, View>();

  sync(match: Match, dt: number, time: number) {
    const live = new Set<number>();
    for (const mi of match.minions) {
      live.add(mi.id);
      let v = this.views.get(mi.id);
      if (!v) {
        v = { model: new FighterModel(TRIBESMAN), pose: { ...GUARD }, seed: mi.id * 1.7 };
        this.views.set(mi.id, v);
        this.group.add(v.model.root);
      }
      const root = v.model.root;
      root.visible = mi.state !== 'wait';
      if (!root.visible) continue;
      root.position.set(mi.x, match.gy(mi.x, mi.z), mi.z);
      root.rotation.y = mi.yaw;
      // aparecen de golpe por la puerta y se esfuman al caer
      const appear = Math.min(1, mi.t / 0.2);
      const fade = mi.state === 'dying' ? Math.max(0, 1 - Math.max(0, mi.t - 0.6) / 0.4) : 1;
      root.scale.setScalar(Math.max(0.01, TRIBESMAN.height * (mi.state === 'run' ? appear : 1) * fade));
      let goal: Pose;
      if (mi.state === 'dying') {
        goal = mk(LYING);
      } else if (mi.swing > 0) {
        const s = Math.sin((1 - mi.swing / 0.3) * Math.PI);
        goal = mk({ lU: [-1.4 - s * 0.6, 0, 0.1], rU: [-1.0 + s * 0.2, 0, -0.1], lF: [-0.4, 0, 0], rF: [-1.2 + s * 1.1, 0, 0], torso: [0.2 + s * 0.3, s * 0.4, 0], lT: [-0.3, 0, 0.1], rT: [0.2, 0, -0.1], lS: [0.5, 0, 0], rS: [0.4, 0, 0] });
      } else {
        const moving = Math.hypot(match.f[1 - mi.owner].x - mi.x, match.f[1 - mi.owner].z - mi.z) > 1.0;
        const sw = moving ? Math.sin(time * 11 + v.seed) : Math.sin(time * 3 + v.seed) * 0.15;
        goal = mk({ lU: [-1.1 + sw * 0.6, 0, 0.12], rU: [-1.1 - sw * 0.6, 0, -0.12], lF: [-0.5, 0, 0], rF: [-0.5, 0, 0], torso: [moving ? 0.28 : 0.15, 0, 0], lT: [-0.3 + sw * 0.6, 0, 0.08], rT: [-0.3 - sw * 0.6, 0, -0.08], lS: [0.5, 0, 0], rS: [0.5, 0, 0] });
      }
      blendPose(v.pose, goal, 1 - Math.exp(-14 * dt), v.pose);
      v.model.applyPose(v.pose, time);
    }
    for (const [id, v] of this.views) {
      if (live.has(id)) continue;
      this.group.remove(v.model.root); v.model.dispose(); this.views.delete(id);
    }
  }

  dispose() {
    for (const v of this.views.values()) { this.group.remove(v.model.root); v.model.dispose(); }
    this.views.clear();
  }
}
