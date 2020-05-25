import JsonObject from "./JsonObject";
import DivisionInfo from "./DivisionInfo";
export default class Combat extends JsonObject {
    private root;
    private target;
    static create(root: DivisionInfo, target: DivisionInfo): Combat;
    combat(): void;
    getRoot(): DivisionInfo;
    getTarget(): DivisionInfo;
    getOpponent(division: DivisionInfo): DivisionInfo;
}
