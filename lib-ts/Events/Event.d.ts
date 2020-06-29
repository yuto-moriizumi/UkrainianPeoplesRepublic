import CountryHandler from "../CountryHandler";
import Country from "../Country";
export default class Event {
    private __id;
    private title;
    private desc;
    private picture;
    private fired;
    private _condition;
    private _options;
    private time2happen;
    private triggeredOnly;
    isDispatchable(country: Country, date: Date): boolean;
    dispatch(dispatcher: CountryHandler, date: Date): void;
    set condition(condition: object);
    set options(options: Array<any>);
    get options(): Array<any>;
    getId(): string;
    setTime2happen(time2happen: any): void;
    countFoward(): void;
    isFired(): boolean;
    getDesc(): string;
    getTitle(): string;
    showDialog(): void;
    toJSON(): object;
}
