import Option from "./Option";
import CountryHandler from "../CountryHandler";
import Country from "../Country";
import JsonObject from "../Utils/JsonObject";
export default class Event extends JsonObject {
    private __id;
    private title;
    private desc;
    private picture;
    private fired;
    private _condition;
    private _options;
    private time2happen;
    private triggeredOnly;
    /**
     * グローバルイベントであるかどうか
     * グローバルイベントは、いずれかの国で発火されたときに、全ての国で発火します
     * ニュース的イベントに使用して下さい
     * @private
     * @memberof Event
     */
    private isGlobal;
    isDispatchable(country: Country, date: Date): boolean;
    dispatch(dispatcher: CountryHandler, date: Date): void;
    set condition(condition: object);
    set options(options: Array<any>);
    getOptions(): Option[];
    getId(): string;
    setTime2happen(time2happen: any): void;
    countFoward(): void;
    isFired(): boolean;
    getDesc(): string;
    getTitle(): string;
    showDialog(): void;
}
