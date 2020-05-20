import Arrow from "./Arrow";
import Province from "./Province";

export default class ArrowProgress extends Arrow {
  private progress = 0; //0～100%

  constructor(from: Province, to: Province) {
    super(from, to);
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
    this.beginFill(0xffff7f);
    this.drawRect(
      0,
      (Arrow.TRIANGLE_HEIGHT - Arrow.RECT_WIDTH) / 2,
      (this.length * progress) / 100,
      Arrow.RECT_WIDTH
    );
    this.endFill();
  }
}
