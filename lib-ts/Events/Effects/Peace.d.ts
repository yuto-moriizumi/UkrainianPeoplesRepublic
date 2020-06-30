import Effect from "./Effect";
import JsonType from "../../Utils/JsonType";
export default class Peace extends Effect {
    private type;
    private _root;
    private _target;
    activate(): void;
    set root(countryId: string);
    set target(countryId: string);
    replacer(key: string, value: any, type: JsonType): any[];
}
