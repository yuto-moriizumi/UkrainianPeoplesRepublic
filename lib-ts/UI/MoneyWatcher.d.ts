import HorizontalBox from "./HorizontalBox";
import MoneyObserver from "../Country/MoneyObserver";
export default class MoneyWatcher extends HorizontalBox implements MoneyObserver {
    private moneyText;
    private target;
    constructor();
    update(): void;
    destroy(): void;
    onMoneyChange(amount: number): void;
}
