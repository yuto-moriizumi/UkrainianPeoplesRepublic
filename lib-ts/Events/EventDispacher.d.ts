import MainScene from "../MainScene";
export default class EventDispatcher {
    private scene;
    private events;
    constructor(scene: MainScene);
    dispatch(date: Date): void;
}
