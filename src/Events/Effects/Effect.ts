export default abstract class Effect {
  public abstract activate(): void;
  public abstract toJson(): string;
}
