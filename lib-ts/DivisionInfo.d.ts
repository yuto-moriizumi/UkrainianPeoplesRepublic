import Country from "./Country";
import JsonObject from "./JsonObject";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
import DivisionSprite from "./DivisionSprite";
export default class DivisionInfo extends JsonObject {
    private __template;
    private _position;
    private _organization;
    private __sprite;
    private _destination;
    private movingProgress;
    private __progressBar;
    constructor(template: DivisionTemplate);
    set position(provinceId: string);
    set destination(provinceId: string);
    setPosition(province: Province): void;
    getPosition(): Province;
    get owner(): Country;
    get sprite(): DivisionSprite;
    attack(target: DivisionInfo): void;
    get organization(): number;
    set organization(organization: number);
    getTemplate(): DivisionTemplate;
    moveTo(destination: Province): void;
    update(): void;
}
