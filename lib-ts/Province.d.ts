import Country from "./Country";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";
export default class Province extends JsonObject {
    private id;
    private _owner;
    private x;
    private y;
    constructor(id: string);
    private set owner(value);
    getId(): string;
    getOwner(): Country;
    setOwner(owner: Country): void;
    setCoord(point: PIXI.Point): void;
    getCoord(): PIXI.Point;
    createEntries(): any[][];
    isNextTo(province: Province): boolean;
}
