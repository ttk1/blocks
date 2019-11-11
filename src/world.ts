import THREE = require('three');
import { Chunk } from './chunk';
import { Location } from './location';

export class World {
  public scene: THREE.Scene;
  private worldName: string;
  private chunks: Map<string, Chunk>;

  constructor(worldName: string) {
    this.worldName = worldName;
    this.chunks = new Map<string, Chunk>();
    this.scene = new THREE.Scene();
  }

  /**
   * チャンクのデータをロードする。既にロード済みの場合、データを上書きする。
   * @param location チャンクの位置
   */
  public loadChunk(location: Location) {
    this.unloadChunk(location);
    if (this.chunks.has(location.toString())) {
      this.unloadChunk(location);
    }
    const chunk = new Chunk(this.worldName, location);
    this.scene.add(chunk.mesh);
    this.chunks.set(location.toString(), chunk);
  }

  /**
   * チャンクのデータを破棄する。
   * @param location チャンクの位置
   */
  public unloadChunk(location: Location) {
    if (this.chunks.has(location.toString())) {
      const chunk = this.chunks.get(location.toString());
      this.scene.remove(chunk.mesh);
      this.chunks.delete(location.toString());
    }
  }
}
