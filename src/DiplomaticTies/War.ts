import DiplomaticTie from "./DiplomaticTie";
import MainScene from "../Scenes/MainScene";
import Dialog from "../UI/Dialog";
import Sound from "../Sound";
import GameManager from "../GameManager";
import Resource from "../Resources";
import Country from "../Country/Country";
import Observable from "Observable";

export default class War extends DiplomaticTie {
  public static readonly root_icon = Resource.war;
  public static readonly target_icon = Resource.war;

  constructor(root: Country, target: Country) {
    super(root, target);
  }

  public activate() {
    super.activate();
    MainScene.instance.addChild(
      new Dialog("宣戦布告", `${this.root.name}が${this.target.name}に宣戦布告`)
    );
    //SE再生
    const sound = new Sound(
      (GameManager.instance.game.loader.resources[
        Resource.se.declare_war
      ] as any).buffer
    );
    sound.volume = 0.5;
    sound.play(false);
  }

  public deactivate() {
    super.deactivate();
    MainScene.instance.addChild(
      new Dialog(
        "終戦",
        `${this.root.name}と${this.target.name}との戦争は終結した`
      )
    );
    //SE再生
    const sound = new Sound(
      (GameManager.instance.game.loader.resources[
        Resource.se.declare_war
      ] as any).buffer
    );
    sound.volume = 0.5;
    sound.play(false);
  }
  public getRootIcon() {
    return War.root_icon;
  }
  public getTargetIcon() {
    return War.target_icon;
  }
}
