import { Sidebar } from "./Sidebar";
import { Country } from "./Country";
import { MainScene } from "./MainScene";
export class DiplomaticSidebar extends Sidebar {
  private readonly FLAG_HEIGHT;
  private scene;
  private readonly DIPLOMACY_HEIGHT;
  constructor(scene: MainScene, target: Country);
}
