import JsonObject from "../../Utils/JsonObject";
export default abstract class Effect extends JsonObject {
    abstract activate(): void;
}
