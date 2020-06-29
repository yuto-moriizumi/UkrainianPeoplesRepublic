import Condition from "./Condition";
export default class EventFired extends Condition {
    private type;
    private id;
    isValid(date: Date): boolean;
    toJSON(): object;
}
