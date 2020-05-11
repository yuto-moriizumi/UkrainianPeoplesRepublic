import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";

export default class Province extends JsonObject {
  public id: number;
  public owner: Country;
  private x: number = 0;
  private y: number = 0;

  constructor(id: string, obj: any) {
    super();
    this.id = parseInt(id, 16);
    this.owner = GameManager.instance.data.countries.get(obj.owner);
    //console.log("try", obj.Owner, this.owner);
  }

  public setOwner(owner: Country) {
    this.owner = owner;
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
}
