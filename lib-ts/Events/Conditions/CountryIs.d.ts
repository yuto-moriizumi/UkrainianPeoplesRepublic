import Condition from "./Condition";
import Country from "../../Country";
import JsonType from "../../Utils/JsonType";
export default class CountryIs extends Condition {
    private _country;
    isValid(country: Country, date: Date): boolean;
    private set country(value);
    replacer(key: string, value: any, type: JsonType): any[];
}
