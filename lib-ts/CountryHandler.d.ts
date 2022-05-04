import { Country } from "./Country";
import { Event } from "./Events/Event";
export abstract class CountryHandler {
  country: Country;
  update(): void;
  getCountry(): Country;
  abstract dispatchEvents(): void;
  abstract onEvent(event: Event): void;
}
