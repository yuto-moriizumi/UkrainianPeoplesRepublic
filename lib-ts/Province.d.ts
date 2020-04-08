import Country from "./Country";
import JsonObject from "./JsonObject";
export default class Province extends JsonObject {
    id: number;
    owner: Country;
    constructor(id: string, obj: any);
    setOwner(owner: Country): void;
    createEntries(): any[][];
}
