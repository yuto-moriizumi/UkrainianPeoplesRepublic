import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";

export default interface DiplomacyObserver {
  onDiplomacyChange(tie: DiplomaticTie, isCreated: boolean);
}
