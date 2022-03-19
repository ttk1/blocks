import * as MVP from '@ttk1/webgl2_mvp';
import { Chunk } from './chunk';

export class World {
  public scene: MVP.Scene;
  private worldName: string;
  private loadChunkTasks: Set<string>;
  private chunks: Map<string, Chunk>;
  private textureImages: HTMLImageElement[];

  constructor(worldName: string, textureImages: HTMLImageElement[]) {
    this.scene = new MVP.Scene();
    this.worldName = worldName;
    this.loadChunkTasks = new Set();
    this.chunks = new Map<string, Chunk>();
    this.textureImages = textureImages;

    // ライトの設定
    // 一旦ここに置いておく
    this.scene.addLight(new MVP.Light(1, 2, 3));
    this.scene.addLight(new MVP.Light(-1, -2, -3));
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
        const chunk = new Chunk(x, z, data, this.textureImages);
        this.scene.addMesh(chunk.mesh);
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
      this.scene.removeMesh(chunk.mesh);
      this.chunks.delete(`${x}:${z}`);
    }
  }
}
