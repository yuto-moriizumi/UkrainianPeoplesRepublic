import Condition from "./Condition";

export default class DateCondition extends Condition {
  private type = this.constructor.name;
  private when: Date;
  public isValid(date: Date): boolean {
    return date.getTime() >= this.when.getTime();
  }
}
