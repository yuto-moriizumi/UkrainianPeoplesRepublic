import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTie";
import Event from "./Events/Event";
import JsonObject from "./JsonObject";
export default class DataManager extends JsonObject {
    countries: Map<string, Country>;
    provinces: Map<string, Province>;
    diplomacy: Array<DiplomaticTie>;
    events: Array<Event>;
    load(json: object): void;
    download(): void;
    createEntries(): any[][];
}
