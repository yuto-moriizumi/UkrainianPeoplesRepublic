import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
import Province from "./Province";
export default class Arrow extends PIXI.Graphics {
  static readonly TRIANGLE_HEIGHT = 10;
  length = 0;
  width: number;
  color: number;

  constructor(from: Province, to: Province, width = 5, color = 0xff0000) {
    super();

    this.width = width;
    this.color = color;

    const point1 = from.getCoord();
    const point2 = to.getCoord();
    this.length = Math.max(
      1,
      ((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2) ** 0.5 -
        Arrow.TRIANGLE_HEIGHT
    );

    const triangle = this.createTriangle();
    triangle.angle = -90;
    this.addChild(triangle);

    this.beginFill(color, 1);
    this.drawRect(0, (Arrow.TRIANGLE_HEIGHT - width) / 2, this.length, width);
    this.endFill();

    triangle.position.set(this.length, Arrow.TRIANGLE_HEIGHT);

    //this.filters = [new Filters.OutlineFilter(0.1, 0, 1)];
  }
  private createTriangle() {
    const triangle = new PIXI.Graphics();

    const triangleWidth = Arrow.TRIANGLE_HEIGHT,
      triangleHeight = triangleWidth,
      triangleHalfway = triangleWidth / 2;

    // draw triangle
    triangle.beginFill(this.color, 1);
    triangle.lineStyle(0, this.color, 1);
    triangle.moveTo(triangleWidth, 0);
    triangle.lineTo(triangleHalfway, triangleHeight);
    triangle.lineTo(0, 0);
    triangle.lineTo(triangleHalfway, 0);
    triangle.endFill();

    return triangle;
  }
}
