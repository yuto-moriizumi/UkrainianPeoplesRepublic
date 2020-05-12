import * as PIXI from "pixi.js";
export default class Timer extends PIXI.Container {
    private text;
    private date;
    private isActive;
    private updateDuration;
    private progress;
    private readonly BUTTON_SIZE;
    private readonly WIDTH;
    private readonly PROGRESS_HEIGHT;
    constructor();
    update(elapsedFrameCount: number): void;
    faster(): void;
    slower(): void;
    private playSE;
    getDate(): Date;
    private drawProgress;
}
