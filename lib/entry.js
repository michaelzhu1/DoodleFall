import Game from "./game";


document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.querySelector(".start");

  startButton.addEventListener("click", () => {
    const game = new Game();
    game.startButton = startButton;
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
  });
});
