import * as PIXI from "pixi.js";
import CombineScene from "./CombineScene";
import Country from "./Country";
export default class Flag extends PIXI.Sprite {
    flagFirstX: number;
    flagFirstY: number;
    scene: CombineScene;
    static maxHeight: number;
    country: Country;
    constructor(country: Country, texture?: PIXI.Texture);
    setScale(): void;
    setOriginalPos(x: number, y: number): void;
    setDraggable(boolean: boolean, id: number): void;
    onFlagClicked(e: PIXI.interaction.InteractionEvent, id: number): void;
    private onFlagMove;
    private onFlagUp;
}
