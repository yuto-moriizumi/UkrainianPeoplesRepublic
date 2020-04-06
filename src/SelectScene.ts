import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Fade from "./Fade";
import GameManager from "./GameManager";
import LoaderAddParam from "./LoaderAddParam";
import Resource from "./Resources";

import MyMap from "./MyMap";
import Country from "./Country";
import Flag from "./Flag";
import Button from "./Button";
import Province from "./Province";
import MainScene from "./MainScene";
import { Selectable } from "./Selectable";

export default class SelectScene extends Scene implements Selectable {
  private myFlag: Flag;
  private static readonly myFlagSize = 150;
  private target: Country;
  private selectButton: Button;
  private myCountry: Country;
  private map: MyMap;
  private changeCountryIndex = 0;
  private countries: Array<Country> = new Array<Country>();
  private countryName: PIXI.Text;

  constructor() {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = super.createInitialResourceList();
    assets.push(Resource.Map);
    //jsonデータをロードし、終わったら
    GameManager.instance.data.countries.forEach((country) => {
      console.log("hi", country);
      assets.push(country.flag); //全ての国旗をロード
    });
    console.log("loadedAssets:" + assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();
    const resources = GameManager.instance.game.loader.resources;
    const renderer = GameManager.instance.game.renderer;

    //地図の更新
    this.map = new MyMap(this, resources[Resource.Map].texture);
    this.map.update();
    this.addChild(this.map);

    //ダウンロードボタン（暫定）
    const button = new PIXI.Sprite(resources[Resource.Title.Bg].texture);
    button.position.set(renderer.width * 0.8, renderer.height * 0.8);
    button.scale.set(0.2, 0.2);
    button.interactive = true;
    button.buttonMode = true;
    button.on("mousedown", () => {
      GameManager.instance.data.download();
    });
    this.addChild(button);

    //選択ボタン（デバッグ用）
    this.selectButton = new Button("選択する");
    this.selectButton.position.set(0, 150);
    this.selectButton.on("click", () => {
      this.selectAsMyCountry();
    });
    //this.addChild(this.selectButton);

    //配列化国に追加
    GameManager.instance.data.countries.forEach((country) => {
      this.countries.push(country);
    });

    //切り替えボタン（デバッグ用）
    const changeButton = new Button("切り替え");
    changeButton.position.set(
      0,
      this.selectButton.y + this.selectButton.height
    );
    changeButton.on("click", () => {
      this.selectAsTarget(
        this.countries[++this.changeCountryIndex % this.countries.length]
      );
    });
    //this.addChild(changeButton);

    //選択ボタン（本番用）
    const selectButton = new Button("選択する", 200, 100);
    selectButton.position.set(0, 150);
    selectButton.on("click", () => {
      this.confirm();
    });
    this.addChild(selectButton);
  }

  private selectAsMyCountry(country?: Country) {
    if (!country && (this.target === null || this.target === undefined)) return;
    this.selectButton.setText("選択解除");
    this.selectButton.removeListener("click");
    this.selectButton.on("click", () => {
      this.deselectMyCountry();
    });
    this.myCountry = country ? country : this.target;
  }

  private deselectMyCountry() {
    this.myCountry = null;
    this.selectButton.setText("選択する");
    this.selectButton.removeListener("click");
    this.selectButton.on("click", () => {
      this.selectAsMyCountry();
    });
  }

  public selectProvince(province: Province) {
    if (this.myCountry) {
      //自国選択済みならば、その州の領有国を自国に変更する
      province.owner = this.myCountry;
      this.map.update();
    } else {
      this.selectAsTarget(province.owner);
    }
  }

  private selectAsTarget(country: Country) {
    if (country === null || country === undefined)
      country = GameManager.instance.data.countries["Rebels"];
    if (this.myFlag) this.myFlag.destroy();
    this.myFlag = new Flag(country);
    this.myFlag.scale.set(SelectScene.myFlagSize / this.myFlag.width);
    this.addChild(this.myFlag);
    this.target = country;

    if (this.countryName) this.countryName.destroy();
    this.countryName = new PIXI.Text(country.name);
    this.addChild(this.countryName);
  }

  private confirm() {
    GameManager.loadScene(new MainScene(this.target));
  }

  public update(dt: number) {
    super.update(dt);
    if (this.map) this.map.move();
  }
}
