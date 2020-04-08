import Country from "./Country";

export default abstract class DiplomaticTie {
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
}
