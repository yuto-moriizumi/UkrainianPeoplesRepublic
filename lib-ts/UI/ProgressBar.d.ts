import * as PIXI from "pixi.js";
export class ProgressBar extends PIXI.Container {
  private bgColor;
  private frontColor;
  private bar;
  constructor(
    width: number,
    height: number,
    bgColor?: number,
    frontColor?: number
  );
  setProgress(progress: number): void;
}
