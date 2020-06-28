import MainScene from "../Scenes/MainScene";
import JsonObject from "../JsonObject";
export default class Event extends JsonObject {
    private class;
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
    toJSON(): object;
    fromJson(obj: object): this;
}
