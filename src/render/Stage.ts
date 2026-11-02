import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { Quality } from '../arenas/Arena';

export const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export class Stage {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, 1, 0.1, 400);
  composer: EffectComposer | null = null;
  bloom: UnrealBloomPass | null = null;
  quality: Quality = 'media';
  private env: THREE.Texture;

  constructor(public canvas: HTMLCanvasElement, quality: Quality) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    const pm = new THREE.PMREMGenerator(this.renderer);
    this.env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    pm.dispose();
    this.scene.environment = this.env;
    this.scene.environmentIntensity = 0.28;
    this.scene.background = new THREE.Color(0x050507);
    this.setQuality(quality);
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  setQuality(q: Quality) {
    this.quality = q;
    const dpr = window.devicePixelRatio || 1;
    this.renderer.setPixelRatio(Math.min(dpr, q === 'baja' ? 1 : q === 'media' ? 1.5 : 2));
    this.renderer.shadowMap.enabled = q !== 'baja' || true;
    if (q === 'alta' && !isTouchDevice()) {
      const size = this.renderer.getSize(new THREE.Vector2());
      const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: 4 });
      this.composer?.dispose();
      this.composer = new EffectComposer(this.renderer, rt);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.22, 0.5, 1.25);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    } else { this.composer?.dispose(); this.composer = null; this.bloom = null; }
    this.resize();
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.canvas.style.width = w + 'px'; this.canvas.style.height = h + 'px';
    this.camera.aspect = w / h;
    // en vertical (móvil) abrimos el campo de visión para que quepan ambos luchadores
    this.camera.fov = w / h < 1 ? 58 : 40;
    this.camera.updateProjectionMatrix();
    this.composer?.setSize(w, h);
  }

  get viewportH() { return this.renderer.domElement.height; }

  render() {
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }
}
