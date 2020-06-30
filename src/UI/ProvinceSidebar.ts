import Sidebar from "./Sidebar";
import * as PIXI from "pixi.js";
import MainScene from "../Scenes/MainScene";
import Province from "../Province";
import Button from "./Button";
import Atlas from "../Map/Atlas";

export default class ProvinceSidebar extends Sidebar {
  private static culture_spoit: string;
  private static province_spoit: Province;
  private cultureButton: Button;
  private provinceButton: Button;
  private provinceButton2: Button;

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

    this.provinceButton = new Button(
      ProvinceSidebar.province_spoit
        ? ProvinceSidebar.province_spoit.getId() +
          "と" +
          province.getId() +
          "を接続"
        : "プロビ未設定"
    );
    this.provinceButton.on("click", () => {
      province.getNeighbours().add(ProvinceSidebar.province_spoit.getId());
      ProvinceSidebar.province_spoit.getNeighbours().add(province.getId());
    });
    this.addPart(this.provinceButton);

    this.provinceButton2 = new Button(
      ProvinceSidebar.province_spoit
        ? ProvinceSidebar.province_spoit.getId() +
          "と" +
          province.getId() +
          "を接続解除"
        : "プロビ未設定"
    );
    this.provinceButton2.on("click", () => {
      province.getNeighbours().delete(ProvinceSidebar.province_spoit.getId());
      ProvinceSidebar.province_spoit.getNeighbours().delete(province.getId());
    });
    this.addPart(this.provinceButton2);

    const province2mine = new Button("プロビをスポイト");
    province2mine.on("click", () => {
      ProvinceSidebar.province_spoit = province;
      this.provinceButton.setText(
        ProvinceSidebar.province_spoit.getId() +
          "と" +
          province.getId() +
          "を接続"
      );
      this.provinceButton2.setText(
        ProvinceSidebar.province_spoit.getId() +
          "と" +
          province.getId() +
          "を接続解除"
      );
    });
    this.addPart(province2mine);

    //プロヴィンスグラフを表示する
    const button4 = new Button("プロヴィンスグラフを切替");
    button4.on("mousedown", () => {
      Atlas.instance.switchProvinceGraph();
    });
    this.addPart(button4);

    //重心を再計算
    const button5 = new Button("重心再計算");
    button5.on("mousedown", () => {
      Atlas.instance.calculateBarycenterOfAll();
    });
    this.addPart(button5);
  }
}
