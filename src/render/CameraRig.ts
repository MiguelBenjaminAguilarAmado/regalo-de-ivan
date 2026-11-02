import * as THREE from 'three';
import type { Fighter } from '../combat/Match';

const damp = (a: number, b: number, k: number, dt: number) => a + (b - a) * (1 - Math.exp(-k * dt));
const angDiff = (a: number, b: number) => { let d = a - b; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };

export type Shot =
  | { kind: 'finisher'; who: number; t: number; dur: number }
  | { kind: 'close'; who: number; t: number; dur: number }
  | { kind: 'orbit'; who: number }
  | { kind: 'intro'; t: number; dur: number }
  | null;

/** Cámara de retransmisión: se coloca de lado respecto a la línea entre los luchadores. */
export class CameraRig {
  yaw = 0;
  private pos = new THREE.Vector3(0, 6, 10);
  private look = new THREE.Vector3(0, 1.5, 0);
  private dist = 9;
  private fov = 40;
  shake = 0;
  shot: Shot = null;
  private orbit = 0;
  shakeScale = 1;
  /** Cámara de director (modo espectador): cambia de plano sola, como una retransmisión */
  auto = false;
  private as = { kind: 'wide', t: 0, dur: 4, seed: 0.3 };
  private cutPending = false;
  private lastKinds: string[] = [];
  private forced = 0;

  /** Pasa al siguiente plano ahora mismo */
  cut() { this.nextShot(true); }
  private nextShot(hard = false) {
    const kinds = ['wide', 'lowside', 'shoulder', 'crane', 'tight', 'post', 'lowside', 'shoulder', 'tight'];
    let k = kinds[Math.floor(Math.random() * kinds.length)];
    for (let i = 0; i < 4 && this.lastKinds.slice(-2).includes(k); i++) k = kinds[Math.floor(Math.random() * kinds.length)];
    this.lastKinds.push(k);
    this.as = { kind: k, t: 0, dur: 3.4 + Math.random() * 3.2, seed: Math.random() };
    this.cutPending = hard || Math.random() < 0.7;
    this.forced = 0;
  }
  private force(kind: string, dur: number) {
    if (this.forced > 0 && this.as.kind === kind) { this.as.dur = Math.max(this.as.dur, this.as.t + dur); return; }
    this.as = { kind, t: 0, dur, seed: Math.random() };
    this.cutPending = true; this.forced = dur;
  }
  /** Reacciona a lo que pasa en el ring (solo con cámara de director) */
  onEvent(type: 'heavy' | 'knockdown' | 'taunt' | 'pin') {
    if (!this.auto || this.shot) return;
    if (type === 'heavy') this.force('tight', 1.7);
    else if (type === 'knockdown') this.force('lowside', 2.4);
    else if (type === 'taunt') this.force('tight', 1.8);
  }

  /** Direcciones del plano (para mover al luchador en relación con la cámara) */
  get forward() { return { x: -Math.sin(this.yaw), z: -Math.cos(this.yaw) }; }
  get right() { return { x: Math.cos(this.yaw), z: -Math.sin(this.yaw) }; }

  setShot(s: Shot) { this.shot = s; if (s?.kind === 'orbit') this.orbit = this.yaw; }

