import DateCondition from "./DateCondition";
import EventFired from "./EventFired";
import CountryIs from "./CountryIs";
import And from "./And";
import Always from "./Always";
export default abstract class ConditionCreator {
    static createCondition(condition: object): (DateCondition & object) | (EventFired & object) | (CountryIs & object) | (And & object) | (Always & object);
}
