import Condition from "./Condition";
import Country from "../../Country";
export default class EventFired extends Condition {
    private type;
    private id;
    isValid(country: Country, date: Date): boolean;
}
