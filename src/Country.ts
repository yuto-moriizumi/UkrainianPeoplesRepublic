import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import JsonObject from "./JsonObject";
import War from "./DiplomaticTies/War";
import DivisionTemplate from "./DivisionTemplate";
import GameManager from "./GameManager";
import Jsonable from "./Jsonable";
import JsonConverter from "./JsonConverter";
import CountryAI from "./CountryAI";
import MainScene from "./Scenes/MainScene";
import Money from "./Money";

export default class Country implements Jsonable {
  private __id: string;
  private static readonly SEA_ID = "Sea";
  private _color: number;
  public name: string;
  public flag: string;
  private diplomaticTies: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  private _templates: Array<DivisionTemplate> = new Array<DivisionTemplate>();
  private ai: CountryAI;
  public __money: Money = new Money();

  constructor(id: string) {
    this.__id = id;
    this.ai = new CountryAI(this);
    this.__money = new Money();
  }

  public addDiplomaticRelation(tie: DiplomaticTie) {
    this.diplomaticTies.push(tie);
  }

  public removeDiplomaticRelation(tie: DiplomaticTie) {
    this.diplomaticTies = this.diplomaticTies.filter((tie2) => {
      return tie !== tie2;
    });
  }

  public getDiplomacy() {
    return this.diplomaticTies;
  }

  public set color(color: string) {
    this._color = parseInt(color, 16);
  }

  public getColor() {
    return this._color;
  }

  public addDivisionTemplate(template: DivisionTemplate) {
    this._templates.push(template);
  }

  public getDivisionTemplates() {
    return this._templates;
  }

  public hasAnyDivisionTemplate() {
    return this._templates.length > 0;
  }

  public get id() {
    return this.__id;
  }

  private set divisions(divisions) {
    this._templates = divisions.map((division) =>
      Object.assign(new DivisionTemplate(this), division)
    );
  }

  /**
   * 所有しているプロヴィンスのうち、ランダムに1つを選ぶ
   *
   * @returns
   * @memberof Country
   */
  public getRandomOwnProvince() {
    const provinces = [];
    GameManager.instance.data.getProvinces().forEach((province) => {
      if (province.getOwner() == this) provinces.push(province);
    });
    const province = provinces[Math.floor(Math.random() * provinces.length)];

    return province;
  }

  public getWarInfoWith(country: Country): War {
    return this.diplomaticTies.find((tie: DiplomaticTie) => {
      if (!(tie instanceof War)) return false;
      const opponent = tie.getOpponent(this);
      if (opponent === country) return true;
      return false;
    });
  }

  public hasWar() {
    return this.diplomaticTies.some((tie: DiplomaticTie) => {
      if (tie instanceof War) return true;
      return false;
    });
  }

  public calcMaintanance() {
    //維持費を計算
    let ans = 0;
    this._templates.forEach(
      (template) => (ans += template.calcTotalMaintanance())
    );
    return ans;
  }

  public calcBalance() {
    const provinces = [];
    GameManager.instance.data.getProvinces().forEach((province) => {
      if (province.getOwner() == this) provinces.push(province); //保有プロヴィンスの数だけ収入UP
    });
    return 1 + provinces.length - this.calcMaintanance();
  }

  public update() {
    //金を更新
    this.__money.setMoney(this.__money.getMoney() + this.calcBalance());

    this._templates.forEach((division) => division.update());
    if (
      MainScene.instance.getMyCountry() !== this &&
      MainScene.instance.getMyCountry().__id !== Country.SEA_ID
    )
      this.ai.update(); //自国以外で海でないならAIを呼び出す
  }

  /**
   * 何らかの理由で国が消滅する場合に呼ぶ
   * オブジェクトが消えるわけではない
   * @memberof Country
   */
  public destroy() {
    this.diplomaticTies.forEach((diplomacy) => {
      //全ての外交関係を削除
      diplomacy.deactivate();
    });
    this._templates.forEach((template) => template.deleteChildren()); //全ての師団を削除
  }

  toJSON() {
    return JsonConverter.toJSON(this, (key, value) => {
      if (key === "color") return [key, value.toString(16)];
      return [key, value];
    });
  }
}
