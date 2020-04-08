import JsonObject from "../JsonObject";
export default class Option extends JsonObject {
    private title;
    private _effects;
    /**
     * Object.assignで使用するためのセッタ
     * @private
     * @memberof Option
     */
    private set effects(value);
    takeEffects(): void;
    getTitle(): string;
}
