import JsonObject from "./JsonObject";

/**
 * データロードの順番が重要になる場合に使用します
 * 関数を登録しますので、要求されるまえにこのオブジェクトを生成しておき、
 * このインスタンスが格納された変数を書き換えない様にしてください
 * @export
 * @abstract
 * @class DataManager
 * @extends {JsonObject}
 */
export default abstract class DataManager extends JsonObject {
  onLoaded = new Array<any>();
  _isLoaded = false;
  ON_CREATED = console.info("DataManagerがインスタンス化されました");

  public isLoaded(): boolean {
    return this._isLoaded;
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
  public endLoad(test?: string) {
    this._isLoaded = true;
    while (this.onLoaded.length > 0) {
      this.onLoaded.shift()();
    }
  }
}
