import Country from "./Country";
import GameManager from "./GameManager";
import * as PIXI from "pixi.js";
import MainScene from "./Scenes/MainScene";
import DivisionInfo from "./DivisionInfo";
import JsonObject from "./Utils/JsonObject";
import Observable from "./Observable";
import ProvinceObserver from "./ProvinceObserver";
import CultureObserver from "./CultureObserver";
import JsonType from "./Utils/JsonType";
import ExtendedSet from "./Utils/ExtendedSet";
import DivisionStacker from "./DivisionStacker";

export default class Province extends JsonObject implements Observable {
  private __id: string;
  private _owner: Country;
  private x: number = 0;
  private y: number = 0;
  private __divisions = new DivisionStacker();
  private _culture: string = "DEFAULT_CULTURE";
  private __observers = new Array<ProvinceObserver>();
  private __cultureObservers = new Array<CultureObserver>();
  private _neighbours = new ExtendedSet<string>();

  constructor(id: string) {
    super();
    if (id.substr(0, 1) != "#") this.__id = "#" + id;
    //#ついてないやつにつける data.json更新後削除
    else this.__id = id;
  }

  private set owner(countryId: string) {
    this._owner = GameManager.instance.data.getCountry(countryId);
  }

  public getId(): string {
    return this.__id;
  }

  public getOwner() {
    return this._owner;
  }

  public setOwner(owner: Country) {
    const previousOwner = this._owner;
    this._owner = owner;
    this.__observers.forEach((observer) => {
      observer.onProvinceChange();
    });

    //降伏判定
    const provinces = [];
    GameManager.instance.data.getProvinces().forEach((province) => {
      if (province.getOwner() == previousOwner) provinces.push(province);
    });
    if (provinces.length == 0) {
      //降伏
      previousOwner.destroy();
    }
  }

  public setCoord(point: PIXI.Point) {
    this.x = point.x;
    this.y = point.y;
  }

  public getCoord(): PIXI.Point {
    return new PIXI.Point(this.x, this.y);
  }

  public addDivision(division: DivisionInfo) {
    this.__divisions.addDivison(division);
  }

  public removeDivision(division: DivisionInfo) {
    this.__divisions.removeDivision(division);
  }

  public getDivisons() {
    return this.__divisions.getDivisions();
  }

  public isNextTo(province: Province): boolean {
    return this._neighbours.some((p) => p === province.getId());
  }

  /**
   * このプロヴィンスに対して指定の国が平和的に進入可能か
   * @param {Country} country
   * @returns
   * @memberof Province
   */
  public hasPeaceAccess(country: Country) {
    return (
      this._owner == country ||
      country.hasAccessTo(this._owner) || //軍事通行権があるか
      country.alliesWith(this._owner) //同盟しているか
    );
  }

  /**
   * このプロヴィンスに対して指定の国が何らかの手段で進入可能か
   * @param {Country} country
   * @memberof Province
   */
  public hasAccess(country: Country) {
    return this.hasPeaceAccess(country) || this._owner.getWarInfoWith(country);
  }

  private set culture(culture: string) {
    this.setCulture(culture);
  }

  public setCulture(culture: string) {
    const cultures = GameManager.instance.data.getCultures();
    cultures.addListener(() => {
      if (!cultures.has(culture))
        throw new Error("文化は見つかりませんでした:" + culture);
      this._culture = culture;
      this.__cultureObservers.forEach((observer) => {
        observer.onCultureChange();
      });
    });
  }

  public getCulture(): string {
    return this._culture;
  }

  public addObserver(observer: ProvinceObserver) {
    this.__observers.push(observer);
  }

  public removeObserver(observer: ProvinceObserver) {
    this.__observers = this.__observers.filter(
      (observer2) => observer2 != observer
    );
  }

  public addCultureObserver(observer: CultureObserver) {
    this.__cultureObservers.push(observer);
  }

  public removeCultureObserver(observer: CultureObserver) {
    this.__cultureObservers = this.__cultureObservers.filter(
      (observer2) => observer2 != observer
    );
  }

  public set neighbours(neighbours: string[] | ExtendedSet<Province>) {
    if (neighbours instanceof ExtendedSet) {
      const array = [];
      neighbours.forEach((p) => array.push(p.getId()));
      this._neighbours = new ExtendedSet(array);
    } else this._neighbours = new ExtendedSet(neighbours);
  }

  public getNeighbours() {
    return this._neighbours;
  }

  public getDivisionStacker() {
    return this.__divisions;
  }

  replacer(key: string, value: any, type: JsonType) {
    switch (type) {
      case JsonType.GameData:
        if (key === "owner") return []; //除外リスト
        return [key, value];
      case JsonType.SaveData:
        if (
          key === "culture" ||
          key === "x" ||
          key === "y" ||
          key == "neighbours"
        )
          return []; //除外リスト
        if (value instanceof Country) return [key, value.id];
        return [key, value];
      default:
        throw new Error("Invalid type:" + type);
    }
  }
}
