import Country from "../../Country/Country";
import JsonObject from "../../Utils/JsonObject";
export default abstract class Condition extends JsonObject {
    type: string;
    abstract isValid(root: Country, date: Date): boolean;
    toJSON(): any;
}
