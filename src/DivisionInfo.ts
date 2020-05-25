import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
import DivisionSprite from "./DivisionSprite";
import MainScene from "./Scenes/MainScene";
import ArrowProgress from "./ArrowProgress";
import Combat from "./Combat";

export default class DivisionInfo extends JsonObject {
  private __template: DivisionTemplate;
  private _position: Province;
  private _organization: number;
  private __sprite: DivisionSprite;
  private _destination: Province;
  private movingProgress: number; //整数値で扱う 100で最大値
  private __progressBar: ArrowProgress;
  private __combats: Array<Combat> = new Array<Combat>();
  private __dead: boolean = false;

  constructor(template: DivisionTemplate) {
    super();
    this.__template = template;
    this.setOrganization(template.getOrganization());
    this.__sprite = new DivisionSprite(this);
  }

  public set position(provinceId: string) {
    this.setPosition(GameManager.instance.data.getProvince(provinceId));
  }

  public set destination(provinceId: string) {
    this._destination = GameManager.instance.data.getProvince(provinceId);
  }

  public setPosition(province: Province) {
    if (this._position) this._position.removeDivision(this);
    this._position = province;
    province.addDivision(this);
    MainScene.instance.getMap().setDivisonPosition(this.__sprite);

    //占領処理
    const owner = province.getOwner();
    console.log(owner, this.__template.owner);

    if (owner == this.__template.owner) return;
    if (owner.hasWarWith(this.__template.owner))
      province.setOwner(this.__template.owner);
  }

  public getPosition() {
    return this._position;
  }

  public get owner() {
    return this.__template.owner;
  }

  public get sprite() {
    return this.__sprite;
  }

  public attack(target: DivisionInfo) {
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

  public moveTo(destination: Province) {
    //移動先が変更なければ何もしない
    if (this._destination == destination) return;
    //移動可能かチェック（隣接しているプロヴィンスのみ）
    if (!this._position.isNextTo(destination)) return;
    if (
      destination.getOwner() != this.owner && //移動先の領有国が自国ではなく、
      !destination.getOwner().hasWarWith(this.owner) //かつ戦争中でない場合
    )
      return;

    if (this.__progressBar) {
      this.__progressBar.destroy();
      this.__progressBar = null;
    }
    if (destination == this.getPosition()) {
      this._destination = null;
      this.movingProgress = 0;
      return;
    }
    this._destination = destination;
    this.movingProgress = 0;
    this.__progressBar = new ArrowProgress(this.getPosition(), destination);
    MainScene.instance.getMap().addChild(this.__progressBar);
  }

  private hasCombatWith(target: DivisionInfo) {
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
    console.log("sprite destroy", this.__sprite);
    this._position.removeDivision(this);
    this.__sprite.destroy();
    this.__template.removeDivision(this);
  }

  public stopMove() {
    this.movingProgress = 0;
    if (this.__progressBar) this.__progressBar.destroy();
    this.__progressBar = null;
    this._destination = null;
  }

  public update() {
    if (this._destination) {
      this.movingProgress = Math.min(
        100,
        this.movingProgress + this.__template.getSpeed()
      );
      this.__progressBar.setProgress(this.movingProgress);

      //戦闘判定
      console.log("division is destination", this._destination.getDivisons());

      this._destination.getDivisons().forEach((division) => {
        if (!division.owner.hasWarWith(this.owner)) return; //戦争していないなら関係ない
        if (this.hasCombatWith(division)) return; //すでに戦闘が発生しているならreturn
        console.log("combat create", this, division);

        Combat.create(this, division);
      });

      if (this.movingProgress >= 100 && this.__combats.length == 0) {
        //移動終了判定
        console.log("move completed");

        this.setPosition(this._destination);
        this.stopMove();
      } else {
      }
    }
  }
}
