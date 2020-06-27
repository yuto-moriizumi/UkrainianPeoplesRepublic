import DiplomaticTie from "./DiplomaticTie";
/**
 * root国がtarget国に軍事通行権を持つことを表す
 * @export
 * @class Access
 * @extends {DiplomaticTie}
 */
export default class Access extends DiplomaticTie {
    readonly icon: string;
    readonly target_icon: string;
}
