import Scene from "./Scene";
import Country from "../Country";
import LoaderAddParam from "../LoaderAddParam";
import MyMap from "../MyMap";
import { Selectable } from "./Selectable";
import Province from "../Province";
import DivisionSprite from "../Division";
export default class MainScene extends Scene implements Selectable {
    static instance: MainScene;
    private playCountry;
    private map;
    private header;
    private sidebar;
    private eventDispatcher;
    selectingDivison: DivisionSprite;
    moveCheat: boolean;
    static resouceLoadCallbacks: Array<any>;
    constructor(playCountry: Country);
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    selectProvince(province: Province): void;
    openDiplomacySidebar(country: Country): void;
    openConscription(): void;
    openDebug(): void;
    getMap(): MyMap;
    update(dt: number): void;
    getMyCountry(): Country;
    setPlayCountry(country: Country): void;
}
