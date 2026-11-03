import * as THREE from 'three';
import { Arena, type ArenaOpts } from './Arena';
import { Crowd, type Seat } from './Crowd';
import { loopSeats, rrLoop } from './Seating';

const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const std = (color: number, roughness = 0.85, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

/** Playa de Honduras de noche: ring sobre la arena, luna sobre el mar, antorchas tiki y una hoguera. */
export class Playa extends Arena {
  readonly id = 'playa';
  readonly displayName = 'Playa de Honduras';
  fogColor = 0x0d2232;
  fogDensity = 0.008;
  exposure = 1.05;
  private torches: { light: THREE.PointLight; flame: THREE.Mesh; ph: number }[] = [];
  private foam: THREE.Mesh[] = [];
  private sea!: THREE.Mesh;
  private leaves: THREE.Group[] = [];

  constructor(opts: ArenaOpts) {
    super(opts, {
      canvas: 0xd9c89a, border: 0x1d6a8a, accent: 0xf2c14e, rope: [0xe8573a, 0xf2f2f2, 0x1d9ab0],
      skirt: 0x14394a, apronText: 'EL HOYO · PLAYA DE HONDURAS', ringText: 'HONDURAS',
    }, false);
    const R = rng(77);
    const fm = this.floor.material as THREE.MeshStandardMaterial;
    fm.color.set(0x9c8860); fm.roughness = 1; fm.metalness = 0;

    // --- cielo, luna y estrellas
    const sky = new THREE.Mesh(new THREE.SphereGeometry(190, 24, 12), new THREE.MeshBasicMaterial({ color: 0x0a1830, side: THREE.BackSide, fog: false, toneMapped: false }));
    this.group.add(sky);
    const sp = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) { const a = R() * Math.PI * 2, e = 0.1 + R() * 1.3; sp[i * 3] = Math.cos(a) * Math.cos(e) * 180; sp[i * 3 + 1] = Math.sin(e) * 180; sp[i * 3 + 2] = Math.sin(a) * Math.cos(e) * 180; }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    this.group.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xe8f0ff, size: 1.3, sizeAttenuation: false, fog: false, toneMapped: false })));
    const moon = new THREE.Mesh(new THREE.CircleGeometry(10, 32), new THREE.MeshBasicMaterial({ color: 0xfff6d8, fog: false, toneMapped: false }));
    moon.position.set(-20, 40, -140); moon.lookAt(0, 6, 0); this.group.add(moon);
    const halo = new THREE.Mesh(new THREE.CircleGeometry(26, 32), new THREE.MeshBasicMaterial({ color: 0x9ac8ff, transparent: true, opacity: 0.2, fog: false, toneMapped: false, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.position.copy(moon.position).add(new THREE.Vector3(0, 0, 0.5)); halo.lookAt(0, 6, 0); this.group.add(halo);

    // --- el mar al fondo (-z) con el reflejo de la luna y la espuma de las olas
    this.sea = new THREE.Mesh(new THREE.PlaneGeometry(400, 110), std(0x0e3a58, 0.25, 0.3, { emissive: 0x06223a, emissiveIntensity: 0.5 }));
    this.sea.rotation.x = -Math.PI / 2; this.sea.position.set(0, -0.12, -80); this.group.add(this.sea);
    const glint = new THREE.Mesh(new THREE.PlaneGeometry(6, 90), new THREE.MeshBasicMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0.35, fog: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    glint.rotation.x = -Math.PI / 2; glint.position.set(-8, -0.05, -75); this.group.add(glint);
    for (let i = 0; i < 6; i++) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(220, 0.7), new THREE.MeshBasicMaterial({ color: 0xf2fbff, transparent: true, opacity: 0.5, depthWrite: false }));
      f.rotation.x = -Math.PI / 2; f.position.set(0, -0.04, -26 - i * 9); this.group.add(f); this.foam.push(f);
    }

    // --- palmeras
    const trunkMat = std(0x6a4a2a, 0.9), leafMat = std(0x1d6a3a, 0.8, 0, { side: THREE.DoubleSide });
    const palm = (x: number, z: number, h: number, lean: number) => {
      const g = new THREE.Group();
      for (let i = 0; i < 6; i++) {
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.2 - i * 0.015, 0.23 - i * 0.015, h / 6 + 0.05, 8), trunkMat);
        seg.position.set(Math.sin(lean) * (i * h) / 12, (i + 0.5) * (h / 6), 0); seg.rotation.z = -lean * 0.6; seg.castShadow = true; g.add(seg);
      }
      const top = new THREE.Group(); top.position.set(Math.sin(lean) * h / 2.1, h, 0);
      for (let i = 0; i < 8; i++) {
        const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 3.2, 1, 3), leafMat);
        leaf.position.set(Math.cos((i / 8) * Math.PI * 2) * 1.2, -0.2, Math.sin((i / 8) * Math.PI * 2) * 1.2);
        leaf.rotation.set(Math.sin((i / 8) * Math.PI * 2) * 0.9 + 0.15, -(i / 8) * Math.PI * 2, Math.cos((i / 8) * Math.PI * 2) * 0.9);
        top.add(leaf);
      }
      for (let i = 0; i < 3; i++) { const c = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), std(0x5a3a1a)); c.position.set((i - 1) * 0.25, -0.3, 0.15); top.add(c); }
      g.add(top); this.leaves.push(top);
      g.position.set(x, 0, z); this.group.add(g);
    };
    for (let i = 0; i < 14; i++) { const a = R() * Math.PI + Math.PI * 0.05; const r = 15 + R() * 22; palm(Math.cos(a) * r, Math.sin(a) * r, 7 + R() * 4, (R() - 0.5) * 0.5); }

    // --- chiringuito tiki con techo de paja (detrás, +z)
    const bar = new THREE.Group();
    const wood = std(0x6a4a2a, 0.85);
    const counter = new THREE.Mesh(new THREE.BoxGeometry(9, 1.2, 1.3), wood); counter.position.y = 0.6; bar.add(counter);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(6.5, 2.4, 4), std(0x9a7a3a, 1)); roof.position.y = 4.6; roof.rotation.y = Math.PI / 4; roof.scale.set(1.15, 1, 0.55); bar.add(roof);
    for (const sx of [-4.2, 4.2]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 4, 8), wood); p.position.set(sx, 2, 0.5); bar.add(p); }
    bar.traverse((o) => { (o as THREE.Mesh).castShadow = true; });
    bar.position.set(-4, 0, 20); bar.rotation.y = Math.PI; this.group.add(bar);
    const bottleCols = [0xe8573a, 0x2d9a6a, 0xf2c14e, 0x3a7ad8];
    for (let i = 0; i < 10; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.34, 8), std(bottleCols[i % 4], 0.2, 0.1)); b.position.set(-4 + (i - 4.5) * 0.7, 1.4, 19.6); this.group.add(b); }

    // --- antorchas tiki y hoguera
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xff9a2a, transparent: true, opacity: 0.92, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    const torch = (x: number, z: number, big = false) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, big ? 0.3 : 2.4, 6), wood); pole.position.set(x, big ? 0.15 : 1.2, z); this.group.add(pole);
      const fl = new THREE.Mesh(new THREE.ConeGeometry(big ? 0.7 : 0.11, big ? 1.8 : 0.32, 8), flameMat); fl.position.set(x, big ? 1.0 : 2.65, z); this.group.add(fl);
      const l = new THREE.PointLight(0xff8a30, big ? 22 : 7, big ? 24 : 11, 1.5); l.position.set(x, big ? 1.6 : 2.7, z); this.group.add(l);
      this.torches.push({ light: l, flame: fl, ph: x + z });
    };
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; torch(Math.cos(a) * 11.5, Math.sin(a) * 11.5); }
    torch(14, 3, true);
    for (let i = 0; i < 6; i++) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.4, 6), std(0x3a2410)); l.position.set(14 + Math.cos(i) * 0.5, 0.2, 3 + Math.sin(i) * 0.5); l.rotation.set(Math.PI / 2 - 0.4, i, 0); this.group.add(l); }

    // --- público: turistas y vecinos, de pie en corro
    const seats: Seat[] = loopSeats(rrLoop(8.3, 8.3, 1.8, 0.5), 0.5, 3, 0.95, 0, 0, 0.85, (x, z, row) => R() < 0.2 + row * 0.05, 0.5);
    this.crowd = new Crowd(seats, [0xe8573a, 0xf2c14e, 0x1d9ab0, 0xe7e7e7, 0x2d7a46, 0xd86aa0, 0x3a7ad8], { near: () => true, seed: 13, flashes: 0 });
    this.group.add(this.crowd.group);

    // --- luz de luna + cálida de las antorchas
    this.key.color.set(0xcfe0ff); this.key.intensity = 3.2; this.key.position.set(-12, 22, 10);
    this.key.angle = 0.7; this.key.penumbra = 0.6;
    this.group.add(new THREE.HemisphereLight(0x6a90c8, 0x2a2014, 0.5));

    this.anim.push((dt, t) => {
      for (const f of this.torches) { const k = 0.85 + 0.25 * Math.sin(t * 12 + f.ph) + 0.1 * Math.sin(t * 25 + f.ph * 2); f.light.intensity = (f.light.distance > 15 ? 22 : 7) * k; f.flame.scale.set(1, k, 1); }
      this.foam.forEach((f, i) => { f.position.z = -26 - i * 9 + Math.sin(t * 0.5 + i * 1.3) * 2.2; (f.material as THREE.MeshBasicMaterial).opacity = 0.25 + 0.3 * (0.5 + 0.5 * Math.sin(t * 0.5 + i * 1.3)); });
      this.leaves.forEach((l, i) => { l.rotation.y = Math.sin(t * 0.8 + i) * 0.12; l.rotation.z = Math.sin(t * 1.1 + i * 2) * 0.05; });
    });
  }
}
