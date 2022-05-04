import * as PIXI from "pixi.js";
import { UIBox } from "./UIBox";
export class HorizontalBox extends UIBox {
  private uiWidth;
  constructor(width: number, height: number, padding?: number, color?: number);
  addPart(part: PIXI.Container, align?: number): void;
  replacePart(before: PIXI.Container, after: PIXI.Container): void;
}
