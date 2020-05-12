import GameManager from "./GameManager";
import TitleScene from "./Scenes/TitleScene";
import * as WebFont from "webfontloader";
import Resources from "./Resources";

let fontLoaded = false;
let windowLoaded = false;

WebFont.load({
  //カスタムフォントをダウンロードしておく
  custom: {
    families: [Resources.FontFamily.Default],
    urls: ["base.css"],
  },
  active: () => {
    fontLoaded = true;
    if (windowLoaded) initGame();
  },
});

window.onload = () => {
  windowLoaded = true;
  if (fontLoaded) initGame();
};

function initGame() {
  GameManager.start({
    glWidth: document.body.offsetWidth * 0.95,
    glHeight: document.body.offsetHeight * 0.95,
    backgroundColor: 0x222222,
  });
  GameManager.loadScene(new TitleScene());
}
