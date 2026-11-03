import * as THREE from 'three';
import type { Appearance } from '../combat/types';
import { JOINTS, type Joint, type Pose } from './Pose';

const L_UARM = 0.3, L_FARM = 0.28, L_THIGH = 0.44, L_SHIN = 0.44;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Mat = THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;

function std(color: number, rough = 0.6, metal = 0, extra: Partial<THREE.MeshPhysicalMaterialParameters> = {}): Mat {
  return new THREE.MeshPhysicalMaterial({ color, roughness: rough, metalness: metal, ...extra });
}

/** Miembro ahusado con músculo (revolución), colgando hacia -Y desde el pivote (y=0). */
function taper(L: number, rTop: number, rBot: number, bulgeAt = 0.3, bulge = 0.12, seg = 14): THREE.LatheGeometry {
  const pts: THREE.Vector2[] = [];
  const cap = 4;
  for (let i = 0; i <= cap; i++) { const a = (i / cap) * Math.PI / 2; pts.push(new THREE.Vector2(rBot * Math.sin(a), -L - rBot * 0.6 * Math.cos(a))); }
  const n = 10;
  for (let i = 1; i < n; i++) {
    const u = 1 - i / n;
    const r = (rBot + (rTop - rBot) * (1 - u)) * (1 + bulge * Math.exp(-(((u - bulgeAt) / 0.22) ** 2)));
    pts.push(new THREE.Vector2(r, -L * u));
  }
  for (let i = 0; i <= cap; i++) { const a = Math.PI / 2 - (i / cap) * Math.PI / 2; pts.push(new THREE.Vector2(rTop * Math.sin(a), rTop * 0.6 * Math.cos(a))); }
  return new THREE.LatheGeometry(pts, seg);
}

/** Torso: cintura estrecha, pecho y hombros anchos (revolución, luego se aplana en Z). */
function torsoGeo(k = 1): THREE.LatheGeometry {
  const prof: [number, number][] = [[0, -0.07], [0.115, -0.06], [0.135, 0.0], [0.128, 0.09], [0.15, 0.22], [0.185, 0.35], [0.2, 0.43], [0.175, 0.5], [0.1, 0.545], [0.062, 0.575], [0, 0.585]];
  return new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r * k, y)), 24);
}

function stripeTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const g = c.getContext('2d')!;
  for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#111' : '#f1f1f1'; g.fillRect(0, i * 8, 64, 8); }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Humanoide articulado procedural. Mira hacia +Z; su izquierda es +X. */
export class FighterModel {
  root = new THREE.Group();
  body = new THREE.Group();
  hips = new THREE.Group();
  j = {} as Record<Joint, THREE.Group>;
  rHand = new THREE.Group();
  tongue: THREE.Object3D | null = null;
  chair: THREE.Group;
  briefcase: THREE.Group;
  mic: THREE.Group;
  bat: THREE.Group;
  helmet: THREE.Group;
  horn: THREE.Group;
  glow: THREE.Mesh;
  private shadowMeshes: THREE.Mesh[] = [];
  private b: number;
  private hScale: number;
  skinMat: Mat;

  constructor(public ap: Appearance) {
    this.b = ap.build;
    this.hScale = ap.height;
    this.skinMat = std(ap.skin, 0.55, 0, { sheen: 0.4, sheenRoughness: 0.5, sheenColor: new THREE.Color(ap.skin).multiplyScalar(1.1) });
    this.root.add(this.body);
    this.body.add(this.hips);
    for (const k of JOINTS) this.j[k] = k === 'hips' ? this.hips : new THREE.Group();
    this.root.scale.setScalar(this.hScale);
    this.build();
    this.chair = this.makeChair();
    this.briefcase = this.makeBriefcase();
    this.mic = this.makeMic();
    this.bat = this.makeBat();
    this.helmet = this.makeHelmet();
    this.horn = this.makeHorn();
    for (const o of [this.chair, this.briefcase, this.mic, this.bat, this.helmet, this.horn]) o.visible = false;
    this.rHand.add(this.chair, this.briefcase, this.mic, this.bat);
    this.j.head.add(this.helmet, this.horn);
    // aura para finishers
    this.glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 24, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    this.glow.position.y = 1.0;
    this.glow.visible = false;
    this.root.add(this.glow);
  }

  // ---------------------------------------------------------------- utilidades de construcción
  private mesh(geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D, x = 0, y = 0, z = 0, cast = true): THREE.Mesh {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = cast;
    m.receiveShadow = false;
    parent.add(m);
    this.shadowMeshes.push(m);
    return m;
  }
  /** Miembro ahusado colgando hacia -Y desde el pivote */
  private limb(parent: THREE.Object3D, r: number, L: number, mat: THREE.Material, rz = r, rBot = r * 0.72, bulgeAt = 0.3, bulge = 0.12) {
    const m = this.mesh(taper(L, r, rBot, bulgeAt, bulge), mat, parent, 0, 0, 0);
    m.scale.z = rz / r;
    return m;
  }

