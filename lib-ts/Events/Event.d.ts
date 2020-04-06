import MainScene from "../MainScene";
import * as PIXI from "pixi.js";
export default class Event extends PIXI.Graphics {
    private id;
    private title;
    private desc;
    private picture;
    private fired;
    private _condition;
    private options;
    dispatch(scene: MainScene, date: Date): void;
    set condition(condition: any);
    toJson(): string;
}
