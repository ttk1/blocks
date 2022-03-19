import * as MVP from '@ttk1/webgl2_mvp';
import { WorldViewer } from './world_viewer';

window.onload = async () => {
  ////////////////////////////////
  // 初期化
  ////////////////////////////////

  const cvs = document.body.appendChild(document.createElement('canvas'));
  cvs.width = 1000;
  cvs.height = 500;
  const ctx = cvs.getContext('webgl2', {
    antialias: false, // TODO: 性能に応じてON/OFF切り替え
    alpha: false
  });
  const renderer = new MVP.Renderer(ctx);
  const camera = new MVP.PerspectiveCamera(
    new MVP.Vec3(0, 0, 10), // pos
    new MVP.Vec3(0, 0, 0),  // rot
    1, // fov
    cvs.width / cvs.height, // aspect, w/h
    1, // near
    100 // far
  );
  // const textureImages = {
  //   'gray': await MVP.fetchImage('./texture/gray.png'),
  //   'brown': await MVP.fetchImage('./texture/brown.png'),
  //   'white': await MVP.fetchImage('./texture/white.png')
  // };
  const textureImages = [
    await MVP.fetchImage('./texture/gray.png'),
    await MVP.fetchImage('./texture/brown.pngzzz'),
    await MVP.fetchImage('./texture/white.png')
  ];
  const worldViewer = new WorldViewer('world', renderer, textureImages);


  ////////////////////////////////
  // ループ処理
  ////////////////////////////////

  let requestId = null;
  let lastTimestamp = null;
  const step = async (timestamp: number) => {
    const timeGap = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    camera.move(new MVP.Vec3(
      keyboard.getLR() * timeGap / 50,
      keyboard.getUD() * timeGap / 50,
      keyboard.getFB() * timeGap / 50
    ));
    worldViewer.render(camera);
    requestId = requestAnimationFrame(step);
  };

  const loadChunk = () => {
    // sceneサイズ増えすぎ注意
    worldViewer.loadChunk(
      Math.floor(camera.position.x / 16),
      Math.floor(camera.position.z / 16)
    );
  };
  setInterval(loadChunk, 1000);

  const keyboard = new MVP.FPSKeyboard(window);
  new MVP.FPSMouse(window, camera);
  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement == null) {
      if (requestId != null) {
        cancelAnimationFrame(requestId);
      }
    } else {
      lastTimestamp = performance.now();
      requestId = requestAnimationFrame(step);
    }
  }, false);
  document.addEventListener('click', () => {
    document.body.requestPointerLock();
  }, false);

  // ctrl+w防止
  window.onbeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = null;
  };

  // リサイズ処理
  // const onRezise = () => {
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   renderer.setSize(window.innerWidth, window.innerHeight, false);
  //   camera.updateProjectionMatrix();
  // };
  // window.addEventListener('resize', onRezise);
};
