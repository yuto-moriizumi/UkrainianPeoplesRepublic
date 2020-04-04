import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
import GameManager from "./GameManager";
import SelectScene from "./SelectScene";
import Province from "./Province";
import { Selectable } from "./Selectable";

export default class MyMap extends PIXI.Sprite {
  private provinceMap: Uint8Array;
  private scene: Selectable;
  private replacements: Array<any> = [];
  private defaultWidth: number;
  private pressKeys: Set<string> = new Set<string>();

  constructor(scene: Selectable, texture?: PIXI.Texture) {
    super(texture);
    this.scene = scene;
    //this.canvas =texture
    this.provinceMap = GameManager.instance.game.renderer.plugins.extract.pixels(
      this
    );
    this.interactive = true;
    this.buttonMode = true;

    this.defaultWidth = this.width;
    const renderer = GameManager.instance.game.renderer;

    this.position.set(
      renderer.width / 2 - this.width / 2,
      renderer.height / 2 - this.height / 2
    );

    document.body.addEventListener("wheel", (e: WheelEvent) => {
      //拡大縮小
      e.preventDefault();
      if (e.deltaY > 0) this.scale.set(this.scale.x / 1.25);
      else this.scale.set(this.scale.x * 1.25);
    });

    document.body.addEventListener("keydown", (e) => {
      this.pressKeys.add(e.key);
    });
    document.body.addEventListener("keyup", (e) => {
      this.pressKeys.delete(e.key);
    });

    this.on("click", (e: PIXI.interaction.InteractionEvent) => {
      //Uinit8Array上でのインデックスを算出
      const position = e.data.getLocalPosition(this);
      console.log(position);

      const idx =
        (Math.floor(position.y) * this.defaultWidth + Math.floor(position.x)) *
        4;

      //プロヴィンスIDに変換
      const data = GameManager.instance.data;
      console.log(this.provinceMap[idx + 0]);

      const provinceId =
        ("00" + this.provinceMap[idx + 0].toString(16)).slice(-2) +
        ("00" + this.provinceMap[idx + 1].toString(16)).slice(-2) +
        ("00" + this.provinceMap[idx + 2].toString(16)).slice(-2);

      if (provinceId === "000000") return; //境界線を選択した場合は何もしない

      let province = data.provinces.get(provinceId);
      console.log("provinceId:", provinceId);
      if (!province) {
        //プロビンスデータが無かったら新規作成
        province = new Province(provinceId, {});
        province.setOwner(GameManager.instance.data.countries.get("Rebels"));
        data.provinces.set(provinceId, province);
        this.replacements.push([province.id, province.owner.color]);
        this.update();
      }
      //プロヴィンスを選択
      this.scene.selectProvince(province);
    });
  }

  public setReplacements(replacements: Array<any>) {
    this.replacements = replacements;
    this.update();
  }

  public pushReplacement(replacement: Array<any>) {
    this.replacements.push(replacement);
    this.update();
  }

  public move() {
    this.pressKeys.forEach((key) => {
      switch (key) {
        case "a":
          this.x -= 2;
          break;
        case "d":
          this.x += 2;
          break;
        case "w":
          this.y -= 2;
          break;
        case "s":
          this.y += 2;
          break;
      }
    });
  }

  public update() {
    this.replacements = [];
    GameManager.instance.data.provinces.forEach((province) => {
      //console.log("replace", [province.id, province.owner.color]);
      this.replacements.push([province.id, province.owner.color]);
    });
    /*
     * 注意 - どういうわけか、replacementsの長さが1以下だと正しく動作しなくなる
     */
    const filter = new Filters.MultiColorReplaceFilter(
      this.replacements,
      0.005
    );
    this.filters = [filter];
    //console.log("Map updated:", this.replacements);
  }
}
