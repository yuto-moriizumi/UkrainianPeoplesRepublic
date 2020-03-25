import Transition from "./Transition";
import * as PIXI from "pixi.js";
export default class Fade implements Transition {
    private onTransitionFinished;
    private alphaFrom;
    private alphaTo;
    private alphaProgress;
    private container;
    private overlay;
    private transitionBegan;
    private transitionFinished;
    constructor(alphaFrom: number, alphaTo: number, alphaProgress: number);
    getContainer(): PIXI.Container | null;
    begin(): void;
    /**
     * トランジションが開始しているかどうかを返す
     * @returns {boolean}
     * @memberof Fade
     */
    isBegan(): boolean;
    /**
     * トランジションが終了しているかどうかを返す
     *
     * @returns {boolean}
     * @memberof Fade
     */
    isFinished(): boolean;
    /**
     * トランジションが実行中かを返す
     * このトランジションは即時終了するためtrueになることはない
     * @returns {boolean}
     * @memberof Fade
     */
    isActive(): boolean;
    /**
     * トランジションを更新する
     * このトランジションは即時終了するため何も行わない
     * @param {number} _dt
     * @returns {void}
     * @memberof Fade
     */
    update(_dt: number): void;
    /**
     * トランジション終了時のコールバックを登録する
     *
     * @param {() => void} callback
     * @memberof Fade
     */
    setCallback(callback: () => void): void;
}
