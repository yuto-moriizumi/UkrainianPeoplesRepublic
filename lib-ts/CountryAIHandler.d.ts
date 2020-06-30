import Country from "./Country";
import CountryHandler from "./CountryHandler";
import Event from "./Events/Event";
export default class CountryAI extends CountryHandler {
    country: Country;
    constructor(country: Country);
    dispatchEvents(): void;
    onEvent(event: Event): void;
    update(): void;
}
