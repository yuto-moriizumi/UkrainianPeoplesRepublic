import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import Jsonable from "./Jsonable";
import JsonConverter from "./JsonConverter";
import Division from "Division";

export default class DivisionTemplate implements Jsonable {
  private __owner: Country;
  private organization: number = 100;
  private attack: number = 20;
  private speed: number = 10;
  private divisions: Array<Division> = [];

  constructor(owner: Country) {
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

  public addDivision(division: Division) {
    this.divisions.push(division);
  }

  public removeDivision(division: Division) {
    this.divisions = this.divisions.filter((d) => {
      return d != division;
    });
  }

  public update() {
    this.divisions.forEach((division) => division.update());
  }

  toJSON() {
    return JsonConverter.toJSON(this);
  }
}
