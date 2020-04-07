import MainScene from "../MainScene";
export default class Event {
    private id;
    private title;
    private desc;
    private picture;
    private fired;
    private _condition;
    private options;
    dispatch(scene: MainScene, date: Date): void;
    set condition(condition: any);
    toJSON(): object;
}
