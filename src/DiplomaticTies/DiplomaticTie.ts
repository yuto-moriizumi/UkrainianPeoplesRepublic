import Country from "../Country/Country";
import JsonConverter from "../Utils/JsonConverter";
import GameManager from "../GameManager";
import JsonType from "../Utils/JsonType";
import JsonObject from "../Utils/JsonObject";

export default abstract class DiplomaticTie extends JsonObject {
  private type = this.constructor.name;
  public static readonly root_icon: string;
  public static readonly target_icon: string;
  protected root: Country;
  protected target: Country;
  protected active: boolean = false;
  constructor(root: Country, target: Country) {
    super();
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

  public abstract getRootIcon();

  public abstract getTargetIcon();

  replacer(key: string, value: any, type: JsonType) {
    if (value instanceof Country) return [key, value.id];
    if (key == "active") return [key, false];
    return [key, value];
  }
}
