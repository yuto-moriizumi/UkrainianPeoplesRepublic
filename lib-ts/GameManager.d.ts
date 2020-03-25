import * as PIXI from "pixi.js";
import Scene from "./Scene";
export default class GameManager {
    static instance: GameManager;
    game: PIXI.Application;
    private sceneTransitionOutFinished;
    private currentScene?;
    private sceneResourceLoaded;
    constructor(app: PIXI.Application);
    static start(params: {
        glWidth: number;
        glHeight: number;
        backgroundColor: number;
    }): void;
    static transitionInIfPossible(newScene: Scene): boolean;
    static loadScene(newScene: Scene): void;
}
