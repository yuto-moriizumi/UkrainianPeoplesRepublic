import Effect from "./Effects/Effect";

export default class Option {
  private title: string;
  private effects: Array<Effect> = new Array<Effect>();
  public toJson(): string {
    return "{" + ['"title":' + this.title, '"effects":'].join(",") + "}";
  }
}
