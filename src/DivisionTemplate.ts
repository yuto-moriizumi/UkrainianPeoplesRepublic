import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import Jsonable from "./Jsonable";
import JsonConverter from "./JsonConverter";
import Division from "./Division";
import MainScene from "./Scenes/MainScene";

export default class DivisionTemplate implements Jsonable {
  private __owner: Country;
  private organization: number = 100;
  private attack: number = 20;
  private speed: number = 10;
<<<<<<< HEAD
  private _divisions: Array<DivisionInfo> = [];
=======
  private _divisions: Array<Division> = [];
>>>>>>> 6ff35435a4a1fe0bf5470358c2d91d797f9f8937

  constructor(owner: Country) {
    this.__owner = owner;
  }

  public get owner(): Country {
    return this.__owner;
  }

  set divisions(divisions: Array<any>) {
    MainScene.resouceLoadCallbacks.push(() => {
      divisions.map((division) => Object.assign(new Division(this), division));
    });
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

<<<<<<< HEAD
  public addDivision(division: DivisionInfo) {
    this._divisions.push(division);
  }

  public removeDivision(division: DivisionInfo) {
    this._divisions = this.divisions.filter((d) => {
=======
  public addDivision(division: Division) {
    this._divisions.push(division);
  }

  public removeDivision(division: Division) {
    this._divisions = this._divisions.filter((d) => {
>>>>>>> 6ff35435a4a1fe0bf5470358c2d91d797f9f8937
      return d != division;
    });
  }

  public getDivisions(): Division[] {
    return this._divisions;
  }

  public update() {
    this._divisions.forEach((division) => division.update());
  }

<<<<<<< HEAD
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
=======
  toJSON() {
    return JsonConverter.toJSON(this);
>>>>>>> 6ff35435a4a1fe0bf5470358c2d91d797f9f8937
  }
}
