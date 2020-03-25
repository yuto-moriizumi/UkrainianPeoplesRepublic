import * as PIXI from "pixi.js";
import Scene from "./Scene";
import LoaderAddParam from "./LoaderAddParam";
import Flag from "./Flag";
import Circle from "./Circle";
export default class CombineScene extends Scene {
    private sound;
    sidebar: PIXI.Graphics;
    circle: Circle;
    mushimegane: PIXI.Sprite;
    private sidebarFlags;
    private progressText;
    private sidebarRows;
    private readonly MAX_LINES;
    private readonly SIDEBAR_WIDTH_RATIO;
    private readonly FLAG_MARGIN_RATIO;
    private get flagMargin();
    constructor();
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    createSidebar(): void;
    onKingdomOfYugoslavia(): void;
    update(dt: number): void;
    onMushimegane(flag: Flag): void;
}
