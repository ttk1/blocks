import * as MVP from '@ttk1/webgl2_mvp';
import { Block, BlockData } from './block';
import { Face } from '@ttk1/webgl2_mvp';

export type ChunkData = {
  worldName: string,
  chunkX: number,
  chunkZ: number,
  blocks: BlockData[]
};

export class Chunk {
  private x: number;
  private z: number;
  public mesh: MVP.InstancedMesh;

  constructor(x: number, z: number, chunkData: ChunkData, textureImages: HTMLImageElement[]) {
    this.x = x;
    this.z = z;
    this.mesh = this.getMesh(chunkData, textureImages);
  }

  private getMesh(chunkData: ChunkData, textureImages: HTMLImageElement[]) {
    /*
    const mesh = new MVP.InstancedCube();
    mesh.setTextureImages(textureImages);
    chunkData.blocks.forEach(blockData => {
      const block = new Block(blockData);
      if (!block.transparent) {
        mesh.addInstance(new MVP.Vec3(
          block.x + this.x * 16,
          block.y,
          block.z + this.z * 16
        ), block.textureId);
      }
    });
    //*/

    ///*
    const mesh = new MVP.InstancedSquare();
    mesh.setTextureImages(textureImages);
    chunkData.blocks.forEach(blockData => {
      const block = new Block(blockData);
      if (!block.transparent) {
        [Face.TOP, Face.BOTTOM, Face.SOUTH, Face.NORTH, Face.EAST, Face.WEST].forEach(face => {
          if (block.face[face]) {
            mesh.addInstance(new MVP.Vec3(
              block.x + this.x * 16,
              block.y,
              block.z + this.z * 16
            ), face, block.textureId);
          }
        });
      }
    });
    //*/
    return mesh;
  }
}
