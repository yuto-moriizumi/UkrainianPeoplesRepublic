import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Fade from "./Fade";
import GameManager from "../GameManager";
import LoaderAddParam from "../Utils/LoaderAddParam";
import Resource from "../Resources";
import SelectScene from "./SelectScene";
import VerticalBox from "../UI/VerticalBox";
import Button from "../UI/Button";
import NetworkManager from "../NetworkManager";

export default class MultiScene extends Scene {
  constructor() {
    super();
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
  }

  //リソースリストを作成し返却する
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = super.createInitialResourceList();
    //console.log(assets);
    return assets;
  }

  //リソースがロードされたときのコールバック
  protected onResourceLoaded(): void {
    super.onResourceLoaded();

    //ネットワークマネージャを生成
    let net = GameManager.instance.net;
    if (net == undefined) {
      net = new NetworkManager();
      GameManager.instance.net = net;
    }
    const menuBox = new VerticalBox(300, 300);
    const text = new PIXI.Text("部屋一覧");
    net.getRooms((rooms) => {
      console.log("multi called with", rooms);
      rooms.forEach((room) => {
        menuBox.addPart(new PIXI.Text(room));
      });
    });
    menuBox.addPart(text);
    const hostButton = new Button("ホスト" + net.isHost);
    hostButton.on("click", () => {
      net.isHost = !net.isHost;
      hostButton.setText("ホスト" + net.isHost);
      GameManager.loadScene(new SelectScene());
    });
    menuBox.addPart(hostButton);
    this.addChild(menuBox);
  }

  public update(dt: number) {
    super.update(dt);
  }
}
