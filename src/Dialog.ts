import * as PIXI from "pixi.js";
import GameManager from "./GameManager";
import Button from "./Button";

export default class Dialog extends PIXI.Graphics {
  constructor(titleStr: string, desc: string) {
    super();
    this.beginFill(0x2f2f2f);
    const renderer = GameManager.instance.game.renderer;

    //内容テキスト
    const message = new PIXI.Text(
      desc,
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
      titleStr,
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
    const ok = new Button("OK");
    ok.position.set(width * 0.5 - ok.width * 0.5, height - ok.height - 5);
    ok.interactive = true;
    ok.buttonMode = true;
    ok.on("click", () => this.destroy());
    this.addChild(ok);

    //クリック判定が貫通しないようにする
    this.interactive = true;
  }
}
