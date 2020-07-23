import * as PIXI from "pixi.js";
import Country from "./Country/Country";
import GameManager from "./GameManager";
import DivisionInfo from "./DivisionInfo";
import VerticalBox from "./UI/VerticalBox";
import Resource from "./Resources";
import * as Filters from "pixi-filters";
import MainScene from "./Scenes/MainScene";
import Province from "Province";
import ProgressBar from "./UI/ProgressBar";
import PlayCountryObserver from "PlayCountryObserver";
import DiplomacyObserver from "DiplomacyObserver";
import DiplomaticTie from "DiplomaticTies/DiplomaticTie";
import War from "./DiplomaticTies/War";
export default class DivisionSprite extends VerticalBox
  implements PlayCountryObserver, DiplomacyObserver {
  private static readonly MINE_COLOR = 0x216639;
  private static readonly FRIEND_COLOR = 0x183bd9;
  private static readonly NEUTRAL_COLOR = 0x3f3f3f;
  private static readonly ENEMY_COLOR = 0xdf1f1f;
  private static selects = new Set<DivisionSprite>();
  private info: DivisionInfo;
  private selected = false; //JSONに保存する必要が無いのでこのクラスのメンバにしてる
  private onMap = false;
  private organizationBar: ProgressBar;

  constructor(info: DivisionInfo) {
    super(11, 9, 1, 0x216639);
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

    this.organizationBar = new ProgressBar(
      this.width * 0.9,
      1,
      0x000000,
      0x00ff00
    );
    this.addPart(this.organizationBar);

    MainScene.instance.addObserver(this);
    this.info.owner.addObserver(this);
    this.onPlayCountryChange(MainScene.instance.getMyCountry());
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

  public select() {
    this.selected = true;
    this.filters = [
      new Filters.GlowFilter({
        outerStrength: 8,
        color: 0xffff00,
        quality: 1,
      }),
    ];

    //他の師団の選択を解除
    DivisionSprite.selects.forEach((division) => {
      division.deselect();
    });
    DivisionSprite.selects.add(this);
  }

  public deselect() {
    this.selected = false;
    this.filters = [];
    DivisionSprite.selects.delete(this);
  }

  private onClick(e: PIXI.interaction.InteractionEvent) {
    e.stopPropagation();

    console.log("division:", this.info);

    //自国の師団かチェックする
    if (this.info.owner !== MainScene.instance.getMyCountry()) return;

    this.selected = !this.selected;
    if (this.selected) {
      //選択されていないならば選択
      this.select();
    } else {
      this.deselect();
    }
  }

  public static moveSelectingDivisionsTo(province: Province) {
    DivisionSprite.selects.forEach((division) => {
      division.getInfo().moveTo(province);
    });
  }

  public static hasSelectingDivisions() {
    return DivisionSprite.selects.size > 0;
  }

  public setOrganizationRate(organizationRate: number) {
    this.organizationBar.setProgress(organizationRate);
  }

  public getPosition() {
    return this.info.getPosition();
  }

  public onPlayCountryChange(country: Country) {
    //色を決定する
    let color = DivisionSprite.NEUTRAL_COLOR;
    if (this.info.owner == country) color = DivisionSprite.MINE_COLOR;
    if (this.info.owner.getWarInfoWith(country))
      color = DivisionSprite.ENEMY_COLOR;
    this.color = color;
    this.beginFill(this.color);
    this.drawRect(0, 0, this.width, this.height);
  }

  public onDiplomacyChange(tie: DiplomaticTie, isCreated: boolean) {
    if (!(tie instanceof War)) return;
    if (tie.getOpponent(this.info.owner) != MainScene.instance.getMyCountry())
      return; //プレイ国と師団の領有国の関係でなければなにもしない
    let color = DivisionSprite.NEUTRAL_COLOR;
    if (isCreated) color = DivisionSprite.ENEMY_COLOR;
    this.color = color;
    this.beginFill(this.color);
    this.drawRect(0, 0, this.width, this.height);
  }

  public destroy() {
    MainScene.instance.removeObserver(this);
    this.info.owner.removeObserver(this);
    super.destroy();
  }
}
