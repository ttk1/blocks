import * as THREE from 'three';
import { Chunk } from './chunk';

export class World {
  public scene: THREE.Scene;
  private worldName: string;
  private loadChunkTasks: Set<string>;
  private chunks: Map<string, Chunk>;

  constructor(worldName: string) {
    this.scene = new THREE.Scene();
    this.worldName = worldName;
    this.loadChunkTasks = new Set();
    this.chunks = new Map<string, Chunk>();

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
   * チャンクのデータをロードする。既にロード済みの場合、なにもしない。
   * @param x チャンクのX座標
   * @param z チャンクのZ座標
   */
  public loadChunk(x: number, z: number) {
    if (this.chunks.has(`${x}:${z}`) || this.loadChunkTasks.has(`${x}:${z}`)) {
      return;
    }
    this.loadChunkTasks.add(`${x}:${z}`);
    const dataUrl = `http://localhost:9000/?world_name=${this.worldName}&x=${x}&z=${z}`;
    fetch(dataUrl).then((response) => {
      return response.json();
    }).then((data: string[][][]) => {
      if (data.length === 0) {
        console.log('データ取得失敗');
      } else {
        const chunk = new Chunk(x, z, data);
        this.scene.add(chunk.mesh);
        this.chunks.set(`${x}:${z}`, chunk);
      }
    }).finally(() => {
      this.loadChunkTasks.delete(`${x}:${z}`);
    });
  }

  /**
   * チャンクのデータを破棄する。
   * @param x チャンクのX座標
   * @param z チャンクのZ座標
   */
  public unloadChunk(x: number, z: number) {
    if (this.chunks.has(`${x}:${z}`)) {
      const chunk = this.chunks.get(`${x}:${z}`);
      this.scene.remove(chunk.mesh);
      this.chunks.delete(`${x}:${z}`);
    }
  }
}
