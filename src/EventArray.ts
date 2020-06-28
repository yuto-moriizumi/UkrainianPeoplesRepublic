import JsonObject from "./JsonObject";
import Event from "./Events/Event";
import JsonObjectArray from "./JsonObjectArray";

export default class EventArray extends JsonObjectArray {
  array = new Array<Event>();

  createItem() {
    return new Event();
  }
}
