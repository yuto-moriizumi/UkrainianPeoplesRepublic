export default interface Jsonable {
    toJSON(superkey: string): object;
}
