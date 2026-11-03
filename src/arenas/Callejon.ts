import * as THREE from 'three';
import { RING_Y } from '../combat/Match';
import { Arena, type ArenaOpts } from './Arena';
import { Crowd, type Seat } from './Crowd';

const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const std = (color: number, roughness = 0.9, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

/** Ladrillo con pintadas y carteles de combates pegados */
function brickTexture(seed: number): THREE.CanvasTexture {
  const R = rng(seed);
  const W = 1024, H = 512;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  g.fillStyle = '#4a3328'; g.fillRect(0, 0, W, H);
  for (let y = 0; y < H; y += 28) for (let x = (y / 28) % 2 ? -30 : 0; x < W; x += 60) {
    const v = 60 + R() * 30;
    g.fillStyle = `rgb(${v + 40},${v + 8},${v - 10})`; g.fillRect(x + 2, y + 2, 56, 24);
  }
  for (let i = 0; i < 5000; i++) { g.fillStyle = `rgba(0,0,0,${R() * 0.18})`; g.fillRect(R() * W, R() * H, 2, 2 + R() * 12); }
  // carteles pegados
  const posters = ['HOYO CHAMPION', 'PELEA ESTA NOCHE', 'SE BUSCA: PETISUI', 'PABLO PAGA'];
  posters.forEach((t, i) => {
    const x = 80 + i * 240 + R() * 40, y = 120 + R() * 80;
    g.save(); g.translate(x, y); g.rotate((R() - 0.5) * 0.12);
    g.fillStyle = ['#e8d8b0', '#c1272d', '#f2c14e', '#efe6d5'][i]; g.fillRect(-70, -90, 140, 180);
    g.fillStyle = '#111'; g.font = '900 22px Impact, "Arial Black", sans-serif'; g.textAlign = 'center';
    t.split(' ').forEach((w, k) => g.fillText(w, 0, -40 + k * 30));
    g.restore();
  });
  // pintadas
  const tags: [string, string, number, number][] = [['HOYO', '#3cc6e8', 120, 360], ['3000', '#e8453c', 520, 420], ['K.O.', '#b8f03c', 840, 380]];
  for (const [t, col, x, y] of tags) {
    g.save(); g.translate(x, y); g.rotate((R() - 0.5) * 0.3);
    g.font = '900 110px Impact, "Arial Black", sans-serif'; g.lineWidth = 10; g.strokeStyle = 'rgba(0,0,0,0.7)'; g.strokeText(t, 0, 0);
    g.fillStyle = col; g.globalAlpha = 0.85; g.fillText(t, 0, 0); g.restore(); g.globalAlpha = 1;
  }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.RepeatWrapping; tex.anisotropy = 4;
  return tex;
}

/** Asfalto mojado con el círculo de pelea pintado con tiza */
function asphaltTexture(): THREE.CanvasTexture {
  const R = rng(7);
  const S = 1024;
  const c = document.createElement('canvas'); c.width = S; c.height = S;
  const g = c.getContext('2d')!;
  g.fillStyle = '#26262b'; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 26000; i++) { const v = 25 + R() * 40; g.fillStyle = `rgb(${v},${v},${v + 4})`; g.fillRect(R() * S, R() * S, 2, 2); }
  // charcos
  for (let i = 0; i < 7; i++) { const x = R() * S, y = R() * S, r = 40 + R() * 90; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(90,110,150,0.35)'); gr.addColorStop(1, 'rgba(90,110,150,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); }
  // círculo de tiza (radio de combate ≈ 7 m sobre una textura de 40 m)
  g.strokeStyle = 'rgba(240,236,220,0.85)'; g.lineWidth = 9; g.setLineDash([38, 14]);
  g.beginPath(); g.arc(S / 2, S / 2, (7.4 / 40) * S, 0, Math.PI * 2); g.stroke();
  g.setLineDash([]); g.lineWidth = 6;
  g.beginPath(); g.arc(S / 2, S / 2, 26, 0, Math.PI * 2); g.stroke();
  g.font = '900 54px Impact, "Arial Black", sans-serif'; g.fillStyle = 'rgba(240,236,220,0.8)'; g.textAlign = 'center';
  g.fillText('HOYO', S / 2, S / 2 - (7.4 / 40) * S - 20);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return tex;
}

/**
 * Callejón de Hoyo, de noche: el escenario de los COMBATES CALLEJEROS. Sin ring ni cuerdas, un círculo pintado con
 * tiza entre dos paredes de ladrillo, farolas, un coche con los faros encendidos y los vecinos haciendo corro.
 */
export class Callejon extends Arena {
  readonly id = 'callejon';
  readonly displayName = 'Callejón de Hoyo';
  fogColor = 0x0d0e16;
  fogDensity = 0.022;
  exposure = 1.12;
  private lamps: { light: THREE.PointLight; ph: number; bulb: THREE.MeshBasicMaterial }[] = [];
  private steam: THREE.Mesh[] = [];

