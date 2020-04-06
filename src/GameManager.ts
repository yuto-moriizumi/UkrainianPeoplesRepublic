import * as PIXI from "pixi.js";
import Scene from "./Scene";
import SoundManager from "./SoundManager";
import DataManager from "./DataManager";

export default class GameManager {
  public static instance: GameManager;
  public game!: PIXI.Application;
  private sceneTransitionOutFinished: boolean = true;
  private currentScene?: Scene;
  private sceneResourceLoaded: boolean = true;
  public data: DataManager = new DataManager();

  constructor(app: PIXI.Application) {
    if (GameManager.instance) {
      throw new Error("GameManager can be instantiate only once");
    }
    this.game = app;
  }

  public static start(params: {
    glWidth: number;
    glHeight: number;
    backgroundColor: number;
  }): void {
    /*const game = new GOWN.Application(
      {},
      GOWN.Application.SCREEN_MODE_RESIZE,
      "center"
    );*/
    const game = new PIXI.Application({
      width: params.glWidth,
      height: params.glHeight,
      backgroundColor: params.backgroundColor,
    });
    //PIXI.ApplicationインスタンスのloaderプロパティにbaseUrlを設定
    game.loader.baseUrl = "assets/";
    GameManager.instance = new GameManager(game);
    document.body.appendChild(game.view);
    game.ticker.add((delta: number) => {
      if (this.instance.currentScene) {
        this.instance.currentScene.update(delta);
      }
    });

    //右クリックのデフォ動作を力技で止める
    document.body.addEventListener(
      "contextmenu",
      function (ev) {
        ev.preventDefault();
        return false;
      },
      false
    );

    SoundManager.init();
  }

  //可能であれば新しいシーンへのトランジションを開始する
  public static transitionInIfPossible(newScene: Scene): boolean {
    const instance = GameManager.instance;
    if (!instance.sceneTransitionOutFinished || !instance.sceneResourceLoaded) {
      //リソースロードとトランジション終了のどちらかが未完了ならトランジションを開始しない
      return false;
    }
    if (instance.currentScene) {
      instance.currentScene.destroy();
    }
    instance.currentScene = newScene;
    if (instance.game) {
      instance.game.stage.addChild(newScene);
    }
    newScene.beginTransitionIn((_: Scene) => {});
    return true;
  }

  //シーンをロードする
  //新しいシーンのリソース読み込みと、古いシーンのトランジションを同時に開始する
  //いずれも完了したら、新しいシーンのトランジションを開始する
  public static loadScene(newScene: Scene): void {
    const instance = GameManager.instance;
    if (instance.currentScene) {
      //現在のシーンがセットされているなら
      instance.sceneResourceLoaded = false;
      instance.sceneTransitionOutFinished = false;
      newScene.beginLoadResource(() => {
        instance.sceneResourceLoaded = true;
        GameManager.transitionInIfPossible(newScene);
      });
      instance.currentScene.beginTransitionOut((_: Scene) => {
        instance.sceneTransitionOutFinished = true;
        GameManager.transitionInIfPossible(newScene);
      });
    } else {
      instance.sceneTransitionOutFinished = true;
      newScene.beginLoadResource(() => {
        instance.sceneResourceLoaded = true;
        GameManager.transitionInIfPossible(newScene);
      });
    }
  }
}
