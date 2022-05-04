import * as PIXI from "pixi.js";
import { Country } from "./Country";
import { GameManager } from "./GameManager";
import { JsonObject } from "./Utils/JsonObject";
import { Province } from "./Province";
import { DivisionInfo } from "./DivisionInfo";

export class DivisionTemplate extends JsonObject {
  private __id: string;
  private organization: number = 100;
  private attack: number = 20;
  private speed: number = 10;
  private cost: number = 50;
  private maintenance: number = 1;
  private aiProductionRate: number;
  private recoveryPerTime = 20;

  constructor(id) {
    super();
    this.__id = id;
  }

  public getId(): string {
    return this.__id;
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

  public getAiProductionRate() {
    return this.aiProductionRate;
  }

  public getCost() {
    return this.cost;
  }

  public getMaintainance() {
    return this.maintenance;
  }

  public getRecoveryPerTime() {
    return this.recoveryPerTime;
  }

  /**
   * 師団を生産します
   * 生産コストがかかります
   * @returns
   * @memberof DivisionTemplate
   */
  public buildDivision(country: Country) {
    if (country.__money.getMoney() < this.cost) return null; //金が足りない場合は作れない
    const divisionInfo = new DivisionInfo(country);
    divisionInfo.setTemplate(this);
    divisionInfo.applyCost();
    divisionInfo.createSprite();
    divisionInfo.setPosition(country.getRandomOwnProvince()); //ランダムなプロビヴィンスに出現させる}
    return divisionInfo;
  }
}
