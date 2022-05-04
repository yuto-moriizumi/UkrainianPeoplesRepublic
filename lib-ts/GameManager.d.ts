import * as PIXI from "pixi.js";
import { Scene } from "./Scenes/Scene";
import { Savedata } from "./Savedata";
export class GameManager {
  static instance: GameManager;
  game: PIXI.Application;
  private sceneTransitionOutFinished;
  private currentScene?;
  private sceneResourceLoaded;
  data: Savedata;
  constructor(app: PIXI.Application);
  static start(params: {
    glWidth: number;
    glHeight: number;
    backgroundColor: number;
  }): void;
  static transitionInIfPossible(newScene: Scene): boolean;
  static loadScene(newScene: Scene): void;
}
