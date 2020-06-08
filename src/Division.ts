import * as PIXI from "pixi.js";
import GameManager from "./GameManager";
import VerticalBox from "./UI/VerticalBox";
import Resource from "./Resources";
import * as Filters from "pixi-filters";
import MainScene from "./Scenes/MainScene";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
import ArrowProgress from "./ArrowProgress";
import Combat from "./Combat";
import JsonConverter from "./JsonConverter";
import Jsonable from "./Jsonable";
export default class Division extends VerticalBox implements Jsonable {
  private static __selects = new Set<Division>();
  private __selected = false;
  private __onMap = false;
  private __template: DivisionTemplate;
  private __province: Province;
  private _organization: number;
  private __destination: Province;
  private movingProgress: number; //整数値で扱う 100で最大値
  private __progressBar: ArrowProgress;
  private __combats: Array<Combat> = new Array<Combat>();
  private __dead: boolean = false;

  constructor(template: DivisionTemplate) {
    super(15, 12, 0.8, 0x216639);

    this.__template = template;
    this.setOrganization(template.getOrganization());
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

  public setOnMap(flag: boolean) {
    this.__onMap = flag;
  }

  public getOnMap() {
    return this.__onMap;
  }

  public select() {
    this.__selected = true;
    this.filters = [
      new Filters.GlowFilter({
        outerStrength: 8,
        color: 0xffff00,
        quality: 1,
      }),
    ];

    //他の師団の選択を解除
    Division.__selects.forEach((division) => {
      division.deselect();
    });
    Division.__selects.add(this);
  }

  public deselect() {
    this.__selected = false;
    this.filters = [];
    Division.__selects.delete(this);
  }

  private onClick(e: PIXI.interaction.InteractionEvent) {
    e.stopPropagation();
    this.__selected = !this.__selected;
    if (this.__selected) {
      //選択されていないならば選択
      this.select();
    } else {
      this.deselect();
    }
  }

  public static moveSelectingDivisionsTo(province: Province) {
    Division.__selects.forEach((division) => {
      division.move(province);
    });
  }

  public set at(provinceId: string) {
    this.setPosition(GameManager.instance.data.getProvince(provinceId));
  }

  public set destination(provinceId: string) {
    this.__destination = GameManager.instance.data.getProvince(provinceId);
  }

  public setPosition(province: Province) {
    if (this.__province) this.__province.removeDivision(this);
    this.__province = province;
    province.addDivision(this);
    MainScene.instance.getMap().setDivisonPosition(this);

    //占領処理
    const owner = province.getOwner();
    console.log(owner, this.__template.owner);

    if (owner == this.__template.owner) return;
    if (owner.getWarInfoWith(this.__template.owner))
      province.setOwner(this.__template.owner);
  }

  public getPosition() {
    return this.__province;
  }

  public get owner() {
    return this.__template.owner;
  }

  public get sprite() {
    return this;
  }

  public attack(target: Division) {
    target.setOrganization(
      target.getOrganization() -
        this.__template.getAttack() / this.__combats.length //攻撃に参加している数だけ弱くなる
    );
    this.setOrganization(
      this.getOrganization() -
        target.__template.getAttack() / target.__combats.length //攻撃に参加している数だけ弱くなる
    );
  }

  public getOrganization() {
    return this._organization;
  }

  public setOrganization(organization: number) {
    this._organization = Math.min(
      Math.max(0, organization),
      this.__template.getOrganization()
    );
  }

  public getTemplate() {
    return this.__template;
  }

  public move(destination: Province) {
    //移動先が変更なければ何もしない
    if (this.__destination == destination) return;
    //移動可能かチェック（隣接しているプロヴィンスのみ）
    if (!this.__province.isNextTo(destination)) return;
    if (
      destination.getOwner() != this.owner && //移動先の領有国が自国ではなく、
      !destination.getOwner().getWarInfoWith(this.owner) //かつ戦争中でない場合
    )
      return;

    if (this.__progressBar) {
      this.__progressBar.destroy();
      this.__progressBar = null;
    }
    if (destination == this.getPosition()) {
      this.__destination = null;
      this.movingProgress = 0;
      return;
    }
    this.__destination = destination;
    this.movingProgress = 0;
    this.__progressBar = new ArrowProgress(this.getPosition(), destination);
    MainScene.instance.getMap().addChild(this.__progressBar);
  }

  private hasCombatWith(target: Division) {
    return GameManager.instance.data.getCombats().find((combat) => {
      return combat.getOpponent(this) == target;
    });
  }

  public addCombat(combat: Combat) {
    this.__combats.push(combat);
  }

  public removeCombat(combat: Combat) {
    this.__combats = this.__combats.filter((combat2) => {
      return combat != combat2;
    });
  }

  public destroy() {
    if (this.__dead) return; //すでに死亡ならなにもしない
    this.__dead = true;
    if (this.__progressBar) this.__progressBar.destroy();
    this.__province.removeDivision(this);
    this.destroy();
    this.__template.removeDivision(this);
  }

  public stopMove() {
    this.movingProgress = 0;
    if (this.__progressBar) this.__progressBar.destroy();
    this.__progressBar = null;
    this.__destination = null;
  }

  public update() {
    if (this.__destination) {
      this.movingProgress = Math.min(
        100,
        this.movingProgress + this.__template.getSpeed()
      );
      this.__progressBar.setProgress(this.movingProgress);

      //戦闘判定
      console.log("division is destination", this.__destination.getDivisons());

      this.__destination.getDivisons().forEach((division) => {
        if (!division.owner.getWarInfoWith(this.owner)) return; //戦争していないなら関係ない
        if (this.hasCombatWith(division)) return; //すでに戦闘が発生しているならreturn
        console.log("combat create", this, division);

        Combat.create(this, division);
      });

      if (this.movingProgress >= 100 && this.__combats.length == 0) {
        //移動終了判定
        console.log("move completed");

        this.setPosition(this.__destination);
        this.stopMove();
      } else {
      }
    }
  }

  toJSON() {
    return JsonConverter.toJSON(this, (key, value) => {
      if (!Division.hasOwnProperty(key)) return []; //上位クラス（描画系）の持つプロパティはJSON対象外
      if (value instanceof Province) return [key, value.getId()];
      return [key, value];
    });
  }
}
