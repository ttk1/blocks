import { Location } from './location';
import { World } from './world';

export class WorldViewer {
  private world: World;
  private renderer: THREE.WebGLRenderer;

  constructor(worldName: string, renderer: THREE.WebGLRenderer) {
    this.world = new World(worldName);
    this.renderer = renderer;
  }

  public loadChunk(location: Location) {
    this.world.loadChunk(location);
  }

  public unloadChunk(location: Location) {
    this.world.unloadChunk(location);
  }

  public render(camera: THREE.Camera) {
    this.renderer.render(this.world.scene, camera);
  }
}
