import JsonObject from "./JsonObject";
import Event from "./Events/Event";

export default abstract class JsonObjectArray extends JsonObject {
  array: Array<JsonObject>;

  constructor(array?: Array<JsonObject>) {
    super();
    if (array) this.array = array;
  }

  public map(callback: (value: JsonObject) => JsonObject) {
    this.array = this.array.map(callback);
    return this;
  }

  public forEach(callback: (value: JsonObject) => void) {
    this.array.forEach(callback);
  }

  public fromJson(obj: object) {
    console.log("exArrayCalled with", obj);
    if (!(obj instanceof Array)) throw new Error("Object is not Array");
    this.array = obj.map((item: object) => {
      return this.createItem().fromJson(item);
    });
    return this;
  }

  abstract createItem(): JsonObject;
}
