import { Condition } from "./Condition";
import { Country } from "../../Country";
export class AtWarWith extends Condition {
  private country;
  isValid(country: Country, date: Date): boolean;
}
