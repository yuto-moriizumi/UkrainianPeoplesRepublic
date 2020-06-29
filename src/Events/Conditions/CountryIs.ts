import Condition from "./Condition";
import DateAdapter from "../../DateAdapter";
import Country from "../../Country";
import GameManager from "../../GameManager";

export default class CountryIs extends Condition {
  private type = this.constructor.name;
  private _country: Country;

  public isValid(country: Country, date: Date): boolean {
    return this._country == country;
  }

  private set country(countryId: string) {
    this._country = GameManager.instance.data.getCountry(countryId);
  }

  public toJSON() {
    return Object.fromEntries(
      Object.entries(this).map(([key, value]) => {
        if (key.startsWith("__")) return [];
        if (key.startsWith("_")) key = key.substr(1);
        if (value instanceof Country) value = value.id;
        return [key, value];
      })
    );
  }
}
