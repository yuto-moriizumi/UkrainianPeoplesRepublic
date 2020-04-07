import Condition from "./Condition";
export default class DateCondition extends Condition {
    private type;
    private _when;
    set when(date: string);
    isValid(date: Date): boolean;
    toJSON(): object;
}
