import { JsonObject } from "./Utils/JsonObject";
import { DivisionInfo } from "./DivisionInfo";
export class Combat extends JsonObject {
  private attacker;
  private defender;
  static create(root: DivisionInfo, target: DivisionInfo): Combat;
  combat(): void;
  private endCombat;
  getRoot(): DivisionInfo;
  getTarget(): DivisionInfo;
  getOpponent(division: DivisionInfo): DivisionInfo;
}