  constructor(opts: ArenaOpts) {
    super(opts, null);
    this.group.position.y = RING_Y;
    const R = rng(21);
    // suelo
    const fm = this.floor.material as THREE.MeshStandardMaterial;
    fm.color.set(0x2a2a30); fm.roughness = 0.75; fm.metalness = 0.15;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ map: asphaltTexture(), roughness: 0.55, metalness: 0.2 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = 0.01; ground.receiveShadow = true;
    this.group.add(ground);

    // paredes del callejón (a los lados) y fondo
    const wallMat = (seed: number, rep: number) => { const t = brickTexture(seed); t.repeat.set(rep, 1); return new THREE.MeshStandardMaterial({ map: t, roughness: 0.95 }); };
    for (const [x, ry, seed] of [[-13, Math.PI / 2, 3], [13, -Math.PI / 2, 4]] as const) {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(44, 14), wallMat(seed, 2)); w.position.set(x, 7, 0); w.rotation.y = ry; w.receiveShadow = true; this.group.add(w);
      // escaleras de incendios
      const iron = std(0x1a1a1e, 0.6, 0.6);
      for (let k = 0; k < 3; k++) {
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 4), iron); p.position.set(x + Math.sign(-x) * 0.5, 4 + k * 3.2, -6 + k * 2); this.group.add(p);
        const r = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 4), iron); r.position.set(x + Math.sign(-x) * 0.95, 4.45 + k * 3.2, -6 + k * 2); this.group.add(r);
      }
    }
    const back = new THREE.Mesh(new THREE.PlaneGeometry(26, 16), wallMat(5, 1)); back.position.set(0, 8, -20); this.group.add(back);
    // ventanas encendidas arriba
    const winMat = new THREE.MeshBasicMaterial({ color: 0xffd890, toneMapped: false });
    for (let i = 0; i < 14; i++) {
      const side = i % 2 ? 1 : -1;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.4), winMat);
      m.position.set(side * 12.95, 6 + Math.floor(R() * 4) * 2.2, -16 + R() * 32); m.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      if (R() < 0.6) this.group.add(m);
    }

    // contenedores, cajas y bidón con fuego
    const bin = (x: number, z: number, color: number) => {
      const g = new THREE.Group();
      const b = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.3, 1.2), std(color, 0.7, 0.3)); b.position.y = 0.65; b.castShadow = true; g.add(b);
      const lid = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 1.3), std(0x1a1a1a, 0.6)); lid.position.y = 1.35; lid.rotation.x = -0.2; g.add(lid);
      g.position.set(x, 0, z); this.group.add(g);
    };
    bin(-11, -9, 0x2d6a3a); bin(11.2, 7, 0x2a4a8a);
    for (let i = 0; i < 6; i++) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), std(0x8a6a3a)); c.position.set(-11.5 + (i % 2) * 0.95, 0.45 + Math.floor(i / 2) * 0.9 * (i < 4 ? 1 : 0), 10 + (i % 3) * 0.3); c.rotation.y = R() * 0.4; c.castShadow = true; this.group.add(c); }
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.1, 14), std(0x5a3a2a, 0.6, 0.5)); drum.position.set(10.5, 0.55, -8); this.group.add(drum);
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.1, 8), new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    flame.position.set(10.5, 1.6, -8); this.group.add(flame);
    const fireLight = new THREE.PointLight(0xff8a3a, 10, 14, 1.5); fireLight.position.set(10.5, 2, -8); this.group.add(fireLight);

    // coche aparcado con los faros apuntando al corro
    const car = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.75, 4.3), std(0x8a1a1a, 0.3, 0.4)); body.position.y = 0.65; body.castShadow = true; car.add(body);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.6, 2.1), std(0x10141c, 0.1, 0.6)); cab.position.set(0, 1.3, -0.3); car.add(cab);
    for (const sx of [-0.9, 0.9]) for (const sz of [-1.4, 1.4]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.3, 12), std(0x111111)); w.rotation.z = Math.PI / 2; w.position.set(sx, 0.36, sz); car.add(w); }
    const hl = new THREE.MeshBasicMaterial({ color: 0xfff6d0, toneMapped: false });
    for (const sx of [-0.6, 0.6]) { const h = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.05), hl); h.position.set(sx, 0.72, 2.16); car.add(h); }
    car.position.set(-3, 0, -15); car.rotation.y = 0.15;
    this.group.add(car);
    const head = new THREE.SpotLight(0xfff0d0, 40, 30, 0.5, 0.6, 1.2); head.position.set(-3, 1.2, -13); head.target.position.set(0, 0, 0);
    this.group.add(head, head.target);

    // farolas con zumbido (parpadean un poco)
    for (const [x, z] of [[-11.6, -4], [11.6, 6], [-11.6, 13]] as const) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 6, 8), std(0x1a1a1e, 0.5, 0.6)); pole.position.set(x, 3, z); this.group.add(pole);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.08), std(0x1a1a1e, 0.5, 0.6)); arm.position.set(x - Math.sign(x) * 0.6, 6, z); this.group.add(arm);
      const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd28a, toneMapped: false });
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), bulbMat); bulb.position.set(x - Math.sign(x) * 1.2, 5.85, z); this.group.add(bulb);
      const light = new THREE.PointLight(0xffc878, 16, 18, 1.4); light.position.copy(bulb.position); this.group.add(light);
      this.lamps.push({ light, ph: R() * 10, bulb: bulbMat });
    }
    // letrero de neón
    const nc = document.createElement('canvas'); nc.width = 512; nc.height = 128;
    const ng = nc.getContext('2d')!; ng.font = '900 86px Impact, "Arial Black", sans-serif'; ng.textAlign = 'center'; ng.textBaseline = 'middle'; ng.shadowColor = '#ff3ea5'; ng.shadowBlur = 30; ng.fillStyle = '#ff7ac8'; ng.fillText('BAR 24H', 256, 64); ng.fillText('BAR 24H', 256, 64);
    const nt = new THREE.CanvasTexture(nc); nt.colorSpace = THREE.SRGBColorSpace;
    const neon = new THREE.Mesh(new THREE.PlaneGeometry(5, 1.25), new THREE.MeshBasicMaterial({ map: nt, transparent: true, toneMapped: false, depthWrite: false }));
    neon.position.set(12.9, 6.5, -2); neon.rotation.y = -Math.PI / 2; this.group.add(neon);
    const neonLight = new THREE.PointLight(0xff3ea5, 6, 12, 1.5); neonLight.position.set(11.5, 6, -2); this.group.add(neonLight);

    // vapor de las alcantarillas
    const steamMat = new THREE.MeshBasicMaterial({ color: 0xcfd6e8, transparent: true, opacity: 0.12, depthWrite: false });
    for (let i = 0; i < 4; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 8), steamMat); s.position.set(-6 + i * 0.4, 0.5, 9); s.userData.ph = i * 0.7; this.group.add(s); this.steam.push(s); }

    // los vecinos haciendo corro (dos filas, de pie)
    const seats: Seat[] = [];
    [[8.3, 0], [9.2, 0.1]].forEach(([r, y], k) => {
      const n = Math.floor((2 * Math.PI * r) / 0.85);
      for (let i = 0; i < n; i++) {
        const a = ((i + (k % 2) * 0.5) / n) * Math.PI * 2;
        const x = Math.cos(a) * r, z = Math.sin(a) * r;
        if (Math.abs(x) > 11.5 || (z < -12 && Math.abs(x) < 6)) continue;
        seats.push({ x, y, z, yaw: Math.atan2(-x, -z) });
      }
    });
    this.crowd = new Crowd(seats, [0xc1272d, 0x2a5a8a, 0xe8b42a, 0x2d9a5a, 0xf2f2f2, 0x1a1a22, 0x8a4a9a, 0xff7a3a], { near: () => true, seed: 11, flashes: 4 });
    this.group.add(this.crowd.group);

    // luz: luna fría y relleno azulado
    this.key.color.set(0x9fb8ff); this.key.intensity = 1.6; this.key.position.set(4, 20, 6); this.key.angle = 0.7; this.key.penumbra = 0.7;
    this.group.add(new THREE.HemisphereLight(0x5a6aa0, 0x1a1012, 0.55));
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), new THREE.MeshBasicMaterial({ color: 0x0a0e22, fog: false }));
    sky.position.set(0, 20, 0); sky.rotation.x = Math.PI / 2; this.group.add(sky);

    this.anim.push((_dt, t) => {
      for (const l of this.lamps) {
        const flick = Math.sin(t * 37 + l.ph) > 0.97 ? 0.3 : 1;
        l.light.intensity = 16 * flick; l.bulb.color.setHex(flick < 1 ? 0x6a5a40 : 0xffd28a);
      }
      flame.scale.set(1, 0.85 + 0.3 * Math.sin(t * 13), 1); fireLight.intensity = 9 + 3 * Math.sin(t * 17);
      for (const s of this.steam) { const k = ((t * 0.35 + s.userData.ph) % 1); s.position.y = 0.3 + k * 3.5; s.scale.setScalar(0.6 + k * 1.6); (s.material as THREE.MeshBasicMaterial).opacity = 0.14 * (1 - k); }
    });
  }
}
