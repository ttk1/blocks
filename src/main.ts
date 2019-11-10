import * as THREE from 'three';
import { Vector3 } from 'three';

window.onload = () => {
  main();
};

function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 150;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  document.body.appendChild(renderer.domElement);

  // addCube(0, 0, 0);
  // addCube(0, 1, 1);
  // addCube(1, 0, 1);
  // addCube(1, 1, 0);

  sphere();

  function sphere() {
    const geometry = new THREE.Geometry();
    function addCube(x: number, y: number, z: number) {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
      // const cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5));
      cube.position.set(x, y, z);
      geometry.mergeMesh(cube);
    }

    const r = 100;
    for (let x = -r; x < r; x++) {
      for (let y = -r; y < r; y++) {
        for (let z = -r; z < r; z++) {
          if (x ** 2 + y ** 2 + z ** 2 < r ** 2 &&
            r ** 2 - 40 < x ** 2 + y ** 2 + z ** 2) {
            addCube(x, y, z);
          }
        }
      }
    }

    const material = new THREE.MeshLambertMaterial({ color: 0xddff00 });
    scene.add(new THREE.Mesh(geometry, material));
  }

  const light1 = new THREE.DirectionalLight(0xffffff);
  light1.position.set(100, 200, 300);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(-300, -200, -100);
  scene.add(light2);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.updateProjectionMatrix();
  });

  let mouseX: number = null;
  let mouseY: number = null;
  window.addEventListener('mousemove', (event: MouseEvent) => {
    let diffX: number;
    let diffY: number;
    if (mouseX == null || mouseY == null) {
      diffX = event.offsetX;
      diffY = event.offsetY;
    } else {
      diffX = event.offsetX - mouseX;
      diffY = event.offsetY - mouseY;
    }
    mouseX = event.offsetX;
    mouseY = event.offsetY;

    const diff = new Vector3(diffY, diffX, 0);
    const angle = diff.length() * 0.01;
    const axis = diff.normalize();
    camera.position.applyAxisAngle(axis, angle);
    camera.lookAt(0, 0, 0);
  });

  const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
}
