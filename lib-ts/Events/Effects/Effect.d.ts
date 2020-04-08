import JsonObject from "../../JsonObject";
export default abstract class Effect extends JsonObject {
    abstract activate(): void;
}
