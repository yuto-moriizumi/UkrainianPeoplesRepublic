/**
 * オブジェクトをJSONに変換するためのユーティリティクラス
 * _で始まる変数は、json出力時に_が外れます 非ピリミティブメンバに利用して下さい
 * 非プリミティブ型メンバを持つクラスは、適切なクラスのインスタンスを生成するsetterを用意しなければなりません
 * __で始まる変数は、jsonに出力されません セーブデータに表現が不要な場合に利用して下さい
 * @export
 * @class JsonConverter
 */
export class JsonConverter {
  static toJSON(
    object: any,
    replacer?: (key: any, value: any) => Array<any>
  ): any;
}
