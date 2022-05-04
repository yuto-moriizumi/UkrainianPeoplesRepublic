export class DateAdapter {
  private date: Date;

  constructor(dateString) {
    this.date = new Date(dateString);
  }

  public getTime(): number {
    return this.date.getTime();
  }

  public getFormatedDate(format_str = "YYYY-MM-DD hh:mm") {
    let year_str = this.date.getFullYear().toString();
    //月だけ+1すること
    let month_str = (1 + this.date.getMonth()).toString();
    let day_str = this.date.getDate().toString();
    let hour_str = this.date.getHours().toString();
    let minute_str = this.date.getMinutes().toString();
    let second_str = this.date.getSeconds().toString();

    month_str = ("0" + month_str).slice(-2);
    day_str = ("0" + day_str).slice(-2);
    hour_str = ("0" + hour_str).slice(-2);
    minute_str = ("0" + minute_str).slice(-2);
    second_str = ("0" + second_str).slice(-2);

    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    format_str = format_str.replace(/hh/g, hour_str);
    format_str = format_str.replace(/mm/g, minute_str);
    format_str = format_str.replace(/ss/g, second_str);

    return format_str;
  }

  public toJSON(): string {
    return this.getFormatedDate();
  }
}
