import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTie/DiplomaticTie";
import War from "./War";
import Event from "./Events/Event";
import JsonObject from "./JsonObject";
import * as PIXI from "pixi.js";

export default class DataManager extends JsonObject {
  public countries: Map<string, Country> = new Map<string, Country>();
  public provinces: Map<string, Province> = new Map<string, Province>();
  public diplomacy: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  public events: Array<Event> = new Array<Event>();

  public load(json: object) {
    //国読み込み
    for (const id in json["countries"]) {
      this.countries.set(
        id,
        Object.assign(new Country(), json["countries"][id])
      );
    }
    console.log("countries loaded:", this.countries);

    //プロヴィンス読み込み
    for (const id in json["provinces"]) {
      this.provinces.set(id, new Province(id, json["provinces"][id]));
    }
    console.log("provinces loaded:", this.provinces);

    //外交読込
    for (const tie in json["diplomacy"]) {
      switch (tie["type"]) {
        case "war":
          this.diplomacy.push(
            new War(
              this.countries.get(tie["root"]),
              this.countries.get(tie["target"])
            )
          );
          break;
        default:
          console.log("diplomacy load error:", tie);
      }
    }
    console.log("diplomacy loaded:", this.diplomacy);

    //イベント読込
    this.events = json["events"].map((eventObject: Object) => {
      const event = new Event();
      Object.assign(event, eventObject);
      return event;
    });

    console.log("events loaded:", this.events);
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

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (value instanceof Map) return [key, Object.fromEntries(value)];
      return [key, value];
    });
  }
}
