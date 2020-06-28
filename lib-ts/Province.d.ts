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
    private _culture;
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
     * このプロヴィンスに対して指定の国が進入可能か
     * @param {Country} country
     * @returns
     * @memberof Province
     */
    hasAccess(country: Country): true | import("./DiplomaticTies/War").default;
    private set culture(value);
    setCulture(culture: string): void;
    getCulture(): string;
}
