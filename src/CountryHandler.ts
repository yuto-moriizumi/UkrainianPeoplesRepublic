import Country from "./Country";

export default abstract class CountryHandler {
  country: Country;
  abstract update();
}
