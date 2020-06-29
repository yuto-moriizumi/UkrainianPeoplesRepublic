import Scene from "./Scene";
import Country from "../Country";
import LoaderAddParam from "../Utils/LoaderAddParam";
import Atlas from "../Map/Atlas";
import { Selectable } from "./Selectable";
import Province from "../Province";
import DivisionSprite from "../DivisionSprite";
export default class MainScene extends Scene implements Selectable {
    static instance: MainScene;
    private playCountry;
    private map;
    private header;
    private sidebar;
    private eventDispatcher;
    selectingDivison: DivisionSprite;
    cheat_move: boolean;
    constructor(playCountry: Country);
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    selectProvince(province: Province): void;
    openDiplomacySidebar(country: Country): void;
    openConscription(): void;
    openDebug(): void;
    openProvinceSidebar(province: Province): void;
    getMap(): Atlas;
    update(dt: number): void;
    getMyCountry(): Country;
    setPlayCountry(country: Country): void;
}
