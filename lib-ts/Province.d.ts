import Country from "./Country";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";
import DivisionInfo from "./DivisionInfo";
export default class Province extends JsonObject {
    private id;
    private _owner;
    private x;
    private y;
    private __divisions;
    constructor(id: string);
    private set owner(value);
    getId(): string;
    getOwner(): Country;
    setOwner(owner: Country): void;
    setCoord(point: PIXI.Point): void;
    getCoord(): PIXI.Point;
    addDivision(division: DivisionInfo): void;
    removeDivision(division: DivisionInfo): void;
    getDivisons(): DivisionInfo[];
    createEntries(): any[][];
    isNextTo(province: Province): boolean;
    /**
     * このプロヴィンスに対して指定の国が通行権を有しているか
     * @param {Country} country
     * @returns
     * @memberof Province
     */
    hasAccess(country: Country): boolean;
}
