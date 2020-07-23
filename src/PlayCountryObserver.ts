import Country from "./Country/Country";

export default interface PlayCountryObserver {
  onPlayCountryChange(country: Country);
}
