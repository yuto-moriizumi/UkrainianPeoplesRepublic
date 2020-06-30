import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import JsonObject from "./Utils/JsonObject";
import War from "./DiplomaticTies/War";
import Money from "./Money";
import DivisionInfo from "./DivisionInfo";
import Leader from "./Leader";
import CountryHandler from "./CountryHandler";
import Event from "./Events/Event";
import JsonType from "./Utils/JsonType";
export default class Country extends JsonObject {
    private __id;
    private static readonly SEA_ID;
    private _color;
    name: string;
    flag: string;
    private _culture;
    private __diplomaticTies;
    private _divisions;
    private __handler;
    __money: Money;
    private _leaders;
    private _leader;
    constructor(id: string);
    addDiplomaticRelation(tie: DiplomaticTie): void;
    removeDiplomaticRelation(tie: DiplomaticTie): void;
    getDiplomacy(): DiplomaticTie[];
    set color(color: string);
    getColor(): number;
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
    calcMaintanance(): number;
    /**
     * 時間単位の利益を計算します
     * @returns
     * @memberof Country
     */
    calcBalance(): number;
    update(): void;
    getDivisions(): DivisionInfo[];
    addDivision(division: DivisionInfo): void;
    removeDivision(division: DivisionInfo): void;
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
    private set culture(value);
    getCulture(): string;
    private set leaders(value);
    private set leader(value);
    getLeaders(): Map<string, Leader>;
    getLeader(): Leader;
    setHandler(handler: CountryHandler): void;
    onEvent(event: Event): void;
    replacer(key: string, value: any, type: JsonType): any[];
}
