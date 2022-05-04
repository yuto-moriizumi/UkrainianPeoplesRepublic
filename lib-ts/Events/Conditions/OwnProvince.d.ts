import { Condition } from "./Condition";
import { Country } from "../../Country";
export class OwnProvince extends Condition {
  private province;
  isValid(country: Country, date: Date): boolean;
}
