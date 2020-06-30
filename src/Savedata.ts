import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import War from "./DiplomaticTies/War";
import Event from "./Events/Event";
import JsonObject from "./Utils/JsonObject";
import Combat from "./Combat";
import Access from "./DiplomaticTies/Access";
import DivisionTemplate from "./DivisionTemplate";
import MapDataManager from "./Utils/MapDataManager";
import ExtendedSet from "./Utils/ExtendedSet";
import SetDataManager from "./SetDataManager";
import JsonType from "./Utils/JsonType";

export default class Savedata extends JsonObject {
  private _countries: Map<string, Country> = new Map<string, Country>();
  private _provinces = new MapDataManager<string, Province>();
  private _diplomacy: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  private _events = new Map<string, Event>();
  private _combats: Array<Combat> = new Array<Combat>();
  private _templates = new MapDataManager<string, DivisionTemplate>();
  private _cultures = new SetDataManager<string>();

  private set countries(countries: object) {
    for (const id in countries) {
      this._countries.set(id, Object.assign(new Country(id), countries[id]));
    }
    console.log("countries loaded:", this._countries);
  }

  public getCountries() {
    return this._countries;
  }

  public getCountry(id: string) {
    return this._countries.get(id);
  }

  private set templates(templates: object) {
    for (const id in templates) {
      this._templates.set(
        id,
        Object.assign(new DivisionTemplate(id), templates[id])
      );
    }
    console.log("templates loaded:", this._templates);
    this._templates.endLoad();
  }

  public getTemplates() {
    return this._templates;
  }

  private set provinces(provinces: object) {
    for (const id in provinces) {
      const newId = id.substr(0, 1) == "#" ? id : "#" + id;
      //console.log(newId);
      const province = new Province(newId);
      Object.assign(province, provinces[id]);
      this._provinces.set(newId, province);
    }
    console.log("provinces loaded:", this._provinces);
    this._provinces.endLoad();
  }

  public setProvince(id: string, province: Province) {
    this._provinces.set(id, province);
  }

  public getProvinces() {
    return this._provinces;
  }

  private set diplomacy(diplomacy: Array<object>) {
    diplomacy.forEach((tie) => {
      switch (tie["type"]) {
        case "War":
          const war = new War(
            this._countries.get(tie["root"]),
            this._countries.get(tie["target"])
          );
          war.activate();
          return;
        case "Access":
          const access = new Access(
            this._countries.get(tie["root"]),
            this._countries.get(tie["target"])
          );
          access.activate();
          return;
        default:
          new Error("diplomacy load error:" + tie["type"]);
          return;
      }
    });
    console.log("diplomacy loaded:", this._diplomacy);
  }

  public addDiplomacy(diplomacy: DiplomaticTie) {
    this._diplomacy.push(diplomacy);
  }

  public removeDiplomacy(diplomacy: DiplomaticTie) {
    this._diplomacy = this._diplomacy.filter((d) => d != diplomacy);
  }

  private set events(events: object) {
    for (const id in events) {
      const event = new Event();
      events[id]["__id"] = id;
      Object.assign(event, events[id]);
      this._events.set(id, event);
    }
    console.log("events loaded:", this._events);
  }

  public getEvents() {
    return this._events;
  }

  private set combats(combats: Array<object>) {
    this._combats = combats.map((combat) =>
      Object.assign(new Combat(), combat)
    );
  }

  public addCombat(combat: Combat) {
    this._combats.push(combat);
  }
  public removeCombat(combat: Combat) {
    this._combats = this._combats.filter((combat2) => {
      return combat !== combat2;
    });
  }

  public getCombats(): Combat[] {
    return this._combats;
  }

  public load(json: object) {
    Object.assign(this, json);
  }

  private set cultures(cultures: object) {
    this._cultures.setCollection(cultures);

    console.log("cultures loaded:", this._cultures);
    this._cultures.endLoad("culture");
  }

  public getCultures() {
    return this._cultures;
  }

  public download(type: JsonType) {
    //console.log(Object.entries(this));
    const jsonObject = this.toJsonObject(type);
    console.log(jsonObject);
    const json = JSON.stringify(jsonObject);

    const blob = new Blob([json], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = type + ".json";
    a.click();
  }
}
