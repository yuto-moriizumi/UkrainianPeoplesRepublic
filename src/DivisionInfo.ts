import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";

export default class DivisionInfo extends JsonObject {
  private __template: DivisionTemplate;
  private _position: Province;
  private organization: number;

  public set position(provinceId: string) {
    this._position = GameManager.instance.data.provinces.get(provinceId);
  }

  public get owner() {
    return this.__template.owner;
  }

  /*
  public set template(provinceId: string) {
    this._position = GameManager.instance.data.provinces.get(provinceId);
  }*/
}
