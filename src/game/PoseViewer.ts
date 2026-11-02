import * as THREE from 'three';
import { fighterById } from '../content/roster';
import { FighterModel } from '../fighters/FighterModel';
import { ANIMS, GUARD, attackPose, blendPose, mk, type Pose } from '../fighters/Pose';
import type { Stage } from '../render/Stage';

/** Visor de depuración: ?pose=elso&anim=jab&t=0.5&cam=front|side|3q&zoom=1 */
export function startPoseViewer(stage: Stage, q: URLSearchParams) {
  if (q.get('sheet')) { poseSheet(stage, q); return; }
  const f = fighterById(q.get('pose') || 'elso');
  const m = new FighterModel(f.appearance);
  const scene = stage.scene;
  scene.background = new THREE.Color(0x1b1b22);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(6, 40), new THREE.MeshStandardMaterial({ color: 0x3a3a44, roughness: 0.8 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const key = new THREE.SpotLight(0xfff1dd, 3.6, 0, 0.7, 0.5, 0); key.position.set(3, 7, 5); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); scene.add(key, key.target);
  scene.add(new THREE.HemisphereLight(0x9aa7c8, 0x1a1208, 0.5));
  const rim = new THREE.SpotLight(0x6ab6ff, 2, 0, 0.7, 0.5, 0); rim.position.set(-4, 4, -4); scene.add(rim, rim.target);
  scene.add(m.root);
  const anim = q.get('anim') || 'guard';
  const t = parseFloat(q.get('t') || '0.5');
  let pose: Pose = { ...GUARD };
  if (anim !== 'guard' && ANIMS[anim]) {
    const d = ANIMS[anim];
    pose = blendPose(mk(d.wind), mk(d.hit), Math.max(0, Math.min(1, t)));
  }
  m.root.position.set(0, 0, 0);
  m.applyPose(pose, 0);
  const prop = q.get('prop');
  if (prop === 'chair' || prop === 'maletin') m.setProp(prop);
  const cam = q.get('cam') || '3q';
  const zoom = parseFloat(q.get('zoom') || '1');
  const c = stage.camera;
  const r = 4.2 / zoom;
  const ang = cam === 'front' ? 0 : cam === 'side' ? Math.PI / 2 : cam === 'back' ? Math.PI : 0.6;
  c.position.set(Math.sin(ang) * r, 1.3, Math.cos(ang) * r);
  c.lookAt(0, 1.05, 0);
  stage.render();
  const loop = () => { m.applyPose(pose, performance.now() / 1000); stage.render(); requestAnimationFrame(loop); };
  loop();
}

/** Hoja de contactos con todas las animaciones (?pose=elso&sheet=hit|wind) */
function poseSheet(stage: Stage, q: URLSearchParams) {
  const f = fighterById(q.get('pose') || 'elso');
  const names = Object.keys(ANIMS);
  const scene = stage.scene;
  scene.background = new THREE.Color(0x1b1b22);
  const cols = 7;
  const gap = 2.6;
  const rows = Math.ceil(names.length / cols);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(cols * gap + 4, rows * gap + 4), new THREE.MeshStandardMaterial({ color: 0x33333c, roughness: 0.9 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const key = new THREE.DirectionalLight(0xfff1dd, 2.6); key.position.set(3, 8, 6); scene.add(key);
  scene.add(new THREE.HemisphereLight(0x9aa7c8, 0x1a1208, 0.8));
  const mode = q.get('sheet') === 'wind' ? 'wind' : 'hit';
  const sideView = q.get('view') === 'side';
  names.forEach((n, i) => {
    const m = new FighterModel(f.appearance);
    const c = i % cols, r = Math.floor(i / cols);
    m.root.position.set((c - (cols - 1) / 2) * gap, 0, (r - (rows - 1) / 2) * gap);
    if (sideView) m.root.rotation.y = Math.PI / 2;
    scene.add(m.root);
    const d = ANIMS[n];
    m.applyPose(mk(mode === 'wind' ? d.wind : d.hit), 0);
    const label = document.createElement('div');
    label.textContent = n;
    label.style.cssText = 'position:fixed;color:#fff;font:700 13px monospace;background:#000a;padding:1px 4px;pointer-events:none;z-index:50';
    label.dataset.x = String(m.root.position.x); label.dataset.z = String(m.root.position.z);
    document.body.appendChild(label);
  });
  const c = stage.camera;
  c.fov = 35; c.updateProjectionMatrix();
  c.position.set(0, 4.6 + rows * 1.2, 7.5 + rows * 2.6);
  c.lookAt(0, 0.9, 0);
  const place = () => {
    document.querySelectorAll<HTMLElement>('body > div[data-x]').forEach((l) => {
      const v = new THREE.Vector3(parseFloat(l.dataset.x!), 1.9, parseFloat(l.dataset.z!)).project(c);
      l.style.left = ((v.x + 1) / 2) * innerWidth - 20 + 'px'; l.style.top = ((1 - v.y) / 2) * innerHeight - 10 + 'px';
    });
  };
  const loop = () => { stage.render(); place(); requestAnimationFrame(loop); };
  loop();
}
