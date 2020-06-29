import DateAdapter from "../../DateAdapter";
import Jsonable from "../../Utils/Jsonable";
import JsonConverter from "../../Utils/JsonConverter";
import Country from "../../Country";
import DateCondition from "./DateCondition";
import EventFired from "./EventFired";
import CountryIs from "./CountryIs";
import And from "./And";

export default abstract class ConditionCreator {
  public static createCondition(condition: object) {
    switch (condition["type"]) {
      case "DateCondition":
        return Object.assign(new DateCondition(), condition);
      case "EventFired":
        return Object.assign(new EventFired(), condition);
      case "CountryIs":
        return Object.assign(new CountryIs(), condition);
      case "And":
        return Object.assign(new And(), condition);
      default:
        throw new Error("一致する条件クラスが見つかりませんでした:");
    }
  }
}
