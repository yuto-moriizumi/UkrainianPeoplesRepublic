import DiplomaticTie from "./DiplomaticTie";
import JsonObject from "./JsonObject";
export default class Country extends JsonObject {
    id: string;
    private _color;
    name: string;
    flag: string;
    private diplomaticTies;
    addDiplomaticRelation(tie: DiplomaticTie): void;
    getDiplomacy(): DiplomaticTie[];
    set color(color: string);
    getColor(): number;
    hasWarWith(country: Country): boolean;
    createEntries(): any[][];
}
