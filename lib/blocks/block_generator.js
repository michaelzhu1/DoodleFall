import BrickBlock from "./brick_block";
import GrassBlock from "./grass_block";
import LavaBlock from "./lava_block";
import SpringBlock from "./spring_block";

class BlockGenerator {
  constructor(gamePanel, player) {
    this.gamePanel = gamePanel;
    this.player = player;
    this.allBlocks = [];
  }

  //randomly generate different kinds of blocks in random positions
  generateBlock() {
    let prev_block = 0;
    const random = Math.floor(Math.random() * 11 + 1);
    let block;
    if (random <= 4) {
      block = new BrickBlock();
    } else if (random === 5 && prev_block === 5) {
      block = new BrickBlock();
    } else if (random === 6) {
      block = new LavaBlock();
    } else if (random === 7 || random === 8) {
      block = new GrassBlock();
    } else if (random === 9 || random === 10) {
      block = new SpringBlock();
    } else {
      return;
    }
    prev_block = random;
    const randomPosition = Math.floor(Math.random() * 9 + 1);
    // console.log(block);
      this.addBlock(block, randomPosition);
      this.allBlocks.push(block);
  }

  //ensure the player have a easy time starting the game
  defaultBlock() {
    let block = new BrickBlock();
    this.addBlock(block, 6);
    this.allBlocks.push(block);
  }

  init(gamePanel, player) {
    this.gamePanel = gamePanel;
    this.player = player;
  }

  addBlock(block, position) {
    let self = this;
    // console.log("block:", block);
    block.formBlock();
    // console.log("afterformation:", block);
    // this.allBlocks.push(block);
    block.onCheckPlayerOn = function() {
      return this.checkPlayerOn(self.player);
    };
    block.blockPosition(this.gamePanel, position);
    block.onPlayOn = function() {
      this.playerOn(self.player);
    };
    block.onCheckMoveOut = function() {
      this.checkMoveOut(self.player);
    };
    block.onEnd = function() {
      self.allBlocks.remove();
    };
    block.render();
    // console.log(this.allBlocks);
  }

  stopBlock() {
    const length = this.allBlocks.length;
    for (let i = 0; i < length; i++) {
      this.allBlocks[i].stopMove();
    }
  }

  clearBlock() {
    // const length = this.allBlocks.length;
    console.log(this.allBlocks);
    while (this.allBlocks.length > 0) {
      let block = this.allBlocks.pop();
      // debugger
      // console.log(block.dom);
      this.gamePanel.removeChild(block.dom);
      block.dom = null;
      block = null;
    }
  }
}

Array.prototype.remove = function(block) {
  let i = 0;
  while (i < this.length) {
    if (this[i] == block || this[i] == null) {
      this.splice(i, 1);
      break;
    }
    i += 1;
  }
  return this;
};

export default BlockGenerator;
