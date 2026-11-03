import * as THREE from 'three';
import { RING_Y } from '../combat/Match';
import { Arena, type ArenaOpts } from './Arena';
import { Crowd, type Seat } from './Crowd';

const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const std = (color: number, roughness = 0.9, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, ...extra });

/** Suelo de tierra con dibujos tribales: círculos concéntricos, triángulos y puntos de cal. */
function dirtTexture(): THREE.CanvasTexture {
  const S = 1024;
  const c = document.createElement('canvas'); c.width = S; c.height = S;
  const g = c.getContext('2d')!;
  const R = S / 2;
  const grd = g.createRadialGradient(R, R, 40, R, R, R);
  grd.addColorStop(0, '#c58f55'); grd.addColorStop(1, '#a8723e');
  g.fillStyle = grd; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 14000; i++) {
    g.fillStyle = `rgba(${Math.random() < 0.5 ? '60,30,10' : '240,210,160'},${Math.random() * 0.07})`;
    g.fillRect(Math.random() * S, Math.random() * S, 1 + Math.random() * 3, 1 + Math.random() * 3);
  }
  const ring = (r: number, w: number, col: string) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.arc(R, R, r, 0, Math.PI * 2); g.stroke(); };
  ring(R * 0.97, 22, '#5a2a14'); ring(R * 0.9, 6, '#efe3c8');
  ring(R * 0.32, 14, '#7a2418'); ring(R * 0.22, 6, '#efe3c8');
  // triángulos alrededor
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    g.save(); g.translate(R + Math.cos(a) * R * 0.82, R + Math.sin(a) * R * 0.82); g.rotate(a + Math.PI / 2);
    g.fillStyle = i % 2 ? '#efe3c8' : '#a52a1d';
    g.beginPath(); g.moveTo(-12, 10); g.lineTo(12, 10); g.lineTo(0, -16); g.closePath(); g.fill();
    g.restore();
  }
  // puntos de cal formando el ojo del centro
  g.fillStyle = '#efe3c8';
  for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; g.beginPath(); g.arc(R + Math.cos(a) * R * 0.42, R + Math.sin(a) * R * 0.42, 6, 0, Math.PI * 2); g.fill(); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

/** Aldea africana al atardecer. No hay ring: los luchadores pelean sobre la tierra y el público es la tribu de Kongui. */
export class Tribu extends Arena {
  readonly id = 'tribu';
  readonly displayName = 'Tribu de Kongui';
  fogColor = 0xc2703a;
  fogDensity = 0.011;
  exposure = 1.08;
  private fires: { light: THREE.PointLight; flame: THREE.Mesh[]; phase: number }[] = [];
  private embers!: THREE.Points;
  private emberData: { x: number; y: number; z: number; v: number; ph: number }[] = [];

