import Country from "../Country";
import Jsonable from "../Jsonable";
import JsonConverter from "../JsonConverter";

export default abstract class DiplomaticTie implements Jsonable {
  private type = this.constructor.name;
  protected root: Country;
  protected target: Country;
  protected active: boolean = false;
  constructor(root: Country, target: Country) {
    this.root = root;
    this.target = target;
  }

  public getRoot(): Country {
    return this.root;
  }

  public getTarget(): Country {
    return this.target;
  }

  public getOpponent(country: Country) {
    return this.getRoot() === country ? this.getTarget() : this.getRoot();
  }

  public activate() {
    if (this.active) return;
    this.active = true;
    this.root.addDiplomaticRelation(this);
    this.target.addDiplomaticRelation(this);
  }

  public deactivate() {
    if (!this.active) return;
    this.active = false;
    this.root.removeDiplomaticRelation(this);
    this.target.removeDiplomaticRelation(this);
    console.log(this.root);
  }

  public toJSON() {
    return JsonConverter.toJSON(this, (key, value) => {
      if (value instanceof Country) return [key, value.id];
      return [key, value];
    });
  }
}
