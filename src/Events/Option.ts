import Effect from "./Effects/Effect";
import Button from "../Button";
import DeclareWar from "./Effects/DeclareWar";
import JsonObject from "../JsonObject";
import SetOwner from "./Effects/SetOwner";
import Annex from "./Effects/Annex";

export default class Option extends JsonObject {
  private title: string;
  private _effects: Array<Effect> = new Array<Effect>();

  /**
   * Object.assignで使用するためのセッタ
   * @private
   * @memberof Option
   */
  private set effects(effects: Array<any>) {
    this._effects = effects.map((effect) => {
      switch (effect.type) {
        case "DeclareWar":
          return Object.assign(new DeclareWar(), effect);
        case "SetOwner":
          return Object.assign(new SetOwner(), effect);
        case "Annex":
          return Object.assign(new Annex(), effect);
        default:
          throw new Error("一致する効果クラスが見つかりませんでした:");
      }
    });
  }

  public takeEffects() {
    this._effects.forEach((effect) => effect.activate());
  }

  public getTitle(): string {
    return this.title;
  }
}
