import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTie";
export default class DataManager {
    countries: Map<String, Country>;
    provinces: Map<String, Province>;
    diplomacy: Array<DiplomaticTie>;
    constructor();
    load(callback?: Function): void;
    download(): void;
}
