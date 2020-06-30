import * as PIXI from "pixi.js";
import Province from "../Province";
import { Selectable } from "../Scenes/Selectable";
import DivisionSprite from "../DivisionSprite";
import ExtendedSet from "../Utils/ExtendedSet";
import MapMode from "./MapMode";
import MapModeObserver from "./MapModeObserver";
export default class Atlas extends PIXI.Sprite implements MapModeObserver {
    static instance: Atlas;
    private static readonly BORDER_COLOR;
    private static readonly BORDER_WIDTH;
    private provinceMap;
    private scene;
    private defaultWidth;
    private defaultHeight;
    private pressKeys;
    private mode;
    constructor(scene: Selectable, texture?: PIXI.Texture);
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
    onMapModeUpdated(filter: any): void;
    private moveDivisionsTo;
    getNeighborProvinces(province: Province): ExtendedSet<Province>;
    isNextTo(province1: Province, province2: Province): boolean;
    setMode(mode: MapMode): void;
}
