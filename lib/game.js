import Player from "./player";
import Blockbase from "./blocks/blockbase";


class Game {
  constructor() {
    this.gamePanel = null;
    this.player = null;
    this.point = 0;
    this.startButton = null;
    this.createBlockId = 0;
    this.gamePanel = document.getElementById("game-wrapper");
    this.gamePanel.focus();
    this.gamePanel.style.backgrouldcolor = "red";
    this.startPlayer();
    this.startBlock();
  }

  startPlayer() {
    this.player = new Player();
    this.player.setPosition(this.gamePanel);
  }

  startBlock() {
    this.block = new Blockbase();

  }

  keyDown() {
    return (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        this.player.keyDown(e);
      }
    };
  }

  keyUp() {
    return (e) => {
      if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        this.player.keyUp(e);
      }
    };
  }

  addPoint() {}

  gameOver() {}

  reset() {}
}

const start = button => {
  if (Game.startButton === false) {
    Game.startButton = button;
  } else {
    Game.reset();
  }
  new Game();
};

export default Game;
