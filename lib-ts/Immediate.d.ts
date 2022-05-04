import { Transition } from "Transition";
import * as PIXI from "pixi.js";
export class Immediate implements Transition {
  private onTransitionFinished;
  private finished;
  getContainer(): PIXI.Container | null;
  begin(): void;
  /**
   * トランジションが開始しているかどうかを返す
   * このトランジションは即時終了するため、trueになることはない
   * @returns {boolean}
   * @memberof Immediate
   */
  isBegan(): boolean;
  /**
   * トランジションが終了しているかどうかを返す
   *
   * @returns {boolean}
   * @memberof Immediate
   */
  isFinished(): boolean;
  /**
   * トランジションが実行中かを返す
   * このトランジションは即時終了するためtrueになることはない
   * @returns {boolean}
   * @memberof Immediate
   */
  isActive(): boolean;
  /**
   * トランジションを更新する
   * このトランジションは即時終了するため何も行わない
   * @param {number} _dt
   * @returns {void}
   * @memberof Immediate
   */
  update(_dt: number): void;
  /**
   * トランジション終了時のコールバックを登録する
   *
   * @param {() => void} callback
   * @memberof Immediate
   */
  setCallback(callback: () => void): void;
}
