/// <reference types="pixi.js" />
import { MainScene } from "../MainScene";
export abstract class MyEvent extends PIXI.Graphics {
  private id;
  private title;
  private desc;
  private pictureSrc;
  private options;
  private condition;
  dispatch(scene: MainScene, date: Date): void;
  toJson(): string;
}
