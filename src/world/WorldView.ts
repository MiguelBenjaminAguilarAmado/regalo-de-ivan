import * as THREE from 'three';
import { FighterModel } from '../fighters/FighterModel';
import { ANIMS, GUARD, attackPose, blendPose, mk, type Pose } from '../fighters/Pose';
import { CityLife } from './CityLife';
import { Audio } from '../audio/Audio';
import { fighterById } from '../content/roster';
import type { Appearance } from '../combat/types';
import type { Stage } from '../render/Stage';
import { windowsTexture } from '../arenas/Azotea';
import { AVENUES, DISTRICTS, GRAFFITI, POIS, SEA_Z, SPAWN, STICKERS, WORLD_SIZE } from '../../content/mundo';
import { NPCS } from '../../content/mundo-npc';
import { buildLayout, type Box, type Layout } from './layout';
import { badgeTexture, muralTexture, nearestWall } from './Decor';
import { buildBarrios, type Barrios } from './Barrios';
import { box, buildCityStatic, makeMoto, makeTaxi, merge, paint, type CityStatic } from './CityMeshes';
import type { DistrictDef, NpcDef, PoiDef } from './types';

/** ===== Escena 3D del mundo abierto: ciudad, jugador, NPC, ciclo día/noche, colisiones y cámara ===== */

export type Target =
  | { kind: 'npc'; id: string; def: NpcDef; x: number; z: number; label: string }
  | { kind: 'poi'; def: PoiDef; x: number; z: number; label: string }
  | { kind: 'sticker'; id: string; x: number; z: number; label: string }
  | { kind: 'graffiti'; id: string; x: number; z: number; label: string }
  | { kind: 'moto'; x: number; z: number; label: string };

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
  /** Quién espera junto a la marca del capítulo pendiente (se ve de pie en la calle) */
  storyActors(): { poi: string; ids: string[] } | null;
  /** Una frase al azar de la gente de la calle */
  chatter(): string;
}

interface Actor { id: string; model: FighterModel; tag: THREE.Sprite; x: number; z: number; yaw: number; pose: Pose; phase: number; talk: number }

const STUN: Partial<Pose> = { torso: [-0.3, 0.2, 0.1], head: [-0.35, 0, 0], lU: [-0.3, 0, 0.7], rU: [-0.25, 0, -0.6], lF: [-0.6, 0, 0], rF: [-0.6, 0, 0], hips: [-0.08, 0, 0] };
const FLEX: Partial<Pose> = ANIMS.taunt.hit;
const TALK: Partial<Pose> = { lU: [-0.7, 0, 0.35], lF: [-1.2, 0, 0], rU: [-0.2, 0, -0.2], rF: [-0.5, 0, 0], head: [-0.05, 0, 0] };
/** Postura de ir en moto: sentado, brazos al manillar */
const RIDE: Pose = mk({ hips: [0, 0, 0], torso: [0.45, 0, 0], head: [-0.35, 0, 0], lU: [-1.15, 0, 0.28], rU: [-1.15, 0, -0.28], lF: [-0.55, 0, 0], rF: [-0.55, 0, 0], lT: [-1.35, 0, 0.18], rT: [-1.35, 0, -0.18], lS: [1.55, 0, 0], rS: [1.55, 0, 0] });
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

