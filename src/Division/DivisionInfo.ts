import * as PIXI from "pixi.js";
import Country from "./Country/Country";
import GameManager from "./GameManager";
import JsonObject from "./Utils/JsonObject";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
import MainScene from "./Scenes/MainScene";
import ArrowProgress from "./UI/ArrowProgress";
import Combat from "./Combat";
import JsonConverter from "./Utils/JsonConverter";
import DivisionSprite from "./DivisionSprite";
import Atlas from "./Map/Atlas";
import JsonType from "./Utils/JsonType";
export default class DivisionInfo extends JsonObject {
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
  private isRetreat = false;

  constructor(owner: Country) {
    super();
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
    this.__sprite.setOrganizationRate(
      //スプライトの指揮統制率表示を更新
      this.organization / this._template.getOrganization()
    );
    this.setPosition(this._position);
  }

  public applyCost() {
    this.owner.__money.setMoney(
      this.owner.__money.getMoney() - this._template.getCost()
    );
  }

  public set position(provinceId: string) {
    GameManager.instance.data.getProvinces().safeGet(provinceId, (province) => {
      this.setPosition(province);
    });
  }

  public set destination(provinceId: string) {
    GameManager.instance.data.getProvinces().safeGet(provinceId, (province) => {
      this._destination = province;
    });
  }

  public getMaintainance() {
    return this._template.getMaintainance();
  }

  public setPosition(province: Province) {
    if (province == null) return;
    if (this._position) this._position.removeDivision(this);
    this._position = province;
    province.addDivision(this);
    if (this.__sprite) province.getDivisionStacker().showSprite(this);

    //占領処理
    const owner = province.getOwner();
    if (owner === undefined) return; //領有国情報が未ロードであれば、なにもしない
    if (owner == this.owner) return;
    if (owner.getWarInfoWith(this.owner)) {
      if (province.getCulture() == this.owner.getCulture()) {
        //プロヴィンスの文化が師団の所有国と同じなら、この師団の所有国が領有国になる
        province.setOwner(this.owner);
        return;
      }

      //旧領有国と戦争中で、このプロヴィンスと同じ文化の国があるならば、その国が占領する
      let countryOfThisCulture = null;
      GameManager.instance.data.getCountries().forEach((country) => {
        const war = country.getWarInfoWith(owner);
        const culture = country.getCulture();
        if (war && culture == province.getCulture())
          countryOfThisCulture = country;
      });
      if (countryOfThisCulture) {
        province.setOwner(countryOfThisCulture);
        return;
      }

      const neighbours = Atlas.instance.getNeighborProvinces(province);
      if (neighbours.some((neighbour) => neighbour.getOwner() == this.owner)) {
        //占領地の周辺に、この師団の所有国の領土がある場合、この師団の所有国が領有国になる
        province.setOwner(this.owner);
        return;
      }
      const neighbourCountriesWarWithOwner = neighbours.filter(
        //占領地の周辺で、領有国と戦争中の国家を取得
        (neighbour) => neighbour.getOwner().getWarInfoWith(owner) != null
      );
      if (neighbourCountriesWarWithOwner.length > 0) {
        //あればその国が占領
        province.setOwner(neighbourCountriesWarWithOwner[0].getOwner());
        return;
      }
      province.setOwner(this.owner); //なければ師団の所有国が占領
    }
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
    if (this.__sprite) {
      this.__sprite.setOrganizationRate(
        //スプライトの指揮統制率表示を更新
        this.organization / this._template.getOrganization()
      );
    }
  }

  public getTemplate() {
    return this._template;
  }

  public moveTo(destination: Province) {
    //移動先が変更なければ何もしない
    if (this._destination == destination) return;
    if (destination == this.getPosition()) {
      //目的地が今いる場所であれば移動停止
      this.stopMove();
      return;
    }
    //移動可能かチェック
    if (
      (!MainScene.instance.cheat_move && //移動チートが無効で
        !this._position.isNextTo(destination)) || //隣接していないか
      !destination.hasAccess(this.owner) || //進入不可か
      this.isRetreat //撤退中の場合は
    )
      return; //何もしない

    this.stopMove(); //一度移動を停止

    this._destination = destination;
    this.movingProgress = 0;
    this.__progressBar = new ArrowProgress(this.getPosition(), destination);
    MainScene.instance.getMap().arrowLayer.addChild(this.__progressBar);

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
    this.isRetreat = false;
  }

  public stopMove() {
    this.movingProgress = 0;
    if (this.__progressBar && this.__progressBar.geometry)
      this.__progressBar.destroy();
    this.__progressBar = null;
    this._destination = null;
    this.isRetreat = false;
  }

  public isMoving(): boolean {
    return !(this._destination == null || this._destination == undefined);
  }

  public isFighting(): boolean {
    return this.__combats.length > 0;
  }

  public set template(id: string) {
    GameManager.instance.data.getTemplates().safeGet(id, (template) => {
      this.setTemplate(template);
    });
  }

  public retreat() {
    //撤退
    const neighbours = this._position.getNeighbours().filter((
      p //撤退可能なプロヴィンスをフィルタ
    ) =>
      GameManager.instance.data
        .getProvinces()
        .get(p)
        .hasPeaceAccess(this.__owner)
    );
    if (neighbours.length == 0) {
      //撤退先が無ければ破壊
      this.destroy();
      return;
    }
    //撤退開始

    const destination = GameManager.instance.data
      .getProvinces()
      .get(neighbours[0]);
    this.stopMove();
    this._destination = destination;
    this.movingProgress = 0;
    this.__progressBar = new ArrowProgress(
      this.getPosition(),
      destination,
      0x3f3f3f //灰色
    );
    MainScene.instance.getMap().arrowLayer.addChild(this.__progressBar);
    this.isRetreat = true;
  }

  public update() {
    if (this._destination) {
      this.movingProgress = Math.min(
        100,
        this.movingProgress + this._template.getSpeed()
      );
      this.__progressBar.setProgress(this.movingProgress);

      //自滅判定 撤退先が占領されれば自滅する
      if (
        this.isRetreat &&
        this._destination.getOwner().getWarInfoWith(this.owner) != null
      ) {
        this.destroy();
        return;
      }
      //戦闘判定

      this._destination.getDivisons().forEach((division) => {
        if (!division.owner.getWarInfoWith(this.owner)) return; //戦争していないなら関係ない
        if (this.hasCombatWith(division)) return; //すでに戦闘が発生しているならreturn
        if (division.isRetreat) return; //敵師団が撤退中なら戦闘しない
        Combat.create(this, division);
      });

      if (this.movingProgress >= 100 && this.__combats.length == 0) {
        //移動終了判定
        this.setPosition(this._destination);
        this.stopMove();
        this.isRetreat = false;
      }
      return;
    }
    //移動していない場合
    //指揮統制回復判定
    if (this.__combats.length == 0) {
      this.setOrganization(
        this.getOrganization() + this._template.getRecoveryPerTime()
      );
    }
  }

  public getSprite() {
    return this.sprite;
  }

  replacer(key: string, value: any, type: string) {
    if (value instanceof Province) return [key, value.getId()]; //プロヴィンスはIDにしておく
    if (value instanceof DivisionTemplate) return [key, value.getId()]; //テンプレートもIDにする
    return [key, value];
  }
}
