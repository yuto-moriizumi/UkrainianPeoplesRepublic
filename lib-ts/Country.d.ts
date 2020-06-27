import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import War from "./DiplomaticTies/War";
import DivisionTemplate from "./DivisionTemplate";
import Jsonable from "./Jsonable";
import Money from "./Money";
export default class Country implements Jsonable {
    private __id;
    private static readonly SEA_ID;
    private _color;
    name: string;
    flag: string;
    private __diplomaticTies;
    private _templates;
    private __ai;
    __money: Money;
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
    private set templates(value);
    /**
     * 所有しているプロヴィンスのうち、ランダムに1つを選ぶ
     *
     * @returns
     * @memberof Country
     */
    getRandomOwnProvince(): any;
    getWarInfoWith(country: Country): War;
    hasWar(): boolean;
    calcMaintanance(): number;
    calcBalance(): number;
    update(): void;
    /**
     * 何らかの理由で国が消滅する場合に呼ぶ
     * オブジェクトが消えるわけではない
     * @memberof Country
     */
    destroy(): void;
    /**
     * この国が指定の国に対して軍事通行権を有しているか
     * @param {Country} country
     * @memberof Country
     */
    hasAccessTo(country: Country): boolean;
    toJSON(): any;
}
