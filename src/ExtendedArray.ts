import JsonObject from "./JsonObject";

//@Deprecated
export default class ExtendedArray<T> extends JsonObject {
  private class = this.constructor.name;
  private array = new Array<T>();

  constructor(array?: Array<T>) {
    super();
    if (array) this.array = array;
  }

  public map(callback: (value: T) => T) {
    this.array = this.array.map(callback);
    return this;
  }

  public forEach(callback: (value: T) => void) {
    this.array.forEach(callback);
  }

  public fromJson(obj: object) {
    console.log("exArrayCalled with", obj);
    if (!(obj instanceof Array)) throw new Error("Object is not Array");
    this.array = obj.map((item: T) => {
      if (item instanceof JsonObject) return item.fromJson(item);
      return item;
    });
    return this;
  }
}
