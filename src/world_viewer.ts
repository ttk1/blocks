import { World } from './world';

export class WorldViewer {
  private world: World;
  private renderer: THREE.WebGLRenderer;

  constructor(worldName: string, renderer: THREE.WebGLRenderer) {
    this.world = new World(worldName);
    this.renderer = renderer;
  }

  public loadChunk(x: number, z: number) {
    this.world.loadChunk(x, z);
  }

  public unloadChunk(x: number, z: number) {
    this.world.unloadChunk(x, z);
  }

  public render(camera: THREE.Camera) {
    this.renderer.render(this.world.scene, camera);
  }
}
