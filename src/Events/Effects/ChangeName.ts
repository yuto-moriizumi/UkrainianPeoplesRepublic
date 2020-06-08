import Effect from "./Effect";
import Country from "../../Country";
import GameManager from "../../GameManager";
import MainScene from "../../Scenes/MainScene";

export default class ChangeName extends Effect {
  private type = this.constructor.name;
  private _country: Country;
  private name: string;

  public activate() {
    this._country.name = this.name;
  }

  set country(countryId: string) {
    this._country = GameManager.instance.data.getCountry(countryId);
  }

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (value instanceof Country) return [key, value.id];
      return [key, value];
    });
  }
}
