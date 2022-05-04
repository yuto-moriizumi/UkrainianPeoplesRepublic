import * as PIXI from "pixi.js";
export class Button extends PIXI.Graphics {
  private static readonly color1;
  private static readonly color2;
  private text;
  constructor(text: string, width?: number, height?: number);
  setText(text: string): void;
}
