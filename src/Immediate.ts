import Transition from "Transition";
import * as PIXI from "pixi.js";

export default class Immediate implements Transition {
  private onTransitionFinished: () => void = () => {};
  private finished: boolean = false;

  //トランジション描画物を含むPIXI.Containerを返す
  public getContainer(): PIXI.Container | null {
    return null;
  }

  //トランジション開始処理
  //このトランジションは即時終了させる
  public begin(): void {
    this.finished = true;
    this.onTransitionFinished();
  }

  /**
   * トランジションが開始しているかどうかを返す
   * このトランジションは即時終了するため、trueになることはない
   * @returns {boolean}
   * @memberof Immediate
   */
  public isBegan(): boolean {
    return false;
  }

  /**
   * トランジションが終了しているかどうかを返す
   *
   * @returns {boolean}
   * @memberof Immediate
   */
  public isFinished(): boolean {
    return this.finished;
  }

  /**
   * トランジションが実行中かを返す
   * このトランジションは即時終了するためtrueになることはない
   * @returns {boolean}
   * @memberof Immediate
   */
  public isActive(): boolean {
    return false;
  }

  /**
   * トランジションを更新する
   * このトランジションは即時終了するため何も行わない
   * @param {number} _dt
   * @returns {void}
   * @memberof Immediate
   */
  public update(_dt: number): void {
    return;
  }

  /**
   * トランジション終了時のコールバックを登録する
   *
   * @param {() => void} callback
   * @memberof Immediate
   */
  public setCallback(callback: () => void): void {
    this.onTransitionFinished = callback;
  }
}
