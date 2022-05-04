export interface UpdateObject {
  isDestroyed(): boolean;
  update(dt: number): void;
}
