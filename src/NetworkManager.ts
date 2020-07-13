import Observable from "./Observable";
import NetworkObserver from "./NetworkObserver";
import Util from "./Utils/Util";

export default class NetworkManager {
  private observers = new Array<any>();
  private rooms = new Set<string>();
  public isHost = false;
  /**
   * IPアドレスのようなもの もしかしたら被るかもしれないね（やばい）
   * 0はブロードキャストアドレス
   * @private
   * @memberof NetworkManager
   */
  private id = Util.getRandomInt(1, 10000);

  constructor() {
    console.log("NetworkManager initialized");
    this.listen();
  }
  private listen(timestamp = Math.floor(new Date().getTime() / 1000) - 1) {
    //timestamp+1秒後以降の更新を受け取る
    const req = new XMLHttpRequest();
    req.open("GET", "./server.php?timestamp=" + timestamp);
    req.send(null);
    req.onloadend = () => {
      try {
        const json = JSON.parse(req.responseText);
        console.log("message recieved", json);
        this.onMessage(json.data);
        this.listen(json.timestamp);
      } catch (error) {
        console.log(req.responseText);
        console.log(error);
      }
    };
  }

  private onMessage(data: Array<object>) {
    data.forEach((i) => {
      if ((i["to"] != 0 && i["to"] != this.id) || i["from"] == this.id) return; //グローバルキャストと自分宛以外は排除
      if (i["type"] == "host") {
        this.rooms.add(i["from"]);
      }
      if (i["type"] == "getRooms" && this.isHost) {
        setTimeout(() => {
          this.send({ type: "host", from: this.id, to: i["from"] });
        }, 1000); //1秒ラグを持たせてホスト応答する
      }
    });
    this.observers.forEach((o) => o());
  }

  private send(data: object) {
    const req = new XMLHttpRequest();
    req.open("GET", "./server.php?write=" + JSON.stringify(data));
    req.send(null);
    req.onload = () => {
      console.log("message sent status", req.responseText);
    };
    console.log("message send", JSON.stringify(data));
  }

  public getRooms(callback: (array: Set<string>) => void) {
    this.rooms.clear(); //ルームリストをクリア
    this.send({ type: "getRooms", from: this.id, to: 0 });
    setTimeout(() => {
      callback(this.rooms);
    }, 3000);
  }

  /*
  public addObserver(observer: NetworkObserver) {
    this.observers.push(observer);
  }
*/
  public removeObserver(observer: () => void) {
    this.observers = this.observers.filter((o) => o != observer);
  }
}
