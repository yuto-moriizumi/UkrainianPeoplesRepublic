import { DiplomaticTie } from "./DiplomaticTies/DiplomaticTie";

export interface DiplomacyObserver {
  onDiplomacyChange(tie: DiplomaticTie, isCreated: boolean);
}
