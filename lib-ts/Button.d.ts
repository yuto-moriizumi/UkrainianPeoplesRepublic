import * as PIXI from "pixi.js";
export default class Button extends PIXI.Graphics {
    private static readonly color1;
    private static readonly color2;
    private text;
    constructor(text: string, width?: any, height?: any);
    setText(text: string): void;
}
