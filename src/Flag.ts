import * as PIXI from "pixi.js";
import { Country } from "./Country";
import { GameManager } from "./GameManager";
export class Flag extends PIXI.Sprite {
  private country: Country;
  constructor(country: Country) {
    super(GameManager.instance.game.loader.resources[country.flag].texture);
    this.country = country;
    this.interactive = true;
    this.buttonMode = true;
    this.on("click", this.onClick);
  }

  private onClick() {
    console.log(this.country.name + "がクリックされた");
  }
}
