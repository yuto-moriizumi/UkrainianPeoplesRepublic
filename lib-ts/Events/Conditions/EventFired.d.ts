import Condition from "./Condition";
import Country from "../../Country/Country";
export default class EventFired extends Condition {
    private id;
    isValid(country: Country, date: Date): boolean;
}
