import Country from "./Country";
import JsonObject from "./JsonObject";
import DivisionInfo from "./DivisionInfo";
export default class DivisionTemplate extends JsonObject {
    private __owner;
    private organization;
    private attack;
    private divisions;
    constructor(owner: Country);
    get owner(): Country;
    addDivision(division: DivisionInfo): void;
}
