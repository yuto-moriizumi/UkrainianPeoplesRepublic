import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Fade from "./Fade";
import GameManager from "./GameManager";
import LoaderAddParam from "./LoaderAddParam";
import Resource from "./Resources";

import MyMap from "./MyMap";
import Country from "./Country";

export default class SelectScene extends Scene {
  constructor() {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = super.createInitialResourceList();
    assets.push(Resource.Map);
    GameManager.instance.data.countries.forEach(country => {
      assets.push(country.flagSrc);
    });
    console.log(assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    GameManager.instance.data.load(() => {
      const resources = GameManager.instance.game.loader.resources;
      //地図
      const map = new MyMap(resources[Resource.Map].texture);
      let replacements = [];
      GameManager.instance.data.provinces.forEach(province => {
        console.log("replace", [province.id, province.owner.color]);

        replacements.push([province.id, province.owner.color]);
      });
      map.update(replacements);
      map.position.set(renderer.width * 0.1, renderer.height * 0.1);
      this.addChild(map);
    });
    const resources = GameManager.instance.game.loader.resources;
    const renderer = GameManager.instance.game.renderer;

    const button = new PIXI.Sprite(resources[Resource.Title.Bg].texture);
    button.position.set(renderer.width * 0.8, renderer.height * 0.8);
    button.scale.set(0.2, 0.2);
    button.interactive = true;
    button.buttonMode = true;
    button.on("mousedown", () => {
      GameManager.instance.data.download();
    });
    this.addChild(button);
  }

  public select(country: Country) {}

  public update(dt: number) {
    super.update(dt);
  }
}
