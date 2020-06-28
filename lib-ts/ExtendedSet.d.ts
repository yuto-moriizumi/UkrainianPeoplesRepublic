export default class ExtendedSet<T> {
    private set;
    add(value: T): void;
    delete(value: T): void;
    forEach(callback: (value: T) => {}): void;
}
