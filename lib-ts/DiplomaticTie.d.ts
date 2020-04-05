import Country from "./Country";
export default abstract class DiplomaticTie {
    protected root: Country;
    protected target: Country;
    constructor(root: Country, target: Country);
    getRoot(): Country;
    getTarget(): Country;
    abstract toJson(): string;
}
