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
import DivisionInfo from "../DivisionInfo";
import DivisionSprite from "../DivisionSprite";
import SelectScene from "../Scenes/SelectScene";
import Atlas from "../Map/Atlas";
import PoliticalMap from "../Map/PoliticalMap";
import CultureMap from "../Map/CultureMap";

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

   
  }
}
