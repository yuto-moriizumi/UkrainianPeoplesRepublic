export default class Country {
  public id: string;
  public color: number;
  public name: string;
  public flagSrc: string;
  constructor(id: string, obj: any) {
    this.id = id;
    this.color = parseInt(obj.color, 16);
    this.name = obj.name;
    this.flagSrc = obj.flag;
  }

  public toJson(): string {
    return (
      `"${this.id}":{` +
      [
        `"name":"${this.name}"`,
        `"color":"${this.color.toString(16)}"`,
        `"flag":"${this.flagSrc}"`
      ].join(",") +
      "}"
    );
  }
}