  update(dt: number, camera: THREE.PerspectiveCamera, a: Fighter, b: Fighter, portrait: boolean) {
    const mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2;
    const my = Math.max(a.y, b.y) + 1.15;
    const dx = b.x - a.x, dz = b.z - a.z;
    const sep = Math.hypot(dx, dz);

    // yaw objetivo: perpendicular a la línea entre luchadores, del lado actual
    if (sep > 1.2 && !(this.shot && this.shot.kind !== 'close')) {
      const px = -dz / sep, pz = dx / sep;
      const cx = Math.sin(this.yaw), cz = Math.cos(this.yaw);
      let sx = px, sz = pz;
      const d1 = px * cx + pz * cz + 0.18 * pz;
      const d2 = -px * cx - pz * cz - 0.18 * pz;
      if (d2 > d1) { sx = -px; sz = -pz; }
      const target = Math.atan2(sx, sz);
      const diff = angDiff(target, this.yaw);
      this.yaw += Math.max(-1.1 * dt, Math.min(1.1 * dt, diff * 2.2 * dt));
    }

    let wantDist = Math.max(5.4, Math.min(11.5, 4.4 + sep * 0.9));
    let wantFov = portrait ? 58 : 40;
    let height = 1.8 + sep * 0.2;
    let lookX = mx, lookY = my, lookZ = mz;
    let px = mx + Math.sin(this.yaw) * wantDist, pz = mz + Math.cos(this.yaw) * wantDist;
    let py = my + height;
    let fast = 4.5;

    const sh = this.shot;
    if (sh) {
      if ('t' in sh) sh.t += dt;
      const who = 'who' in sh ? (sh.who === 0 ? a : b) : a;
      const other = who === a ? b : a;
      if (sh.kind === 'finisher') {
        // plano bajo, lateral, mirando al golpe
        const ax = who.x, az = who.z;
        const nx = -(other.z - az), nz = other.x - ax;
        const nl = Math.hypot(nx, nz) || 1;
        const side = (nx / nl) * Math.sign(Math.sin(this.yaw) * nx + Math.cos(this.yaw) * nz || 1);
        const sideZ = (nz / nl) * Math.sign(Math.sin(this.yaw) * nx + Math.cos(this.yaw) * nz || 1);
        const u = Math.min(1, sh.t / sh.dur);
        const r = 4.2 - 1.6 * u;
        px = (ax + other.x) / 2 + side * r; pz = (az + other.z) / 2 + sideZ * r;
        py = who.y + 1.0 + 0.4 * u;
        lookX = (ax + other.x) / 2; lookZ = (az + other.z) / 2; lookY = who.y + 1.25;
        wantFov = 30; fast = 5;
        this.yaw = Math.atan2(px - lookX, pz - lookZ);
      } else if (sh.kind === 'close') {
        const t = who;
        px = t.x + Math.sin(this.yaw) * 4.6; pz = t.z + Math.cos(this.yaw) * 4.6; py = t.y + 2.2;
        lookX = t.x; lookY = t.y + 0.5; lookZ = t.z; wantFov = 34; fast = 2.5;
      } else if (sh.kind === 'orbit') {
        this.orbit += dt * 0.35;
        const t = who;
        px = t.x + Math.sin(this.orbit) * 5.2; pz = t.z + Math.cos(this.orbit) * 5.2; py = t.y + 1.6;
        lookX = t.x; lookY = t.y + 1.2; lookZ = t.z; wantFov = 36; fast = 3;
        this.yaw = this.orbit;
      } else if (sh.kind === 'intro') {
        const u = Math.min(1, sh.t / sh.dur);
        const e = u * u * (3 - 2 * u);
        const ang = this.yaw + (1 - e) * 1.1;
        const rr = wantDist + (1 - e) * 9;
        px = Math.sin(ang) * rr; pz = Math.cos(ang) * rr; py = 4 + (1 - e) * 9;
        lookX = 0; lookY = 1.6; lookZ = 0; fast = 8;
        if (u >= 1) this.shot = null;
      }
      if ('dur' in sh && sh.t >= sh.dur && sh.kind !== 'intro') this.shot = null;
    }

    // ---- cámara de director
    if (this.auto && !this.shot) {
      this.as.t += dt;
      if (this.as.t >= this.as.dur) this.nextShot();
      const k = this.as.kind, t = this.as.t, seed = this.as.seed;
      const ux = sep > 0.01 ? dx / sep : 1, uz = sep > 0.01 ? dz / sep : 0;
      const nx = -uz, nz = ux;                  // perpendicular
      const side = seed < 0.5 ? 1 : -1;
      const baseY = Math.max(a.y, b.y);
      fast = 3.2;
      if (k === 'lowside') {
        const r = 4.4 + sep * 0.65;
        px = mx + nx * side * r + ux * Math.sin(t * 0.6) * 1.2; pz = mz + nz * side * r + uz * Math.sin(t * 0.6) * 1.2; py = baseY + 0.75;
        lookX = mx; lookY = baseY + 1.2; lookZ = mz; wantFov = portrait ? 62 : 46;
      } else if (k === 'shoulder') {
        const who = seed < 0.5 ? a : b, other = who === a ? b : a;
        const sx = other.x - who.x, sz = other.z - who.z, sl = Math.hypot(sx, sz) || 1;
        px = who.x - (sx / sl) * 2.3 + (-sz / sl) * 0.7; pz = who.z - (sz / sl) * 2.3 + (sx / sl) * 0.7; py = who.y + 1.9;
        lookX = other.x; lookY = other.y + 1.3; lookZ = other.z; wantFov = portrait ? 60 : 42;
      } else if (k === 'crane') {
        const ang = seed * 6.28 + t * 0.28, r = 7.2 + sep * 0.4;
        px = mx + Math.sin(ang) * r; pz = mz + Math.cos(ang) * r; py = baseY + 6.8 - Math.min(2, t * 0.3);
        lookX = mx; lookY = baseY + 1.0; lookZ = mz; wantFov = portrait ? 60 : 40;
      } else if (k === 'tight') {
        const r = 3.0 + sep * 0.55;
        px = mx + nx * side * r; pz = mz + nz * side * r; py = baseY + 1.7;
        lookX = mx; lookY = baseY + 1.35; lookZ = mz; wantFov = portrait ? 56 : 34;
      } else if (k === 'post') {
        const sx = mx > 0 ? -1 : 1, sz = mz > 0 ? -1 : 1;
        px = sx * 5.6; pz = sz * 5.6; py = 3.3;
        lookX = mx; lookY = baseY + 1.1; lookZ = mz; wantFov = portrait ? 66 : 48;
      } else {
        fast = 4.5; // 'wide': plano general por defecto
      }
      if (this.cutPending) {
        this.cutPending = false;
        this.pos.set(px, py, pz);
        this.look.set(lookX, lookY, lookZ);
        this.fov = wantFov;
      }
    }

    this.pos.x = damp(this.pos.x, px, fast, dt);
    this.pos.y = damp(this.pos.y, py, fast, dt);
    this.pos.z = damp(this.pos.z, pz, fast, dt);
    this.look.x = damp(this.look.x, lookX, fast * 1.4, dt);
    this.look.y = damp(this.look.y, lookY, fast * 1.4, dt);
    this.look.z = damp(this.look.z, lookZ, fast * 1.4, dt);
    this.fov = damp(this.fov, wantFov, 4, dt);

    this.shake = Math.max(0, this.shake - dt * 2.4);
    const sk = this.shake * this.shake * 0.22 * this.shakeScale;
    camera.position.set(this.pos.x + (Math.random() - 0.5) * sk, this.pos.y + (Math.random() - 0.5) * sk, this.pos.z + (Math.random() - 0.5) * sk);
    camera.lookAt(this.look);
    if (Math.abs(camera.fov - this.fov) > 0.05) { camera.fov = this.fov; camera.updateProjectionMatrix(); }
  }

  /** Coloca la cámara de golpe (nuevo combate) */
  snap(camera: THREE.PerspectiveCamera) {
    this.pos.set(Math.sin(this.yaw) * 10, 5, Math.cos(this.yaw) * 10);
    this.look.set(0, 1.5, 0);
    camera.position.copy(this.pos); camera.lookAt(this.look);
  }
}
