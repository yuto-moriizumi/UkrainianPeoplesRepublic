import Jsonable from "./Jsonable";
/**
 * Mapの拡張クラスです
 * データロードの順番が重要になる場合に使用します
 * @export
 * @class MapDataManager
 * @template T
 * @template U
 */
export default class MapDataManager<T, U> implements Jsonable {
    private map;
    private onLoaded;
    private _isLoaded;
    isLoaded(): boolean;
    set(id: T, item: U): Map<T, U>;
    safeGet(id: T, onload: (item: U) => void): void;
    /**
     * 値を返します
     * ロードが確実に完了している場合にのみ使用して下さい
     * @param {T} id
     * @returns
     * @memberof MapDataManager
     */
    get(id: T): U;
    forEach(callback: (item: U) => void): void;
    addListener(func: any): void;
    /**
     * 保留していた関数を実行します
     * データのロードが終わったときに必ず呼び出してください
     * @memberof MapDataManager
     */
    endLoad(): void;
    toJSON(): any;
}
