import FromJson from "./FromJson";
import Jsonable from "./Jsonable";
/**
 * JSON出力可能なオブジェクトの親オブジェクトです
 * @export
 * @class JsonObject
 */
export default abstract class JsonObject implements Jsonable, FromJson {
    /**
     * オブジェクトの変数名と値がセットになった配列を生成します
     * JSONから読み込み時にはObject.assign()を利用します
     * _で始まる変数は、json出力時に_が外れます
     * __で始まる変数は、jsonに出力されません
     * 非プリミティブ型メンバを持つクラスは、適切なクラスのインスタンスを生成するsetterを用意しなければなりません
     * @returns [オブジェクトの変数名,値]の配列
     * @memberof JsonObject
     */
    createEntries(): any[][];
    /**
     * JSON文字列のベースになるobjectを生成します
     * Json.stringify()で利用します
     * @returns {object}
     * @memberof JsonObject
     */
    toJSON(): object;
    fromJson(obj: object): this;
}
