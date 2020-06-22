import * as PIXI from "pixi.js";
import Province from "./Province";
import { Selectable } from "./Scenes/Selectable";
import Division from "./Division";
export default class MyMap extends PIXI.Sprite {
    static instance: MyMap;
    private static readonly BORDER_COLOR;
    private static readonly BORDER_WIDTH;
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
    setDivisonPosition(sprite: Division): void;
    calculateBarycenterOfAll(): void;
    private getProvince;
    update(): void;
    private moveDivisionsTo;
    isNextTo(province1: Province, province2: Province): boolean;
}
