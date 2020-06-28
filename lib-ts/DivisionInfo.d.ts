import Country from "./Country";
import Province from "./Province";
import DivisionTemplate from "./DivisionTemplate";
import Combat from "./Combat";
import DivisionSprite from "./DivisionSprite";
export default class DivisionInfo {
    private __template;
    private _position;
    private organization;
    private __sprite;
    private _destination;
    private movingProgress;
    private __progressBar;
    private __combats;
    private __dead;
    private __owner;
    constructor(owner: Country);
    setTemplate(template: DivisionTemplate): void;
    createSprite(): void;
    applyCost(): void;
    set position(provinceId: string);
    set destination(provinceId: string);
    getMaintainance(): number;
    setPosition(province: Province): void;
    getPosition(): Province;
    get owner(): Country;
    get sprite(): DivisionSprite;
    attack(target: DivisionInfo): void;
    getOrganization(): number;
    setOrganization(organization: number): void;
    movableTo(province: Province): true | import("./DiplomaticTies/War").default;
    getTemplate(): DivisionTemplate;
    moveTo(destination: Province): void;
    private hasCombatWith;
    addCombat(combat: Combat): void;
    removeCombat(combat: Combat): void;
    destroy(): void;
    stopMove(): void;
    isMoving(): boolean;
    isFighting(): boolean;
    update(): void;
    private toJSON;
}
