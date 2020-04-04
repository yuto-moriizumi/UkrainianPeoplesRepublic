import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Country from "./Country";
import Fade from "./Fade";
import LoaderAddParam from "./LoaderAddParam";
import MyMap from "./MyMap";
import GameManager from "./GameManager";
import Resource from "./Resources";
import { Selectable } from "./Selectable";
import Province from "./Province";

export default class MainScene extends Scene implements Selectable {
  private playCountry: Country;
  private map: MyMap;

  constructor(playCountry: Country) {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
    this.playCountry = playCountry;
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    return [];
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    this.map = new MyMap(
      this,
      GameManager.instance.game.loader.resources[Resource.Map].texture
    );
    this.map.update();
    this.addChild(this.map);
  }

  public selectProvince(province: Province) {}

  public update(dt: number) {
    super.update(dt);
  }
}
