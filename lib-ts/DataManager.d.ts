import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTie";
import Event from "./Events/Event";
export default class DataManager {
    countries: Map<string, Country>;
    provinces: Map<string, Province>;
    diplomacy: Array<DiplomaticTie>;
    events: Array<Event>;
    constructor();
    load(json: Object): void;
    download(): void;
}
