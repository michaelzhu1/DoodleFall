import Game from "./game";

document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.querySelector(".start");
  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    Game.init();
  });
});
