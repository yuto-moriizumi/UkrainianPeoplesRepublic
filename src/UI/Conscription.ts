import Sidebar from "./Sidebar";
import MainScene from "../Scenes/MainScene";
import GameManager from "../GameManager";
import Resource from "../Resources";
import HorizontalBox from "./HorizontalBox";
import SpriteButton from "./SpriteButton";

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

    GameManager.instance.data.getTemplates().forEach((template) => {
      const produceButton = new SpriteButton(
        resources[Resource.infantaly].texture
      );
      produceButton.on("click", () => {
        template.buildDivision(scene.getMyCountry());
      });
      products.addPart(produceButton);
    });
  }
}
