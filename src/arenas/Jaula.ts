import * as THREE from 'three';
import { RING, RING_Y } from '../combat/Match';
import { Arena, Beam, LedScreen, type ArenaOpts } from './Arena';
import { Crowd } from './Crowd';
import { bowlGeometry, ellipseSeats } from './Seating';

const std = (color: number, roughness = 0.6, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

/** Pabellón profesional con una jaula de acero alrededor del ring: no hay salida. */
export class Jaula extends Arena {
  readonly id = 'jaula';
  readonly displayName = 'Jaula de Acero';
  fogColor = 0x0a0507;
  fogDensity = 0.011;
  exposure = 1.05;
  private strobes: THREE.PointLight[] = [];

  constructor(opts: ArenaOpts) {
    super(opts, {
      canvas: 0x4a4a52, border: 0x7a1010, accent: 0xd8dde6, rope: [0x8a1a1a, 0x8a8a92, 0x8a1a1a],
      skirt: 0x120c0d, apronText: 'EL HOYO · LA JAULA', ringText: 'ACERO',
    });
    const q = opts.quality;
    const spacing = q === 'alta' ? 0.55 : q === 'media' ? 0.8 : 1.2;
    const fm = this.floor.material as THREE.MeshStandardMaterial;
    fm.color.set(0x0d0b0c); fm.roughness = 0.45; fm.metalness = 0.4;

    // --- la jaula: reja de barras verticales + travesaños + postes en las esquinas
    const steel = std(0x9aa1ad, 0.35, 0.85);
    const dark = std(0x2a2d33, 0.5, 0.8);
    const H = 3.7, X = RING + 0.02;
    const barGeo = new THREE.CylinderGeometry(0.022, 0.022, H, 6);
    const per = 33;
    const bars = new THREE.InstancedMesh(barGeo, steel, per * 4);
    const m4 = new THREE.Matrix4();
    let k = 0;
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < per; i++) {
        const u = -X + (i / (per - 1)) * X * 2;
        const [x, z] = side === 0 ? [u, X] : side === 1 ? [u, -X] : side === 2 ? [X, u] : [-X, u];
        m4.setPosition(x, RING_Y + 0.35 + H / 2, z);
        bars.setMatrixAt(k++, m4);
      }
    }
    bars.castShadow = true;
    this.group.add(bars);
    // travesaños
    for (const h of [0.55, 1.4, 2.3, 3.15, 4.0]) {
      for (const [x, z, ry] of [[0, X, 0], [0, -X, 0], [X, 0, Math.PI / 2], [-X, 0, Math.PI / 2]] as const) {
        const r = new THREE.Mesh(new THREE.BoxGeometry(X * 2 + 0.1, 0.06, 0.06), dark);
        r.position.set(x, RING_Y + h, z); r.rotation.y = ry; r.castShadow = true;
        this.group.add(r);
      }
    }
    // postes gruesos y techo de la jaula
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, H + 0.9, 10), dark);
      p.position.set(sx * X, RING_Y + (H + 0.9) / 2, sz * X); p.castShadow = true; this.group.add(p);
    }
    const lid = new THREE.Mesh(new THREE.BoxGeometry(X * 2 + 0.2, 0.1, X * 2 + 0.2), new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.5, metalness: 0.8, wireframe: true }));
    lid.position.y = RING_Y + H + 0.9; this.group.add(lid);
    // puerta
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.4, 0.05), std(0x6a1212, 0.5, 0.6, { transparent: true, opacity: 0.55 }));
    door.position.set(0.0, RING_Y + 1.5, X + 0.04); this.group.add(door);

    // --- gradas del pabellón
    const A0 = 14, B0 = 12.5, A1 = 46, B1 = 38, ROWS = 36, HMAX = 18;
    const bowl = new THREE.Mesh(bowlGeometry(A0, B0, A1, B1, ROWS, HMAX, 0.2, q === 'baja' ? 80 : 128), std(0x16161c, 0.9, 0, { side: THREE.DoubleSide }));
    this.group.add(bowl);
    const ringside = ellipseSeats({ a0: 10.5, b0: 9.8, a1: 13.2, b1: 12, rows: 3, hMax: 0.1, y0: 0, spacing: spacing * 1.4, aisles: 6, seed: 3 });
    const stands = ellipseSeats({ a0: A0 + 0.5, b0: B0 + 0.5, a1: A1 - 1, b1: B1 - 1, rows: ROWS - 3, hMax: HMAX - 0.6, y0: 0.55, spacing, aisles: 8 });
    this.crowd = new Crowd([...ringside, ...stands], [0x111114, 0x1a1a22, 0x2b1a1a, 0x5a1010, 0x1b2438, 0xb3262b, 0xe7e7e7, 0x3a3a40], {
      near: (s) => Math.abs(s.x) < 20 && Math.abs(s.z) < 17 && s.y < 3, seed: 17, flashes: q === 'baja' ? 120 : q === 'media' ? 300 : 700,
    });
    this.group.add(this.crowd.group);

    // --- cúpula, pantallas y luces estroboscópicas rojas
    const dome = new THREE.Mesh(new THREE.SphereGeometry(60, 32, 14, 0, Math.PI * 2, 0, Math.PI / 2), std(0x060407, 0.95, 0, { side: THREE.BackSide }));
    dome.scale.set(1, 0.5, 0.85); dome.position.y = 22; this.group.add(dome);
    const cube = new THREE.Mesh(new THREE.BoxGeometry(9, 4.2, 9), std(0x0c0c10, 0.4, 0.5));
    cube.position.y = 20; this.group.add(cube);
    const pals: [string, string, string][] = [['#4b0d12', '#1a0a0a', '#ff4a3a'], ['#1a1a24', '#4b0d12', '#d8dde6'], ['#3a0a0a', '#120808', '#ffcf4a'], ['#101820', '#4b0d12', '#ff6a5a']];
    for (let i = 0; i < 4; i++) {
      const s = new LedScreen(8.2, 3.7, pals[i], i % 2 ? 'LA JAULA' : 'SIN SALIDA');
      const a = (i / 4) * Math.PI * 2;
      s.mesh.position.set(Math.sin(a) * 4.55, 20, Math.cos(a) * 4.55); s.mesh.rotation.y = a;
      this.group.add(s.mesh); this.screens.push(s);
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      this.addBeam(new Beam(i % 2 ? 0xff3a3a : 0xffffff, 26, 1.7, i, 0.7 + (i % 3) * 0.2, 0.25), Math.cos(a) * 14, 24, Math.sin(a) * 14);
    }
    for (const [c, x, z] of [[0xff2a2a, -12, -9], [0xff2a2a, 12, -9], [0xffffff, -12, 10], [0xffffff, 12, 10]] as const) {
      const l = new THREE.SpotLight(c, 2.4, 40, 0.5, 0.8, 0); l.position.set(x, 14, z); l.target.position.set(0, 1, 0);
      this.group.add(l, l.target);
      if (c === 0xff2a2a) { const pl = new THREE.PointLight(0xff2a2a, 0, 16, 1.5); pl.position.set(x * 0.5, 7, z * 0.5); this.group.add(pl); this.strobes.push(pl); }
    }
    this.key.intensity = 3.2;
    this.anim.push((dt, t) => { this.strobes.forEach((l, i) => { l.intensity = Math.max(0, Math.sin(t * 5 + i * 2)) ** 8 * 40; }); });
  }
}
