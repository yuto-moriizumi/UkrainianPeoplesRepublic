import Event from "./Events/Event";
import JsonObjectArray from "./JsonObjectArray";
export default class EventArray extends JsonObjectArray {
    array: Event[];
    createItem(): Event;
}
