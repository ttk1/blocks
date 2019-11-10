export class Location {

  public static fromString(str: string) {
    const a = str.split(',');
    return new Location(Number(a[0]), Number(a[0]), Number(a[0]));
  }

  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public toString() {
    return `${this.x},${this.y},${this.z}`;
  }
}
