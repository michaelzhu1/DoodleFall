import Player from "./player.js";
import Blockbase from "./blocks/blockbase.js";
import BlockGenerator from "./blocks/block_generator.js";

class Game {
  constructor() {
    this.gamePanel = null;
    this.player = null;
    this.point = 0;
    this.startButton = null;
    this.createBlockId = 0;
  }

  //initialize player
  startPlayer() {
    this.player = new Player();
    this.player.setPosition(this.gamePanel);
    this.player.gameOver = () => {
      Game.gameOver();
    };
    this.player.moveDown();
  }
  //initialize blocks
  startBlock() {
    this.block = new Blockbase();
    let that = this;
    const time = 1100;
    new BlockGenerator(this.gamePanel, this.player);
  }

  keyDown(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      this.player.keyDown(e);
    }
  }

  keyUp() {
    return e => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        this.player.keyUp(e);
      }
    };
  }

  addPoint() {
    this.point += 1;
    document.getElementById("point").innerHTML = Math.floor(this.point / 5);
  }

  gameOver() {
    BlockGenerator.stopBlock();
    document.body.onkeydown = null;
    document.body.onkeyup = null;
    clearInterval(this.createBlockId);
  }

  reset() {}
}

export default Game;
