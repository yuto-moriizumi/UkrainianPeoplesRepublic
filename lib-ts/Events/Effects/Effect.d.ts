import { JsonObject } from "../../Utils/JsonObject";
export abstract class Effect extends JsonObject {
  abstract activate(): void;
}
