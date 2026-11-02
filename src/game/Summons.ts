import * as THREE from 'three';
import type { Fighter } from '../combat/Match';
import { FighterModel } from '../fighters/FighterModel';
import { ANIMS, GUARD, blendPose, mk, type Pose } from '../fighters/Pose';
import type { Fx } from '../render/Fx';
import { Audio } from '../audio/Audio';

const MUMMY = { skin: 0xd8cdb0, hair: null, outfit: 'desnudo' as const, outfitColor: 0xd8cdb0, trunksColor: 0xc9bd9a, accent: 0x8a7a55, wraps: 0xcfc3a0, build: 1.05, height: 1.0 };

interface Item { obj: THREE.Object3D; update: (dt: number) => boolean; dispose: () => void }

/** Criaturas y vehículos que invoca Pablo Motos. Son puramente visuales; el daño lo calcula Match. */
export class Summons {
  group = new THREE.Group();
  private items: Item[] = [];

  constructor(private fx: Fx, private fighters: () => [Fighter, Fighter], private camPos: () => THREE.Vector3) {}

  /** Lado (perpendicular a la línea de combate) contrario a la cámara, para que no tape la vista */
  private farSide(tgt: Fighter, own: Fighter): { sx: number; sz: number } {
    const dx = tgt.x - own.x, dz = tgt.z - own.z, l = Math.hypot(dx, dz) || 1;
    let sx = -dz / l, sz = dx / l;
    const c = this.camPos();
    if (sx * (c.x - tgt.x) + sz * (c.z - tgt.z) > 0) { sx = -sx; sz = -sz; }
    return { sx, sz };
  }

  spawn(kind: 'momia' | 'tanque', owner: number, target: number, dur: number) {
    if (kind === 'momia') this.mummy(owner, target, dur); else this.tank(owner, target, dur);
  }

