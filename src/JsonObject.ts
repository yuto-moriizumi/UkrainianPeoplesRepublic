/**
 * JSON出力可能なオブジェクトの親オブジェクトです
 * @export
 * @class JsonObject
 */
export default class JsonObject {
  /**
   * オブジェクトの変数名と値がセットになった配列を生成します
   * JSONから読み込み時にはObject.assign()を利用します
   * _で始まる変数は、json出力時に_が外れます
   * __で始まる変数は、jsonに出力されません
   * 非プリミティブ型メンバを持つクラスは、適切なクラスのインスタンスを生成するsetterを用意しなければなりません
   * @returns [オブジェクトの変数名,値]の配列
   * @memberof JsonObject
   */
  public createEntries() {
    return Object.entries(this).map(([key, value]) => {
      if (key.startsWith("__")) return null;
      if (key.startsWith("_")) key = key.substr(1);
      if (value instanceof Map) return (value = Object.fromEntries(value));
      return [key, value];
    });
  }
  /**
   * JSON文字列のベースになるobjectを生成します
   * Json.stringify()で利用します
   * @returns {object}
   * @memberof JsonObject
   */
  public toJSON(): object {
    return Object.fromEntries(this.createEntries());
  }
}
