import * as MVP from '@ttk1/webgl2_mvp';
import { Block } from './block';

export class Chunk {
  private x: number;
  private z: number;
  public mesh: MVP.InstancedCube;

  constructor(x: number, z: number, chunkData: string[][][], textureImages: HTMLImageElement[]) {
    this.x = x;
    this.z = z;
    this.mesh = this.getMesh(chunkData, textureImages);
  }

  private getMesh(chunkData: string[][][], textureImages: HTMLImageElement[]) {
    const mesh = new MVP.InstancedCube();
    mesh.setTextureImages(textureImages);
    for (let x = 0; x < 16; x++) {
      for (let y = -64; y < 320; y++) {
        for (let z = 0; z < 16; z++) {
          const block = new Block(chunkData[x][y + 64][z]);
          if (block.transparent) {
            continue;
          }
          mesh.addInstance(new MVP.Vec3(
            x + this.x * 16,
            y,
            z + this.z * 16
          ), block.textureId);
        }
      }
    }
    return mesh;
  }
}
