import THREE = require('three');
import { WorldViewer } from './world_viewer';

window.onload = () => {
  main();
};

function main() {

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

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
      default:
      // nothing to do
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
      default:
      // nothing to do
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    const moveX = event.movementX;
    const moveY = event.movementY;
    const rotX = moveX * 0.003;
    const rotY = moveY * 0.003;
    camera.rotateY(-rotX);
    camera.rotateX(-rotY);
  };

  let willAnimate = false;
  const worldViewer = new WorldViewer('world', renderer);
  for (let x = -2; x < 2; x++) {
    for (let z = -2; z < 2; z++) {
      worldViewer.loadChunk(x, z);
    }
  }

  const animate = () => {
    camera.translateX(LR);
    camera.translateZ(FB);
    camera.translateY(UD);
    worldViewer.render(camera);
    if (willAnimate) {
      requestAnimationFrame(animate);
    }
  };

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
}
