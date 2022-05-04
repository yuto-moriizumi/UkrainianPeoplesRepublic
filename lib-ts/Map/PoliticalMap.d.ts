import { MapMode } from "./MapMode";
import { ProvinceObserver } from "../ProvinceObserver";
import { Observable } from "../Observable";
import { MapModeObserver } from "./MapModeObserver";
export class PoliticalMap
  extends MapMode
  implements ProvinceObserver, Observable
{
  observers: MapModeObserver[];
  private filter;
  constructor();
  update(): void;
  onProvinceChange(): void;
  addObserver(observer: MapModeObserver): void;
  removeObserver(observer: MapModeObserver): void;
  destroy(): void;
}
