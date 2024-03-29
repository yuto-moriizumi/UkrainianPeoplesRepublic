import * as PIXI from "pixi.js";
import { Scene } from "./Scene";
import { Fade } from "./Fade";
import { GameManager } from "../GameManager";
import { LoaderAddParam } from "../Utils/LoaderAddParam";
import Resource from "../Resources";
import { SelectScene } from "./SelectScene";

export class TitleScene extends Scene {
  private text!: PIXI.Text;
  private readonly textAppealDuration: number = 150;

  constructor() {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = super.createInitialResourceList();
    //assets.push(staticResource.Audio.Bgm.Title);
    assets.push(Resource.Title.Bg);
    assets.push(Resource.gamedata);
    assets.push(Resource.savedata);
    //console.log(assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    const resources = GameManager.instance.game.loader.resources;
    const renderer = GameManager.instance.game.renderer;

    //背景
    const sprite = new PIXI.Sprite(resources[Resource.Title.Bg].texture);
    sprite.width = renderer.width;
    sprite.height = renderer.height;
    this.addChild(sprite);

    const text = new PIXI.Text(
      "ウクライナ人民共和国ゲーム",
      new PIXI.TextStyle({
        fontFamily: "MisakiGothic",
        fontSize: 80,
        fill: 0xffffff,
        padding: 12,
        dropShadow: true,
      })
    );
    text.anchor.set(0.5, 0.5);
    text.position.set(renderer.width * 0.5, renderer.height * 0.4);
    this.addChild(text);

    this.text = new PIXI.Text(
      "TOUCH TO START",
      new PIXI.TextStyle({
        fontFamily: "MisakiGothic",
        fontSize: 64,
        fill: 0xffffff,
        padding: 12,
      })
    );
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.6);
    this.addChild(this.text);
    this.interactive = true;
    this.buttonMode = true;
    this.on("pointerdown", () => this.onPointerDown());

    //セーブデータ読み込み
    GameManager.instance.data.load(resources[Resource.gamedata].data);
    GameManager.instance.data.load(resources[Resource.savedata].data);
  }

  private onPointerDown() {
    //次のシーン
    GameManager.loadScene(new SelectScene());
  }

  public update(dt: number) {
    super.update(dt);
    if (this.elapsedFrameCount % this.textAppealDuration === 0)
      this.text.visible = !this.text.visible;
  }
}
