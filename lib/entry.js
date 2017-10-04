import Game from "./game";

const game = new Game();
document.onkeydown = e => {
  game.keydown(e);
};
document.onkeyup = e => {
  game.keyup(e);
};

document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.querySelector(".start");
  game.gamePanel = document.getElementById("gamePanel");
  game.gamePanel.focus();
  game.startPlayer();
  game.startBlock();
  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
  });
});
