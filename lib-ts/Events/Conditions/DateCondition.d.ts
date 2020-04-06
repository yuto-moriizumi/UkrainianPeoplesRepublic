import Condition from "./Condition";
export default class DateCondition extends Condition {
    private type;
    private when;
    isValid(date: Date): boolean;
}
