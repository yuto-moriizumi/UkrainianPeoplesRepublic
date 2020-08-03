import Country from "../Country/Country";
import JsonObject from "../Utils/JsonObject";
import DivisionInfo from "./DivisionInfo";
export default class DivisionTemplate extends JsonObject {
    private __id;
    private organization;
    private attack;
    private speed;
    private cost;
    private maintenance;
    private aiProductionRate;
    private recoveryPerTime;
    constructor(id: any);
    getId(): string;
    getSpeed(): number;
    getAttack(): number;
    getOrganization(): number;
    getAiProductionRate(): number;
    getCost(): number;
    getMaintainance(): number;
    getRecoveryPerTime(): number;
    /**
     * 師団を生産します
     * 生産コストがかかります
     * @returns
     * @memberof DivisionTemplate
     */
    buildDivision(country: Country): DivisionInfo;
}
