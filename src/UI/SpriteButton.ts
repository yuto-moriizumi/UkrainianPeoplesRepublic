import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
export class SpriteButton extends PIXI.Sprite {
  constructor(texture?: PIXI.Texture) {
    super(texture);

    this.interactive = true;
    this.buttonMode = true;
    this.on("mouseover", () => {
      this.filters = [new Filters.AdvancedBloomFilter()];
    });
    this.on("mouseout", () => {
      this.filters = [];
    });
  }
}
