import * as THREE from 'three';

/** El monigote inflable azul de gasolinera ("tubeman"), con cara sonriente. */
export class Tubeman {
  group = new THREE.Group();
  private segs: THREE.Group[] = [];
  private armsL: THREE.Group[] = [];
  private armsR: THREE.Group[] = [];

  constructor(scale = 1) {
    const blue = new THREE.MeshStandardMaterial({ color: 0x1c4fd0, roughness: 0.45, metalness: 0, emissive: 0x0a2a8a, emissiveIntensity: 0.55 });
    const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, emissive: 0xffffff, emissiveIntensity: 0.25 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.4 });
    const tan = new THREE.MeshStandardMaterial({ color: 0xc9a45a, roughness: 0.6, emissive: 0x4a3510, emissiveIntensity: 0.4 });

    // soplador de la base
    const blower = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.5, 18), new THREE.MeshStandardMaterial({ color: 0x25262b, roughness: 0.6, metalness: 0.4 }));
    blower.position.y = 0.25;
    this.group.add(blower);

    // cuerpo: segmentos encadenados que se doblan
    const N = 7, H = 0.62;
    let parent: THREE.Object3D = this.group;
    let y = 0.5;
    for (let i = 0; i < N; i++) {
      const g = new THREE.Group();
      g.position.set(0, i === 0 ? y : H, 0);
      parent.add(g);
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.44 - i * 0.012, 0.46 - i * 0.012, H + 0.02, 20), blue);
      cyl.position.y = H / 2;
      cyl.castShadow = true;
      g.add(cyl);
      this.segs.push(g);
      parent = g;
      if (i === N - 3) {
        // cara en el penúltimo tramo
        for (const sx of [-1, 1]) {
          const eye = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), white);
          eye.position.set(sx * 0.17, H * 0.7, 0.36);
          eye.scale.z = 0.5;
          const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), dark);
          pupil.position.set(sx * 0.17, H * 0.68, 0.43);
          g.add(eye, pupil);
        }
        const smile = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.028, 8, 20, Math.PI), white);
        smile.position.set(0, H * 0.35, 0.4);
        smile.rotation.z = Math.PI;
        g.add(smile);
        // brazos
        for (const side of [-1, 1]) {
          let ap: THREE.Object3D = g;
          const arr = side === -1 ? this.armsL : this.armsR;
          for (let k = 0; k < 5; k++) {
            const a = new THREE.Group();
            a.position.set(k === 0 ? side * 0.4 : 0, k === 0 ? H * 0.75 : 0.5, 0);
            a.rotation.z = k === 0 ? -side * 0.9 : 0;
            ap.add(a);
            const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.52, 12), blue);
            seg.position.y = 0.26;
            seg.castShadow = true;
            a.add(seg);
            arr.push(a);
            ap = a;
          }
        }
      }
      if (i === N - 1) {
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.44, 0.34, 20), tan);
        cap.position.y = H + 0.15;
        g.add(cap);
        const top = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.12, 16), new THREE.MeshStandardMaterial({ color: 0x8a6a30, roughness: 0.7 }));
        top.position.y = H + 0.36;
        g.add(top);
      }
    }
    this.group.scale.setScalar(scale);
  }

  update(t: number) {
    const k = this.segs.length;
    this.segs.forEach((s, i) => {
      s.rotation.z = Math.sin(t * 3.1 + i * 0.55) * 0.2 * (0.35 + i / k);
      s.rotation.x = Math.sin(t * 2.3 + i * 0.4 + 1) * 0.12 * (0.35 + i / k);
    });
    this.armsL.forEach((a, i) => { a.rotation.z = (i === 0 ? -0.9 : 0) + Math.sin(t * 5.2 + i * 0.8) * 0.45 * (i === 0 ? 0.8 : 1); a.rotation.x = Math.sin(t * 4 + i * 0.6) * 0.18; });
    this.armsR.forEach((a, i) => { a.rotation.z = (i === 0 ? 0.9 : 0) - Math.sin(t * 5.2 + i * 0.8 + 1.4) * 0.45 * (i === 0 ? 0.8 : 1); a.rotation.x = Math.sin(t * 4 + i * 0.6 + 2) * 0.18; });
  }
}
