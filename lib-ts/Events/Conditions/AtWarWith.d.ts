import Condition from "./Condition";
import Country from "../../Country/Country";
export default class AtWarWith extends Condition {
    private country;
    isValid(country: Country, date: Date): boolean;
}
