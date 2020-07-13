import Scene from "./Scene";
import LoaderAddParam from "../Utils/LoaderAddParam";
export default class MultiScene extends Scene {
    constructor();
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    update(dt: number): void;
}
