export default class DateAdapter {
    private date;
    constructor(dateString: any);
    getTime(): number;
    getFormatedDate(format_str?: string): string;
    toJSON(): string;
}
