import Country from "./Country";
import GameManager from "./GameManager";
import JsonObject from "./JsonObject";

export default class Province extends JsonObject {
  public id: number;
  public owner: Country;

  constructor(id: string, obj: any) {
    super();
    this.id = parseInt(id, 16);
    this.owner = GameManager.instance.data.countries.get(obj.owner);
    //console.log("try", obj.Owner, this.owner);
  }

  public setOwner(owner: Country) {
    this.owner = owner;
  }

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (value instanceof Country) return [key, value.id];
      if (key === "id") return [];
      return [key, value];
    });
  }
}
