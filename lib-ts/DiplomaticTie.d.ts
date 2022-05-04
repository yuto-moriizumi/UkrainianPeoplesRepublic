import { Country } from "./Country";
export abstract class DiplomaticTie {
  protected root: Country;
  protected target: Country;
  protected active: boolean;
  constructor(root: Country, target: Country);
  getRoot(): Country;
  getTarget(): Country;
  getOpponent(country: Country): Country;
  activate(): void;
}
