import Country from "./Country";
export default interface PlayCountryObserver {
    onPlayCountryChange(country: Country): any;
}
