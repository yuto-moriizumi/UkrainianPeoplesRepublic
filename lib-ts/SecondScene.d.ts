import { Scene } from "./Scene";
import { LoaderAddParam } from "./LoaderAddParam";
export class SecondScene extends Scene {
  private text;
  private count;
  constructor();
  update(dt: number): void;
  nextScene(): void;
  createInitialResourceList(): (LoaderAddParam | string)[];
}
