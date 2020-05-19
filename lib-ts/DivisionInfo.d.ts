import Country from "./Country";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
export default class DivisionInfo extends JsonObject {
    private __template;
    private _position;
    private organization;
    private __sprite;
    private _destination;
    private movingProgress;
    constructor(template: DivisionTemplate);
    set position(provinceId: string);
    set destination(provinceId: string);
    setPosition(province: Province): void;
    getPosition(): Province;
    get owner(): Country;
    moveTo(destination: Province): void;
    update(): void;
}
