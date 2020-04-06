export default abstract class MyEvent {
    private id;
    private title;
    private desc;
    private pictureSrc;
    private options;
    dispatch(date: Date): void;
    toJson(): string;
}
