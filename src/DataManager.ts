import JsonObject from "./Utils/JsonObject";
import JsonType from "./Utils/JsonType";

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
  __onLoaded = new Array<any>();
  __isLoaded = false;
  __ON_CREATED = console.info("DataManagerがインスタンス化されました");

  public isLoaded(): boolean {
    return this.__isLoaded;
  }

  public addListener(func: any) {
    if (this.__isLoaded) {
      func();
      return;
    }
    this.__onLoaded.push(func);
  }

  /**
   * 保留していた関数を実行します
   * データのロードが終わったときに必ず呼び出してください
   * @memberof MapDataManager
   */
  public endLoad(test?: string) {
    this.__isLoaded = true;
    while (this.__onLoaded.length > 0) {
      this.__onLoaded.shift()();
    }
  }
}
