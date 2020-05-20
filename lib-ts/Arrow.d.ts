import * as PIXI from "pixi.js";
import Province from "./Province";
export default class Arrow extends PIXI.Graphics {
    static readonly TRIANGLE_HEIGHT = 10;
    static readonly RECT_WIDTH = 5;
    private color;
    length: number;
    constructor(from: Province, to: Province);
    private createTriangle;
}
