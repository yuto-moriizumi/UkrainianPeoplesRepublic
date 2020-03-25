export default class Country {
  public id: string;
  public color: number;
  constructor(id: string, obj: any) {
    this.id = id;
    this.color = parseInt(obj.Color, 16);
  }

  public toJson(): string {
    return `"${this.id}":{"Color":"${this.color.toString(16)}"},`;
  }
}
