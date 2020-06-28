export default class MapDataManager<T, U> {
  private map = new Map<T, U>();
  private onLoaded = new Array<any>();
  private isLoaded = false;

  public set(id: T, item: U) {
    return this.map.set(id, item);
  }

  public get(id: T, onload: (item: U) => {}) {
    new Promise((resolve) => {
      if (this.isLoaded) resolve(); //既にロード済みなら直ちに実行
      this.onLoaded.push(() => {
        resolve();
      });
    }).then(() => {
      onload(this.map.get(id));
    });
  }

  public endLoad() {
    this.isLoaded = true;
    while (this.onLoaded.length > 0) this.onLoaded.shift()();
  }
}
