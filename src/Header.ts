import * as PIXI from "pixi.js";
export default class Header extends PIXI.Graphics {
  private readonly BG_COLOR = 0x2c2a2b;
  private readonly DEFAULT_HEIGHT = 100;
  constructor() {
    super();
    this.beginFill(this.BG_COLOR);
    this.drawRect(0, 0, 100, this.DEFAULT_HEIGHT);
  }
}
