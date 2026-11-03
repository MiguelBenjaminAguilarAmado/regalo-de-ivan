import * as THREE from 'three';
import { Arena, LedScreen, type ArenaOpts } from './Arena';
import { Crowd } from './Crowd';
import { bowlGeometry, ellipseSeats } from './Seating';

const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const std = (color: number, roughness = 0.8, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

/** Estadio al aire libre de Santiago de Chile, de noche, con focos. De vez en cuando se va la luz. */
export class Santiago extends Arena {
  readonly id = 'santiago';
  readonly displayName = 'Estadio de Santiago';
  fogColor = 0x080c18;
  fogDensity = 0.007;
  exposure = 1.0;
  private lights: THREE.SpotLight[] = [];
  private lamps!: THREE.InstancedMesh;
  private dark = 0;     // 0 = luz normal, 1 = apagón total
  private darkTarget = 0;
  private baseKey = 1.5;
  private baseHemi!: THREE.HemisphereLight;

  constructor(opts: ArenaOpts) {
    super(opts, {
      canvas: 0xd9d2c2, border: 0x1c3f8c, accent: 0xc1272d, rope: [0xc1272d, 0xf2f2f2, 0x1c3f8c],
      skirt: 0x0d1633, apronText: 'EL HOYO · SANTIAGO DE CHILE', ringText: 'CHILE',
    });
    const R = rng(44);
    const q = opts.quality;
    const spacing = q === 'alta' ? 0.55 : q === 'media' ? 0.8 : 1.2;
    const fm = this.floor.material as THREE.MeshStandardMaterial;
    fm.color.set(0x1f5a2a); fm.roughness = 0.95; fm.metalness = 0;

    // --- el césped con sus franjas y la pista de atletismo
    const stripes = new THREE.Mesh(new THREE.PlaneGeometry(60, 40, 1, 1), new THREE.MeshBasicMaterial({ visible: false }));
    void stripes;
    for (let i = -5; i <= 5; i++) { const s = new THREE.Mesh(new THREE.PlaneGeometry(4, 38), new THREE.MeshStandardMaterial({ color: i % 2 ? 0x246a30 : 0x1c5226, roughness: 1 })); s.rotation.x = -Math.PI / 2; s.position.set(i * 4, 0.012, 0); s.receiveShadow = true; this.group.add(s); }
    const track = new THREE.Mesh(new THREE.RingGeometry(22, 28, 64), std(0x8a2a22, 0.9)); track.rotation.x = -Math.PI / 2; track.position.y = 0.015; track.scale.set(1.4, 1, 1); this.group.add(track);

    // --- las gradas con la hinchada
    const A0 = 25, B0 = 21, A1 = 62, B1 = 50, ROWS = 36, HMAX = 22;
    this.group.add(new THREE.Mesh(bowlGeometry(A0, B0, A1, B1, ROWS, HMAX, 0.2, q === 'baja' ? 96 : 140), std(0x1c1d24, 0.9, 0, { side: THREE.DoubleSide })));
    const seats = ellipseSeats({ a0: A0 + 0.5, b0: B0 + 0.5, a1: A1 - 1, b1: B1 - 1, rows: ROWS - 3, hMax: HMAX - 0.6, y0: 0.55, spacing, aisles: 12 });
    const ringside = ellipseSeats({ a0: 16, b0: 14, a1: 20, b1: 17.5, rows: 3, hMax: 0.1, y0: 0, spacing: spacing * 1.4, aisles: 6, seed: 2 });
    this.crowd = new Crowd([...ringside, ...seats], [0xc1272d, 0xf2f2f2, 0x1c3f8c, 0xc1272d, 0xf2f2f2, 0x1c3f8c, 0x111114, 0xe7b53b], {
      near: (s) => Math.abs(s.x) < 30 && Math.abs(s.z) < 24 && s.y < 3, seed: 29, flashes: q === 'baja' ? 150 : q === 'media' ? 400 : 900,
    });
    this.group.add(this.crowd.group);

    // --- torres de focos
    const towerMat = std(0x30343c, 0.5, 0.8);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const x = Math.cos(a) * 58, z = Math.sin(a) * 46;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.9, 34, 8), towerMat); pole.position.set(x, 17, z); this.group.add(pole);
      const head = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 1), std(0x15181e, 0.4, 0.6)); head.position.set(x, 35, z); head.lookAt(0, 8, 0); this.group.add(head);
      const spot = new THREE.SpotLight(0xfff4e0, 1.1, 120, 0.5, 0.6, 0); spot.position.set(x, 34, z); spot.target.position.set(0, 1, 0); this.group.add(spot, spot.target); this.lights.push(spot);
    }
    // marcador gigante y banderas de Chile
    this.addScreen(new LedScreen(24, 9, ['#0e2650', '#4b0d12', '#ffffff'], 'SANTIAGO DE CHILE'), 0, 22, -52, [0, 8, 0]);
    this.addScreen(new LedScreen(18, 7, ['#4b0d12', '#0e2650', '#ffcf4a'], 'EL GAUNTLET'), -50, 18, 22, [0, 8, 0]);
    for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; const f = new THREE.Group(); const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 5, 6), towerMat); pole.position.y = 2.5; const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6, 2, 1), std(0xc1272d, 0.9, 0, { side: THREE.DoubleSide })); flag.position.set(1.2, 4.2, 0); const blue = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.8), std(0x1c3f8c, 0.9, 0, { side: THREE.DoubleSide })); blue.position.set(0.45, 4.6, 0.01); const white = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.8), std(0xf2f2f2, 0.9, 0, { side: THREE.DoubleSide })); white.position.set(1.65, 4.6, 0.01); f.add(pole, flag, blue, white); f.position.set(Math.cos(a) * 31, 0, Math.sin(a) * 25); f.rotation.y = -a; this.group.add(f); }
    // cielo con estrellas
    const sky = new THREE.Mesh(new THREE.SphereGeometry(190, 24, 12), new THREE.MeshBasicMaterial({ color: 0x080d1c, side: THREE.BackSide, fog: false, toneMapped: false })); this.group.add(sky);
    const sp = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) { const a = R() * Math.PI * 2, e = 0.2 + R() * 1.2; sp[i * 3] = Math.cos(a) * Math.cos(e) * 180; sp[i * 3 + 1] = Math.sin(e) * 180; sp[i * 3 + 2] = Math.sin(a) * Math.cos(e) * 180; }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    this.group.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xe8f0ff, size: 1.2, sizeAttenuation: false, fog: false, toneMapped: false })));
    // lámparas del borde del estadio
    const lampGeo = new THREE.SphereGeometry(0.4, 8, 6);
    this.lamps = new THREE.InstancedMesh(lampGeo, new THREE.MeshBasicMaterial({ color: 0xfff0d0, toneMapped: false }), 40);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < 40; i++) { const a = (i / 40) * Math.PI * 2; m4.setPosition(Math.cos(a) * 63, 23.5, Math.sin(a) * 51); this.lamps.setMatrixAt(i, m4); }
    this.group.add(this.lamps);

    this.key.intensity = this.baseKey;
    this.baseHemi = new THREE.HemisphereLight(0x8aa0d8, 0x101018, 0.3);
    this.group.add(this.baseHemi);
    this.anim.push((dt) => {
      // transición suave de luz a oscuridad (y titileo al volver)
      this.dark += (this.darkTarget - this.dark) * Math.min(1, dt * 14);
      const k = 1 - this.dark * 0.93;
      this.key.intensity = this.baseKey * k;
      for (const l of this.lights) l.intensity = 1.1 * k;
      this.baseHemi.intensity = 0.3 * (1 - this.dark * 0.8);
      (this.lamps.material as THREE.MeshBasicMaterial).color.setScalar(1 - this.dark * 0.9);
    });
  }

  setBlackout(on: boolean) { this.darkTarget = on ? 1 : 0; }
}
