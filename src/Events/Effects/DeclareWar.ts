import Effect from "./Effect";
import Country from "../../Country";
import War from "War";
import GameManager from "../../GameManager";

export default class DeclareWar extends Effect {
  private root: Country;
  private target: Country;
  constructor(root: Country, target: Country) {
    super();
    this.root = root;
    this.target = target;
  }
  public activate() {
    const war = new War(this.root, this.target);
    war.activate();
  }

  public static parseJson(string: string): DeclareWar {
    const json = JSON.parse(string);
    const countries = GameManager.instance.data.countries;
    return new DeclareWar(
      countries.get(json["root"]),
      countries.get(json["target"])
    );
  }

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
  }
}
