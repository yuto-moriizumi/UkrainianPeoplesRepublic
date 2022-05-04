import { Scene } from "./Scene";
import { Transition } from "./Transition";
export class FirstScene extends Scene {
  protected transitionIn: Transition;
  protected transitionOut: Transition;
  private text;
  private count;
  constructor();
  update(dt: number): void;
  nextScene(): void;
}
