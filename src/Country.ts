import DiplomaticTie from "./DiplomaticTie";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";

export default class Country extends JsonObject {
  public id: string;
  private _color: number;
  public name: string;
  public flag: string;
  private diplomaticTies: Array<DiplomaticTie> = new Array<DiplomaticTie>();

  public addDiplomaticRelation(tie: DiplomaticTie) {
    this.diplomaticTies.push(tie);
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

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (key === "color") return [key, value.toString(16)];
      return [key, value];
    });
  }
}
