import Game from "./game";

const game = new Game();
document.onkeydown = e => {
  game.keyDown(e);
};
document.onkeyup = e => {
  game.keyUp(e);
};

document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.querySelector(".start");
  game.gamePanel = document.getElementById("game-wrapper");
  game.gamePanel.focus();
  game.startPlayer();
  game.startBlock();
  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
  });
});
