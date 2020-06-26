import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";
import MainScene from "./Scenes/MainScene";
import MyMap from "./MyMap";
import DivisionInfo from "./DivisionInfo";

export default class Province extends JsonObject {
  private id: string;
  private _owner: Country;
  private x: number = 0;
  private y: number = 0;
  private __divisions: Array<DivisionInfo> = new Array<DivisionInfo>();

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
      previousOwner.getDiplomacy().forEach((diplomacy) => {
        diplomacy.deactivate();
      });
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
}
