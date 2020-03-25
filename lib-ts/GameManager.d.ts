import * as PIXI from "pixi.js";
import Scene from "./Scene";
import DataManager from "./DataManager";
export default class GameManager {
    static instance: GameManager;
    game: PIXI.Application;
    private sceneTransitionOutFinished;
    private currentScene?;
    private sceneResourceLoaded;
    data: DataManager;
    constructor(app: PIXI.Application);
    static start(params: {
        glWidth: number;
        glHeight: number;
        backgroundColor: number;
    }): void;
    static transitionInIfPossible(newScene: Scene): boolean;
    static loadScene(newScene: Scene): void;
}
