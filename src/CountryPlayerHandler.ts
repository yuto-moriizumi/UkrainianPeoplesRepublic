import Country from "./Country";
import War from "./DiplomaticTies/War";
import Atlas from "./Map/Atlas";
import GameManager from "./GameManager";
import CountryHandler from "./CountryHandler";

export default class CountryPlayerHandler extends CountryHandler {
  country: Country;

  constructor(country: Country) {
    super();
    this.country = country;
  }

  public update() {}
}
