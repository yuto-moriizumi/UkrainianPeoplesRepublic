import Country from "./Country";
export default class Province {
    id: number;
    owner: Country;
    constructor(id: string, obj: any);
    setOwner(owner: Country): void;
    toJson(): string;
}
