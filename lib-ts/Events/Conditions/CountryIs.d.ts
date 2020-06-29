import Condition from "./Condition";
import Country from "../../Country";
export default class CountryIs extends Condition {
    private _country;
    isValid(country: Country, date: Date): boolean;
    private set country(value);
    toJSON(): any;
}
