import { World } from './world';

export class WorldViewer {
  public world: World;

  constructor(worldName: string) {
    this.world = new World(worldName);
  }
}
