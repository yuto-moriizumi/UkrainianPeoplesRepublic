import Effect from "./Effect";
export default class SetOwner extends Effect {
    private type;
    private _root;
    private _provinces;
    activate(): void;
    set root(countryId: string);
    set provinces(provinceIds: Array<string>);
    createEntries(): any[][];
}
