import Player from "./player.js";

export class Game {
  constructor(){
    this.gamePanel = document.getElementById("main");
    this.gamePanel.focus();

    this.startPlayer();
    this.startBlock();
  }

  startPlayer() {
    this.player = new Player();
    this.player.setPosition(this.gamePanel);
  }

  startBlock() {

  }

  addPoint() {

  }

  gameOver() {

  }

  reset() {

  }
}

const start = (button) => {
  if (Game.startButton === false ) {
    Game.startButton = button;
  } else {
    Game.reset();
  }
  new Game();
};
