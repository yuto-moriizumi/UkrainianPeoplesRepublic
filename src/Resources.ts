const Resource = Object.freeze({
  Title: {
    Bg: "Ukraine.png",
  },
  //重要な情報
  //プロヴィンスの画像はピクセルの色が非常に重要です。
  //プロヴィンスカラーは必ず一意にしてください
  //画像ファイルにカラープロファイルを設定しないでください
  Map: "provinces.png",
  FontFamily: {
    Default: "MisakiGothic",
  },
  Cancel: "x.png",
  war: "war.png",
  plus: "+.png",
  minus: "-.png",
  savedata: "data.json",
  conscription: "tank.jpg",
  infantaly: "infantary.png",
  money: "mark_yen_okaikei.png",
  access_root: "access_root.png",
  access_target: "access_target.png",
  se: {
    news: "world_news.mp3",
    click_ok: "click_ok.mp3",
    declare_war: "declare_war.mp3",
  },
});

export default Resource;
