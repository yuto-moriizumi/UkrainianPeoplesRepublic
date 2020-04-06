export default abstract class Effect {
    abstract activate(): void;
    abstract toJson(): string;
}
