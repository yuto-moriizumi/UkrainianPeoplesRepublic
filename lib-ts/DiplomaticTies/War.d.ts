import DiplomaticTie from "./DiplomaticTie";
import Country from "../Country";
export default class War extends DiplomaticTie {
    constructor(root: Country, target: Country);
    activate(): void;
    deactivate(): void;
}
