import ExtendedSet from "../Utils/ExtendedSet";
import DivisionInfo from "./DivisionInfo";
import * as PIXI from "pixi.js";
export default class DivisionStacker extends PIXI.Container {
    private static readonly GAP;
    private divisions;
    private sprites;
    constructor();
    addDivison(division: DivisionInfo): void;
    removeDivision(division: DivisionInfo): void;
    showSprite(division: DivisionInfo): void;
    getDivisions(): ExtendedSet<DivisionInfo>;
    private addSprite;
    private removeSprite;
    private repositionStack;
}
