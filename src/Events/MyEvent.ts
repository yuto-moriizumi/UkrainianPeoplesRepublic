import Option from "./Option";

export default abstract class MyEvent {
  private id: string;
  private title: string;
  private desc: string;
  private pictureSrc: string;
  private options: Array<Option> = new Array<Option>();
  public dispatch(date: Date) {}
  public toJson(): string {
    let optionsJson = "[";
    const optionsJsonArray = new Array<string>();
    this.options.forEach((option) => {
      optionsJsonArray.push(option.toJson());
    });
    optionsJson += optionsJsonArray.join(",") + "]";
    return (
      "{" +
      [
        '"id":' + this.id,
        '"title":' + this.title,
        '"desc":' + this.desc,
        '"pictureSrc":' + this.pictureSrc,
        '"options":' + optionsJson,
      ].join(",") +
      "}"
    );
  }
}
