import * as PIXI from "pixi.js";
import UIBox from "./UIBox";
export default class HorizontalBox extends UIBox {
  private uiWidth: number = 0;

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
    part.position.set(Math.max(this.uiWidth, this.padding), this.padding);
    part.scale.set((this.height - this.padding * 2) / part.height);
    this.addChild(part);
    this.uiWidth = part.x + part.width;
  }
}
