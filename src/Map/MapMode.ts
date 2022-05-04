import { Observable } from "../Observable";

export abstract class MapMode implements Observable {
  abstract update(): void;
  abstract addObserver(observer): void;
  abstract removeObserver(observer): void;
  abstract destroy(): void;
}
