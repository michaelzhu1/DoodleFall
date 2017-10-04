import Player from "./player.js";
import Blockbase from "./blocks/blockbase.js";
import BlockGenerator from "./blocks/block_generator.js";

class Game {
  constructor() {
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
      this.gameOver();
    };
    this.player.moveDown();
  }
  //initialize blocks
  startBlock() {
    this.block = new Blockbase();
    let self = this;
    const time = 1100;
    const newBlock = new BlockGenerator(this.gamePanel, this.player);
    newBlock.defaultBlock();
    this.createBlockId = setInterval(() => {
      if (self.player.isLive) {
        newBlock.generateBlock();
        self.addPoint();
      }
    }, time);
  }

  keydown(e) {
    e = e || window.event;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      this.player.keydown(e);
    }
  }

  keyup(e) {
    e = e || window.event;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this.player.keyup(e);
    }
  }

  addPoint() {
    this.point += 1;
    document.getElementById("point").innerHTML = Math.floor(this.point / 5);
  }

  gameOver() {
    document.body.onkeydown = null;
    document.body.onkeyup = null;
    clearInterval(this.createBlockId);
  }

  reset() {
    BlockGenerator.clearBlock();
    this.gamePanel.removeChild(this.player.dom);
    this.gamePanel = null;
    this.player = null;
    this.point = null;
  }
}

export default Game;
