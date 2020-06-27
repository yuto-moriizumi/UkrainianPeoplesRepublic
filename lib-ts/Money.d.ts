import MoneyObserver from "./MoneyObserver";
export default class Money {
    private money;
    private observers;
    getMoney(): number;
    setMoney(money: number): void;
    addObserver(observer: MoneyObserver): void;
    removeObserver(observer: MoneyObserver): void;
}
