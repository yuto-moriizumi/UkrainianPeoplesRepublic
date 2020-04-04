import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Fade from "./Fade";
import GameManager from "./GameManager";
import LoaderAddParam from "./LoaderAddParam";
import Resource from "./Resources";

import MyMap from "./MyMap";
import Country from "./Country";
import Flag from "./Flag";
import Button from "./Button";

export default class SelectScene extends Scene {
  private myFlag: Flag;
  private static readonly myFlagSize = 150;

  constructor() {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = super.createInitialResourceList();
    assets.push(Resource.Map);
    //jsonデータをロードし、終わったら
    GameManager.instance.data.countries.forEach(country => {
      console.log("hi", country);
      assets.push(country.flagSrc); //全ての国旗をロード
    });
    console.log("loadedAssets:" + assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    const resources = GameManager.instance.game.loader.resources;
    const renderer = GameManager.instance.game.renderer;

    //地図の更新
    const map = new MyMap(resources[Resource.Map].texture);
    map.setScene(this);
    let replacements = [];
    GameManager.instance.data.provinces.forEach(province => {
      //console.log("replace", [province.id, province.owner.color]);
      replacements.push([province.id, province.owner.color]);
    });
    map.setReplacements(replacements);
    map.position.set(renderer.width * 0.1, renderer.height * 0.1);
    this.addChild(map);

    //ダウンロードボタン（暫定）
    const button = new PIXI.Sprite(resources[Resource.Title.Bg].texture);
    button.position.set(renderer.width * 0.8, renderer.height * 0.8);
    button.scale.set(0.2, 0.2);
    button.interactive = true;
    button.buttonMode = true;
    button.on("mousedown", () => {
      GameManager.instance.data.download();
    });
    this.addChild(button);

    //選択ボタン
    const selectButton = new Button("選択");
    this.addChild(selectButton);
    selectButton.position.set(0, 100);
  }

  public select(country?: Country) {
    if (country === null || country === undefined)
      country = GameManager.instance.data.countries["Rebels"];
    if (this.myFlag) this.myFlag.destroy();
    this.myFlag = new Flag(country);
    this.myFlag.scale.set(SelectScene.myFlagSize / this.myFlag.width);
    this.addChild(this.myFlag);
  }

  public update(dt: number) {
    super.update(dt);
  }
}
