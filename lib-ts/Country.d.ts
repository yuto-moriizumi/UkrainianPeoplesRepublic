import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import JsonObject from "./JsonObject";
import DivisionTemplate from "./DivisionTemplate";
export default class Country extends JsonObject {
    id: string;
    private _color;
    name: string;
    flag: string;
    private diplomaticTies;
    private divisions;
    addDiplomaticRelation(tie: DiplomaticTie): void;
    getDiplomacy(): DiplomaticTie[];
    set color(color: string);
    getColor(): number;
    addDivisionTemplate(template: DivisionTemplate): void;
    getDivisionTemplates(): DivisionTemplate[];
    hasAnyDivisionTemplate(): boolean;
    /**
     * 所有しているプロヴィンスのうち、ランダムに1つを選ぶ
     *
     * @returns
     * @memberof Country
     */
    getRandomOwnProvince(): any;
    hasWarWith(country: Country): boolean;
    createEntries(): any[][];
}
