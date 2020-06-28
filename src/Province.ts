import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";
import MainScene from "./Scenes/MainScene";
import MyMap from "./MyMap";
import DivisionInfo from "./DivisionInfo";
import FromJson from "./FromJson";

export default class Province extends JsonObject implements FromJson {
  private id: string;
  private _owner = new Country();
  private x: number = 0;
  private y: number = 0;
  private __divisions = new Array<DivisionInfo>();

  constructor(id: string) {
    super();
    if (id.substr(0, 1) != "#") this.id = "#" + id;
    //#ついてないやつにつける data.json更新後削除
    else this.id = id;
  }

  private set owner(countryId: string) {
    this._owner = GameManager.instance.data.getCountry(countryId);
  }

  public getId(): string {
    return this.id;
  }

  public getOwner() {
    return this._owner;
  }

  public setOwner(owner: Country) {
    const previousOwner = this._owner;
    this._owner = owner;
    MyMap.instance.update();

    //降伏判定
    const provinces = [];
    GameManager.instance.data.getProvinces().forEach((province) => {
      if (province.getOwner() == previousOwner) provinces.push(province);
    });
    if (provinces.length == 0) {
      //降伏
      previousOwner.destroy();
    }
  }

  public setCoord(point: PIXI.Point) {
    this.x = point.x;
    this.y = point.y;
  }

  public getCoord(): PIXI.Point {
    return new PIXI.Point(this.x, this.y);
  }

  public addDivision(division: DivisionInfo) {
    this.__divisions.push(division);
  }

  public removeDivision(division: DivisionInfo) {
    this.__divisions = this.__divisions.filter((division2) => {
      return division != division2;
    });
  }

  public getDivisons() {
    return this.__divisions;
  }

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (value instanceof Country) return [key, value.id];
      if (key === "id") return [];
      return [key, value];
    });
  }

  public isNextTo(province: Province): boolean {
    const ans = MainScene.instance.getMap().isNextTo(this, province);
    //console.log(this, province, ans);
    return ans;
  }

  /**
   * このプロヴィンスに対して指定の国が進入可能か
   * @param {Country} country
   * @returns
   * @memberof Province
   */
  public hasAccess(country: Country) {
    return (
      this._owner == country ||
      country.hasAccessTo(this._owner) || //軍事通行権があるか
      country.getWarInfoWith(this._owner) //戦争中か
    );
  }

  public fromJson(obj: object) {
    Object.entries(this).forEach(([key, value]) => {
      if (value instanceof Country) {
        this[key] = GameManager.instance.data.getCountry(obj[key.substr(1)]);

        if (value == undefined || value == null) {
          console.log(this, obj[key.substr(1)]);
          throw new Error("COUNTRY NOT FOUND");
        }
        return;
      }
      if (obj[key]) this[key] = obj[key];
    });
    return this;
  }
}
