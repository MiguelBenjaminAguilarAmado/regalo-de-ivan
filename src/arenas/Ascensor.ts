import * as THREE from 'three';
import { RING_Y } from '../combat/Match';
import { Arena, type ArenaOpts } from './Arena';
import { windowsTexture } from './Azotea';

const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const std = (color: number, roughness = 0.6, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

function displayTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = '#050505'; g.fillRect(0, 0, 256, 128);
  g.fillStyle = '#ff3a2a'; g.font = '900 96px "Courier New", monospace'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = '#ff3a2a'; g.shadowBlur = 14;
  g.fillText('24/7', 128, 70);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/** Cabina de cristal de un ascensor colgada sobre la ciudad de noche: el escenario del campeonato 24/7. */
export class Ascensor extends Arena {
  readonly id = 'ascensor';
  readonly displayName = 'Ascensor 24/7';
  fogColor = 0x07101e;
  fogDensity = 0.004;
  exposure = 1.1;
  private tube!: THREE.Mesh;

  constructor(opts: ArenaOpts) {
    super(opts, null, false);
    this.group.position.y = RING_Y;
    this.floor.visible = false;
    const R = rng(17);
    const RAD = 3.7;

    // --- cabina: suelo de acero, paredes de cristal con marcos, techo con fluorescente, barandillas
    const steel = std(0x8a929e, 0.35, 0.85);
    const floor = new THREE.Mesh(new THREE.CylinderGeometry(RAD + 0.4, RAD + 0.4, 0.3, 40), std(0x2a2e36, 0.4, 0.7)); floor.position.y = -0.16; floor.receiveShadow = true; this.group.add(floor);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(RAD + 0.4, 0.07, 8, 48), steel); rim.rotation.x = Math.PI / 2; rim.position.y = 0.02; this.group.add(rim);
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; const s = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.9), std(i % 2 ? 0x30343c : 0x20232a, 0.4, 0.6)); s.position.set(Math.cos(a) * RAD * 0.7, 0.01, Math.sin(a) * RAD * 0.7); s.rotation.y = -a; this.group.add(s); }
    // paredes de cristal: cilindro abierto translúcido + montantes
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(RAD + 0.4, RAD + 0.4, 4.6, 40, 1, true), new THREE.MeshPhysicalMaterial({ color: 0x9ad0ff, transparent: true, opacity: 0.12, roughness: 0.05, side: THREE.DoubleSide, depthWrite: false }));
    glass.position.y = 2.3; this.group.add(glass);
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; const m = new THREE.Mesh(new THREE.BoxGeometry(0.14, 4.6, 0.14), steel); m.position.set(Math.cos(a) * (RAD + 0.4), 2.3, Math.sin(a) * (RAD + 0.4)); m.castShadow = true; this.group.add(m); }
    for (const h of [1.05, 4.5]) { const t = new THREE.Mesh(new THREE.TorusGeometry(RAD + 0.4, h > 2 ? 0.1 : 0.05, 8, 48), steel); t.rotation.x = Math.PI / 2; t.position.y = h; this.group.add(t); }
    const ceil = new THREE.Mesh(new THREE.CylinderGeometry(RAD + 0.5, RAD + 0.5, 0.25, 40), std(0x2a2e36, 0.4, 0.7)); ceil.position.y = 4.7; this.group.add(ceil);
    const neon = new THREE.Mesh(new THREE.CylinderGeometry(RAD * 0.7, RAD * 0.7, 0.06, 36), new THREE.MeshBasicMaterial({ color: 0xf2faff, toneMapped: false })); neon.position.y = 4.55; this.group.add(neon);
    const disp = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.8), new THREE.MeshBasicMaterial({ map: displayTexture(), toneMapped: false }));
    disp.position.set(0, 4.15, -(RAD + 0.3)); this.group.add(disp);
    // puertas dobles cerradas al fondo
    for (const sx of [-1, 1]) { const d = new THREE.Mesh(new THREE.BoxGeometry(1.7, 3.8, 0.12), steel); d.position.set(sx * 0.87, 1.9, RAD + 0.15); d.rotation.y = 0; this.group.add(d); }
    // cables hacia arriba
    for (const sx of [-1.3, 1.3]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 80, 6), std(0x15161a, 0.5, 0.8)); c.position.set(sx, 44, 0); this.group.add(c); }

    // --- la ciudad de noche, muy por debajo, rodeando la cabina
    const tex = [windowsTexture(21), windowsTexture(22), windowsTexture(23)];
    for (let i = 0; i < 110; i++) {
      const a = R() * Math.PI * 2, r = 26 + R() * 110, w = 6 + R() * 10, h = 20 + R() * 90;
      const t = tex[i % 3].clone(); t.repeat.set(w / 8, h / 16); t.needsUpdate = true;
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.95, roughness: 1 }));
      b.position.set(Math.cos(a) * r, h / 2 - 70 - R() * 20, Math.sin(a) * r); this.group.add(b);
    }
    // tráfico lejano: puntos de luz
    const pts = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) { const a = R() * Math.PI * 2, r = 30 + R() * 110; pts[i * 3] = Math.cos(a) * r; pts[i * 3 + 1] = -88 + R() * 3; pts[i * 3 + 2] = Math.sin(a) * r; }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    this.group.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffc860, size: 1.6, sizeAttenuation: false, toneMapped: false, fog: false })));
    // cielo
    const sky = new THREE.Mesh(new THREE.SphereGeometry(190, 24, 12), new THREE.MeshBasicMaterial({ color: 0x08142a, side: THREE.BackSide, fog: false, toneMapped: false })); this.group.add(sky);
    this.tube = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1, 4), std(0x000000)); this.tube.visible = false; this.group.add(this.tube);

    // --- luz de cabina (fría y fluorescente) + brillo azul de la ciudad
    this.key.color.set(0xeaf6ff); this.key.intensity = 3.4; this.key.position.set(0, 4.3, 0.3); this.key.angle = 1.0; this.key.penumbra = 0.7;
    this.key.shadow.camera.near = 1; this.key.shadow.camera.far = 14;
    this.group.add(new THREE.HemisphereLight(0x6a90d8, 0x101830, 0.55));
    this.anim.push((dt, t) => {
      const flick = 0.9 + 0.1 * Math.sin(t * 37) * Math.sin(t * 5.1) + (Math.sin(t * 0.7) > 0.985 ? -0.5 : 0);
      this.key.intensity = 3.4 * Math.max(0.3, flick);
      (neon.material as THREE.MeshBasicMaterial).color.setScalar(Math.max(0.5, flick));
      this.group.position.y = RING_Y + Math.sin(t * 1.4) * 0.012; // el vaivén del cable
    });
  }
}
