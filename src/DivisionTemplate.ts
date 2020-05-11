import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionInfo from "./DivisionInfo";

export default class DivisionTemplate extends JsonObject {
  private __owner: Country;
  private organization: number;
  private attack: number;
  private divisions: Array<DivisionInfo> = [];

  public get owner(): Country {
    return this.__owner;
  }
}
