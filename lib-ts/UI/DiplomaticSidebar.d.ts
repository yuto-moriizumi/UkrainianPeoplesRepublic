import Sidebar from "./Sidebar";
import Country from "../Country";
import MainScene from "../Scenes/MainScene";
export default class DiplomaticSidebar extends Sidebar {
    private scene;
    private readonly DIPLOMACY_HEIGHT;
    constructor(scene: MainScene, target: Country);
}
