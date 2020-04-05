import Sidebar from "./Sidebar";
import Country from "./Country";
import Flag from "./Flag";
import * as PIXI from "pixi.js";

export default class DiplomaticSidebar extends Sidebar {
  private readonly FLAG_HEIGHT: number = 80;
  constructor(target: Country) {
    super("外交");

    let uiHeight = this.contentHeight;

    //相手国の国旗を表示
    const flag = new Flag(target);
    flag.scale.set(this.FLAG_HEIGHT / flag.height);
    flag.anchor.set(0.5, 0.5);
    flag.position.set(this.width / 2, uiHeight + flag.height / 2);
    this.addChild(flag);
    uiHeight += flag.height;

    //国名
    const text = new PIXI.Text(
      target.name,
      new PIXI.TextStyle({ fill: 0xffffff })
    );
    text.anchor.set(0.5, 0);
    text.position.set(this.width / 2, uiHeight + 10);
    text.width = Math.min(text.width, this.width - 10);
    this.addChild(text);
    uiHeight += text.height + 20;

    //外交関係ボックス
    const relationsBox = new PIXI.Graphics();
    relationsBox.beginFill(0x1f1f1f);
    relationsBox.drawRect(
      5,
      uiHeight,
      this.width / 2 - 10,
      this.height - uiHeight - 5
    );
    this.addChild(relationsBox);

    //アクションボックス
    const actionBox = new PIXI.Graphics();
    relationsBox.beginFill(0x1f1f1f);
    relationsBox.drawRect(
      relationsBox.width + 10,
      uiHeight,
      this.width / 2 - 5,
      this.height - uiHeight - 5
    );
    this.addChild(relationsBox);
  }
}
