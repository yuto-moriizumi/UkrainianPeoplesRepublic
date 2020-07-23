import Country from "./Country";
import GameManager from "./GameManager";
import MainScene from "./Scenes/MainScene";
import Event from "./Events/Event";

export default abstract class CountryHandler {
  country: Country;
  update() {
    this.dispatchEvents();
  }

  public getCountry() {
    return this.country;
  }

  abstract dispatchEvents(): void;

  abstract onEvent(event: Event): void;
}
