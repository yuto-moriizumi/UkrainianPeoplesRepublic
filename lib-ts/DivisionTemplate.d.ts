import Country from "./Country";
import Jsonable from "./Jsonable";
import Division from "./Division";
export default class DivisionTemplate implements Jsonable {
    private __owner;
    private organization;
    private attack;
    private speed;
    private _divisions;
    constructor(owner: Country);
    get owner(): Country;
    set divisions(divisions: Array<any>);
    getSpeed(): number;
    getAttack(): number;
    getOrganization(): number;
    addDivision(division: Division): void;
    removeDivision(division: Division): void;
    getDivisions(): Division[];
    update(): void;
    toJSON(): any;
}
