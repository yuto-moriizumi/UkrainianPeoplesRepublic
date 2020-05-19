import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import DivisionInfo from "./DivisionInfo";
import VerticalBox from "./UI/VerticalBox";
import Resource from "./Resources";
import * as Filters from "pixi-filters";
import MainScene from "./Scenes/MainScene";
export default class DivisionSprite extends VerticalBox {
  private info: DivisionInfo;
  private static readonly;
  private selected = false; //JSONに保存する必要が無いのでこのクラスのメンバにしてる
  private onMap = false;

  constructor(info: DivisionInfo) {
    super(15, 12, 0.8, 0x216639);
    this.info = info;
    //this.country = country;

    const sprite = new PIXI.Sprite(
      GameManager.instance.game.loader.resources[Resource.infantaly].texture
    );
    this.addPart(sprite);
    //info.owner.flag

    this.interactive = true;
    this.buttonMode = true;
    this.on("click", (e: PIXI.interaction.InteractionEvent) => this.onClick(e));
  }

  public getInfo() {
    return this.info;
  }

  public setOnMap(flag: boolean) {
    this.onMap = flag;
  }

  public getOnMap() {
    return this.onMap;
  }

  private onClick(e: PIXI.interaction.InteractionEvent) {
    e.stopPropagation();
    this.selected = !this.selected;
    if (this.selected) {
      this.filters = [
        new Filters.GlowFilter({
          outerStrength: 8,
          color: 0xffff00,
          quality: 1,
        }),
      ];
      MainScene.instance.getMap().addSelectingDivision(this);
    } else {
      this.filters = [];
      MainScene.instance.getMap().removeSelectingDivision(this);
    }
  }
}
