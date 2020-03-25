import Country from "./Country";
import Province from "./Province";
export default class DataManager {
    countries: Map<String, Country>;
    provinces: Map<String, Province>;
    constructor();
    load(callback?: Function): void;
    download(): void;
}
