import * as THREE from 'three';
import { Arena, type ArenaOpts } from './Arena';
import { Crowd, type Seat } from './Crowd';
import { loopSeats, rrLoop } from './Seating';
import { windowsTexture } from './Azotea';

const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const std = (color: number, roughness = 0.7, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

/** Retrato del jefe para la pared */
function portraitTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 256; c.height = 320;
  const g = c.getContext('2d')!;
  const bg = g.createLinearGradient(0, 0, 0, 320); bg.addColorStop(0, '#2a1a10'); bg.addColorStop(1, '#0d0806');
  g.fillStyle = bg; g.fillRect(0, 0, 256, 320);
  g.fillStyle = '#121214'; g.beginPath(); g.moveTo(20, 320); g.quadraticCurveTo(30, 215, 100, 205); g.lineTo(156, 205); g.quadraticCurveTo(226, 215, 236, 320); g.fill();
  g.fillStyle = '#f2f2f2'; g.beginPath(); g.moveTo(108, 205); g.lineTo(148, 205); g.lineTo(128, 290); g.fill();
  g.fillStyle = '#c58f6c'; g.beginPath(); g.ellipse(128, 130, 52, 66, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#0d0a09'; g.beginPath(); g.ellipse(128, 82, 56, 30, 0, Math.PI, 0); g.fill();
  g.beginPath(); g.ellipse(128, 170, 50, 40, 0, 0, Math.PI); g.fill();
  g.strokeStyle = '#c9ccd2'; g.lineWidth = 4; for (const sx of [-1, 1]) g.strokeRect(128 + sx * 25 - 18, 112, 36, 24);
  g.fillStyle = '#fff'; for (const sx of [-1, 1]) g.fillRect(128 + sx * 25 - 6, 120, 12, 8);
  g.strokeStyle = '#d8b43a'; g.lineWidth = 10; g.strokeRect(5, 5, 246, 310);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function signTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = '#0d0a08'; g.fillRect(0, 0, 1024, 256);
  g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 150px Impact, "Arial Black", sans-serif';
  g.shadowColor = '#d8b43a'; g.shadowBlur = 30; g.fillStyle = '#d8b43a'; g.fillText('EL HOYO', 512, 110);
  g.shadowBlur = 0; g.font = '700 54px "Arial Narrow", sans-serif'; g.fillStyle = '#f4efe6'; g.fillText('DIRECCIÓN GENERAL · PABLO MOTOS', 512, 215);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/** Sala de juntas de Pablo Motos en lo alto de un rascacielos: ring sobre moqueta, acuario, trofeos y ejecutivos mirando. */
export class Oficina extends Arena {
  readonly id = 'oficina';
  readonly displayName = 'Oficina de Pablo Motos';
  fogColor = 0x120d0a;
  fogDensity = 0.006;
  exposure = 1.4;
  private fish: { m: THREE.Mesh; ph: number; sp: number; y: number; z: number }[] = [];

  constructor(opts: ArenaOpts) {
    super(opts, {
      canvas: 0x1d2a4a, border: 0x0e1426, accent: 0xd8b43a, rope: [0xd8b43a, 0xf2f2f2, 0xd8b43a],
      skirt: 0x0d1220, apronText: 'EL HOYO · DIRECCIÓN GENERAL', ringText: 'EJECUTIVO',
    });
    const R = rng(91);
    const fm = this.floor.material as THREE.MeshStandardMaterial;
    fm.color.set(0x2a1a14); fm.roughness = 0.55; fm.metalness = 0.1;
    const HALF = 18, H = 9;

    // --- paredes de madera, ventanal con skyline detrás (-z), techo con luces empotradas
    const wood = std(0x4a2f1f, 0.55, 0.05);
    for (const [x, z, ry] of [[HALF, 0, -Math.PI / 2], [-HALF, 0, Math.PI / 2], [0, HALF, Math.PI]] as const) {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, H), wood); w.position.set(x, H / 2, z); w.rotation.y = ry; w.receiveShadow = true; this.group.add(w);
      for (let i = -3; i <= 3; i++) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.15, H, 0.1), std(0x2a190f, 0.6)); const o = new THREE.Vector3(i * 5.4, H / 2, 0.05); o.applyAxisAngle(new THREE.Vector3(0, 1, 0), ry); p.position.set(x + o.x, o.y, z + o.z); p.rotation.y = ry; this.group.add(p); }
    }
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, H), new THREE.MeshBasicMaterial({ color: 0x06101e, fog: false }));
    glass.position.set(0, H / 2, -HALF); this.group.add(glass);
    const tex = [windowsTexture(7), windowsTexture(8), windowsTexture(9)];
    for (let i = 0; i < 50; i++) {
      const x = -HALF * 1.6 + R() * HALF * 3.2, w = 5 + R() * 8, h = 12 + R() * 45;
      const t = tex[i % 3].clone(); t.repeat.set(w / 8, h / 16); t.needsUpdate = true;
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 6), new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.9, roughness: 1 }));
      b.position.set(x, h / 2 - 28, -HALF - 14 - R() * 40); this.group.add(b);
    }
    for (let i = -3; i <= 3; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.22, H, 0.22), std(0x1a1a1e, 0.4, 0.7)); m.position.set(i * 5.4, H / 2, -HALF + 0.1); this.group.add(m); }
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, HALF * 2), std(0xcfc8bc, 0.9)); ceil.rotation.x = Math.PI / 2; ceil.position.y = H; this.group.add(ceil);
    const panel = new THREE.MeshBasicMaterial({ color: 0xfff0d0, toneMapped: false });
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const p = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.3), panel); p.rotation.x = Math.PI / 2; p.position.set(-9 + i * 6, H - 0.02, -9 + j * 6); this.group.add(p); }

    // --- letrero dorado y retrato del jefe (pared +x y fondo)
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(8, 2), new THREE.MeshBasicMaterial({ map: signTexture(), toneMapped: false }));
    sign.position.set(HALF - 0.1, 6.2, -2); sign.rotation.y = -Math.PI / 2; this.group.add(sign);
    for (const z of [6, 12]) { const pic = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 3.5), new THREE.MeshBasicMaterial({ map: portraitTexture(), toneMapped: false })); pic.position.set(HALF - 0.12, 3.6, z); pic.rotation.y = -Math.PI / 2; this.group.add(pic); }

    // --- acuario gigante (pared -x)
    const tank = new THREE.Group();
    const water = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.4, 11), new THREE.MeshStandardMaterial({ color: 0x2a8aa8, emissive: 0x0e4a64, emissiveIntensity: 0.9, transparent: true, opacity: 0.55, roughness: 0.1 }));
    water.position.y = 2.6; tank.add(water);
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 11.4), std(0x1c1410, 0.6)); base.position.y = 0.45; tank.add(base);
    const topb = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 11.4), std(0x1c1410, 0.6)); topb.position.y = 4.45; tank.add(topb);
    const fishCols = [0xff7a2a, 0xffd23a, 0x4ab0ff, 0xff4a8a, 0xe8f0ff];
    for (let i = 0; i < 12; i++) {
      const f = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.5, 6), new THREE.MeshStandardMaterial({ color: fishCols[i % 5], emissive: fishCols[i % 5], emissiveIntensity: 0.35, roughness: 0.4 }));
      f.rotation.x = Math.PI / 2; f.rotation.z = Math.PI / 2; tank.add(f);
      this.fish.push({ m: f, ph: R() * 10, sp: 0.3 + R() * 0.6, y: 1.6 + R() * 2, z: (R() - 0.5) * 9.5 });
    }
    tank.position.set(-HALF + 1.2, 0, 2); this.group.add(tank);
    const tankLight = new THREE.PointLight(0x4ac0e0, 9, 14, 1.6); tankLight.position.set(-HALF + 3, 3, 2); this.group.add(tankLight);

    // --- estantería con trofeos y plantas
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.4, 8), wood); shelf.position.set(HALF - 0.4, 1.7, -9); this.group.add(shelf);
    const gold = std(0xd8b43a, 0.25, 0.95);
    for (let i = 0; i < 6; i++) { const cup = new THREE.Group(); const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.12, 0.4, 10), gold); const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 6), gold); stem.position.y = -0.3; bowl.position.y = 0; cup.add(bowl, stem); cup.position.set(HALF - 0.4, 1.4 + (i % 2) * 1.2, -12 + (i >> 1) * 2.5); this.group.add(cup); }
    for (const [x, z] of [[-12, -12], [12, 12], [-14, 14]]) { const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.45, 0.8, 10), std(0x3a2a22)); pot.position.set(x, 0.4, z); const leaf = new THREE.Mesh(new THREE.SphereGeometry(1.1, 10, 8), std(0x2a6a3a, 0.8)); leaf.position.set(x, 1.9, z); leaf.scale.y = 1.2; this.group.add(pot, leaf); }

    // --- mesa de juntas larga con sillas (detrás del ring)
    const table = new THREE.Mesh(new THREE.BoxGeometry(12, 0.25, 2.6), std(0x2a190f, 0.35, 0.1)); table.position.set(0, 1.05, -11); table.castShadow = true; this.group.add(table);
    for (const sx of [-5, 5]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.05, 2.0), std(0x1c120a, 0.5)); l.position.set(sx, 0.52, -11); this.group.add(l); }

    // --- ejecutivos de traje alrededor del ring (de pie y atentos)
    const seats: Seat[] = loopSeats(rrLoop(8.6, 8.6, 1.6, 0.5), 0.5, 2, 0.95, 0, 0, 0.95, (x, z) => (z < -9.5 && Math.abs(x) < 6.5) || R() < 0.15, 0.5);
    this.crowd = new Crowd(seats, [0x101014, 0x1a1a22, 0x23262e, 0x2a2a34, 0x14203a, 0x3a1a1a, 0xe7e7e7], { near: () => true, seed: 4, flashes: 0 });
    this.group.add(this.crowd.group);

    // --- luz: foco principal cálido sobre el ring + reflejo azul del acuario
    this.key.color.set(0xfff0d8); this.key.intensity = 3.4; this.key.position.set(0, 8.4, 3); this.key.angle = 0.75; this.key.penumbra = 0.6;
    this.group.add(new THREE.HemisphereLight(0xb8a890, 0x30201a, 1.0));
    const chand = new THREE.PointLight(0xffe0b0, 16, 24, 1.4); chand.position.set(0, 7.5, 0); this.group.add(chand);

    this.anim.push((dt, t) => {
      for (const f of this.fish) {
        const z = ((f.z + t * f.sp + f.ph) % 10) - 5; f.m.position.set(0, f.y + Math.sin(t * 1.3 + f.ph) * 0.2, z);
        f.m.rotation.y = 0; f.m.rotation.x = Math.PI / 2; f.m.rotation.z = Math.PI / 2;
      }
    });
  }
}
