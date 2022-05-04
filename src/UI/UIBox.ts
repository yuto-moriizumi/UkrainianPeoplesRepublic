import * as PIXI from "pixi.js";
export abstract class UIBox extends PIXI.Graphics {
  color = 0x2c2a2b;
  padding = 5;
  fixSize: boolean;

  constructor() {
    //fixSize: boolean = true, color?: number, padding?: number
    super();
    //this.color = color;
    //this.padding = padding;
    //this.fixSize = fixSize;
    //クリック判定が貫通しないようにする
    this.interactive = true;
  }

  public setSize(width: number, height: number) {
    this.beginFill(this.color);
    this.drawRect(0, 0, width, height);
  }

  public abstract addPart(part: PIXI.Container, maxLength?: number): void;
}
