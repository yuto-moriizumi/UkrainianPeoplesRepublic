import MainScene from "../Scenes/MainScene";
import Event from "./Event";
import GameManager from "../GameManager";

export default class EventDispatcher {
  private scene: MainScene;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  public dispatch(date: Date) {
    GameManager.instance.data.events.forEach((event: Event) => {
      event.dispatch(this.scene, date);
    });
  }
}
