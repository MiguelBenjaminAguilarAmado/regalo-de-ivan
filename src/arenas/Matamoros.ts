import * as THREE from 'three';
import { Arena, Beam, LedScreen, type ArenaOpts } from './Arena';
import { Crowd } from './Crowd';
import { bowlGeometry, ellipseSeats } from './Seating';
import { Orchestra } from './Orchestra';

const A0 = 17, B0 = 14.5, A1 = 64, B1 = 52, ROWS = 58, HMAX = 28;

/** Pabellón enorme de 30.000 personas, con la orquesta en la esquina derecha superior. */
export class Matamoros extends Arena {
  readonly id = 'matamoros';
  readonly displayName = 'Matamoros';
  orchestra: Orchestra;
  orchestraSpot = new THREE.Vector3();
  fogDensity = 0.0075;

  constructor(opts: ArenaOpts) {
    super(opts, {
      canvas: 0xc9c2b4, border: 0x8f1d1d, accent: 0xe7b53b, rope: [0xe7b53b, 0xf2f2f2, 0x8f1d1d],
      skirt: 0x1a1313, apronText: 'EL HOYO WRESTLING · TEMPORADA 4', ringText: 'MATAMOROS',
    });
    const q = opts.quality;
    const spacing = q === 'alta' ? 0.5 : q === 'media' ? 0.7 : 1.1;

    // --- gradas de cemento
    const bowl = new THREE.Mesh(
      bowlGeometry(A0, B0, A1, B1, ROWS, HMAX, 0.2, q === 'baja' ? 96 : 160),
      new THREE.MeshStandardMaterial({ color: 0x1b1c24, roughness: 0.85, side: THREE.DoubleSide }),
    );
    bowl.receiveShadow = false;
    this.group.add(bowl);

    // --- orquesta (esquina derecha superior = +x, -z, alto)
    const ox = 40, oz = -31;
    let ty = 0.5;
    for (let t = 0; t <= 1; t += 0.005) {
      const a = A0 + (A1 - A0) * t, b = B0 + (B1 - B0) * t;
      if ((ox / a) ** 2 + (oz / b) ** 2 <= 1) { ty = t; break; }
    }
    const oy = 0.2 + HMAX * Math.pow(ty, 1.1) - 0.35;
    this.orchestra = new Orchestra();
    this.orchestra.group.position.set(ox, oy, oz);
    this.orchestra.group.rotation.y = Math.atan2(-ox, -oz); // mira al ring
    this.orchestra.group.scale.setScalar(1.35);
    this.group.add(this.orchestra.group);
    this.orchestraSpot.set(ox, oy + 6, oz);
    const warm = new THREE.SpotLight(0xffc27a, 1, 0, 0.6, 0.6, 0);
    warm.position.set(ox - 8, oy + 20, oz + 6);
    warm.target.position.set(ox, oy + 1, oz);
    warm.intensity = 4;
    this.group.add(warm, warm.target);

    // --- público: butacas de pista + gradas
    const ringside = ellipseSeats({ a0: 11.5, b0: 10.5, a1: 16.5, b1: 14, rows: 6, hMax: 0.15, y0: 0, spacing: spacing * 1.4, aisles: 8, seed: 1 });
    const stands = ellipseSeats({
      a0: A0 + 0.5, b0: B0 + 0.5, a1: A1 - 1, b1: B1 - 1, rows: ROWS - 3, hMax: HMAX - 0.6, y0: 0.55, spacing, aisles: 10,
      skip: (x, z) => Math.hypot(x - ox, z - oz) < 9.5 && z < -12,
    });
    // la fila exterior se saltaría el hormigón: se eleva con la grada
    const seats = [...ringside, ...stands];
    this.crowd = new Crowd(seats, [0x111114, 0x1a1a22, 0x23262e, 0x2b1a1a, 0x1b2438, 0x3a3a40, 0x111114, 0x1a1a22, 0xb3262b, 0xe7e7e7, 0x1c3f8c, 0xe7b53b, 0x2d7a46], {
      near: (s) => Math.abs(s.x) < 24 && Math.abs(s.z) < 20 && s.y < 3,
      seed: 11, flashes: q === 'baja' ? 150 : q === 'media' ? 400 : 900,
    });
    this.group.add(this.crowd.group);

    // --- cúpula, truss, pantallas y luces
    const dome = new THREE.Mesh(new THREE.SphereGeometry(80, 40, 18, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x07070b, roughness: 0.95, side: THREE.BackSide }));
    dome.scale.set(1.0, 0.55, 0.85);
    dome.position.y = 30;
    this.group.add(dome);
    const truss = new THREE.Mesh(new THREE.TorusGeometry(24, 0.5, 8, 64), new THREE.MeshStandardMaterial({ color: 0x23242a, roughness: 0.5, metalness: 0.7 }));
    truss.rotation.x = Math.PI / 2; truss.position.y = 36;
    this.group.add(truss);
    const lampGeo = new THREE.SphereGeometry(0.45, 10, 8);
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xfff0d0, toneMapped: false });
    const lamps = new THREE.InstancedMesh(lampGeo, lampMat, 36);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2; m4.setPosition(Math.cos(a) * 24, 35.4, Math.sin(a) * 24); lamps.setMatrixAt(i, m4); }
    this.group.add(lamps);

    // videomarcador colgante
    const cube = new THREE.Mesh(new THREE.BoxGeometry(15, 7, 15), new THREE.MeshStandardMaterial({ color: 0x0c0c10, roughness: 0.4, metalness: 0.5 }));
    cube.position.y = 29;
    this.group.add(cube);
    const pals: [string, string, string][] = [['#4b0d12', '#1a1a2a', '#ffcf4a'], ['#102a5a', '#4b0d12', '#ff6a5a'], ['#2a0f3a', '#101a2a', '#6ee0ff'], ['#3a2a08', '#220808', '#ffffff']];
    [[0, 7.55, 0], [Math.PI, -7.55, 0], [Math.PI / 2, 0, 7.55], [-Math.PI / 2, 0, -7.55]].forEach(([ry, x, z], i) => {
      const s = new LedScreen(14, 6.2, pals[i]);
      s.mesh.position.set(x as number, 29, z as number);
      s.mesh.rotation.y = ry as number;
      if (i < 2) { s.mesh.position.set(0, 29, i === 0 ? 7.55 : -7.55); s.mesh.rotation.y = i === 0 ? 0 : Math.PI; }
      else { s.mesh.position.set(i === 2 ? 7.55 : -7.55, 29, 0); s.mesh.rotation.y = i === 2 ? Math.PI / 2 : -Math.PI / 2; }
      this.group.add(s.mesh); this.screens.push(s);
    });
    // pantalla grande frente a la cámara y al fondo
    this.addScreen(new LedScreen(26, 11, ['#4b0d12', '#150b1a', '#ffcf4a'], 'EL HOYO · TEMPORADA 4'), 0, 18, -44, [0, 8, 0]);
    this.addScreen(new LedScreen(22, 9, ['#0e2650', '#150b1a', '#6ee0ff']), -42, 14, -14, [0, 8, 0]);

    // haces de luz
    const colors = [0xff5a4a, 0x6ab6ff, 0xffd45e, 0xc58bff];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      this.addBeam(new Beam(colors[i % 4], 40, 2.2, i, 0.6 + (i % 3) * 0.15, 0.22), Math.cos(a) * 24, 35.5, Math.sin(a) * 24);
    }
    // luces de relleno de color (sin sombras)
    const rim: [number, number, number, number][] = [[0xff3a3a, -16, 18, -14], [0x3a7bff, 16, 18, -14], [0xffc24a, -16, 18, 16], [0xb35aff, 16, 18, 16]];
    for (const [c, x, y, z] of rim) {
      const l = new THREE.SpotLight(c, 2.0, 34, 0.42, 0.8, 0);
      l.position.set(x, y, z); l.target.position.set(0, 1, 0);
      this.group.add(l, l.target);
    }
    this.key.intensity = 3.4;
    this.anim.push((dt, t) => this.orchestra.update(t, 0.5 + 0.2 * Math.sin(t * 0.3)));
  }
}
