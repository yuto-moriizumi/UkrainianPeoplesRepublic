import DiplomaticTie from "./DiplomaticTie";
import Country from "../Country";
export default class War extends DiplomaticTie {
    readonly root_icon: string;
    readonly target_icon: string;
    constructor(root: Country, target: Country);
    activate(): void;
    deactivate(): void;
}
