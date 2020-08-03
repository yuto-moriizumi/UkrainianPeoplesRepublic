import Condition from "./Condition";
import Country from "../../Country/Country";
import JsonType from "../../Utils/JsonType";
/**
 * イベント発火者が指定した国であることを確認します
 * 同時に、国が存在している（領土を1つ以上持っている）ことを確認します
 * @export
 * @class CountryIs
 * @extends {Condition}
 */
export default class CountryIs extends Condition {
    private _country;
    isValid(country: Country, date: Date): boolean;
    private set country(value);
    replacer(key: string, value: any, type: JsonType): any[];
}
