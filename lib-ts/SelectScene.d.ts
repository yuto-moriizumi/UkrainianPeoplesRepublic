import Scene from "./Scene";
import LoaderAddParam from "./LoaderAddParam";
import Province from "./Province";
export default class SelectScene extends Scene {
    private myFlag;
    private static readonly myFlagSize;
    private target;
    private selectButton;
    private myCountry;
    private map;
    private changeCountryIndex;
    private countries;
    private countryName;
    constructor();
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    private selectAsMyCountry;
    private deselectMyCountry;
    selectProvince(province: Province): void;
    private selectAsTarget;
    update(dt: number): void;
}
