import { Country } from "./Country";
import { DivisionInfo } from "./DivisionInfo";
import { VerticalBox } from "./UI/VerticalBox";
import { Province } from "Province";
import { PlayCountryObserver } from "PlayCountryObserver";
import { DiplomacyObserver } from "DiplomacyObserver";
import { DiplomaticTie } from "DiplomaticTies/DiplomaticTie";
export class DivisionSprite
  extends VerticalBox
  implements PlayCountryObserver, DiplomacyObserver
{
  private static readonly MINE_COLOR;
  private static readonly FRIEND_COLOR;
  private static readonly NEUTRAL_COLOR;
  private static readonly ENEMY_COLOR;
  private static selects;
  private info;
  private selected;
  private onMap;
  private organizationBar;
  constructor(info: DivisionInfo);
  getInfo(): DivisionInfo;
  setOnMap(flag: boolean): void;
  getOnMap(): boolean;
  select(): void;
  deselect(): void;
  private onClick;
  static moveSelectingDivisionsTo(province: Province): void;
  static hasSelectingDivisions(): boolean;
  setOrganizationRate(organizationRate: number): void;
  getPosition(): Province;
  onPlayCountryChange(country: Country): void;
  onDiplomacyChange(tie: DiplomaticTie, isCreated: boolean): void;
  destroy(): void;
}
