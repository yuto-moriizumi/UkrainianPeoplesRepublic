import * as PIXI from "pixi.js";
import Province from "../Province";
export default class Arrow extends PIXI.Graphics {
    static readonly TRIANGLE_HEIGHT = 10;
    length: number;
    width: number;
    color: number;
    constructor(from: Province, to: Province, width?: number, color?: number);
    private createTriangle;
}
