import Country from "./Country";
import * as PIXI from "pixi.js";
import Jsonable from "./Jsonable";
import Division from "Division";
export default class Province implements Jsonable {
    private __id;
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
    addDivision(division: Division): void;
    removeDivision(division: Division): void;
    getDivisons(): Division[];
    isNextTo(province: Province): boolean;
    toJSON(): any;
}
