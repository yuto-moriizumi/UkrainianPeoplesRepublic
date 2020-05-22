import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";
import MainScene from "./Scenes/MainScene";
import MyMap from "MyMap";

export default class Province extends JsonObject {
  public id: number;
  private _owner: Country;
  private x: number = 0;
  private y: number = 0;

  constructor(id: string) {
    super();
    this.id = parseInt(id, 16);
    //
    //console.log("try", obj.Owner, this.owner);
  }

  private set owner(countryId: string) {
    this._owner = GameManager.instance.data.countries.get(countryId);
  }

  private get owner(): string {
    return "test";
  }

  public getOwner() {
    return this._owner;
  }

  public setOwner(owner: Country) {
    this._owner = owner;
    MainScene.instance.getMap().update();
  }

  public setCoord(point: PIXI.Point) {
    this.x = point.x;
    this.y = point.y;
  }

  public getCoord(): PIXI.Point {
    return new PIXI.Point(this.x, this.y);
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
