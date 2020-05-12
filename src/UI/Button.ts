import * as PIXI from "pixi.js";
import * as Filters from "pixi-filters";
export default class Button extends PIXI.Graphics {
  private static readonly color1 = 0x10bf40;
  private static readonly color2 = 0x10ffbf;
  private text: PIXI.Text;

  constructor(text: string, width = 0, height = 0) {
    super();
    this.text = new PIXI.Text(text, new PIXI.TextStyle({ fill: 0xffffff }));

    this.beginFill(Button.color1);
    this.drawRect(
      0,
      0,
      Math.max(this.text.width + 10, width),
      Math.max(this.text.height + 5, height)
    );
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(this.width / 2, this.height / 2);
    this.addChild(this.text);

    this.interactive = true;
    this.buttonMode = true;
    this.on("mouseover", () => {
      //PIXI.fil
      //new PIXI.filters.BlurFilter();
      //new PIXI.filters.AdjustmentFilter()
      this.filters = [new Filters.AdjustmentFilter({ gamma: 3 })];
      //{        gamma: 3,      }
    });
    this.on("mouseout", () => {
      this.filters = [];
    });
  }

  public setText(text: string) {
    this.text.text = text;
  }
}
