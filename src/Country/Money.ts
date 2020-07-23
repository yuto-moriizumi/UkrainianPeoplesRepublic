import HorizontalBox from "../UI/HorizontalBox";
import GameManager from "../GameManager";
import Resource from "../Resources";
import * as PIXI from "pixi.js";
import MoneyObserver from "./MoneyObserver";
import Observable from "../Observable";

export default class Money implements Observable {
  private money: number = 0;
  observers = new Array<MoneyObserver>();

  public getMoney() {
    return this.money;
  }

  public setMoney(money: number) {
    this.money = money;
    this.observers.forEach((observer) => {
      observer.onMoneyChange(this.money);
    });
  }

  public addObserver(observer: MoneyObserver) {
    console.log("observer added", observer);

    this.observers.push(observer);
  }

  public removeObserver(observer: MoneyObserver) {
    this.observers = this.observers.filter((observer2) => {
      if (observer == observer2) return false;
      return true;
    });
  }
}
