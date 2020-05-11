import DiplomaticTie from "./DiplomaticTie";
import MainScene from "../Scenes/MainScene";
import Dialog from "../UI/Dialog";
import Sound from "../Sound";
import GameManager from "../GameManager";
import Resource from "../Resources";

export default class War extends DiplomaticTie {
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
}
