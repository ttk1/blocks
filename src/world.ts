import { Chunk } from './chunk';

export class World {
  private worldName: string;
  private loadChunkTasks: Set<string>;
  private chunks: Map<string, Chunk>;
  private textureImages: HTMLImageElement[];

  constructor(worldName: string, textureImages: HTMLImageElement[]) {
    this.worldName = worldName;
    this.loadChunkTasks = new Set();
    this.chunks = new Map<string, Chunk>();
    this.textureImages = textureImages;
  }

  /**
   * チャンクのデータをロードする。
   * 既にロード済みの場合、なにもしない。
   * @param x チャンクのX座標
   * @param z チャンクのZ座標
   */
  public loadChunk(x: number, z: number) {
    if (this.chunks.has(`${x}:${z}`) || this.loadChunkTasks.has(`${x}:${z}`)) {
      return;
    }
    this.loadChunkTasks.add(`${x}:${z}`);
    const dataUrl = `http://localhost:9000/?world_name=${this.worldName}&x=${x}&z=${z}`;
    fetch(dataUrl).then(response => {
      return response.json();
    }).then((data: string[][][]) => {
      if (data.length === 0) {
        console.error('データ取得失敗');
      } else {
        const chunk = new Chunk(x, z, data, this.textureImages);
        this.chunks.set(`${x}:${z}`, chunk);
      }
    }).catch(error => {
      console.error('データ取得失敗', error);
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
      this.chunks.delete(`${x}:${z}`);
    }
  }

  /**
   * 指定された座標のチャンクを返す。
   * ロードされていなければ null を返す。
   * @param x チャンクのX座標
   * @param z チャンクのZ座標
   * @returns チャンク
   */
  public getChunk(x: number, z: number): Chunk {
    if (this.chunks.has(`${x}:${z}`)) {
      return this.chunks.get(`${x}:${z}`);
    } else {
      return null;
    }
  }
}
