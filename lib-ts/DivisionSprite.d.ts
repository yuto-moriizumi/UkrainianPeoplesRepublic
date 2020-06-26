import DivisionInfo from "./DivisionInfo";
import VerticalBox from "./UI/VerticalBox";
import Province from "Province";
export default class DivisionSprite extends VerticalBox {
    private static selects;
    private info;
    private selected;
    private onMap;
    constructor(info: DivisionInfo);
    getInfo(): DivisionInfo;
    setOnMap(flag: boolean): void;
    getOnMap(): boolean;
    select(): void;
    deselect(): void;
    private onClick;
    static moveSelectingDivisionsTo(province: Province): void;
}
