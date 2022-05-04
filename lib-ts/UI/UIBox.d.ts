import * as PIXI from "pixi.js";
export abstract class UIBox extends PIXI.Graphics {
  color: number;
  padding: number;
  fixSize: boolean;
  constructor();
  setSize(width: number, height: number): void;
  abstract addPart(part: PIXI.Container, maxLength?: number): void;
}
