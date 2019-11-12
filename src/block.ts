export class Block {
  public color: string;
  public transparent: boolean;

  constructor(blockType: string) {
    // TODO
    this.transparent = false;
    switch (blockType) {
      case 'LEGACY_STONE':
        this.color = 'gray';
        break;
      case 'LEGACY_DIRT':
        this.color = 'brown';
        break;
      case 'LEGACY_AIR':
        this.transparent = true;
        break;
      default:
        this.color = 'white';
    }
  }
}
