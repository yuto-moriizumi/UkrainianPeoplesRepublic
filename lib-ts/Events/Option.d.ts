export default class Option {
    private title;
    private _effects;
    set effects(effects: Array<any>);
    getTitle(): string;
    toJson(): string;
}
