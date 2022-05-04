import { JsonObject } from "../../Utils/JsonObject";

export abstract class Effect extends JsonObject {
  public abstract activate(): void;
}
