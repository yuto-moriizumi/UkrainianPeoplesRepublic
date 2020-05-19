import * as PIXI from "pixi.js";
import GameManager from "../GameManager";
import Resource from "../Resources";
import SpriteButton from "./SpriteButton";
import Sound from "../Sound";
export default class Timer extends PIXI.Container {
  private text: PIXI.Text;
  private date: Date;
  private isActive: boolean = false;
  private updateDuration: number = 128; //32,64,128,256,512
  private progress: PIXI.Graphics;
  private readonly BUTTON_SIZE: number = 50;
  private readonly WIDTH: number = 250;
  private readonly PROGRESS_HEIGHT: number = 5;
  constructor() {
    super();

    this.height;

    const display = new PIXI.Graphics();
    display.position.set(this.BUTTON_SIZE, 0);
    display.beginFill(0x1f3f1f);
    display.drawRect(0, 0, this.WIDTH - this.BUTTON_SIZE * 2, 50);
    display.interactive = true;
    display.buttonMode = true;
    display.on("click", () => {
      console.log("timer change", this.isActive);

      this.isActive = !this.isActive;
    });
    this.addChild(display);

    this.date = new Date(1918, 0, 23);
    this.text = new PIXI.Text(
      this.date.toLocaleDateString(),
      new PIXI.TextStyle({ fill: 0xffffff })
    );
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(this.width * 0.5, this.height * 0.5);
    display.addChild(this.text);

    //加速ボタン
    const resources = GameManager.instance.game.loader.resources;
    const plus = new SpriteButton(resources[Resource.plus].texture);
    plus.scale.set(this.BUTTON_SIZE / plus.width);
    plus.anchor.set(1, 0.5);
    plus.position.set(this.WIDTH, this.height / 2);
    plus.on("click", () => this.faster());
    this.addChild(plus);

    //減速ボタン
    const minus = new SpriteButton(resources[Resource.minus].texture);
    minus.scale.set(this.BUTTON_SIZE / minus.width);
    minus.anchor.set(0, 0.5);
    minus.position.set(0, this.height / 2);
    minus.on("click", () => this.slower());
    this.addChild(minus);

    //プログレスバー
    this.drawProgress();
  }

  public update(elapsedFrameCount: number): boolean {
    if (!this.isActive) return false;
    if (elapsedFrameCount % this.updateDuration == 0) {
      this.date.setDate(this.date.getDate() + 1);
      this.text.text = this.date.toLocaleDateString();
      return true;
    }
    return false;
  }

  public faster() {
    if (this.updateDuration <= 32) return;

    //SE再生
    this.playSE();

    this.updateDuration *= 0.5;
    this.drawProgress();
  }

  public slower() {
    if (this.updateDuration >= 512) return;

    //SE再生
    this.playSE();

    this.updateDuration *= 2;
    this.drawProgress();
  }

  private playSE() {
    // SE再生
    const sound = new Sound(
      (GameManager.instance.game.loader.resources[
        Resource.se.click_ok
      ] as any).buffer
    );
    sound.volume = 0.5;
    sound.play(false);
  }

  public getDate(): Date {
    return this.date;
  }

  private drawProgress() {
    if (this.progress) this.progress.destroy();
    this.progress = new PIXI.Graphics();
    this.progress.beginFill(0x1f7f1f);
    this.progress.position.set(
      this.BUTTON_SIZE,
      this.height - this.PROGRESS_HEIGHT
    );

    this.progress.drawRect(
      0,
      0,
      ((this.WIDTH - this.BUTTON_SIZE * 2) / 5) *
        (6 - (Math.log2(this.updateDuration) - 4)),
      this.PROGRESS_HEIGHT
    );
    this.addChild(this.progress);
  }
}
