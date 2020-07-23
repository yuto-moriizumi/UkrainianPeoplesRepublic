import DateAdapter from "../../Utils/DateAdapter";
import JsonConverter from "../../Utils/JsonConverter";
import Country from "../../Country/Country";
import JsonObject from "../../Utils/JsonObject";

export default abstract class Condition extends JsonObject {
  type = this.constructor.name;
  public abstract isValid(root: Country, date: Date): boolean;
  public toJSON() {
    return JsonConverter.toJSON(this);
  }
}
