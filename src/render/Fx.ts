import * as THREE from 'three';

interface P { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number; max: number; size: number; r: number; g: number; b: number; grav: number; drag: number }

/** Sistema de partículas simple (chispas aditivas y polvo). */
export class Fx {
  group = new THREE.Group();
  private pools: { pts: THREE.Points; list: P[]; max: number; geo: THREE.BufferGeometry }[] = [];

  constructor() {
    this.pools.push(this.makePool(500, true), this.makePool(300, false));
  }

  private makePool(max: number, additive: boolean) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(max * 3), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(max * 4), 4));
    geo.setAttribute('size', new THREE.BufferAttribute(new Float32Array(max), 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: { uScale: { value: 600 } },
      vertexShader: `attribute float size; attribute vec4 color; uniform float uScale; varying vec4 vC;
        void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = size * uScale / -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying vec4 vC; void main(){ vec2 c = gl_PointCoord - 0.5; float d = 1.0 - smoothstep(0.1, 0.5, length(c)); gl_FragColor = vec4(vC.rgb, vC.a * d); }`,
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    this.group.add(pts);
    return { pts, list: [] as P[], max, geo };
  }

  setScale(h: number) { for (const p of this.pools) (p.pts.material as THREE.ShaderMaterial).uniforms.uScale.value = h * 0.6; }

  private add(pool: number, p: P) { const q = this.pools[pool]; if (q.list.length < q.max) q.list.push(p); }

  sparks(x: number, y: number, z: number, n: number, color = 0xffd27a, speed = 4, size = 0.06) {
    const c = new THREE.Color(color);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, e = Math.random() * 1.4 - 0.2;
      const s = speed * (0.4 + Math.random());
      this.add(0, { x, y, z, vx: Math.cos(a) * Math.cos(e) * s, vy: Math.sin(e) * s + 1, vz: Math.sin(a) * Math.cos(e) * s, life: 0, max: 0.25 + Math.random() * 0.35, size: size * (0.6 + Math.random()), r: c.r * 2, g: c.g * 2, b: c.b * 2, grav: 9, drag: 1.5 });
    }
  }

  dust(x: number, y: number, z: number, n: number, spread = 1.2) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = spread * (0.3 + Math.random());
      this.add(1, { x: x + Math.cos(a) * 0.2, y: y + 0.05, z: z + Math.sin(a) * 0.2, vx: Math.cos(a) * s, vy: 0.3 + Math.random() * 0.8, vz: Math.sin(a) * s, life: 0, max: 0.6 + Math.random() * 0.6, size: 0.35 + Math.random() * 0.35, r: 0.6, g: 0.58, b: 0.55, grav: -0.2, drag: 2.0 });
    }
  }

  burst(x: number, y: number, z: number, color: number, n = 80, speed = 9) {
    this.sparks(x, y, z, n, color, speed, 0.1);
  }

  update(dt: number) {
    this.pools.forEach((pool, pi) => {
      const pos = pool.geo.getAttribute('position') as THREE.BufferAttribute;
      const col = pool.geo.getAttribute('color') as THREE.BufferAttribute;
      const siz = pool.geo.getAttribute('size') as THREE.BufferAttribute;
      let w = 0;
      for (let i = 0; i < pool.list.length; i++) {
        const p = pool.list[i];
        p.life += dt;
        if (p.life >= p.max) continue;
        p.vy -= p.grav * dt;
        const d = Math.exp(-p.drag * dt);
        p.vx *= d; p.vz *= d; if (pi === 1) p.vy *= d;
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
        const k = 1 - p.life / p.max;
        pos.setXYZ(w, p.x, p.y, p.z);
        col.setXYZW(w, p.r, p.g, p.b, pi === 0 ? k : k * 0.35);
        siz.setX(w, p.size * (pi === 0 ? k : 1.5 - k * 0.5));
        pool.list[w] = p;
        w++;
      }
      pool.list.length = w;
      for (let i = w; i < pool.max; i++) { siz.setX(i, 0); }
      pos.needsUpdate = true; col.needsUpdate = true; siz.needsUpdate = true;
      pool.geo.setDrawRange(0, Math.max(w, 1));
    });
  }
}
