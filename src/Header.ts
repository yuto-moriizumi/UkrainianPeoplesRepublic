import * as PIXI from "pixi.js";
import Country from "./Country";
import Flag from "./Flag";
import GameManager from "./GameManager";
export default class Header extends PIXI.Graphics {
  private static readonly BG_COLOR = 0x2c2a2b;
  public static readonly DEFAULT_HEIGHT = 100;
  private myCountry: Country;

  constructor(myCountry: Country) {
    super();
    this.myCountry = myCountry;

    const renderer = GameManager.instance.game.renderer;
    this.beginFill(Header.BG_COLOR);
    this.drawRect(0, 0, renderer.width, Header.DEFAULT_HEIGHT);

    const myFlag = new Flag(this.myCountry);
    myFlag.scale.set(Header.DEFAULT_HEIGHT / myFlag.height);
    this.addChild(myFlag);

    //クリック判定が貫通しないようにする
    this.interactive = true;
  }
}
