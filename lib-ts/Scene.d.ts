import UpdateObject from "./UpdateObject";
import * as PIXI from "pixi.js";
import Transition from "./Transition";
import LoaderAddParam from "./LoaderAddParam";
export default abstract class Scene extends PIXI.Container {
    protected transitionIn: Transition;
    protected transitionOut: Transition;
    protected objectsToUpdate: UpdateObject[];
    protected elapsedFrameCount: number;
    /**
     * UiGraph でロードされた UI データ
     */
    protected uiGraph: {
        [key: string]: PIXI.Container;
    };
    /**
     * UiGraph でロードされた UI データを配置するための PIXI.Container
     * 描画順による前後関係を統制するために一つの Container にまとめる
     */
    protected uiGraphContainer: PIXI.Container;
    protected registerUpdatingObject(object: UpdateObject): void;
    protected updateRegisteredObjects(delta: number): void;
    beginTransitionIn(onTransitionFinished: (scene: Scene) => void): void;
    beginTransitionOut(onTransitionFinished: (scene: Scene) => void): void;
    update(delta: number): void;
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    beginLoadResource(onLoaded: () => void): Promise<void>;
    protected loadInitialResource(onLoaded: () => void): void;
    private filterLoadedAssets;
    protected onInitialResourceLoaded(): string[] | LoaderAddParam[];
    protected loadAdditionalResource(assets: string[] | LoaderAddParam[], onLoaded: () => void): void;
    protected onAdditionalResourceLoaded(): void;
    protected onResourceLoaded(): void;
}
