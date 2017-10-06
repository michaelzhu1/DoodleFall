import Game from "./game";

const game = new Game();

document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.querySelector(".start");
  game.startButton = startButton;

  startButton.addEventListener("click", () => {
    document.onkeydown = e => {
      game.keydown(e);
    };
    document.onkeyup = e => {
      game.keyup(e);
    };
    game.gamePanel = document.getElementById("gamePanel");
    game.initializePlayer();
    game.initializeBlock();
    startButton.style.display = "none";
    console.log(game);
  });
});
