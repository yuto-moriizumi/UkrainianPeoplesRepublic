import Scene from "./Scene";
import Country from "../Country";
import LoaderAddParam from "../LoaderAddParam";
import MyMap from "../MyMap";
import { Selectable } from "./Selectable";
import Province from "../Province";
import DivisionSprite from "../DivisionSprite";
export default class MainScene extends Scene implements Selectable {
    static instance: MainScene;
    private playCountry;
    private map;
    private sidebar;
    private timer;
    private eventDispatcher;
    selectingDivison: DivisionSprite;
    constructor(playCountry: Country);
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    selectProvince(province: Province): void;
    openDiplomacySidebar(country: Country): void;
    openConscription(): void;
    getMap(): MyMap;
    update(dt: number): void;
    getMyCountry(): Country;
}
