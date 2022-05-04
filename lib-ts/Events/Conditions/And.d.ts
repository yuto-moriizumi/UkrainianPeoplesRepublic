import { Condition } from "./Condition";
import { Country } from "../../Country";
export class And extends Condition {
  private _conditions;
  set conditions(conditions: object[]);
  isValid(country: Country, date: Date): boolean;
}
