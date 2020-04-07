export default class JsonObject {
  public createEntries() {
    return Object.entries(this).map(([key, value]) => {
      if (key.startsWith("_")) return [key.substr(1), value];
      return [key, value];
    });
  }
  public toJSON(): object {
    return Object.fromEntries(this.createEntries());
  }
}
