import { Condition } from "./Condition";
import { Country } from "../../Country";
export class Always extends Condition {
  private always;
  isValid(country: Country, date: Date): boolean;
}
