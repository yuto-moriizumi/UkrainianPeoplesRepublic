import DivisionInfo from "./DivisionInfo";
import VerticalBox from "./UI/VerticalBox";
export default class DivisionSprite extends VerticalBox {
    private info;
    private static readonly;
    private selected;
    private onMap;
    constructor(info: DivisionInfo);
    getInfo(): DivisionInfo;
    setOnMap(flag: boolean): void;
    getOnMap(): boolean;
    private onClick;
}
