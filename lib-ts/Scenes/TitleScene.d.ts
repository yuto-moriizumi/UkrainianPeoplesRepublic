import Scene from "./Scene";
import LoaderAddParam from "../Utils/LoaderAddParam";
export default class TitleScene extends Scene {
    private text;
    private readonly textAppealDuration;
    constructor();
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    private onPointerDown;
    update(dt: number): void;
}
