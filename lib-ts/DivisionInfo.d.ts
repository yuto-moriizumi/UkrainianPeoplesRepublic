import Country from "./Country";
import JsonObject from "./JsonObject";
export default class DivisionInfo extends JsonObject {
    private __template;
    private _position;
    private organization;
    set position(provinceId: string);
    get owner(): Country;
}
