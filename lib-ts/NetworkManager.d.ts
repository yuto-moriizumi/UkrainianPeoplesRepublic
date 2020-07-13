export default class NetworkManager {
    private observers;
    private rooms;
    isHost: boolean;
    /**
     * IPアドレスのようなもの もしかしたら被るかもしれないね（やばい）
     * 0はブロードキャストアドレス
     * @private
     * @memberof NetworkManager
     */
    private id;
    constructor();
    private listen;
    private onMessage;
    private send;
    getRooms(callback: (array: Array<string>) => void): void;
    removeObserver(observer: () => void): void;
}
