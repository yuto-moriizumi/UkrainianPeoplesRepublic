import GameManager from "./GameManager";
import MainScene from "./Scenes/MainScene";

export default class Command {
  public static instance: Command;
  constructor() {
    if (Command.instance) {
      throw new Error("GameManager can be instantiate only once");
    }
    Command.instance = this;
  }

  public execute(arg: string) {
    const args = arg.split(" ");
    switch (args[0]) {
      case "tag":
        const country = GameManager.instance.data.countries[args[1]];
        if (country) MainScene.instance.setPlayCountry(country);
        else new Error("Country Not Found: " + args[1]);
        break;
      default:
        new Error("Command Not Found");
    }
  }
}
