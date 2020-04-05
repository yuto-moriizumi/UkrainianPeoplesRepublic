import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTie";

export default class DataManager {
  public countries: Map<String, Country> = new Map<String, Country>();
  public provinces: Map<String, Province> = new Map<String, Province>();
  public diplomacy: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  constructor() {}

  public load(callback?: Function) {
    const req = new XMLHttpRequest();
    req.open("GET", "data.json?r=" + new Date().getTime());
    req.send(null);
    req.addEventListener("load", () => {
      //国読み込み
      const json = JSON.parse(req.responseText);
      for (const id in json["Countries"]) {
        this.countries.set(id, new Country(id, json["Countries"][id]));
      }
      console.log("countries loaded:", this.countries);

      //プロヴィンス読み込み
      for (const id in json["Provinces"]) {
        this.provinces.set(id, new Province(id, json["Provinces"][id]));
      }
      console.log("provinces loaded:", this.provinces);

      //外交読込
      for (const tie in json["Diplomacy"]) {
        switch (tie["type"]) {
          case "war":
            this.diplomacy.push(new War(tie["root"]));
        }
      }
      console.log("provinces loaded:", this.provinces);

      if (callback) callback();
    });
    req.addEventListener("error", () => console.log("json error"));
  }

  public download() {
    //国データ出力
    let json = "{";
    json += '"Countries": {';
    let countriesString = [];
    this.countries.forEach((country) => countriesString.push(country.toJson()));
    json += countriesString.join(",") + "}";

    //プロヴィンスデータ出力
    json += ', "Provinces": {';
    let provincesString = [];
    this.provinces.forEach((province) =>
      provincesString.push(province.toJson())
    );
    json += provincesString.join(",") + "}";

    //外交データ出力
    json += ', "Diplomacy": [';
    let diplomacyString = [];
    this.diplomacy.forEach((tie) => diplomacyString.push(tie.toJson()));
    json += diplomacyString.join(",") + "]";

    json += "}";

    const blob = new Blob([json], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
  }
}
