import Country from "./Country";
import JsonObject from "./Utils/JsonObject";
import * as PIXI from "pixi.js";
import DivisionInfo from "./DivisionInfo";
import Observable from "./Observable";
import ProvinceObserver from "ProvinceObserver";
export default class Province extends JsonObject implements Observable {
    private id;
    private _owner;
    private x;
    private y;
    private __divisions;
    private _culture;
    private __observers;
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
    addObserver(observer: ProvinceObserver): void;
    removeObserver(observer: ProvinceObserver): void;
}
