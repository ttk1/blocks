import { Face } from '@ttk1/easy-webgpu';

// https://en.wikipedia.org/wiki/Web_colors
const color = {
  'gray': [128, 128, 128].map(v => v / 255),
  'brown': [165, 42, 42].map(v => v / 255),
  'white': [255, 255, 255].map(v => v / 255),
};

export type BlockData = {
  x: number,
  y: number,
  z: number,
  face: string,
  material: string
};

export class Block {
  public x: number;
  public y: number;
  public z: number;
  public face: boolean[];
  public material: string;
  public color: number[];
  public textureId: number;
  public transparent: boolean;

  constructor(blockData: BlockData) {
    this.x = blockData.x;
    this.y = blockData.y;
    this.z = blockData.z;
    this.face = [];
    this.face[Face.TOP] = blockData.face[Face.TOP] === '1';
    this.face[Face.BOTTOM] = blockData.face[Face.BOTTOM] === '1';
    this.face[Face.SOUTH] = blockData.face[Face.SOUTH] === '1';
    this.face[Face.NORTH] = blockData.face[Face.NORTH] === '1';
    this.face[Face.EAST] = blockData.face[Face.EAST] === '1';
    this.face[Face.WEST] = blockData.face[Face.WEST] === '1';
    this.material = blockData.material;

    // TODO: ブロックごとの色ってどう設定する？
    this.transparent = false;
    switch (blockData.material) {
      case null:
        this.transparent = true;
        break;
      case 'STONE':
        this.color = color.gray;
        this.textureId = 0;
        break;
      case 'DIRT':
        this.color = color.brown;
        this.textureId = 1;
        break;
      default:
        this.color = color.white;
        this.textureId = 2;
    }
  }
}
