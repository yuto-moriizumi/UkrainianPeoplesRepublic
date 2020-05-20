import * as PIXI from "pixi.js";
import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
import DivisionSprite from "./DivisionSprite";
import MainScene from "./Scenes/MainScene";
import ArrowProgress from "./ArrowProgress";

export default class DivisionInfo extends JsonObject {
  private __template: DivisionTemplate;
  private _position: Province;
  private organization: number;
  private __sprite: DivisionSprite;
  private _destination: Province;
  private movingProgress: number; //整数値で扱う 100で最大値
  private __progressBar: ArrowProgress;

  constructor(template: DivisionTemplate) {
    super();
    this.__template = template;
    this.__sprite = new DivisionSprite(this);
  }

  public set position(provinceId: string) {
    this._position = GameManager.instance.data.provinces.get(provinceId);
  }

  public set destination(provinceId: string) {
    this._destination = GameManager.instance.data.provinces.get(provinceId);
  }

  public setPosition(province: Province) {
    this._position = province;
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

  public moveTo(destination: Province) {
    if (this._destination == destination) return;
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

  public update() {
    if (this._destination) {
      this.movingProgress += this.__template.getSpeed();
      this.__progressBar.setProgress(this.movingProgress);
      if (this.movingProgress >= 100) {
        this.movingProgress = 0;
        this.__progressBar.destroy();
        this.__progressBar = null;
        this.setPosition(this._destination);
        this._destination = null;
      } else {
      }
    }
  }

  /*
  public set template(provinceId: string) {
    this._position = GameManager.instance.data.provinces.get(provinceId);
  }*/
}
