import Option from "./Option";
import Condition from "./Conditions/Condition";
import MainScene from "../MainScene";
import GameManager from "../GameManager";

export default abstract class MyEvent extends PIXI.Graphics {
  private id: string;
  private title: string;
  private desc: string;
  private pictureSrc: string;
  private options: Array<Option> = new Array<Option>();
  private condition: Condition;

  public dispatch(scene: MainScene, date: Date) {
    if (!this.condition.isValid()) return;

    this.beginFill(0x2f2f2f);
    const renderer = GameManager.instance.game.renderer;

    //内容テキスト
    const message = new PIXI.Text(
      this.desc,
      new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 20,
        wordWrap: true,
        wordWrapWidth: renderer.width * 0.4,
      })
    );
    this.addChild(message);

    //サイズ決め
    const width = message.width + 20;
    const height = Math.max(message.height, renderer.height * 0.2);
    this.position.set(
      renderer.width * 0.5 - width * 0.5,
      renderer.height * 0.5 - height * 0.5
    );
    this.drawRect(0, 0, width, height);

    //タイトルテキスト
    const title = new PIXI.Text(
      this.title,
      new PIXI.TextStyle({ fill: 0xffffff })
    );
    title.anchor.set(0.5, 0);
    title.position.set(width / 2, 5);

    //ヘッダ
    const header = new PIXI.Graphics();
    header.beginFill(0x3f3f3f);
    header.drawRect(0, 0, this.width, title.height + 10);
    header.addChild(title);
    this.addChild(header);

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

    scene.addChild(this);
  }

  public toJson(): string {
    let optionsJson = "[";
    const optionsJsonArray = new Array<string>();
    this.options.forEach((option) => {
      optionsJsonArray.push(option.toJson());
    });
    optionsJson += optionsJsonArray.join(",") + "]";
    return (
      "{" +
      [
        '"id":' + this.id,
        '"title":' + this.title,
        '"desc":' + this.desc,
        '"pictureSrc":' + this.pictureSrc,
        '"options":' + optionsJson,
      ].join(",") +
      "}"
    );
  }
}