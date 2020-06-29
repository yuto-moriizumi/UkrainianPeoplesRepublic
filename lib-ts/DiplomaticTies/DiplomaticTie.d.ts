import Country from "../Country";
import Jsonable from "../Utils/Jsonable";
export default abstract class DiplomaticTie implements Jsonable {
    private type;
    readonly root_icon: string;
    readonly target_icon: string;
    protected root: Country;
    protected target: Country;
    protected active: boolean;
    constructor(root: Country, target: Country);
    getRoot(): Country;
    getTarget(): Country;
    getOpponent(country: Country): Country;
    activate(): void;
    deactivate(): void;
    toJSON(): any;
}
