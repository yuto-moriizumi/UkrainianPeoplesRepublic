import * as PIXI from "pixi.js";
export default class Button extends PIXI.Graphics {
  private static readonly color1 = 0x10bf40;
  private static readonly color2 = 0x10ffbf;
  private text: PIXI.Text;
  private defaultWidth;
  private defaultHeight;

  constructor(text: string, width?, height?) {
    super();
    this.text = new PIXI.Text(text);
    /**new PIXI.TextStyle({
        fontSize: 96,
        fill: 0x000000,
        padding: 6
      }) */
    this.beginFill(Button.color1);
    this.drawRect(
      0,
      0,
      Math.max(this.text.width, width),
      Math.max(this.text.height, height)
    );
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(this.width / 2, this.height / 2);
    this.addChild(this.text);

    this.interactive = true;
    this.buttonMode = true;
    this.on("mouseover", () => {
      this.beginFill(Button.color2);
      this.drawRect(0, 0, this.width, this.height);
    });
    this.on("mouseout", () => {
      this.beginFill(Button.color1);
      this.drawRect(0, 0, this.width, this.height);
    });
  }

  public setText(text: string) {
    this.text.text = text;
  }
}
