import DateAdapter from "../../DateAdapter";

export default abstract class Condition {
  public abstract isValid(date: Date): boolean;
}
