import { HorizontalBox } from "./HorizontalBox";
import { GameManager } from "../GameManager";
import Resource from "../Resources";
import * as PIXI from "pixi.js";
import { MainScene } from "../Scenes/MainScene";
import { MoneyObserver } from "../MoneyObserver";
import { Country } from "../Country";

export class MoneyWatcher extends HorizontalBox implements MoneyObserver {
  private moneyText: PIXI.Text;
  private target: Country;

  constructor() {
    super(100, 50, 0, 0xffffff);

    const moneyIcon = new PIXI.Sprite(
      GameManager.instance.game.loader.resources[Resource.money].texture
    );

    this.addPart(moneyIcon);

    this.target = MainScene.instance.getMyCountry();

    this.moneyText = new PIXI.Text(this.target.__money.getMoney().toString());
    this.addPart(this.moneyText);

    this.target.__money.addObserver(this);
  }

  public update() {
    this.target.__money.removeObserver(this);
    this.target = MainScene.instance.getMyCountry();
    this.moneyText.text = this.target.__money.getMoney().toString();
    this.target.__money.addObserver(this);
  }

  public destroy() {
    this.target.__money.removeObserver(this);
    super.destroy();
  }

  public onMoneyChange(amount: number) {
    this.moneyText.text = amount.toString();
  }
}
