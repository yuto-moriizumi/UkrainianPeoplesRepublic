import Scene from "./Scene";
import Country from "./Country";
import LoaderAddParam from "./LoaderAddParam";
import { Selectable } from "./Selectable";
import Province from "./Province";
export default class MainScene extends Scene implements Selectable {
    private playCountry;
    private map;
    private sidebar;
    constructor(playCountry: Country);
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    selectProvince(province: Province): void;
    update(dt: number): void;
}
