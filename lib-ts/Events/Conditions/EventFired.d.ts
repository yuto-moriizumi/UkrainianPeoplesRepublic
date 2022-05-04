import { Condition } from "./Condition";
import { Country } from "../../Country";
export class EventFired extends Condition {
  private id;
  isValid(country: Country, date: Date): boolean;
}
