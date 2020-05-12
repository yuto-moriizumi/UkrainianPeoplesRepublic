import * as PIXI from "pixi.js";
import UIBox from "./UIBox";
export default class VerticalBox extends UIBox {
    uiHeight: number;
    constructor(width: number, height: number, padding?: number, color?: number);
    addPart(part: PIXI.Container): void;
}