  constructor(opts: ArenaOpts) {
    super(opts, null);
    // todo el escenario vive a la altura de la lona para que Match use la misma cota de suelo
    this.group.position.y = RING_Y;
    const R = rng(33);
    const mat = this.floor.material as THREE.MeshStandardMaterial;
    mat.color.set(0x9a6a3a); mat.roughness = 0.98; mat.metalness = 0;

    // --- cielo de atardecer
    const skyGeo = new THREE.SphereGeometry(170, 32, 16);
    const col: number[] = [];
    const top = new THREE.Color(0x2c2447), mid = new THREE.Color(0xd9763a), low = new THREE.Color(0xf0a050);
    const p = skyGeo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const h = Math.max(0, p.getY(i) / 170);
      const c = h < 0.18 ? low.clone().lerp(mid, h / 0.18) : mid.clone().lerp(top, Math.min(1, (h - 0.18) / 0.6));
      col.push(c.r, c.g, c.b);
    }
    skyGeo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    const sky = new THREE.Mesh(skyGeo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, toneMapped: false }));
    sky.position.y = -RING_Y;
    this.group.add(sky);
    // sol grande y bajo
    const sun = new THREE.Mesh(new THREE.CircleGeometry(15, 40), new THREE.MeshBasicMaterial({ color: 0xffc070, fog: false, toneMapped: false }));
    sun.position.set(-45, 14, -110); sun.lookAt(0, 6, 0);
    const halo = new THREE.Mesh(new THREE.CircleGeometry(34, 40), new THREE.MeshBasicMaterial({ color: 0xff8a3a, transparent: true, opacity: 0.28, fog: false, toneMapped: false, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.position.copy(sun.position).add(new THREE.Vector3(0, 0, 0.5)); halo.lookAt(0, 6, 0);
    this.group.add(sun, halo);

    // --- círculo de combate
    const disc = new THREE.Mesh(new THREE.CircleGeometry(8.1, 64), new THREE.MeshStandardMaterial({ map: dirtTexture(), roughness: 1 }));
    disc.rotation.x = -Math.PI / 2; disc.position.y = 0.012; disc.receiveShadow = true;
    this.group.add(disc);
    // piedras del borde
    const stoneMat = std(0x6a5a4a, 0.95);
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22 + R() * 0.15, 0), stoneMat);
      s.position.set(Math.cos(a) * 8.05, 0.1, Math.sin(a) * 8.05); s.rotation.set(R() * 3, R() * 3, R() * 3); s.scale.y = 0.7;
      s.castShadow = true; this.group.add(s);
    }

    // --- la tribu como público: tres filas de pie alrededor
    const seats: Seat[] = [];
    [[8.7, 0.0], [9.6, 0.12], [10.5, 0.24]].forEach(([r, y], k) => {
      const n = Math.floor((2 * Math.PI * r) / 0.82);
      for (let i = 0; i < n; i++) {
        const a = ((i + (k % 2) * 0.5) / n) * Math.PI * 2;
        seats.push({ x: Math.cos(a) * r, y, z: Math.sin(a) * r, yaw: Math.atan2(-Math.cos(a), -Math.sin(a)) });
      }
    });
    this.crowd = new Crowd(seats, [0xb3262b, 0xe7b53b, 0xf1e9d8, 0x1c3f8c, 0x2d7a46, 0x7a4a1e, 0xc2703a], {
      near: () => true, seed: 5, flashes: 0,
      skins: [0x4a2c1a, 0x5a3622, 0x6b4128, 0x3a2216, 0x7a4a2e, 0x2f1c12],
    });
    this.group.add(this.crowd.group);

    // --- chozas
    const wall = std(0xb98a58, 1), roofMat = std(0x8c6a2a, 1), door = std(0x1a0e08, 1);
    const hut = (x: number, z: number, s: number) => {
      const g = new THREE.Group();
      const w = new THREE.Mesh(new THREE.CylinderGeometry(1.5 * s, 1.6 * s, 1.7 * s, 16), wall); w.position.y = 0.85 * s; w.castShadow = true;
      const r = new THREE.Mesh(new THREE.ConeGeometry(2.2 * s, 1.9 * s, 16), roofMat); r.position.y = 2.6 * s; r.castShadow = true;
      const d = new THREE.Mesh(new THREE.BoxGeometry(0.6 * s, 1.1 * s, 0.1), door); d.position.set(0, 0.55 * s, 1.55 * s);
      g.add(w, r, d);
      g.position.set(x, 0, z); g.rotation.y = Math.atan2(-x, -z) + (R() - 0.5) * 0.4;
      this.group.add(g);
    };
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2 + R() * 0.2; const r = 19 + R() * 9; hut(Math.cos(a) * r, Math.sin(a) * r, 0.9 + R() * 0.5); }

    // --- tótems
    const totemMat = [std(0x7a2a1a), std(0xe0b050), std(0x3a2a1a), std(0xefe3c8)];
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 4 * 0;
      const g = new THREE.Group();
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 5.2, 10), std(0x4a2f1a)); pole.position.y = 2.6; pole.castShadow = true; g.add(pole);
      for (let i = 0; i < 4; i++) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.9, 0.9), totemMat[(i + k) % 4]); b.position.y = 0.8 + i * 1.15; b.castShadow = true; g.add(b);
        for (const sx of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), std(0xffffff, 0.3)); e.position.set(sx * 0.22, 0.9 + i * 1.15, 0.46); g.add(e); }
      }
      const wing = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 0.3), totemMat[k % 4]); wing.position.y = 4.4; g.add(wing);
      g.position.set(Math.cos(a) * 13.2, 0, Math.sin(a) * 13.2); g.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a));
      this.group.add(g);
    }

    // --- hogueras
    const logMat = std(0x2a160a), flameMat = new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    const flame2Mat = new THREE.MeshBasicMaterial({ color: 0xffd060, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const x = Math.cos(a) * 12, z = Math.sin(a) * 12;
      for (let i = 0; i < 3; i++) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.4, 6), logMat); l.position.set(x, 0.25, z); l.rotation.set(Math.PI / 2 - 0.5, (i / 3) * Math.PI * 2, 0); l.rotateX(0); this.group.add(l); }
      const f1 = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.5, 8), flameMat); f1.position.set(x, 0.95, z);
      const f2 = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1.0, 8), flame2Mat); f2.position.set(x, 0.8, z);
      this.group.add(f1, f2);
      const light = new THREE.PointLight(0xff8a3a, 14, 17, 1.4); light.position.set(x, 1.4, z);
      this.group.add(light);
      this.fires.push({ light, flame: [f1, f2], phase: k * 1.7 });
      // tambor junto a la hoguera
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.28, 0.7, 12), std(0x7a4a2a)); drum.position.set(x + 1.1, 0.35, z - 0.6); drum.castShadow = true;
      const skin = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.03, 12), std(0xe8d8b0)); skin.position.set(x + 1.1, 0.7, z - 0.6);
      this.group.add(drum, skin);
    }
    // ascuas
    const nE = opts.quality === 'baja' ? 40 : 120;
    const ep = new Float32Array(nE * 3);
    for (let i = 0; i < nE; i++) {
      const f = this.fires[i % 4].light.position;
      this.emberData.push({ x: f.x + (R() - 0.5) * 0.8, y: R() * 6, z: f.z + (R() - 0.5) * 0.8, v: 0.5 + R() * 1.2, ph: R() * 6 });
    }
    const eg = new THREE.BufferGeometry(); eg.setAttribute('position', new THREE.BufferAttribute(ep, 3));
    this.embers = new THREE.Points(eg, new THREE.PointsMaterial({ color: 0xffa040, size: 0.11, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    this.embers.frustumCulled = false;
    this.group.add(this.embers);

    // --- baobab, acacias y colinas lejanas
    const bark = std(0x4a3626, 1), leaf = std(0x2a2a14, 1);
    const baobab = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.4, 11, 14), bark); trunk.position.y = 5.5; baobab.add(trunk);
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; const br = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.7, 5, 6), bark); br.position.set(Math.cos(a) * 1.8, 12.5, Math.sin(a) * 1.8); br.rotation.set(Math.sin(a) * 0.7, 0, -Math.cos(a) * 0.7); baobab.add(br); const cr = new THREE.Mesh(new THREE.SphereGeometry(1.9, 8, 6), leaf); cr.position.set(Math.cos(a) * 4, 14.5, Math.sin(a) * 4); baobab.add(cr); }
    baobab.position.set(-30, 0, -40);
    this.group.add(baobab);
    for (let i = 0; i < 26; i++) {
      const a = R() * Math.PI * 2, r = 48 + R() * 45;
      const t = new THREE.Group();
      const h = 3.5 + R() * 3;
      const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, h, 6), bark); tr.position.y = h / 2;
      const cn = new THREE.Mesh(new THREE.SphereGeometry(2.4 + R(), 10, 6), leaf); cn.scale.set(1.6, 0.35, 1.6); cn.position.y = h + 0.2;
      t.add(tr, cn); t.position.set(Math.cos(a) * r, 0, Math.sin(a) * r); this.group.add(t);
    }
    const hillMat = std(0x4a2a1a, 1, { fog: true });
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2, r = 120;
      const h = new THREE.Mesh(new THREE.SphereGeometry(22 + R() * 16, 14, 8), hillMat); h.scale.y = 0.45; h.position.set(Math.cos(a) * r, -4, Math.sin(a) * r); this.group.add(h);
    }

    // --- luz: sol bajo y cálido
    this.key.color.set(0xffa860); this.key.intensity = 3.2; this.key.position.set(-14, 16, -10);
    this.key.angle = 0.75; this.key.penumbra = 0.6;
    this.addBeamLessFill();

    // animación del fuego
    this.anim.push((dt, t) => {
      for (const f of this.fires) {
        const k = 0.85 + 0.25 * Math.sin(t * 11 + f.phase) + 0.1 * Math.sin(t * 23 + f.phase * 2);
        f.light.intensity = 14 * k;
        f.flame[0].scale.set(1 + 0.1 * Math.sin(t * 9 + f.phase), k, 1); f.flame[1].scale.set(1, 0.9 + 0.3 * Math.sin(t * 14 + f.phase), 1);
      }
      const pos = this.embers.geometry.attributes.position as THREE.BufferAttribute;
      this.emberData.forEach((e, i) => {
        e.y += e.v * dt;
        if (e.y > 7) e.y = 0.6;
        pos.setXYZ(i, e.x + Math.sin(t * 1.3 + e.ph) * 0.6, e.y, e.z + Math.cos(t * 1.1 + e.ph) * 0.6);
      });
      pos.needsUpdate = true;
    });
  }

  private addBeamLessFill() {
    const warm = new THREE.HemisphereLight(0xffc890, 0x3a1a0a, 0.5);
    this.group.add(warm);
  }
}
