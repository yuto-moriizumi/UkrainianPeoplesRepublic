import { Country } from "../Country";
import { HorizontalBox } from "./HorizontalBox";
import { Timer } from "./Timer";
export class Header extends HorizontalBox {
  static readonly DEFAULT_HEIGHT = 100;
  private myCountry;
  private timer;
  private myFlag;
  private moneyWatcher;
  constructor(myCountry: Country);
  getTimer(): Timer;
  setPlayCountry(country: Country): void;
  update(): void;
}
