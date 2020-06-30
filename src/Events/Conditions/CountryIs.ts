import Condition from "./Condition";
import DateAdapter from "../../DateAdapter";
import Country from "../../Country";
import GameManager from "../../GameManager";
import JsonType from "../../Utils/JsonType";

export default class CountryIs extends Condition {
  private _country: Country;

  public isValid(country: Country, date: Date): boolean {
    return this._country == country;
  }

  private set country(countryId: string) {
    this._country = GameManager.instance.data.getCountry(countryId);
  }

  replacer(key: string, value: any, type: JsonType) {
    if (value instanceof Country) value = value.id;
    return [key, value];
  }
}
