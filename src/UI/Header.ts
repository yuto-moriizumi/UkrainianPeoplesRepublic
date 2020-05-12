import * as PIXI from "pixi.js";
import Country from "../Country";
import Flag from "../Flag";
import GameManager from "../GameManager";
import HorizontalBox from "./HorizontalBox";
import SpriteButton from "./SpriteButton";
import Resource from "../Resources";
import MainScene from "../Scenes/MainScene";
export default class Header extends HorizontalBox {
  public static readonly DEFAULT_HEIGHT = 100;
  private myCountry: Country;

  constructor(myCountry: Country) {
    const renderer = GameManager.instance.game.renderer;
    super(renderer.width, Header.DEFAULT_HEIGHT, 0);

    this.myCountry = myCountry;
    const myFlag = new Flag(this.myCountry);
    this.addPart(myFlag);

    const resources = GameManager.instance.game.loader.resources;
    //徴兵ボタン
    const conscription = new SpriteButton(
      resources[Resource.conscription].texture
    );
    conscription.on("click", () => {
      MainScene.instance.openConscription();
    });
    this.addPart(conscription);
  }
}
