export default abstract class Util {
    /**
     * [最小値,最大値]の乱数を生成します
     * デフォルトでは[0,1]がの乱数が返されます
     * @static
     * @param {number} [max=1]
     * @param {number} [min=0]
     * @returns
     * @memberof Util
     */
    static getRandomInt(min?: number, max?: number): number;
}
