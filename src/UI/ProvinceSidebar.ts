import Sidebar from "./Sidebar";
import * as PIXI from "pixi.js";
import MainScene from "../Scenes/MainScene";
import Province from "../Province";
import Button from "./Button";

export default class ProvinceSidebar extends Sidebar {
  private static culture_spoit: string;
  private cultureButton: Button;
  constructor(scene: MainScene, province: Province) {
    super("プロヴィンス情報");

    if (ProvinceSidebar.culture_spoit == undefined)
      ProvinceSidebar.culture_spoit = MainScene.instance
        .getMyCountry()
        .getCulture();

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

    const culture = new PIXI.Text(
      "文化：" + province.getCulture(),
      new PIXI.TextStyle({
        fill: 0xffffff,
      })
    );
    this.addPart(culture);

    this.cultureButton = new Button(
      "文化を" + ProvinceSidebar.culture_spoit + "に変更"
    );
    this.cultureButton.on("click", () => {
      province.setCulture(ProvinceSidebar.culture_spoit);
    });
    this.addPart(this.cultureButton);

    const culture2mine = new Button("文化をスポイト");
    culture2mine.on("click", () => {
      ProvinceSidebar.culture_spoit = province.getCulture();
      this.cultureButton.setText(
        "文化を" + ProvinceSidebar.culture_spoit + "に変更"
      );
    });
    this.addPart(culture2mine);
  }
}
