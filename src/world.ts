import THREE = require('three');
import { Chunk } from './chunk';

export class World {
  public scene: THREE.Scene;
  private worldName: string;
  private chunks: Map<string, Chunk>;

  constructor(worldName: string) {
    this.worldName = worldName;
    this.chunks = new Map<string, Chunk>();
    this.scene = new THREE.Scene();

    // ライトの設定
    // 一旦ここに置いておく
    const light1 = new THREE.DirectionalLight(0xffffff);
    light1.position.set(100, 200, 300);
    this.scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-300, -200, -100);
    this.scene.add(light2);
  }

  /**
   * チャンクのデータをロードする。既にロード済みの場合、データを上書きする。
   * @param x チャンクのX座標
   * @param z チャンクのZ座標
   */
  public loadChunk(x: number, z: number) {
    this.unloadChunk(x, z);
    const chunk = new Chunk(this.worldName, x, z);
    this.scene.add(...chunk.meshes);
    this.chunks.set(`${x}:${z}`, chunk);
  }

  /**
   * チャンクのデータを破棄する。
   * @param x チャンクのX座標
   * @param z チャンクのZ座標
   */
  public unloadChunk(x: number, z: number) {
    if (this.chunks.has(`${x}:${z}`)) {
      const chunk = this.chunks.get(`${x}:${z}`);
      this.scene.remove(...chunk.meshes);
      this.chunks.delete(`${x}:${z}`);
    }
  }
}
