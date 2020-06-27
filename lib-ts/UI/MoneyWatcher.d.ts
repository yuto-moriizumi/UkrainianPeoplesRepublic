import HorizontalBox from "./HorizontalBox";
import MoneyObserver from "../MoneyObserver";
export default class MoneyWatcher extends HorizontalBox implements MoneyObserver {
    private moneyText;
    constructor();
    destroy(): void;
    onMoneyChange(amount: number): void;
}
