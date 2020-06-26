import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import War from "./DiplomaticTies/War";
import DivisionTemplate from "./DivisionTemplate";
import Jsonable from "./Jsonable";
export default class Country implements Jsonable {
    private __id;
    private _color;
    name: string;
    flag: string;
    private diplomaticTies;
    private _templates;
    private ai;
    constructor(id: string);
    addDiplomaticRelation(tie: DiplomaticTie): void;
    removeDiplomaticRelation(tie: DiplomaticTie): void;
    getDiplomacy(): DiplomaticTie[];
    set color(color: string);
    getColor(): number;
    addDivisionTemplate(template: DivisionTemplate): void;
    getDivisionTemplates(): DivisionTemplate[];
    hasAnyDivisionTemplate(): boolean;
    get id(): string;
    private set divisions(value);
    /**
     * 所有しているプロヴィンスのうち、ランダムに1つを選ぶ
     *
     * @returns
     * @memberof Country
     */
    getRandomOwnProvince(): any;
    getWarInfoWith(country: Country): War;
    hasWar(): boolean;
    update(): void;
    toJSON(): any;
}
