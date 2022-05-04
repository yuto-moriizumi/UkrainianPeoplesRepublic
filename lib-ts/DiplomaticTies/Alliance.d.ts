import { DiplomaticTie } from "./DiplomaticTie";
export class Alliance extends DiplomaticTie {
  static readonly root_icon: string;
  static readonly target_icon: string;
  getRootIcon(): string;
  getTargetIcon(): string;
}
