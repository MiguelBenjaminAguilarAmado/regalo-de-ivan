import * as THREE from 'three';
import { Arena, Beam, LedScreen, type ArenaOpts } from './Arena';
import { Crowd } from './Crowd';
import { loopSeats, ribbon, rrLoop } from './Seating';
import { Tubeman } from './Tubeman';

/** "La correa from Manchester": teatro gigante de 60.000 personas con dos columnas enormes. */
export class Manchester extends Arena {
  readonly id = 'manchester';
  readonly displayName = 'Manchester';
  tubeman: Tubeman;
  fogDensity = 0.0055;
  columns: THREE.Object3D[] = [];

  constructor(opts: ArenaOpts) {
    super(opts, {
      canvas: 0x2a2a30, border: 0xa11a2a, accent: 0xd9b45a, rope: [0xa11a2a, 0xf2f2f2, 0x3a6fe0],
      skirt: 0x5a0f1a, apronText: 'LA CORREA FROM MANCHESTER', ringText: 'MANCHESTER',
    });
    const q = opts.quality;
    const spacing = q === 'alta' ? 0.5 : q === 'media' ? 0.7 : 1.1;
    const step = 0.5;

    const gold = new THREE.MeshStandardMaterial({ color: 0xb98d3e, roughness: 0.35, metalness: 0.85, emissive: 0x3a2508, emissiveIntensity: 0.45 });
    const velvet = new THREE.MeshStandardMaterial({ color: 0x5a0d19, roughness: 0.9, side: THREE.DoubleSide });
    const slab = new THREE.MeshStandardMaterial({ color: 0x1a1618, roughness: 0.8, side: THREE.DoubleSide });
    const cream = new THREE.MeshStandardMaterial({ color: 0x8b7a5a, roughness: 0.7, emissive: 0x1a1408, emissiveIntensity: 0.4, side: THREE.DoubleSide });

    // ---- contorno del teatro
    const HW = 38, HD = 34, R = 10;
    const wall = rrLoop(HW, HD, R, step);
    const hall = ribbon(wall, 0, 0, 0, 36, velvet);
    this.group.add(hall);
    // techo artesonado
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(HW * 2, HD * 2), new THREE.MeshStandardMaterial({ color: 0x1d1012, roughness: 0.9 }));
    ceil.rotation.x = Math.PI / 2; ceil.position.y = 36;
    this.group.add(ceil);
    for (let i = -3; i <= 3; i++) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, HD * 2), gold);
      beam.position.set(i * 10, 35.5, 0); this.group.add(beam);
    }
    // ---- stalls (patio de butacas) en suelo, rodeando el ring
    const stallsLoop = rrLoop(13, 11.5, 3, step);
    const colRadius = 3.6;
    const colPos: [number, number][] = [[-27, -10], [27, -10]];
    const TUBE = { x: -9.5, z: -14.6 };
    const skipCols = (x: number, z: number) => colPos.some(([cx, cz]) => Math.hypot(x - cx, z - cz) < colRadius) || Math.hypot(x - TUBE.x, z - TUBE.z) < 1.5;
    const stalls = loopSeats(stallsLoop, 0, 12, 0.95, 0.02, 0.11, spacing, (x, z) => skipCols(x, z) || (Math.abs(x) < 0.9) || (Math.abs(z) < 0.9), step);

    // ---- balcones: 4 niveles, cada uno más hacia fuera
    const balc = rrLoop(25.5, 22.5, 8, step);
    let seats = stalls;
    for (let j = 0; j < 4; j++) {
      const y = 5.4 + j * 5.7;
      const d0 = j * 1.6;
      const depth = 5.0;
      // suelo del balcón
      this.group.add(ribbon(balc, d0, y - 0.45, d0 + depth + 0.2, y - 0.45, slab));
      // frontal ornamentado
      this.group.add(ribbon(balc, d0, y - 0.45, d0, y + 0.95, cream));
      const rail = ribbon(balc, d0 - 0.05, y + 0.95, d0 - 0.05, y + 1.1, gold);
      this.group.add(rail);
      // fachada hacia abajo
      this.group.add(ribbon(balc, d0, y - 2.6, d0, y - 0.45, velvet));
      this.group.add(ribbon(balc, d0 - 0.02, y - 0.7, d0 - 0.02, y - 0.5, gold));
      // asientos (3 filas escalonadas)
      seats = seats.concat(loopSeats(balc, d0 + 0.9, 4, 1.0, y - 0.3, 0.38, spacing, (x, z) => skipCols(x, z), step));
      // pared de fondo con palcos
      this.group.add(ribbon(balc, d0 + depth + 0.2, y - 0.45, d0 + depth + 0.2, y + 3.8, velvet));
    }

    // ---- columnas gigantes
    for (const [cx, cz] of colPos) {
      const col = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.7, 33, 28), new THREE.MeshStandardMaterial({ color: 0xc2a15a, roughness: 0.4, metalness: 0.7, emissive: 0x2a1c06, emissiveIntensity: 0.5 }));
      shaft.position.y = 16.5; shaft.castShadow = false;
      col.add(shaft);
      for (let k = 0; k < 14; k++) { // estrías
        const a = (k / 14) * Math.PI * 2;
        const flute = new THREE.Mesh(new THREE.BoxGeometry(0.16, 32, 0.12), gold);
        flute.position.set(Math.cos(a) * 1.62, 16.5, Math.sin(a) * 1.62); flute.rotation.y = -a;
        col.add(flute);
      }
      const base = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.2, 4.4), gold); base.position.y = 0.6; col.add(base);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(5, 1.6, 5), gold); cap.position.y = 33.5; col.add(cap);
      const cap2 = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 1.7, 1.6, 20), gold); cap2.position.y = 32; col.add(cap2);
      col.position.set(cx, 0, cz);
      this.group.add(col);
      this.columns.push(col);
    }

    // ---- público
    this.crowd = new Crowd(seats, [0x111114, 0x1a1a22, 0x23262e, 0x15161c, 0x3a3a40, 0xa11a2a, 0xa11a2a, 0xe7e7e7, 0x2a4e9c, 0xd9b45a, 0x6aa3e0, 0x8a1020], {
      near: (s) => s.y < 2.5 && Math.hypot(s.x, s.z) < 20,
      seed: 5, flashes: q === 'baja' ? 150 : q === 'media' ? 450 : 1000,
    });
    this.group.add(this.crowd.group);

    // ---- pantallas y luces
    this.addScreen(new LedScreen(30, 13, ['#12306b', '#3a0a18', '#ffd45e'], 'LA CORREA FROM MANCHESTER'), -36.5, 17, -4, [0, 8, 0]);
    this.addScreen(new LedScreen(26, 11, ['#6b0f1c', '#10204a', '#6ee0ff']), 0, 19, -33.3, [0, 8, 0]);
    this.addScreen(new LedScreen(20, 9, ['#2a1054', '#0f2a4a', '#ff9a6a']), 36.5, 19, 8, [0, 8, 0]);
    const bc = [0xffd45e, 0xff5a6a, 0x6ab6ff, 0xffffff];
    for (let i = 0; i < 10; i++) {
      this.addBeam(new Beam(bc[i % 4], 40, 2.0, i * 1.3, 0.55 + (i % 4) * 0.12, 0.25), -27 + i * 6, 34.8, (i % 2 ? 1 : -1) * 8);
    }
    for (const [c, x, y, z] of [[0xff9a3a, -24, 20, 22], [0xffb84a, 24, 20, 22], [0xb0305a, -22, 16, -22], [0x4a6fd0, 22, 16, -22]] as [number, number, number, number][]) {
      const l = new THREE.SpotLight(c, 2.0, 42, 0.45, 0.8, 0);
      l.position.set(x, y, z); l.target.position.set(0, 1, 0);
      this.group.add(l, l.target);
    }
    // lámparas de araña doradas
    const lg = new THREE.SphereGeometry(0.5, 10, 8);
    const lm = new THREE.MeshBasicMaterial({ color: 0xffe2a0, toneMapped: false });
    const lamps = new THREE.InstancedMesh(lg, lm, 30);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < 30; i++) { m4.setPosition(-30 + (i % 10) * 6.6, 34.5, -14 + Math.floor(i / 10) * 14); lamps.setMatrixAt(i, m4); }
    this.group.add(lamps);

    // ---- el monigote azul de gasolinera, en mitad de la grada
    this.tubeman = new Tubeman(1.35);
    const tx = TUBE.x, tz = TUBE.z;
    this.tubeman.group.position.set(tx, 0.32, tz);
    this.tubeman.group.rotation.y = Math.atan2(-tx, -tz);
    this.group.add(this.tubeman.group);
    const tl = new THREE.PointLight(0x6a9aff, 8, 14, 1.6);
    tl.position.set(tx, 5.0, tz + 2.5); this.group.add(tl);
    this.anim.push((dt, t) => this.tubeman.update(t));

    this.key.intensity = 3.4;
    this.fogColor = 0x070509;
  }
}
