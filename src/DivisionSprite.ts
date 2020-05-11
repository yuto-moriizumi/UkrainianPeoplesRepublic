import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import DivisionInfo from "./DivisionTemplate";
export default class DivisionSprite extends PIXI.Sprite {
  private info: DivisionInfo;

  constructor(info: DivisionInfo) {
    super(GameManager.instance.game.loader.resources[info.owner.flag].texture);
    this.info = info;
    //this.country = country;
    this.interactive = true;
    this.buttonMode = true;
    this.on("click", this.onClick);
  }

  private onClick() {
    //console.log(this.country.name + "がクリックされた");
  }
}
