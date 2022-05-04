export class Sound {
  private loop;
  private buffer;
  private gainNode;
  private source;
  private played;
  private paused;
  private offset;
  private playedAt;
  constructor(buf: AudioBuffer);
  play(loop?: boolean, offset?: number): void;
  stop(): void;
  get elapsedTime(): number;
  pause(): void;
  resume(): void;
  set volume(value: number);
  get volume(): number;
  get isPlayed(): boolean;
  get isPaused(): boolean;
}
