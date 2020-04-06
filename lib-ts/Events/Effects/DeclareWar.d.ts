import Effect from "./Effect";
import Country from "../../Country";
export default class DeclareWar extends Effect {
    private root;
    private target;
    constructor(root: Country, target: Country);
    activate(): void;
    static parseJson(string: string): DeclareWar;
    toJson(): string;
}
