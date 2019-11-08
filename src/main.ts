import * as THREE from 'three';

window.onload = () => {
  main();
};

function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0xddff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(100, 200, 300).normalize();
  scene.add(light);

  camera.position.z = 2;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.updateProjectionMatrix();
  });

  const animate = () => {
    cube.rotation.x += 0.017;
    cube.rotation.y += 0.023;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
}
