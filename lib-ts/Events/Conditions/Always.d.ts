import Condition from "./Condition";
import Country from "../../Country/Country";
export default class Always extends Condition {
    private always;
    isValid(country: Country, date: Date): boolean;
}
