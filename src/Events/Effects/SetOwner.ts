import Effect from "./Effect";
import Country from "../../Country";
import War from "../../War";
import GameManager from "../../GameManager";
import Province from "../../Province";
import MainScene from "../../MainScene";
import * as PIXI from "pixi.js";

export default class SetOwner extends Effect {
  private type = this.constructor.name;
  private _root: Country;
  private _provinces: Array<Province> = new Array<Province>();

  public activate() {
    this._provinces.forEach((province) => {
      province.setOwner(this._root);
    });
    MainScene.instance.getMap().update();
  }

  set root(countryId: string) {
    this._root = GameManager.instance.data.countries.get(countryId);
  }

  set provinces(provinceIds: Array<string>) {
    this._provinces = provinceIds.map((provinceId) => {
      return GameManager.instance.data.provinces.get(provinceId);
    });
  }

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (value instanceof Country) return [key, value.id];
      if (value instanceof Array)
        return [
          key,
          value.map((province: Province) => {
            return PIXI.utils.hex2string(province.id).substr(1);
          }),
        ];
      return [key, value];
    });
  }

  /*
  public toJson(): string {
    return (
      "{" +
      [
        '"type":' + this.constructor.name,
        '"root":' + this.root.id,
        '"target":' + this.target.id,
      ].join(",") +
      "}"
    );
  }*/
}
