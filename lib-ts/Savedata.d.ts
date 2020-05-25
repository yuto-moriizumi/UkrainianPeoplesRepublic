import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import Event from "./Events/Event";
import JsonObject from "./JsonObject";
import Combat from "./Combat";
export default class Savedata extends JsonObject {
    private _countries;
    private _provinces;
    private _diplomacy;
    private _events;
    private _combats;
    private set countries(value);
    getCountries(): Map<string, Country>;
    getCountry(id: string): Country;
    private set provinces(value);
    setProvince(id: string, province: Province): void;
    getProvinces(): Map<string, Province>;
    getProvince(id: string): Province;
    private set diplomacy(value);
    addDiplomacy(diplomacy: DiplomaticTie): void;
    private set events(value);
    getEvents(): Event[];
    private set combats(value);
    addCombat(combat: Combat): void;
    removeCombat(combat: Combat): void;
    load(json: object): void;
    download(): void;
}
