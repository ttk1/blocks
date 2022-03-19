// https://en.wikipedia.org/wiki/Web_colors
const color = {
  'gray': [128, 128, 128].map(v => v / 255),
  'brown': [165, 42, 42].map(v => v / 255),
  'white': [255, 255, 255].map(v => v / 255),
};

export class Block {
  public color: number[];
  public textureId: number;
  public transparent: boolean;

  constructor(blockType: string) {
    // TODO: ブロックごとの色ってどう設定する？
    this.transparent = false;
    switch (blockType) {
      case null:
        this.transparent = true;
        break;
      case 'LEGACY_STONE':
        this.color = color.gray;
        this.textureId = 0;
        break;
      case 'LEGACY_DIRT':
        this.color = color.brown;
        this.textureId = 1;
        break;
      default:
        this.color = color.white;
        this.textureId = 2;
    }
  }
}
