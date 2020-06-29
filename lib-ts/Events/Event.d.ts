import MainScene from "../Scenes/MainScene";
export default class Event {
    private id;
    private title;
    private desc;
    private picture;
    private fired;
    private _condition;
    private _options;
    dispatch(scene: MainScene, date: Date): void;
    set condition(condition: any);
    set options(options: Array<any>);
    get options(): Array<any>;
    getId(): string;
    toJSON(): object;
}
