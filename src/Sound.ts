import { SoundManager } from "./SoundManager";

export class Sound {
  private loop = false;
  private buffer: AudioBuffer;
  private gainNode: GainNode;
  private source: AudioBufferSourceNode;
  private played: boolean = false;
  private paused: boolean = false;
  private offset: number = 0;
  private playedAt: number = 0;

  //音楽データを表現するクラス
  constructor(buf: AudioBuffer) {
    if (!SoundManager.sharedContext) return;
    this.buffer = buf;
    this.gainNode = SoundManager.sharedContext.createGain();
  }
  public play(loop: boolean = false, offset: number = 0) {
    const audioContext = SoundManager.sharedContext;
    if (!audioContext) return;
    this.loop = loop;
    //AudioSourceNodeの初期化
    this.source = audioContext.createBufferSource();
    //ループ情報の設定
    this.source.loop = this.loop;
    this.source.loopStart = 0;
    this.source.loopEnd = this.buffer.duration as number;
    //バッファを渡す
    this.source.buffer = this.buffer;

    //AudioGainNodeをAudioContext出力先に接続
    this.gainNode.connect(audioContext.destination);
    //AudioSourceNodeをAudioGainNodeに接続
    this.source.connect(this.gainNode);
    //AudioSourceNode処理開始
    this.source.start(0, offset);

    this.source.onended = () => this.stop(); //再生終了時に確実にAudioSourceNodeを破棄する
    this.played = true;
    this.playedAt = audioContext.currentTime - offset;
    this.paused = false;
  }
  public stop(): void {
    if (!this.source || !this.played) return;
    this.source.disconnect();
    try {
      (this.source as any).buffer = null;
    } catch (_e) {}
    this.source.onended = null;
    this.source = null; //SourceNodeは一度再生したら再利用できないので破棄
    this.paused = false;
  }
  //サウンド再生時間を返す
  public get elapsedTime(): number {
    if (this.paused) return this.offset;
    const audioContext = SoundManager.sharedContext;
    if (!this.source || !audioContext) return 0;
    const playedTime = audioContext.currentTime - this.playedAt;
    //ループ再生の場合は合計の再生時間から割り出す
    if (this.loop) {
      const playLength = this.source.loopEnd - this.source.loopStart;
      if (playedTime > playLength)
        return this.source.loopStart + (playedTime % playLength);
    }
    return playedTime;
  }

  public pause(): void {
    if (this.paused || !this.played || !this.source) return;
    this.offset = this.elapsedTime;
    this.stop(); //一度再生を停止する（AudioSourceNodeが再利用できないので）
    this.paused = true;
  }
  public resume(): void {
    if (!this.paused || !this.played) return;
    this.play(this.loop, this.offset);
    this.paused = false;
  }
  public set volume(value: number) {
    if (this.gainNode) this.gainNode.gain.value = value;
  }
  public get volume(): number {
    return this.gainNode ? this.gainNode.gain.value : -1;
  }
  public get isPlayed(): boolean {
    return this.played;
  }
  public get isPaused(): boolean {
    return this.paused;
  }
}
