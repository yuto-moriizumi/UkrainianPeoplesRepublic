import Country from "../Country";
import Jsonable from "../Utils/Jsonable";
import JsonConverter from "../Utils/JsonConverter";
import GameManager from "../GameManager";

export default abstract class DiplomaticTie implements Jsonable {
  private type = this.constructor.name;
  public readonly root_icon: string;
  public readonly target_icon: string;
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
    GameManager.instance.data.addDiplomacy(this);
  }

  public deactivate() {
    if (!this.active) return;
    this.active = false;
    this.root.removeDiplomaticRelation(this);
    this.target.removeDiplomaticRelation(this);
    GameManager.instance.data.removeDiplomacy(this);
  }

  public toJSON() {
    return JsonConverter.toJSON(this, (key, value) => {
      if (value instanceof Country) return [key, value.id];
      if (key == "active") return [key, false];
      return [key, value];
    });
  }
}
