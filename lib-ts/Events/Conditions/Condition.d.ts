export default abstract class Condition {
    abstract isValid(date: Date): boolean;
}
