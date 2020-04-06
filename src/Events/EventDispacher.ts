import MainScene from "../MainScene";
import MyEvent from "./MyEvent";

export default class EventDispatcher {
  private scene: MainScene;
  private events: Array<MyEvent> = new Array<MyEvent>();

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  public dispatch(date: Date) {
    this.events.forEach((event: MyEvent) => {
      event.dispatch(date);
    });
  }
}
