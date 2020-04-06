import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTie";
import MyEvent from "./Events/MyEvent";
export default class DataManager {
    countries: Map<String, Country>;
    provinces: Map<String, Province>;
    diplomacy: Array<DiplomaticTie>;
    events: Array<MyEvent>;
    constructor();
    load(json: Object): void;
    download(): void;
}
