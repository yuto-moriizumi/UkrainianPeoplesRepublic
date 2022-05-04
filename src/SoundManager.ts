import { GameManager } from "./GameManager";
import { BrowserInfo, BotInfo, NodeInfo, detect } from "detect-browser";
import * as PIXI from "pixi.js";

export class SoundManager {
  public static instance: SoundManager;
  private static context: AudioContext | null = null;
  private static readonly supportedExtensions = ["mp3"];
  private static webAudioInitialized = false;

  public static get sharedContext(): AudioContext | null {
    return SoundManager.context;
  }

  constructor() {
    if (SoundManager.instance)
      throw new Error("SoundManager can not be instantiated twice");
  }
  //初期化処理 ユーザ指定のAudioContextインスタンスを受け入れる
  public static init(ctx?: AudioContext): void {
    if (SoundManager.instance) return;
    SoundManager.instance = new SoundManager();
    if (ctx) SoundManager.context = ctx;
    else {
      const AudioContextClass =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      SoundManager.context = new AudioContextClass();
    }

    const browser = detect();
    if (!browser) return;
    SoundManager.setSoundInitializeEvent(browser);
    SoundManager.useWebaudio(browser);
  }
  //サウンドを初期化するためのイベントを登録する
  public static setSoundInitializeEvent(
    browser: BrowserInfo | BotInfo | NodeInfo
  ): void {
    const eventName =
      document.ontouchend === undefined ? "mousedown" : "touchend";
    let soundInitializer: () => void;
    const majorVersion = browser.version ? browser.version.split(".")[0] : "0";
    if (browser.name === "chrome" && Number.parseInt(majorVersion, 10) >= 66) {
      soundInitializer = () => {
        console.log("initialized!");
        if (SoundManager.sharedContext) SoundManager.sharedContext.resume();
        document.body.removeEventListener(eventName, soundInitializer);
      };
    } else if (browser.name === "safari") {
      soundInitializer = () => {
        console.log("initialized!");
        if (SoundManager.sharedContext) {
          const slientSource = SoundManager.sharedContext.createBufferSource();
          slientSource.buffer = SoundManager.sharedContext.createBuffer(
            1,
            1,
            44100
          );
          slientSource.connect(SoundManager.sharedContext.destination);
          slientSource.start();
          slientSource.disconnect();
          document.body.removeEventListener(eventName, soundInitializer);
        }
      };
    } else return;
    document.body.addEventListener(eventName, soundInitializer);
  }
  //オーディオデータをパースするためのPIXI.Loaderミドルウェアを登録する
  //サウンドをDOMではなくWebAudioとして制御するため
  public static useWebaudio(browser: BrowserInfo | BotInfo | NodeInfo): void {
    if (SoundManager.webAudioInitialized) return;
    const supportedExtensions = SoundManager.supportedExtensions;
    for (const extension of supportedExtensions) {
      const PixiResource = PIXI.LoaderResource;
      PixiResource.setExtensionXhrType(
        extension,
        PixiResource.XHR_RESPONSE_TYPE.BUFFER
      );
      PixiResource.setExtensionLoadType(extension, PixiResource.LOAD_TYPE.XHR);
    }
    SoundManager.webAudioInitialized = true;

    //Chromeの一部バージョンでサウンドのデコード方法が異なる
    const majorVersion = browser.version ? browser.version.split(".")[0] : "0";
    let methodName = "decodeAudio";
    if (browser.name === "chrome" && Number.parseInt(majorVersion, 10) >= 64)
      methodName = "decodeAudioWithPromise";
    //resource-loaderミドルウェアの登録
    GameManager.instance.game.loader.use((resource: any, next: Function) => {
      const extension = resource.url.split("?")[0].split(".")[1];
      if (extension && supportedExtensions.indexOf(extension) !== -1) {
        //リソースにbufferという名前でプロパティを増やす
        (SoundManager as any)[methodName](resource.data, (buf: AudioBuffer) => {
          resource.buffer = buf;
          next();
        });
      } else next();
    });
  }

  //オーディオデータのデコード処理
  public static decodeAudio(
    binary: any,
    callback: (buf: AudioBuffer) => void
  ): void {
    if (SoundManager.sharedContext)
      SoundManager.sharedContext.decodeAudioData(binary, callback);
  }

  //オーディオデータのデコード処理
  //特定のブラウザやバージョンによってはこちらを用いる
  public static decodeAudioWithPromise(
    binary: any,
    callback: (buf: AudioBuffer) => void
  ): void {
    if (SoundManager.sharedContext)
      SoundManager.sharedContext.decodeAudioData(binary).then(callback);
  }
}
