import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import DivisionInfo from "./DivisionInfo";
import VerticalBox from "./UI/VerticalBox";
import Resource from "./Resources";
export default class DivisionSprite extends VerticalBox {
  private info: DivisionInfo;
  private static readonly;

  constructor(info: DivisionInfo) {
    super(20, 22, 1, 0x216639);
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

  private onClick(e: PIXI.interaction.InteractionEvent) {
    e.stopPropagation();
    console.log("師団がクリックされた");
  }
}
