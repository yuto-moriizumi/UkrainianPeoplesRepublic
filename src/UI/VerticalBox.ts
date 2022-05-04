import * as PIXI from "pixi.js";
import { UIBox } from "./UIBox";
export class VerticalBox extends UIBox {
  private uiHeight = 0;

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

  /**
   * 子要素が
   * @param {PIXI.Container} part
   * @memberof VerticalBox
   */
  public addPart(part: PIXI.Container) {
    part.scale.set(
      Math.min(part.scale.x, (this.width - this.padding * 2) / part.width)
    );
    part.position.set(
      (this.width - part.width) / 2,
      Math.max(this.uiHeight, this.padding)
    );
    this.addChild(part);
    this.uiHeight = part.y + part.height;
  }

  public getUiHeight(): number {
    return this.uiHeight;
  }
}
