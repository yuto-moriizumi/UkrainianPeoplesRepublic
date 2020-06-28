export default class ExtendedSet<T> {
  private set = new Set<T>();

  public add(value: T) {
    this.set.add(value);
  }

  public delete(value: T) {
    this.set.delete(value);
  }

  public forEach(callback: (value: T) => {}) {
    this.set.forEach(callback);
  }
}
