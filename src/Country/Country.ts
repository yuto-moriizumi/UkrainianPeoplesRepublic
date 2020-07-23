import DiplomaticTie from "../DiplomaticTies/DiplomaticTie";
import JsonObject from "../Utils/JsonObject";
import War from "../DiplomaticTies/War";
import DivisionTemplate from "../DivisionTemplate";
import GameManager from "../GameManager";
import JsonConverter from "../Utils/JsonConverter";
import CountryAI from "./CountryAIHandler";
import MainScene from "../Scenes/MainScene";
import Money from "./Money";
import Access from "../DiplomaticTies/Access";
import DivisionInfo from "../DivisionInfo";
import Leader from "./Leader";
import CountryHandler from "./CountryHandler";
import Event from "../Events/Event";
import Util from "../Utils/Util";
import JsonType from "../Utils/JsonType";
import Observable from "Observable";
import DiplomacyObserver from "../DiplomacyObserver";
import Alliance from "../DiplomaticTies/Alliance";

export default class Country extends JsonObject implements Observable {
  private __id: string;
  private static readonly SEA_ID = "Sea";
  private _color: number;
  public name: string;
  public flag: string;
  private _culture: string = "DEFAULT_CULTURE";
  private __diplomaticTies: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  private _divisions = new Array<DivisionInfo>();
  private __handler: CountryHandler;
  public __money: Money = new Money();
  private _leaders = new Map<string, Leader>();
  private _leader: Leader;
  private __observers = new Array<DiplomacyObserver>();

  constructor(id: string) {
    super();
    this.__id = id;
    this.__handler = new CountryAI(this);
    this.__money = new Money();
  }

  public addDiplomaticRelation(tie: DiplomaticTie) {
    this.__diplomaticTies.push(tie);
    this.__observers.forEach((o) => o.onDiplomacyChange(tie, true));
  }

  public removeDiplomaticRelation(tie: DiplomaticTie) {
    this.__diplomaticTies = this.__diplomaticTies.filter((tie2) => {
      return tie !== tie2;
    });
    this.__observers.forEach((o) => o.onDiplomacyChange(tie, false));
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
    const province = provinces[Util.getRandomInt(0, provinces.length - 1)];

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

  /**
   * 時間単位の利益を計算します
   * @returns
   * @memberof Country
   */
  public calcBalance() {
    let balance = 0;
    GameManager.instance.data.getProvinces().forEach((province) => {
      if (province.getOwner() == this) {
        balance += 1; //領土につき1
        if (province.getCulture() == province.getOwner().getCulture())
          balance += 1; //自国と同じ文化ならさらに+1
      }
    });
    return balance - this.calcMaintanance();
  }

  public update() {
    //金を更新
    this.__money.setMoney(this.__money.getMoney() + this.calcBalance());

    this._divisions.forEach((division) => division.update());
    if (this.__id !== Country.SEA_ID) this.__handler.update(); //海でないならAIを呼び出す
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

  /**
   * 何らかの理由で国が消滅する場合に呼ぶ
   * オブジェクトが消えるわけではない
   * @memberof Country
   */
  public destroy() {
    this.__diplomaticTies.forEach((diplomacy) => {
      //全ての外交関係を削除
      this.__observers.forEach((o) => o.onDiplomacyChange(diplomacy, false));
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

  private set culture(culture: string) {
    const cultures = GameManager.instance.data.getCultures();
    cultures.addListener(() => {
      if (!cultures.has(culture))
        throw new Error("文化は見つかりませんでした:" + culture);
      this._culture = culture;
    });
  }

  public getCulture(): string {
    return this._culture;
  }

  private set leaders(leaders: object) {
    if (Object.keys(leaders).length == 0) {
      //リーダーデータが無い場合
      this._leaders.set(Leader.DEFAULT_NAME, Object.assign(new Leader()));
    }
    for (const name in leaders) {
      leaders[name]["name"] = name;
      this._leaders.set(name, Object.assign(new Leader(), leaders[name]));
    }
  }

  private set leader(leader: string) {
    if (!this._leaders.has(leader))
      throw new Error("Leader not found:" + leader);
    this._leader = this._leaders.get(leader);
  }

  public getLeaders() {
    return this._leaders;
  }

  public getLeader() {
    return this._leader;
  }

  public setHandler(handler: CountryHandler) {
    this.__handler = handler;
  }

  public onEvent(event: Event) {
    this.__handler.onEvent(event);
  }

  public addObserver(observer: DiplomacyObserver) {
    this.__observers.push(observer);
  }

  public removeObserver(observer: DiplomacyObserver) {
    this.__observers = this.__observers.filter((o) => {
      o != observer;
    });
  }

  /**
   * この国が引数の国と同盟しているか
   * @param {Country} target
   * @returns
   * @memberof Country
   */
  public alliesWith(target: Country) {
    return this.__diplomaticTies.some(
      (d) => d instanceof Alliance && d.getOpponent(this) == target
    );
  }

  replacer(key: string, value: any, type: JsonType) {
    switch (type) {
      case JsonType.GameData:
        if (key === "leader" || key === "divisions") return []; //除外リスト
        if (key === "color") return [key, value.toString(16)];
        return [key, value];
      case JsonType.SaveData:
        if (
          key === "culture" ||
          key === "color" ||
          key === "flag" ||
          key === "leaders"
        )
          return []; //除外リスト
        if (key === "leader") return [key, value.getName()];
        return [key, value];
      default:
        throw new Error("Invalid type:" + type);
    }
  }
}
