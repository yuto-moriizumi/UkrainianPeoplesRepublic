import MapMode from "./MapMode";
import GameManager from "../GameManager";
import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
import ProvinceObserver from "../ProvinceObserver";
import Observable from "../Observable";
import MapModeObserver from "./MapModeObserver";

export default class PoliticalMap extends MapMode
  implements ProvinceObserver, Observable {
  observers = Array<MapModeObserver>();
  private filter: PIXI.Filter;

  constructor() {
    super();
    GameManager.instance.data.getProvinces().forEach((province) => {
      province.addObserver(this);
    });
  }

  public update() {
    const provinces = GameManager.instance.data.getProvinces();
    let replacements = [];
    provinces.forEach((province) => {
      replacements.push([
        PIXI.utils.string2hex(province.getId()),
        province.getOwner().getColor(),
      ]);
    });
    //注意 - どういうわけか、replacementsの長さが1以下だと正しく動作しなくなる
    this.filter = new Filters.MultiColorReplaceFilter(replacements, 0.001);

    //マップに通知
    this.observers.forEach((observer) => {
      observer.onMapModeUpdated(this.filter);
    });
  }

  public onProvinceChange() {
    //プロヴィンスの変化を受けてアップデート
    this.update();
  }

  public addObserver(observer: MapModeObserver) {
    this.observers.push(observer);
  }

  public removeObserver(observer: MapModeObserver) {
    this.observers = this.observers.filter(
      (observer2) => observer2 != observer
    );
  }
}