  private build() {
    const ap = this.ap, b = this.b;
    const skin = this.skinMat;
    const outfitMat = std(ap.outfitColor, ap.outfit === 'cuero' ? 0.32 : 0.85, ap.outfit === 'cuero' ? 0.12 : 0, ap.outfit === 'cuero' ? { clearcoat: 0.5, clearcoatRoughness: 0.35 } : { sheen: 0.6, sheenColor: new THREE.Color(0x444444) });
    const trunksMat = std(ap.trunksColor, 0.7);
    const accentMat = std(ap.accent, 0.5);
    const bootMat = std(0x0e0e0e, 0.45, 0.1);
    const isSuit = ap.outfit === 'traje' || ap.outfit === 'blazer' || ap.outfit === 'abrigo';
    const isRef = ap.outfit === 'arbitro';
    const trousers = isSuit || isRef;

    // ---------- pelvis
    const pelvis = this.mesh(new THREE.SphereGeometry(0.15, 14, 10), trousers ? outfitMat : trunksMat, this.hips, 0, 0, 0);
    pelvis.scale.set(1.3 * b, 0.8, 0.9);
    if (ap.outfit === 'cuero') {
      const belt = this.mesh(new THREE.CylinderGeometry(0.168 * b, 0.168 * b, 0.05, 20), std(0xb8bcc4, 0.25, 0.9), this.hips, 0, 0.1, 0);
      belt.scale.z = 0.8;
    }

    // ---------- torso
    const torso = this.j.torso;
    torso.position.set(0, 0.07, 0);
    this.hips.add(torso);
    const chestMat = ap.outfit === 'camiseta' || ap.outfit === 'sudadera' ? outfitMat : isRef ? std(0xffffff, 0.8) : ap.outfit === 'blazer' ? std(0xf4f4f4, 0.8) : (ap.outfit === 'traje' || ap.outfit === 'abrigo') ? std(0xe9e9ee, 0.7) : skin;
    const chest = this.mesh(torsoGeo(1), chestMat, torso, 0, 0, 0);
    chest.scale.set(1.2 * b, 1, 0.74);
    if (isRef) {
      const t = stripeTexture();
      t.repeat.set(1, 2);
      (chest.material as Mat).map = t;
      (chest.material as Mat).color.set(0xffffff);
    }
    if (ap.outfit === 'cuero' || ap.outfit === 'blazer') {
      // chaqueta abierta por delante
      const gap = ap.outfit === 'cuero' ? 1.25 : 0.7;
      const shellMat = std(ap.outfitColor, ap.outfit === 'cuero' ? 0.32 : 0.8, ap.outfit === 'cuero' ? 0.1 : 0, { side: THREE.DoubleSide, clearcoat: ap.outfit === 'cuero' ? 0.5 : 0, clearcoatRoughness: 0.35 });
      const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.235 * b, 0.19 * b, 0.56, 28, 1, true, gap / 2, Math.PI * 2 - gap), shellMat);
      shell.position.set(0, 0.26, 0);
      shell.scale.z = 0.8;
      shell.castShadow = true;
      torso.add(shell);
      // solapas
      for (const sx of [-1, 1]) {
        const lap = this.mesh(new THREE.BoxGeometry(0.05, 0.4, 0.03), shellMat, torso, sx * (ap.outfit === 'cuero' ? 0.14 : 0.09) * b, 0.3, 0.14);
        lap.rotation.z = -sx * 0.18;
      }
      if (ap.outfit === 'blazer') {
        // cuello mao de la camisa
        const col = this.mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.045, 14, 1, true), std(0xf4f4f4, 0.8), torso, 0, 0.55, 0.01);
        (col.material as Mat).side = THREE.DoubleSide;
      }
    }
    if (ap.outfit === 'traje') {
      const jacket = this.mesh(torsoGeo(1.1), outfitMat, torso, 0, 0.0, 0);
      jacket.scale.set(1.2 * b, 1.0, 0.82);
      // camisa + corbata + pañuelo
      this.mesh(new THREE.BoxGeometry(0.1, 0.4, 0.012), std(0xf2f2f6, 0.7), torso, 0, 0.3, 0.158);
      this.mesh(new THREE.BoxGeometry(0.04, 0.32, 0.014), accentMat, torso, 0, 0.26, 0.166);
      this.mesh(new THREE.BoxGeometry(0.055, 0.03, 0.012), accentMat, torso, 0.12 * b, 0.34, 0.165);
    }
    if (ap.outfit === 'abrigo') {
      const coat = this.mesh(torsoGeo(1.14), outfitMat, torso, 0, 0, 0);
      coat.scale.set(1.24 * b, 1, 0.86);
      const skirt = this.mesh(new THREE.CylinderGeometry(0.19 * b, 0.27 * b, 0.4, 20, 1, true), std(ap.outfitColor, 0.85, 0, { side: THREE.DoubleSide }), this.hips, 0, -0.18, 0);
      skirt.scale.z = 0.8;
    }

    if (ap.outfit === 'sudadera') {
      // capucha caída por detrás, bolsillo canguro y cordones
      const hood = this.mesh(new THREE.SphereGeometry(0.13, 14, 10), outfitMat, torso, 0, 0.56, -0.09, true);
      hood.scale.set(1.25 * b, 0.75, 0.8);
      const pocket = this.mesh(new THREE.BoxGeometry(0.2 * b, 0.1, 0.02), std(ap.outfitColor, 0.9), torso, 0, 0.1, 0.152);
      pocket.material = std(new THREE.Color(ap.outfitColor).multiplyScalar(0.88).getHex(), 0.9);
      for (const sx of [-1, 1]) this.mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.15, 5), std(0xdddddd, 0.7), torso, sx * 0.03, 0.43, 0.152);
    }
    if (ap.belt != null) {
      // cinturón de campeón: correa + placa dorada
      const strap = this.mesh(new THREE.CylinderGeometry(0.172 * b, 0.172 * b, 0.075, 22), std(ap.belt, 0.55), this.hips, 0, 0.11, 0);
      strap.scale.z = 0.82;
      const plate = this.mesh(new THREE.BoxGeometry(0.13, 0.11, 0.025), std(0xd8b43a, 0.25, 0.95), this.hips, 0, 0.11, 0.152 * b);
      this.mesh(new THREE.BoxGeometry(0.075, 0.065, 0.012), std(0x8a1a1a, 0.4, 0.3), this.hips, 0, 0.11, 0.166 * b);
      void plate;
    }
    if (ap.backpack != null) {
      const bp = this.mesh(new THREE.BoxGeometry(0.3 * b, 0.4, 0.15), std(ap.backpack, 0.6, 0.3), torso, 0, 0.3, -0.2);
      for (const sx of [-1, 1]) this.mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.34, 10), std(0xcfd3da, 0.4, 0.5), torso, sx * 0.1, 0.3, -0.31);
      void bp;
    }
    if (ap.bandages != null) {
      // vendas de momia: aros en torso, brazos y piernas
      const bm = std(ap.bandages, 0.9);
      const ring = (parent: THREE.Object3D, y: number, r: number, tilt: number) => { const t = this.mesh(new THREE.TorusGeometry(r, 0.012, 5, 18), bm, parent, 0, y, 0); t.rotation.x = Math.PI / 2 + tilt; return t; };
      for (const y of [0.08, 0.2, 0.32, 0.44]) { const t = ring(torso, y, 0.185 * b, (y - 0.25) * 0.5); t.scale.set(1.2, 1, 0.8); }
    }

    // ---------- cuello y cabeza
    const head = this.j.head;
    head.position.set(0, 0.58, 0);
    torso.add(head);
    this.mesh(new THREE.CylinderGeometry(0.058, 0.07, 0.11, 12), skin, torso, 0, 0.54, 0);
    this.buildHead(head, skin);

    // ---------- brazos
    for (const side of [1, -1] as const) {
      const U = this.j[side === 1 ? 'lU' : 'rU'], F = this.j[side === 1 ? 'lF' : 'rF'];
      U.position.set(side * (0.215 * b + 0.04), 0.46, 0);
      torso.add(U);
      F.position.set(0, -L_UARM, 0);
      U.add(F);
      const sleeve = ap.outfit === 'cuero' || isSuit || isRef || ap.outfit === 'sudadera';
      const short = ap.outfit === 'camiseta';
      this.limb(U, 0.07 * b, L_UARM, sleeve || short ? outfitMat : skin, 0.066 * b, 0.05 * b, 0.28, 0.15);
      this.mesh(new THREE.SphereGeometry(0.078 * b, 12, 10), sleeve || short ? outfitMat : skin, U, 0, 0.005, 0);
      this.limb(F, 0.052 * b, L_FARM, sleeve ? outfitMat : skin, 0.05 * b, 0.036 * b, 0.22, 0.18);
      // mano
      const hand = side === -1 ? this.rHand : new THREE.Group();
      hand.position.set(0, -L_FARM, 0);
      F.add(hand);
      const h = this.mesh(new THREE.SphereGeometry(0.058, 12, 10), skin, hand, 0, -0.035, 0.012);
      h.scale.set(1, 1.08, 1.15);
      this.mesh(new THREE.CylinderGeometry(0.044, 0.04, 0.05, 10), skin, hand, 0, 0.0, 0);
      if (ap.wraps != null) {
        const wm = std(ap.wraps, 0.8);
        this.mesh(new THREE.CylinderGeometry(0.047 * b, 0.042 * b, 0.13, 12), wm, F, 0, -L_FARM + 0.07, 0);
        const pk = this.mesh(new THREE.TorusGeometry(0.046 * b, 0.009, 6, 14), accentMat, F, 0, -L_FARM + 0.1, 0); pk.rotation.x = Math.PI / 2;
        const pk2 = this.mesh(new THREE.TorusGeometry(0.044 * b, 0.009, 6, 14), accentMat, F, 0, -L_FARM + 0.05, 0); pk2.rotation.x = Math.PI / 2;
      }
      if (ap.bandages != null) {
        const bm = std(ap.bandages, 0.9);
        for (const y of [-0.06, -0.16, -0.24]) { const t = this.mesh(new THREE.TorusGeometry(0.066 * b, 0.011, 5, 14), bm, U, 0, y, 0); t.rotation.x = Math.PI / 2; }
        for (const y of [-0.05, -0.13, -0.2]) { const t = this.mesh(new THREE.TorusGeometry(0.05 * b, 0.011, 5, 14), bm, F, 0, y, 0); t.rotation.x = Math.PI / 2 + 0.2; }
      }
      if (ap.outfit === 'cuero') { /* puños */ this.mesh(new THREE.CylinderGeometry(0.047, 0.045, 0.03, 10), outfitMat, F, 0, -L_FARM + 0.02, 0); }
    }

    // ---------- piernas
    for (const side of [1, -1] as const) {
      const T = this.j[side === 1 ? 'lT' : 'rT'], S = this.j[side === 1 ? 'lS' : 'rS'];
      T.position.set(side * 0.105 * b, -0.04, 0);
      this.hips.add(T);
      S.position.set(0, -L_THIGH, 0);
      T.add(S);
      this.limb(T, 0.108 * b, L_THIGH, trousers ? outfitMat : skin, 0.1 * b, 0.07 * b, 0.25, 0.14);
      this.limb(S, 0.072 * b, L_SHIN, trousers ? outfitMat : skin, 0.07 * b, 0.046 * b, 0.28, 0.2);
      if (!trousers) {
        const tr = this.mesh(new THREE.CylinderGeometry(0.112 * b, 0.12 * b, 0.22, 14), trunksMat, T, 0, -0.1, 0);
        tr.scale.z = 1.0;
        if (ap.outfit !== 'camiseta') this.mesh(new THREE.TorusGeometry(0.118 * b, 0.007, 6, 16), accentMat, T, 0, -0.21, 0).rotation.x = Math.PI / 2;
      }
      if (ap.bandages != null) {
        const bm = std(ap.bandages, 0.9);
        for (const y of [-0.05, -0.14, -0.23]) { const t = this.mesh(new THREE.TorusGeometry(0.1 * b, 0.012, 5, 14), bm, T, 0, y, 0); t.rotation.x = Math.PI / 2; }
        for (const y of [-0.06, -0.15, -0.24]) { const t = this.mesh(new THREE.TorusGeometry(0.066 * b, 0.011, 5, 14), bm, S, 0, y, 0); t.rotation.x = Math.PI / 2; }
      }
      // bota
      const boot = this.mesh(new THREE.CapsuleGeometry(0.052 * b, 0.17, 4, 10), bootMat, S, 0, -L_SHIN - 0.0, 0.085);
      boot.rotation.x = Math.PI / 2; boot.scale.set(1, 1, 0.62);
      this.mesh(new THREE.CylinderGeometry(0.058 * b, 0.066 * b, 0.14, 12), bootMat, S, 0, -L_SHIN + 0.07, 0);
    }
  }

  private buildHead(head: THREE.Group, skin: Mat) {
    const ap = this.ap;
    const g = new THREE.Group();
    head.add(g);
    const cranium = this.mesh(new THREE.SphereGeometry(0.118, 20, 16), skin, g, 0, 0.14, 0);
    cranium.scale.set(0.93, 1.08, 1.02);
    // mandíbula
    const jaw = this.mesh(new THREE.SphereGeometry(0.085, 14, 10), skin, g, 0, 0.075, 0.02);
    jaw.scale.set(0.95, 0.85, 1.0);
    // orejas
    for (const sx of [-1, 1]) {
      const ear = this.mesh(new THREE.SphereGeometry(0.03, 8, 6), skin, g, sx * 0.112, 0.14, 0);
      ear.scale.set(0.5, 1, 0.8);
    }
    const dark = std(0x120d0b, 0.8);
    if (ap.mask === 'perro') { this.buildDogMask(g, skin); }
    else if (ap.mask === 'caballo') { this.buildHorseMask(g); }
    else if (ap.mask === 'doge') { this.buildDogeMask(g); }
    else if (ap.mask === 'bolsa') { this.buildBagMask(g, ap.maskColor ?? 0x141414); }
    else if (ap.mask === 'alien') { this.buildAlienMask(g); }
    else if (ap.mask === 'hamburguesa') { this.buildBurgerMask(g); }
    else {
      // ojos
      const eyeWhite = std(0xf6f6f6, 0.25);
      const iris = std(ap.facePaint === 'payaso' ? 0x2a6fdb : 0x2b1d14, 0.3);
      for (const sx of [-1, 1]) {
        if (ap.facePaint === 'payaso') {
          const patch = this.mesh(new THREE.SphereGeometry(0.05, 14, 10), std(0xfafafa, 0.5), g, sx * 0.048, 0.162, 0.082);
          patch.scale.set(1.15, 0.85, 0.35);
          const blue = this.mesh(new THREE.SphereGeometry(0.042, 12, 8), std(0x2f77ee, 0.45), g, sx * 0.05, 0.145, 0.092);
          blue.scale.set(1.0, 0.55, 0.3);
        }
        const e = this.mesh(new THREE.SphereGeometry(0.02, 10, 8), eyeWhite, g, sx * 0.045, 0.155, 0.1);
        e.scale.set(1.2, 0.8, 0.6);
        const ir = this.mesh(new THREE.SphereGeometry(0.0115, 8, 6), iris, g, sx * 0.045, 0.155, 0.11);
        ir.scale.z = 0.5;
        const brow = this.mesh(new THREE.BoxGeometry(0.05, 0.011, 0.012), ap.hair != null || ap.beard != null ? dark : std(0x2a1d12, 0.9), g, sx * 0.048, 0.19, 0.098);
        brow.rotation.z = sx * -0.2;
      }
      // nariz
      const nose = this.mesh(new THREE.SphereGeometry(0.02, 10, 8), ap.facePaint === 'payaso' ? std(0xe0402e, 0.4) : skin, g, 0, 0.12, 0.118);
      nose.scale.set(1, 1.1, 1.15);
      // boca
      this.mesh(new THREE.BoxGeometry(0.05, 0.008, 0.01), std(0x6a2d2d, 0.6), g, 0, 0.075, 0.105);
    }
    // pelo / barba / gafas
    if (ap.hair) {
      const hair = this.mesh(new THREE.SphereGeometry(0.124, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.46), std(ap.hair, 0.9), g, 0, 0.145, -0.004);
      hair.scale.set(0.95, 1.1, 1.05);
      hair.rotation.x = -0.12;
    }
    if (ap.beard != null) {
      const bm = std(ap.beard, 0.95);
      const beard = this.mesh(new THREE.SphereGeometry(0.093, 18, 12, 0, Math.PI * 2, Math.PI * 0.34, Math.PI * 0.66), bm, g, 0, 0.082, 0.022);
      beard.scale.set(1.0, 1.0, 1.06);
      const must = this.mesh(new THREE.CapsuleGeometry(0.008, 0.07, 4, 8), bm, g, 0, 0.098, 0.113);
      must.rotation.z = Math.PI / 2;
    }
    if (ap.hairStyle === 'larga' && ap.hair) {
      const hm = std(ap.hair, 0.9);
      const back = this.mesh(new THREE.CapsuleGeometry(0.1, 0.2, 6, 12), hm, g, 0, 0.04, -0.07);
      back.scale.set(1.1, 1, 0.7);
      for (const sx of [-1, 1]) { const side = this.mesh(new THREE.CapsuleGeometry(0.03, 0.18, 4, 8), hm, g, sx * 0.105, 0.08, -0.01); side.scale.z = 0.8; }
    }
    if (ap.hairStyle === 'cresta' && ap.hair) {
      const cm = std(ap.hair, 0.55, 0, { clearcoat: 0.3 });
      const crest = this.mesh(new THREE.CylinderGeometry(0.07, 0.115, 0.36, 18), cm, g, 0, 0.36, -0.02);
      crest.scale.set(1.0, 1.0, 1.2);
      this.mesh(new THREE.SphereGeometry(0.07, 14, 10), cm, g, 0, 0.54, -0.02).scale.set(1, 0.7, 1.2);
      for (const sx of [-1, 1]) { const lock = this.mesh(new THREE.CapsuleGeometry(0.035, 0.22, 4, 8), cm, g, sx * 0.115, 0.07, -0.03); lock.scale.z = 0.8; }
    }
    if (ap.hat) this.buildHat(g, ap.hat);
    if (ap.glasses) {
      const gm = std(0xc9ccd2, 0.2, 0.9);
      for (const sx of [-1, 1]) {
        const r = this.mesh(new THREE.TorusGeometry(0.034, 0.0035, 6, 20), gm, g, sx * 0.048, 0.155, 0.112, false);
        r.rotation.y = 0;
        const lens = this.mesh(new THREE.CircleGeometry(0.033, 16), new THREE.MeshPhysicalMaterial({ color: ap.glasses === 'sol' ? 0x050505 : 0xffffff, transparent: true, opacity: ap.glasses === 'sol' ? 0.95 : 0.12, roughness: 0.05, transmission: 0 }), g, sx * 0.048, 0.155, 0.112, false);
        const temple = this.mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.11, 4), gm, g, sx * 0.087, 0.155, 0.057, false);
        temple.rotation.x = Math.PI / 2;
      }
      this.mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.025, 4), gm, g, 0, 0.158, 0.113, false).rotation.z = Math.PI / 2;
    }
  }

  private buildDogMask(g: THREE.Group, skin: Mat) {
    const white = std(0xf1eee8, 0.18, 0, { clearcoat: 1, clearcoatRoughness: 0.08 });
    const brown = std(0x3a2418, 0.3, 0, { clearcoat: 0.8, clearcoatRoughness: 0.15 });
    const pink = std(0xe8605d, 0.35, 0, { clearcoat: 0.6 });
    const dome = this.mesh(new THREE.SphereGeometry(0.14, 22, 16), white, g, 0, 0.145, -0.004);
    dome.scale.set(0.98, 1.12, 1.08);
    // zona marrón de la frente
    const patch = this.mesh(new THREE.SphereGeometry(0.142, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.2), brown, g, 0, 0.145, -0.004);
    patch.scale.set(0.98, 1.12, 1.08);
    patch.rotation.x = -0.35;
    // hocico
    const snout = this.mesh(new THREE.CapsuleGeometry(0.056, 0.13, 6, 14), white, g, 0, 0.1, 0.17);
    snout.rotation.x = Math.PI / 2 + 0.1;
    snout.scale.set(1, 1, 0.85);
    this.mesh(new THREE.SphereGeometry(0.034, 12, 10), brown, g, 0, 0.115, 0.262);
    // mandíbula inferior + barba marrón
    const jaw = this.mesh(new THREE.CapsuleGeometry(0.04, 0.12, 6, 12), white, g, 0, 0.035, 0.175);
    jaw.rotation.x = Math.PI / 2 + 0.28;
    const beard = this.mesh(new THREE.CapsuleGeometry(0.03, 0.12, 6, 10), brown, g, 0, 0.015, 0.17);
    beard.rotation.x = Math.PI / 2 + 0.3;
    // interior de la boca
    this.mesh(new THREE.BoxGeometry(0.07, 0.012, 0.12), std(0x2a0d10, 0.8), g, 0, 0.062, 0.2).rotation.x = 0.14;
    // lengua colgando (se balancea)
    const tongue = new THREE.Group();
    tongue.position.set(0, 0.058, 0.23);
    g.add(tongue);
    const tg = this.mesh(new THREE.CapsuleGeometry(0.03, 0.12, 4, 8), pink, tongue, 0, -0.07, 0.02);
    tg.scale.set(1, 1, 0.3);
    this.tongue = tongue;
    // ojos de la máscara
    for (const sx of [-1, 1]) {
      const ring = this.mesh(new THREE.SphereGeometry(0.036, 12, 10), brown, g, sx * 0.062, 0.175, 0.112);
      ring.scale.set(1, 1, 0.5);
      const eye = this.mesh(new THREE.SphereGeometry(0.026, 12, 10), std(0xfafafa, 0.1, 0, { clearcoat: 1 }), g, sx * 0.062, 0.175, 0.125);
      eye.scale.z = 0.6;
      this.mesh(new THREE.SphereGeometry(0.012, 8, 6), std(0x000000, 0.1), g, sx * 0.062, 0.175, 0.138).scale.z = 0.5;
      // oreja
      const ear = this.mesh(new THREE.ConeGeometry(0.095, 0.27, 12), white, g, sx * 0.095, 0.33, -0.02);
      ear.rotation.z = -sx * 0.28; ear.scale.z = 0.75;
      const tip = this.mesh(new THREE.ConeGeometry(0.062, 0.15, 12), brown, g, sx * 0.112, 0.4, -0.02);
      tip.rotation.z = -sx * 0.28; tip.scale.z = 0.75;
      const inner = this.mesh(new THREE.ConeGeometry(0.055, 0.19, 12), std(0xd9a89a, 0.5), g, sx * 0.095, 0.325, 0.02);
      inner.rotation.z = -sx * 0.28; inner.scale.z = 0.4;
    }
    void skin;
  }

  private buildHat(g: THREE.Group, hat: { kind: 'gorra' | 'sombrero' | 'casco' | 'tricornio' | 'corona'; color: number }) {
    const m = std(hat.color, 0.8, 0, { sheen: 0.5, sheenColor: new THREE.Color(0x555555) });
    if (hat.kind === 'corona') {
      // corona dorada con puntas y gemas
      const gold = std(hat.color, 0.25, 0.95);
      const band = this.mesh(new THREE.CylinderGeometry(0.125, 0.135, 0.07, 20, 1, true), gold, g, 0, 0.27, 0.0);
      (band.material as Mat).side = THREE.DoubleSide;
      for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; const sp = this.mesh(new THREE.ConeGeometry(0.03, 0.1, 6), gold, g, Math.cos(a) * 0.13, 0.35, Math.sin(a) * 0.13); sp.rotation.z = -Math.cos(a) * 0.12; sp.rotation.x = Math.sin(a) * 0.12; this.mesh(new THREE.SphereGeometry(0.014, 6, 5), std(i % 2 ? 0xc1272d : 0x2a6fe0, 0.2, 0.2), g, Math.cos(a) * 0.13, 0.4, Math.sin(a) * 0.13); }
      return;
    }
    if (hat.kind === 'casco') {
      // casco de legionario romano: calota metálica, cresta roja y carrilleras
      const metal = std(hat.color, 0.3, 0.9);
      const dome = this.mesh(new THREE.SphereGeometry(0.133, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), metal, g, 0, 0.15, -0.004);
      dome.scale.set(0.98, 1.0, 1.08);
      const crest = this.mesh(new THREE.BoxGeometry(0.05, 0.1, 0.27), std(0xb3262b, 0.8), g, 0, 0.3, -0.01);
      crest.scale.y = 1;
      const brow = this.mesh(new THREE.BoxGeometry(0.26, 0.025, 0.03), metal, g, 0, 0.215, 0.12);
      void brow;
      for (const sx of [-1, 1]) this.mesh(new THREE.BoxGeometry(0.03, 0.15, 0.1), metal, g, sx * 0.118, 0.1, 0.03);
      return;
    }
    if (hat.kind === 'tricornio') {
      // sombrero pirata: copa baja, ala con tres picos, calavera y plumas azules
      const copa = this.mesh(new THREE.CylinderGeometry(0.105, 0.125, 0.1, 18), m, g, 0, 0.255, 0.0);
      void copa;
      this.mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.015, 3), m, g, 0, 0.215, 0.0).rotation.y = Math.PI / 2;
      for (const [rx, ry] of [[0.2, 0], [-0.17, 2.1], [-0.17, -2.1]] as const) {
        const wing = this.mesh(new THREE.BoxGeometry(0.2, 0.1, 0.012), m, g, Math.sin(ry) * 0.17 + 0, 0.255, Math.cos(ry) * 0.17 + (ry === 0 ? 0.02 : 0));
        wing.rotation.set(rx, ry, 0);
      }
      this.mesh(new THREE.SphereGeometry(0.03, 8, 6), std(0xf2efe6, 0.5), g, 0, 0.275, 0.17);
      const blue = std(0x2a8fd0, 0.6);
      for (let i = 0; i < 3; i++) { const f = this.mesh(new THREE.CapsuleGeometry(0.014, 0.17, 4, 6), blue, g, 0.17 + i * 0.015, 0.31 + i * 0.012, -0.02 - i * 0.03); f.rotation.set(0.3 * i, 0, -1.0 - i * 0.18); }
      return;
    }
    if (hat.kind === 'gorra') {
      const dome = this.mesh(new THREE.SphereGeometry(0.128, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), m, g, 0, 0.158, -0.004);
      dome.scale.set(0.97, 1.0, 1.06);
      const visor = this.mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.012, 20, 1, false, -Math.PI * 0.5, Math.PI), m, g, 0, 0.178, 0.115);
      visor.rotation.x = 0.1; visor.scale.set(1.0, 1, 1.15);
    } else {
      this.mesh(new THREE.CylinderGeometry(0.215, 0.215, 0.012, 28), m, g, 0, 0.215, 0.01);
      const crown = this.mesh(new THREE.CylinderGeometry(0.108, 0.128, 0.115, 22), m, g, 0, 0.27, 0.0);
      crown.scale.set(0.95, 1, 1.05);
      this.mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.02, 22), std(0x161616, 0.6), g, 0, 0.232, 0.0).scale.set(0.95, 1, 1.05);
    }
  }

  private buildDogeMask(g: THREE.Group) {
    const gold = std(0xe7b04a, 0.45, 0, { clearcoat: 0.6, clearcoatRoughness: 0.3 });
    const cream = std(0xf4e9d2, 0.4, 0, { clearcoat: 0.5, clearcoatRoughness: 0.3 });
    const black = std(0x0d0b0a, 0.25, 0, { clearcoat: 0.8 });
    const dome = this.mesh(new THREE.SphereGeometry(0.15, 22, 16), gold, g, 0, 0.15, -0.005);
    dome.scale.set(1.0, 1.05, 1.05);
    // cuello/papada de goma, blanca
    const neck = this.mesh(new THREE.CylinderGeometry(0.1, 0.125, 0.14, 18), cream, g, 0, -0.015, 0.0);
    neck.scale.z = 1.1;
    // hocico blanco
    const snout = this.mesh(new THREE.CapsuleGeometry(0.058, 0.1, 6, 14), cream, g, 0, 0.082, 0.14);
    snout.rotation.x = Math.PI / 2; snout.scale.set(1.1, 1, 0.8);
    this.mesh(new THREE.SphereGeometry(0.03, 12, 10), black, g, 0, 0.108, 0.218).scale.set(1.2, 0.85, 0.9);
    // sonrisa ladeada
    this.mesh(new THREE.BoxGeometry(0.09, 0.008, 0.012), black, g, 0, 0.05, 0.19).rotation.z = 0.12;
    for (const sx of [-1, 1]) {
      // ojos grandes mirando de lado
      const white = this.mesh(new THREE.SphereGeometry(0.036, 14, 12), std(0xfdfdfd, 0.1, 0, { clearcoat: 1 }), g, sx * 0.065, 0.178, 0.105);
      white.scale.set(1, 1.05, 0.7);
      this.mesh(new THREE.SphereGeometry(0.019, 10, 8), black, g, sx * 0.065 + 0.012, 0.172, 0.13).scale.z = 0.5;
      // orejas puntiagudas
      const ear = this.mesh(new THREE.ConeGeometry(0.06, 0.18, 4), gold, g, sx * 0.085, 0.31, -0.01);
      ear.rotation.z = -sx * 0.22; ear.scale.z = 0.5;
      const inner = this.mesh(new THREE.ConeGeometry(0.035, 0.12, 4), cream, g, sx * 0.085, 0.305, 0.012);
      inner.rotation.z = -sx * 0.22; inner.scale.z = 0.3;
    }
  }

  private buildBagMask(g: THREE.Group, color = 0x141414) {
    const bag = std(color, 0.7, 0, { sheen: 0.4, sheenColor: new THREE.Color(0x888888) });
    const hole = std(0x000000, 1);
    const box = this.mesh(new THREE.BoxGeometry(0.3, 0.38, 0.28), bag, g, 0, 0.17, 0.0);
    box.scale.set(1, 1, 1);
    // pliegue superior
    this.mesh(new THREE.BoxGeometry(0.3, 0.02, 0.28), std(new THREE.Color(color).multiplyScalar(0.7).getHex(), 0.8), g, 0, 0.365, 0.0);
    for (const sx of [-1, 1]) {
      const eye = this.mesh(new THREE.BoxGeometry(0.07, 0.085, 0.01), hole, g, sx * 0.075, 0.2, 0.142);
      eye.rotation.z = sx * 0.06;
    }
    // sonrisa de Marshmello
    const smile = this.mesh(new THREE.TorusGeometry(0.075, 0.009, 6, 18, Math.PI), std(0x050505, 0.9), g, 0, 0.13, 0.143);
    smile.rotation.z = Math.PI;
  }

  private buildAlienMask(g: THREE.Group) {
    const green = std(0x8fb89a, 0.35, 0, { clearcoat: 0.6, clearcoatRoughness: 0.25 });
    const black = std(0x050805, 0.15, 0.2, { clearcoat: 1 });
    // cráneo alargado hacia atrás
    const dome = this.mesh(new THREE.SphereGeometry(0.14, 22, 16), green, g, 0, 0.17, -0.03);
    dome.scale.set(0.95, 1.4, 1.1);
    const chin = this.mesh(new THREE.SphereGeometry(0.085, 14, 10), green, g, 0, 0.04, 0.05);
    chin.scale.set(0.9, 0.9, 1);
    for (const sx of [-1, 1]) {
      // ojos negros grandes en forma de almendra
      const eye = this.mesh(new THREE.SphereGeometry(0.052, 14, 10), black, g, sx * 0.058, 0.14, 0.12);
      eye.scale.set(1.2, 0.62, 0.45); eye.rotation.z = -sx * 0.5;
    }
    this.mesh(new THREE.BoxGeometry(0.035, 0.006, 0.01), black, g, 0, 0.045, 0.135);
    for (const sx of [-1, 1]) this.mesh(new THREE.SphereGeometry(0.006, 5, 4), black, g, sx * 0.01, 0.09, 0.145);
  }

  /** Cabeza de hamburguesa con antifaz de luchador (Big Mac) */
  private buildBurgerMask(g: THREE.Group) {
    const bun = std(0xd9a040, 0.5, 0, { clearcoat: 0.4, clearcoatRoughness: 0.4 });
    const patty = std(0x4a2a18, 0.8);
    const lettuce = std(0x6cc04a, 0.7);
    const cheese = std(0xf2c230, 0.5);
    const R = 0.15;
    // pan de arriba
    const top = this.mesh(new THREE.SphereGeometry(R, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), bun, g, 0, 0.255, 0.0);
    top.scale.set(1.05, 0.85, 1.05);
    for (let i = 0; i < 9; i++) { const a = i * 0.7; const sd = this.mesh(new THREE.SphereGeometry(0.008, 5, 4), std(0xf6e6c0, 0.5), g, Math.cos(a) * 0.07 * (0.4 + (i % 3) * 0.3), 0.37 - (i % 3) * 0.02, Math.sin(a) * 0.07 * (0.4 + (i % 3) * 0.3)); sd.scale.y = 0.6; }
    // carne, lechuga, queso, carne, pan de abajo (cara)
    const layer = (y: number, h: number, r: number, mat: THREE.Material) => { const c = this.mesh(new THREE.CylinderGeometry(r, r, h, 24), mat, g, 0, y, 0); c.scale.set(1.04, 1, 1.04); return c; };
    layer(0.225, 0.04, R * 1.04, patty);
    const lt = this.mesh(new THREE.TorusGeometry(R * 1.02, 0.022, 6, 24), lettuce, g, 0, 0.195, 0); lt.rotation.x = Math.PI / 2; lt.scale.set(1.04, 1.04, 1.5);
    const ch = this.mesh(new THREE.BoxGeometry(R * 2.15, 0.012, R * 2.15), cheese, g, 0, 0.18, 0); ch.rotation.y = Math.PI / 4;
    layer(0.15, 0.04, R * 1.04, patty);
    layer(0.085, 0.09, R * 1.0, bun);
    this.mesh(new THREE.SphereGeometry(R, 20, 10, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), bun, g, 0, 0.04, 0).scale.set(1.0, 0.7, 1.0);
    // antifaz de luchador rojo y dorado sobre los ojos
    const red = std(0xc1272d, 0.4, 0, { clearcoat: 0.5 });
    const gold = std(0xd8b43a, 0.3, 0.9);
    for (const sx of [-1, 1]) {
      const frame = this.mesh(new THREE.TorusGeometry(0.036, 0.008, 6, 14), gold, g, sx * 0.058, 0.175, 0.15, false);
      frame.scale.set(1.3, 0.8, 1); frame.rotation.z = -sx * 0.2;
      const eye = this.mesh(new THREE.SphereGeometry(0.02, 10, 8), std(0x15100c, 0.2, 0, { clearcoat: 1 }), g, sx * 0.058, 0.172, 0.155, false);
      eye.scale.set(1.2, 0.9, 0.4);
    }
    const nose = this.mesh(new THREE.BoxGeometry(0.035, 0.09, 0.012), red, g, 0, 0.165, 0.158, false);
    nose.rotation.z = 0.0;
  }

  private buildHorseMask(g: THREE.Group) {
    const pink = std(0xe46ec0, 0.32, 0, { clearcoat: 0.7, clearcoatRoughness: 0.25, sheen: 0.4, sheenColor: new THREE.Color(0xffb0e0) });
    const dark = std(0x2a1218, 0.6);
    const pinkDeep = std(0xc84ca0, 0.4);
    const dome = this.mesh(new THREE.SphereGeometry(0.14, 22, 16), pink, g, 0, 0.15, -0.01);
    dome.scale.set(0.95, 1.15, 1.1);
    // hocico largo de caballo
    const snout = this.mesh(new THREE.CapsuleGeometry(0.07, 0.2, 8, 16), pink, g, 0, 0.085, 0.17);
    snout.rotation.x = Math.PI / 2 - 0.35; snout.scale.set(1, 1, 0.9);
    const tip = this.mesh(new THREE.SphereGeometry(0.085, 14, 12), pink, g, 0, 0.0, 0.275);
    tip.scale.set(1, 0.9, 0.85);
    for (const sx of [-1, 1]) {
      this.mesh(new THREE.SphereGeometry(0.018, 8, 6), dark, g, sx * 0.032, 0.012, 0.35);
      // ojos a los lados, grandes y asustados
      const eye = this.mesh(new THREE.SphereGeometry(0.036, 14, 12), std(0xfdfdfd, 0.1, 0, { clearcoat: 1 }), g, sx * 0.095, 0.185, 0.085);
      eye.scale.set(0.7, 1, 1);
      const iris = this.mesh(new THREE.SphereGeometry(0.021, 10, 8), std(0x4a2a18, 0.2, 0, { clearcoat: 1 }), g, sx * 0.118, 0.185, 0.095);
      iris.scale.set(0.5, 1, 1);
      // orejas puntiagudas
      const ear = this.mesh(new THREE.ConeGeometry(0.045, 0.17, 10), pink, g, sx * 0.07, 0.34, -0.02);
      ear.rotation.z = -sx * 0.25; ear.scale.z = 0.5;
      const inner = this.mesh(new THREE.ConeGeometry(0.028, 0.12, 8), pinkDeep, g, sx * 0.07, 0.335, 0.0);
      inner.rotation.z = -sx * 0.25; inner.scale.z = 0.4;
    }
    // boca abierta con dientes
    this.mesh(new THREE.BoxGeometry(0.1, 0.045, 0.13), dark, g, 0, -0.02, 0.255);
    const teeth = this.mesh(new THREE.BoxGeometry(0.095, 0.014, 0.07), std(0xf4f0e4, 0.3), g, 0, 0.004, 0.31);
    teeth.rotation.x = 0.1;
    const lower = this.mesh(new THREE.CapsuleGeometry(0.045, 0.09, 6, 10), pink, g, 0, -0.065, 0.2);
    lower.rotation.x = Math.PI / 2 - 0.2;
    // crin rosa que cae por la nuca
    const mane = this.mesh(new THREE.BoxGeometry(0.035, 0.34, 0.1), pinkDeep, g, 0, 0.12, -0.15);
    mane.rotation.x = 0.25;
    const mane2 = this.mesh(new THREE.BoxGeometry(0.05, 0.3, 0.05), pinkDeep, g, 0, -0.1, -0.2);
    mane2.rotation.x = -0.15;
  }

  /** Bate de béisbol: se agarra por el mango y el cuerpo apunta hacia delante */
  private makeBat(): THREE.Group {
    const g = new THREE.Group();
    const wood = std(0xc79a5a, 0.55, 0.02, { clearcoat: 0.35, clearcoatRoughness: 0.4 });
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.18, 10), std(0x1a1a1a, 0.8));
    grip.position.y = -0.04;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.022, 0.6, 14), wood);   // más ancho hacia la punta (abajo)
    body.position.y = -0.4;
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wood);
    cap.position.y = -0.7;
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), std(0x1a1a1a, 0.8));
    knob.position.y = 0.06;
    g.add(grip, body, cap, knob);
    g.traverse((o) => { (o as THREE.Mesh).castShadow = true; });
    g.position.set(0, -0.02, 0.05);
    g.rotation.x = -Math.PI / 2 + 0.2;
    return g;
  }

  private makeMic(): THREE.Group {
    const g = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.018, 0.2, 10), std(0x15151a, 0.4, 0.5));
    handle.position.y = -0.1;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 10), std(0xbfc4cc, 0.35, 0.9));
    head.position.y = 0.0;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.006, 6, 14), std(0xd8b24a, 0.3, 1));
    ring.position.y = -0.035; ring.rotation.x = Math.PI / 2;
    g.add(handle, head, ring);
    g.traverse((o) => { (o as THREE.Mesh).castShadow = true; });
    g.position.set(0, -0.02, 0.05);
    g.rotation.x = -Math.PI / 2 + 0.2;
    return g;
  }

  private makeHelmet(): THREE.Group {
    const g = new THREE.Group();
    const bronze = std(0xb08a3a, 0.28, 0.95);
    const red = std(0xb01820, 0.7);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.62), bronze);
    dome.position.set(0, 0.15, 0); dome.scale.set(0.98, 1.05, 1.08);
    const brim = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.012, 6, 24), bronze);
    brim.position.set(0, 0.17, 0); brim.rotation.x = Math.PI / 2; brim.scale.set(1, 1.08, 1);
    // cimera roja (de proa a popa)
    const crest = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.12, 0.26), red);
    crest.position.set(0, 0.34, -0.01);
    for (const sx of [-1, 1]) {
      const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 0.12), bronze);
      cheek.position.set(sx * 0.14, 0.07, 0.04);
      g.add(cheek);
    }
    g.add(dome, brim, crest);
    g.traverse((o) => { (o as THREE.Mesh).castShadow = true; });
    return g;
  }

  private makeHorn(): THREE.Group {
    const g = new THREE.Group();
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.42, 14), std(0xfff2c0, 0.2, 0.3, { clearcoat: 1, emissive: 0xffc0f0, emissiveIntensity: 0.6 }));
    horn.position.set(0, 0.2, 0);
    for (let i = 0; i < 5; i++) { // espiral
      const r = new THREE.Mesh(new THREE.TorusGeometry(0.05 - i * 0.008, 0.007, 5, 14), std(0xff9ad8, 0.3, 0, { emissive: 0xff5ac0, emissiveIntensity: 0.8 }));
      r.position.set(0, 0.06 + i * 0.07, 0); r.rotation.x = Math.PI / 2 + 0.3;
      g.add(r);
    }
    g.add(horn);
    g.position.set(0, 0.28, 0.17);
    g.rotation.x = 0.55;
    return g;
  }

  private makeChair(): THREE.Group {
    const g = new THREE.Group();
    const steel = std(0x9aa0a8, 0.3, 0.9);
    const seat = std(0x23252b, 0.7);
    const sh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.035, 0.4), seat);
    sh.position.set(0, 0.0, 0.2);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.34, 0.03), seat);
    back.position.set(0, 0.17, 0.4);
    g.add(sh, back);
    for (const [x, z] of [[-0.18, 0.04], [0.18, 0.04], [-0.18, 0.38], [0.18, 0.38]]) {
      const l = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.42, 6), steel);
      l.position.set(x, -0.21, z);
      g.add(l);
    }
    for (const x of [-0.18, 0.18]) {
      const l = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.36, 6), steel);
      l.position.set(x, 0.17, 0.4);
      l.rotation.z = 0;
      g.add(l);
    }
    g.traverse((o) => { (o as THREE.Mesh).castShadow = true; });
    // se agarra por el respaldo: el origen queda en la mano
    g.position.set(0, -0.05, -0.38);
    g.rotation.set(0, 0, 0);
    const holder = new THREE.Group();
    holder.add(g);
    holder.rotation.x = -Math.PI / 2 + 0.2;
    return holder;
  }

  private makeBriefcase(): THREE.Group {
    const g = new THREE.Group();
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.32, 0.12), std(0x3a2616, 0.5, 0.05, { clearcoat: 0.4 }));
    m.position.set(0, -0.22, 0);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.01, 6, 12, Math.PI), std(0x1a1a1a, 0.5));
    handle.position.set(0, -0.055, 0);
    const clasp = std(0xd4af37, 0.25, 1);
    for (const x of [-0.12, 0.12]) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.13), clasp); c.position.set(x, -0.12, 0); g.add(c); }
    g.add(m, handle);
    g.traverse((o) => { (o as THREE.Mesh).castShadow = true; });
    g.rotation.y = Math.PI / 2;
    return g;
  }

  // ---------------------------------------------------------------- poses
  setProp(name: 'chair' | 'maletin' | 'microfono' | 'casco' | 'cuerno' | 'bate' | null) {
    this.chair.visible = name === 'chair';
    this.briefcase.visible = name === 'maletin';
    this.mic.visible = name === 'microfono';
    this.bat.visible = name === 'bate';
    this.helmet.visible = name === 'casco';
    this.horn.visible = name === 'cuerno';
  }

  /** Objeto que se está mostrando (para animarlo de entrada) */
  propObject(name: string): THREE.Object3D | null {
    return ({ chair: this.chair, maletin: this.briefcase, microfono: this.mic, bate: this.bat, casco: this.helmet, cuerno: this.horn } as Record<string, THREE.Object3D>)[name] ?? null;
  }

  applyPose(p: Pose, time: number) {
    for (const k of JOINTS) {
      const v = p[k];
      const o = this.j[k];
      o.rotation.set(v[0], v[1], v[2], k === 'torso' || k === 'hips' || k === 'head' ? 'YXZ' : 'XYZ');
    }
    // altura de la cadera para que el pie de apoyo toque el suelo
    const drop = (T: Joint, S: Joint) => {
      const a = -p[T][0];
      const k = p[S][0];
      return L_THIGH * Math.cos(a) * Math.cos(p[T][2]) + L_SHIN * Math.cos(a - k);
    };
    const stand = 0.05 + Math.max(drop('lT', 'lS'), drop('rT', 'rS')) + 0.045;
    const lying = lerp(stand + p.air, 0.2, Math.min(1, p.lie));
    this.body.position.y = lying;
    this.body.rotation.set(p.pitch, p.spin, p.roll, 'YXZ');
    if (this.tongue) this.tongue.rotation.x = Math.sin(time * 7) * 0.15 + 0.1;
  }

  setGlow(color: number, amount: number) {
    this.glow.visible = amount > 0.01;
    (this.glow.material as THREE.MeshBasicMaterial).color.setHex(color);
    (this.glow.material as THREE.MeshBasicMaterial).opacity = amount * 0.28;
    const s = 1 + amount * 0.12;
    this.glow.scale.set(s, s, s);
  }

  setCastShadow(v: boolean) { for (const m of this.shadowMeshes) m.castShadow = v; }

  dispose() {
    this.root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else mat?.dispose();
    });
  }
}
