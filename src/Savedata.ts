import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import War from "./DiplomaticTies/War";
import Event from "./Events/Event";
import JsonObject from "./JsonObject";

export default class Savedata extends JsonObject {
  private _countries: Map<string, Country> = new Map<string, Country>();
  private _provinces: Map<string, Province> = new Map<string, Province>();
  private _diplomacy: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  private _events: Array<Event> = new Array<Event>();

  private set countries(countries: object) {
    for (const id in countries) {
      this._countries.set(id, Object.assign(new Country(), countries[id]));
    }
    console.log("countries loaded:", this._countries);
  }

  public getCountries() {
    return this._countries;
  }

  public getCountry(id: string) {
    return this._countries.get(id);
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
  }

  public setProvince(id: string, province: Province) {
    this._provinces.set(id, province);
  }

  public getProvinces() {
    return this._provinces;
  }

  public getProvince(id: string) {
    return this._provinces.get(id);
  }

  private set diplomacy(diplomacy: Array<object>) {
    this._diplomacy = diplomacy.map((tie) => {
      switch (tie["type"]) {
        case "war":
          return new War(
            this._countries.get(tie["root"]),
            this._countries.get(tie["target"])
          );
        default:
          new Error("diplomacy load error:" + tie["type"]);
          return null;
      }
    });
    console.log("diplomacy loaded:", this._diplomacy);
  }

  public addDiplomacy(diplomacy: DiplomaticTie) {
    this._diplomacy.push(diplomacy);
  }

  private set events(events: Array<object>) {
    this._events = events.map((eventObject) => {
      const event = new Event();
      Object.assign(event, eventObject);
      return event;
    });
    console.log("events loaded:", this._events);
  }

  public getEvents() {
    return this._events;
  }

  public load(json: object) {
    Object.assign(this, json);
  }

  public download() {
    console.log(Object.entries(this));
    const json = JSON.stringify(this);

    const blob = new Blob([json], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
  }
}
