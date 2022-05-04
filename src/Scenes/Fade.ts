import { Transition } from "./Transition";
import * as PIXI from "pixi.js";
import { GameManager } from "../GameManager";

export class Fade implements Transition {
  private onTransitionFinished: () => void = () => {}; //トランジション終了時コールバック
  private alphaFrom!: number; //フェード開始時の黒画面アルファ
  private alphaTo!: number; //フェード終了時の黒画面アルファ
  private alphaProgress: number; //1フレーム毎の黒画面アルファ加算値
  private container = new PIXI.Container(); //黒画面のコンテナ
  private overlay = new PIXI.Graphics(); //黒画面の描画
  private transitionBegan: boolean = false; //トランジション開始フラグ
  private transitionFinished: boolean = false; //トランジション終了フラグ

  constructor(alphaFrom: number, alphaTo: number, alphaProgress: number) {
    this.alphaFrom = alphaFrom;
    this.alphaTo = alphaTo;
    this.alphaProgress = alphaProgress;

    const width = GameManager.instance.game.view.width;
    const height = GameManager.instance.game.view.height;

    this.overlay.beginFill(0x000000);
    this.overlay.moveTo(0, 0);
    this.overlay.lineTo(width, 0);
    this.overlay.lineTo(width, height);
    this.overlay.lineTo(0, height);
    this.overlay.endFill();

    this.overlay.alpha = this.alphaFrom;
    this.container.addChild(this.overlay);
  }

  //トランジション描画物を含むPIXI.Containerを返す
  public getContainer(): PIXI.Container | null {
    return this.container;
  }

  //トランジション開始処理
  public begin(): void {
    this.transitionBegan = true;
  }

  /**
   * トランジションが開始しているかどうかを返す
   * @returns {boolean}
   * @memberof Fade
   */
  public isBegan(): boolean {
    return this.transitionBegan;
  }

  /**
   * トランジションが終了しているかどうかを返す
   *
   * @returns {boolean}
   * @memberof Fade
   */
  public isFinished(): boolean {
    return this.transitionFinished;
  }

  /**
   * トランジションが実行中かを返す
   * このトランジションは即時終了するためtrueになることはない
   * @returns {boolean}
   * @memberof Fade
   */
  public isActive(): boolean {
    return this.isBegan() && !this.isFinished();
  }

  /**
   * トランジションを更新する
   * このトランジションは即時終了するため何も行わない
   * @param {number} _dt
   * @returns {void}
   * @memberof Fade
   */
  public update(_dt: number): void {
    if (!this.isBegan()) return;
    if (this.isFinished()) return;
    if (
      (this.alphaTo <= this.alphaFrom && this.overlay.alpha <= this.alphaTo) ||
      (this.alphaTo >= this.alphaFrom && this.overlay.alpha >= this.alphaTo)
    ) {
      this.onTransitionFinished();
      this.transitionFinished = true;
    } else {
      this.overlay.alpha += this.alphaProgress;
    }
    return;
  }

  /**
   * トランジション終了時のコールバックを登録する
   *
   * @param {() => void} callback
   * @memberof Fade
   */
  public setCallback(callback: () => void): void {
    this.onTransitionFinished = callback;
  }
}
