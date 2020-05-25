import JsonObject from "./JsonObject";
import DivisionInfo from "./DivisionInfo";
import GameManager from "./GameManager";

export default class Combat extends JsonObject {
  private root: DivisionInfo;
  private target: DivisionInfo;

  public static create(root: DivisionInfo, target: DivisionInfo) {
    const combat = new Combat();
    combat.root = root;
    combat.target = target;
    GameManager.instance.data.addCombat(combat);
    return combat;
  }

  public combat() {
    if (this.root.organization <= 0) {
      if (this.target.organization <= 0) {
        //引き分けである
        GameManager.instance.data.removeCombat(this);
        return;
      } else {
        //防衛側の勝ち
        GameManager.instance.data.removeCombat(this);
        return;
      }
    } else if (this.target.organization <= 0) {
      //攻撃側の勝ち
      GameManager.instance.data.removeCombat(this);
      return;
    }
    //戦闘は継続する
    this.root.attack(this.target);
    this.target.attack(this.root);
  }

  public getRoot(): DivisionInfo {
    return this.root;
  }

  public getTarget(): DivisionInfo {
    return this.target;
  }

  public getOpponent(division: DivisionInfo) {
    return this.getRoot() === division ? this.getTarget() : this.getRoot();
  }
}
