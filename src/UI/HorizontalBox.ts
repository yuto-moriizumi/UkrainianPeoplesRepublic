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

  public addPart(part: PIXI.Container, align = -1) {
    part.scale.set(
      Math.min(part.scale.y, (this.height - this.padding * 2) / part.height)
    );
    switch (align) {
      case 1: //右寄せ
        part.position.set(
          this.width - part.width - this.padding,
          (this.height - part.height) / 2
        );
        break;
      case -1:
      default:
        //左寄せ
        part.position.set(
          Math.max(this.uiWidth, this.padding),
          (this.height - part.height) / 2
        );
        break;
    }

    this.addChild(part);
    this.uiWidth = part.x + part.width;
  }
}
