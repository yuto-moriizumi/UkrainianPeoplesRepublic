import Condition from "./Condition";
import Country from "../../Country/Country";
export default class OwnProvince extends Condition {
    private province;
    isValid(country: Country, date: Date): boolean;
}
