import { DiplomaticTie } from "./DiplomaticTie";
import Resource from "../Resources";

/**
 * root国がtarget国に軍事通行権を持つことを表す
 * @export
 * @class Access
 * @extends {DiplomaticTie}
 */
export class Access extends DiplomaticTie {
  public static readonly root_icon = Resource.access_root;
  public static readonly target_icon = Resource.access_target;

  public getRootIcon() {
    return Access.root_icon;
  }
  public getTargetIcon() {
    return Access.target_icon;
  }
}
