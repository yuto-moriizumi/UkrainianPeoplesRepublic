import Scene from "./Scene";
import LoaderAddParam from "./LoaderAddParam";
export default class SelectScene extends Scene {
    constructor();
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    update(dt: number): void;
}
