import HorizontalBox from "./HorizontalBox";
import GameManager from "../GameManager";
import Resource from "../Resources";
import * as PIXI from "pixi.js";
import MainScene from "../Scenes/MainScene";
import MoneyObserver from "../MoneyObserver";

export default class MoneyWatcher extends HorizontalBox
  implements MoneyObserver {
  private moneyText: PIXI.Text;

  constructor() {
    super(100, 50, 0, 0xffffff);

    const moneyIcon = new PIXI.Sprite(
      GameManager.instance.game.loader.resources[Resource.money].texture
    );

    this.addPart(moneyIcon);

    this.moneyText = new PIXI.Text(
      MainScene.instance.getMyCountry().__money.getMoney().toString()
    );
    this.addPart(this.moneyText);

    MainScene.instance.getMyCountry().__money.addObserver(this);
  }

  public destroy() {
    MainScene.instance.getMyCountry().__money.removeObserver(this);
    super.destroy();
  }

  public onMoneyChange(amount: number) {
    this.moneyText.text = amount.toString();
  }
}
