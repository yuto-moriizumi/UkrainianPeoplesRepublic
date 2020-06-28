import Effect from "./Effects/Effect";
import Button from "../UI/Button";
import DeclareWar from "./Effects/DeclareWar";
import JsonObject from "../JsonObject";
import SetOwner from "./Effects/SetOwner";
import Annex from "./Effects/Annex";
import Peace from "./Effects/Peace";
import ChangeName from "./Effects/ChangeName";
import GainAccess from "./Effects/GainAccess";
import EffectCreator from "./Effects/EffectCreator";

export default class Option extends JsonObject {
  private title: string;
  private _effects: Array<Effect> = new Array<Effect>();

  /**
   * Object.assignで使用するためのセッタ
   * @private
   * @memberof Option
   */
  private set effects(effects: Array<any>) {
    this._effects = effects.map((effect) => EffectCreator.createEffect(effect));
  }

  public takeEffects() {
    this._effects.forEach((effect) => effect.activate());
  }

  public getTitle(): string {
    return this.title;
  }
}
