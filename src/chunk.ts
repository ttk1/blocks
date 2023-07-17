import { Block, BlockData } from './block';
import { Face, InstancedMesh, InstancedSquare, Vec3 } from '@ttk1/easy-webgpu';

export type ChunkData = {
  worldName: string,
  chunkX: number,
  chunkZ: number,
  blocks: BlockData[]
};

export class Chunk {
  private x: number;
  private z: number;
  public mesh: InstancedMesh;

  constructor(x: number, z: number, chunkData: ChunkData, textureImages: HTMLImageElement[]) {
    this.x = x;
    this.z = z;
    this.mesh = this.getMesh(chunkData, textureImages);
  }

  private getMesh(chunkData: ChunkData, textureImages: HTMLImageElement[]) {
    const mesh = new InstancedSquare();
    mesh.setTextureImages(textureImages, 64, 64);
    chunkData.blocks.forEach(blockData => {
      const block = new Block(blockData);
      if (!block.transparent) {
        [Face.TOP, Face.BOTTOM, Face.SOUTH, Face.NORTH, Face.EAST, Face.WEST].forEach(face => {
          if (block.face[face]) {
            mesh.addInstance(new Vec3(
              block.x + this.x * 16,
              block.y,
              block.z + this.z * 16
            ), block.textureId, face);
          }
        });
      }
    });
    return mesh;
  }
}
