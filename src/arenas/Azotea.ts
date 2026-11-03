import * as THREE from 'three';
import { Arena, type ArenaOpts } from './Arena';
import { Crowd, type Seat } from './Crowd';
import { loopSeats, rrLoop } from './Seating';

const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const std = (color: number, roughness = 0.85, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

/** Textura de fachada con ventanas encendidas al azar */
export function windowsTexture(seed: number): THREE.CanvasTexture {
  const R = rng(seed);
  const c = document.createElement('canvas'); c.width = 128; c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = '#10131c'; g.fillRect(0, 0, 128, 256);
  for (let y = 8; y < 248; y += 16) for (let x = 8; x < 120; x += 16) {
    const on = R() < 0.42;
    g.fillStyle = on ? (R() < 0.7 ? '#ffd890' : R() < 0.5 ? '#9fd6ff' : '#ff9ac8') : '#1a1e2a';
    g.fillRect(x, y, 9, 10);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** Azotea de un bloque de las 3000 viviendas, de noche: ring improvisado, skyline, luces de verbena y viento. */
export class Azotea extends Arena {
  readonly id = 'azotea';
  readonly displayName = 'Azotea de las 3000';
  fogColor = 0x0a0e1c;
  fogDensity = 0.007;
  exposure = 1.15;
  private sheets: THREE.Mesh[] = [];
  private blink: THREE.Mesh[] = [];
  private bulbs: THREE.Mesh[] = [];

  constructor(opts: ArenaOpts) {
    super(opts, {
      canvas: 0x6a5a48, border: 0x3a3a46, accent: 0xe8b04a, rope: [0xc9a24a, 0x8a8a92, 0xc9a24a],
      skirt: 0x1a1612, apronText: 'LA AZOTEA · 3000 VIVIENDAS', ringText: 'ARRIBA',
    });
    const R = rng(55);
    const fm = this.floor.material as THREE.MeshStandardMaterial;
    fm.color.set(0x2a2b30); fm.roughness = 0.92; fm.metalness = 0.02;

    // --- cielo nocturno con luna y estrellas
    const sky = new THREE.Mesh(new THREE.SphereGeometry(190, 24, 12), new THREE.MeshBasicMaterial({ color: 0x0b1226, side: THREE.BackSide, fog: false, toneMapped: false }));
    this.group.add(sky);
    const sp = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) { const a = R() * Math.PI * 2, e = 0.12 + R() * 1.2; sp[i * 3] = Math.cos(a) * Math.cos(e) * 180; sp[i * 3 + 1] = Math.sin(e) * 180; sp[i * 3 + 2] = Math.sin(a) * Math.cos(e) * 180; }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    this.group.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xdfe8ff, size: 1.2, sizeAttenuation: false, fog: false, toneMapped: false })));
    const moon = new THREE.Mesh(new THREE.CircleGeometry(9, 32), new THREE.MeshBasicMaterial({ color: 0xf2f0e0, fog: false, toneMapped: false }));
    moon.position.set(60, 70, -130); moon.lookAt(0, 8, 0); this.group.add(moon);
    const halo = new THREE.Mesh(new THREE.CircleGeometry(22, 32), new THREE.MeshBasicMaterial({ color: 0x8aa0ff, transparent: true, opacity: 0.18, fog: false, toneMapped: false, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.position.copy(moon.position).add(new THREE.Vector3(0, 0, 0.5)); halo.lookAt(0, 8, 0); this.group.add(halo);

    // --- el skyline: bloques con ventanas
    const tex = [windowsTexture(1), windowsTexture(2), windowsTexture(3)];
    for (let i = 0; i < 70; i++) {
      const a = R() * Math.PI * 2, r = 34 + R() * 90;
      const w = 6 + R() * 10, d = 6 + R() * 10, h = 12 + R() * 55;
      const t = tex[i % 3].clone(); t.repeat.set(w / 8, h / 16); t.needsUpdate = true;
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.9, roughness: 1 }));
      b.position.set(Math.cos(a) * r, h / 2 - 22, Math.sin(a) * r);
      this.group.add(b);
      if (h > 40 && R() < 0.6) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.5, 6, 4), new THREE.MeshBasicMaterial({ color: 0xff3030, toneMapped: false })); l.position.set(b.position.x, h - 22 + 1, b.position.z); this.group.add(l); this.blink.push(l); }
    }

    // --- la azotea: antepecho (lo pone la barricada), antenas, depósitos de agua, chimeneas y tendederos
    const rust = std(0x6a4a3a, 0.8, 0.3), tank = std(0x8a8f98, 0.5, 0.6);
    const water = (x: number, z: number) => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 2.2, 16), tank); body.position.y = 3.2;
      const cap = new THREE.Mesh(new THREE.ConeGeometry(1.5, 0.7, 16), tank); cap.position.y = 4.65;
      for (const [lx, lz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 6), rust); leg.position.set(lx * 1.0, 1.1, lz * 1.0); g.add(leg); }
      g.add(body, cap); g.position.set(x, 0, z); g.traverse((o) => { (o as THREE.Mesh).castShadow = true; }); this.group.add(g);
    };
    water(-12.5, -10.5); water(13, 11);
    for (const [x, z] of [[11, -12], [-13, 9], [0, -14.5]]) { const c = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 1.6), std(0x4a3a34, 0.95)); c.position.set(x, 1.6, z); c.castShadow = true; this.group.add(c); }
    for (const [x, z, hh] of [[-14, -4, 7], [14.5, 4, 9]] as const) {
      const ant = new THREE.Group();
      ant.add(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, hh, 6), tank));
      for (let i = 0; i < 4; i++) { const bar = new THREE.Mesh(new THREE.BoxGeometry(1.6 - i * 0.3, 0.05, 0.05), tank); bar.position.y = hh / 2 - 0.4 - i * 0.7; ant.add(bar); }
      ant.position.set(x, hh / 2, z); this.group.add(ant);
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff3030, toneMapped: false })); l.position.set(x, hh + 0.1, z); this.group.add(l); this.blink.push(l);
    }
    // tendedero con sábanas que se mecen con el viento
    const lineMat = std(0xdddddd, 0.9);
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 22, 4), lineMat); cord.rotation.z = Math.PI / 2; cord.position.set(0, 3.1, -12.2); this.group.add(cord);
    for (const px of [-8, -4.5, -1, 2.5, 6, 9.5]) { const sh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.7, 4, 1), std([0xf2f2f2, 0xe8b0b0, 0xb0c8e8, 0xf0e0a0][Math.abs(px) % 4 | 0], 0.95, 0, { side: THREE.DoubleSide })); sh.position.set(px, 2.2, -12.2); this.group.add(sh); this.sheets.push(sh); }
    // verbena de bombillas
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffe0a0, toneMapped: false });
    for (const sz of [-1, 1]) for (let i = 0; i < 18; i++) {
      const x = -12 + i * (24 / 17);
      const sag = Math.sin((i / 17) * Math.PI) * 0.9;
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 4), bulbMat.clone()); b.position.set(x, 4.6 - sag, sz * 12.4); this.group.add(b); this.bulbs.push(b);
    }
    // mesa con cervezas y un sofá viejo
    const table = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 1.0), std(0x5a4a38, 0.8)); table.position.set(-11, 0.45, 6); table.castShadow = true; this.group.add(table);
    const sofa = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.8, 1.0), std(0x7a2a2a, 0.9)); sofa.position.set(11.5, 0.4, -4); sofa.rotation.y = -0.4; sofa.castShadow = true; this.group.add(sofa);

    // --- público de la vecindad, de pie y apretado en la valla
    const seats: Seat[] = loopSeats(rrLoop(8.9, 8.9, 1.6, 0.5), 0.4, 2, 0.9, 0, 0, 0.9, (x, z, row) => R() < 0.25, 0.5);
    this.crowd = new Crowd(seats, [0x1a1a22, 0x2b1a1a, 0x1b2438, 0x3a3a40, 0x5a1a1a, 0x2d7a46, 0xe8b04a, 0xe7e7e7], { near: () => true, seed: 31, flashes: 0 });
    this.group.add(this.crowd.group);

    // --- luz: foco de obra cálido sobre el ring + frío de luna
    this.key.color.set(0xffe2b0); this.key.intensity = 3.6; this.key.position.set(5, 16, 8); this.key.angle = 0.7; this.key.penumbra = 0.6;
    this.group.add(new THREE.HemisphereLight(0x6a7ab8, 0x1a1410, 0.45));
    const moonL = new THREE.DirectionalLight(0x8aa0ff, 0.5); moonL.position.set(30, 40, -50); this.group.add(moonL);
    const neon = new THREE.PointLight(0xff3ea5, 10, 16, 1.5); neon.position.set(-10, 3, 12); this.group.add(neon);

    this.anim.push((dt, t) => {
      this.sheets.forEach((s, i) => { s.rotation.y = Math.sin(t * 1.4 + i) * 0.35; s.scale.x = 1 + Math.sin(t * 2.2 + i * 2) * 0.08; });
      this.blink.forEach((b, i) => { b.visible = Math.sin(t * 2 + i * 1.7) > -0.2; });
      this.bulbs.forEach((b, i) => { (b.material as THREE.MeshBasicMaterial).color.setScalar(0.9 + 0.1 * Math.sin(t * 6 + i)).multiply(new THREE.Color(1, 0.88, 0.62)); });
      neon.intensity = 8 + Math.sin(t * 13) * Math.sin(t * 3) * 3;
    });
  }
}
