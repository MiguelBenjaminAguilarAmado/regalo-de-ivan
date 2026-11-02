import * as THREE from 'three';
import { FLOOR_LIM } from '../combat/Match';
import { buildRing, drawHoyoLogo, type RingStyle } from './Ring';
import type { Crowd } from './Crowd';

export type Quality = 'baja' | 'media' | 'alta';

export interface ArenaOpts { quality: Quality }

/** Pantalla LED con contenido animado en canvas */
export class LedScreen {
  mesh: THREE.Mesh;
  private c = document.createElement('canvas');
  private g: CanvasRenderingContext2D;
  private tex: THREE.CanvasTexture;
  private acc = 0;
  constructor(public w: number, public h: number, private palette: [string, string, string], private text = 'EL HOYO WRESTLING') {
    this.c.width = 512; this.c.height = Math.max(64, Math.round(512 * (h / w)));
    this.g = this.c.getContext('2d')!;
    this.tex = new THREE.CanvasTexture(this.c);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: this.tex, toneMapped: false, side: THREE.DoubleSide }));
    this.draw(0);
  }
  private draw(t: number) {
    const { g, c } = this;
    const [a, b, acc] = this.palette;
    const grd = g.createLinearGradient(0, 0, c.width, c.height);
    grd.addColorStop(0, a); grd.addColorStop(1, b);
    g.fillStyle = grd; g.fillRect(0, 0, c.width, c.height);
    // anillos que laten
    g.globalAlpha = 0.35;
    for (let i = 0; i < 6; i++) {
      g.strokeStyle = acc; g.lineWidth = 6;
      g.beginPath(); g.arc(c.width * 0.18, c.height / 2, 20 + ((i * 28 + t * 40) % 170), 0, Math.PI * 2); g.stroke();
    }
    g.globalAlpha = 1;
    // barras laterales tipo ecualizador
    for (let i = 0; i < 18; i++) {
      const hh = (0.2 + 0.8 * Math.abs(Math.sin(t * 2 + i * 0.7))) * c.height * 0.5;
      g.fillStyle = acc; g.globalAlpha = 0.5;
      g.fillRect(c.width * 0.55 + i * 14, c.height - hh, 9, hh);
    }
    g.globalAlpha = 1;
    drawHoyoLogo(g, c.width * 0.13, c.height / 2, c.height * 0.36, '#fff', acc);
    g.fillStyle = '#fff';
    g.font = `900 ${Math.round(c.height * 0.3)}px Impact, "Arial Narrow", sans-serif`;
    g.textAlign = 'left'; g.textBaseline = 'middle';
    g.shadowColor = acc; g.shadowBlur = 14;
    g.fillText(this.text, c.width * 0.26, c.height * 0.42);
    g.shadowBlur = 0;
    g.font = `700 ${Math.round(c.height * 0.14)}px "Arial Narrow", sans-serif`;
    g.fillStyle = acc;
    g.fillText('INSPIRADO EN LA OBRA ORIGINAL DE JEFEFBI', c.width * 0.26, c.height * 0.72);
    this.tex.needsUpdate = true;
  }
  update(dt: number, t: number) {
    this.acc += dt;
    if (this.acc > 0.12) { this.acc = 0; this.draw(t); }
  }
}

/** Haz de luz con foco móvil */
export class Beam {
  pivot = new THREE.Group();
  constructor(color: number, public len: number, radius: number, public phase: number, public speed: number, public swing: number) {
    const geo = new THREE.ConeGeometry(radius, len, 20, 1, true);
    geo.translate(0, -len / 2, 0);
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
    this.pivot.add(m);
  }
  update(t: number) {
    this.pivot.rotation.x = Math.sin(t * this.speed + this.phase) * this.swing;
    this.pivot.rotation.z = Math.cos(t * this.speed * 0.8 + this.phase * 1.7) * this.swing;
  }
}

export abstract class Arena {
  group = new THREE.Group();
  ring: THREE.Group;
  key: THREE.SpotLight;
  crowd: Crowd | null = null;
  screens: LedScreen[] = [];
  beams: Beam[] = [];
  anim: ((dt: number, t: number) => void)[] = [];
  abstract readonly id: string;
  abstract readonly displayName: string;
  fogColor = 0x050507;
  fogDensity = 0.006;
  exposure = 1.0;

  constructor(protected opts: ArenaOpts, ringStyle: RingStyle) {
    this.ring = buildRing(ringStyle);
    this.group.add(this.ring);

    // suelo
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(160, 48),
      new THREE.MeshStandardMaterial({ color: 0x0b0b0e, roughness: 0.5, metalness: 0.2 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.group.add(floor);

    // barricada
    const bm = new THREE.MeshStandardMaterial({ color: 0x15151a, roughness: 0.55, metalness: 0.3 });
    const L = FLOOR_LIM + 0.35;
    for (const [x, z, w, d] of [[0, L, L * 2 + 0.6, 0.3], [0, -L, L * 2 + 0.6, 0.3], [L, 0, 0.3, L * 2], [-L, 0, 0.3, L * 2]] as const) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, 1.15, d), bm);
      b.position.set(x, 0.575, z);
      b.castShadow = true; b.receiveShadow = true;
      this.group.add(b);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(w + 0.01, 0.07, d + 0.01), new THREE.MeshStandardMaterial({ color: ringStyle.accent, emissive: ringStyle.accent, emissiveIntensity: 0.6 }));
      strip.position.set(x, 1.0, z);
      this.group.add(strip);
    }

    // luz principal
    this.key = new THREE.SpotLight(0xfff1dd, 1, 0, 0.62, 0.55, 0);
    this.key.position.set(2, 26, 7);
    this.key.target.position.set(0, 1, 0);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(opts.quality === 'baja' ? 1024 : 2048, opts.quality === 'baja' ? 1024 : 2048);
    this.key.shadow.bias = -0.0004;
    this.key.shadow.normalBias = 0.03;
    this.key.shadow.camera.near = 8; this.key.shadow.camera.far = 60;
    this.group.add(this.key, this.key.target);
    const fill = new THREE.HemisphereLight(0x8793b8, 0x120c06, 0.16);
    this.group.add(fill);
  }

  addScreen(s: LedScreen, x: number, y: number, z: number, lookAt: [number, number, number] = [0, 6, 0]) {
    s.mesh.position.set(x, y, z);
    s.mesh.lookAt(...lookAt);
    this.group.add(s.mesh);
    this.screens.push(s);
    // marco
    const frame = new THREE.Mesh(new THREE.BoxGeometry(s.w + 0.5, s.h + 0.5, 0.3), new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.5, metalness: 0.6 }));
    frame.position.copy(s.mesh.position);
    frame.quaternion.copy(s.mesh.quaternion);
    frame.translateZ(-0.2);
    this.group.add(frame);
  }

  addBeam(b: Beam, x: number, y: number, z: number) {
    b.pivot.position.set(x, y, z);
    this.group.add(b.pivot);
    this.beams.push(b);
  }

  update(dt: number, t: number, excite: number, viewportH: number) {
    this.crowd?.update(t, excite, viewportH);
    for (const s of this.screens) s.update(dt, t);
    for (const b of this.beams) b.update(t);
    for (const a of this.anim) a(dt, t);
  }

  dispose() {
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose?.()); else mat?.dispose?.();
    });
  }
}
