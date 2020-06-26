import Sidebar from "./Sidebar";
import Country from "../Country";
import Flag from "../Flag";
import * as PIXI from "pixi.js";
import Button from "./Button";
import MainScene from "../Scenes/MainScene";
import Dialog from "./Dialog";
import War from "../DiplomaticTies/War";
import GameManager from "../GameManager";
import Resource from "../Resources";
import HorizontalBox from "./HorizontalBox";
import SpriteButton from "./SpriteButton";
import DivisionTemplate from "../DivisionTemplate";
import DivisionSprite from "../DivisionSprite";
import DivisionInfo from "../DivisionInfo";

export default class Conscription extends Sidebar {
  private scene: MainScene;

  constructor(scene: MainScene) {
    super("徴兵");
    this.scene = scene;

    //生産物バー
    const products = new HorizontalBox(this.width, 100);
    this.addPart(products);

    //生産物
    const resources = GameManager.instance.game.loader.resources;

    const myCountry = scene.getMyCountry();
    if (!myCountry.hasAnyDivisionTemplate()) {
      //師団テンプレートが無かったらテンプレートを追加
      const template = new DivisionTemplate(myCountry);
      myCountry.addDivisionTemplate(template);
    }

    myCountry.getDivisionTemplates().forEach((template) => {
      const produceButton = new SpriteButton(
        resources[Resource.infantaly].texture
      );
      produceButton.on("click", () => {
        const divisionInfo = new DivisionInfo(template);
        console.log("division add");
        divisionInfo.createSprite();
        divisionInfo.setPosition(myCountry.getRandomOwnProvince()); //ランダムなプロビヴィンスに出現させる
      });
      products.addPart(produceButton);
    });
  }
}
