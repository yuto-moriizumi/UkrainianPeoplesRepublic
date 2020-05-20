import Arrow from "./Arrow";
import Province from "./Province";
export default class ArrowProgress extends Arrow {
    private progress;
    constructor(from: Province, to: Province);
    setProgress(progress: number): void;
}
