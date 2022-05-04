import { DiplomaticTie } from "./DiplomaticTie";
/**
 * root国がtarget国に軍事通行権を持つことを表す
 * @export
 * @class Access
 * @extends {DiplomaticTie}
 */
export class Access extends DiplomaticTie {
  static readonly root_icon: string;
  static readonly target_icon: string;
  getRootIcon(): string;
  getTargetIcon(): string;
}
