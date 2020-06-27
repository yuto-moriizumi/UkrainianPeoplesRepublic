import Country from "../Country";
import HorizontalBox from "./HorizontalBox";
import Timer from "./Timer";
export default class Header extends HorizontalBox {
    static readonly DEFAULT_HEIGHT = 100;
    private myCountry;
    private timer;
    private myFlag;
    private moneyString;
    constructor(myCountry: Country);
    getTimer(): Timer;
    setPlayCountry(country: Country): void;
    update(): void;
}
