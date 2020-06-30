import Country from "./Country";
import * as PIXI from "pixi.js";
import DivisionInfo from "./DivisionInfo";
import JsonObject from "./Utils/JsonObject";
import Observable from "./Observable";
import ProvinceObserver from "./ProvinceObserver";
import CultureObserver from "./CultureObserve";
import JsonType from "./Utils/JsonType";
import ExtendedSet from "./Utils/ExtendedSet";
export default class Province extends JsonObject implements Observable {
    private __id;
    private _owner;
    private x;
    private y;
    private __divisions;
    private _culture;
    private __observers;
    private __cultureObservers;
    private _neighbours;
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
    addCultureObserver(observer: CultureObserver): void;
    removeCultureObserver(observer: CultureObserver): void;
    set neighbours(neighbours: string[] | ExtendedSet<Province>);
    getNeighbours(): ExtendedSet<string>;
    replacer(key: string, value: any, type: JsonType): any[];
}
