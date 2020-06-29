import DateCondition from "./DateCondition";
import EventFired from "./EventFired";
import CountryIs from "./CountryIs";
import And from "./And";
export default abstract class ConditionCreator {
    static createCondition(condition: object): (DateCondition & object) | (EventFired & object) | (CountryIs & object) | (And & object);
}
