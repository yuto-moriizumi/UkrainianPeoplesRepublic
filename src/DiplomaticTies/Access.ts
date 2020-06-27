import DiplomaticTie from "./DiplomaticTie";
import Resource from "../Resources";

/**
 * root国がtarget国に軍事通行権を持つことを表す
 * @export
 * @class Access
 * @extends {DiplomaticTie}
 */
export default class Access extends DiplomaticTie {
  public readonly icon = Resource.access_root;
  public readonly target_icon = Resource.access_target;
}
