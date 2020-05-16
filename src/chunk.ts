import * as THREE from 'three';
import { Block } from './block';

export class Chunk {
  public meshes: THREE.Mesh[];
  private x: number;
  private z: number;

  constructor(x: number, z: number, chunkData: string[][][]) {
    this.x = x;
    this.z = z;
    this.meshes = this.getMesh(chunkData);
  }

  private getMesh(chunkData: string[][][]) {
    const blockGeometory = new THREE.BoxGeometry(1, 1, 1);
    const meshes = [];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 256; y++) {
        for (let z = 0; z < 16; z++) {
          const block = new Block(chunkData[x][y][z]);
          if (block.transparent) {
            continue;
          }
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
}
