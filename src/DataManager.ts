import Country from "./Country";
import Province from "./Province";

export default class DataManager {
  public countries: Map<String, Country> = new Map<String, Country>();
  public provinces: Map<String, Province> = new Map<String, Province>();
  constructor() {}

  public load(callback?: Function) {
    const req = new XMLHttpRequest();
    req.open("GET", "data.json?r=" + new Date().getTime());
    req.send(null);
    req.addEventListener("load", () => {
      const json = JSON.parse(req.responseText);
      for (const id in json["Countries"]) {
        this.countries.set(id, new Country(id, json["Countries"][id]));
      }
      console.log("countries loaded:", this.countries);
      for (const id in json["Provinces"]) {
        this.provinces.set(id, new Province(id, json["Provinces"][id]));
      }
      console.log("provinces loaded:", this.provinces);

      if (callback) callback();
    });
    req.addEventListener("error", () => console.log("json error"));
  }

  public download() {
    let json = '{"Countries":{';
    let countriesString = [];
    this.countries.forEach(country => countriesString.push(country.toJson()));
    json += countriesString.join(",") + '},"Provinces":{';
    let provincesString = [];
    this.provinces.forEach(province => provincesString.push(province.toJson()));
    json += provincesString.join(",") + "}}";
    const blob = new Blob([json], {
      type: "application/json"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
  }
}
