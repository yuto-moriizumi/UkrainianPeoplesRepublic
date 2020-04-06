import Effect from "./Effects/Effect";
import Button from "../Button";

export default class Option extends Button {
  private title: string;
  private effects: Array<Effect> = new Array<Effect>();
  public toJson(): string {
    return "{" + ['"title":' + this.title, '"effects":'].join(",") + "}";
  }
}
