import * as PIXI from "pixi.js";
import UIBox from "./UIBox";
export default class VerticalBox extends UIBox {
    private uiHeight;
    constructor(width: number, height: number, padding?: number, color?: number);
    /**
     * 子要素が
     * @param {PIXI.Container} part
     * @memberof VerticalBox
     */
    addPart(part: PIXI.Container): void;
    getUiHeight(): number;
}
