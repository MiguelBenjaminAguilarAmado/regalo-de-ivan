import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export interface Seat { x: number; y: number; z: number; yaw: number }

const rngSeed = (s: number) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };

function personGeo(detail: 'hi' | 'lo'): { body: THREE.BufferGeometry; head: THREE.BufferGeometry } {
  if (detail === 'lo') {
    const t = new THREE.BoxGeometry(0.5, 0.62, 0.3); t.translate(0, 0.56, 0);
    const head = new THREE.OctahedronGeometry(0.15, 0); head.translate(0, 1.02, 0);
    return { body: t, head };
  }
  const t = new THREE.CapsuleGeometry(0.19, 0.34, 2, 8); t.scale(1.15, 1, 0.75); t.translate(0, 0.62, 0);
  const a = new THREE.CapsuleGeometry(0.055, 0.34, 2, 5); a.rotateZ(0.5); a.translate(-0.3, 0.8, 0.04);
  const b = new THREE.CapsuleGeometry(0.055, 0.34, 2, 5); b.rotateZ(-0.5); b.translate(0.3, 0.8, 0.04);
  const head = new THREE.SphereGeometry(0.125, 10, 8); head.scale(0.95, 1.1, 1); head.translate(0, 1.07, 0);
  return { body: mergeGeometries([t, a, b])!, head };
}

export class Crowd {
  group = new THREE.Group();
  time = { value: 0 };
  excite = { value: 0.3 };
  private flashMat: THREE.ShaderMaterial;
  count = 0;

  constructor(seats: Seat[], palette: number[], opts: { near?: (s: Seat) => boolean; seed?: number; flashes?: number; skins?: number[] } = {}) {
    const rnd = rngSeed(opts.seed ?? 7);
    const near = opts.near ?? (() => false);
    const hi = seats.filter(near), lo = seats.filter((s) => !near(s));
    this.count = seats.length;
    const skins = (opts.skins ?? [0xf1c8a5, 0xd9a27a, 0xb97d56, 0x8d5a3b, 0x6b4128, 0xe8b890]).map((c) => new THREE.Color(c));
    const pal = palette.map((c) => new THREE.Color(c));

    const make = (list: Seat[], detail: 'hi' | 'lo') => {
      if (!list.length) return;
      const { body, head } = personGeo(detail);
      const phase = new Float32Array(list.length);
      const bodyMat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x16161d });
      const headMat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x1c1512 });
      const patch = (mat: THREE.Material) => {
        mat.onBeforeCompile = (sh) => {
          sh.uniforms.uTime = this.time;
          sh.uniforms.uExcite = this.excite;
          sh.vertexShader = sh.vertexShader
            .replace('#include <common>', '#include <common>\nattribute float aPhase;\nuniform float uTime;\nuniform float uExcite;')
            .replace('#include <begin_vertex>', `#include <begin_vertex>
              float sp = 3.0 + fract(aPhase * 7.0) * 3.0;
              float hop = max(0.0, sin(uTime * sp + aPhase * 40.0));
              transformed.y += hop * hop * 0.2 * uExcite * (0.5 + fract(aPhase * 13.0));
              transformed.x += sin(uTime * 1.5 + aPhase * 20.0) * 0.02 * uExcite;`);
        };
      };
      patch(bodyMat); patch(headMat);
      const bm = new THREE.InstancedMesh(body, bodyMat, list.length);
      const hm = new THREE.InstancedMesh(head, headMat, list.length);
      const m = new THREE.Object3D();
      list.forEach((s, i) => {
        m.position.set(s.x, s.y, s.z);
        m.rotation.set(0, s.yaw, 0);
        const sc = 0.88 + rnd() * 0.25;
        m.scale.set(sc, sc * (0.92 + rnd() * 0.16), sc);
        m.updateMatrix();
        bm.setMatrixAt(i, m.matrix); hm.setMatrixAt(i, m.matrix);
        const c = pal[Math.floor(rnd() * pal.length)].clone().multiplyScalar(0.3 + rnd() * 0.5);
        bm.setColorAt(i, c);
        hm.setColorAt(i, skins[Math.floor(rnd() * skins.length)].clone().multiplyScalar(0.55 + rnd() * 0.35));
        phase[i] = rnd();
      });
      body.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
      head.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
      bm.instanceMatrix.needsUpdate = true; hm.instanceMatrix.needsUpdate = true;
      bm.frustumCulled = false; hm.frustumCulled = false;
      this.group.add(bm, hm);
    };
    make(hi, 'hi');
    make(lo, 'lo');

    // flashes de cámaras
    const nF = Math.min(opts.flashes ?? 500, seats.length);
    const pos = new Float32Array(nF * 3), ph = new Float32Array(nF);
    for (let i = 0; i < nF; i++) {
      const s = seats[Math.floor(rnd() * seats.length)];
      pos[i * 3] = s.x; pos[i * 3 + 1] = s.y + 1.1; pos[i * 3 + 2] = s.z; ph[i] = rnd();
    }
    const fg = new THREE.BufferGeometry();
    fg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    fg.setAttribute('aPhase', new THREE.BufferAttribute(ph, 1));
    this.flashMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: this.time, uExcite: this.excite, uScale: { value: 600 } },
      vertexShader: `attribute float aPhase; uniform float uTime; uniform float uExcite; uniform float uScale; varying float vA;
        void main(){ float r = 0.4 + aPhase * 1.6; float f = pow(max(0.0, sin(uTime * (1.0 + aPhase * 3.0) + aPhase * 100.0)), 60.0 / (0.4 + uExcite));
          vA = f; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = (0.9 + f * 1.8) * uScale / -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying float vA; void main(){ vec2 c = gl_PointCoord - 0.5; float d = 1.0 - smoothstep(0.0, 0.5, length(c)); gl_FragColor = vec4(vec3(1.0, 0.97, 0.85) * 3.0, d * vA); }`,
    });
    const pts = new THREE.Points(fg, this.flashMat);
    pts.frustumCulled = false;
    this.group.add(pts);
  }

  update(t: number, excite: number, viewportH: number) {
    this.time.value = t;
    this.excite.value += (excite - this.excite.value) * 0.05;
    this.flashMat.uniforms.uScale.value = viewportH * 0.5;
  }

  dispose() {
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mat = m.material as THREE.Material | undefined;
      mat?.dispose?.();
    });
  }
}
