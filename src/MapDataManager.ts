import Jsonable from "./Jsonable";
import JsonConverter from "./JsonConverter";

/**
 * Mapの拡張クラスです
 * データロードの順番が重要になる場合に使用します
 * @export
 * @class MapDataManager
 * @template T
 * @template U
 */
export default class MapDataManager<T, U> implements Jsonable {
  private map = new Map<T, U>();
  private onLoaded = new Array<any>();
  private _isLoaded = false;

  public isLoaded(): boolean {
    return this._isLoaded;
  }

  public set(id: T, item: U) {
    return this.map.set(id, item);
  }

  public safeGet(id: T, onload: (item: U) => void) {
    if (this._isLoaded) onload(this.map.get(id));
    this.onLoaded.push(() => {
      onload(this.map.get(id));
    });
  }

  /**
   * 値を返します
   * ロードが確実に完了している場合にのみ使用して下さい
   * @param {T} id
   * @returns
   * @memberof MapDataManager
   */
  public get(id: T) {
    if (!this._isLoaded) throw new Error("ロード完了前にgetが呼び出されました");
    return this.map.get(id);
  }

  public forEach(callback: (item: U) => void) {
    if (!this._isLoaded)
      throw new Error("ロード完了前にforeachが呼び出されました");
    this.map.forEach(callback);
  }

  public addListener(func: any) {
    if (this._isLoaded) {
      func();
      return;
    }
    this.onLoaded.push(func);
  }

  /**
   * 保留していた関数を実行します
   * データのロードが終わったときに必ず呼び出してください
   * @memberof MapDataManager
   */
  public endLoad() {
    this._isLoaded = true;
    while (this.onLoaded.length > 0) this.onLoaded.shift()();
  }

  public toJSON() {
    return JsonConverter.toJSON(this.map);
  }
}
