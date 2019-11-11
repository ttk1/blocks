import { Chunk } from './chunk';
import { Location } from './location';

export class World {
  public worldName: string;
  public chunks: Map<string, Chunk>;

  constructor(worldName: string) {
    // TODO
    this.worldName = worldName;
    this.chunks = new Map<string, Chunk>();
  }

  public loadChunk(location: Location) {
    // TODO
    this.chunks.set(location.toString(), new Chunk(location));
  }

  public unloadChunk(location: Location) {
    // TODO
    this.chunks.delete(location.toString());
  }
}
