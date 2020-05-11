import Country from "./Country";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";
export default class Province extends JsonObject {
    id: number;
    owner: Country;
    private x;
    private y;
    constructor(id: string, obj: any);
    setOwner(owner: Country): void;
    setCoord(point: PIXI.Point): void;
    getCoord(): PIXI.Point;
    createEntries(): any[][];
}
