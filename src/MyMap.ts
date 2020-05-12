import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
import GameManager from "./GameManager";
import Province from "./Province";
import { Selectable } from "./Scenes/Selectable";
import DivisionSprite from "DivisionSprite";

export default class MyMap extends PIXI.Sprite {
  private provinceMap: Uint8Array;
  private scene: Selectable;
  private replacements: Array<any> = [];
  private defaultWidth: number;
  private defaultHeight: number;
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
    this.defaultHeight = this.height;
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
      //console.log(e.key);
    });
    document.body.addEventListener("keyup", (e) => {
      this.pressKeys.delete(e.key);
      //console.log(e.key);
    });

    this.on("click", (e: PIXI.interaction.InteractionEvent) => {
      this.selectClickedProvince(e);
    });
    this.on("rightclick", (e: PIXI.interaction.InteractionEvent) => {
      this.selectClickedProvince(e);
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

  private getProvinceIdFromPoint(position: PIXI.Point): string {
    //console.log(position);

    const idx =
      (Math.floor(position.y) * this.defaultWidth + Math.floor(position.x)) * 4;

    //プロヴィンスIDに変換
    //console.log(this.provinceMap[idx + 0]);
    let provinceId;
    try {
      provinceId =
        ("00" + this.provinceMap[idx + 0].toString(16)).slice(-2) +
        ("00" + this.provinceMap[idx + 1].toString(16)).slice(-2) +
        ("00" + this.provinceMap[idx + 2].toString(16)).slice(-2);
    } catch (error) {
      console.log(error);
      console.log(
        position.x,
        position.y,
        idx,
        this.provinceMap.length,
        this.defaultWidth,
        this.defaultHeight
      );
      throw new Error("停止");
    }

    if (provinceId === "000000") return null; //境界線を選択した場合は何もしない

    return provinceId;
  }

  private selectClickedProvince(e: PIXI.interaction.InteractionEvent) {
    //Uinit8Array上でのインデックスを算出
    const position = e.data.getLocalPosition(this);
    const province = this.getProvince(position);
    if (!province) return; //プロヴィンスが存在しなければ何もしない
    //プロヴィンスを選択
    this.scene.selectProvince(province);
    console.log(province);
  }

  public move() {
    //シーン側から定期的に呼び出すこと
    this.pressKeys.forEach((key) => {
      switch (key) {
        case "a":
          this.x += 2;
          break;
        case "d":
          this.x -= 2;
          break;
        case "w":
          this.y += 2;
          break;
        case "s":
          this.y -= 2;
          break;
      }
    });
  }

  /**
   * 指定した座標を含むプロヴィンスの重心座標を返します
   *
   * @private
   * @param {PIXI.Point} point
   * @returns
   * @memberof MyMap
   */
  private getBarycenter(point: PIXI.Point) {
    const provinceId = this.getProvinceIdFromPoint(point);
    if (!provinceId) return null; //provinceIdがnullの時は何もしない
    const data = GameManager.instance.data;
    let province = data.provinces.get(provinceId);
    if (!province) return null; //provinceがnullの時は何もしない

    //BFSで探索
    let x = 0;
    let y = 0;
    let count = 0;
    const candidates = new Array<PIXI.Point>();
    const already = new Set<number>();
    candidates.push(point);
    while (candidates.length > 0) {
      const searchPoint = candidates.shift();
      const idx =
        (Math.floor(searchPoint.y) * this.defaultWidth +
          Math.floor(searchPoint.x)) *
        4;
      if (already.has(idx)) {
        //すでに探索済みだったら何もしない
        continue;
      }
      already.add(idx);
      const provinceId2 = this.getProvinceIdFromPoint(searchPoint);
      if (provinceId !== provinceId2) continue; //provinceIdが異なる（=色が異なる）場合は何もしない

      x += searchPoint.x;
      y += searchPoint.y;
      count += 1;

      if (0 < searchPoint.x)
        candidates.push(new PIXI.Point(searchPoint.x - 1, searchPoint.y));
      if (searchPoint.x < this.defaultWidth - 1)
        candidates.push(new PIXI.Point(searchPoint.x + 1, searchPoint.y));
      if (0 < searchPoint.y)
        candidates.push(new PIXI.Point(searchPoint.x, searchPoint.y - 1));
      if (searchPoint.y < this.defaultHeight - 1)
        candidates.push(new PIXI.Point(searchPoint.x, searchPoint.y + 1));
    }

    return new PIXI.Point(Math.floor(x / count), Math.floor(y / count));
  }

  public spawnDivison(sprite: DivisionSprite) {
    this.addChild(sprite);
    const point = sprite.getInfo().getPosition().getCoord();
    sprite.position.set(point.x, point.y);
  }

  public calculateBarycenterOfAll() {
    //全てのピクセルを走査し、重心座標を設定します
    for (let i = 0; i < this.defaultHeight; i++) {
      for (let j = 0; j < this.defaultWidth; j++) {
        this.getProvince(new PIXI.Point(j, i));
      }
    }
    console.log("重心走査終了");
  }

  private getProvince(position: PIXI.Point): Province {
    const provinceId = this.getProvinceIdFromPoint(position);
    const data = GameManager.instance.data;

    if (!provinceId) return null; //provinceIdがnullの時は何もしない

    let province = data.provinces.get(provinceId);
    if (!province) {
      //プロビンスデータが無かったら新規作成
      province = new Province(provinceId, {});
      province.setOwner(GameManager.instance.data.countries.get("Rebels"));
      data.provinces.set(provinceId, province);
      province.setCoord(this.getBarycenter(position));
      this.replacements.push([province.id, province.owner.getColor()]);
      this.update();
    } else {
      //もし選択したプロヴィンスに座標情報が用意されていなかったら追加する
      const point = province.getCoord();
      if (point.x == 0 && point.y == 0)
        province.setCoord(this.getBarycenter(position));
    }
    return province;
  }

  public update() {
    this.replacements = [];
    GameManager.instance.data.provinces.forEach((province) => {
      //console.log("replace", [province.id, province.owner.color]);
      this.replacements.push([province.id, province.owner.getColor()]);
    });
    /*
     * 注意 - どういうわけか、replacementsの長さが1以下だと正しく動作しなくなる
     */
    const filter = new Filters.MultiColorReplaceFilter(
      this.replacements,
      0.001
    );
    this.filters = [filter];
    //console.log("Map updated:", this.replacements);
  }
}
