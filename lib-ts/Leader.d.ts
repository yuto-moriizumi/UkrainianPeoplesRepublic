import { JsonObject } from "./Utils/JsonObject";
export class Leader extends JsonObject {
  static readonly DEFAULT_NAME = "DEFAULT_LEADER_NAME";
  private __name;
  private imgPath;
  private set name(value);
  getName(): string;
  getImgPath(): string;
}
