import Player from "./player.js";
import ParentBlock from "./blocks/parent_block";
import BlockGenerator from "./blocks/block_generator.js";

class Game {
  constructor() {
    this.player = null;
    this.time = 0;
    this.startButton = null;
    this.createBlockId = 0;
    this.gamePanel = null;
    this.longestTime = 0;
  }
  keydown(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this.player.keydown(e);
    }
  }

  keyup(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this.player.keyup(e);
    }
  }

  //initialize player
  initializePlayer() {
    this.player = new Player();
    this.player.blockPosition(this.gamePanel);
    this.player.gameOver = () => {
      this.gameOver();
    };
    this.player.moveDown();
  }
  //initialize blocks
  initializeBlock() {
    this.block = new ParentBlock();
    let self = this;
    const newBlock = new BlockGenerator(this.gamePanel, this.player);
    newBlock.defaultBlock();
    // this.clearAllBlocks = function() {
    //   newBlock.clearBlock();
    // };
    this.freezeBlocks = function() {
      newBlock.stopBlock();
    };
    this.createBlockId = setInterval(() => {
      if (self.player.living) {
        newBlock.generateBlock();
        self.timer();
      }
    }, 300);
  }

  gameOver() {
    this.freezeBlocks();
    clearInterval(this.createBlockId);
    document.body.onkeydown = null;
    document.body.onkeyup = null;
    this.startButton.style.display = "";
    // this.player.dom.style.display = "none";
    this.player = null;
    while (this.gamePanel.childNodes.length > 32) {
      //this finally work!!! remove all blocks in gamePanel SO HAPPY
      if (this.gamePanel !== null) {
        this.gamePanel.removeChild(this.gamePanel.lastChild);
      }
    }
    this.gamePanel = null;
    document.onkeydown = null;
    document.onkeyup = null;
    if (Math.floor(this.time / 2) > this.longestTime) {
      this.longestTime = Math.floor(this.time / 2);
    }
    document.getElementById("record").innerHTML = `${this.longestTime} seconds`;
    alert(`Game Over! You lasted ${Math.floor(this.time / 2)} seconds`);
    this.time = 0;
  }

  timer() {
    this.time += 1;
    document.getElementById("time").innerHTML = `${Math.floor(
      this.time / 2
    )} seconds`;
  }

  clearAllBlocks() {}
}

export default Game;
