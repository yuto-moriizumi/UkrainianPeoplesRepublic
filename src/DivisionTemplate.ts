import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionInfo from "./DivisionInfo";

export default class DivisionTemplate extends JsonObject {
  private __owner: Country;
  private organization: number = 100;
  private attack: number = 20;
  private speed: number = 10;
  private cost: number = 10;
  private maintenance: number = 1;
  private _divisions: Array<DivisionInfo> = [];

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
    this._divisions.push(division);
  }

  public removeDivision(division: DivisionInfo) {
    this._divisions = this._divisions.filter((d) => {
      return d != division;
    });
  }

  public getDivisions() {
    return this._divisions;
  }

  public update() {
    this._divisions.forEach((division) => division.update());
  }

  public createDivisionsSprites() {
    //このテンプレートに所属する全ての師団に対し描画用オブジェクトを生成させる
    this._divisions.forEach((division) => {
      division.createSprite();
    });
  }

  public getCost() {
    return this.cost;
  }

  public calcTotalMaintanance() {
    //維持コスト計算
    return this._divisions.length * this.maintenance;
  }

  public deleteChildren() {
    this._divisions.forEach((division) => [division.destroy()]);
    this._divisions = [];
  }

  /**
   * 師団を生産します
   * 生産コストがかかります
   * @returns
   * @memberof DivisionTemplate
   */
  public buildDivision() {
    if (this.__owner.__money.getMoney() < this.cost) return null; //金が足りない場合は作れない
    const divisionInfo = new DivisionInfo(this);
    this.addDivision(divisionInfo);
    divisionInfo.applyCost();
    divisionInfo.createSprite();
    divisionInfo.setPosition(this.owner.getRandomOwnProvince()); //ランダムなプロビヴィンスに出現させる}
    return divisionInfo;
  }
  private set divisions(divisions: Array<any>) {
    this._divisions = divisions.map((division) =>
      Object.assign(new DivisionInfo(this), division)
    );
  }
}
