import * as PIXI from "pixi.js";
import SelectScene from "./SelectScene";
export default class MyMap extends PIXI.Sprite {
    private provinceMap;
    private scene;
    private replacements;
    constructor(texture?: PIXI.Texture);
    setScene(scene: SelectScene): void;
    setReplacements(replacements: Array<any>): void;
    pushReplacement(replacement: Array<any>): void;
    update(): void;
}
