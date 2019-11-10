import { Chunk } from './chunk';

export class World {
  public worldName: string;
  public chunk: Map<string, Chunk>;

  constructor(worldName: string) {
    this.worldName = worldName;
    this.chunk = new Map<string, Chunk>();
  }
}
