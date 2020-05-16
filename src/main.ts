import * as THREE from 'three';
import { WorldViewer } from './world_viewer';

function getRenderer() {
  const cvs = document.createElement('canvas');
  const ctx = cvs.getContext('webgl2', {
    alpha: false
  });
  return new THREE.WebGLRenderer({
    canvas: cvs,
    context: ctx as WebGLRenderingContext
  });
}

window.onload = () => {
  const renderer = getRenderer();
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

  const keymap = {
    65: 'a',
    83: 's',
    68: 'd',
    87: 'w',
    17: 'ctl',
    32: 'spc',
    16: 'sft'
  };

  let LR = 0; // A-D
  let FB = 0; // W-S
  let UD = 0; // SFT-SPC

  const onKeyDown = (event: KeyboardEvent) => {
    const key = keymap[event.keyCode];
    switch (key) {
      case 'a':
        LR = -1;
        break;
      case 'd':
        LR = 1;
        break;
      case 'sft':
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
      case 'sft':
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
