export default class Country {
    id: string;
    color: number;
    name: string;
    flagSrc: string;
    constructor(id: string, obj: any);
    toJson(): string;
}
