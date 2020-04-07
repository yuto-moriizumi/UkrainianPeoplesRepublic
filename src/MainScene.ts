import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Country from "./Country";
import Fade from "./Fade";
import LoaderAddParam from "./LoaderAddParam";
import MyMap from "./MyMap";
import GameManager from "./GameManager";
import Resource from "./Resources";
import { Selectable } from "./Selectable";
import Province from "./Province";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DiplomaticSidebar from "./DiplomaticSidebar";
import Timer from "./Timer";
import EventDispatcher from "./Events/EventDispacher";
import Event from "./Events/Event";

export default class MainScene extends Scene implements Selectable {
  private playCountry: Country;
  private map: MyMap;
  private sidebar: Sidebar;
  private timer: Timer;
  private eventDispatcher: EventDispatcher;

  constructor(playCountry: Country) {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
    this.playCountry = playCountry;
    this.eventDispatcher = new EventDispatcher(this);
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = [];
    assets.push(Resource.Cancel);
    assets.push(Resource.war);
    assets.push(Resource.plus);
    assets.push(Resource.minus);
    console.log(assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    this.map = new MyMap(
      this,
      GameManager.instance.game.loader.resources[Resource.Map].texture
    );
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
