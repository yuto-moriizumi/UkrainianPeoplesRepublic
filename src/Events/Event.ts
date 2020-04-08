import Option from "./Option";
import Condition from "./Conditions/Condition";
import MainScene from "../MainScene";
import GameManager from "../GameManager";
import * as PIXI from "pixi.js";
import DateCondition from "./Conditions/DateCondition";
import Button from "../Button";
import Sound from "../Sound";
import Resource from "../Resources";

export default class Event {
  private id: string;
  private title: string;
  private desc: string;
  private picture: string;
  private fired: boolean = false;
  private _condition: Condition;
  private _options: Array<Option> = new Array<Option>();

  public dispatch(scene: MainScene, date: Date) {
    //console.log("dispatchOK?", this.title);

    if (this.fired) return;
    if (!this._condition.isValid(date)) return;

    this.fired = true;

    const dialog = new PIXI.Graphics();
    dialog.beginFill(0x2f2f2f);
    const renderer = GameManager.instance.game.renderer;

    //内容テキスト
    const message = new PIXI.Text(
      this.desc,
      new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 20,
        breakWords: true,
        wordWrap: true,
        wordWrapWidth: renderer.width * 0.4,
      })
    );
    dialog.addChild(message);

    //タイトルテキスト
    const title = new PIXI.Text(
      this.title,
      new PIXI.TextStyle({ fill: 0xffffff })
    );

    //サイズ決め
    const width = message.width + 20;
    const height = Math.max(
      message.height +
        title.height +
        10 +
        10 +
        10 +
        (title.height + 5) * this.options.length,
      renderer.height * 0.2
    );
    dialog.position.set(
      renderer.width * 0.5 - width * 0.5,
      renderer.height * 0.5 - height * 0.5
    );
    dialog.drawRect(0, 0, width, height);

    //タイトルテキスト設定
    title.anchor.set(0.5, 0);
    title.position.set(width / 2, 5);
    title.width = Math.min(dialog.width - 10, title.width);

    //ヘッダ
    const header = new PIXI.Graphics();
    header.beginFill(0x3f3f3f);
    header.drawRect(0, 0, dialog.width, title.height + 10);
    header.addChild(title);
    dialog.addChild(header);

    //内容テキスト位置決め
    message.anchor.set(0.5, 0);
    message.position.set(width * 0.5, header.y + header.height + 5);

    //OKボタン
    /*
    const ok = new Option();
    ok.position.set(width * 0.5 - ok.width * 0.5, height - ok.height - 5);
    ok.interactive = true;
    ok.buttonMode = true;
    ok.on("click", () => this.destroy());
    this.addChild(ok);*/

    //オプションボタン
    this.options.forEach((option: Option, index: number) => {
      const button = new Button(option.getTitle(), dialog.width * 0.8);
      button.position.set(
        dialog.width * 0.1,
        message.height + title.height + 10 + 10 + 5 + (title.height + 5) * index
      );
      button.on("click", () => {
        option.takeEffects();
        dialog.destroy();

        //SE再生
        const sound = new Sound(
          (GameManager.instance.game.loader.resources[
            Resource.se.click_ok
          ] as any).buffer
        );
        sound.volume = 0.5;
        sound.play(false);
      });
      dialog.addChild(button);
    });

    scene.addChild(dialog);

    //クリック判定が貫通しないようにする
    dialog.interactive = true;

    //SE再生
    const sound = new Sound(
      (GameManager.instance.game.loader.resources[
        Resource.se.news
      ] as any).buffer
    );
    sound.volume = 0.5;
    sound.play(false);
  }

  set condition(condition: any) {
    if (condition instanceof Condition) this._condition = condition;
    switch (condition.type) {
      case "DateCondition":
        this._condition = Object.assign(new DateCondition(), condition);
        break;
      default:
        throw new Error("一致する条件クラスが見つかりませんでした:");
    }
  }

  set options(options: Array<any>) {
    this._options = options.map((option) =>
      Object.assign(new Option(), option)
    );
  }

  get options() {
    return this._options;
  }

  public toJSON(): object {
    return Object.fromEntries(
      Object.entries(this).map(([key, value]) => {
        if (key.startsWith("_")) return [key.substr(1), value];
        return [key, value];
      })
    );
  }
}
