import * as THREE from 'three';
import { RING, RING_Y } from '../combat/Match';

export interface RingStyle {
  canvas: number;
  border: number;
  accent: number;
  rope: [number, number, number];
  skirt: number;
  apronText: string;
  ringText: string;
}

/** Logo "El Hoyo": anillos concéntricos que se hunden */
export function drawHoyoLogo(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, c1: string, c2: string) {
  const n = 7;
  for (let i = 0; i < n; i++) {
    const rr = r * (1 - i / n);
    g.fillStyle = i % 2 === 0 ? c1 : c2;
    g.beginPath(); g.arc(cx, cy + i * r * 0.025, rr, 0, Math.PI * 2); g.fill();
  }
  g.fillStyle = '#000';
  g.beginPath(); g.arc(cx, cy + r * 0.2, r / n * 0.9, 0, Math.PI * 2); g.fill();
}

function canvasTexture(style: RingStyle): THREE.CanvasTexture {
  const S = 1024;
  const c = document.createElement('canvas');
  c.width = S; c.height = S;
  const g = c.getContext('2d')!;
  const hex = (n: number) => '#' + n.toString(16).padStart(6, '0');
  g.fillStyle = hex(style.canvas);
  g.fillRect(0, 0, S, S);
  // lona desgastada
  for (let i = 0; i < 9000; i++) {
    g.fillStyle = `rgba(${Math.random() < 0.5 ? '0,0,0' : '255,255,255'},${Math.random() * 0.035})`;
    g.fillRect(Math.random() * S, Math.random() * S, 1 + Math.random() * 3, 1 + Math.random() * 3);
  }
  // marco
  g.strokeStyle = hex(style.border); g.lineWidth = 34;
  g.strokeRect(70, 70, S - 140, S - 140);
  g.strokeStyle = hex(style.accent); g.lineWidth = 8;
  g.strokeRect(110, 110, S - 220, S - 220);
  // logo central
  g.globalAlpha = 0.95;
  drawHoyoLogo(g, S / 2, S / 2 - 40, 250, hex(style.border), hex(style.accent));
  g.globalAlpha = 1;
  g.fillStyle = '#f4efe6';
  g.font = '900 120px Impact, "Arial Narrow", sans-serif';
  g.textAlign = 'center';
  g.fillText('EL HOYO', S / 2, S / 2 + 330);
  g.font = '700 54px Impact, "Arial Narrow", sans-serif';
  g.fillStyle = hex(style.accent);
  g.fillText(style.ringText, S / 2, S / 2 + 395);
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function skirtTexture(style: RingStyle): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 128;
  const g = c.getContext('2d')!;
  const hex = (n: number) => '#' + n.toString(16).padStart(6, '0');
  g.fillStyle = hex(style.skirt); g.fillRect(0, 0, 1024, 128);
  g.fillStyle = hex(style.accent); g.fillRect(0, 0, 1024, 10); g.fillRect(0, 118, 1024, 10);
  g.font = '900 78px Impact, "Arial Narrow", sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = '#f4efe6';
  g.fillText(style.apronText, 512, 66);
  drawHoyoLogo(g, 90, 64, 40, '#f4efe6', hex(style.accent));
  drawHoyoLogo(g, 934, 64, 40, '#f4efe6', hex(style.accent));
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function buildRing(style: RingStyle): THREE.Group {
  const g = new THREE.Group();
  const SIZE = RING + 0.6; // la plataforma sobresale de las cuerdas
  // base
  const base = new THREE.Mesh(new THREE.BoxGeometry(SIZE * 2, RING_Y, SIZE * 2), new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.8 }));
  base.position.y = RING_Y / 2 - 0.02;
  base.castShadow = false; base.receiveShadow = true;
  g.add(base);
  // lona (cara superior)
  const tex = canvasTexture(style);
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.78, metalness: 0 });
  const top = new THREE.Mesh(new THREE.PlaneGeometry(SIZE * 2, SIZE * 2), mat);
  top.rotation.x = -Math.PI / 2;
  top.position.y = RING_Y;
  top.receiveShadow = true;
  g.add(top);
  // faldón
  const st = skirtTexture(style);
  const sm = new THREE.MeshStandardMaterial({ map: st, roughness: 0.9 });
  for (const [x, z, ry] of [[0, SIZE, 0], [0, -SIZE, Math.PI], [SIZE, 0, Math.PI / 2], [-SIZE, 0, -Math.PI / 2]] as const) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(SIZE * 2, RING_Y * 0.85), sm);
    p.position.set(x + (x ? Math.sign(x) * 0.012 : 0), RING_Y * 0.45, z + (z ? Math.sign(z) * 0.012 : 0));
    p.rotation.y = ry;
    p.receiveShadow = true;
    g.add(p);
  }
  // postes + cuerdas + protecciones
  const postMat = new THREE.MeshStandardMaterial({ color: 0x9aa0a8, roughness: 0.3, metalness: 0.9 });
  const padColors = [style.accent, style.border, style.accent, style.border];
  const ropeHeights = [0.42, 0.78, 1.14];
  const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  corners.forEach(([sx, sz], i) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 1.5, 12), postMat);
    post.position.set(sx * RING, RING_Y + 0.75, sz * RING);
    post.castShadow = true;
    g.add(post);
    const padMat = new THREE.MeshStandardMaterial({ color: padColors[i], roughness: 0.55 });
    ropeHeights.forEach((h) => {
      const pad = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.16, 4, 10), padMat);
      pad.position.set(sx * (RING - 0.02), RING_Y + h, sz * (RING - 0.02));
      pad.castShadow = true;
      g.add(pad);
    });
  });
  // cuerdas
  ropeHeights.forEach((h, k) => {
    const rm = new THREE.MeshStandardMaterial({ color: style.rope[k], roughness: 0.55, metalness: 0.05 });
    for (const [x, z, ry] of [[0, RING, 0], [0, -RING, 0], [RING, 0, Math.PI / 2], [-RING, 0, Math.PI / 2]] as const) {
      const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, RING * 2, 8), rm);
      rope.rotation.z = Math.PI / 2;
      rope.rotation.y = ry;
      rope.position.set(x, RING_Y + h, z);
      rope.castShadow = true;
      g.add(rope);
    }
  });
  // escalones en una esquina
  const stepMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.6, metalness: 0.2 });
  for (let i = 0; i < 3; i++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.45), stepMat);
    s.position.set(RING + 0.9 + (2 - i) * 0.0, 0.3 + i * 0.3 - 0.0, RING - 1.4);
    s.position.x = SIZE + 0.25 + (2 - i) * 0.4;
    s.rotation.y = Math.PI / 2;
    s.castShadow = true;
    g.add(s);
  }
  return g;
}
