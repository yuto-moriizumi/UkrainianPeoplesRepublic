import Effect from "./Effect";
export default class Annex extends Effect {
    private type;
    private _root;
    private _target;
    activate(): void;
    set root(countryId: string);
    set target(countryId: string);
    createEntries(): any[][];
}
