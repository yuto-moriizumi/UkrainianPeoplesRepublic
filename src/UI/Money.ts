import HorizontalBox from "./HorizontalBox";
import GameManager from "../GameManager";
import Resource from "../Resources";
import * as PIXI from "pixi.js";

export default class Money extends HorizontalBox {
  private money: number = 0;
  private moneyText: PIXI.Text;

  constructor() {
    super(100, 50, 0, 0xffffff);

    const moneyIcon = new PIXI.Sprite(
      GameManager.instance.game.loader.resources[Resource.money].texture
    );

    this.addPart(moneyIcon);

    this.moneyText = new PIXI.Text(this.money.toString());
    this.addPart(this.moneyText);
  }

  public update() {
    this.money++;

    this.moneyText.text = this.money.toString();
  }
}
