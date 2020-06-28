import JsonObject from "./JsonObject";
export default class ExtendedArray<T> extends JsonObject {
    private class;
    private array;
    constructor(array?: Array<T>);
    map(callback: (value: T) => T): this;
    forEach(callback: (value: T) => void): void;
    fromJson(obj: object): this;
}
