import Country from "../Country";
import JsonType from "../Utils/JsonType";
import JsonObject from "../Utils/JsonObject";
export default abstract class DiplomaticTie extends JsonObject {
    private type;
    static readonly root_icon: string;
    static readonly target_icon: string;
    protected root: Country;
    protected target: Country;
    protected active: boolean;
    constructor(root: Country, target: Country);
    getRoot(): Country;
    getTarget(): Country;
    getOpponent(country: Country): Country;
    activate(): void;
    deactivate(): void;
    abstract getRootIcon(): any;
    abstract getTargetIcon(): any;
    replacer(key: string, value: any, type: JsonType): any[];
}
