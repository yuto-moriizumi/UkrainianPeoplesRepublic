import MoneyObserver from "./MoneyObserver";
import Observable from "./Observable";
export default class Money implements Observable {
    private money;
    observers: MoneyObserver[];
    getMoney(): number;
    setMoney(money: number): void;
    addObserver(observer: MoneyObserver): void;
    removeObserver(observer: MoneyObserver): void;
}
