import Country from "./Country";
import CountryHandler from "./CountryHandler";
import GameManager from "./GameManager";
import MainScene from "./Scenes/MainScene";
import Event from "./Events/Event";

export default class CountryPlayerHandler extends CountryHandler {
  country: Country;

  constructor(country: Country) {
    super();
    this.country = country;
  }

  dispatchEvents() {
    //イベント発火処理
    GameManager.instance.data.getEvents().forEach((event: Event) => {
      event.dispatch(this, MainScene.instance.getDate());
    });
  }

  onEvent(event: Event) {
    event.showDialog();
  }

  public update() {
    this.dispatchEvents();
  }
}
