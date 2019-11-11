import THREE = require('three');
import { Block } from './block';
import { Location } from './location';

export class Chunk {
  private worldName: string;
  private location: Location;
  private mesh: THREE.Mesh;

  constructor(worldName: string, location: Location) {
    this.worldName = worldName;
    this.location = location;
    this.mesh = this.getMesh();
  }

  private getMesh() {
    // TODO
    return new THREE.Mesh();
  }

  private getChunkData() {
    const chunkData: Block[][][] = [];
    for (let x = 0; x < 16; x++) {
      chunkData[x] = [];
      for (let y = 0; y < 16; y++) {
        chunkData[x][y] = [];
        for (let z = 0; z < 256; z++) {
          // TODO: データの取得部分実装
          chunkData[x][y][z] = new Block(x, y, z);
        }
      }
    }
    return chunkData;
  }
}
