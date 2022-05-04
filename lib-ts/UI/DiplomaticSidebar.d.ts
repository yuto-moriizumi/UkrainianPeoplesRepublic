import { Sidebar } from "./Sidebar";
import { Country } from "../Country";
import { MainScene } from "../Scenes/MainScene";
export class DiplomaticSidebar extends Sidebar {
  private scene;
  private readonly DIPLOMACY_HEIGHT;
  private static readonly SUMMARY_HEIGHT_RATE;
  private static readonly FLAG_BOX_RATE;
  constructor(scene: MainScene, target: Country);
}
