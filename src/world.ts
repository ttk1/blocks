import THREE = require('three');
import { Chunk } from './chunk';
import { Location } from './location';

export class World {
  public worldName: string;
  public chunks: Map<string, Chunk>;
  public scene: THREE.Scene;

  constructor(worldName: string) {
    // TODO
    this.worldName = worldName;
    this.chunks = new Map<string, Chunk>();
    this.scene = new THREE.Scene();
  }

  public loadChunk(location: Location) {
    // TODO
    this.chunks.set(location.toString(), new Chunk(this.worldName, location));
  }

  public unloadChunk(location: Location) {
    // TODO
    this.chunks.delete(location.toString());
  }
}
