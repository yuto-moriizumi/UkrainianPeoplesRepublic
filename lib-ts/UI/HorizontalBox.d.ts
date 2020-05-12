import * as PIXI from "pixi.js";
import UIBox from "./UIBox";
export default class HorizontalBox extends UIBox {
    private uiWidth;
    constructor(width: number, height: number, padding?: number, color?: number);
    addPart(part: PIXI.Container): void;
}
