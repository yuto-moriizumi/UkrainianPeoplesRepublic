import DiplomaticTie from "./DiplomaticTie";
import Resource from "../Resources";

export default class Alliance extends DiplomaticTie {
  public static readonly root_icon = Resource.alliance_icon;
  public static readonly target_icon = Alliance.root_icon;

  public getRootIcon() {
    return Alliance.root_icon;
  }
  public getTargetIcon() {
    return Alliance.target_icon;
  }
}
