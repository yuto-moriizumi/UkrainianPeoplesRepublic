import { MapMode } from "./MapMode";
import { GameManager } from "../GameManager";
import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
import { ProvinceObserver } from "../ProvinceObserver";
import { Observable } from "../Observable";
import { MapModeObserver } from "./MapModeObserver";
import { CultureObserver } from "../CultureObserve";

export class CultureMap extends MapMode implements CultureObserver, Observable {
  observers = Array<MapModeObserver>();
  private filter: PIXI.Filter;
  private cultureDictionaly = new Map<string, string>();

  constructor() {
    super();
    GameManager.instance.data.getProvinces().forEach((province) => {
      province.addCultureObserver(this);
    });
  }

  public update() {
    const provinces = GameManager.instance.data.getProvinces();
    let replacements = [];
    provinces.forEach((province) => {
      const culture = province.getCulture();
      if (!this.cultureDictionaly.has(culture))
        this.cultureDictionaly.set(
          culture,
          PIXI.utils.hex2string(
            PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()])
          )
        );
      replacements.push([
        PIXI.utils.string2hex(province.getId()),
        PIXI.utils.string2hex(this.cultureDictionaly.get(culture)),
      ]);
    });
    //注意 - どういうわけか、replacementsの長さが1以下だと正しく動作しなくなる
    this.filter = new Filters.MultiColorReplaceFilter(replacements, 0.001);

    //マップに通知
    this.observers.forEach((observer) => {
      observer.onMapModeUpdated(this.filter);
    });
  }

  public onCultureChange() {
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
  public destroy() {
    //プロヴィンスに登録したオブザーバーを解除
    GameManager.instance.data.getProvinces().forEach((province) => {
      province.removeCultureObserver(this);
    });
  }
}
