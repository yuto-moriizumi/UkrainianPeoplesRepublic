import GameManager from "../GameManager";
import Header from "./Header";
import Resources from "../Resources";
import SpriteButton from "./SpriteButton";
import * as PIXI from "pixi.js";
import VerticalBox from "./VerticalBox";
import HorizontalBox from "./HorizontalBox";

export default class Sidebar extends VerticalBox {
  private static readonly COLOR = 0x3e3e36;
  private static readonly DEFAULT_WIDTH = 400;
  private static readonly HEADER_MARGIN = 5;
  private static readonly HEADER_HEIGHT = 100;
  protected contentHeight;

  constructor(text: string) {
    const renderer = GameManager.instance.game.renderer;
    super(
      Sidebar.DEFAULT_WIDTH,
      renderer.height - Header.DEFAULT_HEIGHT,
      5,
      Sidebar.COLOR
    );
    this.position.set(0, Header.DEFAULT_HEIGHT);

    //ヘッダー
    //this.contentHeight = Sidebar.HEADER_MARGIN * 2 + title.height;
    const header = new HorizontalBox(this.width, 50, 5, 0x4f4c47);
    this.addPart(header);
    //this.addChild(header);

    //サイドバータイトル
    const title = new PIXI.Text(text, new PIXI.TextStyle({ fill: 0xffffff }));
    title.position.set(Sidebar.HEADER_MARGIN);
    header.addChild(title);

    //×ボタン
    const xButton = new SpriteButton(
      GameManager.instance.game.loader.resources[Resources.Cancel].texture
    );
    const xButtonSize = header.height - Sidebar.HEADER_MARGIN * 2;
    xButton.on("click", () => this.destroy());
    xButton.anchor.set(0.5, 0.5);
    xButton.position.set(
      this.width - xButtonSize / 2 - Sidebar.HEADER_MARGIN,
      xButtonSize / 2 + Sidebar.HEADER_MARGIN
    );
    xButton.width = xButton.height = xButtonSize;
    header.addChild(xButton);

    //クリック判定が貫通しないようにする
    this.interactive = true;
  }
}
