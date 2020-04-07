import Condition from "./Condition";
import DateAdapter from "../../DateAdapter";

export default class DateCondition extends Condition {
  private type = this.constructor.name;
  private _when: DateAdapter;

  public set when(date: string) {
    if (typeof date === "string") {
      this._when = new DateAdapter(date);
      return;
    }
    this._when = date;
  }
  public isValid(date: Date): boolean {
    return date.getTime() >= this._when.getTime();
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
