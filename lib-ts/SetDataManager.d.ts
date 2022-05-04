import { DataManager } from "./DataManager";
/**
 * Setの拡張クラスです
 * データロードの順番が重要になる場合に使用します
 * @export
 * @class MapDataManager
 * @template T
 * @template U
 */
export class SetDataManager<T> extends DataManager {
  private set;
  constructor();
  add(value: T): void;
  delete(value: T): boolean;
  has(value: T): boolean;
  get size(): number;
  setCollection(collection: any): void;
  toJSON(): object;
}
