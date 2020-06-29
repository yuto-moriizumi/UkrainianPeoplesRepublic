import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./Utils/JsonObject";
import * as PIXI from "pixi.js";
import MainScene from "./Scenes/MainScene";
import Atlas from "./Map/Atlas";
import DivisionInfo from "./DivisionInfo";
import Observable from "./Observable";
import ProvinceObserver from "ProvinceObserver";
import CultureObserver from "./CultureObserve";

export default class Province extends JsonObject implements Observable {
  private id: string;
  private _owner: Country;
  private x: number = 0;
  private y: number = 0;
  private __divisions: Array<DivisionInfo> = new Array<DivisionInfo>();
  private _culture: string = "DEFAULT_CULTURE";
  private __observers = new Array<ProvinceObserver>();
  private __cultureObservers = new Array<CultureObserver>();

  constructor(id: string) {
    super();
    if (id.substr(0, 1) != "#") this.id = "#" + id;
    //#ついてないやつにつける data.json更新後削除
    else this.id = id;
  }

  private set owner(countryId: string) {
    this._owner = GameManager.instance.data.getCountry(countryId);
  }

  public getId(): string {
    return this.id;
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
    this.__divisions.push(division);
  }

  public removeDivision(division: DivisionInfo) {
    this.__divisions = this.__divisions.filter((division2) => {
      return division != division2;
    });
  }

  public getDivisons() {
    return this.__divisions;
  }

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (value instanceof Country) return [key, value.id];
      if (key === "id") return [];
      return [key, value];
    });
  }

  public isNextTo(province: Province): boolean {
    const ans = MainScene.instance.getMap().isNextTo(this, province);
    //console.log(this, province, ans);
    return ans;
  }

  /**
   * このプロヴィンスに対して指定の国が進入可能か
   * @param {Country} country
   * @returns
   * @memberof Province
   */
  public hasAccess(country: Country) {
    return (
      this._owner == country ||
      country.hasAccessTo(this._owner) || //軍事通行権があるか
      country.getWarInfoWith(this._owner) //戦争中か
    );
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
}
