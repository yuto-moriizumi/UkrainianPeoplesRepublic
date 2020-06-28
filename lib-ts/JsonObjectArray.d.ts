import JsonObject from "./JsonObject";
export default abstract class JsonObjectArray extends JsonObject {
    array: Array<JsonObject>;
    constructor(array?: Array<JsonObject>);
    map(callback: (value: JsonObject) => JsonObject): this;
    forEach(callback: (value: JsonObject) => void): void;
    fromJson(obj: object): this;
    abstract createItem(): JsonObject;
}
