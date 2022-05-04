export interface Observable {
  addObserver(observer): void;
  removeObserver(observer): void;
}
