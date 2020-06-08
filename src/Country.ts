import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import JsonObject from "./JsonObject";
import War from "./DiplomaticTies/War";
import DivisionTemplate from "./DivisionTemplate";
import GameManager from "./GameManager";

export default class Country extends JsonObject {
  private __id: string;
  private _color: number;
  public name: string;
  public flag: string;
  private diplomaticTies: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  private divisions: Array<DivisionTemplate> = new Array<DivisionTemplate>();

  constructor(id: string) {
    super();
    this.__id = id;
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
    this.divisions.push(template);
  }

  public getDivisionTemplates() {
    return this.divisions;
  }

  public hasAnyDivisionTemplate() {
    return this.divisions.length > 0;
  }

  public get id() {
    return this.__id;
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
    console.log("own:", provinces.length);
    const province = provinces[Math.floor(Math.random() * provinces.length)];
    console.log("elect", province);

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

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (key === "color") return [key, value.toString(16)];
      return [key, value];
    });
  }

  public update() {
    this.divisions.forEach((division) => division.update());
  }
}
