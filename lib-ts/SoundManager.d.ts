import { BrowserInfo, BotInfo, NodeInfo } from "detect-browser";
export class SoundManager {
  static instance: SoundManager;
  private static context;
  private static readonly supportedExtensions;
  private static webAudioInitialized;
  static get sharedContext(): AudioContext | null;
  constructor();
  static init(ctx?: AudioContext): void;
  static setSoundInitializeEvent(
    browser: BrowserInfo | BotInfo | NodeInfo
  ): void;
  static useWebaudio(browser: BrowserInfo | BotInfo | NodeInfo): void;
  static decodeAudio(binary: any, callback: (buf: AudioBuffer) => void): void;
  static decodeAudioWithPromise(
    binary: any,
    callback: (buf: AudioBuffer) => void
  ): void;
}
