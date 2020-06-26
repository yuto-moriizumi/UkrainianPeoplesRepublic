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
  private static selects = new Set<Division>();
  private selected = false;
  private onMap = false;
  private template: DivisionTemplate;
  private $province: Province;
  private $organization: number;
  private $destination: Province;
  private $movingProgress: number; //整数値で扱う 100で最大値
  private progressBar: ArrowProgress;
  private combats: Array<Combat> = new Array<Combat>();
  private dead: boolean = false;

  constructor(template: DivisionTemplate) {
    super(15, 12, 0.8, 0x216639);

    this.template = template;
    this.setOrganization(template.getOrganization());
    template.addDivision(this);
    //this.country = country;

    //if (MainScene.instance) {
    //MainScene.resouceLoadCallbacks.push(this.onResourceLoaded);
    this.onResourceLoaded();
    //}
    //info.owner.flag

    this.interactive = true;
    this.buttonMode = true;
    this.on("click", (e: PIXI.interaction.InteractionEvent) => this.onClick(e));
  }

  public onResourceLoaded() {
    //シーン側でロード完了次第呼び出す
    const sprite = new PIXI.Sprite(
      GameManager.instance.game.loader.resources[Resource.infantaly].texture
    );
    this.addPart(this.sprite);
  }

  private set organization(organization: number) {
    this.$organization = organization;
  }

  private set movingProgress(movingProgress: number) {
    this.$movingProgress = movingProgress;
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
    Division.selects.forEach((division) => {
      division.deselect();
    });
    Division.selects.add(this);
  }

  public deselect() {
    this.selected = false;
    this.filters = [];
    Division.selects.delete(this);
  }

  private onClick(e: PIXI.interaction.InteractionEvent) {
    e.stopPropagation();
    this.selected = !this.selected;
    if (this.selected) {
      //選択されていないならば選択
      this.select();
    } else {
      this.deselect();
    }
  }

  public static moveSelectingDivisionsTo(province: Province) {
    Division.selects.forEach((division) => {
      division.move(province);
    });
  }

  public set province(provinceId: string) {
    this.setPosition(GameManager.instance.data.getProvince(provinceId));
  }

  public set destination(provinceId: string) {
    this.$destination = GameManager.instance.data.getProvince(provinceId);
  }

  public setPosition(province: Province) {
    if (this.$province) this.$province.removeDivision(this);
    this.$province = province;
    province.addDivision(this);
    MainScene.instance.getMap().setDivisonPosition(this);

    //占領処理
    const owner = province.getOwner();
    console.log(owner, this.template.owner);

    if (owner == this.template.owner) return;
    if (owner.getWarInfoWith(this.template.owner))
      province.setOwner(this.template.owner);
  }

  public getPosition() {
    return this.$province;
  }

  public get owner() {
    return this.template.owner;
  }

  public get sprite() {
    return this;
  }

  public attack(target: Division) {
    target.setOrganization(
      target.getOrganization() - this.template.getAttack() / this.combats.length //攻撃に参加している数だけ弱くなる
    );
    this.setOrganization(
      this.getOrganization() -
        target.template.getAttack() / target.combats.length //攻撃に参加している数だけ弱くなる
    );
  }

  public getOrganization() {
    return this.$organization;
  }

  public setOrganization(organization: number) {
    this.$organization = Math.min(
      Math.max(0, organization),
      this.template.getOrganization()
    );
  }

  public getTemplate() {
    return this.template;
  }

  public move(destination: Province) {
    //移動先が変更なければ何もしない
    if (this.$destination == destination) return;
    //移動可能かチェック（隣接しているプロヴィンスのみ）
    if (!this.$province.isNextTo(destination)) return;
    if (
      destination.getOwner() != this.owner && //移動先の領有国が自国ではなく、
      !destination.getOwner().getWarInfoWith(this.owner) //かつ戦争中でない場合
    )
      return;

    if (this.progressBar) {
      this.progressBar.destroy();
      this.progressBar = null;
    }
    if (destination == this.getPosition()) {
      this.$destination = null;
      this.$movingProgress = 0;
      return;
    }
    if (MainScene.instance.moveCheat) {
      //移動チートONなら
      this.setPosition(destination);
      this.stopMove();
      return;
    }
    this.$destination = destination;
    this.$movingProgress = 0;
    this.progressBar = new ArrowProgress(this.getPosition(), destination);
    MainScene.instance.getMap().addChild(this.progressBar);
  }

  private hasCombatWith(target: Division) {
    return GameManager.instance.data.getCombats().find((combat) => {
      return combat.getOpponent(this) == target;
    });
  }

  public addCombat(combat: Combat) {
    this.combats.push(combat);
  }

  public removeCombat(combat: Combat) {
    this.combats = this.combats.filter((combat2) => {
      return combat != combat2;
    });
  }

  public destroy() {
    if (this.dead) return; //すでに死亡ならなにもしない
    this.dead = true;
    if (this.progressBar) this.progressBar.destroy();
    this.$province.removeDivision(this);
    this.destroy();
    this.template.removeDivision(this);
  }

  public stopMove() {
    this.$movingProgress = 0;
    if (this.progressBar) this.progressBar.destroy();
    this.progressBar = null;
    this.$destination = null;
  }

  public update() {
    if (this.$destination) {
      this.$movingProgress = Math.min(
        100,
        this.$movingProgress + this.template.getSpeed()
      );
      this.progressBar.setProgress(this.$movingProgress);

      //戦闘判定
      console.log("division is destination", this.$destination.getDivisons());

      this.$destination.getDivisons().forEach((division) => {
        if (!division.owner.getWarInfoWith(this.owner)) return; //戦争していないなら関係ない
        if (this.hasCombatWith(division)) return; //すでに戦闘が発生しているならreturn
        console.log("combat create", this, division);

        Combat.create(this, division);
      });

      if (this.$movingProgress >= 100 && this.combats.length == 0) {
        //移動終了判定
        console.log("move completed");

        this.setPosition(this.$destination);
        this.stopMove();
      } else {
      }
    }
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(this).map(([key, value]) => {
        if (!key.startsWith("$")) return [];
        key = key.substr(1);
        if (value instanceof Province) value = value.getId();
        return [key, value];
      })
    );
  }
}
