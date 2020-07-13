import Arrow from "./Arrow";
import Province from "../Province";
import * as PIXI from "pixi.js";

export default class ArrowProgress extends Arrow {
  private progress = 0; //これは0～100%
  private static readonly RECT_WIDTH = 5;

  constructor(from: Province, to: Province, color?: number) {
    super(from, to, 5, color);
    const toPoint = to.getCoord();
    const fromPoint = from.getCoord();
    this.rotation = Math.atan2(
      toPoint.y - fromPoint.y,
      toPoint.x - fromPoint.x
    );
    this.position.set(fromPoint.x, fromPoint.y);
  }

  public setProgress(progress: number) {
    this.progress = progress;
    const rgb = PIXI.utils.hex2rgb(this.color);
    this.beginFill(
      PIXI.utils.rgb2hex([(rgb[0] + 2) / 3, (rgb[1] + 2) / 3, (rgb[2] + 2) / 3])
    ); //ベース色の明るい色で塗る
    this.drawRect(
      0,
      (Arrow.TRIANGLE_HEIGHT - ArrowProgress.RECT_WIDTH) / 2,
      (this.length * progress) / 100,
      ArrowProgress.RECT_WIDTH
    );
    this.endFill();
  }
}
