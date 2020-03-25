import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Fade from "./Fade";
import GameManager from "./GameManager";
import LoaderAddParam from "./LoaderAddParam";
import Resource from "./Resources";

export default class SelectScene extends Scene {
  constructor() {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = super.createInitialResourceList();
    const staticResource = Resource.Static;
    //assets.push(staticResource.Audio.Bgm.Title);
    // assets.push(staticResource.Title.Bg);
    console.log(assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    const resources = GameManager.instance.game.loader.resources;
    const renderer = GameManager.instance.game.renderer;

    //背景
    const sprite = new PIXI.Sprite(resources[Resource.Static.Title.Bg].texture);
    sprite.width = renderer.width;
    sprite.height = renderer.height;
    this.addChild(sprite);
  }

  private onPointerDown() {
    //次のシーン
    //GameManager.loadScene();
  }

  public update(dt: number) {
    super.update(dt);
  }
}
