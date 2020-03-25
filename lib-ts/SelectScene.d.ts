import Scene from "./Scene";
import LoaderAddParam from "./LoaderAddParam";
export default class SelectScene extends Scene {
    constructor();
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    private onPointerDown;
    update(dt: number): void;
}
