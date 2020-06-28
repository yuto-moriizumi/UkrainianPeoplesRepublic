import Sidebar from "./Sidebar";
import * as PIXI from "pixi.js";
import MainScene from "../Scenes/MainScene";
import Province from "../Province";

export default class ProvinceSidebar extends Sidebar {
  constructor(scene: MainScene, province: Province) {
    super("プロヴィンス情報");

    const idText = new PIXI.Text(
      province.getId(),
      new PIXI.TextStyle({
        fill: 0xffffff,
      })
    );
    this.addPart(idText);

    const owner = new PIXI.Text(
      "領有国：" + province.getOwner().name,
      new PIXI.TextStyle({
        fill: 0xffffff,
      })
    );
    this.addPart(owner);
  }
}
