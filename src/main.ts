import THREE = require('three');

const RANGE_SIZE = 1;
const RESOLUTION = 10;
const BLOCK_SIZE = RANGE_SIZE / RESOLUTION;

window.onload = () => {
  main();
};

function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, RANGE_SIZE * 10);
  camera.position.z = RANGE_SIZE * 1.5;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  document.body.appendChild(renderer.domElement);

  sphere();

  function sphere() {
    const geometry = new THREE.Geometry();
    function addCube(x: number, y: number, z: number) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(BLOCK_SIZE / 2, BLOCK_SIZE / 2, BLOCK_SIZE / 2)
      );
      cube.position.set(
        x - RANGE_SIZE / 2,
        y - RANGE_SIZE / 2,
        z - RANGE_SIZE / 2
      );
      geometry.mergeMesh(cube);
    }

    for (let x = 0; x < RANGE_SIZE; x += BLOCK_SIZE) {
      for (let y = 0; y < RANGE_SIZE; y += BLOCK_SIZE) {
        for (let z = 0; z < RANGE_SIZE; z += BLOCK_SIZE) {
          addCube(x, y, z);
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

    const diff = new THREE.Vector3(diffY, diffX, 0);
    const angle = diff.length() * 0.01;
    const axis = diff.normalize();
    camera.position.applyAxisAngle(axis, angle);
    camera.lookAt(0, 0, 0);
  });

  animate();

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}
