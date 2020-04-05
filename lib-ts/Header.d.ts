import * as PIXI from "pixi.js";
import Country from "./Country";
export default class Header extends PIXI.Graphics {
    private static readonly BG_COLOR;
    static readonly DEFAULT_HEIGHT = 100;
    private myCountry;
    constructor(myCountry: Country);
}
