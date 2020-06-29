import Jsonable from "../../Utils/Jsonable";
import Country from "../../Country";
export default abstract class Condition implements Jsonable {
    abstract isValid(root: Country, date: Date): boolean;
    toJSON(): any;
}
