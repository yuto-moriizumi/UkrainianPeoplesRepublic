import MainScene from "../Scenes/MainScene";
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
    isDispatchable(date: Date): boolean;
    dispatch(scene: MainScene, date: Date): void;
    set condition(condition: any);
    set options(options: Array<any>);
    get options(): Array<any>;
    getId(): string;
    setTime2happen(time2happen: any): void;
    countFoward(): void;
    isFired(): boolean;
    toJSON(): object;
}
