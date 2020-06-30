import Arrow from "./Arrow";
import Province from "./Province";
export default class ArrowProgress extends Arrow {
    private progress;
    private static readonly RECT_WIDTH;
    constructor(from: Province, to: Province);
    setProgress(progress: number): void;
}
