import * as PIXI from "pixi.js";
import Country from "../Country/Country";
export default class Flag extends PIXI.Sprite {
    private country;
    constructor(country: Country);
    private onClick;
}
