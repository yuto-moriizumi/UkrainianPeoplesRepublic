import Country from "./Country";
import CountryHandler from "./CountryHandler";
export default class CountryPlayerHandler extends CountryHandler {
    country: Country;
    constructor(country: Country);
    update(): void;
}
