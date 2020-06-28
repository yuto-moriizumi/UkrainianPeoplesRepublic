import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import JsonObject from "./JsonObject";
import Combat from "./Combat";
import DivisionTemplate from "./DivisionTemplate";
import MapDataManager from "./MapDataManager";
import EventArray from "./EventArray";
export default class Savedata extends JsonObject {
    private _countries;
    private _provinces;
    private _diplomacy;
    private _events;
    private _combats;
    private _templates;
    private set countries(value);
    getCountries(): Map<string, Country>;
    getCountry(id: string): Country;
    private set templates(value);
    getTemplates(): MapDataManager<string, DivisionTemplate>;
    private set provinces(value);
    setProvince(id: string, province: Province): void;
    getProvinces(): MapDataManager<string, Province>;
    private set diplomacy(value);
    addDiplomacy(diplomacy: DiplomaticTie): void;
    removeDiplomacy(diplomacy: DiplomaticTie): void;
    private set events(value);
    getEvents(): EventArray;
    private set combats(value);
    addCombat(combat: Combat): void;
    removeCombat(combat: Combat): void;
    getCombats(): Combat[];
    load(json: object): void;
    toJSON(): any;
    download(): void;
    fromJson(obj: object): this;
}
