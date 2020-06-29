import Condition from "./Condition";
import GameManager from "../../GameManager";

export default class EventFired extends Condition {
  private type = this.constructor.name;
  private id: string;

  public isValid(date: Date): boolean {
    let ans = false;
    GameManager.instance.data.getEvents().forEach((event) => {
      if (event.getId() != this.id) return;
      ans = event.isFired();
    });
    return ans;
  }

  public toJSON(): object {
    return Object.fromEntries(
      Object.entries(this).map(([key, value]) => {
        if (key.startsWith("_")) return [key.substr(1), value];
        return [key, value];
      })
    );
  }
}
