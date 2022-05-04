import { Observable } from "../Observable";
export abstract class MapMode implements Observable {
  abstract update(): void;
  abstract addObserver(observer: any): void;
  abstract removeObserver(observer: any): void;
  abstract destroy(): void;
}
