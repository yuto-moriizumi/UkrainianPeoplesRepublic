import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
import MainScene from "./Scenes/MainScene";
import ArrowProgress from "./ArrowProgress";
import Combat from "./Combat";
import JsonConverter from "./JsonConverter";
import DivisionSprite from "./DivisionSprite";

export default class DivisionInfo {
  private _template: DivisionTemplate;
  private _position: Province;
  private organization: number;
  private __sprite: DivisionSprite;
  private _destination: Province = null;
  private movingProgress: number = 0; //整数値で扱う 100で最大値
  private __progressBar: ArrowProgress;
  private __combats: Array<Combat> = new Array<Combat>();
  private __dead: boolean = false;
  private __owner: Country;

  constructor(owner: Country) {
    this.__owner = owner;
    owner.addDivision(this);
  }

  public setTemplate(template: DivisionTemplate) {
    this._template = template;
    this.setOrganization(template.getOrganization());
  }

  public createSprite() {
    //描画用オブジェクトを生成し、位置を再設定する
    this.__sprite = new DivisionSprite(this);

    this.setPosition(this._position);
  }

  public applyCost() {
    this.owner.__money.setMoney(
      this.owner.__money.getMoney() - this._template.getCost()
    );
  }

  public set position(provinceId: string) {
    new Promise((resolve) => {
      //プロヴィンスオブジェクトが必要なので、ロード後に代入する
      if (GameManager.instance.data.__isProvinceLoaded) resolve(); //既にロード済みなら直ちに代入する
      GameManager.instance.data.__onProvinceLoaded.push(() => {
        resolve();
      });
    }).then(() => {
      this.setPosition(GameManager.instance.data.getProvince(provinceId));
    });
  }

  public set destination(provinceId: string) {
    this._destination = GameManager.instance.data.getProvince(provinceId);
  }

  public getMaintainance() {
    return this._template.getMaintainance();
  }

  public setPosition(province: Province) {
    if (province == null) return;
    if (this._position) this._position.removeDivision(this);
    this._position = province;
    province.addDivision(this);
    if (this.__sprite)
      //スプライト生成済みかつマップ表示ずみならば
      MainScene.instance.getMap().setDivisonPosition(this.__sprite);

    //占領処理
    const owner = province.getOwner();

    if (owner == this.owner) return;
    if (owner.getWarInfoWith(this.owner)) province.setOwner(this.owner);
  }

  public getPosition() {
    return this._position;
  }

  public get owner() {
    return this.__owner;
  }

  public get sprite() {
    return this.__sprite;
  }

  public attack(target: DivisionInfo) {
    target.setOrganization(
      target.getOrganization() -
        this._template.getAttack() / this.__combats.length //攻撃に参加している数だけ弱くなる
    );
    this.setOrganization(
      this.getOrganization() -
        target._template.getAttack() / target.__combats.length //攻撃に参加している数だけ弱くなる
    );
  }

  public getOrganization() {
    return this.organization;
  }

  public setOrganization(organization: number) {
    this.organization = Math.min(
      Math.max(0, organization),
      this._template.getOrganization()
    );
  }

  public movableTo(province: Province) {
    return (
      province.hasAccess(this.owner) ||
      province.getOwner().getWarInfoWith(this.owner)
    );
  }

  public getTemplate() {
    return this._template;
  }

  public moveTo(destination: Province) {
    //移動先が変更なければ何もしない
    if (this._destination == destination) return;
    //移動可能かチェック
    if (
      (!MainScene.instance.cheat_move && //移動チートが無効で
        !this._position.isNextTo(destination)) || //隣接していないか
      !this.movableTo(destination) //進入不可な場合は
    )
      return; //何もしない

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

    if (MainScene.instance.cheat_move) {
      //移動チート有効な場合は直ちに移動
      this.setPosition(this._destination);
      this.stopMove();
    }
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
    if (this._position) this._position.removeDivision(this);
    this.__sprite.destroy();
    this.__owner.removeDivision(this);
  }

  public stopMove() {
    this.movingProgress = 0;
    if (this.__progressBar && this.__progressBar.geometry)
      this.__progressBar.destroy();
    this.__progressBar = null;
    this._destination = null;
  }

  public isMoving(): boolean {
    return !(this._destination == null || this._destination == undefined);
  }

  public isFighting(): boolean {
    return this.__combats.length > 0;
  }

  public set template(id: string) {
    this.setTemplate(GameManager.instance.data.getTemplate(id));
  }

  public update() {
    try {
      if (this._destination) {
        this.movingProgress = Math.min(
          100,
          this.movingProgress + this._template.getSpeed()
        );
        this.__progressBar.setProgress(this.movingProgress);

        //戦闘判定

        this._destination.getDivisons().forEach((division) => {
          if (!division.owner.getWarInfoWith(this.owner)) return; //戦争していないなら関係ない
          if (this.hasCombatWith(division)) return; //すでに戦闘が発生しているならreturn

          Combat.create(this, division);
        });

        if (this.movingProgress >= 100 && this.__combats.length == 0) {
          //移動終了判定

          this.setPosition(this._destination);
          this.stopMove();
        } else {
        }
      }
    } catch (error) {
      console.log(error);
      console.log(this);
    }
  }

  private toJSON() {
    return JsonConverter.toJSON(this, (key, value) => {
      if (value instanceof Province) return [key, value.getId()]; //プロヴィンスはIDにしておく
      if (value instanceof DivisionTemplate) return [key, value.getId()]; //テンプレートもIDにする
      return [key, value];
    });
  }
}
