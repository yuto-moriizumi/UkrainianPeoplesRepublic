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

  /*
  public static parseJson(string: string): DeclareWar {
    const json = JSON.parse(string);
    const countries = GameManager.instance.data.countries;
    return new DeclareWar(
      countries.get(json["root"]),
      countries.get(json["target"])
    );
  }*/

  set root(country: object) {
    this._root = Object.assign(new Country(), country);
  }

  set target(country: object) {
    this._target = Object.assign(new Country(), country);
  }

  /*
  public toJson(): string {
    return (
      "{" +
      [
        '"type":' + this.constructor.name,
        '"root":' + this.root.id,
        '"target":' + this.target.id,
      ].join(",") +
      "}"
    );
  }*/
}
