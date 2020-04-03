import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
import GameManager from "./GameManager";
import SelectScene from "./SelectScene";
import Province from "./Province";

export default class MyMap extends PIXI.Sprite {
  private provinceMap: Uint8Array;
  private scene: SelectScene;
  private replacements: Array<any> = [];
  constructor(texture?: PIXI.Texture) {
    super(texture);
    //this.canvas =texture
    this.provinceMap = GameManager.instance.game.renderer.plugins.extract.pixels(
      this
    );
    this.interactive = true;
    this.buttonMode = true;

    this.on("click", (e: PIXI.interaction.InteractionEvent) => {
      //Uinit8Array上でのインデックスを算出
      const position = e.data.getLocalPosition(this);
      const idx =
        (Math.floor(position.y) * this.width + Math.floor(position.x)) * 4;

      //プロヴィンスIDに変換
      const data = GameManager.instance.data;
      const provinceId =
        ("00" + this.provinceMap[idx + 0].toString(16)).slice(-2) +
        ("00" + this.provinceMap[idx + 1].toString(16)).slice(-2) +
        ("00" + this.provinceMap[idx + 2].toString(16)).slice(-2);
      let province = data.provinces.get(provinceId);
      console.log("provinceId:", provinceId);
      if (!province) {
        //プロビンスデータが無かったら新規作成
        province = new Province(provinceId, { Owner: "Rebels" });
        data.provinces.set(provinceId, province);
        this.replacements.push([province.id, province.owner.color]);
        this.update();
      } else {
        //国を選択
        this.scene.select(province.owner);
      }
    });
  }

  public setScene(scene: SelectScene) {
    this.scene = scene;
  }

  public setReplacements(replacements: Array<any>) {
    this.replacements = replacements;
    this.update();
  }

  private update() {
    const filter = new Filters.MultiColorReplaceFilter(
      this.replacements,
      0.005
    );
    this.filters = [filter];
    //console.log("Map updated:", this.replacements);
  }
}
