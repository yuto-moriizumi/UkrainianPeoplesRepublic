import * as PIXI from "pixi.js";
import Country from "../Country";
import Flag from "../Flag";
import GameManager from "../GameManager";
import HorizontalBox from "./HorizontalBox";
import SpriteButton from "./SpriteButton";
import Resource from "../Resources";
import MainScene from "../Scenes/MainScene";
import Button from "./Button";
import Timer from "./Timer";
import Money from "./Money";
export default class Header extends HorizontalBox {
  public static readonly DEFAULT_HEIGHT = 100;
  private myCountry: Country;
  private timer: Timer;
  private myFlag: Flag;
  private moneyString: Money;

  constructor(myCountry: Country) {
    const renderer = GameManager.instance.game.renderer;
    super(renderer.width, Header.DEFAULT_HEIGHT, 0);

    this.myCountry = myCountry;
    this.myFlag = new Flag(this.myCountry);
    this.addPart(this.myFlag);

    const resources = GameManager.instance.game.loader.resources;
    //徴兵ボタン
    const conscription = new SpriteButton(
      resources[Resource.conscription].texture
    );
    conscription.on("click", () => {
      MainScene.instance.openConscription();
    });
    this.addPart(conscription);

    //デバッグボタン
    const debugButton = new Button("デ");
    debugButton.on("click", () => {
      MainScene.instance.openDebug();
    });
    this.addPart(debugButton);

    //資金表示
    this.moneyString = new Money();
    this.addPart(this.moneyString);

    //時間コントローラ
    this.timer = new Timer();
    this.timer.position.set(
      this.width - this.timer.width - 15,
      this.height * 0.5 - this.timer.height * 0.5
    );
    this.addChild(this.timer);
  }

  public getTimer(): Timer {
    return this.timer;
  }

  public setPlayCountry(country: Country) {
    this.myCountry = country;
    const newFlag = new Flag(country);
    this.replacePart(this.myFlag, newFlag);
    this.myFlag = newFlag;
  }

  public update() {
    this.moneyString.update();
  }
}
