import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
import GameManager from "./GameManager";
import Province from "./Province";
import { Selectable } from "./Scenes/Selectable";
import DivisionSprite from "./DivisionSprite";
import Arrow from "./Arrow";
import ArrowProgress from "./ArrowProgress";
import MainScene from "./Scenes/MainScene";
import ExtendedSet from "./ExtendedSet";

export default class MyMap extends PIXI.Sprite {
  public static instance: MyMap;
  private static readonly BORDER_COLOR = "#000000"; //プロヴィンス境界の色
  private static readonly BORDER_WIDTH = 5; //境界線のだいたいの太さ
  private provinceMap: Uint8Array;
  private scene: Selectable;
  private replacements: Array<any> = [];
  private defaultWidth: number;
  private defaultHeight: number;
  private pressKeys: Set<string> = new Set<string>();

  constructor(scene: Selectable, texture?: PIXI.Texture) {
    super(texture);
    this.roundPixels = true;
    MyMap.instance = this;
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
      this.scene.selectProvince(this.getClickedProvince(e));
    });
    this.on("rightclick", (e: PIXI.interaction.InteractionEvent) => {
      this.moveDivisionsTo(this.getClickedProvince(e));
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
      (Math.floor(Math.max(0, position.y)) * this.defaultWidth +
        Math.floor(Math.max(0, position.x))) *
      4;

    //プロヴィンスIDに変換
    //console.log(this.provinceMap[idx + 0]);
    let provinceId;
    try {
      provinceId = PIXI.utils.hex2string(
        PIXI.utils.rgb2hex([
          this.provinceMap[idx + 0] / 255,
          this.provinceMap[idx + 1] / 255,
          this.provinceMap[idx + 2] / 255,
        ])
      );
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
    return provinceId;
  }

  private getClickedProvince(e: PIXI.interaction.InteractionEvent): Province {
    //Uinit8Array上でのインデックスを算出
    const position = e.data.getLocalPosition(this);
    const province = this.getProvince(position);
    if (!province) return null; //プロヴィンスが存在しなければ何もしない
    console.log(
      "selected province id",
      province.getId(),
      "neighbours",
      this.getNeighborProvinces(province)
    );

    return province;
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
    let province = data.getProvinces().get(provinceId);
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
        (Math.floor(searchPoint["y"]) * this.defaultWidth +
          Math.floor(searchPoint["x"])) *
        4;
      if (already.has(idx)) {
        //すでに探索済みだったら何もしない
        continue;
      }
      already.add(idx);
      const provinceId2 = this.getProvinceIdFromPoint(searchPoint);
      if (provinceId !== provinceId2) continue; //provinceIdが異なる（=色が異なる）場合は何もしない

      x += searchPoint["x"];
      y += searchPoint["y"];
      count += 1;

      if (0 < searchPoint["x"])
        candidates.push(new PIXI.Point(searchPoint["x"] - 1, searchPoint["y"]));
      if (searchPoint["x"] < this.defaultWidth - 1)
        candidates.push(new PIXI.Point(searchPoint["x"] + 1, searchPoint["y"]));
      if (0 < searchPoint["y"])
        candidates.push(new PIXI.Point(searchPoint["x"], searchPoint["y"] - 1));
      if (searchPoint["y"] < this.defaultHeight - 1)
        candidates.push(new PIXI.Point(searchPoint["x"], searchPoint["y"] + 1));
    }

    return new PIXI.Point(Math.floor(x / count), Math.floor(y / count));
  }

  public setDivisonPosition(sprite: DivisionSprite) {
    if (!sprite.getOnMap()) this.addChild(sprite);
    const point = sprite.getInfo().getPosition().getCoord();
    sprite.position.set(
      point.x - sprite.width / 2,
      point.y - sprite.height / 2
    );
    sprite.setOnMap(true);
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
    console.log(provinceId);

    if (!provinceId) return null; //provinceIdがnullの時は何もしない
    if (provinceId == MyMap.BORDER_COLOR) return null; //境界線の時は何もしない

    let province = data.getProvinces().get(provinceId);
    console.log(provinceId, province);

    if (!province) {
      //プロビンスデータが無かったら新規作成
      province = new Province(provinceId);
      province.setOwner(GameManager.instance.data.getCountry("Rebels"));
      data.setProvince(provinceId, province);
      province.setCoord(this.getBarycenter(position));
      this.replacements.push([
        province.getId(),
        province.getOwner().getColor(),
      ]);
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
    const provinces = GameManager.instance.data.getProvinces();
    provinces.addListener(() => {
      this.replacements = [];
      provinces.forEach((province) => {
        this.replacements.push([
          PIXI.utils.string2hex(province.getId()),
          province.getOwner().getColor(),
        ]);
      });

      //注意 - どういうわけか、replacementsの長さが1以下だと正しく動作しなくなる

      const filter = new Filters.MultiColorReplaceFilter(
        this.replacements,
        0.001
      );
      this.filters = [filter];
    });
  }

  private moveDivisionsTo(province: Province) {
    DivisionSprite.moveSelectingDivisionsTo(province);
  }

  public getNeighborProvinces(province: Province) {
    const provincePoint = province.getCoord();

    //BFSで探索
    const candidates = new Array<object>();
    const answer = new ExtendedSet<Province>();
    //{x:number,y:number,over:number(黒線を超えた回数)}
    const already = new Set<number>();
    candidates.push({ x: provincePoint.x, y: provincePoint.y, over: 0 });
    while (candidates.length > 0) {
      const searchPoint = candidates.shift();
      const idx =
        (Math.floor(searchPoint["y"]) * this.defaultWidth +
          Math.floor(searchPoint["x"])) *
        4;
      if (already.has(idx)) {
        //すでに探索済みだったら何もしない
        continue;
      }
      already.add(idx);
      const provinceId2 = this.getProvinceIdFromPoint(
        new PIXI.Point(searchPoint["x"], searchPoint["y"])
      );
      let over = searchPoint["over"];

      if (
        provinceId2 !== province.getId() &&
        provinceId2 !== MyMap.BORDER_COLOR
      )
        //スタートのプロヴィンスでも境界線でもないなら
        answer.add(GameManager.instance.data.getProvinces().get(provinceId2));

      if (provinceId2 == MyMap.BORDER_COLOR) {
        //境界線であるならば
        over++; //境界線であるのでoverをカウント
      } else if (provinceId2 != province.getId()) continue; //探索開始プロヴィンスと異なり、境界線でないならば探索しない
      if (over > MyMap.BORDER_WIDTH) continue; //3ピクセル以上超えていれば境界線を辿っていると判断してcontinue

      if (0 < searchPoint["x"])
        candidates.push({
          x: searchPoint["x"] - 1,
          y: searchPoint["y"],
          over: over,
        });
      if (searchPoint["x"] < this.defaultWidth - 1)
        candidates.push({
          x: searchPoint["x"] + 1,
          y: searchPoint["y"],
          over: over,
        });
      if (0 < searchPoint["y"])
        candidates.push({
          x: searchPoint["x"],
          y: searchPoint["y"] - 1,
          over: over,
        });
      if (searchPoint["y"] < this.defaultHeight - 1)
        candidates.push({
          x: searchPoint["x"],
          y: searchPoint["y"] + 1,
          over: over,
        });
    }
    return answer;
  }

  public isNextTo(province1: Province, province2: Province): boolean {
    if (province1 == province2) return true;
    const province1Point = province1.getCoord();

    //BFSで探索
    const candidates = new Array<object>();
    //{x:number,y:number,over:number(黒線を超えた回数)}
    const already = new Set<number>();
    candidates.push({ x: province1Point.x, y: province1Point.y, over: 0 });
    while (candidates.length > 0) {
      const searchPoint = candidates.shift();
      const idx =
        (Math.floor(searchPoint["y"]) * this.defaultWidth +
          Math.floor(searchPoint["x"])) *
        4;
      if (already.has(idx)) {
        //すでに探索済みだったら何もしない
        continue;
      }
      already.add(idx);
      const provinceId2 = this.getProvinceIdFromPoint(
        new PIXI.Point(searchPoint["x"], searchPoint["y"])
      );
      let over = searchPoint["over"];
      /*
      console.log(
        "start:",
        PIXI.utils.hex2string(province1.id),
        provinceId2,
        searchPoint["over"]
      );
      */
      if (provinceId2 == province2.getId()) return true; //目的のプロヴィンスである

      if (provinceId2 == MyMap.BORDER_COLOR) {
        //境界線であるならば
        over++; //境界線であるのでoverをカウント
      } else if (provinceId2 != province1.getId()) continue; //探索開始プロヴィンスと異なり、境界線でないならば探索しない
      if (over > MyMap.BORDER_WIDTH) continue; //3ピクセル以上超えていれば境界線を辿っていると判断してcontinue

      if (0 < searchPoint["x"])
        candidates.push({
          x: searchPoint["x"] - 1,
          y: searchPoint["y"],
          over: over,
        });
      if (searchPoint["x"] < this.defaultWidth - 1)
        candidates.push({
          x: searchPoint["x"] + 1,
          y: searchPoint["y"],
          over: over,
        });
      if (0 < searchPoint["y"])
        candidates.push({
          x: searchPoint["x"],
          y: searchPoint["y"] - 1,
          over: over,
        });
      if (searchPoint["y"] < this.defaultHeight - 1)
        candidates.push({
          x: searchPoint["x"],
          y: searchPoint["y"] + 1,
          over: over,
        });
    }

    return false;
  }
}
