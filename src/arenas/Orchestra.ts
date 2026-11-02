import * as THREE from 'three';

/** Orquesta sentada en una plataforma escalonada, con concha acústica. Mira hacia +Z. */
export class Orchestra {
  group = new THREE.Group();
  private bows: { arm: THREE.Object3D; phase: number; amp: number; axis: 'x' | 'y' }[] = [];
  private conductor!: THREE.Object3D;
  private bodies: THREE.Object3D[] = [];

  constructor() {
    const wood = new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.6 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x111114, roughness: 0.75 });
    const white = new THREE.MeshStandardMaterial({ color: 0xe9e9ec, roughness: 0.7 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xd8b24a, roughness: 0.25, metalness: 0.95 });
    const steel = new THREE.MeshStandardMaterial({ color: 0xb6bcc4, roughness: 0.3, metalness: 0.9 });
    const copper = new THREE.MeshStandardMaterial({ color: 0xb4663a, roughness: 0.3, metalness: 0.9 });
    const violinWood = new THREE.MeshStandardMaterial({ color: 0x7a3d1a, roughness: 0.3, metalness: 0.05 });
    const skins = [0xf1c8a5, 0xd9a27a, 0xb97d56, 0x8d5a3b].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6 }));

    // plataforma escalonada
    const tiers = 4;
    for (let i = 0; i < tiers; i++) {
      const w = 15 + i * 3.4;
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, 0.45 * (i + 1), 2.2), new THREE.MeshStandardMaterial({ color: 0x1b1612, roughness: 0.7 }));
      b.position.set(0, (0.45 * (i + 1)) / 2, -i * 2.0);
      b.receiveShadow = true;
      this.group.add(b);
    }
    // concha acústica
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(14, 14, 9, 28, 1, true, Math.PI * 0.62, Math.PI * 0.76), new THREE.MeshStandardMaterial({ color: 0x4b3523, roughness: 0.5, side: THREE.DoubleSide, emissive: 0x2a1a08, emissiveIntensity: 0.7 }));
    shell.position.set(0, 4.6, 8);
    shell.rotation.y = Math.PI;
    this.group.add(shell);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(26, 0.3, 9), new THREE.MeshStandardMaterial({ color: 0x2a1f16, roughness: 0.6 }));
    roof.position.set(0, 9.2, -4.5);
    this.group.add(roof);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(24, 0.12, 0.12), new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false }));
    strip.position.set(0, 8.7, -0.1);
    this.group.add(strip);

    const addMusician = (x: number, y: number, z: number, kind: 'violin' | 'viola' | 'cello' | 'brass' | 'drum' | 'harp' | 'timp', i: number) => {
      const m = new THREE.Group();
      m.position.set(x, y, z);
      m.rotation.y = Math.PI + (x * 0.012); // mira hacia el director (-> +z local queda al frente)
      m.rotation.y = x * -0.015;
      // silla
      const chair = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.5), dark);
      chair.position.set(0, 0.45, 0); m.add(chair);
      // piernas
      for (const sx of [-1, 1]) {
        const th = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.34, 3, 8), dark);
        th.rotation.x = Math.PI / 2; th.position.set(sx * 0.12, 0.52, 0.2); m.add(th);
        const sh = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.38, 3, 8), dark);
        sh.position.set(sx * 0.12, 0.25, 0.4); m.add(sh);
      }
      // torso
      const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.32, 4, 10), dark);
      torso.position.set(0, 0.88, 0); torso.scale.z = 0.8; m.add(torso);
      const shirt = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.02), white);
      shirt.position.set(0, 0.9, 0.14); m.add(shirt);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 12, 10), skins[i % skins.length]);
      head.position.set(0, 1.32, 0.02); m.add(head);
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), new THREE.MeshStandardMaterial({ color: [0x151010, 0x2a1a10, 0x777777, 0x0b0b0b][i % 4], roughness: 0.9 }));
      hair.position.set(0, 1.34, 0); m.add(hair);
      // brazos
      const mkArm = (sx: number) => {
        const a = new THREE.Group();
        a.position.set(sx * 0.22, 1.1, 0);
        const up = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.24, 3, 6), dark); up.position.y = -0.17; a.add(up);
        const fa = new THREE.Group(); fa.position.y = -0.32; a.add(fa);
        const lo = new THREE.Mesh(new THREE.CapsuleGeometry(0.042, 0.22, 3, 6), dark); lo.position.y = -0.14; fa.add(lo);
        m.add(a);
        return { a, fa };
      };
      const L = mkArm(1), R = mkArm(-1);
      const reach = (arm: { a: THREE.Group; fa: THREE.Group }, x: number, f: number) => { arm.a.rotation.x = x; arm.fa.rotation.x = f; };
      if (kind === 'violin' || kind === 'viola') {
        const vl = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.36), violinWood); vl.position.set(0.16, 1.15, 0.22); vl.rotation.y = 0.3; m.add(vl);
        reach(L, -1.4, -1.0); reach(R, -0.9, -1.2);
        const bow = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.7, 4), white); bow.rotation.z = Math.PI / 2; bow.position.set(0.0, -0.22, 0.12); R.fa.add(bow);
        this.bows.push({ arm: R.a, phase: i * 0.8, amp: 0.18, axis: 'y' });
      } else if (kind === 'cello') {
        const c = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.55, 4, 10), violinWood); c.position.set(0, 0.7, 0.36); c.scale.z = 0.5; m.add(c);
        reach(L, -1.1, -0.6); reach(R, -0.8, -1.0);
        this.bows.push({ arm: R.a, phase: i * 0.5, amp: 0.22, axis: 'y' });
      } else if (kind === 'brass') {
        const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 6), gold); tube.rotation.x = Math.PI / 2; tube.position.set(0, 1.15, 0.38); m.add(tube);
        const bell = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.3, 14, 1, true), gold); bell.rotation.x = -Math.PI / 2; bell.position.set(0, 1.12, 0.78); (bell.material as THREE.Material).side = THREE.DoubleSide; m.add(bell);
        reach(L, -1.3, -1.1); reach(R, -1.3, -1.1);
      } else if (kind === 'timp') {
        const d = new THREE.Mesh(new THREE.SphereGeometry(0.4, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), copper); d.position.set(0, 0.55, 0.65); m.add(d);
        reach(L, -1.1, -0.5); reach(R, -1.1, -0.5);
        this.bows.push({ arm: L.a, phase: 0, amp: 0.5, axis: 'x' }); this.bows.push({ arm: R.a, phase: 1.5, amp: 0.5, axis: 'x' });
      } else if (kind === 'drum') {
        const d = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.3, 16), steel); d.position.set(0, 0.7, 0.55); m.add(d);
        reach(L, -1.0, -0.8); reach(R, -1.0, -0.8);
        this.bows.push({ arm: L.a, phase: 0, amp: 0.4, axis: 'x' }); this.bows.push({ arm: R.a, phase: 1, amp: 0.4, axis: 'x' });
      } else {
        reach(L, -0.8, -0.6); reach(R, -0.8, -0.6);
      }
      // atril
      const stand = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.03, 0.25), dark); stand.position.set(0, 1.0, 0.8); stand.rotation.x = -0.4; m.add(stand);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.8, 4), steel); leg.position.set(0, 0.6, 0.8); m.add(leg);
      m.traverse((o) => { (o as THREE.Mesh).castShadow = false; });
      this.group.add(m);
      this.bodies.push(m);
    };

    let n = 0;
    const row = (count: number, tier: number, width: number, kind: Parameters<typeof addMusician>[3]) => {
      for (let i = 0; i < count; i++) {
        const u = count === 1 ? 0 : i / (count - 1) - 0.5;
        const x = u * width;
        const z = -tier * 2.0 + Math.abs(u) * 0.9;
        addMusician(x, 0.45 * (tier + 1), z - 0.2, kind, n++);
      }
    };
    row(9, 0, 13, 'violin');
    row(7, 1, 15, 'viola');
    row(5, 2, 12, 'cello');
    row(8, 2, 22, 'brass');
    row(8, 3, 24, 'brass');
    row(2, 3, 6, 'timp');
    row(2, 3, 14, 'drum');

    // director
    const podium = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.4, 14), dark);
    podium.position.set(0, 0.25, 2.6); this.group.add(podium);
    const cb = new THREE.Group(); cb.position.set(0, 0.45, 2.6);
    const cbody = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.5, 4, 10), dark); cbody.position.y = 1.0; cb.add(cbody);
    const chead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), skins[1]); chead.position.y = 1.62; cb.add(chead);
    const lleg = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.7, 3, 8), dark); lleg.position.set(0.1, 0.4, 0); cb.add(lleg);
    const rleg = lleg.clone(); rleg.position.x = -0.1; cb.add(rleg);
    const arm = new THREE.Group(); arm.position.set(-0.24, 1.3, 0);
    const aup = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.28, 3, 6), dark); aup.position.y = -0.2; arm.add(aup);
    const baton = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.4, 4), white); baton.position.set(0, -0.5, 0.15); baton.rotation.x = 1.2; arm.add(baton);
    cb.add(arm);
    const larm = arm.clone(); larm.position.x = 0.24; cb.add(larm);
    this.conductor = arm;
    this.group.add(cb);
  }

  update(t: number, excite: number) {
    const tempo = 3.2 + excite * 1.5;
    for (const b of this.bows) {
      const v = Math.sin(t * tempo + b.phase);
      if (b.axis === 'y') b.arm.rotation.y = v * b.amp; else b.arm.rotation.x = -1.0 + v * b.amp;
    }
    this.conductor.rotation.x = -0.6 + Math.sin(t * tempo * 0.5) * 0.7;
    this.conductor.rotation.z = Math.sin(t * tempo * 0.25) * 0.3;
    this.bodies.forEach((b, i) => { b.rotation.z = Math.sin(t * tempo * 0.5 + i * 0.3) * 0.035; });
  }
}
