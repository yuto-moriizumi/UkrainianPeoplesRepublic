import Effect from "./Effect";
import Country from "../../Country";
import War from "../../War";
import GameManager from "../../GameManager";

export default class DeclareWar extends Effect {
  private type = this.constructor.name;
  private _root: Country;
  private _target: Country;

  public activate() {
    const war = new War(this._root, this._target);
    war.activate();
  }

  set root(countryId: string) {
    this._root = GameManager.instance.data.countries.get(countryId);
  }

  set target(countryId: string) {
    this._target = GameManager.instance.data.countries.get(countryId);
  }

  public createEntries() {
    return super.createEntries().map(([key, value]) => {
      if (value instanceof Country) return [key, value.id];
      return [key, value];
    });
  }
}
