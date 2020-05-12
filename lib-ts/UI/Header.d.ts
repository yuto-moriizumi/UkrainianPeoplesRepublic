import Country from "../Country";
import HorizontalBox from "./HorizontalBox";
export default class Header extends HorizontalBox {
    static readonly DEFAULT_HEIGHT = 100;
    private myCountry;
    constructor(myCountry: Country);
}
