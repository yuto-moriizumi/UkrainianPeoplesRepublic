import Effect from "./Effect";
export default class ChangeName extends Effect {
    private type;
    private _country;
    private name;
    activate(): void;
    set country(countryId: string);
    createEntries(): any[][];
}
