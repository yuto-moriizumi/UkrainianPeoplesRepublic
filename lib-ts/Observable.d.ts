export default interface Observable {
    addObserver(observer: any): void;
    removeObserver(observer: any): void;
}
