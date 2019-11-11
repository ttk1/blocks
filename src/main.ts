import THREE = require('three');
import { WorldViewer } from './world_viewer';

window.onload = () => {
  main();
};

function main() {
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  document.body.appendChild(renderer.domElement);

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

    const diff = new THREE.Vector3(diffY, diffX, 0);
    const angle = diff.length() * 0.01;
    const axis = diff.normalize();
    camera.position.applyAxisAngle(axis, angle);
    camera.lookAt(0, 0, 0);
  });

  const worldViewer = new WorldViewer('MyWorld', renderer);
  worldViewer.loadChunk(0, 0);
  worldViewer.loadChunk(1, 1);
  worldViewer.loadChunk(1, 0);
  worldViewer.loadChunk(0, 1);

  animate();

  function animate() {
    worldViewer.render(camera);
    requestAnimationFrame(animate);
  }
}
