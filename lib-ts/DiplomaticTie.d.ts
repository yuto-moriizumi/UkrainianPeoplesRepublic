import Country from "./Country";
export default abstract class DiplomaticTie {
    protected root: Country;
    protected target: Country;
    protected active: boolean;
    constructor(root: Country, target: Country);
    getRoot(): Country;
    getTarget(): Country;
    activate(): void;
    abstract toJson(): string;
}
