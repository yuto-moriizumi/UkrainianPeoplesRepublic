import MapMode from "./MapMode";
import Observable from "../Observable";
import MapModeObserver from "./MapModeObserver";
import CultureObserver from "../CultureObserver";
export default class CultureMap extends MapMode implements CultureObserver, Observable {
    observers: MapModeObserver[];
    private filter;
    private cultureDictionaly;
    constructor();
    update(): void;
    onCultureChange(): void;
    addObserver(observer: MapModeObserver): void;
    removeObserver(observer: MapModeObserver): void;
    destroy(): void;
}
