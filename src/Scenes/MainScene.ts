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

export default class MainScene extends Scene implements Selectable {
  public static instance: MainScene;
  private playCountry: Country;
  private map: MyMap;
  private sidebar: Sidebar;
  private timer: Timer;
  private eventDispatcher: EventDispatcher;

  constructor(playCountry: Country) {
    super();
    if (MainScene.instance) {
      throw new Error("MainScene can be instantiate only once");
    }
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
    this.playCountry = playCountry;
    this.eventDispatcher = new EventDispatcher(this);
    MainScene.instance = this;

    //ダウンロードボタン（暫定）
    const renderer = GameManager.instance.game.renderer;
    const button = new Button("JSON");
    button.position.set(renderer.width * 0.8, renderer.height * 0.8);
    button.on("mousedown", () => {
      GameManager.instance.data.download();
    });
    this.addChild(button);
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

    const header = new Header(this.playCountry);
    this.addChild(header);

    //時間コントローラ
    this.timer = new Timer();
    this.timer.position.set(
      this.width - this.timer.width - 15,
      header.height * 0.5 - this.timer.height * 0.5
    );
    header.addChild(this.timer);
  }

  public selectProvince(province: Province) {
    this.openDiplomacySidebar(province.owner);
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

  public getMap() {
    return this.map;
  }

  public update(dt: number) {
    super.update(dt);
    if (this.map) this.map.move();
    if (this.timer) this.timer.update(this.elapsedFrameCount);

    //イベント発火処理
    GameManager.instance.data.events.forEach((event: Event) => {
      event.dispatch(this, this.timer.getDate());
    });
  }

  public getMyCountry() {
    return this.playCountry;
  }
}
