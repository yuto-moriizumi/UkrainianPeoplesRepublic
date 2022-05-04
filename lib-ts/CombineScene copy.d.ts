import { Scene } from "./Scene";
import { LoaderAddParam } from "./LoaderAddParam";
export class CombineScene extends Scene {
  private sound;
  constructor();
  protected createInitialResourceList(): (LoaderAddParam | string)[];
  protected onResourceLoaded(): void;
  update(dt: number): void;
}
