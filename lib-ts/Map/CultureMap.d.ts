import { MapMode } from "./MapMode";
import { Observable } from "../Observable";
import { MapModeObserver } from "./MapModeObserver";
import { CultureObserver } from "../CultureObserve";
export class CultureMap extends MapMode implements CultureObserver, Observable {
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
