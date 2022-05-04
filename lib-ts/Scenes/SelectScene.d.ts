import { Scene } from "./Scene";
import { LoaderAddParam } from "../Utils/LoaderAddParam";
import { Province } from "../Province";
import { Selectable } from "./Selectable";
export class SelectScene extends Scene implements Selectable {
  private myFlag;
  private static readonly myFlagSize;
  private target;
  private selectButton;
  private myCountry;
  private map;
  private changeCountryIndex;
  private countries;
  private countryName;
  private moddingMode;
  private moddingProvinces;
  constructor();
  protected createInitialResourceList(): (LoaderAddParam | string)[];
  protected onResourceLoaded(): void;
  private selectAsMyCountry;
  private deselectMyCountry;
  selectProvince(province: Province): void;
  private selectAsTarget;
  private integrity;
  private confirm;
  update(dt: number): void;
}
