import * as MVP from '@ttk1/webgl2_mvp';
import { World } from './world';

export class WorldViewer {
  private world: World;
  private lights: MVP.Light[];
  private renderer: MVP.Renderer;

  constructor(worldName: string, renderer: MVP.Renderer, textureImages: HTMLImageElement[]) {
    this.world = new World(worldName, textureImages);
    // ライトの設定
    // 一旦ここに置いておく
    this.lights = [
      new MVP.Light(1, 2, 3),
      new MVP.Light(-1, -2, -3)
    ];
    this.renderer = renderer;
  }

  public loadChunk(x: number, z: number) {
    this.world.loadChunk(x, z);
  }

  public unloadChunk(x: number, z: number) {
    this.world.unloadChunk(x, z);
  }

  public render(camera: MVP.PerspectiveCamera, range?: number) {
    // デフォルトの読み込み範囲は 7 とする
    if (range == null) {
      range = 7;
    }
    // カメラ周辺のチャンクのみ読み込む
    const meshes: MVP.InstancedCube[] = [];
    const centerX = Math.floor(camera.position.x / 16);
    const centerZ = Math.floor(camera.position.z / 16);
    for (let modX = -range; modX < range; modX++) {
      for (let modZ = -range; modZ < range; modZ++) {
        const chunk = this.world.getChunk(centerX + modX, centerZ + modZ);
        if (chunk != null) {
          meshes.push(chunk.mesh);
        }
      }
    }
    this.renderer.render(new MVP.Scene(meshes, this.lights), camera);
  }
}