/** Adoquines de la plaza */
/** Rótulo de la pantalla y las vallas: EL HOYO WRESTLING + nombre */
function captionTexture(name: string): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 384; c.height = 512;
  const g = c.getContext('2d')!;
  const grd = g.createLinearGradient(0, 0, 0, 512); grd.addColorStop(0, '#c1272d'); grd.addColorStop(1, '#5a0e12');
  g.fillStyle = grd; g.fillRect(0, 0, 384, 512);
  g.fillStyle = 'rgba(0,0,0,0.25)'; for (let i = 0; i < 12; i++) g.fillRect(0, i * 44, 384, 18);
  g.textAlign = 'center'; g.fillStyle = '#f2c14e'; g.font = '900 40px Impact, "Arial Black", sans-serif'; g.fillText('EL HOYO', 192, 70);
  g.fillStyle = '#efe6d5'; g.font = '700 26px "Arial Narrow", sans-serif'; g.fillText('W R E S T L I N G', 192, 104);
  const words = name.toUpperCase().split(' ');
  let size = 78; g.font = `900 ${size}px Impact, "Arial Black", sans-serif`;
  while (Math.max(...words.map((w) => g.measureText(w).width)) > 350 && size > 30) { size -= 4; g.font = `900 ${size}px Impact, "Arial Black", sans-serif`; }
  g.fillStyle = '#fff'; g.lineWidth = 8; g.strokeStyle = '#111';
  words.slice(0, 3).forEach((w, i) => { const y = 250 + i * (size + 6) - (words.length - 1) * size * 0.45; g.strokeText(w, 192, y); g.fillText(w, 192, y); });
  g.fillStyle = '#f2c14e'; g.font = '700 30px "Arial Narrow", sans-serif'; g.fillText('¡ESTE SÁBADO!', 192, 470);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function tileTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 128; c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = '#b9ab92'; g.fillRect(0, 0, 128, 128);
  const cols = ['#c8bba2', '#b1a388', '#c2b398', '#a99a80', '#d0c3aa'];
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
    g.fillStyle = cols[(x * 7 + y * 3) % cols.length];
    const off = y % 2 ? 16 : 0;
    g.fillRect(((x * 32 + off) % 128) + 2, y * 32 + 2, 28, 28);
    if (off && x === 3) g.fillRect(2, y * 32 + 2, 14, 28);
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
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
  private npcs: { t: Extract<Target, { kind: 'npc' }>; model: FighterModel; pose: Pose; phase: number; yaw: number; marker: THREE.Mesh | null; markerKind: string | null; tag: THREE.Sprite; shadow?: boolean; lod: number }[] = [];
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
  life: CityLife;
  private barrios!: Barrios;
  private sky!: THREE.Mesh;
  private sparring: { a: FighterModel; b: FighterModel; pa: Pose; pb: Pose; cx: number; cz: number } | null = null;
  /** Personajes de la historia que esperan junto a la marca del capítulo */
  private storyCast: Actor[] = [];
  private storyKey = '';
  /** Personajes que aparecen para una escena en la calle */
  private sceneCast: Actor[] = [];
  /** Cámara de cine durante las escenas */
  private cine: { cx: number; cz: number; h: number; lx: number; lz: number; t: number } | null = null;
  private festoon: THREE.Mesh[] = [];

  constructor(private stage: Stage, private bridge: WorldBridge) {
    const npcReqs: { key: string; district: string; at: [number, number] }[] = [];
    for (const n of NPCS) { npcReqs.push({ key: 'npc:' + n.id, district: n.district, at: n.at }); if (n.alt) npcReqs.push({ key: 'npcalt:' + n.id, district: n.alt.district, at: n.alt.at }); }
    this.layout = buildLayout({ districts: DISTRICTS, pois: POIS, stickers: STICKERS, graffiti: GRAFFITI, npcs: npcReqs, worldSize: WORLD_SIZE, seaZ: SEA_Z, avenues: AVENUES });
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
    this.buildLod(this.npcs.length + 4);
    this.buildLocks();
    this.buildSky();
    this.buildPlaza();
    this.buildPosters();
    this.buildSparring();
    this.barrios = buildBarrios(this.layout, DISTRICTS);
    this.group.add(this.barrios.group);
    // gente y coches
    const cheap = stage.quality === 'baja';
    const ring = this.layout.boxes.find((b) => b.poi === 'ring_calle');
    this.life = new CityLife({
      layout: this.layout,
      allowed: (x, z) => !this.lockedAt(x, z),
      roadOpen: (i) => { const d = this.layout.roads[i]?.district; return !d || bridge.isOpen(d); },
      people: cheap ? 34 : 56, cars: cheap ? 9 : 14,
      crowds: ring ? [{ x: ring.x, z: ring.z, r: 4.7, n: cheap ? 8 : 12 }] : [],
    });
    this.group.add(this.life.group);
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
    // ciudad estática fusionada (suelo, aceras, marcas viales, edificios): muy pocas llamadas de dibujo
    this.city = buildCityStatic(this.layout, DISTRICTS, SEA_Z, (poi) => poi === 'ring_calle' || poi.startsWith('taxi_'));
    this.group.add(this.city.group);
    this.windowMats.push(this.city.windowMat);
    this.sea = this.city.group.userData.sea as THREE.Mesh;
    // plaza circular: adoquines (con textura) — el parque se monta en buildPlaza()
    const tiles = tileTexture();
    tiles.repeat.set(11, 11);
    const plaza = this.mesh(new THREE.CylinderGeometry(22, 22, 0.2, 48), new THREE.MeshStandardMaterial({ color: 0xffffff, map: tiles, roughness: 0.9 }), 0, 0.02, 0);
    void plaza;
    const curb = this.mesh(new THREE.TorusGeometry(22, 0.22, 6, 72), std(0x8a8478, 0.8), 0, 0.14, 0); curb.rotation.x = Math.PI / 2;
    // fuente: se dibuja EXACTAMENTE donde está su círculo de colisión
    const fc = this.layout.circles.find((c) => c.kind === 'fountain');
    if (fc) {
      const r = fc.r;
      this.mesh(new THREE.CylinderGeometry(r - 0.2, r, 0.9, 28), std(0xcfc8b8, 0.7), fc.x, 0.45, fc.z, true);
      this.fountainWater = this.mesh(new THREE.CylinderGeometry(r - 0.6, r - 0.6, 0.1, 28), std(0x4ab0e8, 0.1, 0.3, { transparent: true, opacity: 0.85 }), fc.x, 0.88, fc.z);
      this.mesh(new THREE.CylinderGeometry(0.3, 0.5, 1.8, 10), std(0xb8b098, 0.7), fc.x, 1.3, fc.z, true);
      const logo = this.mesh(new THREE.TorusGeometry(r * 0.6, 0.12, 6, 32), std(0xc1272d, 0.5), fc.x, 0.95, fc.z); logo.rotation.x = Math.PI / 2;
    }
    // hoguera de la playa
    const hp = this.layout.spots['poi:hoguera'];
    if (hp) {
      for (let i = 0; i < 5; i++) { const l = this.mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.3, 6), std(0x3a2410), hp.x, 0.3, hp.z, true); l.rotation.set(Math.PI / 2 - 0.5, (i / 5) * Math.PI * 2, 0); }
      this.fire = this.mesh(new THREE.ConeGeometry(0.6, 1.5, 8), new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }), hp.x, 1.0, hp.z);
    }
  }
  private city!: CityStatic;

  private buildBuildings() {
    // rótulos de los edificios con nombre (pocos) y taxis en las paradas
    for (const b of this.layout.boxes) {
      if (b.poi?.startsWith('taxi_')) {
        const taxi = makeTaxi();
        taxi.position.set(b.x, 0.06, b.z);
        taxi.rotation.y = b.d > b.w ? 0 : Math.PI / 2;
        this.group.add(taxi);
        this.taxis.push(taxi);
        continue;
      }
      if (!b.sign) continue;
      const s = this.mesh(new THREE.PlaneGeometry(Math.min(b.w - 2, 14), 2.2), new THREE.MeshBasicMaterial({ map: textTexture(b.sign, '#101014', '#f2c14e', 512, 96, 60), toneMapped: false }), b.x, Math.min(b.h - 1.4, 6), b.z + b.d / 2 + 0.06);
      s.matrixAutoUpdate = false; s.updateMatrix();
    }
  }
  private taxis: THREE.Group[] = [];

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

  /** Cielo con degradado y siluetas de edificios en el horizonte (para que Hoyo no parezca una nave cerrada) */
  private buildSky() {
    const mat = new THREE.ShaderMaterial({
      uniforms: { top: { value: new THREE.Color(0x3a7ad0) }, bottom: { value: new THREE.Color(0xbfe0f8) } },
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 bottom; varying vec3 vP; void main(){ float h = clamp(vP.y * 1.6 + 0.05, 0.0, 1.0); gl_FragColor = vec4(mix(bottom, top, h), 1.0); }',
      side: THREE.BackSide, depthWrite: false, fog: false,
    });
    this.sky = this.mesh(new THREE.SphereGeometry(330, 24, 12), mat, 0, 0, 0);
    this.sky.renderOrder = -10; this.sky.receiveShadow = false;
    // horizonte: anillo de rascacielos lejanos
    const R = (() => { let s = 1234; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; })();
    const n = 90;
    const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x5a6478, roughness: 1, fog: true }), n);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion();
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + R() * 0.03;
      const r = 240 + R() * 50;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (z > SEA_Z + 20 && Math.abs(x) < 160) continue; // por el mar, horizonte libre
      const w = 8 + R() * 14, h = 18 + R() * 60;
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -a);
      m4.compose(new THREE.Vector3(x, h / 2, z), q, new THREE.Vector3(w, h, 8 + R() * 10));
      im.setMatrixAt(i, m4);
    }
    im.frustumCulled = false;
    this.group.add(im); this.disposables.push(im.geometry, im.material as THREE.Material);
    this.skyline = im;
  }
  private skyline: THREE.InstancedMesh | null = null;

  /** La plaza como un parque de verdad: césped, caminos, bancos, parterres, quiosco, puestos y guirnaldas de luces */
  private buildPlaza() {
    // todo el mobiliario de la plaza se funde en dos mallas (sólido y bombillas)
    const parts: THREE.BufferGeometry[] = [], bulbs: THREE.BufferGeometry[] = [];
    const put = (g: THREE.BufferGeometry, color: number, x: number, y: number, z: number, ry = 0, rx = 0) => { if (rx) g.rotateX(rx); if (ry) g.rotateY(ry); g.translate(x, y, z); parts.push(paint(g, color)); };
    const fc = this.layout.circles.find((c) => c.kind === 'fountain') ?? { x: 0, z: 0 };
    // césped en cuatro cuartos, entre caminos en cruz
    for (let k = 0; k < 4; k++) put(new THREE.RingGeometry(6.2, 13.5, 24, 1, k * Math.PI / 2 + 0.2, Math.PI / 2 - 0.4), 0x4f8a3a, 0, 0.135, 0, 0, -Math.PI / 2);
    // setos en el borde de los parterres
    for (let k = 0; k < 4; k++) {
      const a0 = k * Math.PI / 2 + 0.2, a1 = a0 + Math.PI / 2 - 0.4;
      for (let i = 0; i <= 6; i++) { const a = a0 + (a1 - a0) * (i / 6); put(new THREE.SphereGeometry(0.45, 7, 5), 0x2f6a2a, Math.cos(a) * 13.6, 0.35, -Math.sin(a) * 13.6); }
    }
    // flores
    const flowers = [0xff5a8a, 0xffd23a, 0xff8a3a, 0xc85aff, 0xffffff];
    let s = 77; const R = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
    for (let i = 0; i < 160; i++) {
      const k = i % 4, a = k * Math.PI / 2 + 0.3 + R() * (Math.PI / 2 - 0.6), r = 7 + R() * 5.8;
      put(new THREE.OctahedronGeometry(0.09, 0), flowers[i % flowers.length], Math.cos(a) * r, 0.2, -Math.sin(a) * r);
    }
    // bancos en los caminos
    for (let k = 0; k < 4; k++) for (const side of [-1, 1]) {
      const a = k * Math.PI / 2, r = 9.5;
      const cx = Math.cos(a) * r + Math.cos(a + Math.PI / 2) * side * 2.6, cz = -Math.sin(a) * r - Math.sin(a + Math.PI / 2) * side * 2.6;
      const ry = a + (side > 0 ? 0 : Math.PI);
      const bench = merge([box(2.2, 0.12, 0.6, 0, 0.5, 0, 0x8a5a2e), box(2.2, 0.5, 0.1, 0, 0.85, -0.28, 0x8a5a2e), box(0.1, 0.5, 0.55, -0.95, 0.25, 0, 0x2a2a30), box(0.1, 0.5, 0.55, 0.95, 0.25, 0, 0x2a2a30)])!;
      bench.rotateY(ry); bench.translate(cx, 0.06, cz); parts.push(bench);
    }
    // quiosco de prensa y helados
    if (!this.layout.blocked(15, 15, 1.5)) { put(new THREE.CylinderGeometry(1.4, 1.4, 2.2, 8), 0x2a6a4a, 15, 1.1, 15); put(new THREE.ConeGeometry(2.1, 1.1, 8), 0xc1272d, 15, 2.75, 15); }
    // puestos del mercadillo con toldos de colores
    const awn = [0xc1272d, 0xe8b42a, 0x2a8aff, 0x2d9a5a];
    ([[8, 18.5], [-2, 19.5], [19, -3], [-19, -6]] as [number, number][]).forEach(([x, z], i) => {
      if (this.layout.blocked(x, z, 1.2)) return;
      put(new THREE.BoxGeometry(2.4, 0.9, 1.2), 0x8a6a4a, x, 0.55, z);
      for (const sx of [-1.1, 1.1]) put(new THREE.CylinderGeometry(0.05, 0.05, 2.2, 5), 0x2a2a30, x + sx, 1.2, z - 0.5);
      put(new THREE.BoxGeometry(2.8, 0.08, 1.8), awn[i % awn.length], x, 2.3, z - 0.1, 0, 0.18);
      for (let j = 0; j < 5; j++) put(new THREE.SphereGeometry(0.14, 6, 4), [0xff5a3a, 0xffd23a, 0x5ac83a][j % 3], x - 0.8 + j * 0.4, 1.08, z + 0.1);
    });
    // guirnaldas de bombillas desde el mástil de la fuente hasta los postes
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2 + Math.PI / 8;
      const ex = fc.x + Math.cos(a) * 19, ez = fc.z + Math.sin(a) * 19;
      put(new THREE.CylinderGeometry(0.07, 0.09, 5, 6), 0x2a2a30, ex, 2.5, ez);
      for (let i = 1; i < 14; i++) {
        const t = i / 14, y = lerp(4.6, 4.9, t) - Math.sin(t * Math.PI) * 1.2;
        const g = new THREE.OctahedronGeometry(0.1, 0); g.translate(lerp(fc.x, ex, t), y, lerp(fc.z, ez, t)); bulbs.push(paint(g, 0xffffff));
      }
    }
    put(new THREE.CylinderGeometry(0.1, 0.12, 4.8, 6), 0x2a2a30, fc.x, 2.6, fc.z);
    put(new THREE.SphereGeometry(0.3, 10, 8), 0xc1272d, fc.x, 5.0, fc.z);
    const solid = this.mesh(merge(parts)!, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8 }), 0, 0, 0, true, true);
    void solid;
    const bulbMesh = this.mesh(merge(bulbs)!, new THREE.MeshBasicMaterial({ vertexColors: true, color: 0xffe6a0 }), 0, 0, 0, false, false);
    this.festoon.push(bulbMesh);
  }

  /** Carteles con las caras de los luchadores en la fachada del estadio y en la plaza */
  /**
   * Las fotos de los luchadores, dentro del mundo: una pantalla gigante en el estadio que va cambiando de luchador y
   * vallas publicitarias en las azoteas de cada barrio (cada luchador en su barrio).
   */
  private buildPosters() {
    const loader = new THREE.TextureLoader();
    const photo = (id: string) => { try { const f = fighterById(id); const u = f.pfp ?? f.portrait; if (!u) return null; const t = loader.load(u); t.colorSpace = THREE.SRGBColorSpace; this.disposables.push(t); return { t, name: f.name }; } catch { return null; } };
    // pantalla gigante del estadio de Matamoros
    const st = this.layout.boxes.find((b) => b.poi === 'matamoros');
    if (st) {
      const front = st.z + st.d / 2 + 0.1;
      const ids = ['elso', 'petisui', 'pablo motos', 'pepe the gay dragon', 'kongui', 'ansol', 'big mac', 'perro cheetos', 'darksinfacha', 'big boom'];
      const pics = ids.map(photo).filter((x): x is NonNullable<typeof x> => !!x);
      const frame = merge([box(9.6, 6.4, 0.5, 0, 0, -0.25, 0x101014), box(9.9, 0.3, 0.6, 0, 3.3, -0.2, 0xc1272d), box(9.9, 0.3, 0.6, 0, -3.3, -0.2, 0xc1272d), box(0.3, 2.2, 0.3, -3, -4.4, -0.4, 0x2a2a30), box(0.3, 2.2, 0.3, 3, -4.4, -0.4, 0x2a2a30)])!;
      this.mesh(frame, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 }), st.x, st.h + 4.4, front, true);
      const scrMat = new THREE.MeshBasicMaterial({ toneMapped: false, color: 0xffffff });
      const scr = this.mesh(new THREE.PlaneGeometry(5.4, 5.4), scrMat, st.x - 1.8, st.h + 4.4, front + 0.02);
      const capMat = new THREE.MeshBasicMaterial({ toneMapped: false });
      this.mesh(new THREE.PlaneGeometry(3.6, 5.4), capMat, st.x + 2.8, st.h + 4.4, front + 0.02);
      let k = -1;
      const next = () => {
        k = (k + 1) % Math.max(1, pics.length);
        const p = pics[k]; if (!p) return;
        scrMat.map = p.t; scrMat.needsUpdate = true;
        capMat.map?.dispose(); capMat.map = captionTexture(p.name); capMat.needsUpdate = true;
      };
      next();
      this.screenTimer = { t: 0, next };
      void scr;
    }
    // vallas en las azoteas: cada luchador cerca de su barrio
    const homes: [string, string][] = [['elso', 'playa'], ['perro cheetos', 'playa'], ['petisui', 'viviendas'], ['big mac', 'viviendas'], ['kongui', 'aldea'], ['ansol', 'manchester'], ['kent', 'manchester'], ['yosuke', 'industrial'], ['pablo motos', 'torre'], ['sergio', 'torre'], ['pepe the gay dragon', 'plaza'], ['darksinfacha', 'santiago']];
    const used = new Set<Box>();
    for (const [id, d] of homes) {
      const dist = DISTRICTS.find((x) => x.id === d);
      if (!dist) continue;
      // un edificio con nombre de calle, cerca del centro del barrio, que no esté ya usado
      const cands = this.layout.boxes.filter((b) => b.district === d && !b.poi && b.w > 7 && b.d > 6 && b.h > 5 && !used.has(b))
        .sort((a, b) => Math.hypot(a.x - dist.center[0], a.z - dist.center[1]) - Math.hypot(b.x - dist.center[0], b.z - dist.center[1]));
      const b = cands[0];
      const p = photo(id);
      if (!b || !p) continue;
      used.add(b);
      const yaw = Math.atan2(dist.center[0] - b.x, dist.center[1] - b.z);
      const g = new THREE.Group();
      g.add(new THREE.Mesh(merge([box(6.4, 3.8, 0.3, 0, 3.9, -0.2, 0x16130f), box(0.25, 2.2, 0.25, -2.4, 1.1, -0.3, 0x3a3a40), box(0.25, 2.2, 0.25, 2.4, 1.1, -0.3, 0x3a3a40), box(6.6, 0.18, 0.5, 0, 1.95, 0, 0xc1272d)])!, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 })));
      const ph = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.4), new THREE.MeshBasicMaterial({ map: p.t, toneMapped: false })); ph.position.set(-1.45, 3.9, -0.03); g.add(ph);
      const cap = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 3.4), new THREE.MeshBasicMaterial({ map: captionTexture(p.name), toneMapped: false })); cap.position.set(1.65, 3.9, -0.03); g.add(cap);
      g.position.set(b.x, b.h, b.z); g.rotation.y = yaw;
      g.traverse((o) => { (o as THREE.Mesh).castShadow = true; });
      this.group.add(g);
    }
  }
  private screenTimer: { t: number; next: () => void } | null = null;

  /** Ring callejero de la plaza: dos luchadores dan un combate de exhibición sin parar */
  private buildSparring() {
    const b = this.layout.boxes.find((x) => x.poi === 'ring_calle');
    if (!b) return;
    const hw = b.w / 2 - 0.2, hd = b.d / 2 - 0.2;
    const parts: THREE.BufferGeometry[] = [box(b.w, 0.9, b.d, b.x, 0.45, b.z, 0xc1272d), box(b.w - 0.1, 0.06, b.d - 0.1, b.x, 0.93, b.z, 0xefe6d5)];
    { const g = new THREE.RingGeometry(0.9, 1.3, 24); g.rotateX(-Math.PI / 2); g.translate(b.x, 0.97, b.z); parts.push(paint(g, 0xc1272d)); }
    for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { const g = new THREE.CylinderGeometry(0.1, 0.1, 1.6, 8); g.translate(b.x + sx * hw, 1.7, b.z + sz * hd); parts.push(paint(g, 0x1a1a1e)); }
    for (const h of [1.35, 1.75, 2.15]) for (const [x, z, w, d] of [[0, -hd, b.w - 0.4, 0.05], [0, hd, b.w - 0.4, 0.05], [-hw, 0, 0.05, b.d - 0.4], [hw, 0, 0.05, b.d - 0.4]]) parts.push(box(w, 0.05, d, b.x + x, h, b.z + z, 0xc1272d));
    this.mesh(merge(parts)!, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7 }), 0, 0, 0, true, true);
    const sign = this.mesh(new THREE.PlaneGeometry(3.6, 0.7), new THREE.MeshBasicMaterial({ map: textTexture('EXHIBICIÓN', '#101014', '#f2c14e', 512, 100, 60), toneMapped: false, side: THREE.DoubleSide }), b.x, 3.0, b.z - hd);
    void sign;
    let la: Appearance, lb: Appearance;
    try { la = fighterById('novato').appearance; lb = fighterById('veterano').appearance; } catch { return; }
    const a = new FighterModel(la), c = new FighterModel(lb);
    a.root.position.set(b.x - 0.9, 0.96, b.z); c.root.position.set(b.x + 0.9, 0.96, b.z);
    a.root.rotation.y = Math.PI / 2; c.root.rotation.y = -Math.PI / 2;
    this.group.add(a.root, c.root);
    this.sparring = { a, b: c, pa: { ...GUARD }, pb: { ...GUARD }, cx: b.x, cz: b.z };
  }

  private updateSparring() {
    const sp = this.sparring;
    if (!sp) return;
    const far = Math.hypot(sp.cx - this.px, sp.cz - this.pz) > 32;
    sp.a.root.visible = sp.b.root.visible = !far;
    if (far) return;
    const t = this.time;
    const cyc = 1.4, k = Math.floor(t / cyc), u = t % cyc;
    const moves = ['jab', 'cross', 'hook', 'lowkick', 'jab', 'knee', 'highkick', 'taunt'];
    const attackerA = k % 2 === 0;
    const anim = moves[k % moves.length];
    const atk = attackPose(anim, u, 0.3, 0.2, cyc * 0.8, false);
    const hit = u > 0.48 && u < 0.95 && anim !== 'taunt' ? mk(STUN) : GUARD;
    const sway = Math.sin(t * 1.3) * 0.25;
    const ta = attackerA ? atk : hit, tb = attackerA ? hit : atk;
    blendPose(sp.pa, ta, 0.35, sp.pa); blendPose(sp.pb, tb, 0.35, sp.pb);
    sp.a.root.position.set(sp.cx - 0.85 + sway, 0.96, sp.cz + Math.sin(t * 0.7) * 0.4);
    sp.b.root.position.set(sp.cx + 0.85 + sway, 0.96, sp.cz + Math.sin(t * 0.7) * 0.4);
    sp.a.applyPose(sp.pa, t); sp.b.applyPose(sp.pb, t);
  }

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
        // columna de luz alta: se ve desde lejos
        const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.9, 46, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xffd45e, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
        beam.position.y = 23; obj.add(beam);
        const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial({ color: 0xffd45e, toneMapped: false }));
        star.position.y = 3.6; star.userData.spin = true; obj.add(star);
        this.floatBadge('★', 'HISTORIA', '#ffd45e', spot.x, 5.2, spot.z, 3.6, p);
      }
      if (p.kind === 'gym' || p.kind === 'shop' || p.kind === 'arena' || p.kind === 'tower') {
        // el letrero ya lo pone el edificio
      }
      if (p.kind === 'minigame') {
        this.floatBadge('🎮', 'MINIJUEGO', '#3aff9a', spot.x, 3.6, spot.z, 3.2, p);
      }
      obj.position.set(spot.x, 0, spot.z);
      this.group.add(obj);
      this.poiMeshes.push({ p, obj, spot });
    }
  }

  /** Insignias del cielo: se ven de lejos y se desvanecen al acercarte */
  private badges: { s: THREE.Sprite; x: number; z: number; base: number; poi?: PoiDef }[] = [];
  private floatBadge(icon: string, text: string, color: string, x: number, y: number, z: number, w: number, poi?: PoiDef): THREE.Sprite {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: badgeTexture(icon, text, color), depthTest: false, transparent: true }));
    s.scale.set(w, w * 0.3125, 1); s.position.set(x, y, z); s.renderOrder = 5;
    this.group.add(s);
    this.badges.push({ s, x, z, base: y, poi });
    return s;
  }
  private updateBadges() {
    for (const b of this.badges) {
      const d = Math.hypot(b.x - this.px, b.z - this.pz);
      // aparece de lejos, flota y se desvanece al acercarte (a menos de 6 m ya no está)
      const k = smooth(6, 16, d) * (1 - smooth(70, 95, d));
      const vis = b.poi ? this.bridge.poiVisible(b.poi) : true;
      (b.s.material as THREE.SpriteMaterial).opacity = k;
      b.s.visible = k > 0.02 && vis && !this.cine && b.s.visible !== undefined && (b.s.userData.hidden !== true);
      b.s.position.y = b.base + Math.sin(this.time * 1.6 + b.x) * 0.18;
    }
    if (this.screenTimer) { this.screenTimer.t += 0.016; if (this.screenTimer.t > 4) { this.screenTimer.t = 0; this.screenTimer.next(); } }
  }

  private buildStickers() {
    for (const s of STICKERS) {
      const spot = this.layout.spots['sticker:' + s.id];
      const obj = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), new THREE.MeshBasicMaterial({ color: 0xffe04a, toneMapped: false }));
      obj.position.set(spot.x, 1.0, spot.z); obj.userData.spin = true;
      this.group.add(obj); this.stickerMeshes.push({ id: s.id, obj, x: spot.x, z: spot.z });
    }
    // grafitis: pintados como murales en la pared más cercana (o en un muro de hormigón si no hay pared)
    GRAFFITI.forEach((g, i) => {
      const spot = this.layout.spots['graffiti:' + g.id];
      const wall = nearestWall(this.layout, spot.x, spot.z);
      const mat = new THREE.MeshStandardMaterial({ map: muralTexture(g.name, i + 3), transparent: true, roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -2 });
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 2.3), mat);
      if (wall) { panel.position.set(wall.x, 1.9, wall.z); panel.rotation.y = wall.yaw; }
      else {
        // muro suelto detrás del sitio de la foto, mirando hacia donde está la calle
        const yaw = Math.atan2(-spot.x, -spot.z);
        const wx = spot.x - Math.sin(yaw) * 2.2, wz = spot.z - Math.cos(yaw) * 2.2;
        this.mesh(new THREE.BoxGeometry(5.2, 3, 0.35), std(0x8a8478, 0.95), wx, 1.5, wz, true).rotation.y = yaw;
        panel.position.set(wx + Math.sin(yaw) * 0.19, 1.6, wz + Math.cos(yaw) * 0.19); panel.rotation.y = yaw;
      }
      this.group.add(panel); this.disposables.push(panel.geometry, mat);
      const cam = this.floatBadge('📷', 'FOTO', '#ff7ac8', spot.x, 3.2, spot.z, 2.4);
      this.graffitiSprites.push({ id: g.id, panel, tag: cam });
    });
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
      this.npcs.push({ t: { kind: 'npc', id: n.id, def: n, x: spot.x, z: spot.z, label: this.bridge.npcName(n.id) }, model, pose: { ...GUARD }, phase: Math.random() * 10, yaw: n.yaw ?? Math.PI, marker: null, markerKind: null, tag, lod: this.npcs.length });
    }
  }

  /** Figuras lejanas: cuerpo (color de la ropa) y cabeza (color de la piel) instanciados */
  private lodBody!: THREE.InstancedMesh;
  private lodHead!: THREE.InstancedMesh;
  private buildLod(n: number) {
    const body = merge([paint(new THREE.CapsuleGeometry(0.26, 0.7, 3, 8).translate(0, 1.2, 0), 0xffffff), box(0.2, 0.85, 0.22, -0.12, 0.43, 0, 0x444444), box(0.2, 0.85, 0.22, 0.12, 0.43, 0, 0x444444), box(0.13, 0.62, 0.14, -0.38, 1.25, 0, 0xffffff), box(0.13, 0.62, 0.14, 0.38, 1.25, 0, 0xffffff)])!;
    this.lodBody = new THREE.InstancedMesh(body, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8 }), n);
    this.lodHead = new THREE.InstancedMesh(new THREE.SphereGeometry(0.17, 10, 8).translate(0, 1.82, 0), new THREE.MeshStandardMaterial({ roughness: 0.6 }), n);
    for (const m of [this.lodBody, this.lodHead]) { m.frustumCulled = false; m.castShadow = false; this.group.add(m); this.disposables.push(m.geometry, m.material as THREE.Material); }
    const z = new THREE.Matrix4().makeScale(0, 0, 0), c = new THREE.Color(0xffffff);
    for (let i = 0; i < n; i++) { this.lodBody.setMatrixAt(i, z); this.lodHead.setMatrixAt(i, z); this.lodBody.setColorAt(i, c); this.lodHead.setColorAt(i, c); }
  }
  private lodM = new THREE.Matrix4(); private lodQ = new THREE.Quaternion(); private lodC = new THREE.Color();
  private lod(i: number, x: number, z: number, yaw: number, ap: Appearance | null) {
    if (!this.lodBody) return;
    if (!ap) this.lodM.makeScale(0, 0, 0);
    else { const h = ap.height ?? 1; this.lodM.compose(new THREE.Vector3(x, 0, z), this.lodQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw), new THREE.Vector3(h * (ap.build ?? 1), h, h)); }
    this.lodBody.setMatrixAt(i, this.lodM); this.lodHead.setMatrixAt(i, this.lodM);
    if (ap) { this.lodBody.setColorAt(i, this.lodC.setHex(ap.outfit === 'desnudo' ? ap.skin : ap.outfitColor)); this.lodHead.setColorAt(i, this.lodC.setHex(ap.skin)); }
    this.lodBody.instanceMatrix.needsUpdate = true; this.lodHead.instanceMatrix.needsUpdate = true;
    if (this.lodBody.instanceColor) this.lodBody.instanceColor.needsUpdate = true;
    if (this.lodHead.instanceColor) this.lodHead.instanceColor.needsUpdate = true;
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
    if (this.sky) {
      const u = (this.sky.material as THREE.ShaderMaterial).uniforms;
      (u.bottom.value as THREE.Color).copy(this.skyColor).lerp(new THREE.Color(0xffffff), 0.25 * day);
      (u.top.value as THREE.Color).setHex(0x05081a).lerp(new THREE.Color(0x2f6fc8), day).lerp(new THREE.Color(0x6a4a8a), dusk * 0.5);
      this.sky.position.set(this.px, 0, this.pz);
    }
    if (this.skyline) (this.skyline.material as THREE.MeshStandardMaterial).color.setHex(0x0e1220).lerp(new THREE.Color(0x7a8498), day);
    if (this.festoon.length) (this.festoon[0].material as THREE.MeshBasicMaterial).color.setHex(n > 0.3 ? 0xffd27a : 0x8a8270);
    if (this.lamps) (this.lamps.material as THREE.MeshBasicMaterial).color.setScalar(lerp(0.35, 1, n));
    void force;
  }

  // ------------------------------------------------------------------ movimiento y colisiones
  private lockedAt(x: number, z: number) {
    for (const lr of this.lockedRects) if (!this.bridge.isOpen(lr.d.id) && x > lr.x0 + 0.2 && x < lr.x1 - 0.2 && z > lr.z0 + 0.2 && z < lr.z1 - 0.2) return true;
    return false;
  }
  /** Modo dev: atravesar paredes y velocidad extra */
  devNoclip = false; devSpeed = 1;
  private free(x: number, z: number) { if (this.devNoclip) return Math.abs(x) < this.layout.worldSize + 40 && Math.abs(z) < this.layout.worldSize + 40; return !this.layout.blocked(x, z, 0.42) && !this.lockedAt(x, z) && !this.life?.carBlocks(x, z); }

  teleport(x: number, z: number, yaw?: number) { this.px = x; this.pz = z; if (yaw != null) this.yaw = yaw; this.camYaw = (yaw ?? this.yaw) + Math.PI; this.snapCamera(); }

  /** Entrada del jugador: mx/mz ya en coordenadas del mundo */
  update(dt: number, mx: number, mz: number, run: boolean, active: boolean) {
    this.time += dt;
    // cámara: vectores de referencia para el InputManager
    this.rig.forward.set(-Math.sin(this.camYaw), 0, -Math.cos(this.camYaw));
    this.rig.right.set(Math.cos(this.camYaw), 0, -Math.sin(this.camYaw));
    if (this.riding) { this.updateRide(dt, active ? mx : 0, active ? mz : 0, run); this.afterMove(dt, active); return; }
    const speed = (run ? 7.4 : 4.4) * this.devSpeed;
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
    if (this.turntable) this.yaw += dt * 0.55;
    this.playerModel.root.position.set(this.px, 0, this.pz);
    this.playerModel.root.rotation.y = this.yaw;
    this.playerModel.root.rotation.z = 0;
    const sp = Math.hypot(this.vx, this.vz);
    this.walkT += dt * (2.0 + sp * 0.9);
    this.pPose = blendPose(this.pPose, this.walkPose(this.walkT, sp, this.running), 1 - Math.exp(-14 * dt), this.pPose);
    this.playerModel.applyPose(this.pPose, this.time);
    this.afterMove(dt, active);
  }

  private afterMove(dt: number, active: boolean) {
    // distritos
    const d = this.layout.districtAt(this.px, this.pz);
    if (d !== this.district) { this.district = d; this.onDistrict?.(d); }
    this.updateNpcs(dt);
    this.updateActors(dt);
    this.updateSparring();
    this.life.update(dt, this.px, this.pz, this.night, () => this.bridge.chatter(), !active && !this.cine);
    this.updateVisuals(dt);
    this.updateCamera(dt);
    this.updateLighting();
    this.findTarget();
  }

  onDistrict?: (id: string | null) => void;

  // ------------------------------------------------------------------ moto
  private moto: THREE.Group | null = null;
  riding = false;
  private motoV = 0;
  private lean = 0;
  /** Aparca la moto en un sitio (o la deja junto a Chema si no se dice dónde) */
  placeMoto(x: number, z: number, yaw: number) {
    if (!this.moto) { this.moto = makeMoto(); this.group.add(this.moto); }
    this.moto.position.set(x, 0.06, z); this.moto.rotation.set(0, yaw, 0);
  }
  get motoPos() { return this.moto ? { x: this.moto.position.x, z: this.moto.position.z, yaw: this.moto.rotation.y } : null; }
  mount() {
    if (!this.moto) return;
    this.riding = true; this.motoV = 0;
    this.px = this.moto.position.x; this.pz = this.moto.position.z; this.yaw = this.moto.rotation.y;
    this.vx = this.vz = 0;
  }
  /** Bajarse: la moto se queda aparcada y Chema a su lado */
  dismount() {
    if (!this.riding || !this.moto) return;
    this.riding = false; this.motoV = 0;
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);
    for (const s of [1.3, -1.3, 2.2, -2.2]) { const x = this.px + rx * s, z = this.pz + rz * s; if (this.free(x, z)) { this.px = x; this.pz = z; break; } }
    this.moto.rotation.z = 0;
  }
  private updateRide(dt: number, mx: number, mz: number, run: boolean) {
    const moto = this.moto!;
    const len = Math.hypot(mx, mz);
    const top = run ? 21 : 14;
    // acelera hacia donde apunta el stick; si no hay dirección, frena
    let steer = 0;
    if (len > 0.15) {
      const want = Math.atan2(mx, mz);
      let df = want - this.yaw; while (df > Math.PI) df -= Math.PI * 2; while (df < -Math.PI) df += Math.PI * 2;
      // girar en el sitio no: hace falta velocidad (y si va muy al revés, frena primero)
      const reverse = Math.abs(df) > 2.4 && this.motoV > 3;
      steer = clamp(df, -1, 1) * (reverse ? 0 : 1);
      this.yaw += steer * dt * (1.4 + 1.6 * Math.min(1, this.motoV / 8));
      this.motoV += ((reverse ? 0 : top * Math.min(1, len)) - this.motoV) * (1 - Math.exp(-(reverse ? 3 : 1.3) * dt));
    } else this.motoV *= Math.exp(-2.2 * dt);
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    const nx = this.px + fx * this.motoV * dt, nz = this.pz + fz * this.motoV * dt;
    const blockedAhead = !this.free(nx + fx * 0.9, nz + fz * 0.9) || this.lockedAt(nx, nz);
    if (!blockedAhead) { this.px = nx; this.pz = nz; }
    else { if (this.motoV > 9) Audio.sfx('heavy'); this.motoV = -this.motoV * 0.15; }
    this.lean += (-steer * Math.min(1, this.motoV / 10) * 0.45 - this.lean) * (1 - Math.exp(-6 * dt));
    moto.position.set(this.px, 0.06, this.pz);
    moto.rotation.set(0, this.yaw, this.lean, 'YXZ');
    // Chema sentado en la moto
    this.playerModel.root.position.set(this.px - Math.cos(this.yaw) * 0, 0.35, this.pz);
    this.playerModel.root.rotation.set(0, this.yaw, this.lean, 'YXZ');
    this.pPose = blendPose(this.pPose, RIDE, 1 - Math.exp(-10 * dt), this.pPose);
    this.playerModel.applyPose(this.pPose, this.time);
    this.playerModel.body.position.y = 0.62;
    this.moving = this.motoV > 0.5; this.running = this.motoV > 12;
    // la cámara se coloca sola detrás de la moto cuando va rápido
    if (this.motoV > 4 && !this.cine) {
      let dc = this.yaw + Math.PI - this.camYaw; while (dc > Math.PI) dc -= Math.PI * 2; while (dc < -Math.PI) dc += Math.PI * 2;
      this.camYaw += dc * (1 - Math.exp(-1.8 * dt));
    }
  }
  get speedKmh() { return Math.round(Math.abs(this.motoV) * 3.6); }

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
      // si el mismo personaje está esperando en una marca de la historia o en una escena, aquí no está
      const here = !!spot && !this.storyCast.some((a) => a.id === n.t.id) && !this.sceneCast.some((a) => a.id === n.t.id);
      n.model.root.visible = here; n.tag.visible = here;
      if (!here) { n.t.x = -9999; this.lod(n.lod, 0, 0, 0, null); continue; }
      const key = spot!.district === n.t.def.district && spot!.at[0] === n.t.def.at[0] && spot!.at[1] === n.t.def.at[1] ? 'npc:' + n.t.def.id : 'npcalt:' + n.t.def.id;
      const p = this.layout.spots[key] ?? this.layout.spots['npc:' + n.t.def.id];
      n.t.x = p.x; n.t.z = p.z;
      // mirar al jugador si está cerca
      const dx = this.px - p.x, dz = this.pz - p.z, d = Math.hypot(dx, dz);
      // rendimiento: los que están lejos no se dibujan ni se animan; solo los cercanos proyectan sombra
      if (d > 22) {
        // de lejos: figura simple instanciada (mucho más barata que el modelo completo)
        n.model.root.visible = false; n.tag.visible = false;
        if (d < 90) this.lod(n.lod, p.x, p.z, n.yaw, n.model.ap); else this.lod(n.lod, 0, 0, 0, null);
        if (n.marker) { n.marker.visible = d < 60; n.marker.position.set(p.x, 3.2 + Math.sin(this.time * 3) * 0.12, p.z); }
        continue;
      }
      this.lod(n.lod, 0, 0, 0, null);
      if (n.marker) n.marker.visible = true;
      const shadow = d < 16;
      if (n.shadow !== shadow) { n.shadow = shadow; n.model.setCastShadow(shadow); }
      if (d < 6) { const ty = Math.atan2(dx, dz); let df = ty - n.yaw; while (df > Math.PI) df -= Math.PI * 2; while (df < -Math.PI) df += Math.PI * 2; n.yaw += df * (1 - Math.exp(-4 * dt)); }
      n.model.root.position.set(p.x, 0, p.z); n.model.root.rotation.y = n.yaw;
      // los luchadores entrenan solos (sombra, posturitas) hasta que te acercas
      let target = this.idlePose(this.time, n.phase);
      if (n.t.def.fighter && d > 5.5) {
        const act = Math.floor(n.phase * 7) % 3;
        if (act === 0) {
          const cyc = 0.9, k = Math.floor((this.time + n.phase) / cyc), u = (this.time + n.phase) % cyc;
          target = attackPose(['jab', 'cross', 'jab', 'hook', 'knee'][k % 5], u, 0.2, 0.15, cyc * 0.85, false);
        } else if (act === 1) target = Math.sin(this.time * 0.8 + n.phase) > 0.2 ? mk(FLEX) : target;
        else { const u = (this.time * 1.4 + n.phase) % 4; target = u < 1 ? attackPose('highkick', u, 0.35, 0.25, 1, false) : target; }
      }
      n.pose = blendPose(n.pose, target, 1 - Math.exp(-10 * dt), n.pose);
      n.model.applyPose(n.pose, this.time);
      n.tag.position.set(p.x, 2.55 * (n.model.ap.height ?? 1), p.z);
      n.tag.visible = here && !this.cine && d < 26;
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
      const near = pm.p.kind === 'story' || Math.abs(pm.spot.x - this.px) + Math.abs(pm.spot.z - this.pz) < 70;
      const vis = near && this.bridge.poiVisible(pm.p);
      pm.obj.visible = vis && !(this.cine && pm.p.kind === 'story');
      if (vis) pm.obj.traverse((o) => { if (o.userData.spin) { o.rotation.y = t * 2; o.position.y = 3.6 + Math.sin(t * 2.5) * 0.2; } });
    }
    for (const s of this.stickerMeshes) {
      const vis = Math.abs(s.x - this.px) + Math.abs(s.z - this.pz) < 60 && this.bridge.stickerVisible(s.id);
      s.obj.visible = vis;
      if (vis) { s.obj.rotation.y = t * 2.2; s.obj.position.y = 1.0 + Math.sin(t * 3 + s.x) * 0.12; }
    }
    for (const g of this.graffitiSprites) { g.tag.userData.hidden = this.bridge.graffitiDone(g.id); }
    this.updateBadges();
    this.barrios.update(this.time, this.px, this.pz);
    if (this.sea) { (this.sea.material as THREE.MeshStandardMaterial).color.setHex(0x1f6f9a).multiplyScalar(0.55 + 0.45 * this.daylight + Math.sin(t * 0.7) * 0.03); this.sea.position.y = -0.15 + Math.sin(t * 0.8) * 0.05; }
    if (this.fire) { this.fire.scale.set(1, 0.9 + 0.25 * Math.sin(t * 13) + 0.1 * Math.sin(t * 29), 1); (this.fire.material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.65 * this.night; }
    if (this.fountainWater) this.fountainWater.position.y = 0.88 + Math.sin(t * 2) * 0.02;
    for (const w of this.waving) w.rotation.z = (w.userData.wave as number) * (0.9 + Math.sin(t * 3 + (w.userData.wave as number)) * 0.5);
    void dt;
  }

  // ------------------------------------------------------------------ personajes de la historia y de las escenas
  private makeActor(id: string, x: number, z: number, yaw: number): Actor | null {
    const look = this.bridge.npcLook(id);
    if (!look) return null;
    const model = new FighterModel(look);
    model.root.position.set(x, 0, z); model.root.rotation.y = yaw;
    this.group.add(model.root);
    const tag = new THREE.Sprite(new THREE.SpriteMaterial({ map: textTexture(this.bridge.npcName(id), 'transparent', '#ffd45e', 512, 96, 46), depthTest: false, transparent: true }));
    tag.scale.set(3.4, 0.64, 1); tag.position.set(x, 2.55 * (look.height ?? 1), z);
    this.group.add(tag);
    return { id, model, tag, x, z, yaw, pose: { ...GUARD }, phase: Math.random() * 10, talk: 0 };
  }
  private dropActor(a: Actor) {
    this.group.remove(a.model.root, a.tag);
    a.model.dispose();
    const m = a.tag.material as THREE.SpriteMaterial; m.map?.dispose(); m.dispose();
  }
  /** Hueco libre cerca de un punto (para colocar a alguien sin meterlo en una pared) */
  private freeNear(x: number, z: number, avoid: { x: number; z: number }[] = []): { x: number; z: number } {
    const ok = (a: number, b: number) => !this.layout.blocked(a, b, 0.5) && !this.lockedAt(a, b) && avoid.every((p) => Math.hypot(p.x - a, p.z - b) > 1.1);
    if (ok(x, z)) return { x, z };
    for (let r = 0.6; r < 6; r += 0.6) for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; const nx = x + Math.cos(a) * r, nz = z + Math.sin(a) * r; if (ok(nx, nz)) return { x: nx, z: nz }; }
    return { x, z };
  }

  /** Coloca junto a la marca dorada del capítulo pendiente a quien te espera */
  private syncStoryCast() {
    const sa = this.bridge.storyActors();
    const key = sa ? sa.poi + ':' + sa.ids.join(',') : '';
    if (key === this.storyKey) return;
    this.storyKey = key;
    this.storyCast.forEach((a) => this.dropActor(a)); this.storyCast = [];
    for (let k = 0; k < 4; k++) this.lod(this.npcs.length + k, 0, 0, 0, null);
    if (!sa) return;
    const spot = this.layout.spots['poi:' + sa.poi];
    if (!spot) return;
    const used: { x: number; z: number }[] = [spot];
    sa.ids.forEach((id, i) => {
      const a = Math.PI * 0.5 + (i - (sa.ids.length - 1) / 2) * 0.9;
      const p = this.freeNear(spot.x + Math.cos(a) * 2.1, spot.z - Math.sin(a) * 2.1, used);
      used.push(p);
      const act = this.makeActor(id, p.x, p.z, Math.PI);
      if (act) this.storyCast.push(act);
    });
  }

  /** Empieza una escena en la calle: aparecen los que hablan delante de Chema y la cámara pasa a modo cine */
  beginScene(ids: string[]) {
    this.endScene();
    const near: { x: number; z: number }[] = [];
    const spawn: string[] = [];
    for (const id of ids) {
      const n = this.npcs.find((x) => x.t.id === id && x.model.root.visible && Math.hypot(x.t.x - this.px, x.t.z - this.pz) < 9);
      const s = this.storyCast.find((x) => x.id === id && Math.hypot(x.x - this.px, x.z - this.pz) < 9);
      if (n) near.push({ x: n.t.x, z: n.t.z }); else if (s) near.push({ x: s.x, z: s.z }); else spawn.push(id);
    }
    // si los que hablan están lejos de Chema, aparecen delante de él
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw), rx = -fz, rz = fx;
    const used: { x: number; z: number }[] = [{ x: this.px, z: this.pz }, ...near];
    spawn.forEach((id, i) => {
      const lat = (i - (spawn.length - 1) / 2) * 1.6;
      const p = this.freeNear(this.px + fx * 2.7 + rx * lat, this.pz + fz * 2.7 + rz * lat, used);
      used.push(p);
      const act = this.makeActor(id, p.x, p.z, Math.atan2(this.px - p.x, this.pz - p.z));
      if (act) { this.sceneCast.push(act); near.push(p); }
    });
    if (near.length) {
      const cx = near.reduce((a, p) => a + p.x, 0) / near.length, cz = near.reduce((a, p) => a + p.z, 0) / near.length;
      this.yaw = Math.atan2(cx - this.px, cz - this.pz);
      const L = Math.hypot(cx - this.px, cz - this.pz) || 1;
      const ux = (cx - this.px) / L, uz = (cz - this.pz) / L;
      // por encima del hombro de Chema, mirando a quien habla
      const side = (this.camPos.x - this.px) * -uz + (this.camPos.z - this.pz) * ux >= 0 ? 1 : -1;
      const back = 2.6 + L * 0.35;
      this.cine = { cx: this.px - ux * back - uz * side * 1.5, cz: this.pz - uz * back + ux * side * 1.5, h: 2.35, lx: cx * 0.65 + this.px * 0.35, lz: cz * 0.65 + this.pz * 0.35, t: 0 };
    } else {
      // escena en solitario (narración, llamadas): plano de tres cuartos de Chema
      const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
      this.cine = { cx: this.px + fx * 3.6 - fz * 1.8, cz: this.pz + fz * 3.6 + fx * 1.8, h: 2.1, lx: this.px, lz: this.pz, t: 0 };
    }
  }

  /** Cambia el aspecto de Chema en vivo (armario) */
  setPlayerLook(ap: Appearance) {
    this.group.remove(this.playerModel.root);
    this.playerModel.dispose();
    this.playerModel = new FighterModel(ap);
    this.group.add(this.playerModel.root);
  }

  /** Armario: plano medio de Chema a la izquierda de la pantalla, girando despacio */
  turntable = false;
  wardrobeCam(on: boolean) {
    this.turntable = on;
    if (this.moto) this.moto.visible = !on;
    if (!on) { this.endScene(); return; }
    // busca una dirección con sitio para la cámara (sin paredes delante)
    for (let k = 0; k < 8; k++) {
      const y = this.yaw + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * (Math.PI / 4);
      let ok = true;
      for (let s = 0.8; s <= 6.4; s += 0.6) if (this.layout.blocked(this.px + Math.sin(y) * s, this.pz + Math.cos(y) * s, 0.4)) { ok = false; break; }
      if (ok) { this.yaw = y; break; }
    }
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    // la cámara delante de Chema; mira un poco a su derecha para dejar sitio a la ventana
    const rx = fz, rz = -fx;
    this.cine = { cx: this.px + fx * 6, cz: this.pz + fz * 6, h: 1.7, lx: this.px + rx * 1.5, lz: this.pz + rz * 1.5, t: 0 };
  }

  /** Quien habla gesticula un poco */
  speak(who: string) {
    for (const a of [...this.sceneCast, ...this.storyCast]) if (a.id === who) a.talk = 1.6;
  }

  endScene() {
    this.sceneCast.forEach((a) => this.dropActor(a)); this.sceneCast = [];
    if (this.cine) { this.camYaw = this.yaw + Math.PI; this.cine = null; }
  }
  get inScene() { return !!this.cine; }

  private syncT = 0;
  private updateActors(dt: number) {
    this.syncT -= dt;
    if (this.syncT <= 0) { this.syncT = 0.5; this.syncStoryCast(); }
    this.storyCast.forEach((a, k) => {
      const far = Math.hypot(this.px - a.x, this.pz - a.z) > 24;
      a.model.root.visible = !far; if (far) a.tag.visible = false;
      this.lod(this.npcs.length + k, a.x, a.z, a.yaw, far ? a.model.ap : null);
    });
    for (const a of [...this.storyCast, ...this.sceneCast]) {
      const dx = this.px - a.x, dz = this.pz - a.z, d = Math.hypot(dx, dz);
      if (!a.model.root.visible) continue;
      if (d < 10) { const ty = Math.atan2(dx, dz); let df = ty - a.yaw; while (df > Math.PI) df -= Math.PI * 2; while (df < -Math.PI) df += Math.PI * 2; a.yaw += df * (1 - Math.exp(-5 * dt)); }
      a.talk = Math.max(0, a.talk - dt);
      const base = this.idlePose(this.time, a.phase);
      const target = a.talk > 0 ? mk({ ...TALK, lF: [-1.2 - Math.sin(this.time * 9) * 0.35, 0, 0] }, base) : base;
      a.pose = blendPose(a.pose, target, 1 - Math.exp(-8 * dt), a.pose);
      a.model.root.rotation.y = a.yaw;
      a.model.applyPose(a.pose, this.time);
      a.tag.visible = !this.cine;
    }
  }

  // ------------------------------------------------------------------ cámara
  private updateCamera(dt: number) {
    if (this.cine) {
      const c = this.cine; c.t += dt;
      // pequeño travelling lateral para que el plano respire
      const drift = Math.sin(c.t * 0.25) * 0.35;
      const dx = c.cx - c.lx, dz = c.cz - c.lz, L = Math.hypot(dx, dz) || 1;
      const want = new THREE.Vector3(c.cx - (dz / L) * drift, c.h, c.cz + (dx / L) * drift);
      for (let i = 0; i < 10 && this.layout.blocked(want.x, want.z, 0.3); i++) { want.x = lerp(want.x, c.lx, 0.15); want.z = lerp(want.z, c.lz, 0.15); }
      this.camPos.lerp(want, 1 - Math.exp(-(c.t < 0.05 ? 60 : 4) * dt));
      this.stage.camera.position.copy(this.camPos);
      this.stage.camera.lookAt(c.lx, 1.5, c.lz);
      return;
    }
    const cy = this.camYaw, cp = this.camPitch, dist = this.riding ? this.camDist + 3 + Math.min(4, this.motoV * 0.2) : this.camDist;
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

  // ------------------------------------------------------------------ objetivos de interacción
  /** Todos los objetivos visibles ahora mismo */
  allTargets(): Target[] {
    const out: Target[] = [];
    if (this.riding) return [{ kind: 'moto', x: this.px, z: this.pz, label: 'Bajar de la moto' }];
    if (this.moto) out.push({ kind: 'moto', x: this.moto.position.x, z: this.moto.position.z, label: 'Subir a la moto' });
    for (const n of this.npcs) if (n.model.root.visible) out.push({ ...n.t, label: n.t.label });
    for (const pm of this.poiMeshes) if (pm.obj.visible || (pm.p.kind === 'landmark' && this.bridge.poiVisible(pm.p))) if (this.bridge.poiVisible(pm.p)) out.push({ kind: 'poi', def: pm.p, x: pm.spot.x, z: pm.spot.z, label: pm.p.name });
    for (const g of GRAFFITI) if (!this.bridge.graffitiDone(g.id)) { const s = this.layout.spots['graffiti:' + g.id]; out.push({ kind: 'graffiti', id: g.id, x: s.x, z: s.z, label: g.name }); }
    return out;
  }

  private findTarget() {
    let best: Target | null = null, bd = 1e9;
    for (const t of this.allTargets()) {
      const d = Math.hypot(t.x - this.px, t.z - this.pz);
      const reach = t.kind === 'npc' ? 2.6 : t.kind === 'poi' ? Math.max(t.def.kind === 'story' ? 3.2 : 2.4, (t.def.radius ?? 1) + 1.6) : 2.6;
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
    for (const a of [...this.storyCast, ...this.sceneCast]) a.model.dispose();
    this.storyCast = []; this.sceneCast = [];
    if (this.sparring) { this.sparring.a.dispose(); this.sparring.b.dispose(); }
    this.life.dispose();
    this.barrios.dispose();
    for (const d of this.disposables) { try { d.dispose(); } catch { /* ya liberado */ } }
  }
}
