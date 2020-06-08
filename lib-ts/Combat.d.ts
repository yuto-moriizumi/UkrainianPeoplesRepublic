import JsonObject from "./JsonObject";
import Division from "Division";
export default class Combat extends JsonObject {
    private attacker;
    private defender;
    static create(root: Division, target: Division): Combat;
    combat(): void;
    private endCombat;
    getRoot(): Division;
    getTarget(): Division;
    getOpponent(division: Division): Division;
}
