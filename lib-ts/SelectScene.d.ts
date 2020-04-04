import Scene from "./Scene";
import LoaderAddParam from "./LoaderAddParam";
import Country from "./Country";
export default class SelectScene extends Scene {
    private myFlag;
    private static readonly myFlagSize;
    constructor();
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    select(country?: Country): void;
    update(dt: number): void;
}
