import * as PIXI from "pixi.js";

export class ProgressBar extends PIXI.Container {
  private bgColor: number;
  private frontColor: number;
  private bar: PIXI.Graphics;
  constructor(
    width: number,
    height: number,
    bgColor = 0x286b1e,
    frontColor?: number
  ) {
    super();
    this.bgColor = bgColor;
    const background = new PIXI.Graphics();
    background.beginFill(bgColor);
    background.drawRect(0, 0, width, height);
    this.addChild(background);

    //フロントカラーを決める
    if (frontColor) {
      this.frontColor = frontColor;
      return;
    }
    const rgb = PIXI.utils.hex2rgb(this.bgColor);
    this.frontColor = PIXI.utils.rgb2hex([
      (rgb[0] + 2) / 3,
      (rgb[1] + 2) / 3,
      (rgb[2] + 2) / 3,
    ]);
  }

  public setProgress(progress: number) {
    if (progress < 0 || 1 < progress)
      console.error("範囲外の割合値が入力された", this);
    if (this.bar) this.bar.destroy();
    this.bar = new PIXI.Graphics();
    this.bar.beginFill(this.frontColor);
    this.bar.drawRect(0, 0, this.width * progress, this.height);
    this.addChild(this.bar);
  }
}
