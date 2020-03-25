export default class Country {
  public id: string;
  public color: number;
  public name: string;
  public flagSrc: string;
  constructor(id: string, obj: any) {
    this.id = id;
    this.color = parseInt(obj.Color, 16);
    this.name = obj.Name;
    this.flagSrc = obj.Name;
  }

  public toJson(): string {
    return `"${this.id}":{"Color":"${this.color.toString(16)}"},`;
  }
}
