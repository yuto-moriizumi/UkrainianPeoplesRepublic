import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
import GameManager from "./GameManager";
import SelectScene from "./SelectScene";

export default class MyMap extends PIXI.Sprite {
  private provinceMap: Uint8Array;
  private scene: SelectScene;
  constructor(texture?: PIXI.Texture) {
    super(texture);
    //this.canvas =texture
    this.provinceMap = GameManager.instance.game.renderer.plugins.extract.pixels(
      this
    );
    this.interactive = true;

    this.on("click", (e: PIXI.interaction.InteractionEvent) => {
      //Uinit8Array上でのインデックスを算出
      const position = e.data.getLocalPosition(this);
      const idx =
        (Math.floor(position.y) * this.width + Math.floor(position.x)) * 4;

      //プロヴィンスIDに変換
      const provinceId =
        this.provinceMap[idx].toString(16) +
        this.provinceMap[idx + 1].toString(16) +
        this.provinceMap[idx + 1].toString(16);
      const province = GameManager.instance.data.provinces.get(provinceId);
      if (!province) return;

      //国を選択
      this.scene.select(province.owner);
    });
  }

  public update(replacements: Array<any>) {
    this.filters = [new Filters.MultiColorReplaceFilter(replacements, 0.01)];
  }
}
