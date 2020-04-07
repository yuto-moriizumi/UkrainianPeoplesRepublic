import Effect from "./Effect";
export default class DeclareWar extends Effect {
    private type;
    private _root;
    private _target;
    activate(): void;
    set root(country: object);
    set target(country: object);
}
