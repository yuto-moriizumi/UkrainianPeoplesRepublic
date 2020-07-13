import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Fade from "./Fade";
import GameManager from "../GameManager";
import LoaderAddParam from "../Utils/LoaderAddParam";
import Resource from "../Resources";
import SelectScene from "./SelectScene";
import VerticalBox from "../UI/VerticalBox";
import Button from "../UI/Button";
import MultiScene from "./MultiScene";

export default class MenuScene extends Scene {
  constructor() {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = super.createInitialResourceList();
    //console.log(assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();

    const menuBox = new VerticalBox(100, 100);
    const single = new Button("シングルプレイ");
    single.on("click", () => GameManager.loadScene(new SelectScene()));
    menuBox.addPart(single);
    const multi = new Button("マルチプレイ");
    multi.on("click", () => GameManager.loadScene(new MultiScene()));
    menuBox.addPart(multi);

    this.addChild(menuBox);
    
  }

  public update(dt: number) {
    super.update(dt);
  }
}
