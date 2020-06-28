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
import Access from "./DiplomaticTies/Access";
import DivisionInfo from "./DivisionInfo";

export default class Country implements Jsonable {
  private __id: string;
  private static readonly SEA_ID = "Sea";
  private _color: number;
  public name: string;
  public flag: string;
  private __diplomaticTies: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  private _divisions = new Array<DivisionInfo>();
  private __ai: CountryAI;
  public __money: Money = new Money();

  constructor(id: string) {
    this.__id = id;
    this.__ai = new CountryAI(this);
    this.__money = new Money();
  }

  public addDiplomaticRelation(tie: DiplomaticTie) {
    this.__diplomaticTies.push(tie);
  }

  public removeDiplomaticRelation(tie: DiplomaticTie) {
    this.__diplomaticTies = this.__diplomaticTies.filter((tie2) => {
      return tie !== tie2;
    });
  }

  public getDiplomacy() {
    return this.__diplomaticTies;
  }

  public set color(color: string) {
    this._color = parseInt(color, 16);
  }

  public getColor() {
    return this._color;
  }

  public get id() {
    return this.__id;
  }

  private set divisions(divisions: any) {
    GameManager.instance.data.getTemplates().addListener(() => {
      divisions.forEach((division) => {
        //配列に追加する機能はDivisionInfoにある
        Object.assign(new DivisionInfo(this), division);
      });
    });
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
    return this.__diplomaticTies.find((tie: DiplomaticTie) => {
      if (!(tie instanceof War)) return false;
      const opponent = tie.getOpponent(this);
      if (opponent === country) return true;
      return false;
    });
  }

  public hasWar() {
    return this.__diplomaticTies.some((tie: DiplomaticTie) => {
      if (tie instanceof War) return true;
      return false;
    });
  }

  public calcMaintanance() {
    //維持費を計算
    let ans = 0;
    this._divisions.forEach((division) => (ans += division.getMaintainance()));
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

    this._divisions.forEach((division) => division.update());
    if (
      MainScene.instance.getMyCountry() !== this &&
      MainScene.instance.getMyCountry().__id !== Country.SEA_ID
    )
      this.__ai.update(); //自国以外で海でないならAIを呼び出す
  }

  public getDivisions() {
    return this._divisions;
  }

  public addDivision(division: DivisionInfo) {
    this._divisions.push(division);
  }

  public removeDivision(division: DivisionInfo) {
    this._divisions = this._divisions.filter((d) => d != division);
  }

  private set templates(templates: any) {
    //何もしない
  }

  /**
   * 何らかの理由で国が消滅する場合に呼ぶ
   * オブジェクトが消えるわけではない
   * @memberof Country
   */
  public destroy() {
    this.__diplomaticTies.forEach((diplomacy) => {
      //全ての外交関係を削除
      diplomacy.deactivate();
    });
    this._divisions.forEach((d) => d.destroy());
  }

  /**
   * この国が指定の国に対して軍事通行権を有しているか
   * @param {Country} country
   * @memberof Country
   */
  public hasAccessTo(country: Country) {
    return this.__diplomaticTies.some((d) => {
      return (
        d instanceof Access && d.getRoot() == this && d.getTarget() == country
      );
    });
  }

  public toJSON() {
    return JsonConverter.toJSON(this, (key, value) => {
      if (key === "color") return [key, value.toString(16)];
      return [key, value];
    });
  }
}
