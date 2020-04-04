import * as PIXI from "pixi.js";
export default class Button extends PIXI.Graphics {
  private text: PIXI.Text;
  private static readonly color1 = 0x10bf40;
  private static readonly color2 = 0x10ffbf;

  constructor(text: string) {
    super();
    this.text = new PIXI.Text(text);
    /**new PIXI.TextStyle({
        fontSize: 96,
        fill: 0x000000,
        padding: 6
      }) */
    this.beginFill(Button.color1);
    this.drawRect(0, 0, this.text.width, this.text.height);
    this.addChild(this.text);

    this.interactive = true;
    this.buttonMode = true;
    this.on("mouseover", () => {
      this.beginFill(Button.color2);
      this.drawRect(0, 0, this.text.width, this.text.height);
    });
    this.on("mouseout", () => {
      this.beginFill(Button.color1);
      this.drawRect(0, 0, this.text.width, this.text.height);
    });
  }
}
