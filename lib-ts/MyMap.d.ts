import * as PIXI from "pixi.js";
import { Selectable } from "./Selectable";
export default class MyMap extends PIXI.Sprite {
    private provinceMap;
    private scene;
    private replacements;
    private defaultWidth;
    private pressKeys;
    constructor(scene: Selectable, texture?: PIXI.Texture);
    setReplacements(replacements: Array<any>): void;
    pushReplacement(replacement: Array<any>): void;
    private getProvinceIdFromPoint;
    private selectClickedProvince;
    move(): void;
    update(): void;
}
