import * as THREE from 'three';
import { WorldViewer } from './world_viewer';

window.onload = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 32);
  camera.rotation.order = 'YXZ';

  // ctrl+w防止
  window.onbeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = null;
  };

  const onRezise = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onRezise);

  const keymap = {};
  keymap[65] = 'a';
  keymap[83] = 's';
  keymap[68] = 'd';
  keymap[87] = 'w';
  keymap[17] = 'ctl';
  keymap[32] = 'spc';

  let LR = 0; // A-D
  let FB = 0; // W-S
  let UD = 0; // CTL-SPC

  const onKeyDown = (event: KeyboardEvent) => {
    const key = keymap[event.keyCode];
    switch (key) {
      case 'a':
        LR = -1;
        break;
      case 'd':
        LR = 1;
        break;
      case 'ctl':
        UD = -1;
        break;
      case 'spc':
        UD = 1;
        break;
      case 'w':
        FB = -1;
        break;
      case 's':
        FB = 1;
        break;
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    const key = keymap[event.keyCode];
    switch (key) {
      case 'a':
        LR = 0;
        break;
      case 'd':
        LR = 0;
        break;
      case 'ctl':
        UD = 0;
        break;
      case 'spc':
        UD = 0;
        break;
      case 'w':
        FB = 0;
        break;
      case 's':
        FB = 0;
        break;
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    camera.rotation.x += -event.movementY * 0.003;
    camera.rotation.y += -event.movementX * 0.003;
  };

  let willAnimate = false;
  const worldViewer = new WorldViewer('world', renderer);

  const animate = () => {
    camera.translateX(LR);
    camera.translateZ(FB);
    camera.translateY(UD);
    worldViewer.render(camera);
    if (willAnimate) {
      requestAnimationFrame(animate);
    }
  };

  const loadChunk = () => {
    // sceneサイズ増えすぎ注意
    worldViewer.loadChunk(
      Math.floor(camera.position.x / 16),
      Math.floor(camera.position.z / 16)
    );
    setTimeout(loadChunk, 1000);
  };

  loadChunk();

  const onLockChange = () => {
    if (document.pointerLockElement === null) {
      document.removeEventListener('mousemove', onMouseMove, false);
      willAnimate = false;
    }
  };

  const onClick = () => {
    document.body.requestPointerLock();
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('pointerlockchange', onLockChange, false);
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('keyup', onKeyUp, false);
    willAnimate = true;
    animate();
  };
  document.addEventListener('click', onClick, false);
};
