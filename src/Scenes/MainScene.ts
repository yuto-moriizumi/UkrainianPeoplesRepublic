import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Country from "../Country";
import Fade from "./Fade";
import LoaderAddParam from "../Utils/LoaderAddParam";
import Atlas from "../Map/Atlas";
import GameManager from "../GameManager";
import Resource from "../Resources";
import { Selectable } from "./Selectable";
import Province from "../Province";
import Header from "../UI/Header";
import Sidebar from "../UI/Sidebar";
import DiplomaticSidebar from "../UI/DiplomaticSidebar";
import Event from "../Events/Event";
import Button from "../UI/Button";
import Conscription from "../UI/Conscription";
import DivisionSprite from "../DivisionSprite";
import DebugSidebar from "../UI/DebugSidebar";
import ProvinceSidebar from "../UI/ProvinceSidebar";
import CountryPlayerHandler from "../CountryPlayerHandler";
import CountryAIHandler from "../CountryAIHandler";

export default class MainScene extends Scene implements Selectable {
  public static instance: MainScene;
  private playCountry: Country;
  private map: Atlas;
  private header: Header;
  private sidebar: Sidebar;
  public selectingDivison: DivisionSprite;
  public cheat_move = false;

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
    assets.push(Resource.money);
    assets.push(Resource.access_root);
    assets.push(Resource.access_target);

    //肖像画を追加
    GameManager.instance.data.getCountries().forEach((country) =>
      country.getLeaders().forEach((leader) => {
        assets.push(leader.getImgPath());
      })
    );
    console.log("loadedAssets:" + assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    const resources = GameManager.instance.game.loader.resources;
    this.map = new Atlas(this, resources[Resource.Map].texture);
    this.addChild(this.map);

    //師団を表示する
    GameManager.instance.data.getCountries().forEach((country) => {
      country.getDivisions().forEach((division) => {
        division.createSprite();
      });
    });

    this.header = new Header(this.playCountry);
    this.addChild(this.header);

    //プレイヤー国をセット
    this.setPlayCountry(this.playCountry);
  }

  public selectProvince(province: Province) {
    this.openProvinceSidebar(province);
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

  public openProvinceSidebar(province: Province) {
    if (this.sidebar && this.sidebar.parent) this.sidebar.destroy();
    this.sidebar = new ProvinceSidebar(this, province);
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
    if (!timeElapced) return; //時間が経過していないならreturn
    const data = GameManager.instance.data;
    //国アップデート
    data.getCountries().forEach((country) => country.update());

    //戦闘アップデート
    data.getCombats().forEach((combat) => {
      combat.combat();
    });

    //ヘッダ更新
    this.header.update();
  }

  public getMyCountry() {
    return this.playCountry;
  }

  public setPlayCountry(country: Country) {
    this.playCountry.setHandler(new CountryAIHandler(this.playCountry));
    this.playCountry = country;
    this.header.setPlayCountry(country);
    //プレイヤー国にプレイヤーハンドラをセット
    country.setHandler(new CountryPlayerHandler(country));
  }

  public getDate() {
    return this.header.getTimer().getDate();
  }
}
