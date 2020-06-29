import DateAdapter from "../../DateAdapter";
import Jsonable from "../../Utils/Jsonable";
import JsonConverter from "../../Utils/JsonConverter";
import Country from "../../Country";

export default abstract class Condition implements Jsonable {
  type = this.constructor.name;
  public abstract isValid(root: Country, date: Date): boolean;
  public toJSON() {
    return JsonConverter.toJSON(this);
  }
}
