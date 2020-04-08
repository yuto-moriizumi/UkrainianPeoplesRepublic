import DiplomaticTie from "./DiplomaticTie";
import MainScene from "./MainScene";
import Dialog from "./Dialog";

export default class War extends DiplomaticTie {
  public activate() {
    super.activate();
    MainScene.instance.addChild(
      new Dialog("宣戦布告", `${this.root.name}が${this.target.name}に宣戦布告`)
    );
  }
}
