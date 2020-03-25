import Scene from "./Scene";

const Resource = Object.freeze({
  Static: {
    Title: {
      Bg: "Ukraine.png"
    },
    Magic: "mahoujin1.png",
    Mushimegane: "bunbougu_mushimegane.png",
    BattleBgFores: ["chang.png"],
    BattleBgMiddles: ["sun.png"],
    BattleBgBacks: ["wang.png"],
    Audio: {
      Bgm: {
        Title: "derheiml.mp3",
        CombineScene: "YugoslaviaK.mp3"
      },
      SE: {
        onCircle: "se_maoudamashii_system36.mp3",
        onCombine: "se_maoudamashii_onepoint23.mp3",
        onClear: "se_maoudamashii_jingle06.mp3"
      }
    }
  },
  FontFamily: {
    Default: "MisakiGothic"
  }
});

export default Resource;
