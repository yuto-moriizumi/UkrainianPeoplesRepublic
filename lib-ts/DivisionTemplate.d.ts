import Country from "./Country";
import JsonObject from "./JsonObject";
import DivisionInfo from "./DivisionInfo";
export default class DivisionTemplate extends JsonObject {
    private __owner;
    private organization;
    private attack;
    private speed;
    private divisions;
    constructor(owner: Country);
    get owner(): Country;
    getSpeed(): number;
    addDivision(division: DivisionInfo): void;
    update(): void;
}
