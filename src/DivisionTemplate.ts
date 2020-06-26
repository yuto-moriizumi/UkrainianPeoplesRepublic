import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import Jsonable from "./Jsonable";
import JsonConverter from "./JsonConverter";
import Division from "./DivisionSprite";
import MainScene from "./Scenes/MainScene";
import DivisionInfo from "./DivisionInfo";

export default class DivisionTemplate {
  private __owner: Country;
  private organization: number = 100;
  private attack: number = 20;
  private speed: number = 10;
  private _divisions: Array<DivisionInfo> = [];

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

  public addDivision(division: DivisionInfo) {
    this._divisions.push(division);
  }

  public removeDivision(division: DivisionInfo) {
    this._divisions = this.divisions.filter((d) => {
      return d != division;
    });
  }

  public getDivisions(): DivisionInfo[] {
    return this._divisions;
  }

  public update() {
    this._divisions.forEach((division) => division.update());
  }

  public createDivisionsSprites() {
    //このテンプレートに所属する全ての師団に対し描画用オブジェクトを生成させる
    this._divisions.forEach((division) => {
      console.log("hi2");
      division.createSprite();
    });
  }

  private set divisions(divisions: Array<any>) {
    this._divisions = divisions.map((division) =>
      Object.assign(new DivisionInfo(this), division)
    );
  }
}
