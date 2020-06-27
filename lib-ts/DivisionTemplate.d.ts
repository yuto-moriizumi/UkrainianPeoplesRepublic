import Country from "./Country";
import JsonObject from "./JsonObject";
import DivisionInfo from "./DivisionInfo";
export default class DivisionTemplate extends JsonObject {
    private __owner;
    private organization;
    private attack;
    private speed;
    private cost;
    private maintenance;
    private _divisions;
    constructor(owner: Country);
    get owner(): Country;
    getSpeed(): number;
    getAttack(): number;
    getOrganization(): number;
    addDivision(division: DivisionInfo): void;
    removeDivision(division: DivisionInfo): void;
    getDivisions(): DivisionInfo[];
    update(): void;
    createDivisionsSprites(): void;
    getCost(): number;
    calcTotalMaintanance(): number;
    private set divisions(value);
}
