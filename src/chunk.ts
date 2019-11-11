import THREE = require('three');
import { Block } from './block';

export class Chunk {
  public meshes: THREE.Mesh[];
  private worldName: string;
  private x: number;
  private z: number;

  constructor(worldName: string, x: number, z: number) {
    this.worldName = worldName;
    this.x = x;
    this.z = z;
    this.meshes = this.getMesh();
  }

  private getMesh() {
    // TODO: ブロックごとの色ってどう設定する？
    const chunkData = this.getChunkData();
    const geometry = new THREE.Geometry();
    const blockGeometory = new THREE.BoxGeometry(1, 1, 1);
    const meshes = [];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 256; y++) {
        for (let z = 0; z < 16; z++) {
          if (Math.random() < 0.95) {
            // 重いので間引く
            continue;
          }
          const block = chunkData[x][y][z];
          const mesh = new THREE.Mesh(
            blockGeometory,
            new THREE.MeshLambertMaterial({ color: block.color })
          );
          mesh.position.set(
            x + this.x * 16,
            y,
            z + this.z * 16
          );
          meshes.push(mesh);
        }
      }
    }
    return meshes;
  }

  private getChunkData() {
    const chunkData: Block[][][] = [];
    for (let x = 0; x < 16; x++) {
      chunkData[x] = [];
      for (let y = 0; y < 256; y++) {
        chunkData[x][y] = [];
        for (let z = 0; z < 16; z++) {
          // TODO: データの取得部分実装
          chunkData[x][y][z] = new Block();
        }
      }
    }
    return chunkData;
  }
}
