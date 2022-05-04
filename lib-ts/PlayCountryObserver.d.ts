import { Country } from "./Country";
export interface PlayCountryObserver {
  onPlayCountryChange(country: Country): any;
}
