import Country from "./Country";
import JsonObject from "./JsonObject";
export default class DivisionTemplate extends JsonObject {
    private __owner;
    private organization;
    private attack;
    private divisions;
    get owner(): Country;
}
