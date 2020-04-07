import Effect from "./Effects/Effect";
import Button from "../Button";
import DeclareWar from "./Effects/DeclareWar";

export default class Option {
  private title: string;
  private _effects: Array<Effect> = new Array<Effect>();

  set effects(effects: Array<any>) {
    this._effects = effects.map((effect) => {
      switch (effect.type) {
        case "DeclareWar":
          return Object.assign(new DeclareWar(), effect);
        default:
          throw new Error("一致する効果クラスが見つかりませんでした:");
      }
    });
  }

  public getTitle(): string {
    return this.title;
  }

  public toJson(): string {
    return "{" + ['"title":' + this.title, '"effects":'].join(",") + "}";
  }
}
