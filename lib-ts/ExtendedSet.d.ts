import JsonObject from "./JsonObject";
export default class ExtendedSet<T> extends JsonObject {
    private set;
    constructor(array?: any);
    add(value: T): void;
    delete(value: T): boolean;
    has(value: T): boolean;
    forEach(callback: (value: T) => void): void;
    some(callback: (value: T) => boolean): boolean;
    filter(callback: (value: T) => boolean): T[];
    toJSON(): object;
}
