import * as PIXI from "pixi.js";
import { Selectable } from "./Scenes/Selectable";
import DivisionSprite from "./DivisionSprite";
export default class MyMap extends PIXI.Sprite {
    private provinceMap;
    private scene;
    private replacements;
    private defaultWidth;
    private defaultHeight;
    private pressKeys;
    constructor(scene: Selectable, texture?: PIXI.Texture);
    setReplacements(replacements: Array<any>): void;
    pushReplacement(replacement: Array<any>): void;
    private getProvinceIdFromPoint;
    private getClickedProvince;
    move(): void;
    /**
     * 指定した座標を含むプロヴィンスの重心座標を返します
     *
     * @private
     * @param {PIXI.Point} point
     * @returns
     * @memberof MyMap
     */
    private getBarycenter;
    setDivisonPosition(sprite: DivisionSprite): void;
    calculateBarycenterOfAll(): void;
    private getProvince;
    update(): void;
    private moveDivisionsTo;
}
