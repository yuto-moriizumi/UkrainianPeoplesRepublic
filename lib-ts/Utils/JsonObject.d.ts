import JsonType from "./JsonType";
/**
 * JSON出力可能なオブジェクトの親オブジェクトです
 * @export
 * @class JsonObject
 */
export abstract class JsonObject {
  /**
   * JSON文字列のベースになるobjectを生成します
   * Json.stringify()で利用します
   * @returns {object}
   * @memberof JsonObject
   */
  replacer(key: string, value: any, type: JsonType): any[];
  toJsonObject(type: JsonType): object;
}
