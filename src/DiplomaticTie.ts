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

  public abstract toJson(): string;
}
