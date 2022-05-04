import { Country } from "../../Country";
import { JsonObject } from "../../Utils/JsonObject";
export abstract class Condition extends JsonObject {
  type: string;
  abstract isValid(root: Country, date: Date): boolean;
  toJSON(): any;
}
