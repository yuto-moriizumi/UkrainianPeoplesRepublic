import DiplomaticTie from "./DiplomaticTie";
import Country from "../Country";
export default class War extends DiplomaticTie {
    static readonly root_icon: string;
    static readonly target_icon: string;
    constructor(root: Country, target: Country);
    activate(): void;
    deactivate(): void;
    getRootIcon(): string;
    getTargetIcon(): string;
}
