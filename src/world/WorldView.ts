import * as THREE from 'three';
import { FighterModel } from '../fighters/FighterModel';
import { GUARD, blendPose, mk, type Pose } from '../fighters/Pose';
import type { Appearance } from '../combat/types';
import type { Stage } from '../render/Stage';
import { windowsTexture } from '../arenas/Azotea';
import { DISTRICTS, GRAFFITI, POIS, SEA_Z, SPAWN, STICKERS, WORLD_SIZE } from '../../content/mundo';
import { NPCS } from '../../content/mundo-npc';
import { buildLayout, type Layout } from './layout';
import type { DistrictDef, NpcDef, PoiDef } from './types';

/** ===== Escena 3D del mundo abierto: ciudad, jugador, NPC, ciclo día/noche, colisiones y cámara ===== */

export type Target =
  | { kind: 'npc'; id: string; def: NpcDef; x: number; z: number; label: string }
  | { kind: 'poi'; def: PoiDef; x: number; z: number; label: string }
  | { kind: 'sticker'; id: string; x: number; z: number; label: string }
  | { kind: 'graffiti'; id: string; x: number; z: number; label: string };

/** Lo que la vista necesita saber del estado del juego */
export interface WorldBridge {
  isOpen(district: string): boolean;
  /** Dónde está ahora un NPC (null = no está) */
  npcSpot(npc: NpcDef): { district: string; at: [number, number] } | null;
  npcMarker(npcId: string): '!' | '?' | null;
  poiVisible(p: PoiDef): boolean;
  stickerVisible(id: string): boolean;
  graffitiDone(id: string): boolean;
  playerLook(): Appearance;
  npcLook(id: string): Appearance | null;
  npcName(id: string): string;
  /** Hora del mundo (0-24) para la luz */
  hour(): number;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const std = (color: number, roughness = 0.85, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

function textTexture(text: string, bg: string, fg: string, w = 512, h = 128, size = 64): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d')!;
  if (bg !== 'transparent') { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.fillStyle = fg; g.font = `900 ${size}px Impact, "Arial Black", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  if (bg === 'transparent') { g.lineWidth = 8; g.strokeStyle = 'rgba(0,0,0,0.85)'; g.strokeText(text, w / 2, h / 2); }
  g.fillText(text, w / 2, h / 2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

export class WorldView {
  group = new THREE.Group();
  layout: Layout;
  targets: Target[] = [];
  // jugador
  px = SPAWN[0]; pz = SPAWN[1]; yaw = Math.PI;
  private vx = 0; private vz = 0;
  private playerModel: FighterModel;
  private pPose: Pose = { ...GUARD };
  private walkT = 0;
  moving = false; running = false;
  // cámara
  camYaw = 0; camDist = 9.5; camPitch = 0.5;
  private camPos = new THREE.Vector3();
  readonly rig = { forward: new THREE.Vector3(0, 0, -1), right: new THREE.Vector3(1, 0, 0) };
  district: string | null = null;
  private npcs: { t: Extract<Target, { kind: 'npc' }>; model: FighterModel; pose: Pose; phase: number; yaw: number; marker: THREE.Mesh | null; markerKind: string | null; tag: THREE.Sprite }[] = [];
  private poiMeshes: { p: PoiDef; obj: THREE.Object3D; spot: { x: number; z: number } }[] = [];
  private stickerMeshes: { id: string; obj: THREE.Object3D; x: number; z: number }[] = [];
  private lockedRects: { d: DistrictDef; x0: number; x1: number; z0: number; z1: number }[] = [];
  private sun = new THREE.DirectionalLight(0xfff1dd, 1.4);
  private moon = new THREE.DirectionalLight(0x6a8aff, 0);
  private hemi = new THREE.HemisphereLight(0xbfd8ff, 0x3a3a30, 0.6);
  private sea!: THREE.Mesh;
  private lamps: THREE.InstancedMesh | null = null;
  private windowMats: THREE.MeshStandardMaterial[] = [];
  private fire: THREE.Mesh | null = null;
  private time = 0;
  private promptTarget: Target | null = null;
  private skyColor = new THREE.Color();
  private disposables: { dispose(): void }[] = [];
  private fountainWater: THREE.Mesh | null = null;

  constructor(private stage: Stage, private bridge: WorldBridge) {
    const npcReqs: { key: string; district: string; at: [number, number] }[] = [];
    for (const n of NPCS) { npcReqs.push({ key: 'npc:' + n.id, district: n.district, at: n.at }); if (n.alt) npcReqs.push({ key: 'npcalt:' + n.id, district: n.alt.district, at: n.alt.at }); }
    this.layout = buildLayout({ districts: DISTRICTS, pois: POIS, stickers: STICKERS, graffiti: GRAFFITI, npcs: npcReqs, worldSize: WORLD_SIZE, seaZ: SEA_Z });
    const scene = stage.scene;
    scene.add(this.group);
    scene.background = this.skyColor;
    scene.fog = new THREE.FogExp2(0x8ec8f0, 0.004);
    this.buildTerrain();
    this.buildBuildings();
    this.buildProps();
    this.buildPois();
    this.buildStickers();
    this.buildNpcs();
    this.buildLocks();
    // luces
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(stage.quality === 'baja' ? 1024 : 2048, stage.quality === 'baja' ? 1024 : 2048);
    this.sun.shadow.camera.left = -40; this.sun.shadow.camera.right = 40; this.sun.shadow.camera.top = 40; this.sun.shadow.camera.bottom = -40;
    this.sun.shadow.camera.near = 1; this.sun.shadow.camera.far = 160; this.sun.shadow.bias = -0.0005; this.sun.shadow.normalBias = 0.05;
    this.group.add(this.sun, this.sun.target, this.moon, this.moon.target, this.hemi);
    // jugador
    this.playerModel = new FighterModel(bridge.playerLook());
    this.group.add(this.playerModel.root);
    this.updateLighting(true);
  }

  // ------------------------------------------------------------------ construcción
  private mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = false, receive = true) {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = receive; this.group.add(m);
    this.disposables.push(geo, mat);
    return m;
  }

  private buildTerrain() {
    this.mesh(new THREE.PlaneGeometry(420, 420), std(0x56664a, 1), 0, -0.02, 0).rotation.x = -Math.PI / 2;
    for (const d of DISTRICTS) {
      const m = this.mesh(new THREE.BoxGeometry(d.size[0], 0.3, d.size[1]), std(d.ground, 0.95), d.center[0], -0.08, d.center[1]);
      m.receiveShadow = true;
    }
    // plaza circular
    const plaza = this.mesh(new THREE.CylinderGeometry(22, 22, 0.2, 48), std(0xb8ad98, 0.8), 0, 0.02, 0);
    void plaza;
    const ring = this.mesh(new THREE.TorusGeometry(15, 0.25, 6, 64), std(0xc1272d, 0.6), 0, 0.14, 0); ring.rotation.x = Math.PI / 2;
    // calles
    for (const r of this.layout.roads) {
      const len = Math.hypot(r.x2 - r.x1, r.z2 - r.z1);
      const m = this.mesh(new THREE.PlaneGeometry(len, r.w), std(0x2a2a2f, 0.9), (r.x1 + r.x2) / 2, 0.08, (r.z1 + r.z2) / 2);
      m.rotation.x = -Math.PI / 2; m.rotation.z = Math.atan2(r.z2 - r.z1, r.x2 - r.x1) * -1 + 0;
      m.rotation.set(-Math.PI / 2, 0, Math.atan2(r.x2 - r.x1, -(r.z2 - r.z1)) - Math.PI / 2 + Math.PI / 2 * 0);
      // orientar la calle a lo largo del segmento
      m.rotation.set(0, 0, 0); m.rotation.x = -Math.PI / 2; m.rotation.order = 'YXZ'; m.rotation.y = -Math.atan2(r.z2 - r.z1, r.x2 - r.x1);
      // línea discontinua central
      const dash = this.mesh(new THREE.PlaneGeometry(len, 0.25), new THREE.MeshBasicMaterial({ color: 0xe8d070 }), (r.x1 + r.x2) / 2, 0.09, (r.z1 + r.z2) / 2);
      dash.rotation.order = 'YXZ'; dash.rotation.x = -Math.PI / 2; dash.rotation.y = -Math.atan2(r.z2 - r.z1, r.x2 - r.x1);
    }
    // mar
    this.sea = this.mesh(new THREE.PlaneGeometry(500, 160), std(0x1f6f9a, 0.15, 0.1, { transparent: true, opacity: 0.92 }), 0, -0.15, SEA_Z + 78);
    this.sea.rotation.x = -Math.PI / 2;
    // arena de la playa más clara junto al agua
    const shore = this.mesh(new THREE.PlaneGeometry(100, 8), std(0xe8dcb0, 1), 0, 0.12, SEA_Z - 2); shore.rotation.x = -Math.PI / 2;
    // fuente
    const fp = this.layout.spots['poi:fuente'] ?? { x: 0, z: 0 };
    const basin = this.mesh(new THREE.CylinderGeometry(3.4, 3.6, 0.9, 24), std(0xcfc8b8, 0.7), fp.x, 0.45, fp.z, true);
    void basin;
    this.fountainWater = this.mesh(new THREE.CylinderGeometry(3, 3, 0.1, 24), std(0x4ab0e8, 0.1, 0.3, { transparent: true, opacity: 0.85 }), fp.x, 0.88, fp.z);
    const spout = this.mesh(new THREE.CylinderGeometry(0.3, 0.5, 1.8, 10), std(0xb8b098, 0.7), fp.x, 1.3, fp.z, true);
    void spout;
    const logo = this.mesh(new THREE.TorusGeometry(2.2, 0.12, 6, 32), std(0xc1272d, 0.5), fp.x, 0.95, fp.z); logo.rotation.x = Math.PI / 2;
    // hoguera de la playa
    const hp = this.layout.spots['poi:hoguera'];
    if (hp) {
      for (let i = 0; i < 5; i++) { const l = this.mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.3, 6), std(0x3a2410), hp.x, 0.3, hp.z, true); l.rotation.set(Math.PI / 2 - 0.5, (i / 5) * Math.PI * 2, 0); }
      this.fire = this.mesh(new THREE.ConeGeometry(0.6, 1.5, 8), new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }), hp.x, 1.0, hp.z);
    }
  }

  private buildBuildings() {
    const tex = [windowsTexture(31), windowsTexture(32), windowsTexture(33)];
    const plain: Record<number, THREE.MeshStandardMaterial> = {};
    let ti = 0;
    for (const b of this.layout.boxes) {
      const style = DISTRICTS.find((d) => d.id === b.district)?.style;
      let mat: THREE.MeshStandardMaterial;
      if (b.poi || style === 'savanna' || style === 'beach') {
        mat = plain[b.color] ?? (plain[b.color] = std(b.color, 0.85));
      } else {
        const t = tex[ti++ % 3].clone(); t.repeat.set(Math.max(1, b.w / 8), Math.max(1, b.h / 16)); t.needsUpdate = true;
        mat = new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.9, emissiveMap: t, emissive: 0xffd890, emissiveIntensity: 0 });
        mat.map = t;
        this.windowMats.push(mat);
      }
      const m = this.mesh(new THREE.BoxGeometry(b.w, b.h, b.d), mat, b.x, b.h / 2, b.z, true);
      void m;
      // tejado
      if (!b.poi) this.mesh(new THREE.BoxGeometry(b.w + 0.4, 0.4, b.d + 0.4), std(0x2a2a2e, 0.9), b.x, b.h + 0.2, b.z, false);
      if (b.sign) {
        const s = this.mesh(new THREE.PlaneGeometry(Math.min(b.w - 2, 14), 2.2), new THREE.MeshBasicMaterial({ map: textTexture(b.sign, '#101014', '#f2c14e', 512, 96, 60), toneMapped: false }), b.x, Math.min(b.h - 1.4, 6), b.z + b.d / 2 + 0.06);
        void s;
      }
    }
  }

  private buildProps() {
    const by = (k: string) => this.layout.circles.filter((c) => c.kind === k);
    const inst = (geo: THREE.BufferGeometry, mat: THREE.Material, list: { x: number; z: number }[], y: number, scale = 1, cast = true) => {
      if (!list.length) return null;
      const im = new THREE.InstancedMesh(geo, mat, list.length);
      const m4 = new THREE.Matrix4();
      list.forEach((c, i) => { m4.compose(new THREE.Vector3(c.x, y * scale, c.z), new THREE.Quaternion(), new THREE.Vector3(scale, scale, scale)); im.setMatrixAt(i, m4); });
      im.castShadow = cast; im.receiveShadow = true; this.group.add(im); this.disposables.push(geo, mat);
      return im;
    };
    const trees = by('tree');
    inst(new THREE.CylinderGeometry(0.15, 0.22, 2.4, 6), std(0x5a3e28, 0.9), trees, 1.2);
    inst(new THREE.SphereGeometry(1.5, 8, 6), std(0x2f7a3a, 0.85), trees, 3.2);
    const palms = by('palm');
    inst(new THREE.CylinderGeometry(0.14, 0.2, 5, 6), std(0x7a5a38, 0.9), palms, 2.5);
    inst(new THREE.ConeGeometry(2.4, 1.2, 7), std(0x1f7a3a, 0.8, 0, { side: THREE.DoubleSide }), palms, 5.2);
    inst(new THREE.DodecahedronGeometry(0.8, 0), std(0x7a7a78, 0.95), by('rock'), 0.4);
    inst(new THREE.IcosahedronGeometry(0.7, 0), std(0x2f6a30, 0.9), by('bush'), 0.5);
    inst(new THREE.BoxGeometry(1.4, 1.4, 1.4), std(0x8a6a3a, 0.9), by('crate'), 0.7);
    const lampsL = by('lamp');
    inst(new THREE.CylinderGeometry(0.08, 0.1, 4.6, 6), std(0x2a2a30, 0.6, 0.6), lampsL, 2.3);
    this.lamps = inst(new THREE.SphereGeometry(0.3, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff0c0 }), lampsL, 4.7, 1, false);
    // chozas de la aldea
    const huts = by('hut');
    inst(new THREE.CylinderGeometry(1.7, 1.8, 1.8, 10), std(0xb98a58, 0.9), huts, 0.9);
    inst(new THREE.ConeGeometry(2.5, 1.9, 10), std(0x8c6a2a, 1), huts, 2.7);
    // el monigote azul de Manchester (decorado) y baobab/torre de la jaula: detalles
    const mp = this.layout.spots['poi:monigote'];
    if (mp) {
      const blue = std(0x2a8aff, 0.5, 0, { emissive: 0x0a3a8a, emissiveIntensity: 0.3 });
      for (let i = 0; i < 6; i++) this.mesh(new THREE.CapsuleGeometry(0.55 - i * 0.03, 0.9, 4, 8), blue, mp.x, 0.9 + i * 1.0, mp.z, true);
      this.mesh(new THREE.SphereGeometry(0.6, 10, 8), blue, mp.x, 6.8, mp.z, true);
      for (const sx of [-1, 1]) { const a = this.mesh(new THREE.CapsuleGeometry(0.22, 2.6, 4, 8), blue, mp.x + sx * 1.0, 6.2, mp.z, true); a.rotation.z = sx * 0.9; a.userData.wave = sx; this.waving.push(a); }
    }
  }
  private waving: THREE.Mesh[] = [];

  private buildPois() {
    const ring = (color: number, r = 1.1) => {
      const g = new THREE.Group();
      const m = new THREE.Mesh(new THREE.RingGeometry(r * 0.8, r, 28), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }));
      m.rotation.x = -Math.PI / 2; m.position.y = 0.16; g.add(m);
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.6, r * 0.6, 4, 12, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
      beam.position.y = 2.1; g.add(beam);
      return g;
    };
    const colorOf: Record<string, number> = { shop: 0x4aa8ff, gym: 0xff5a4a, home: 0xb48aff, taxi: 0xffd23a, board: 0xc9a36a, garito: 0xff3ea5, minigame: 0x3aff9a, story: 0xffd45e, tower: 0xff8a3a, vendor: 0x6ad8ff, fountain: 0x4ab0e8, landmark: 0xaaaaaa, photo: 0xff9aff, heal: 0xff9a3a, arena: 0xff4a4a };
    for (const p of POIS) {
      const spot = this.layout.spots['poi:' + p.id];
      if (!spot) continue;
      const obj = new THREE.Group();
      if (p.kind !== 'landmark' && p.kind !== 'fountain') obj.add(ring(colorOf[p.kind] ?? 0xffffff, p.kind === 'story' ? 1.4 : 1.1));
      if (p.kind === 'story') {
        const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial({ color: 0xffd45e, toneMapped: false }));
        star.position.y = 3.6; star.userData.spin = true; obj.add(star);
        const lab = new THREE.Sprite(new THREE.SpriteMaterial({ map: textTexture('HISTORIA', 'transparent', '#ffd45e', 256, 64, 40), depthTest: false, transparent: true }));
        lab.scale.set(3, 0.75, 1); lab.position.y = 4.6; obj.add(lab);
      }
      if (p.kind === 'gym' || p.kind === 'shop' || p.kind === 'arena' || p.kind === 'tower') {
        // el letrero ya lo pone el edificio
      }
      if (p.kind === 'minigame') {
        const lab = new THREE.Sprite(new THREE.SpriteMaterial({ map: textTexture('MINIJUEGO', 'transparent', '#3aff9a', 256, 64, 38), depthTest: false, transparent: true }));
        lab.scale.set(3, 0.75, 1); lab.position.y = 3.2; obj.add(lab);
      }
      obj.position.set(spot.x, 0, spot.z);
      this.group.add(obj);
      this.poiMeshes.push({ p, obj, spot });
    }
  }

  private buildStickers() {
    for (const s of STICKERS) {
      const spot = this.layout.spots['sticker:' + s.id];
      const obj = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), new THREE.MeshBasicMaterial({ color: 0xffe04a, toneMapped: false }));
      obj.position.set(spot.x, 1.0, spot.z); obj.userData.spin = true;
      this.group.add(obj); this.stickerMeshes.push({ id: s.id, obj, x: spot.x, z: spot.z });
    }
    for (const g of GRAFFITI) {
      const spot = this.layout.spots['graffiti:' + g.id];
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.8), new THREE.MeshBasicMaterial({ map: textTexture(g.name.replace(/[«»]/g, ''), '#1a1418', '#ff5ab4', 512, 256, 44), toneMapped: false, side: THREE.DoubleSide }));
      panel.position.set(spot.x, 1.4, spot.z); this.group.add(panel);
      const cam = new THREE.Sprite(new THREE.SpriteMaterial({ map: textTexture('FOTO', 'transparent', '#ff9aff', 128, 64, 36), depthTest: false, transparent: true }));
      cam.scale.set(1.6, 0.8, 1); cam.position.set(spot.x, 3.0, spot.z); cam.userData.graffiti = g.id; this.group.add(cam);
      this.graffitiSprites.push({ id: g.id, panel, tag: cam });
    }
  }
  private graffitiSprites: { id: string; panel: THREE.Mesh; tag: THREE.Sprite }[] = [];

  private buildNpcs() {
    for (const n of NPCS) {
      const look = this.bridge.npcLook(n.id);
      if (!look) continue;
      const model = new FighterModel(look);
      this.group.add(model.root);
      const tagMat = new THREE.SpriteMaterial({ map: textTexture(this.bridge.npcName(n.id), 'transparent', n.fighter ? '#ffd45e' : '#e8e8e8', 512, 96, 46), depthTest: false, transparent: true });
      const tag = new THREE.Sprite(tagMat); tag.scale.set(3.4, 0.64, 1); this.group.add(tag);
      const spot = this.layout.spots['npc:' + n.id];
      this.npcs.push({ t: { kind: 'npc', id: n.id, def: n, x: spot.x, z: spot.z, label: this.bridge.npcName(n.id) }, model, pose: { ...GUARD }, phase: Math.random() * 10, yaw: n.yaw ?? Math.PI, marker: null, markerKind: null, tag });
    }
  }

  private buildLocks() {
    const fenceMat = std(0xc1272d, 0.7);
    for (const d of DISTRICTS) {
      if (!d.unlock) continue;
      const hw = d.size[0] / 2, hd = d.size[1] / 2;
      this.lockedRects.push({ d, x0: d.center[0] - hw, x1: d.center[0] + hw, z0: d.center[1] - hd, z1: d.center[1] + hd });
      const g = new THREE.Group();
      g.userData.lock = d.id;
      for (const [x, z, w, dd] of [[0, -hd, d.size[0], 0.3], [0, hd, d.size[0], 0.3], [-hw, 0, 0.3, d.size[1]], [hw, 0, 0.3, d.size[1]]] as const) {
        const f = new THREE.Mesh(new THREE.BoxGeometry(w, 1.8, dd), fenceMat); f.position.set(d.center[0] + x, 0.9, d.center[1] + z); g.add(f);
      }
      // cartel hacia el centro de la ciudad
      const dx = -d.center[0], dz = -d.center[1], l = Math.hypot(dx, dz) || 1;
      const sx = d.center[0] + (dx / l) * Math.min(hw, hd) * 0.95, sz = d.center[1] + (dz / l) * Math.min(hw, hd) * 0.95;
      const sign = new THREE.Sprite(new THREE.SpriteMaterial({ map: textTexture('CERRADO', '#c1272d', '#ffffff', 256, 96, 52), depthTest: false, transparent: true }));
      sign.scale.set(5, 1.9, 1); sign.position.set(sx, 3.4, sz); g.add(sign);
      this.group.add(g);
      this.lockGroups.set(d.id, g);
    }
  }
  private lockGroups = new Map<string, THREE.Group>();

  /** Vuelve a evaluar distritos desbloqueados (por ejemplo, tras completar un capítulo) */
  refresh() {
    for (const lr of this.lockedRects) { const g = this.lockGroups.get(lr.d.id); if (g) g.visible = !this.bridge.isOpen(lr.d.id); }
  }

  // ------------------------------------------------------------------ iluminación y día/noche
  /** Cuánta luz de día hay (0 = noche cerrada, 1 = mediodía) */
  get daylight() { return smooth(5.2, 8, this.bridge.hour()) * (1 - smooth(18.2, 20.8, this.bridge.hour())); }
  get night() { return 1 - this.daylight; }

  private updateLighting(force = false) {
    const h = this.bridge.hour();
    const day = this.daylight;
    const dusk = Math.max(smooth(16.5, 18.5, h) * (1 - smooth(19.5, 21, h)), smooth(5, 6.2, h) * (1 - smooth(7, 8.2, h)));
    const dayC = new THREE.Color(0x8ec8f0), nightC = new THREE.Color(0x070d1e), duskC = new THREE.Color(0xe8803a);
    this.skyColor.copy(nightC).lerp(dayC, day).lerp(duskC, dusk * 0.7);
    (this.stage.scene.fog as THREE.FogExp2).color.copy(this.skyColor);
    (this.stage.scene.fog as THREE.FogExp2).density = lerp(0.0075, 0.0036, day);
    const elev = Math.sin(clamp((h - 6) / 12, 0, 1) * Math.PI);
    const az = ((h - 6) / 12) * Math.PI;
    this.sun.position.set(this.px + Math.cos(az) * 60, 12 + elev * 70, this.pz - 30);
    this.sun.target.position.set(this.px, 0, this.pz);
    this.sun.color.setHex(0xffeedd).lerp(duskC, dusk * 0.8);
    this.sun.intensity = 1.6 * day + 0.05;
    this.moon.position.set(this.px - 30, 60, this.pz + 20); this.moon.target.position.set(this.px, 0, this.pz);
    this.moon.intensity = 0.55 * this.night;
    this.hemi.intensity = lerp(0.28, 0.75, day);
    this.hemi.color.setHex(0x9ab8ff).lerp(new THREE.Color(0xbfd8ff), day);
    this.stage.renderer.toneMappingExposure = lerp(1.15, 1.0, day);
    const n = this.night;
    for (const m of this.windowMats) m.emissiveIntensity = n * 0.9;
    if (this.lamps) (this.lamps.material as THREE.MeshBasicMaterial).color.setScalar(lerp(0.35, 1, n));
    void force;
  }

  // ------------------------------------------------------------------ movimiento y colisiones
  private lockedAt(x: number, z: number) {
    for (const lr of this.lockedRects) if (!this.bridge.isOpen(lr.d.id) && x > lr.x0 + 0.2 && x < lr.x1 - 0.2 && z > lr.z0 + 0.2 && z < lr.z1 - 0.2) return true;
    return false;
  }
  private free(x: number, z: number) { return !this.layout.blocked(x, z, 0.42) && !this.lockedAt(x, z); }

  teleport(x: number, z: number, yaw?: number) { this.px = x; this.pz = z; if (yaw != null) this.yaw = yaw; this.camYaw = (yaw ?? this.yaw) + Math.PI; this.snapCamera(); }

  /** Entrada del jugador: mx/mz ya en coordenadas del mundo */
  update(dt: number, mx: number, mz: number, run: boolean, active: boolean) {
    this.time += dt;
    // cámara: vectores de referencia para el InputManager
    this.rig.forward.set(-Math.sin(this.camYaw), 0, -Math.cos(this.camYaw));
    this.rig.right.set(Math.cos(this.camYaw), 0, -Math.sin(this.camYaw));
    const speed = run ? 7.4 : 4.4;
    const len = Math.hypot(mx, mz);
    this.moving = active && len > 0.1;
    this.running = this.moving && run;
    const tvx = this.moving ? (mx / Math.max(1, len)) * speed : 0, tvz = this.moving ? (mz / Math.max(1, len)) * speed : 0;
    const k = 1 - Math.exp(-12 * dt);
    this.vx += (tvx - this.vx) * k; this.vz += (tvz - this.vz) * k;
    if (Math.abs(this.vx) + Math.abs(this.vz) > 0.01) {
      const nx = this.px + this.vx * dt, nz = this.pz + this.vz * dt;
      if (this.free(nx, nz)) { this.px = nx; this.pz = nz; }
      else if (this.free(nx, this.pz)) { this.px = nx; this.vz *= 0.3; }
      else if (this.free(this.px, nz)) { this.pz = nz; this.vx *= 0.3; }
      else { this.vx = this.vz = 0; }
      if (this.moving) { const ty = Math.atan2(this.vx, this.vz); let d = ty - this.yaw; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; this.yaw += d * (1 - Math.exp(-14 * dt)); }
    }
    // modelo del jugador
    this.playerModel.root.position.set(this.px, 0, this.pz);
    this.playerModel.root.rotation.y = this.yaw;
    const sp = Math.hypot(this.vx, this.vz);
    this.walkT += dt * (2.0 + sp * 0.9);
    this.pPose = blendPose(this.pPose, this.walkPose(this.walkT, sp, this.running), 1 - Math.exp(-14 * dt), this.pPose);
    this.playerModel.applyPose(this.pPose, this.time);
    // distritos
    const d = this.layout.districtAt(this.px, this.pz);
    if (d !== this.district) { this.district = d; this.onDistrict?.(d); }
    this.updateNpcs(dt);
    this.updateVisuals(dt);
    this.updateCamera(dt);
    this.updateLighting();
    this.findTarget();
  }

  onDistrict?: (id: string | null) => void;

  private walkPose(t: number, speed: number, run: boolean): Pose {
    const a = Math.min(1, speed / 4.4);
    const sw = Math.sin(t * 3.2) * (run ? 0.95 : 0.6) * a;
    const bob = Math.abs(Math.sin(t * 3.2)) * 0.04 * a;
    return mk({
      hips: [0, 0, 0], torso: [0.05 + (run ? 0.28 : 0) * a, 0, 0], head: [-0.03, 0, 0],
      lT: [-sw, 0, 0.06], rT: [sw, 0, -0.06], lS: [Math.max(0, sw) * 0.9 + 0.1, 0, 0], rS: [Math.max(0, -sw) * 0.9 + 0.1, 0, 0],
      lU: [sw * 0.8, 0, 0.12], rU: [-sw * 0.8, 0, -0.12], lF: [-0.3 - (run ? 0.7 : 0) * a, 0, 0], rF: [-0.3 - (run ? 0.7 : 0) * a, 0, 0], air: bob,
    });
  }

  private idlePose(t: number, ph: number): Pose {
    const s = Math.sin(t * 1.6 + ph);
    return mk({ torso: [0.02 + s * 0.015, 0, 0], head: [0, Math.sin(t * 0.5 + ph) * 0.25, 0], lU: [-0.15, 0, 0.18], rU: [-0.15, 0, -0.18], lF: [-0.45, 0, 0], rF: [-0.45, 0, 0], lT: [-0.04, 0, 0.06], rT: [0.04, 0, -0.06], lS: [0.1, 0, 0], rS: [0.1, 0, 0] });
  }

  private updateNpcs(dt: number) {
    for (const n of this.npcs) {
      const spot = this.bridge.npcSpot(n.t.def);
      const here = !!spot;
      n.model.root.visible = here; n.tag.visible = here;
      if (!here) { n.t.x = -9999; continue; }
      const key = spot!.district === n.t.def.district && spot!.at[0] === n.t.def.at[0] && spot!.at[1] === n.t.def.at[1] ? 'npc:' + n.t.def.id : 'npcalt:' + n.t.def.id;
      const p = this.layout.spots[key] ?? this.layout.spots['npc:' + n.t.def.id];
      n.t.x = p.x; n.t.z = p.z;
      // mirar al jugador si está cerca
      const dx = this.px - p.x, dz = this.pz - p.z, d = Math.hypot(dx, dz);
      if (d < 6) { const ty = Math.atan2(dx, dz); let df = ty - n.yaw; while (df > Math.PI) df -= Math.PI * 2; while (df < -Math.PI) df += Math.PI * 2; n.yaw += df * (1 - Math.exp(-4 * dt)); }
      n.model.root.position.set(p.x, 0, p.z); n.model.root.rotation.y = n.yaw;
      n.pose = blendPose(n.pose, this.idlePose(this.time, n.phase), 1 - Math.exp(-6 * dt), n.pose);
      n.model.applyPose(n.pose, this.time);
      n.tag.position.set(p.x, 2.55 * (n.model.ap.height ?? 1), p.z);
      // marcador de misión
      const mk2 = this.bridge.npcMarker(n.t.id);
      if (mk2 !== n.markerKind) {
        if (n.marker) { this.group.remove(n.marker); n.marker.geometry.dispose(); n.marker = null; }
        n.markerKind = mk2;
        if (mk2) {
          const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), new THREE.MeshBasicMaterial({ color: mk2 === '!' ? 0xffd45e : 0x6ad8ff, toneMapped: false }));
          this.group.add(m); n.marker = m;
        }
      }
      if (n.marker) { n.marker.position.set(p.x, 3.2 + Math.sin(this.time * 3) * 0.12, p.z); n.marker.rotation.y = this.time * 2.5; }
    }
  }

  private updateVisuals(dt: number) {
    const t = this.time;
    for (const pm of this.poiMeshes) {
      const vis = this.bridge.poiVisible(pm.p);
      pm.obj.visible = vis;
      pm.obj.traverse((o) => { if (o.userData.spin) { o.rotation.y = t * 2; o.position.y = 3.6 + Math.sin(t * 2.5) * 0.2; } });
    }
    for (const s of this.stickerMeshes) {
      const vis = this.bridge.stickerVisible(s.id);
      s.obj.visible = vis;
      if (vis) { s.obj.rotation.y = t * 2.2; s.obj.position.y = 1.0 + Math.sin(t * 3 + s.x) * 0.12; }
    }
    for (const g of this.graffitiSprites) { g.tag.visible = !this.bridge.graffitiDone(g.id); }
    if (this.sea) { (this.sea.material as THREE.MeshStandardMaterial).color.setHex(0x1f6f9a).multiplyScalar(0.55 + 0.45 * this.daylight + Math.sin(t * 0.7) * 0.03); this.sea.position.y = -0.15 + Math.sin(t * 0.8) * 0.05; }
    if (this.fire) { this.fire.scale.set(1, 0.9 + 0.25 * Math.sin(t * 13) + 0.1 * Math.sin(t * 29), 1); (this.fire.material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.65 * this.night; }
    if (this.fountainWater) this.fountainWater.position.y = 0.88 + Math.sin(t * 2) * 0.02;
    for (const w of this.waving) w.rotation.z = (w.userData.wave as number) * (0.9 + Math.sin(t * 3 + (w.userData.wave as number)) * 0.5);
    void dt;
  }

  // ------------------------------------------------------------------ cámara
  private updateCamera(dt: number) {
    const cy = this.camYaw, cp = this.camPitch, dist = this.camDist;
    const tx = this.px, ty = 1.5, tz = this.pz;
    const want = new THREE.Vector3(tx + Math.sin(cy) * Math.cos(cp) * dist, ty + Math.sin(cp) * dist, tz + Math.cos(cy) * Math.cos(cp) * dist);
    // si un edificio se interpone, acercar un poco la cámara
    for (let i = 0; i < 6; i++) { if (this.layout.blocked(want.x, want.z, 0.3) && want.y < 14) { want.x = lerp(want.x, tx, 0.2); want.z = lerp(want.z, tz, 0.2); } else break; }
    this.camPos.lerp(want, 1 - Math.exp(-10 * dt));
    this.stage.camera.position.copy(this.camPos);
    this.stage.camera.lookAt(tx, ty, tz);
  }
  snapCamera() {
    const cy = this.camYaw, cp = this.camPitch;
    this.camPos.set(this.px + Math.sin(cy) * Math.cos(cp) * this.camDist, 1.5 + Math.sin(cp) * this.camDist, this.pz + Math.cos(cy) * Math.cos(cp) * this.camDist);
    this.stage.camera.position.copy(this.camPos); this.stage.camera.lookAt(this.px, 1.5, this.pz);
  }
  rotateCamera(dyaw: number, dpitch = 0) { this.camYaw += dyaw; this.camPitch = clamp(this.camPitch + dpitch, 0.12, 1.1); }
  zoom(d: number) { this.camDist = clamp(this.camDist + d, 4, 13); }

  // ------------------------------------------------------------------ objetivos de interacción
  /** Todos los objetivos visibles ahora mismo */
  allTargets(): Target[] {
    const out: Target[] = [];
    for (const n of this.npcs) if (n.model.root.visible) out.push({ ...n.t, label: n.t.label });
    for (const pm of this.poiMeshes) if (pm.obj.visible || (pm.p.kind === 'landmark' && this.bridge.poiVisible(pm.p))) if (this.bridge.poiVisible(pm.p)) out.push({ kind: 'poi', def: pm.p, x: pm.spot.x, z: pm.spot.z, label: pm.p.name });
    for (const g of GRAFFITI) if (!this.bridge.graffitiDone(g.id)) { const s = this.layout.spots['graffiti:' + g.id]; out.push({ kind: 'graffiti', id: g.id, x: s.x, z: s.z, label: g.name }); }
    return out;
  }

  private findTarget() {
    let best: Target | null = null, bd = 1e9;
    for (const t of this.allTargets()) {
      const d = Math.hypot(t.x - this.px, t.z - this.pz);
      const reach = t.kind === 'npc' ? 2.6 : t.kind === 'poi' ? Math.max(2.4, (t.def.radius ?? 1) + 1.6) : 2.6;
      if (d < reach && d < bd) { best = t; bd = d; }
    }
    this.promptTarget = best;
  }
  get target() { return this.promptTarget; }

  /** Pegatinas al alcance (se recogen solas) */
  stickerNear(): string | null {
    for (const s of this.stickerMeshes) if (this.bridge.stickerVisible(s.id) && Math.hypot(s.x - this.px, s.z - this.pz) < 1.5) return s.id;
    return null;
  }

  dispose() {
    this.stage.scene.remove(this.group);
    this.stage.scene.fog = null;
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose?.()); else mat?.dispose?.();
    });
    this.playerModel.dispose();
    for (const n of this.npcs) n.model.dispose();
    for (const d of this.disposables) { try { d.dispose(); } catch { /* ya liberado */ } }
  }
}
