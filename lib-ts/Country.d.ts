import DiplomaticTie from "./DiplomaticTie";
export default class Country {
    id: string;
    color: number;
    name: string;
    flag: string;
    private diplomaticTies;
    constructor(id: string, obj: any);
    addDiplomaticRelation(tie: DiplomaticTie): void;
    getDiplomacy(): DiplomaticTie[];
    toJson(): string;
}
