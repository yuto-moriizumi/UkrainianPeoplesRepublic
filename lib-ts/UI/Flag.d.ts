import * as PIXI from "pixi.js";
import { Country } from "../Country";
export class Flag extends PIXI.Sprite {
  private country;
  constructor(country: Country);
  private onClick;
}
