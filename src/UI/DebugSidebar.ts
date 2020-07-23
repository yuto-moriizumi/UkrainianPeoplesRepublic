import Sidebar from "./Sidebar";
import Country from "../Country/Country";
import Flag from "./Flag";
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
import DivisionInfo from "../DivisionInfo";
import DivisionSprite from "../DivisionSprite";
import SelectScene from "../Scenes/SelectScene";
import Atlas from "../Map/Atlas";
import PoliticalMap from "../Map/PoliticalMap";
import CultureMap from "../Map/CultureMap";
import JsonType from "../Utils/JsonType";

export default class DebugSidebar extends Sidebar {
  constructor(scene: MainScene) {
    super("デバッグ");

    const move_cheat = new Button("師団瞬間移動");
    move_cheat.on("click", () => {
      scene.cheat_move = !scene.cheat_move;
    });
    this.addPart(move_cheat);

    const money_cheat = new Button("金追加");
    money_cheat.on("click", () => {
      scene
        .getMyCountry()
        .__money.setMoney(scene.getMyCountry().__money.getMoney() * 2 + 10);
    });
    this.addPart(money_cheat);

    const mode2political = new Button("政治マップへ");
    mode2political.on("click", () =>
      Atlas.instance.setMode(new PoliticalMap())
    );
    this.addPart(mode2political);

    const mode2culture = new Button("文化マップへ");
    mode2culture.on("click", () => Atlas.instance.setMode(new CultureMap()));
    this.addPart(mode2culture);

    //ダウンロードボタン
    const renderer = GameManager.instance.game.renderer;
    const button = new Button("GameData");
    button.on("mousedown", () => {
      GameManager.instance.data.download(JsonType.GameData);
    });
    this.addPart(button);

    const button2 = new Button("SaveData");
    button2.on("mousedown", () => {
      GameManager.instance.data.download(JsonType.SaveData);
    });
    this.addPart(button2);

    //プロヴィンスグラフを生成する
    const button3 = new Button("プロヴィンスグラフを作成");
    button3.on("mousedown", () => {
      Atlas.instance.generateProvinceGraph();
    });
    this.addPart(button3);

    //重心を再計算
    const button4 = new Button("重心再計算");
    button4.on("mousedown", () => {
      Atlas.instance.calculateBarycenterOfAll();
    });
    this.addPart(button4);
  }
}
