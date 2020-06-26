import JsonObject from "./JsonObject";
import GameManager from "./GameManager";
import DivisionInfo from "DivisionInfo";

export default class Combat extends JsonObject {
  private attacker: DivisionInfo;
  private defender: DivisionInfo;

  public static create(root: DivisionInfo, target: DivisionInfo) {
    const combat = new Combat();
    combat.attacker = root;
    combat.defender = target;
    root.addCombat(combat);
    target.addCombat(combat);
    GameManager.instance.data.addCombat(combat);
    console.log("combat start", root, target);
    return combat;
  }

  public combat() {
    if (this.attacker.getOrganization() <= 0) {
      if (this.defender.getOrganization() <= 0) {
        //引き分けである
        this.attacker.stopMove();
        this.defender.stopMove();
        this.endCombat();
        return;
      } else {
        //防衛側の勝ち
        this.attacker.destroy(); //攻撃側は死ぬ
        this.endCombat();
        return;
      }
    } else if (this.defender.getOrganization() <= 0) {
      //攻撃側の勝ち
      this.defender.destroy(); //防衛側は死ぬ
      this.endCombat();
      return;
    }
    //戦闘は継続する
    console.log(
      "combat now",
      this.attacker.getOrganization(),
      this.defender.getOrganization()
    );
    this.attacker.attack(this.defender);
    this.defender.attack(this.attacker);
  }

  private endCombat() {
    console.log("combat finished", this.attacker, this.defender);

    GameManager.instance.data.removeCombat(this);
    this.attacker.removeCombat(this);
    this.defender.removeCombat(this);
  }

  public getRoot(): DivisionInfo {
    return this.attacker;
  }

  public getTarget(): DivisionInfo {
    return this.defender;
  }

  public getOpponent(division: DivisionInfo) {
    return this.getRoot() === division ? this.getTarget() : this.getRoot();
  }
}
