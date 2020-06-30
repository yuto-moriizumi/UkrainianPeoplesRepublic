import Effect from "./Effect";
import JsonType from "../../Utils/JsonType";
export default class SetOwner extends Effect {
    private type;
    private _root;
    private _provinces;
    activate(): void;
    set root(countryId: string);
    set provinces(provinceIds: Array<string>);
    replacer(key: string, value: any, type: JsonType): any[];
}
