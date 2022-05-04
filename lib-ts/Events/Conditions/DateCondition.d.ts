import { Condition } from "./Condition";
import { Country } from "../../Country";
export class DateCondition extends Condition {
  private _when;
  set when(date: string);
  isValid(country: Country, date: Date): boolean;
}
