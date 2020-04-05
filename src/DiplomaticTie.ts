import Country from "./Country";

export default abstract class DiplomaticTie {
  protected root: Country;
  protected target: Country;
  constructor(root: Country, target: Country) {
    this.root = root;
    this.target = target;
    root.addDiplomaticRelation(this);
    target.addDiplomaticRelation(this);
  }

  public getRoot(): Country {
    return this.root;
  }

  public getTarget(): Country {
    return this.target;
  }

  public abstract toJson(): string;
}
