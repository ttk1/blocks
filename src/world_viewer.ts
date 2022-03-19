import * as MVP from '@ttk1/webgl2_mvp';
import { World } from './world';

export class WorldViewer {
  private world: World;
  private renderer: MVP.Renderer;

  constructor(worldName: string, renderer: MVP.Renderer, textureImages: HTMLImageElement[]) {
    this.world = new World(worldName, textureImages);
    this.renderer = renderer;
  }

  public loadChunk(x: number, z: number) {
    this.world.loadChunk(x, z);
  }

  public unloadChunk(x: number, z: number) {
    this.world.unloadChunk(x, z);
  }

  public render(camera: MVP.PerspectiveCamera) {
    this.renderer.render(this.world.scene, camera);
  }
}
