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

export default class Conscription extends Sidebar {
  private scene: MainScene;

  constructor(scene: MainScene) {
    super("外交");
    this.scene = scene;
  }
}
