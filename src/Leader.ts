import { JsonObject } from "./Utils/JsonObject";

export class Leader extends JsonObject {
  public static readonly DEFAULT_NAME = "DEFAULT_LEADER_NAME";
  private __name = Leader.DEFAULT_NAME;
  private imgPath = "default_leader.png";

  private set name(name: string) {
    this.__name = name;
  }

  public getName() {
    return this.__name;
  }

  public getImgPath() {
    return this.imgPath;
  }
}
