import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";

export default class MyMap extends PIXI.Sprite {
  constructor(texture?: PIXI.Texture) {
    super(texture);
  }

  public update(replacements: Array<any>) {
    this.filters = [new Filters.MultiColorReplaceFilter(replacements, 0.01)];
  }
}
