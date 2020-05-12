import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
import DivisionSprite from "./DivisionSprite";
import MainScene from "./Scenes/MainScene";

export default class DivisionInfo extends JsonObject {
  private __template: DivisionTemplate;
  private _position: Province;
  private organization: number;
  private __sprite: DivisionSprite;

  constructor(template: DivisionTemplate) {
    super();
    this.__template = template;
    this.__sprite = new DivisionSprite(this);
  }

  public set position(provinceId: string) {
    this.setPosition(GameManager.instance.data.provinces.get(provinceId));
  }

  public setPosition(province: Province) {
    this._position = province;
    MainScene.instance.getMap().spawnDivison(this.__sprite);
  }

  public getPosition() {
    return this._position;
  }

  public get owner() {
    return this.__template.owner;
  }

  /*
  public set template(provinceId: string) {
    this._position = GameManager.instance.data.provinces.get(provinceId);
  }*/
}
