export default class ExtendedSet<T> {
  private set = new Set<T>();

  public add(value: T) {
    this.set.add(value);
  }

  public delete(value: T) {
    this.set.delete(value);
  }

  public forEach(callback: (value: T) => void) {
    this.set.forEach(callback);
  }

  public some(callback: (value: T) => boolean) {
    return Array.from(this.set).some(callback);
  }

  public filter(callback: (value: T) => boolean) {
    return Array.from(this.set).filter(callback);
  }
}
