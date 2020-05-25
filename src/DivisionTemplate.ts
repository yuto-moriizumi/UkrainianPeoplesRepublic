import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionInfo from "./DivisionInfo";

export default class DivisionTemplate extends JsonObject {
  private __owner: Country;
  private organization: number = 100;
  private attack: number = 10;
  private speed: number = 10;
  private divisions: Array<DivisionInfo> = [];

  constructor(owner: Country) {
    super();
    this.__owner = owner;
  }

  public get owner(): Country {
    return this.__owner;
  }

  public getSpeed() {
    return this.speed;
  }

  public getAttack() {
    return this.attack;
  }

  public getOrganization() {
    return this.organization;
  }

  public addDivision(division: DivisionInfo) {
    this.divisions.push(division);
  }

  public update() {
    this.divisions.forEach((division) => division.update());
  }
}
