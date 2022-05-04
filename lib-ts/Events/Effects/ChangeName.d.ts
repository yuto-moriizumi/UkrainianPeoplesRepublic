import { Effect } from "./Effect";
import JsonType from "../../Utils/JsonType";
export class ChangeName extends Effect {
  private type;
  private _country;
  private name;
  activate(): void;
  set country(countryId: string);
  replacer(key: string, value: any, type: JsonType): any[];
}
