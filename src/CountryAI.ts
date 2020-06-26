import Country from "./Country";
import War from "./DiplomaticTies/War";
import MyMap from "./MyMap";

export default class CountryAI {
  private country: Country;
  constructor(country: Country) {
    this.country = country;
  }

  public update() {
    if (!this.country.hasWar()) return; //戦争していないならなにもしない
    const targetCountry = this.country
      .getDiplomacy()
      .filter((d) => {
        if (d instanceof War) return true;
        return false;
      })[0]
      .getOpponent(this.country);

    this.country.getDivisionTemplates().forEach((template) => {
      template.getDivisions().forEach((division) => {
        if (division.isMoving() || division.isFighting()) return;
        //移動も戦闘もしていないならば、師団を動かす

        const targetProvince = targetCountry.getRandomOwnProvince();
        const targetCoord = targetProvince.getCoord();

        const position = division.getPosition();
        //一番近いプロヴィンスに突撃
        let minDistance = 10 ** 8;
        let closetProvince = null;

        //最も近いプロヴィンスを求める
        MyMap.instance.getNeighborProvinces(position).forEach((province) => {
          //進入可能か確認
          if (
            province.getOwner() != this.country && //移動先の領有国が自国ではなく、
            !province.getOwner().getWarInfoWith(this.country) //かつ戦争中でない場合
          )
            return;

          //距離の最小値で更新
          const provinceCoord = province.getCoord();
          const distance =
            (provinceCoord.x - targetCoord.x) ** 2 +
            (provinceCoord.y - targetCoord.y) ** 2;
          if (distance < minDistance) {
            minDistance = distance;
            closetProvince = province;
          }
        });

        //敵国に一番近いプロヴィンスに動かす
        division.moveTo(closetProvince);
      });
    });
  }
}
