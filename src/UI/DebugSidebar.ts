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
import DivisionSprite from "../Division";
import SelectScene from "../Scenes/SelectScene";

export default class DebugSidebar extends Sidebar {
  constructor(scene: MainScene) {
    super("デバッグ");
    const button = new Button("師団瞬間移動をON");
    let buttonState = false;
    button.on("click", () => {
      if (buttonState) button.setText("師団瞬間移動をON");
      button.setText("師団瞬間移動をOFF");
      buttonState = !buttonState;
      scene.moveCheat = buttonState;
    });
    this.addPart(button);
  }
}