  private mummy(owner: number, target: number, dur: number) {
    const [a, b] = this.fighters();
    const tgt = target === 0 ? a : b, own = owner === 0 ? a : b;
    const m = new FighterModel(MUMMY);
    // cintas de vendaje sueltas
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 0.01), new THREE.MeshStandardMaterial({ color: 0xe8dfc4, roughness: 0.9 }));
    strip.position.set(0.2, 1.0, -0.15); m.root.add(strip);
    // aparece a un lado del rival, mirando hacia él
    const { sx, sz } = this.farSide(tgt, own);
    const start = { x: tgt.x + sx * 3.2, z: tgt.z + sz * 3.2 };
    m.root.position.set(start.x, tgt.y, start.z);
    m.root.scale.setScalar(0.01);
    this.group.add(m.root);
    this.fx.dust(start.x, tgt.y, start.z, 22, 2.2);
    this.fx.sparks(start.x, tgt.y + 1, start.z, 18, 0xd8cdb0, 3);
    Audio.sfx('summon');
    let t = 0;
    let pose: Pose = { ...GUARD };
    const walk = mk({ lU: [-1.5, 0, 0.12], rU: [-1.5, 0, -0.12], lF: [-0.15, 0, 0], rF: [-0.15, 0, 0], torso: [0.12, 0, 0] });
    const hit = ANIMS.haymaker.hit;
    this.items.push({
      obj: m.root,
      update: (dt) => {
        t += dt;
        const k = Math.min(1, t / Math.max(0.2, dur));
        const ease = k * k * (3 - 2 * k);
        const sc = Math.min(1, t / 0.2);
        m.root.scale.setScalar(Math.max(0.01, sc));
        const cur = { x: tgt.x, z: tgt.z };
        const ex = cur.x - sx * 1.1, ez = cur.z - sz * 1.1;
        const px = start.x + (ex - start.x) * ease, pz = start.z + (ez - start.z) * ease;
        m.root.position.set(px, tgt.y, pz);
        m.root.rotation.y = Math.atan2(cur.x - px, cur.z - pz);
        const swing = Math.sin(t * 7);
        const target = t < dur ? mk({ ...walk, lT: [-0.4 + swing * 0.5, 0, 0.08], rT: [-0.4 - swing * 0.5, 0, -0.08], lS: [0.5, 0, 0], rS: [0.5, 0, 0] }) : mk(hit);
        blendPose(pose, target, 1 - Math.exp(-(t < dur ? 10 : 30) * dt), pose);
        m.applyPose(pose, t);
        if (t > dur + 0.8) { this.fx.dust(px, tgt.y, pz, 16, 1.6); this.fx.sparks(px, tgt.y + 1, pz, 12, 0xd8cdb0, 3); return false; }
        return true;
      },
      dispose: () => m.dispose(),
    });
  }

  private tank(owner: number, target: number, dur: number) {
    const [a, b] = this.fighters();
    const tgt = target === 0 ? a : b, own = owner === 0 ? a : b;
    const g = new THREE.Group();
    const olive = new THREE.MeshStandardMaterial({ color: 0x59633a, roughness: 0.6, metalness: 0.35 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1c1d1a, roughness: 0.8, metalness: 0.4 });
    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; g.add(m); return m; };
    add(new THREE.BoxGeometry(1.8, 0.7, 3.5), olive, 0, 0.75, 0);          // casco
    add(new THREE.BoxGeometry(1.5, 0.35, 1.2), olive, 0, 0.62, 2.1).rotation.x = -0.35; // proa inclinada
    for (const sx of [-1, 1]) {
      add(new THREE.BoxGeometry(0.5, 0.65, 3.9), dark, sx * 1.05, 0.38, 0);  // orugas
      for (let i = 0; i < 6; i++) { const w = add(new THREE.CylinderGeometry(0.28, 0.28, 0.52, 14), olive, sx * 1.05, 0.3, -1.6 + i * 0.64); w.rotation.z = Math.PI / 2; }
    }
    add(new THREE.CylinderGeometry(0.75, 0.9, 0.55, 20), olive, 0, 1.3, -0.1); // torreta
    const barrel = new THREE.Group(); barrel.position.set(0, 1.35, 0.5); g.add(barrel);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 2.6, 12), dark); tube.rotation.x = Math.PI / 2; tube.position.z = 1.3; tube.castShadow = true; barrel.add(tube);
    const hatch = add(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 12), dark, -0.2, 1.62, -0.3);
    void hatch;
    const { sx, sz } = this.farSide(tgt, own);           // entra de lado, por el lado lejano a la cámara
    const start = { x: tgt.x + sx * 10, z: tgt.z + sz * 10 };
    const stop = { x: tgt.x + sx * 3.4, z: tgt.z + sz * 3.4 };
    g.position.set(start.x, tgt.y, start.z);
    g.scale.setScalar(0.85);
    this.group.add(g);
    Audio.sfx('engine');
    const light = new THREE.PointLight(0xffb060, 0, 10, 1.4);
    light.position.set(0, 1.4, 3);
    g.add(light);
    let t = 0, fired = false;
    this.items.push({
      obj: g,
      update: (dt) => {
        t += dt;
        const k = Math.min(1, t / Math.max(0.3, dur));
        const ease = 1 - (1 - k) * (1 - k);
        let px = start.x + (stop.x - start.x) * ease, pz = start.z + (stop.z - start.z) * ease;
        if (t > dur + 0.9) { const o = Math.min(1, (t - dur - 0.9) / 0.9); px = stop.x + (start.x - stop.x) * o * o; pz = stop.z + (start.z - stop.z) * o * o; }
        g.position.set(px, tgt.y + Math.sin(t * 30) * 0.01, pz);
        g.rotation.y = Math.atan2(tgt.x - px, tgt.z - pz);
        if (!fired && t >= dur) {
          fired = true;
          const fx = px + Math.sin(g.rotation.y) * 2.5, fz = pz + Math.cos(g.rotation.y) * 2.5;
          this.fx.burst(fx, tgt.y + 1.6, fz, 0xffb060, 70, 9);
          this.fx.dust(fx, tgt.y, fz, 24, 2.5);
          light.intensity = 40;
          Audio.sfx('cannon');
        }
        if (fired) { light.intensity *= 0.82; barrel.position.z = 0.5 - Math.max(0, 0.5 - (t - dur) * 2) * 0.5; }
        return t < dur + 1.9;
      },
      dispose: () => { g.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); (m.material as THREE.Material | undefined)?.dispose?.(); }); },
    });
  }

  update(dt: number) {
    this.items = this.items.filter((it) => {
      const alive = it.update(dt);
      if (!alive) { this.group.remove(it.obj); it.dispose(); }
      return alive;
    });
  }

  dispose() { for (const it of this.items) { this.group.remove(it.obj); it.dispose(); } this.items = []; }
}
