import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Country from "../Country";
import Fade from "./Fade";
import LoaderAddParam from "../LoaderAddParam";
import MyMap from "../MyMap";
import GameManager from "../GameManager";
import Resource from "../Resources";
import { Selectable } from "./Selectable";
import Province from "../Province";
import Header from "../UI/Header";
import Sidebar from "../UI/Sidebar";
import DiplomaticSidebar from "../UI/DiplomaticSidebar";
import Timer from "../UI/Timer";
import EventDispatcher from "../Events/EventDispacher";
import Event from "../Events/Event";
import Button from "../UI/Button";
import Conscription from "../UI/Conscription";
import SpriteButton from "../UI/SpriteButton";
import DivisionSprite from "../DivisionSprite";
import DebugSidebar from "../UI/DebugSidebar";

export default class MainScene extends Scene implements Selectable {
  public static instance: MainScene;
  private playCountry: Country;
  private map: MyMap;
  private header: Header;
  private sidebar: Sidebar;
  private eventDispatcher: EventDispatcher;
  public selectingDivison: DivisionSprite;

  constructor(playCountry: Country) {
    super();
    if (MainScene.instance) {
      MainScene.instance.destroy();
    }
    //if (MainScene.instance) {
    //  throw new Error("MainScene can be instantiate only once");
    //}
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
    this.playCountry = playCountry;
    this.eventDispatcher = new EventDispatcher(this);

    //ダウンロードボタン（暫定）
    const renderer = GameManager.instance.game.renderer;
    const button = new Button("JSON");
    button.position.set(renderer.width * 0.8, renderer.height * 0.8);
    button.on("mousedown", () => {
      GameManager.instance.data.download();
    });
    this.addChild(button);
    MainScene.instance = this;
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = [];
    assets.push(Resource.Cancel);
    assets.push(Resource.war);
    assets.push(Resource.plus);
    assets.push(Resource.minus);
    assets.push(Resource.se.news);
    assets.push(Resource.se.click_ok);
    assets.push(Resource.se.declare_war);
    assets.push(Resource.conscription);
    assets.push(Resource.infantaly);
    console.log(assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    const resources = GameManager.instance.game.loader.resources;
    this.map = new MyMap(this, resources[Resource.Map].texture);
    this.map.update();
    this.addChild(this.map);

    this.header = new Header(this.playCountry);
    this.addChild(this.header);
  }

  public selectProvince(province: Province) {
    const owner = province.getOwner();
    if (owner) this.openDiplomacySidebar(owner);
  }

  public openDiplomacySidebar(country: Country) {
    if (this.sidebar && this.sidebar.parent) this.sidebar.destroy();
    this.sidebar = new DiplomaticSidebar(this, country);
    this.addChild(this.sidebar);
  }

  public openConscription() {
    if (this.sidebar && this.sidebar.parent) this.sidebar.destroy();
    this.sidebar = new Conscription(this);
    this.addChild(this.sidebar);
  }

  public openDebug() {
    if (this.sidebar && this.sidebar.parent) this.sidebar.destroy();
    this.sidebar = new DebugSidebar(this);
    this.addChild(this.sidebar);
  }

  public getMap() {
    return this.map;
  }

  public update(dt: number) {
    super.update(dt);
    if (this.map) this.map.move();
    let timeElapced = false;
    if (this.header)
      timeElapced = this.header.getTimer().update(this.elapsedFrameCount);
    if (timeElapced)
      GameManager.instance.data
        .getCountries()
        .forEach((country) => country.update());

    //イベント発火処理
    GameManager.instance.data.getEvents().forEach((event: Event) => {
      event.dispatch(this, this.header.getTimer().getDate());
    });
  }

  public getMyCountry() {
    return this.playCountry;
  }

  public setPlayCountry(country: Country) {
    this.playCountry = country;
    this.header.setPlayCountry(country);
  }
}
