import { ExtendedSet } from "./Utils/ExtendedSet";
import { DivisionInfo } from "./DivisionInfo";
import * as PIXI from "pixi.js";
import { DivisionSprite } from "DivisionSprite";

export class DivisionStacker extends PIXI.Container {
  private static readonly GAP = 2;
  private divisions = new ExtendedSet<DivisionInfo>();
  private sprites = new ExtendedSet<DivisionSprite>();
  constructor() {
    super();
  }
  public addDivison(division: DivisionInfo) {
    this.divisions.add(division);
    if (division.getSprite() !== undefined)
      this.addSprite(division.getSprite());
  }
  public removeDivision(division: DivisionInfo) {
    this.divisions.delete(division);
    if (division.getSprite() !== undefined)
      this.removeSprite(division.getSprite());
  }
  public showSprite(division: DivisionInfo) {
    if (this.divisions.has(division)) this.addSprite(division.getSprite());
  }

  public getDivisions() {
    return this.divisions;
  }

  private addSprite(sprite: DivisionSprite) {
    this.sprites.add(sprite);
    this.addChild(sprite);
    this.repositionStack();
  }

  private removeSprite(sprite: DivisionSprite) {
    this.sprites.delete(sprite);
    this.removeChild(sprite);
    this.repositionStack();
  }

  private repositionStack() {
    if (this.sprites.size == 0) return;
    //一度中央に揃える
    let count = 0;
    this.sprites.forEach((sprite) => {
      sprite.position.set(
        count * DivisionStacker.GAP,
        -count * DivisionStacker.GAP
      );
      count++;
    });
  }
}
