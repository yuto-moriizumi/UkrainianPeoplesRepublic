import { Arrow } from "./Arrow";
import { Province } from "./Province";
export class ArrowProgress extends Arrow {
  private progress;
  private static readonly RECT_WIDTH;
  constructor(from: Province, to: Province, color?: number);
  setProgress(progress: number): void;
}
