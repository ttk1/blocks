import { FPSKeyboard, FPSMouse, PerspectiveCamera, Renderer, Vec3, fetchImage } from '@ttk1/easy-webgpu';
import { WorldViewer } from './worldViewer';

window.onload = async () => {
  ////////////////////////////////
  // 初期化
  ////////////////////////////////

  const cvs = document.body.appendChild(document.createElement('canvas'));
  cvs.width = 1000;
  cvs.height = 500;
  const ctx = cvs.getContext('webgpu');
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();
  const info = document.body.appendChild(document.createElement('pre'));
  const renderer = new Renderer(ctx, device);
  const camera = new PerspectiveCamera(
    new Vec3(0, 70, 0), // pos
    new Vec3(0, 0, 0),  // rot
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
    await fetchImage('./texture/gray.png'),
    await fetchImage('./texture/brown.png'),
    await fetchImage('./texture/white.png')
  ];
  const worldViewer = new WorldViewer('world', renderer, textureImages);
  const chunkRange = 7;


  ////////////////////////////////
  // ループ処理
  ////////////////////////////////

  let requestId = null;
  let lastTimestamp = null;
  const step = async (timestamp: number) => {
    const timeGap = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    camera.move(new Vec3(
      keyboard.getLR() * timeGap / 50,
      keyboard.getUD() * timeGap / 50,
      keyboard.getFB() * timeGap / 50
    ));
    worldViewer.render(camera, chunkRange);

    // 情報表示
    info.textContent = `FPS: ${1 / timeGap * 1000}
cameraPosX: ${camera.position.x}
cameraPosY: ${camera.position.y}
cameraPosZ: ${camera.position.z}
cameraRotX: ${camera.rotation.x}
cameraRotY: ${camera.rotation.y}
cameraRotZ: ${camera.rotation.z}`;

    requestId = requestAnimationFrame(step);
  };

  // 周囲のチャンク chunkRange の幅だけロードする。
  // チャンクの読み込み過ぎに注意。
  // const loadChunk = () => {
  //   const centerX = Math.floor(camera.position.x / 16);
  //   const centerZ = Math.floor(camera.position.z / 16);
  //   for (let modX = -chunkRange; modX < chunkRange; modX++) {
  //     for (let modZ = -chunkRange; modZ < chunkRange; modZ++) {
  //       worldViewer.loadChunk(centerX + modX, centerZ + modZ);
  //     }
  //   }
  // };
  // loadChunk();
  // const loadChunk = () => {
  //   worldViewer.loadChunk(
  //     Math.floor(camera.position.x / 16),
  //     Math.floor(camera.position.z / 16)
  //   );
  // };
  // setInterval(loadChunk, 1000);

  // 内側から順に読み込む
  const loadChunk = () => {
    const centerX = Math.floor(camera.position.x / 16);
    const centerZ = Math.floor(camera.position.z / 16);
    for (let limit = 0; limit < chunkRange; limit++) {
      for (let modX = 0; modX <= limit; modX++) {
        const modZ = limit - modX;
        worldViewer.loadChunk(centerX + modX, centerZ + modZ);
        if (modZ != 0 ) {
          worldViewer.loadChunk(centerX + modX, centerZ - modZ);
        }
        if (modX != 0) {
          worldViewer.loadChunk(centerX - modX, centerZ + modZ);
          if (modZ != 0 ) {
            worldViewer.loadChunk(centerX - modX, centerZ - modZ);
          }
        }
      }
    }
  };
  setInterval(loadChunk, 1000);

  const keyboard = new FPSKeyboard(window);
  new FPSMouse(window, camera);
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
