import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import JsonObject from "./JsonObject";
import War from "./DiplomaticTies/War";
import DivisionTemplate from "./DivisionTemplate";

export default class Country extends JsonObject {
  public id: string;
  private _color: number;
  public name: string;
  public flag: string;
  private diplomaticTies: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  private divisions: Array<DivisionTemplate> = new Array<DivisionTemplate>();

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

  public hasWarWith(country: Country): boolean {
    return (
      this.diplomaticTies.find((tie: DiplomaticTie) => {
        if (!(tie instanceof War)) return false;
        const opponent = tie.getOpponent(this);
        if (opponent === country) return true;
        return false;
      }) !== undefined
    );
  }

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (key === "color") return [key, value.toString(16)];
      return [key, value];
    });
  }
}
