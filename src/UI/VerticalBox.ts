import * as PIXI from "pixi.js";
import UIBox from "./UIBox";
export default class VerticalBox extends UIBox {
  uiHeight = 0;

  constructor(
    width: number,
    height: number,
    padding: number = 5,
    color: number = 0x2c2a2b
  ) {
    super();
    this.color = color;
    this.setSize(width, height);
    this.padding = padding;
  }

  public addPart(part: PIXI.Container) {
    part.position.set(this.padding, Math.max(this.uiHeight, this.padding));
    part.scale.set((this.width - this.padding * 2) / part.width);
    this.addChild(part);
    this.uiHeight = part.y + part.height;
  }
}
